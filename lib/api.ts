interface StreamQuality {
    flv?: string;
    hls?: string;
    lls?: string;
    resolution: string;
    bitrate: number;
    codec: string;
}

interface TiktokResponse {
    user: {
        id: string;
        nickname: string;
        uniqueId: string;
        signature: string;
        verified: boolean;
        stats: {
            followers: number;
            following: number;
        };
        avatar: {
            large: string;
            medium: string;
            thumb: string;
        };
    };
    live: {
        isLive: boolean;
        status: number;
        roomId: string;
        streamId: string;
        info: {
            title: string;
            startTime: number;
            coverUrl: string;
        };
        stats: {
            currentViewers: number | null;
            totalViewers: number;
            enterCount: number;
            newFollows: number;
        };
        stream: {
            origin?: StreamQuality;
            uhd_60?: StreamQuality;
            hd_60?: StreamQuality;
            hd?: StreamQuality;
            sd?: StreamQuality;
            ld?: StreamQuality;
            ao?: StreamQuality;
        } | null;
    };
    meta: {
        responseTime: number;
        cached: boolean;
    };
}

interface CorsProxyResponse {
    success: boolean;
    error?: string;
    data?: string;
}

export async function fetchTiktokLiveData(username: string): Promise<TiktokResponse> {
    try {
        const targetUrl = `https://tiktok-live-stream.vercel.app/api/tiktok-live/${username}`;
        const proxyUrl = `https://cors-bypass-red.vercel.app/api?url=${encodeURIComponent(targetUrl)}`;
        
        const response = await fetch(proxyUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: CorsProxyResponse = await response.json();
        
        if (!data.success) {
            throw new Error(data.error || 'Failed to fetch data from proxy');
        }
        
        if (!data.data) {
            throw new Error('No data returned from proxy');
        }
        
        // Parse the response data
        return JSON.parse(data.data);
    } catch (error) {
        console.error('Error fetching TikTok live data:', error);
        throw error;
    }
}