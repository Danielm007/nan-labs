import { useEffect } from "react";
import usePlacesAutoComplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

// Props for the component
type PlacesProps = {
  setOffice: (position: google.maps.LatLngLiteral) => void;
};

export const Places = ({ setOffice }: PlacesProps) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutoComplete({
    requestOptions: {
      componentRestrictions: { country: "us" },
      types: ["airport"],
    },
  });

  useEffect(() => {
    if (ready) {
      console.log("Listo");
    } else {
      console.log("Cargando");
    }
  }, [ready]);

  console.log(status, data);

  if (status === "OK") {
  }

  return (
    <div>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
};
