export const getCurrentUTC = () =>
  new Date(new Date().toLocaleString("en-US", { timeZone: "UTC" }));
