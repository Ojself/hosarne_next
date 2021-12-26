const Axios = require("axios");

export const handleMailChimp = async (email) => {
  const axiosConfig = { email };
  const result = await Axios(axiosConfig);
  return result;
};
