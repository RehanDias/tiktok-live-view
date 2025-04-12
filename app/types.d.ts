declare interface Window {
  Hls: {
    isSupported(): boolean;
    Events: {
      ERROR: string;
    };
    new(config?: {
      maxBufferLength?: number;
      maxMaxBufferLength?: number;
      maxBufferSize?: number;
    }): {
      loadSource(url: string): void;
      attachMedia(element: HTMLMediaElement): void;
      destroy(): void;
      on(event: string, callback: (event: string, data: any) => void): void;
    };
  };
  flvjs: {
    isSupported(): boolean;
    createPlayer(config: {
      type: string;
      url: string;
      isLive?: boolean;
      hasAudio?: boolean;
      hasVideo?: boolean;
    }): {
      attachMediaElement(element: HTMLMediaElement): void;
      load(): void;
      play(): void;
      destroy(): void;
    };
  };
}