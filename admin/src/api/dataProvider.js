import { fetchUtils } from "react-admin";
const API_URL = import.meta.env.VITE_API_URL;

const httpClient = (url, options = {}) => {
  options.headers = new Headers(options.headers || {});
  options.credentials = "include";
  return fetchUtils.fetchJson(url, options);
};

const resourceMap = {
  content: "content",
  employees: "employees",
  contacts: "contacts",
  abilities: "abilities",
  projects: "projects",
  users: "auth/users",
};

// 🔁 Reusable helper for body/headers logic
const buildRequestBodyAndHeaders = (data) => {
  const hasFile = Object.values(data).some(
    (value) => value && typeof value === "object" && value.rawFile,
  );

  if (hasFile) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value && typeof value === "object" && value.rawFile) {
        formData.append(key, value.rawFile);
      } else {
        formData.append(key, value);
      }
    });
    return { body: formData, headers: undefined };
  }

  return {
    body: JSON.stringify(data),
    headers: new Headers({ "Content-Type": "application/json" }),
  };
};

export const dataProvider = {
  getList: (resource) =>
    httpClient(`${API_URL}/${resourceMap[resource]}`).then(({ json }) => ({
      data: json,
      total: json.length,
    })),

  getOne: (resource, { id }) =>
    httpClient(`${API_URL}/${resourceMap[resource]}/${id}`).then(
      ({ json }) => ({ data: json }),
    ),

  create: (resource, { data }) => {
    const { body, headers } = buildRequestBodyAndHeaders(data);
    return httpClient(`${API_URL}/${resourceMap[resource]}`, {
      method: "POST",
      body,
      headers,
    }).then(({ json }) => ({ data: json }));
  },

  update: (resource, { id, data }) => {
    const { body, headers } = buildRequestBodyAndHeaders(data);
    return httpClient(`${API_URL}/${resourceMap[resource]}/${id}`, {
      method: "PUT",
      body,
      headers,
    }).then(({ json }) => ({ data: json }));
  },

  delete: (resource, { id }) =>
    httpClient(`${API_URL}/${resourceMap[resource]}/${id}`, {
      method: "DELETE",
    }).then(() => ({ data: { id } })),

  getMany: (resource, { ids }) =>
    Promise.all(
      ids.map((id) => httpClient(`${API_URL}/${resourceMap[resource]}/${id}`)),
    ).then((responses) => ({ data: responses.map(({ json }) => json) })),

  getManyReference: () => Promise.reject("Not implemented"),
  updateMany: () => Promise.reject("Not implemented"),
  deleteMany: () => Promise.reject("Not implemented"),
};
