import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import Links from "../components/Links";
import LinksActions from "../components/LinksActions";
import { LinksContextProvider } from "../context/LinksContext";

const Dashboard = () => {
  return (
    <LinksContextProvider>
      <Box flex={10} p={1}>
        <LinksActions />

        <Stack spacing={3}>
          <Links />
        </Stack>
      </Box>
    </LinksContextProvider>
  );
};

export default Dashboard;
