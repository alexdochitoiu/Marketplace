import "./style.css";

interface IProps {
  text: string;
  href?: string;
}

export default function (props: IProps) {
  return (
    <a href={props.href} className="custom-button">
      {props.text}
    </a>
  );
}
