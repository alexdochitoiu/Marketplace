import { makeStyles } from "@material-ui/core";
import React from "react";
import IProduct from "src/types/IProduct";

const useStyles = makeStyles({
  root: {
    width: "100%",
    borderSpacing: 0,
    fontFamily: "Roboto, sans-serif",
    "& > tr:not(:first-child)": {
      height: 30,
    },
    "& > tr:first-child": {
      background: "#efefef",
      fontWeight: "bold",
    },
    "& th": {
      paddingLeft: 8,
      textAlign: "left",
      border: "1px solid #ddd",
      background: "#efefef",
      width: 100,
    },
    "& td": {
      border: "1px solid #ddd",
      textAlign: "center",
    },
  },
});

interface IProps {
  sizes: IProduct["sizes"];
  onChange?: (newSizes: IProduct["sizes"]) => void;
  readonly?: boolean;
}

export default function ({ sizes, onChange, readonly = false }: IProps) {
  const classes = useStyles();
  const [focusedCell, setFocusedCell] =
    React.useState<HTMLTableDataCellElement | null>(null);

  const handleCellBlur = (
    e: React.FocusEvent,
    data: { size: string; field: keyof IProduct["sizes"][number] }
  ) => {
    if (!onChange) {
      return;
    }
    const value = e.target.textContent || "";
    const { size, field } = data;
    const newSizes = [...sizes];
    const index = newSizes.findIndex((s) => s.size === size);
    if (index !== -1) {
      // @ts-ignore
      newSizes[index][field] = value;
      onChange(newSizes);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (readonly) {
      return;
    }
    if (e.key === "Enter" && focusedCell) {
      focusedCell.blur();
    }
  };

  return (
    <table className={classes.root}>
      <tr>
        <th>Mărime</th>
        {sizes.map((s) => (
          <td key={s.size}>{s.size}</td>
        ))}
      </tr>
      <tr>
        <th>Preț</th>
        {sizes.map((s) => (
          <td
            key={s.size}
            contentEditable={!readonly}
            suppressContentEditableWarning={true}
            onBlur={(e: React.FocusEvent) =>
              handleCellBlur(e, { size: s.size, field: "price" })
            }
            onFocus={(e: React.FocusEvent) =>
              setFocusedCell(e.currentTarget as any)
            }
            onKeyPress={handleKeyPress}
          >
            {s.price}
          </td>
        ))}
      </tr>
      <tr>
        <th>Preț promo</th>
        {sizes.map((s) => (
          <td
            key={s.size}
            contentEditable={!readonly}
            suppressContentEditableWarning={true}
            onBlur={(e: React.FocusEvent) =>
              handleCellBlur(e, { size: s.size, field: "promoPrice" })
            }
            onFocus={(e: React.FocusEvent) =>
              setFocusedCell(e.currentTarget as any)
            }
            onKeyPress={handleKeyPress}
          >
            {s.promoPrice || ""}
          </td>
        ))}
      </tr>
      <tr>
        <th>Stoc</th>
        {sizes.map((s) => (
          <td
            key={s.size}
            contentEditable={!readonly}
            suppressContentEditableWarning={true}
            onBlur={(e: React.FocusEvent) =>
              handleCellBlur(e, { size: s.size, field: "quantity" })
            }
            onFocus={(e: React.FocusEvent) =>
              setFocusedCell(e.currentTarget as any)
            }
            onKeyPress={handleKeyPress}
          >
            {s.quantity}
          </td>
        ))}
      </tr>
    </table>
  );
}
