import { IconButton, Tooltip } from "@mui/material";
import { SuccessCapsule } from "../../../../components/UI/Alerts/Capsules";
import { SUCCESS } from "../../../../utils/variables";

export const SuccessCell = ({ response }) => {
  return (
    <Tooltip title={response?.message}>
      <IconButton sx={{ padding: "0 !important" }}>
        <SuccessCapsule message={SUCCESS} />
      </IconButton>
    </Tooltip>
  );
};
