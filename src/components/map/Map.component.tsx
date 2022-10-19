import { FlightLand, FlightTakeoff } from "@mui/icons-material";
import { Box } from "@mui/material";
import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AutoComplete } from "../autocomplete/AutoComplete.component";
import { Distance } from "../UI/Distance.component";

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

export const Map = () => {
  // From where people are taking the plane
  const [from, setFrom] = useState<LatLngLiteral>();

  // Where are people going to land
  const [to, setTo] = useState<LatLngLiteral>();

  // Create a ref for the map
  const mapRef = useRef<GoogleMap>();

  // Route
  const [directions, setDirections] = useState<DirectionsResult>();

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
  }, [from, to]);

  // Plot the route between airports
  useEffect(() => {
    fetchDirections();
  }, [from, to, fetchDirections]);

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <div className="autocomplete">
        <AutoComplete
          icon={<FlightTakeoff />}
          label="From"
          setPlace={(position) => {
            setFrom(position);
            mapRef.current?.panTo(position);
          }}
        />
        <AutoComplete
          icon={<FlightLand />}
          label="To"
          setPlace={(position) => {
            setTo(position);
            mapRef.current?.panTo(position);
          }}
        />
      </div>
      <Box>
        <p></p>
        {directions && <Distance leg={directions.routes[0].legs[0]} />}
      </Box>
      <div className="map">
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
        >
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
      </div>
    </Box>
  );
};
