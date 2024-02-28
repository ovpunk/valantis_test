import md5 from "crypto-js/md5";

export const getIdsFetch = () => {
  const currentDate = new Date()
    .toISOString()
    .split("T")[0]
    .split("-")
    .join("");
  const password = "Valantis";
  const timestamp = currentDate;
  const authString = md5(`${password}_${timestamp}`);
  const requestBody = {
    action: "get_ids",
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

export const getItemsFetch = (ids) => {
  const currentDate = new Date()
    .toISOString()
    .split("T")[0]
    .split("-")
    .join("");
  const password = "Valantis";
  const timestamp = currentDate;
  const authString = md5(`${password}_${timestamp}`);
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
