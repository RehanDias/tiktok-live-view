"use client";

import React, { useState, useEffect, useRef } from "react";
import {
    Users,
    Volume2,
    VolumeX,
    Share2,
    Heart,
    Eye,
    Clock,
    History,
    Search,
    Loader2,
    Maximize2,
    PlayCircle,
    PauseCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Tooltip,
    TooltipProvider,
    TooltipTrigger,
    TooltipContent,
} from "@/components/ui/tooltip";
import { ThemeToggle } from "@/components/theme-toggle";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { fetchTiktokLiveData } from "@/lib/api";

interface TikTokResponse {
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
            origin?: {
                urls: { flv?: string; hls?: string };
                resolution: string;
                bitrate: number;
            };
            uhd_60?: {
                urls: { flv?: string; hls?: string };
                resolution: string;
                bitrate: number;
            };
            hd_60?: {
                urls: { flv?: string; hls?: string };
                resolution: string;
                bitrate: number;
            };
            hd?: {
                urls: { flv?: string; hls?: string };
                resolution: string;
                bitrate: number;
            };
            sd?: {
                urls: { flv?: string; hls?: string };
                resolution: string;
                bitrate: number;
            };
            ld?: {
                urls: { flv?: string; hls?: string };
                resolution: string;
                bitrate: number;
            };
        };
    };
}

