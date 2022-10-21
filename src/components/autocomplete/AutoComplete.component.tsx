// Import Material UI Components
import { Autocomplete, Icon, InputAdornment, TextField } from "@mui/material";
// useState
import { useState } from "react";
// Import actions from third party library => use-places-autocomplete
import usePlacesAutoComplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

// Interface for props
interface Props {
  label: string;
  icon: JSX.Element | null;
  setPlace: (position: google.maps.LatLngLiteral) => void;
  filter: string;
}

let options: string[] = [];

export const AutoComplete = ({ label, icon, setPlace, filter }: Props) => {
  // setOption
  const [option, setOption] = useState<string | null>(null);
  // Configure results to just airports within US
  const {
    value,
    setValue,
    suggestions: { data },
    clearSuggestions,
  } = usePlacesAutoComplete({
    requestOptions: {
      componentRestrictions: { country: "us" },
      language: "en",
      types: ["airport"],
    },
  });

  // handleSelect
  const handleSelect = async (event: any, newValue: string | null) => {
    if (!newValue) return;
    setOption(newValue);
    clearSuggestions();
    const results = await getGeocode({ address: newValue });
    const { lat, lng } = await getLatLng(results[0]);
    setPlace({ lat, lng });
  };

  // We are going to receive a string of type => Alabama - AL from state
  // We can use array methods to apply a filter
  const [name, state_code] = filter.split(" | ");
  options = data
    .filter(
      (st) =>
        st.description.includes(name) || st.description.includes(state_code)
    )
    .map((result) => result.description);

  return (
    <Autocomplete
      style={{
        width: "90%",
        margin: "0 auto",
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
      onChange={handleSelect}
      // Set value to autocomplete component with option selected
      value={option}
    />
  );
};
