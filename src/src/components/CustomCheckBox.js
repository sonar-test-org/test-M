import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { FormGroup, FormControlLabel, Checkbox, Typography, Box } from '@material-ui/core';
import { ClassNames } from '@emotion/react';
import { CheckBoxOutlineBlankRounded } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  default_check: {},
  smGreyCheck: {
    fontSize: 'small',
    color: 'gray'
  }
}));

function CustomCheckBox({ label, onChangeCheckboxhandle, classname,  onChangeCheck, required, disabled, errorMsz, error, currentIndex }) {
  //console.log('isC', isChecked)
  const [checked, setChecked] = React.useState(false);
  const classes = useStyles();
  const checkClassName = () => {
    switch (classname) {
      case 'smGrey':
        return classes.smGreyCheck;
      default:
        return classes.default_check;
    }
  }

  const handleCheckChange = (event) => {
    setChecked(event.target.checked)
    onChangeCheck(event.target.checked, currentIndex)
  }

  return <FormGroup>
    <FormControlLabel className={checkClassName} style={{ marginRight: 0 }} control={<Checkbox color="primary" checked={checked} disabled={disabled} onChange={handleCheckChange} />} label={label} onChange={onChangeCheckboxhandle} />
    {
      required && error &&
      <Typography variant='body1' className="errorDom" component="span" style={{ color: "rgb(211, 47, 47)", fontSize: 12 }}>
        <Box>{errorMsz}</Box>
      </Typography>
    }
  </FormGroup>

}

export default CustomCheckBox;
