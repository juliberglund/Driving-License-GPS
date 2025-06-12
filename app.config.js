import "dotenv/config";

export default ({ config }) => ({
  ...config,
  name: "Driving lessons app",
  slug: "Lessons",
  version: "1.0.0",

  name: "ChatVoice",
  slug: "ChatVoice",
  extra: {
    openAiApiKey: process.env.OPENAI_API_KEY,
  },

  ios: {
    ...config.ios,
    bundleIdentifier: "com.yourcompany.lessons", // <-- Lägg till denna!
    config: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    },
    infoPlist: {
      NSLocationWhenInUseUsageDescription:
        "Appen behöver din plats för att visa kartan.",
      NSLocationAlwaysAndWhenInUseUsageDescription:
        "Appen behöver kontinuerlig platsinformation i bakgrunden.",
    },
  },

  android: {
    package: "com.yourcompany.lessons", // <-- Lägg till denna också!
    ...config.android,
    config: {
      googleMaps: {
        apiKey: process.env.GOOGLE_MAPS_API_KEY,
      },
    },
    permissions: ["ACCESS_FINE_LOCATION", "ACCESS_COARSE_LOCATION"],
  },
});
