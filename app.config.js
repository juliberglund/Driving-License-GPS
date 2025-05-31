import "dotenv/config";

export default ({ config }) => ({
  ...config,
  name: "Driving lessons app",
  slug: "GoogleLessons",
  version: "1.0.0",

  ios: {
    ...config.ios,
    config: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    },
    infoPlist: {
      // Krävs för att fråga om plats-behörighet på iOS
      NSLocationWhenInUseUsageDescription:
        "Appen behöver din plats för att visa kartan.",
      NSLocationAlwaysAndWhenInUseUsageDescription:
        "Appen behöver kontinuerlig platsinformation i bakgrunden.",
    },
  },

  android: {
    ...config.android,
    config: {
      googleMaps: {
        apiKey: process.env.GOOGLE_MAPS_API_KEY,
      },
    },
    permissions: ["ACCESS_FINE_LOCATION", "ACCESS_COARSE_LOCATION"],
  },
});
