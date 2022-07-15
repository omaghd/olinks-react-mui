import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import PreviewLinks from "./PreviewLinks";

import CloseIcon from "@mui/icons-material/Close";

const MobilePreviewLinks = ({ isOpen, setIsOpen }) => {
  return (
    <Drawer anchor="right" open={isOpen} onClose={() => setIsOpen(false)}>
      <Stack sx={{ width: "300px" }} alignItems="center" py={2} spacing={2}>
        <Button startIcon={<CloseIcon />} onClick={() => setIsOpen(false)}>
          Close
        </Button>
        <Box>
          <PreviewLinks />
        </Box>
      </Stack>
    </Drawer>
  );
};

export default MobilePreviewLinks;
