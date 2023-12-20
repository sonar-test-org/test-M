import React from "react";
import { Grid } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import Input from "../Input";
import Button from "../Button";
import { useMemo } from "react";

const SearchHeader = ({
  inputs = [],
  onChange = () => {},
  onClick = () => {},
  buttons = [],
  disableSearch,
  includeAddButton = false,
}) => {
  const localButtons = useMemo(() => {
    const arr = [
      {
        label: "Search",
        variant: "basic",
        name: "search",
        disabled: disableSearch,
      },
      {
        label: "Reset",
        variant: "reset",
        name: "reset",
      },
      ...buttons,
    ];

    if (includeAddButton) {
      arr.push({
        label: "Add New",
        variant: "basic",
        name: "add",
        icon: AddIcon,
      });
    }

    return arr;
  }, [buttons, disableSearch]);

  return (
    <Grid sx={styles.container} spacing={2}>
      <Grid sx={styles.inpBox}>
        {inputs.map((input) => {
          return (
            <Input {...input} onChange={onChange} sx={{ maxWidth: "360px" }} />
          );
        })}
      </Grid>

      <Grid sx={styles.buttonContainer}>
        {localButtons.map((button) => {
          return (
            <Button
              icon={button.icon}
              variant={button.variant}
              name={button.name}
              onClick={onClick}
              disabled={button.disabled}
            >
              {button.label}
            </Button>
          );
        })}
      </Grid>
    </Grid>
  );
};

const styles = {
  container: {
    display: "flex",
    gap: "30px",
    justifyContent: "space-between",
    marginBottom: "62px",
  },
  buttonContainer: {
    display: "flex",
    gap: "22px",
  },
  inpBox: {
    display: "flex",
    gap: "30px",
    flexGrow: "1",
  },
};

export default SearchHeader;
