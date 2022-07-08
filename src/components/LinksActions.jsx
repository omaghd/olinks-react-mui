import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";

import SaveIcon from "@mui/icons-material/Save";
import LinkIcon from "@mui/icons-material/Link";
import { useLinks } from "../context/LinksContext";

const LinksActions = () => {
  const { addEmptyLink } = useLinks();

  return (
    <SpeedDial
      ariaLabel="Navigation speed dial"
      sx={{ position: "fixed", bottom: 60, right: 30 }}
      icon={<SpeedDialIcon />}
    >
      <SpeedDialAction
        icon={<SaveIcon />}
        tooltipTitle="Save"
        onClick={() => console.log("OK")}
      />
      <SpeedDialAction
        icon={<LinkIcon />}
        tooltipTitle="New Link"
        onClick={addEmptyLink}
      />
    </SpeedDial>
  );
};

export default LinksActions;
