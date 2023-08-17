import request from "../request";

// 將查詢字串物件轉換成字串
const convertToQueryString = (queryParams: any) => {
    const queryString = Object.keys(queryParams)
    .map(key => `${key}=${encodeURIComponent(queryParams[key])}`)
    .join('&');
    return queryString
}

export const getPlayListByCategory = (categoryId: string) => 
    request({
        url: `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists?limit=12`,
        method: "get",
    })
