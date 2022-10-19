import { Box, Typography } from "@mui/material";
import { InfoDistance } from "./InfoDistance.component";

interface DistanceProps {
  leg: google.maps.DirectionsLeg;
  distance: number;
}

export const Distance = ({ leg, distance }: DistanceProps) => {
  // Verify if receive the miles
  if (!leg.distance) {
    return <p>Invalid Parameters</p>;
  }
  //Receive the leg distance property in meters so I have to change it to nautical miles
  const nautical_miles = leg.distance?.value * 0.000539957;

  return (
    <Box textAlign="center" padding="0 20px 20px">
      <Typography sx={{ margin: "0 10px 10px" }}>
        Distance between <span className="special">{leg.start_address} </span>
        and <span className="special">{leg.end_address}</span>
      </Typography>
      <Box display="flex" justifyContent="center" gap="10px">
        <InfoDistance label="By plane" distance={distance} color="#d11d1d" />
        <InfoDistance
          label="By car"
          distance={nautical_miles}
          color="#1976d2"
        />
      </Box>
    </Box>
  );
};
