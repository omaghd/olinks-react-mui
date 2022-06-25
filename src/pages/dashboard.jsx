import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import LinkForm from "../components/LinkForm";
import LinksActions from "../components/LinksActions";

const links = [
  {
    id: 1,
    order: 1,
    title: "Link 1",
    url: "https://google.com",
    isVisible: true,
    views: 11,
  },
  {
    id: 2,
    order: 2,
    title: "Link 2",
    url: "https://google.com",
    isVisible: false,
    views: 22,
  },
  {
    id: 3,
    order: 3,
    title: "Link 3",
    url: "https://google.com",
    isVisible: true,
    views: 33,
  },
  {
    id: 4,
    order: 4,
    title: "Link 4",
    url: "https://google.com",
    isVisible: false,
    views: 44,
  },
];

links.sort((a, b) => a.order - b.order);

const Dashboard = () => {
  return (
    <Box flex={10} p={1}>
      <LinksActions />

      <Stack spacing={3}>
        {links && links.map((link) => <LinkForm key={link.id} link={link} />)}
      </Stack>
    </Box>
  );
};

export default Dashboard;
