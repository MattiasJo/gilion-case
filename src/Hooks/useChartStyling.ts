import { useMediaQuery } from "@mui/material";

interface Out {
  legendStyling: Object;
}

export const useChartStyling = (): Out => {
  const sm = useMediaQuery("(max-width: 600px)");

  const legendStyling = {
    labels: {
      usePointStyle: true,
      font: {
        size: sm ? 10 : 12,
      },
    },
  };

  return {
    legendStyling,
  };
};
