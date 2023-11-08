import Spinner from "react-spinkit";

import { Typography, Box } from "@material-ui/core";
import styled, { useTheme } from "styled-components";
import { styledComponentsTheme } from "../../../theme";
import Cookies from "js-cookie";

/* See http://kyleamathews.github.io/react-spinkit/ for other spinner options  and colours */
interface LoadingIndicatorProps {
  text?: string;
  colour?: string;
  ariaLive?: "assertive" | "off" | "polite" | undefined;
}
const Loader = styled.div.attrs({
  alt: "Loader",
})`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  padding: 0;
  opacity: 1;
`;

function LoadingIndicator({
  text = Cookies.get("selectedLanguage") === "en-GB" ? "Loading..." : "Llwytho...",
  colour = undefined,
  ariaLive = "assertive",
}: LoadingIndicatorProps) {
  const theme = useTheme() as typeof styledComponentsTheme;
  const defaultcolour = theme.NIHR.Blue;
  return (
    <Loader>
      <Box m={2} sx={{ display: "flex", justifyContent: "center" }}>
        <Spinner name="folding-cube" color={colour ?? defaultcolour} fadeIn="none" />
        {/* </div> */}
      </Box>
      <Typography variant="body1" aria-live={ariaLive} className="loader-message">
        {text}
      </Typography>
    </Loader>
  );
}

export default LoadingIndicator;
