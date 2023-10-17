import request from "../request";

// 將查詢字串物件轉換成字串
const convertToQueryString = (queryParams: any) => {
  const queryString = Object.keys(queryParams)
    .map((key) => `${key}=${encodeURIComponent(queryParams[key])}`)
    .join("&");
  return queryString;
};

export const getCategories = () =>
  request({
    url: "/categories",
    method: "get",
  });

export const getPlaylists = () =>
  request({
    url: "/playlists",
    method: "get",
  });

export const getTracks = () =>
  request({
    url: "/tracks",
    method: "get",
  });
