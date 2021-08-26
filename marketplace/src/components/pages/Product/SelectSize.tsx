import Select from "src/components/generic/Select";
import IProduct, { ISize } from "src/types/IProduct";

interface IProps {
  sizes: IProduct["sizes"];
  defaultSize: ISize | null;
  onChange: (size: ISize | null) => void;
}

export default function ({ defaultSize, sizes, onChange }: IProps) {
  const options = [
    { value: "default", label: "Alege o mărime" },
    ...sizes.map((s) => ({
      value: s.size,
      label: s.size,
    })),
  ];

  const handleChange = (e) => {
    if (e.target.value === "default") {
      onChange(null);
      return;
    }
    const size = sizes.find((s) => s.size === e.target.value);
    if (size) {
      onChange(size);
    }
  };

  return (
    <Select
      defaultValue={defaultSize ? defaultSize.size : "default"}
      options={options}
      fullWidth={true}
      style={{
        background: "#f4f4f4",
        height: 40,
        textAlign: "center",
        textTransform: "uppercase",
        fontFamily: "Oswald, sans-serif",
      }}
      classes={{ select: "oswald-font" }}
      onChange={handleChange}
    />
  );
}
