import { FlightLand, FlightTakeoff } from "@mui/icons-material";
import { Box } from "@mui/material";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api";
import { useCallback, useMemo, useRef, useState } from "react";
import { AutoComplete } from "../autocomplete/AutoComplete.component";
import { Places } from "./Places";

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

export const Map = () => {
  const [office, setOffice] = useState<LatLngLiteral>();
  // Create a ref for the map
  const mapRef = useRef<GoogleMap>();
  // I set the initial point at JF Kennedy Airport
  const center = useMemo<LatLngLiteral>(
    () => ({ lat: 40.6413113, lng: -73.780327 }),
    []
  );
  // Default options memoized for performance purposes
  const options = useMemo<MapOptions>(
    () => ({ disableDefaultUI: true, clickableIcons: false }),
    []
  );

  const onLoad = useCallback((map: any) => (mapRef.current = map), []);

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <Box
        marginTop="10px"
        height="10%"
        display="flex"
        textTransform="uppercase"
        justifyContent="space-around"
      >
        <AutoComplete icon={<FlightTakeoff />} label="From" />
        <AutoComplete icon={<FlightLand />} label="To" />
        <Places
          setOffice={(position) => {
            setOffice(position);
            mapRef.current?.panTo(position);
          }}
        />
      </Box>
      <div className="map">
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
        ></GoogleMap>
      </div>
    </Box>
  );
};

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};

const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#8bc34a",
  fillColor: "#8bc34a",
};

const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: "#fbc02d",
  fillColor: "#fbc02d",
};

const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: "#ff5252",
  fillColor: "#ff5252",
};

const generateHouses = (position: LatLngLiteral) => {
  const houses: Array<LatLngLiteral> = [];
  for (let i = 0; i < 100; i++) {
    const direction = Math.random() < 0.5 ? -2 : 2;
    houses.push({
      lat: position.lat + Math.random() / direction,
      lng: position.lng + Math.random() / direction,
    });
  }

  return houses;
};
