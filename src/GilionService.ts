import axios from "axios";
import { GilionData } from "./Types/GilionData";

export const fetchChartData = async () => {
  return axios
    .get<GilionData[]>("http://localhost:5001/marketing-vs-new-customer-data", {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => response.data)
    .catch((error) => console.error(error));
};
