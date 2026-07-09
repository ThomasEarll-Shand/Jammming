const clientId = "8d1687fa7e0449769c01a81da0ddae0f";
const redirectUri = "http://127.0.0.1:5173/";

/* 
npm run dev -- --host 127.0.0.1 
Type this to run the server on localhost */

let accessToken;

const generateRandomString = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
};

const generateCodeVerifier = () => {
  const codeVerifier = generateRandomString(128);
  localStorage.setItem("code_verifier", codeVerifier);
  return codeVerifier;
};

const generateCodeChallenge = async (codeVerifier) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const base64String = btoa(String.fromCharCode(...hashArray));

  return base64String
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

const Spotify = {
  async getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      const codeVerifier = localStorage.getItem("code_verifier");

      const tokenResponse = await fetch(
        "https://accounts.spotify.com/api/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            client_id: clientId,
            grant_type: "authorization_code",
            code,
            redirect_uri: redirectUri,
            code_verifier: codeVerifier,
          }),
        }
      );

      const data = await tokenResponse.json();
      accessToken = data.access_token;

      window.history.pushState({}, null, "/");

      return accessToken;
    }

    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    const authUrl = new URL("https://accounts.spotify.com/authorize");
    authUrl.searchParams.append("client_id", clientId);
    authUrl.searchParams.append("response_type", "code");
    authUrl.searchParams.append("redirect_uri", redirectUri);
    authUrl.searchParams.append("code_challenge_method", "S256");
    authUrl.searchParams.append("code_challenge", codeChallenge);
    authUrl.searchParams.append(
      "scope",
      "playlist-modify-public playlist-modify-private"
    );
    authUrl.searchParams.append("show_dialog", "true");

    window.location.href = authUrl.toString();
  },

  async search(term) {
    const accessToken = await this.getAccessToken();

    const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(
      term
    )}`;

    const response = await fetch(searchUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();


    if (!data.tracks) {
      return [];
    }

    return data.tracks.items.map((track) => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri,
    }));
  },

    async savePlaylist(name, trackUris) {
  if (!name || !trackUris.length) {
    return;
  }

 const accessToken = await this.getAccessToken();

const playlistResponse = await fetch("https://api.spotify.com/v1/me/playlists", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name,
    description: "Created with Jammming",
    public: true,
  }),
});


const playlistData = await playlistResponse.json();
const playlistId = playlistData.id;

const tracksResponse = await fetch(
  `https://api.spotify.com/v1/playlists/${playlistId}/items`,
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uris: trackUris,
    }),
  }
);

const tracksData = await tracksResponse.json();

if (!tracksResponse.ok) {
  throw new Error(`Failed to add tracks: ${tracksData.error?.message}`);
}
  return playlistData;
}
};

export default Spotify;