import { Box } from "@mui/material";

interface DistanceProps {
  leg: google.maps.DirectionsLeg;
}

export const Distance = ({ leg }: DistanceProps) => {
  // Verify if receive the miles
  if (!leg.distance) {
    return <p>Invalid Parameters</p>;
  }
  //Receive the leg distance property in meters so I have to change it to nautical miles
  const nautical_miles = (leg.distance?.value * 0.000539957).toString();

  return (
    <Box textAlign="center" padding="0 20px 20px">
      <p>
        There are{" "}
        <span className="special">
          {parseFloat(nautical_miles).toFixed(2)}{" "}
        </span>
        nautical miles between{" "}
        <span className="special">{leg.start_address} </span>and{" "}
        <span className="special">{leg.end_address}</span>
      </p>
    </Box>
  );
};
