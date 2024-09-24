interface Out {
  legendStyling: Object;
}

export const useChartStyling = (): Out => {
  const legendStyling = {
    labels: {
      usePointStyle: true,
      font: {
        size: 12,
      },
    },
  };

  return {
    legendStyling,
  };
};
