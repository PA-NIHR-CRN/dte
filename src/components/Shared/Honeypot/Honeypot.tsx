import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import useHoneypot from "../../../hooks/useHoneypot";

const Honeypot = () => {
  const { handleChange, hasDetectedBot } = useHoneypot();
  const history = useHistory();

  useEffect(() => {
    if (hasDetectedBot) {
      history.push("/");
    }
  }, [hasDetectedBot]);

  return (
    <input
      type="text"
      style={{ position: "absolute", left: "-9999px" }}
      onChange={handleChange}
      aria-hidden="true"
      tabIndex={-1}
      name="faxNumber"
    />
  );
};

export default Honeypot;
