export async function fetchTiktokLiveData(username: string) {
    const response = await fetch(`https://tiktok-live-stream.vercel.app/api/tiktok-live/${username}`);
    return response.json();
}