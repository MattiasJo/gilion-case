import { useMemo } from "react";
import { groupBy, partition, sum, sumBy, uniq } from "lodash";
import { useQuery } from "@tanstack/react-query";
import { fetchChartData } from "../GilionService";
import {
  DataByCountry,
  DataByYear,
  MarketSpendByYear,
} from "../Types/ChartDataTypes";
import { ChartDataMapper } from "../Mappers/ChartDataMapper";

type Out = {
  isLoading: boolean;
  countryCodes: string[];
  dataByCountry: DataByCountry;
  dataByYear: DataByYear;
  marketSpendByYear: MarketSpendByYear;
};

export const useChartData = (): Out => {
  const { data, isLoading } = useQuery({
    queryKey: ["marketing-vs-new-customer-data"],
    queryFn: fetchChartData,
  });

  const countryCodes = useMemo(
    () => (data ? uniq(data.flatMap((datum) => datum.country_code)) : []),
    [data]
  );

  const [forecastData, nonForecastData] = useMemo(
    () => partition(data ?? [], (datum) => datum.is_forecast),
    [data]
  );

  const dataByCountry = useMemo(() => {
    return countryCodes.reduce((acc: DataByCountry, countryCode) => {
      acc[countryCode] = {
        forecastData: forecastData
          .filter((datum) => datum.country_code === countryCode)
          .map(ChartDataMapper.from),
        nonForecastData: nonForecastData
          .filter((datum) => datum.country_code === countryCode)
          .map(ChartDataMapper.from),
      };

      return acc;
    }, {});
  }, [countryCodes, forecastData, nonForecastData]);

  const dataByYear = useMemo(
    () =>
      data ? groupBy(data, (item) => new Date(item.month).getFullYear()) : {},
    [data]
  );

  const marketSpendByYear: MarketSpendByYear = useMemo(() => {
    const actual = groupBy(nonForecastData, (datum) =>
      new Date(datum.month).getFullYear()
    );

    const forecast = groupBy(forecastData, (datum) =>
      new Date(datum.month).getFullYear()
    );

    return {
      actual: Object.keys(dataByYear).map((year) =>
        actual[year]
          ? Math.floor(
              sumBy(actual[year].map((datum) => datum.marketing_spend))
            )
          : null
      ),
      forecast: Object.keys(dataByYear).map((year) =>
        forecast[year]
          ? Math.floor(
              sumBy(forecast[year].map((datum) => datum.marketing_spend))
            )
          : null
      ),
    };
  }, [dataByYear]);

  return {
    isLoading,
    countryCodes,
    dataByCountry,
    dataByYear,
    marketSpendByYear,
  };
};
