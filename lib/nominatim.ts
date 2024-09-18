import ky from "ky";
import { Coords } from "./rust_backend";

const getLocation = async (coordinates: Coords) => {
  return ky(`https://nominatim.openstreetmap.org/reverse?lat=${coordinates.latitude}&lon=${coordinates.longitude}&format=json`).json()
}
