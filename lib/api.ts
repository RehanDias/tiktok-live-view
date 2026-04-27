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
    data?: any; // Can be object or string
    status?: number;
    contentType?: string;
}

export async function fetchTiktokLiveData(username: string): Promise<TiktokResponse> {
    try {
        const targetUrl = `https://tiktok-live-stream.vercel.app/api/tiktok-live/${username}`;
        const proxyUrl = `https://cors-bypass-red.vercel.app/api?url=${encodeURIComponent(targetUrl)}`;
        
        const response = await fetch(proxyUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const proxyData: CorsProxyResponse = await response.json();
        
        if (!proxyData.success) {
            throw new Error(proxyData.error || 'Failed to fetch data from proxy');
        }
        
        if (!proxyData.data) {
            throw new Error('No data returned from proxy');
        }
        
        // Handle both object and string data
        let tiktokData: TiktokResponse;
        if (typeof proxyData.data === 'string') {
            tiktokData = JSON.parse(proxyData.data);
        } else {
            tiktokData = proxyData.data as TiktokResponse;
        }
        
        return tiktokData;
    } catch (error) {
        console.error('Error fetching TikTok live data:', error);
        throw error;
    }
}