import { Box, Button } from "@mui/material";
import { useRef } from "react";

export const ChooseFiles = ({ uploadHandler, name, accept, multiple }) => {
  const uploadRef = useRef(null);

  const onClick = () => {
    if (!uploadRef.current) return;
    uploadRef.current.click();
  };

  return (
    <Box sx={styles.container}>
      <Button variant="contained" sx={styles.button} onClick={onClick}>
        Choose File
      </Button>
      <input
        name={name}
        hidden={true}
        type="file"
        ref={uploadRef}
        onChange={uploadHandler}
        accept={accept || ""}
        multiple={multiple || false}
      />
    </Box>
  );
};

const styles = {
  container: {
    display: "flex",
  },
  button: {
    height: "40px",
    minWidth: "100px",
    background: "#4994EC",
    borderRadius: "5px !important",
    color: "#FFFFFF",
    gap: "6px",
  },
};
