import "./style.css";

interface IProps extends React.HTMLProps<HTMLAnchorElement> {
  text?: string;
  animation: "slide" | "fade";
}

export default function ({ animation, href, text, ...rest }: IProps) {
  return (
    <a
      href={href}
      {...rest}
      className={`custom-button animationType-${animation} ${
        rest.className || ""
      }`}
    >
      {text || rest.children}
    </a>
  );
}
