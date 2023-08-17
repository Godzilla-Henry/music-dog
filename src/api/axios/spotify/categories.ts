import request from "../request";

// 將查詢字串物件轉換成字串
const convertToQueryString = (queryParams: any) => {
    const queryString = Object.keys(queryParams)
    .map(key => `${key}=${encodeURIComponent(queryParams[key])}`)
    .join('&');
    return queryString
}

export const getSeveralCategories = () => 
    request({
        url: '/browse/categories?locale=sv_TW',
        method: "get",
    })
