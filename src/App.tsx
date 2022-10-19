import { useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import { Map } from "./components/map/Map.component";
import { Loading } from "./components/UI/Loading.component";

function App() {
  // Create a library state so we don't have warnings in the console
  const libraries: ["places"] = useMemo(() => ["places"], []);
  // const [libraries, setLibraries] = useState<["places"]>(["places"]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_PUBLIC_GOOGLE_API_KEY as string,
    libraries,
  });

  // Verify if map is ready
  if (!isLoaded) return <Loading />;

  return <Map />;
}

export default App;
