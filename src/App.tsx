import { useLoadScript } from "@react-google-maps/api";
import { Map } from "./components/map/Map";
import { Loading } from "./components/UI/Loading";

function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDACwUsQYtP6_VcRi_z6by9d2U44rs1dsY",
    libraries: ["places"],
  });

  if (!isLoaded) return <Loading />;

  return <Map />;
}

export default App;
