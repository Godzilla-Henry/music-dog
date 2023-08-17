import axios from 'axios';

//- App Setting
const clientId = '48f3ce2c5b534225aaed457c9006679a';
const clientSecret = '526e2ea4cd564a3dbc1e040bf19c58bc';

export const getAppToken = () => {
    return axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded', 
            'Authorization' : 'Basic ' + btoa( clientId + ':' + clientSecret)
        },
        //API要求的資料
        data: {
            'grant_type': 'client_credentials',
            'client_id': clientId,
            'client_secret': clientSecret
        }
    })
}