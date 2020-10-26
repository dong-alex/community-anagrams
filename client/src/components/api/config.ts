const config = {
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080"
      : "http://localhost:8080",
};

export default config;
