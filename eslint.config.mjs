import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const config = [
  {
    ignores: ["backend/coverage/**", "backend/node_modules/**", ".next/**", "out/**"]
  },
  ...nextCoreWebVitals,
];

export default config;