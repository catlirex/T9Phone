import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import useStore from "../store/store";

export default function SwitchLabels() {
  const predictMode = useStore((state) => state.predictMode);
  const switchMode = useStore((state) => state.switchMode);

  return (
    <FormGroup>
      <FormControlLabel
        control={<Switch checked={predictMode} onChange={switchMode} />}
        label="PredictMode"
      />
    </FormGroup>
  );
}
