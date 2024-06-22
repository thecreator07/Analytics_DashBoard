import { API_URI } from "../utils/constant";

export const fetchAllData = async () => {
  const response = await fetch(`${API_URI}/api/v1/getAllData`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  const result = await response.json();
  // console.log(result);
  return result;
};

export const fetchVisualData = async (data) => {
  const response = await fetch(`${API_URI}/api/v1/getVisualData`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  // console.log(result)
  return result;
};

export const fetchSearchData = async (data) => {
  let url = `${API_URI}/api/v1/search`;
  if (data?.query && data?.page) {
    url += `?page=${data?.page}&query=${data?.query}`;
  } else if (data?.page) {
    url += `?page=${page}`;
  } else if (data?.query) {
    url += `?query=${query}`;
  } else {
    url += "";
  }
  // console.log(url)
  // console.log("data", data);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data?.fetch),
  });
  const result = await response.json();
  //console.log(data)
  return result;
};
