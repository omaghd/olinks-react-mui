import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import NewLinkButton from "../components/NewLinkButton";
import Links from "../components/Links";

import { LinksContextProvider } from "../context/LinksContext";

const Dashboard = () => {
  return (
    <LinksContextProvider>
      <Box flex={10} p={1}>
        <NewLinkButton />

        <Stack spacing={3}>
          <Links />
        </Stack>
      </Box>
    </LinksContextProvider>
  );
};

export default Dashboard;
