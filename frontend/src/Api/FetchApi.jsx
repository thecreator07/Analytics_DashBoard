import { API_URI } from "../utils/constant";

export const fetchAllData = async (data) => {
  const response = await fetch(`${API_URI}/api/v1/getAllData`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  console.log(result);
  return data;
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
  //console.log(data)
  return result;
};

export const fetchSearchData = async (query,sortBy, data) => {
  const response = await fetch(
    `${API_URI}/api/v1/getSearchData?query=${query}&sortBy=${sortBy}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  //console.log(data)
  return result;
};
