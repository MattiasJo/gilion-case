import { sum } from "lodash";
import { DataByCountry } from "../Types/ChartDataTypes";

const marketingSpendByCountry = (
  countryCodes: string[],
  dataByCountry: DataByCountry,
  isForecast: boolean
) =>
  countryCodes.map((countryCode) =>
    Math.floor(
      sum(
        dataByCountry[countryCode][
          isForecast ? "forecastData" : "nonForecastData"
        ].flatMap((datum) => datum.marketing_spend)
      )
    )
  );

const newCustomersByCountry = (
  countryCodes: string[],
  dataByCountry: DataByCountry,
  isForecast: boolean
) =>
  countryCodes.map((countryCode) =>
    Math.floor(
      sum(
        dataByCountry[countryCode][
          isForecast ? "forecastData" : "nonForecastData"
        ].flatMap((datum) => datum.new_customers)
      )
    )
  );

export const ChartDataUtil = {
  marketingSpendByCountry,
  newCustomersByCountry,
};
