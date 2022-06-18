import { Link } from "react-router-dom";
import grey from "@mui/material/colors/grey";
import styled from "@emotion/styled";

const SecondaryLink = styled(Link)({
  textDecoration: "none",
  color: grey[500],
  "&:hover": {
    color: grey[600],
  },
});

export default SecondaryLink;
