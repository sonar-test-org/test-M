import axios from "axios";
import { store } from "../redux/store";

export const Request = (url, method, params, formDataFlag, headers) => {
  let formData = new FormData();
  for (const key in params) {
    formData.append(key, params[key]);
  }
  return axios({
    url: url,
    method: method, // default
    headers: buildHeaders(headers),
    // params: params,
    params: !formDataFlag ? params : params,
    data: formDataFlag ? formData : params,
  });
};
export const QRRequest = (url, method, params, headers) => {
  return axios({
    url: url,
    method: method,
    headers: headers,
    params: params,
    data: params,
  });
};

function buildHeaders(extraHeaders) {
  const token = JSON.parse(
    JSON.parse(window.localStorage["persist:warehouse"]).token
  );
  let headers = {
    // Pragma: 'no-cache',
    // 'Cache-Control': 'no-cache',
    ...extraHeaders,
  };
  if (token) {
    headers = { ...headers, Authorization: `Bearer ${token}` };
  }
  return { ...headers };
}

export const RequestUserMngt = async (url, method, data, headers) => {
  // const token = JSON.parse(
  //   JSON.parse(window.localStorage["persist:warehouse"]).access_token
  // );

  // const newHeaders = { ...headers, Authorization: "Bearer " + token };
  const newHeaders = { ...headers };

  var config = {
    method,
    url,
    headers: newHeaders,
    data: JSON.stringify(data),
    timeout: 10000 * 10,
  };

  return axios(config);
};

export const generateToken = () => {
  const { access_token } = store.getState().commonReducer;
  return access_token;
};

export const requestWithAuth = async (url, method, data, headers) => {
  // const token = JSON.parse(
  //   JSON.parse(window.localStorage["persist:warehouse"]).access_token
  // );
  const token = generateToken();
  const newHeaders = { ...headers, Authorization: "Bearer " + token };
  // const newHeaders = { ...headers };

  var config = {
    method,
    url,
    headers: newHeaders,
    data: JSON.stringify(data),
    // timeout: 2000,
  };

  return axios(config);
};

export const forFile = async (url, method, data, headers) => {
  const token = generateToken();
  const newHeaders = { ...headers, Authorization: "Bearer " + token };

  var config = {
    method,
    url,
    headers: newHeaders,
    data,
  };

  return axios(config);
};

export const RequestUserMngtAc = async (url, method, data, headers) => {
  const token = JSON.parse(
    JSON.parse(window.localStorage["persist:warehouse"]).access_token
  );

  // const newHeaders = { ...headers };
  const newHeaders = { ...headers, Authorization: "Bearer " + token };
  // const newHeaders = { ...headers };
  var config = {
    method,
    url,
    headers: newHeaders,
    data: JSON.stringify(data),
    // timeout: 10000 * 10,
  };

  return axios(config);
};
