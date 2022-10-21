import { FlightLand, FlightTakeoff } from "@mui/icons-material";
import { Box } from "@mui/material";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Polyline,
} from "@react-google-maps/api";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { calculateDistance } from "../../helpers/calculateDistance";
import { AutoComplete } from "../autocomplete/AutoComplete.component";
import { Distance } from "../UI/Distance.component";
import { apiEndpoint } from "../../api/apiEndpoint";
import { SelectStates, Option } from "../autocomplete/SelectStates.component";

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

export const Map = () => {
  // States
  const [states, setStates] = useState<Option[]>([]);

  //State selected
  const [state, setState] = useState<string>("");

  // From where people are taking the plane
  const [from, setFrom] = useState<LatLngLiteral>();

  // Where are people going to land
  const [to, setTo] = useState<LatLngLiteral>();

  // Create a ref for the map
  const mapRef = useRef<GoogleMap>();

  // Route using car
  const [directions, setDirections] = useState<DirectionsResult>();

  // Distance by plane
  const [distance, setDistance] = useState<number | null>();

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

  const fetchDirections = useCallback(() => {
    if (!from || !to) return;

    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: from,
        destination: to,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
        }
      }
    );
    setDistance(calculateDistance(from.lat, from.lng, to.lat, to.lng));
  }, [from, to]);

  // Plot the route between airports
  useEffect(() => {
    fetchDirections();
  }, [from, to, fetchDirections]);

  // Fetch states from API
  const fetchStates = useCallback(async () => {
    try {
      const { data } = await apiEndpoint.post("/countries/states", {
        country: "United States",
      });
      setStates(data.data.states);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchStates();
  }, [fetchStates]);

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      {states.length !== 0 && (
        <Box display="flex" justifyContent="center" padding="10px">
          <SelectStates options={states} setState={setState} state={state} />
        </Box>
      )}
      {state !== "" && (
        <div className="autocomplete">
          <AutoComplete
            filter={state}
            icon={<FlightTakeoff />}
            label="From"
            setPlace={(position) => {
              setFrom(position);
              mapRef.current?.panTo(position);
            }}
          />
          <AutoComplete
            filter={state}
            icon={<FlightLand />}
            label="To"
            setPlace={(position) => {
              setTo(position);
              mapRef.current?.panTo(position);
            }}
          />
        </div>
      )}
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="map-container"
        options={options}
        onLoad={onLoad}
      >
        {from && to && (
          <Polyline
            path={[to, from]}
            options={{ ...polyCofiguration, geodesic: true }}
          />
        )}
        {from && <Marker position={from} />}
        {to && <Marker position={to} />}
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              polylineOptions: { zIndex: 50, strokeColor: "#1976d2" },
            }}
          />
        )}
      </GoogleMap>
      <Box>
        {directions && distance && (
          <Distance leg={directions.routes[0].legs[0]} distance={distance} />
        )}
      </Box>
    </Box>
  );
};

const polyCofiguration = {
  strokeColor: "#d11d1d",
  zIndex: 20,
};
