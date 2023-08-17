import { useApp } from 'src/stores/index';

const APIController = (function() {
    //- App Setting
    const clientId = '48f3ce2c5b534225aaed457c9006679a';
    const clientSecret = '526e2ea4cd564a3dbc1e040bf19c58bc';

    //- 取得Token
    const _getToken = async () => {
        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded', 
                'Authorization' : 'Basic ' + btoa( clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });

        const data = await result.json();
        return data.access_token;
    }

    //- 取得/browse/categories (country="TW")
    const _getGenres = async (token: string) => {
        const result = await fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_TW`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        return data.categories.items;
    }

    const _getPlaylistByGenre = async (token: string, genreId: string) => {

        const limit = 10;
        
        const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        return data.playlists.items;
    }

    return {
        getToken() {
            return _getToken();
        },
        getGenres(token: string) {
            return _getGenres(token);
        },
        getPlaylistByGenre(token: string, genreId: string) {
            return _getPlaylistByGenre(token, genreId);
        },
    }
})();

const APPController = (function(APICtrl) {

    // get genres on page load
    const loadGenres = async () => {
        const appStore = useApp();
        //- 取得Token
        const appToken = await APICtrl.getToken();
        appStore.act_setAppToken(appToken);

        //- 取得流派
        const genres = await APICtrl.getGenres(appToken);


        //- 取得播放清單
        const genreId = genres[0].id;
        const playlist = await APICtrl.getPlaylistByGenre(appToken, genreId);       

    }

    return {
        init() {
            console.log('APP 已啟動');
            loadGenres();
        }
    }

})(APIController);

export default APPController;

