import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

import { useAuth } from "../context/AuthContext";
import { useLinks } from "../context/LinksContext";

import PreviewLink from "./PreviewLink";

import "../assets/css/PreviewLinks.css";

const PreviewLinks = () => {
  const { user, profile } = useAuth();
  const { publicLinks } = useLinks();

  return (
    <Stack
      border={10}
      bgcolor={profile?.backgroundColor}
      borderRadius={10}
      py={5}
      px={1}
      minHeight="400px"
      maxHeight="400px"
      minWidth="200px"
      maxWidth="200px"
      className="preview"
      alignItems="center"
    >
      <Stack alignItems="center" justifyContent="center" spacing={1} mb={3}>
        <Avatar
          sx={{ width: 80, height: 80 }}
          alt={profile?.displayName ?? profile?.username}
          src={profile?.photoURL}
        />

        <Typography color={profile?.textColor} textAlign="center">
          {user?.displayName ? user?.displayName : `@${profile?.username}`}
        </Typography>

        {profile?.displayVisits && (
          <Box mb={3}>
            <Chip
              size="small"
              label={`${profile?.visits} Views`}
              variant="outlined"
              sx={{ color: profile?.textColor }}
            />
          </Box>
        )}
      </Stack>

      <Stack width="100%" spacing={2}>
        {publicLinks &&
          publicLinks.map((link) => (
            <PreviewLink
              key={link.id}
              link={link}
              textColor={profile?.textColor}
            />
          ))}
      </Stack>
    </Stack>
  );
};

export default PreviewLinks;
