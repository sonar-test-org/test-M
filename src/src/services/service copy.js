import axios from "axios";

export const Request1 = (url, method, body, formDataFlag, headers) => {
  let formData = new FormData();
  // for (const key in params) {
  //   formData.append(key, params[key])
  // }
  for (const key in body) {
    formData.append(key, body[key]);
  }

  return axios({
    url: url,

    method: method, // default
    headers: buildHeaders(headers),
    // params: params,
    body: !formDataFlag ? body : body,
    data: formDataFlag ? formData : body,
    // timeout: 10000 * 10,
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
  // if (token) {
  //   headers = { ...headers, Authorization: `Bearer ${token}` };
  // }
  return { ...headers };
}
