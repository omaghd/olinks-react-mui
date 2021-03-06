import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Fab from "@mui/material/Fab";

import NewLinkButton from "../components/LinksForm/NewLinkButton";
import Links from "../components/LinksForm/Links";
import PreviewLinks from "../components/PreviewLinks/PreviewLinks";
import MobilePreviewLinks from "../components/PreviewLinks/MobilePreviewLinks";

import { LinksContextProvider } from "../context/LinksContext";

import VisibilityIcon from "@mui/icons-material/Visibility";

import { useEffect, useState } from "react";

import { SITE_TITLE } from "../config/globalVariables";
import { useAuth } from "../context/AuthContext";

const FabStyle = {
  bottom: 50,
  left: 10,
  position: "fixed",
};

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { profile } = useAuth();

  useEffect(() => {
    document.title = `My Links | ${SITE_TITLE}`;
  }, []);

  return (
    <LinksContextProvider>
      <Box
        flex={10}
        p={1}
        bgcolor={"background.default"}
        color={"text.primary"}
      >
        <Card>
          <CardContent>
            <NewLinkButton />

            <Stack direction="row" spacing={3}>
              <Stack spacing={2} flex={6}>
                <Links />
              </Stack>
              {profile && (
                <Stack
                  flex={6}
                  alignItems="center"
                  sx={{ display: { xs: "none", md: "flex" } }}
                >
                  <PreviewLinks />
                </Stack>
              )}
            </Stack>

            <Stack
              alignItems="center"
              sx={{ display: { xs: "flex", md: "none" } }}
            >
              <Fab
                variant="extended"
                size="small"
                color="primary"
                style={FabStyle}
                onClick={() => setIsOpen(true)}
              >
                <VisibilityIcon sx={{ mr: 1 }} />
                Preview
              </Fab>
            </Stack>

            <MobilePreviewLinks isOpen={isOpen} setIsOpen={setIsOpen} />
          </CardContent>
        </Card>
      </Box>
    </LinksContextProvider>
  );
};

export default Dashboard;
