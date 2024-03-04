import md5 from "crypto-js/md5";
const password = "Valantis";
const currentDate = new Date().toISOString().split("T")[0].split("-").join("");
const timestamp = currentDate;
const authString = md5(`${password}_${timestamp}`);

export const getItemsFetch = (ids) => {
  const requestBody = {
    action: "get_items",
    params: { ids: ids },
  };
  return fetch(`http://api.valantis.store:40000/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth": authString,
    },
    body: JSON.stringify(requestBody),
  });
};

export const fieldsFetch = () => {
  const requestBody = {
    action: "get_fields",
    params: { field: "brand" },
  };
  return fetch(`http://api.valantis.store:40000/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth": authString,
    },
    body: JSON.stringify(requestBody),
  });
};

export const searchFetch = (value) => {
  const requestBody = {
    action: "filter",
    params: { product: value },
  };
  return fetch(`http://api.valantis.store:40000/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth": authString,
    },
    body: JSON.stringify(requestBody),
  });
};

export const priceFilterFetch = (value) => {
  const requestBody = {
    action: "filter",
    params: { price: value },
  };
  return fetch(`http://api.valantis.store:40000/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth": authString,
    },
    body: JSON.stringify(requestBody),
  });
};

export const brandFilterFetch = (value) => {
  const requestBody = {
    action: "filter",
    params: { brand: value },
  };
  return fetch(`http://api.valantis.store:40000/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth": authString,
    },
    body: JSON.stringify(requestBody),
  });
};
