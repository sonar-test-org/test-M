import React from "react";
import { Grid, Typography } from "@mui/material";
import { IconLink } from "../IconLink";

export const SubHeader = ({
  headerLinks,
  onClickHeaderLink,
  sx,
  text,
  noBorder,
}) => {
  const containerStyles = () => {
    let conStyles = { ...styles.container, ...sx };
    if (!noBorder) {
      conStyles.borderBottom = "1px solid rgba(224, 224, 224, 1)";
    }
    return conStyles;
  };
  return (
    <Grid sx={containerStyles()}>
      <Typography sx={styles.heading}>{text}</Typography>
      <Grid>
        {headerLinks &&
          headerLinks.map((item, idx) => {
            return (
              <IconLink
                key={`${item.label}-${idx}`}
                src={item.icon}
                label={item.label}
                onClick={() => onClickHeaderLink(item)}
              />
            );
          })}
      </Grid>
    </Grid>
  );
};

const styles = {
  container: {
    display: "flex",
    paddingTop: "62px",
    paddingBottom: "20px",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    fontWeight: "600 !important",
    fontSize: "24px !important",
    lineHeight: 1.5,
  },
};
