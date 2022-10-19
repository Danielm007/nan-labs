import { Card, CardContent, Typography } from "@mui/material";

type Props = {
  label: string;
  distance: number;
  color: string;
};

export const InfoDistance = ({ distance, label, color }: Props) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography sx={{ fontWeight: "bold", color }}>{label}</Typography>
        <Typography component="span" sx={{ fontSize: "14px" }}>
          {parseFloat(distance.toString()).toFixed(2)} nautical miles
        </Typography>
      </CardContent>
    </Card>
  );
};
