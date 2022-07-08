import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

import styled from "@emotion/styled";

import { useEffect, useRef } from "react";
import { useLinks } from "../context/LinksContext";

const CardHeader = styled(Stack)({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
});

const Actions = styled(CardActions)({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
});

const LinkForm = ({ link }) => {
  const { setLinks, updateLink, deleteLink } = useLinks();

  const shouldUpdate = useRef(false);

  useEffect(() => {
    if (shouldUpdate.current) {
      updateLink(link);
      shouldUpdate.current = false;
    }
  }, [link, updateLink]);

  const onTitleChange = async (e) => {
    setLinks((prevLinks) => {
      return prevLinks.map((l) =>
        l.id === link.id ? { ...l, title: e.target.value } : l
      );
    });
    shouldUpdate.current = true;
  };

  const onUrlChange = async (e) => {
    setLinks((prevLinks) => {
      return prevLinks.map((l) =>
        l.id === link.id ? { ...l, url: e.target.value } : l
      );
    });
    shouldUpdate.current = true;
  };

  const onVisibleChange = async () => {
    setLinks((prevLinks) => {
      return prevLinks.map((l) =>
        l.id === link.id ? { ...l, isVisible: !l.isVisible } : l
      );
    });
    shouldUpdate.current = true;
  };

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <CardHeader>
            <Chip
              icon={<VisibilityIcon />}
              label={`${link.views} Views`}
              variant="outlined"
            />
            <Switch
              color="success"
              checked={link.isVisible}
              onChange={onVisibleChange}
            />
          </CardHeader>
          <TextField
            label="Title"
            value={link.title}
            variant="filled"
            onChange={(e) => onTitleChange(e)}
          />
          <TextField
            label="Link"
            value={link.url}
            variant="filled"
            onChange={(e) => onUrlChange(e)}
          />
        </Stack>
      </CardContent>
      <Actions>
        <Box>
          <Tooltip title="Move Up">
            <IconButton size="large">
              <ArrowUpwardIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Move Down">
            <IconButton size="large">
              <ArrowDownwardIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Box>
          <Tooltip title="Delete">
            <IconButton size="large" onClick={() => deleteLink(link)}>
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>
        </Box>
      </Actions>
    </Card>
  );
};

export default LinkForm;
