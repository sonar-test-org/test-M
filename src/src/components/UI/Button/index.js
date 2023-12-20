import { Button as MuiButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Button = ({
  children,
  variant,
  disabled,
  icon,
  sx,
  name,
  onClick = () => {},
}) => {
  const generateIcon = () => {
    const IconComp = icon;
    if (!icon) return;
    return <IconComp />;
  };

  const generateButton = () => {
    const basicButton = (
      <MuiButton
        variant="contained"
        sx={{ ...styles.button, ...sx }}
        onClick={() => onClick(name)}
        disabled={disabled}
      >
        {children}
        {generateIcon()}
      </MuiButton>
    );

    switch (variant) {
      case "basic":
        return basicButton;

      case "reset":
        return (
          <MuiButton
            variant="contained"
            sx={{ ...styles.button, ...styles.resetBtn, ...sx }}
            onClick={() => onClick(name)}
            disabled={disabled}
          >
            {children}
          </MuiButton>
        );

      case "secondary":
        return (
          <MuiButton
            variant="outlined"
            sx={{ ...styles.updateButton, ...sx }}
            onClick={() => onClick(name)}
          >
            {children}
          </MuiButton>
        );

      case "delete":
        return (
          <MuiButton
            variant="outlined"
            sx={{ ...styles.deleteButton, ...sx }}
            onClick={() => onClick(name)}
          >
            {children}
          </MuiButton>
        );

      default:
        return basicButton;
    }
  };
  return <>{generateButton()}</>;
};

export default Button;

const styles = {
  button: {
    minWidth: "100px",
    background: "#4994EC",
    borderRadius: "5px !important",
    color: "#FFFFFF",
    gap: "6px",
    height: "50px",
  },
  resetBtn: {
    background: "#E7E7E7",
    color: "#000000",
    "&:hover": {
      color: "white",
    },
  },
  updateButton: {
    minWidth: "100px",
    height: "50px",
    borderRadius: "5px !important",
    gap: "6px",
  },
  deleteButton: {
    minWidth: "100px",
    height: "50px",
    borderRadius: "5px !important",
    gap: "6px",
    border: "1px solid red !important",
    color: "red",

    "&:hover": {
      // backgroundColor: "red !important",
      backgroundColor: "rgb(144 18 18 / 14%) !important",
    },
  },
};
// MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeMedium MuiButton-outlinedSizeMedium css-11dktui-MuiButtonBase-root-MuiButton-root
