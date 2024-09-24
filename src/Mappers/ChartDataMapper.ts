import { ChartData } from "../Types/ChartDataTypes";
import { GilionData } from "../Types/GilionData";

export const from = (data: GilionData): ChartData => {
  return {
    month: data.month,
    new_customers: data.new_customers,
    marketing_spend: data.marketing_spend,
  };
};

export const ChartDataMapper = {
  from,
};
