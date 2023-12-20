import { IconButton, Tooltip } from "@mui/material";
import { ErrorCapsule } from "../../../../components/UI/Alerts/Capsules";
import { ERROR } from "../../../../utils/variables";

export const ErrorCell = ({ response }) => {
  return (
    <Tooltip title={response?.message}>
      <IconButton sx={{ padding: "0 !important" }}>
        <ErrorCapsule message={ERROR} />
      </IconButton>
    </Tooltip>
  );
};
