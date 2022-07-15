import { Typography } from "@mui/material";
import { useLinks } from "../../context/LinksContext";
import LinkForm from "./LinkForm";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";

const Links = () => {
  const { links, linksAreLoading } = useLinks();

  return linksAreLoading ? (
    <Grid container justifyContent="center" my={10}>
      <CircularProgress size={150} />
    </Grid>
  ) : links && links.length ? (
    links.map((link) => <LinkForm key={link.id} link={link} />)
  ) : (
    <Grid container justifyContent="center" my={10}>
      <Typography fontSize={30}>NO LINKS</Typography>
    </Grid>
  );
};

export default Links;
