import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import NewLinkButton from "../components/NewLinkButton";
import Links from "../components/Links";

import { LinksContextProvider } from "../context/LinksContext";
import PreviewLinks from "../components/PreviewLinks";

const Dashboard = () => {
  return (
    <LinksContextProvider>
      <Box flex={10} p={1}>
        <NewLinkButton />

        <Stack direction="row" spacing={3}>
          <Stack spacing={2} flex={6}>
            <Links />
          </Stack>
          <Box flex={6}>
            <PreviewLinks />
          </Box>
        </Stack>
      </Box>
    </LinksContextProvider>
  );
};

export default Dashboard;
