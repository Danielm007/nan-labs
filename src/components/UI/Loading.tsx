import { Box, CircularProgress } from "@mui/material";

export const Loading = () => {
  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      width="100%"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress />
      <p>Loading...</p>
    </Box>
  );
};
