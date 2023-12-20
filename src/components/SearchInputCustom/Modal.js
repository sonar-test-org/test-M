import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Checkbox, Divider, Grid, Typography } from "@mui/material";
import { TextFieldCustom } from "../TextFieldCustom/TextFieldCustom";
import { convertToTitleCase, reduceText } from "../../utils/commonUtils";

export const Modal = ({
  open,
  handleClose,
  onClickOk,
  titleModal,
  resultOptions,
  inputFields,
  onChangeCheckbox,
}) => {
  const subRowRef = useRef(null);
  const [resultOptionsLocal, setResultOptionsLocal] = useState([]);
  const [inputFieldsLocal, setInputFieldsLocal] = useState([]);

  useEffect(() => {
    setResultOptionsLocal(resultOptions);
  }, [resultOptions]);

  useEffect(() => {
    setInputFieldsLocal(inputFields);
  }, [inputFields]);

  const onChangeInputFieldsLocal = (e, idx) => {
    const { value, name } = e.target;
    const dat = inputFieldsLocal.map((el) => {
      if (name === el.name) {
        return { ...el, value };
      }
      return { ...el };
    });

    setInputFieldsLocal(dat);
  };

  const onSearchModalLocal = (makeItEmpty) => {
    const searchValue =
      makeItEmpty === "makeItEmpty" ? "" : inputFieldsLocal[0].value;
    const searchName =
      makeItEmpty === "makeItEmpty" ? "" : inputFieldsLocal[0].name;

    let dat = [];
    if (searchValue) {
      dat = resultOptionsLocal.map((el) => {
        let searched = el[searchName]
          .toLowerCase()
          .includes(searchValue.toLowerCase());
        return { ...el, searched };
      });
    } else {
      dat = resultOptionsLocal.map((el) => {
        return { ...el, searched: false };
      });
    }

    setResultOptionsLocal(dat);
  };

  const onResetModal = () => {
    const k = inputFieldsLocal.map((el) => ({ ...el, value: "" }));
    setInputFieldsLocal(k);
    onSearchModalLocal("makeItEmpty");
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose} sx={styles.myWidth}>
        <DialogTitle sx={styles.title}>
          {"Search and Select: " + titleModal}
        </DialogTitle>
        <DialogContent>
          <Box>
            <Grid sx={styles.inputContainer}>
              {inputFieldsLocal.map((el, i) => (
                <TextFieldCustom
                  label={el.label}
                  name={el.name}
                  value={el.value}
                  onChange={(e) => onChangeInputFieldsLocal(e, i)}
                />
              ))}
              <Grid sx={styles.buttonContainer}>
                <Button
                  variant="contained"
                  sx={styles.button}
                  onClick={() => {
                    onSearchModalLocal();
                    subRowRef.current.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                >
                  Search
                </Button>
                <Button
                  variant="contained"
                  sx={{ ...styles.button, ...styles.resetBtn }}
                  onClick={onResetModal}
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
            <Divider component="hr" />
            <Grid sx={styles.tableHeaders}>
              {resultOptionsLocal.length ? (
                Object.keys(resultOptionsLocal[0]).map((el, headI) => {
                  const headStyles = {
                    ...styles.tableHeader,
                    width: "220px",
                  };
                  if (!headI) {
                    headStyles.width = "80px";
                  }
                  if (el === "_id") return;
                  return (
                    <Typography sx={headStyles}>
                      {reduceText(convertToTitleCase(el), 24)}
                    </Typography>
                  );
                })
              ) : (
                <Typography sx={styles.tableHeader}>
                  No Data to display
                </Typography>
              )}
            </Grid>
            <Divider component="hr" />
            <Grid sx={styles.overflowBox} ref={subRowRef}>
              {resultOptionsLocal
                .sort((a, b) => {
                  if (a.searched > b.searched) {
                    return -1;
                  } else {
                    return 1;
                  }
                })
                .map((el, checkboxI) => {
                  const columns = Object.keys(el);
                  const rowStyles = { ...styles.row };
                  if (el.searched) {
                    rowStyles.background = "#85b1e4e6";
                    rowStyles.borderRadius = "4px";
                    rowStyles.borderBottom = "1px solid #00000026";
                    // rowStyles.background = "#d8e9ff7a";
                  }
                  return (
                    <Grid sx={rowStyles}>
                      <Grid sx={styles.subRow}>
                        {columns.map((col) => {
                          if (col === "_id") return;
                          if (col === "select") {
                            return (
                              <Box sx={{ width: "80px" }}>
                                <Checkbox
                                  checked={el.select}
                                  onChange={(e) => {
                                    onChangeCheckbox(
                                      e,
                                      el._id,
                                      resultOptionsLocal
                                    );
                                  }}
                                  inputProps={{ "aria-label": "controlled" }}
                                  // name={el.warehouseCode}
                                />
                              </Box>
                            );
                          } else {
                            return (
                              <Typography
                                sx={{ ...styles.list1, width: "220px" }}
                              >
                                {reduceText(el[col], 20)}
                              </Typography>
                            );
                          }
                        })}
                      </Grid>
                      <Divider component="hr" />
                    </Grid>
                  );
                })}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={styles.btnContainer}>
          <Button variant="contained" sx={styles.button2} onClick={onClickOk}>
            Ok
          </Button>
          <Button
            variant="contained"
            sx={{ ...styles.button2, ...styles.closeBtn }}
            onClick={handleClose}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

const styles = {
  myWidth: {
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
  closeBtn: {
    background: "#E7E7E7",
    color: "#000000",
  },
  btnContainer: {
    marginTop: "20px",
    marginBottom: "20px",
    padding: "0px 40px 0 40px !important",
    height: "48px",
  },
  headings: {
    display: "flex",
    marginTop: "40px",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchText: {
    fontWeight: 500,
    fontSize: "20px !important",
    color: "#000000",
    padding: "0 !important",
  },
  advancedText: {
    fontWeight: 600,
    fontSize: "14px !important",
    textDecorationLine: "underline",
    color: "#124590",
    padding: "0 !important",
    cursor: "pointer",
  },
  inputContainer: {
    display: "flex",
    gap: "30px",
    marginBottom: "20px",
    marginTop: "29px",
  },
  buttonContainer: {
    display: "flex",
    gap: "22px",
    justifyContent: "end",
    marginBottom: "30px",
    height: "40px",
  },
  button: {
    height: "50px",
    width: "100px",
    background: "#4994EC",
    borderRadius: "5px !important",
    color: "#FFFFFF",
  },
  button2: {
    height: "40px",
    width: "100px",
    background: "#4994EC",
    borderRadius: "5px !important",
    color: "#FFFFFF",
  },
  resetBtn: {
    background: "#E7E7E7",
    color: "#000000",
  },
  tableHeaders: {
    margin: "20px 0",
    display: "flex",
    alignItems: "center",
  },
  tableHeader: {
    fontWeight: "700",
    fontSize: "16px !important",
    lineHeight: "20px",
    color: "#30363C",
    width: "200px",
    padding: "0 !important",
    textTransform: "capitalize",
  },
  row: {
    height: "60px",
  },
  subRow: {
    height: "60px",
    display: "flex",
    alignItems: "center",
  },
  list1: {
    fontweight: 400,
    fontSize: "16px !important",
    lineHeight: "20px",
    color: "#30363C",
    width: "200px",
    padding: "0 !important",
  },
  list2: {
    fontWeight: 400,
    fontSize: "16px !important",
    lineHeight: "20px",
    color: "#000000",
    padding: "0 !important",
  },
  overflowBox: {
    overflow: "auto",
    height: "250px",
    overflowX: "hidden",
  },
  searched: {
    // background: "#4994EC",
    background: "#d8e9ff7a",
  },
};
