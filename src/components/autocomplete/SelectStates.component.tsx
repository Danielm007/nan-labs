import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";

export type Option = { name: string; state_code: string };

interface Props {
  options: Option[];
  state: string;
  setState: Dispatch<SetStateAction<string>>;
}

export const SelectStates = ({ options, setState, state }: Props) => {
  // Handle Change
  const handleChange = (event: SelectChangeEvent) => {
    setState(event.target.value);
  };

  return (
    <FormControl size="small" sx={{ minWidth: "200px" }}>
      <InputLabel id="demo-simple-select-label">State</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={state}
        label="Age"
        onChange={handleChange}
      >
        {options.map((option) => (
          <MenuItem
            key={option.state_code}
            value={`${option.name} | ${option.state_code}`}
          >
            {`${option.name} | ${option.state_code}`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
