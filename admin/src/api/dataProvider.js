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

export const dataProvider = {
  getList: (resource) =>
    httpClient(`${API_URL}/${resourceMap[resource]}`).then(({ json }) => ({
      data: json,
      total: json.length,
    })),

  getOne: (resource, { id }) =>
    httpClient(`${API_URL}/${resourceMap[resource]}/${id}`).then(
      ({ json }) => ({
        data: json,
      }),
    ),

  create: (resource, { data }) =>
    httpClient(`${API_URL}/${resourceMap[resource]}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({ "Content-Type": "application/json" }),
    }).then(({ json }) => ({ data: json })),

  update: (resource, { id, data }) =>
    httpClient(`${API_URL}/${resourceMap[resource]}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: new Headers({ "Content-Type": "application/json" }),
    }).then(({ json }) => ({ data: json })),

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
