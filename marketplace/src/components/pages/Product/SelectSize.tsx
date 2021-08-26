import Select from "src/components/generic/Select";
import IProduct from "src/types/IProduct";

interface IProps {
  sizes: IProduct["sizes"];
}

export default function ({ sizes }: IProps) {
  const options = [
    { value: "default", label: "Alege o mărime" },
    ...sizes.map((s) => ({
      value: s.size,
      label: s.size,
    })),
  ];
  return (
    <Select
      defaultValue="default"
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
    />
  );
}
