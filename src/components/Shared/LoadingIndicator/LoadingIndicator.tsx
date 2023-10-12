import Spinner from "react-spinkit";

import { Typography, Box } from "@material-ui/core";
import styled, { useTheme } from "styled-components";
import { styledComponentsTheme } from "../../../theme";

/* See http://kyleamathews.github.io/react-spinkit/ for other spinner options  and colours */
interface LoadingIndicatorProps {
  text?: string;
  colour?: string;
}
const Loader = styled.div.attrs({
  alt: "Loader",
  "data-testid": "loader",
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
  text = "Loading...",
  colour = undefined,
}: LoadingIndicatorProps) {
  const theme = useTheme() as typeof styledComponentsTheme;
  const defaultcolour = theme.NIHR.Blue;
  return (
    <Loader>
      <Box m={2} sx={{ display: "flex", justifyContent: "center" }}>
        <Spinner
          name="folding-cube"
          color={colour ?? defaultcolour}
          fadeIn="none"
        />
        {/* </div> */}
      </Box>
      <Typography
        variant="body1"
        aria-live="assertive"
        className="loader-message"
      >
        {text}
      </Typography>
    </Loader>
  );
}

export default LoadingIndicator;
