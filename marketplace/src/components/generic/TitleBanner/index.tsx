import "./TitleBanner.styles.css";
import blackFurBackground from "src/assets/images/black-fur-bg.jpg";

interface IProps {
  backgroundImage?: string;
  title: string;
}

export default function (props: IProps) {
  return (
    <div
      className="title-banner"
      style={{
        backgroundImage: `url(${props.backgroundImage || blackFurBackground})`,
      }}
    >
      <h2 className="animate__animated animate__pulse">{props.title}</h2>
    </div>
  );
}
