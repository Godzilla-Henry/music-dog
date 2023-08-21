import request from "../request";

// 將查詢字串物件轉換成字串
const convertToQueryString = (queryParams: any) => {
    const queryString = Object.keys(queryParams)
    .map(key => `${key}=${encodeURIComponent(queryParams[key])}`)
    .join('&');
    return queryString
}

export const getPlayList = (playlist_id: string) => 
    request({
        url: `/playlists/${playlist_id}`,
        method: "get",
    })

export const getPlayListByCategory = (categoryId: string) => 
    request({
        url: `/browse/categories/${categoryId}/playlists?limit=12`,
        method: "get",
    })

export const getPlayListTracks = (playlist_id: string) => 
    request({
        url: `/playlists/${playlist_id}/tracks`,
        method: "get",
    })