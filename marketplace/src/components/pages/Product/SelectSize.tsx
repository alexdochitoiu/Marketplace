import Select from "src/components/generic/Select";

export default function ({ sizes }) {
  const options = [
    { value: "default", label: "Alege o mărime" },
    ...sizes.map((s) => ({ value: s, label: s })),
  ];
  return (
    <Select
      defaultValue="default"
      options={options}
      fullWidth={true}
      style={{
        background: "#f4f4f4",
        height: 51,
        textAlign: "center",
        textTransform: "uppercase",
        fontFamily: "Oswald, sans-serif",
      }}
      classes={{ select: "oswald-font" }}
    />
  );
}
