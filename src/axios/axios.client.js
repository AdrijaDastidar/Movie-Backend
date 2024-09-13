// Use Axios automatic JSON parsing, built-in timeouts, and easier-to-manage code and more power for handling HTTP requests

import axios from "axios";

const get = async (url) => {
  const response = await axios.get(url, {
    headers: {
      Accept: "application/json",
      "Accept-Encoding": "identity"
    }
  });
  return response.data;
};

export default { get };