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
            <Switch color="success" checked={link.isVisible} />
          </CardHeader>
          <TextField label="Title" value={link.title} variant="filled" />
          <TextField label="Link" value={link.url} variant="filled" />
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
            <IconButton size="large">
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>
        </Box>
      </Actions>
    </Card>
  );
};

export default LinkForm;
