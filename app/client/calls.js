import axios from "axios";

/**
 * call any command over uuApp API
 * @param url - URL to be called
 * @param data - dtoIn object of the command
 * @param method - method for the command call (POST|GET)
 * @param token - authorization token
 * @returns {Promise<any>}
 */
const callCommand = async (url, method, data, token) => {
  try {
    const response = await axios(_prepareAxiosConfig(url, data, method, token));
    return response?.data;
  } catch (e) {
    return e.response?.data;
  }
};

const _prepareAxiosConfig = (url, data, method, token) => {
  const config = {
    url: url,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      "Accept-Encoding": "gzip,deflate,compress"
    },
    method: method,
    data: JSON.stringify(data)
  };
  config.headers.Authorization = `Bearer ${token}`;
  return config;
};

export {
  callCommand
}