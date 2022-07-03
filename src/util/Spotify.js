const clientId = 'e1f47544dc544e869865db91e93b8a43'
const redirectURI = 'http://localhost:3000';

let userAccessToken;

const Spotify = {
        getAccessToken(){
            if(userAccessToken){
                return userAccessToken
            }

            const userAccessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
            const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/)

            if(userAccessTokenMatch && expiresInMatch){
                userAccessToken = userAccessTokenMatch[1];
                const expireIn = Number(expiresInMatch[1])

                window.setTimeout(() => userAccessToken = '', expireIn * 1000);
                window.history.pushState('Access Token', null, '/')
                return userAccessToken
            }else{
                const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
                window.location = accessURL;
            }
        },

        search(string){
            const accessToken = Spotify.getAccessToken();
            return fetch(`https://api.spotify.com/v1/search?type=track&q=${string}`, 
            {headers: {
                Authorization: `Bearer ${accessToken}`
            }}).then(response => {
                return response.json()
            }).then(jsonResponse => {
                if(!jsonResponse.tracks){
                    return [];
                }
                return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }));
            })
        }
}

export default Spotify;