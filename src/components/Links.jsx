import { Typography } from "@mui/material";
import { useLinks } from "../context/LinksContext";
import LinkForm from "./LinkForm";

const Links = () => {
  const { links } = useLinks();

  return links.length ? (
    links.map((link) => <LinkForm key={link.id} link={link} />)
  ) : (
    <Typography variant="h5" align="center" sx={{ textTransform: "uppercase" }}>
      No links...
    </Typography>
  );
};

export default Links;
