import React, { useEffect, useMemo, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Typography } from "@mui/material";
import { convertToTitleCase } from "../../../utils/commonUtils";
import { FooterLookup } from "./FooterLookup";
import { FilterLookup } from "./FilterLookup";
import { TableLookup } from "./TableLookup";

export const LookupModal = ({
  open,
  handleClose,
  onClickOk,
  titleModal,
  rows,
  name,
  value,
  valueKey,

  loading,
  setLoading,
}) => {
  const [inputs, setInputs] = useState([]);
  const [filters, setFilters] = useState([]);
  const [checked, setChecked] = useState(null);

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  useEffect(() => {
    if (!rows.length) return;

    const row = rows[0];
    const inputsNew = Object.keys(row)
      .filter((fl) => fl !== "_id")
      .map((el) => {
        return {
          label: convertToTitleCase(el),
          value: "",
          name: el,
        };
      });
    setInputs(inputsNew);

    if (value && valueKey) {
      const prevValue = rows.find((fn) => fn[valueKey] === value);
      setChecked(prevValue?._id || null);
    }
  }, [rows]);

  const onChangeInputs = (e, idx) => {
    const dat = inputs.map((el) => {
      if (e.target.name === el.name) {
        return { ...el, value: e.target.value };
      }
      return { ...el };
    });
    setInputs(dat);
  };

  const onSearch = () => {
    const filtersNew = inputs.map((el) => ({ name: el.name, value: el.value }));
    setFilters(filtersNew);
  };

  const onResetModal = () => {
    setFilters([]);
    setInputs(inputs.map((el) => ({ ...el, value: "" })));
  };

  const onChangeCheckbox = (e, id) => {
    const val = e.target.checked ? id : null;
    setChecked(val);
  };

  const onClickOkLocal = () => {
    const newVal = rows.find((fn) => fn._id === checked) || {};
    const e = {
      target: {
        value: newVal[valueKey],
        name,
        row: newVal,
      },
    };
    onClickOk(e, 'lookupOnClickOk', newVal);
  };

  const rowsMemo = useMemo(() => {
    if (!filters.length) return rows;
    const dat = filters.reduce((acu, cur) => {
      return acu.filter((fl) => {
        const formattedName = (fl[cur.name] || "").toString().toLowerCase();
        const formattedValue = cur.value.toString().toLowerCase();
        return formattedName.includes(formattedValue);
      });
    }, rows);
    return dat;
  }, [filters, rows]);

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose} sx={styles.modifications}>
        <DialogTitle sx={styles.title}>
          {"Search and Select: " + titleModal}
        </DialogTitle>
        <DialogContent>
          {loading ? (
            <Box>Loading</Box>
          ) : (
            <Box sx={{ maxHeight: "400px" }}>
              {/* Filters component with search input and buttons */}
              <FilterLookup
                inputs={inputs}
                onChangeInputs={onChangeInputs}
                onSearch={onSearch}
                onResetModal={onResetModal}
              />
              {/* <Divider component="hr" /> */}
              {rows.length ? (
                <TableLookup
                  headerObj={rows[0] || null}
                  rows={rowsMemo}
                  checked={checked}
                  onChangeCheckbox={onChangeCheckbox}
                />
              ) : (
                <Typography sx={styles.noData}>No Data to display</Typography>
              )}
            </Box>
          )}
        </DialogContent>

        {/* Footer component with Ok and Cancel buttons */}
        <FooterLookup
          showOkButton={rows.length}
          onClickOkLocal={onClickOkLocal}
          handleClose={handleClose}
        />
      </Dialog>
    </React.Fragment>
  );
};

const styles = {
  modifications: {
    "& .MuiPaper-root": {
      width: "674px",
      maxWidth: "674px",
      background: "#FFFFFF",
      boxShadow: "0px 0px 50px rgb(0 0 0 / 15%)",
      borderRadius: "20px",
    },
    "& .MuiTypography-root": {
      fontSize: "32px",
      padding: "40px 40px 0 40px",
    },
    ".MuiDialogContent-root": {
      padding: "0px 40px 0 40px",
    },
  },
  title: {
    fontSize: "30px !important",
  },
  noData: {
    fontWeight: "700",
    fontSize: "16px !important",
    lineHeight: "20px",
    color: "#30363C",
    width: "200px",
    padding: "0 !important",
    textTransform: "capitalize",
    marginTop: "20px",
    fontWeight: 400,
  },
};
