import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  return (
    <Stack alignItems="center" py={3}>
      <Tooltip title="Visit repository" placement="top" arrow>
        <IconButton
          href="https://github.com/omaghd/olinks-react-mui"
          target="_blank"
        >
          <GitHubIcon />
        </IconButton>
      </Tooltip>
      <Typography fontSize={15}>MADE WITH ❤️ BY OmaghD</Typography>
    </Stack>
  );
};

export default Footer;
