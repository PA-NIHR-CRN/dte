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
      style={{ display: "none" }}
      onChange={handleChange}
      aria-hidden="true"
      tabIndex={-1}
      name="faxNumber"
      autoComplete="off"
    />
  );
};

export default Honeypot;
