import { removeAccess } from "./removeAccess";

const DOMAIN = "https://backend-noteapp-dev-keaz.2.us-1.fl0.io";
const PORT = "";

export const api = {
  auth: {
    register: `${DOMAIN}:${PORT}/auth/register`,
    login: `${DOMAIN}:${PORT}/auth/login`,
  },
  note: {
    create: `${DOMAIN}:${PORT}/note/register`,
    getAll: `${DOMAIN}:${PORT}/note/all`,
    updateArchivedFalse: `${DOMAIN}:${PORT}/note/archivedFalse/`,
    updateArchivedTrue: `${DOMAIN}:${PORT}/note/archivedTrue/`,
    updateNote: `${DOMAIN}:${PORT}/note/`,
    deleteNote: `${DOMAIN}:${PORT}/note/`,
  },
  category: {
    getAll: `${DOMAIN}:${PORT}/category/`,
  },
  categoryNote: {
    create: `${DOMAIN}:${PORT}/categorynote/register`,
    update: `${DOMAIN}:${PORT}/categorynote/update`,
    delete: `${DOMAIN}:${PORT}/categorynote/delete`,
  },
};

export const fetchData = async (method, url, body, auth = false) => {
  const headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  try {
    let response;
    let token = null;
    if (auth) {
      token = localStorage.getItem("noteAppToken");
      if (!token) {
        removeAccess();
        return;
      }
    }
    if (method != "GET") {
      response = await fetch(url, {
        method: method,
        headers: auth ? { ...headersList, "auth-token": token } : headersList,
        body: body ? JSON.stringify(body) : null,
      });
    } else {
      response = await fetch(url, {
        method: method,
        headers: auth
          ? { Accept: "*/*", "auth-token": token }
          : { Accept: "*/*" },
      });
    }

    const data = await response.json();

    data.status = response.status;
    if (auth && data.status == 401) {
      removeAccess();
      return;
    }
    return data;
  } catch (error) {}
};
