import { Dictionary } from "lodash";
import { GilionData } from "./GilionData";

export type ChartData = Omit<GilionData, "is_forecast" | "country_code">;

export type DataByCountry = Record<
  string,
  { forecastData: ChartData[]; nonForecastData: ChartData[] }
>;

export type MarketSpendByYear = {
  actual: (number | null)[];
  forecast: (number | null)[];
};

export type DataByYear = Dictionary<GilionData[]>;
