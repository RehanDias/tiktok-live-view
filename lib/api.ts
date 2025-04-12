const CORS_PROXY = 'https://api.allorigins.win/get?url=';

export async function fetchTiktokLiveData(username: string) {
    const targetUrl = `https://tiktok-live-stream.vercel.app/api/tiktok-live/${username}`;
    const encodedUrl = encodeURIComponent(targetUrl);
    const response = await fetch(`${CORS_PROXY}${encodedUrl}`);
    const data = await response.json();
    return JSON.parse(data.contents);
}