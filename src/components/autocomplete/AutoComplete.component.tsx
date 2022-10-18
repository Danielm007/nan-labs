// Import Material UI Components
import { Autocomplete, Icon, InputAdornment, TextField } from "@mui/material";
// useState
import { useState } from "react";
// Import actions from third party library => use-places-autocomplete
import usePlacesAutoComplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

interface Props {
  label: string;
  icon: JSX.Element | null;
}

// Create a type for option
type Place = {
  id: string;
  label: string;
};

type Option = string;

let options: string[] = [];

export const AutoComplete = ({ label, icon }: Props) => {
  // setOption
  const [option, setOption] = useState<string | null>(null);
  const [place, setPlace] = useState<Place | null>(null);
  // Configure results to just airports within US
  const {
    ready,
    value,
    setValue,
    suggestions: { data },
    clearSuggestions,
  } = usePlacesAutoComplete({
    requestOptions: {
      componentRestrictions: { country: "us" },
      types: ["airport"],
    },
  });

  // Populate data with autocomplete results
  options = data.map((result) => result.description);

  return (
    <Autocomplete
      style={{
        minWidth: "400px",
      }}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          size="small"
          InputProps={{
            // Importante to not lose the autocomplete functionality
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Icon>{icon}</Icon>
              </InputAdornment>
            ),
          }}
        />
      )}
      // Handle change with input
      onInputChange={(event: any, newValue: string) => setValue(newValue)}
      // Change value of input
      inputValue={value}
      // Handle change when option is clicked
      onChange={(event: any, newValue: string | null) => {
        setOption(newValue);
      }}
      // Set value to autocomplete component with option selected
      value={option}
    />
  );
};

// value={place}
// onChange={(event: any, newValue: Place | null) => setPlace(newValue)}
