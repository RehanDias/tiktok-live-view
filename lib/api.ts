interface TiktokStreamQuality {
    urls: {
        flv?: string;
        hls?: string;
    };
    resolution: string;
    bitrate: number;
    codec: string;
}

interface TiktokResponse {
    user: {
        nickname: string;
        uniqueId: string;
        id: string;
        followers: number;
        following: number;
        signature: string;
        verified: boolean;
        avatar: {
            large: string;
            medium: string;
            thumb: string;
        };
    };
    live: {
        isLive: boolean;
        roomId?: string;
        status?: number;
        title?: string;
        startTime?: number;
        viewerCount?: number;
        streamId?: string;
        coverUrl?: string;
        squareCoverUrl?: string;
        streamQualities?: {
            origin?: TiktokStreamQuality;
            uhd_60?: TiktokStreamQuality;
            hd_60?: TiktokStreamQuality;
            hd?: TiktokStreamQuality;
            sd?: TiktokStreamQuality;
            ld?: TiktokStreamQuality;
            ao?: TiktokStreamQuality;
        };
    };
}

interface AllOriginsResponse {
    contents: string;
    status: {
        url: string;
        content_type: string;
        http_code: number;
        response_time: number;
        content_length: number;
    }
}

export async function fetchTiktokLiveData(username: string): Promise<TiktokResponse> {
    try {
        const targetUrl = `https://tiktok-live-stream.vercel.app/api/tiktok-live/${username}`;
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
        
        const response = await fetch(proxyUrl);
        
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        
        const data: AllOriginsResponse = await response.json();
        
        // allorigins returns the response as a string in the contents field
        return JSON.parse(data.contents);
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}