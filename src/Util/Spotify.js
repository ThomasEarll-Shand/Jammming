const clientId = "8d1687fa7e0449769c01a81da0ddae0f";
const redirectUri = "http://localhost:5173/";

let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (tokenMatch && expiresInMatch) {
      accessToken = tokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);

      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");

    return accessToken;
  }

  const accessUrl = 
  `https://accounts.spotify.com/authorize?client_id=${clientId}` +
  `&response_type=token` +
  `&scope=playlist-modify-public` +
  `&redirect_uri=${redirectUri}`;

  window.location = accessUrl;
  }
},

async search(term) {
    const accessToken = Spotify.getAccessToken();
    
    const response = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const jsonResponse = await response.json();

    if (!jsonResponse.tracks) {
      return [];
    }

    return jsonResponse.tracks.items.map((track) => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
    }));
  }

  export default Spotify;