export default function Home() {
    const [username, setUsername] = useState("");
    const [streamData, setStreamData] = useState<TikTokResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);
    const [volume, setVolume] = useState(1);
    const [selectedQuality, setSelectedQuality] = useState<
        "origin" | "uhd_60" | "hd_60" | "hd" | "sd" | "ld"
    >("hd");
    const [recentSearches, setRecentSearches] = useState<string[]>(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("recentSearches");
            return saved ? JSON.parse(saved) : [];
        }
        return [];
    });
    const [isLiked, setIsLiked] = useState(false);
    const [showRecentSearches, setShowRecentSearches] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [autoQuality, setAutoQuality] = useState(true);
    const [loadingQuality, setLoadingQuality] = useState(false);
    const [showControls, setShowControls] = useState(true);

    const videoRef = useRef<HTMLVideoElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const hlsRef = useRef<any>(null);
    const flvPlayerRef = useRef<any>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const refreshIntervalRef = useRef<NodeJS.Timeout>();
    const networkSpeedRef = useRef<number>(0);
    const qualityCheckTimeoutRef = useRef<NodeJS.Timeout>();
    const mouseTimeoutRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        const handleMouseMove = () => {
            setShowControls(true);

            if (mouseTimeoutRef.current) {
                clearTimeout(mouseTimeoutRef.current);
            }

            if (isFullscreen) {
                mouseTimeoutRef.current = setTimeout(() => {
                    setShowControls(false);
                }, 3000);
            }
        };

        const handleMouseLeave = () => {
            if (isFullscreen) {
                setShowControls(false);
            }
        };

        if (videoContainerRef.current) {
            videoContainerRef.current.addEventListener(
                "mousemove",
                handleMouseMove
            );
            videoContainerRef.current.addEventListener(
                "mouseleave",
                handleMouseLeave
            );
        }

        return () => {
            if (videoContainerRef.current) {
                videoContainerRef.current.removeEventListener(
                    "mousemove",
                    handleMouseMove
                );
                videoContainerRef.current.removeEventListener(
                    "mouseleave",
                    handleMouseLeave
                );
            }
            if (mouseTimeoutRef.current) {
                clearTimeout(mouseTimeoutRef.current);
            }
        };
    }, [isFullscreen]);

    useEffect(() => {
        localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
    }, [recentSearches]);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(document.fullscreenElement !== null);
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () =>
            document.removeEventListener(
                "fullscreenchange",
                handleFullscreenChange
            );
    }, []);

    useEffect(() => {
        return () => {
            if (refreshIntervalRef.current) {
                clearInterval(refreshIntervalRef.current);
            }
        };
    }, []);

    const toggleFullscreen = () => {
        if (!videoContainerRef.current) return;

        if (!document.fullscreenElement) {
            videoContainerRef.current.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    const togglePlay = () => {
        if (!videoRef.current) return;

        try {
            if (videoRef.current.paused) {
                const playPromise = videoRef.current.play();
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            setIsPlaying(true);
                        })
                        .catch((err) => {
                            console.error("Error playing video:", err);
                            setIsPlaying(false);
                        });
                }
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        } catch (err) {
            console.error("Toggle play error:", err);
        }
    };

    const handleVolumeChange = (value: number[]) => {
        const newVolume = value[0];
        setVolume(newVolume);
        if (videoRef.current) {
            videoRef.current.volume = newVolume;
            setIsMuted(newVolume === 0);
        }
    };

    const toggleMute = () => {
        if (!videoRef.current) return;

        if (isMuted) {
            videoRef.current.volume = volume;
            setIsMuted(false);
        } else {
            videoRef.current.volume = 0;
            setIsMuted(true);
        }
    };

    const addToRecentSearches = (search: string) => {
        const updated = [
            search,
            ...recentSearches.filter((s) => s !== search),
        ].slice(0, 5);
        setRecentSearches(updated);
    };

    const measureNetworkSpeed = async (): Promise<number> => {
        const startTime = performance.now();
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000);

            const response = await fetch("https://www.google.com/favicon.ico", {
                method: "GET",
                signal: controller.signal,
                cache: "no-cache",
            });

            clearTimeout(timeoutId);
            const endTime = performance.now();
            const duration = endTime - startTime;

            const speed = duration > 0 ? 1000 / duration : 5;
            return speed;
        } catch (error) {
            console.warn("Failed to measure network speed:", error);
            return 5;
        }
    };

    const getOptimalQuality = (
        qualities: TikTokResponse["live"]["streamQualities"],
        networkSpeed: number
    ): string => {
        if (!qualities) return "hd";

        const qualityLevels: { [key: string]: number } = {
            ld: 1,
            sd: 2,
            hd: 3,
            hd_60: 4,
            uhd_60: 5,
            origin: 6,
        };

        const availableQualities = Object.entries(qualities)
            .filter(([quality]) => quality !== "ao")
            .sort(
                ([a], [b]) =>
                    qualityLevels[a as keyof typeof qualityLevels] -
                    qualityLevels[b as keyof typeof qualityLevels]
            );

        if (availableQualities.length === 0) return "hd";

        if (networkSpeed < 2) return availableQualities[0]?.[0] || "ld";
        if (networkSpeed < 5) return "sd";
        if (networkSpeed < 10) return "hd";
        if (networkSpeed < 20) return "hd_60";
        return "origin";
    };

    const checkAndUpdateQuality = async () => {
        if (!autoQuality || !streamData?.live.streamQualities) return;

        setLoadingQuality(true);
        const speed = await measureNetworkSpeed();
        networkSpeedRef.current = speed;

        const optimalQuality = getOptimalQuality(
            streamData.live.streamQualities,
            speed
        );
        if (optimalQuality && optimalQuality !== selectedQuality) {
            setSelectedQuality(optimalQuality as any);
        }
        setLoadingQuality(false);

        qualityCheckTimeoutRef.current = setTimeout(
            checkAndUpdateQuality,
            30000
        );
    };

    useEffect(() => {
        if (streamData?.live.isLive) {
            checkAndUpdateQuality();
        }

        return () => {
            if (qualityCheckTimeoutRef.current) {
                clearTimeout(qualityCheckTimeoutRef.current);
            }
        };
    }, [streamData?.live.isLive, autoQuality]);

    const fetchStreamData = async (searchUsername: string = username) => {
        if (!searchUsername) return;

        setLoading(true);
        setError("");
        setShowRecentSearches(false);

        try {
            const data = await fetchTiktokLiveData(searchUsername);
            setStreamData(data);
            addToRecentSearches(searchUsername);

            if (refreshIntervalRef.current) {
                clearInterval(refreshIntervalRef.current);
            }

            if (data.live.isLive) {
                refreshIntervalRef.current = setInterval(async () => {
                    try {
                        const refreshData = await fetchTiktokLiveData(
                            searchUsername
                        );
                        setStreamData((prev) =>
                            prev
                                ? {
                                      ...prev,
                                      live: {
                                          ...prev.live,
                                          viewerCount:
                                              refreshData.live.viewerCount,
                                      },
                                  }
                                : refreshData
                        );
                    } catch (err) {
                        console.error("Failed to refresh viewer count:", err);
                    }
                }, 5 * 60 * 1000);
            }
        } catch (err) {
            console.error("Fetch error:", err);
            setError("Failed to fetch stream data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!streamData?.live.isLive || !videoRef.current) return;

        const streamUrl = getStreamUrl();
        if (!streamUrl) return;

        const cleanupPlayers = () => {
            if (hlsRef.current) {
                try {
                    hlsRef.current.destroy();
                } catch (e) {
                    console.warn("Error destroying HLS player:", e);
                }
                hlsRef.current = null;
            }
            if (flvPlayerRef.current) {
                try {
                    if (
                        flvPlayerRef.current.destroy &&
                        typeof flvPlayerRef.current.destroy === "function"
                    ) {
                        flvPlayerRef.current.destroy();
                    }
                } catch (e) {
                    console.warn("Error destroying FLV player:", e);
                }
                flvPlayerRef.current = null;
            }
        };

        cleanupPlayers();

        const initializePlayer = async () => {
            if (typeof window === "undefined") return;

            if (streamUrl.includes(".m3u8")) {
                try {
                    const Hls = (await import("hls.js")).default;
                    if (Hls.isSupported()) {
                        const hls = new Hls({
                            maxBufferLength: 30,
                            maxMaxBufferLength: 60,
                            maxBufferSize: 60 * 1000 * 1000,
                        });
                        hlsRef.current = hls;
                        hls.loadSource(streamUrl);
                        hls.attachMedia(videoRef.current!);

                        hls.on(Hls.Events.ERROR, (event, data) => {
                            if (data.fatal) {
                                console.error("HLS error:", data);
                                if (autoQuality) {
                                    const qualities = Object.keys(
                                        streamData.live.streamQualities || {}
                                    );
                                    const currentIndex =
                                        qualities.indexOf(selectedQuality);
                                    if (currentIndex > 0) {
                                        setSelectedQuality(
                                            qualities[currentIndex - 1] as any
                                        );
                                    }
                                }
                            }
                        });
                    } else if (
                        videoRef.current?.canPlayType(
                            "application/vnd.apple.mpegurl"
                        )
                    ) {
                        videoRef.current.src = streamUrl;
                    }
                } catch (err) {
                    console.error("Failed to load HLS player:", err);
                }
            } else if (streamUrl.includes(".flv")) {
                try {
                    const flvjs = (await import("flv.js")).default;
                    if (flvjs && flvjs.isSupported()) {
                        const flvPlayer = flvjs.createPlayer({
                            type: "flv",
                            url: streamUrl,
                            isLive: true,
                            hasAudio: true,
                            hasVideo: true,
                        });
                        flvPlayerRef.current = flvPlayer;
                        if (videoRef.current) {
                            flvPlayer.attachMediaElement(videoRef.current);
                            flvPlayer.load();
                        }
                    }
                } catch (err) {
                    console.error("Failed to load FLV player:", err);
                }
            }
        };

        initializePlayer();

        return () => {
            cleanupPlayers();
        };
    }, [streamData, selectedQuality, autoQuality]);

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            fetchStreamData();
        } else if (e.key === "Escape") {
            setShowRecentSearches(false);
        }
    };

    const getStreamUrl = () => {
        if (!streamData || !streamData.live.streamQualities) return null;

        const qualities = streamData.live.streamQualities;
        const quality = qualities[selectedQuality];

        if (!quality?.urls) return null;

        return quality.urls.hls || quality.urls.flv || null;
    };

    const getQualityLabel = (quality: string, resolution: string) => {
        switch (quality) {
            case "origin":
                return `Source - ${resolution}`;
            case "uhd_60":
                return `4K 60FPS - ${resolution}`;
            case "hd_60":
                return `HD 60FPS - ${resolution}`;
            case "hd":
                return `HD - ${resolution}`;
            case "sd":
                return `SD - ${resolution}`;
            case "ld":
                return `LD - ${resolution}`;
            default:
                return `${quality.toUpperCase()} - ${resolution}`;
        }
    };

    const handleShare = async () => {
        try {
            await navigator.share({
                title: `${streamData?.user.nickname}'s TikTok Live Stream`,
                text: `Watch ${streamData?.user.nickname}'s live stream on TikTok!`,
                url: `https://www.tiktok.com/@${streamData?.user.uniqueId}/live`,
            });
        } catch (err) {
            console.warn("Share failed:", err);
        }
    };

    const formatTime = (timestamp: number) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleTimeString();
    };

    return (
        <TooltipProvider>
            <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-100 via-purple-100 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-violet-900 transition-all duration-500">
                <nav className="fixed top-4 right-4 z-50">
                    <ThemeToggle />
                </nav>

                <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
                    <div className="text-center space-y-4 pt-12 md:pt-16">
                        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 drop-shadow-sm animate-gradient">
                            TikTok Live Viewer
                        </h1>
                        <p className="text-muted-foreground text-lg md:text-xl">
                            Watch TikTok live streams directly in your browser
                        </p>
                    </div>

                    <div className="relative max-w-md mx-auto">
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <Input
                                    ref={searchInputRef}
                                    placeholder="Enter TikTok username"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    onKeyDown={handleKeyPress}
                                    onFocus={() => setShowRecentSearches(true)}
                                    className="h-12 text-lg pl-10 pr-4 border-2 focus:border-violet-500 dark:bg-gray-800/50 dark:focus:border-violet-400 backdrop-blur-sm transition-all duration-300"
                                />
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            </div>
                            <Button
                                onClick={() => fetchStreamData()}
                                disabled={loading}
                                className="min-w-[100px] h-12 text-lg font-medium bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 hover:from-pink-600 hover:via-purple-600 hover:to-violet-600 transition-all duration-300 dark:from-violet-500 dark:via-purple-400 dark:to-pink-400 hover:scale-105 transform"
                            >
                                {loading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    "Check"
                                )}
                            </Button>
                        </div>

                        {showRecentSearches && recentSearches.length > 0 && (
                            <Card className="absolute top-full left-0 right-0 mt-2 p-2 z-10 border-2 shadow-lg bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm">
                                <div className="flex items-center gap-2 px-2 py-1 text-sm text-muted-foreground">
                                    <History className="w-4 h-4" />
                                    <span>Recent Searches</span>
                                </div>
                                {recentSearches.map((search, index) => (
                                    <Button
                                        key={index}
                                        variant="ghost"
                                        className="w-full justify-start text-left hover:bg-accent/50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                                        onClick={() => {
                                            setUsername(search);
                                            fetchStreamData(search);
                                        }}
                                    >
                                        {search}
                                    </Button>
                                ))}
                            </Card>
                        )}
                    </div>

                    {error && (
                        <div className="text-destructive text-center p-4 bg-destructive/10 rounded-lg backdrop-blur-sm border border-destructive/20 dark:bg-red-900/20 animate-shake">
                            {error}
                        </div>
                    )}

                    {streamData && (
                        <Card className="overflow-hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-2 shadow-xl transform hover:scale-[1.01] transition-all duration-300">
                            {streamData.live.isLive && getStreamUrl() && (
                                <div
                                    ref={videoContainerRef}
                                    className="relative aspect-video bg-black group"
                                >
                                    <video
                                        ref={videoRef}
                                        autoPlay
                                        playsInline
                                        className="w-full h-full"
                                    />
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent transition-opacity duration-300 ${
                                            showControls || !isFullscreen
                                                ? "opacity-0 group-hover:opacity-100"
                                                : "opacity-0"
                                        }`}
                                    />
                                    <div
                                        className={`absolute bottom-0 left-0 right-0 p-4 flex items-center gap-4 transition-all duration-300 transform ${
                                            showControls || !isFullscreen
                                                ? "opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                                                : "opacity-0 translate-y-full"
                                        }`}
                                    >
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-white hover:bg-white/20 backdrop-blur-sm"
                                                    onClick={togglePlay}
                                                >
                                                    {isPlaying ? (
                                                        <PauseCircle className="h-6 w-6" />
                                                    ) : (
                                                        <PlayCircle className="h-6 w-6" />
                                                    )}
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                {isPlaying ? "Pause" : "Play"}
                                            </TooltipContent>
                                        </Tooltip>

                                        <div className="flex items-center gap-2">
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-white hover:bg-white/20 backdrop-blur-sm"
                                                        onClick={toggleMute}
                                                    >
                                                        {isMuted ? (
                                                            <VolumeX className="h-5 w-5" />
                                                        ) : (
                                                            <Volume2 className="h-5 w-5" />
                                                        )}
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    {isMuted
                                                        ? "Unmute"
                                                        : "Mute"}
                                                </TooltipContent>
                                            </Tooltip>
                                            <div className="w-24">
                                                <Slider
                                                    value={[
                                                        isMuted ? 0 : volume,
                                                    ]}
                                                    min={0}
                                                    max={1}
                                                    step={0.1}
                                                    onValueChange={
                                                        handleVolumeChange
                                                    }
                                                    className="cursor-pointer"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex-1" />

                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-white hover:bg-white/20 backdrop-blur-sm"
                                                    onClick={toggleFullscreen}
                                                >
                                                    <Maximize2 className="h-5 w-5" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                {isFullscreen
                                                    ? "Exit fullscreen"
                                                    : "Enter fullscreen"}
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                </div>
                            )}

                            <div className="p-8 space-y-6">
                                <div className="flex items-center gap-6">
                                    <img
                                        src={streamData.user.avatar.large}
                                        alt={streamData.user.nickname}
                                        className="w-20 h-20 rounded-full ring-4 ring-offset-4 ring-violet-500/50 dark:ring-violet-400/50 shadow-lg hover:scale-110 transition-transform duration-300"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 dark:from-violet-400 dark:to-pink-400">
                                                {streamData.user.nickname}
                                            </h2>
                                            {streamData.user.verified && (
                                                <span className="bg-gradient-to-r from-pink-500 to-violet-500 dark:from-violet-400 dark:to-pink-400 text-white text-sm px-3 py-1 rounded-full font-medium shadow-md animate-pulse">
                                                    Verified
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-muted-foreground text-lg mb-2">
                                            @{streamData.user.uniqueId}
                                        </p>
                                        <div className="flex items-center gap-6">
                                            <div className="flex items-center gap-2">
                                                <Users className="w-5 h-5 text-violet-500 dark:text-violet-400" />
                                                <span className="text-lg">
                                                    {streamData.user.followers.toLocaleString()}{" "}
                                                    followers
                                                </span>
                                            </div>
                                            <span className="text-muted-foreground text-lg">
                                                {streamData.user.following.toLocaleString()}{" "}
                                                following
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() =>
                                                        setIsLiked(!isLiked)
                                                    }
                                                    className={`transition-all duration-300 hover:scale-110 ${
                                                        isLiked
                                                            ? "bg-pink-500 text-white border-pink-500 hover:bg-pink-600 hover:border-pink-600 dark:bg-pink-400 dark:border-pink-400"
                                                            : ""
                                                    }`}
                                                >
                                                    <Heart
                                                        className={`h-5 w-5 ${
                                                            isLiked
                                                                ? "fill-current animate-heartbeat"
                                                                : ""
                                                        }`}
                                                    />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                Like
                                            </TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={handleShare}
                                                    className="hover:scale-110 transition-transform duration-300 dark:hover:bg-gray-800"
                                                >
                                                    <Share2 className="h-5 w-5" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                Share
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                </div>

                                <div className="border-t border-border/50 pt-6 dark:border-gray-700">
                                    <div className="flex items-center gap-3 mb-4">
                                        {streamData.live.isLive ? (
                                            <>
                                                <div className="w-3 h-3 bg-red-500 dark:bg-red-400 rounded-full animate-pulse shadow-lg shadow-red-500/50" />
                                                <span className="font-medium text-lg">
                                                    LIVE NOW
                                                </span>
                                                <div className="flex items-center gap-4 text-muted-foreground text-lg">
                                                    <div className="flex items-center gap-2">
                                                        <Eye className="w-5 h-5 text-violet-500 dark:text-violet-400" />
                                                        <span>
                                                            {streamData.live.viewerCount?.toLocaleString()}{" "}
                                                            watching
                                                        </span>
                                                    </div>
                                                    {streamData.live
                                                        .startTime && (
                                                        <div className="flex items-center gap-2">
                                                            <Clock className="w-5 h-5 text-violet-500 dark:text-violet-400" />
                                                            <span>
                                                                Started at{" "}
                                                                {formatTime(
                                                                    streamData
                                                                        .live
                                                                        .startTime
                                                                )}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full" />
                                                <span className="text-muted-foreground text-lg">
                                                    Not Live
                                                </span>
                                            </>
                                        )}
                                    </div>

                                    {streamData.live.isLive &&
                                        streamData.live.title && (
                                            <p className="text-xl font-medium mb-4 bg-gradient-to-r from-pink-500 to-violet-500 dark:from-violet-400 dark:to-pink-400 bg-clip-text text-transparent">
                                                {streamData.live.title}
                                            </p>
                                        )}

                                    {streamData.live.isLive &&
                                        streamData.live.streamQualities && (
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center gap-2">
                                                    <Switch
                                                        checked={autoQuality}
                                                        onCheckedChange={
                                                            setAutoQuality
                                                        }
                                                        id="auto-quality"
                                                    />
                                                    <Label
                                                        htmlFor="auto-quality"
                                                        className="text-sm"
                                                    >
                                                        Auto Quality{" "}
                                                        {loadingQuality && (
                                                            <Loader2 className="inline-block w-4 h-4 animate-spin ml-2" />
                                                        )}
                                                    </Label>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {Object.entries(
                                                        streamData.live
                                                            .streamQualities
                                                    )
                                                        .filter(
                                                            ([quality]) =>
                                                                quality !== "ao"
                                                        )
                                                        .map(
                                                            ([
                                                                quality,
                                                                data,
                                                            ]) => (
                                                                <Button
                                                                    key={
                                                                        quality
                                                                    }
                                                                    variant={
                                                                        selectedQuality ===
                                                                        quality
                                                                            ? "default"
                                                                            : "outline"
                                                                    }
                                                                    size="sm"
                                                                    onClick={() => {
                                                                        setAutoQuality(
                                                                            false
                                                                        );
                                                                        setSelectedQuality(
                                                                            quality as any
                                                                        );
                                                                    }}
                                                                    disabled={
                                                                        autoQuality
                                                                    }
                                                                    className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
                                                                        selectedQuality ===
                                                                        quality
                                                                            ? "bg-gradient-to-r from-pink-500 to-violet-500 dark:from-violet-400 dark:to-pink-400 hover:from-pink-600 hover:to-violet-600 text-white shadow-md"
                                                                            : "hover:border-violet-500 dark:hover:border-violet-400 dark:hover:bg-gray-800"
                                                                    }`}
                                                                >
                                                                    {getQualityLabel(
                                                                        quality,
                                                                        data.resolution
                                                                    )}
                                                                </Button>
                                                            )
                                                        )}
                                                </div>
                                            </div>
                                        )}

                                    {streamData.user.signature && (
                                        <div className="border-t border-border/50 dark:border-gray-700 pt-6">
                                            <p className="text-muted-foreground text-lg italic">
                                                {streamData.user.signature}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Card>
                    )}
                </div>
            </main>
        </TooltipProvider>
    );
}
