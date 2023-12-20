import React, { useEffect, useState } from "react";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { SelectDropdown } from "./SelectDropdown";
import { Grid } from "@mui/material";

export const TimePickerCustom = ({
  onChange,
  hourValue,
  minuteValue,
  secondsValue,
  hourError,
  minuteError,
  secondsError,
}) => {
  const [hours, setHours] = useState([]);
  const [minutes, setMinutes] = useState([]);
  const [seconds, setSeconds] = useState([]);

  useEffect(() => {
    const newHours = [];
    for (let i = 0; i < 12; i++) {
      newHours.push(i);
    }

    const newMinutes = [];
    const newSeconds = [];
    for (let i = 0; i < 61; i++) {
      newMinutes.push(i);
      newSeconds.push(i);
    }

    setHours(newHours);
    setMinutes(newMinutes);
    setSeconds(newSeconds);
  }, []);

  return (
    <Grid sx={styles.container}>
      <SelectDropdown
        label="Hour"
        value={hourValue}
        onChange={onChange}
        name={"hour"}
        options={hours}
        // options={hourOptions}
        sx={styles.input}
        error={hourError}
      />
      <SelectDropdown
        label="Minute"
        value={minuteValue}
        onChange={onChange}
        name={"minute"}
        options={minutes}
        // options={minuteOptions}
        sx={styles.input}
        error={minuteError}
      />
      <SelectDropdown
        label="Seconds"
        value={secondsValue}
        onChange={onChange}
        name={"seconds"}
        options={seconds}
        // options={secondsOptions}
        sx={styles.input}
        error={secondsError}
      />
    </Grid>
  );
};

const styles = {
  container: {
    display: "flex",
    gap: "6px",
  },
  input: {
    minWidth: "70px",
  },
};
