import React, { useEffect, useMemo, useState } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetState } from "../../redux/commonSlice";

export const UserMenu = ({}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const commonReducer = useSelector((state) => state.commonReducer);

  const userName = useMemo(() => {
    const name = commonReducer.userName?.split("@")[0] || '';
    return name;
  }, [commonReducer.userName]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className={classes.borderButton}
      >
        <Avatar
          sx={{ width: "24px", height: "24px", fontSize: "16px" }}
          alt="Remy Sharp"
          src="/broken-image.jpg"
        >
          {userName[0] || ""}
        </Avatar>
        <Typography variant="p"> {userName}</Typography>
        <ExpandMoreIcon className={classes.chevron} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        className={classes.menu}
      >
        <MenuItem
          onClick={() => {
            dispatch(resetState());
            navigate(`/?tenant=${commonReducer.TENENT_IDENTIFIER}`, {
              replace: true,
            });

            // navigate(`/?tenant=${commonReducer.TENENT_IDENTIFIER}/timeout`);
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  borderButton: {
    width: "100%",
    height: "48px",
    justifyContent: "flex-start !important",
    gap: "16px",
    alignItems: "center",
  },
  chevron: {
    marginLeft: "auto",
  },
  menu: {
    "& .MuiPaper-elevation": {
      width: "215px",
      maxWidth: "unset",
    },
  },
}));
