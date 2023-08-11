import { useContext } from "react";
import { ContentContext } from "../../../context/ContentContext";

function ThreeWords() {
  const { content } = useContext(ContentContext);
  return <>{content["register-password-three-words"]}</>;
}

export default ThreeWords;
