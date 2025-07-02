import HYFLogo from "@/assets/hyf.svg";
import Image from "next/image";
import "./HomePage.css";
import MealList from "../MealList/MealList";

// Feel free to replace the content of this component with your own
function HomePage() {
  return (
    <>
      <a href="https://www.hackyourfuture.dk/" target="_blank" className="link">
        <Image src={HYFLogo.src} width={HYFLogo.width} height={HYFLogo.height} className="logo" alt="hackyour future logo" />
      </a>
      <a href="/nested" className="link">
        <span className="message">Go to the nested page</span>
      </a>
      <MealList />
    </>
  );
}

export default HomePage;
