export const toCountryLabel = (countryCode: string): string => {
  switch (countryCode) {
    case "AT":
      return "Austria";
    case "DE":
      return "Germany";
    case "GB":
      return "Great Britain";
    case "SE":
      return "Sweden";
    case "NO":
      return "Norway";
    default:
      return countryCode;
  }
};
