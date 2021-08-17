import "./style.css";
import { IoIosArrowUp } from "react-icons/io";

export default function () {
  window.onscroll = function () {
    const btn = document.getElementById("back-to-top");
    if (window.scrollY >= 150) {
      if (btn) {
        btn.style.right = "25px";
      }
    } else {
      if (btn) {
        btn.style.right = "-50px";
      }
    }
  };

  const backToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div id="back-to-top" onClick={backToTop}>
      <IoIosArrowUp />
    </div>
  );
}
