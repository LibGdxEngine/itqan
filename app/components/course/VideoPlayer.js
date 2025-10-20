

import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import ReactPlayer from "react-player";
import {
    Play,
    Pause,
    RotateCcw,
    RotateCw,
    Volume2,
    VolumeX,
    Maximize,
    Minimize,
    Settings
} from "lucide-react";

export default function VideoPlayer({url = "/api/proxy/course/1/lesson/1", className = ""}) {
    const playerRef = useRef(null);
    const containerRef = useRef(null);

    const [playing, setPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [playedSeconds, setPlayedSeconds] = useState(0);
    const [loadedSeconds, setLoadedSeconds] = useState(0);
    const [volume, setVolume] = useState(0.8);
    const [muted, setMuted] = useState(false);
    const [rate, setRate] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // ---- Helpers ----
    const clamp = (val, min, max) => Math.min(max, Math.max(min, val));
    const fmt = (s) => {
        if (!Number.isFinite(s) || s <= 0) return "0:00";
        const m = Math.floor(s / 60);
        const sec = Math.floor(s % 60).toString().padStart(2, "0");
        return `${m}:${sec}`;
    };

    const progressPct = useMemo(() => (duration ? (playedSeconds / duration) * 100 : 0), [playedSeconds, duration]);
    const bufferPct = useMemo(() => (duration ? (loadedSeconds / duration) * 100 : 0), [loadedSeconds, duration]);

    // ---- Actions ----
    const togglePlay = useCallback(() => setPlaying(p => !p), []);
    const seekBy = useCallback((delta) => {
        const next = clamp(playedSeconds + delta, 0, duration || 0);
        playerRef.current.currentTime = next;
        setPlayedSeconds(next);
    }, [playedSeconds, duration]);

    const toggleMute = useCallback(() => setMuted(m => !m), []);

    const enterFullscreen = useCallback(async () => {
        try {
            await containerRef.current?.requestFullscreen();
        } catch {
        }
    }, []);
    const exitFullscreen = useCallback(async () => {
        try {
            await document.exitFullscreen();
        } catch {
        }
    }, []);

    // Keyboard shortcuts
    useEffect(() => {
        const onKey = (e) => {
            // Avoid hijacking when typing in inputs
            const tag = (e.target?.tagName || "").toLowerCase();
            if (["input", "textarea"].includes(tag) || e.target?.isContentEditable) return;
            if (e.code === "Space" || e.key?.toLowerCase() === "k") {
                e.preventDefault();
                togglePlay();
            } else if (e.key?.toLowerCase() === "j" || e.key === "ArrowLeft") {
                seekBy(10);
            } else if (e.key?.toLowerCase() === "l" || e.key === "ArrowRight") {
                seekBy(-10);
            } else if (e.key?.toLowerCase() === "m") {
                toggleMute();
            } else if (e.key?.toLowerCase() === "f") {
                isFullscreen ? exitFullscreen() : enterFullscreen();
            } else if (e.key === "ArrowUp") {
                setMuted(false);
                setVolume(v => clamp(v + 0.05, 0, 1));
            } else if (e.key === "ArrowDown") {
                setVolume(v => clamp(v - 0.05, 0, 1));
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [togglePlay, seekBy, toggleMute, isFullscreen, enterFullscreen, exitFullscreen]);

    const handleTimeUpdate = (e) => {
        setPlayedSeconds(e.currentTarget.currentTime);
    };

    // Called when metadata loads (video duration available)
    const handleDurationChange = () => {
        if (playerRef.current) {
            setDuration(playerRef.current.duration);
        }
    };

    // Called when user drags slider
    const handleSeek = (e) => {
        const newTime = parseFloat(e.target.value);
        setPlayedSeconds(newTime);
        if (playerRef.current) {
            playerRef.current.currentTime = newTime;
        }
    };
    // ---- Render ----
    return (
        <div
            ref={containerRef}
            className={`group relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-2xl ${className}`}
            onContextMenu={(e) => e.preventDefault()}
        >
            {/* Video layer */}
            <div
                className={`group relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-2xl ${className}`}
                onClick={togglePlay}
                onDoubleClick={() => isFullscreen ? exitFullscreen() : enterFullscreen()}
            >
                <ReactPlayer
                    ref={playerRef}
                    src={url}
                    width="100%"
                    height="100%"
                    playing={playing}
                    volume={volume}
                    muted={muted}
                    playbackRate={rate}
                    onTimeUpdate={handleTimeUpdate}
                    onDurationChange={handleDurationChange}
                    style={{pointerEvents: "none"}}
                    config={{
                        file: {
                            attributes: {
                                controlsList: "nodownload noremoteplayback noplaybackrate",
                                disablePictureInPicture: true,
                                preload: "metadata",
                                playsInline: true
                            }
                        }
                    }}
                />
            </div>

            {/* Big centered play button */}
            {!playing && (
                <button
                    onClick={togglePlay}
                    aria-label="Play"
                    className="absolute inset-0 m-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/15 backdrop-blur-md ring-1 ring-white/40 transition hover:bg-white/25"
                    style={{boxShadow: "0 10px 30px rgba(0,0,0,.35)", width: 80, height: 80}}
                >
                    <Play className="h-10 w-10 text-white"/>
                </button>
            )}

            {/* Top gradient & subtle header (could hold title) */}
            <div
                className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/70 via-black/30 to-transparent"/>

            {/* Bottom controls */}
            <div className="absolute inset-x-0 bottom-0 select-none">
                {/* Gradient backdrop */}
                <div
                    className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 via-black/40 to-transparent"/>

                {/* Controls */}
                <div
                    className="relative z-10 px-4 pb-4 pt-2 text-white opacity-100 md:opacity-0 md:transition md:duration-200 md:ease-out md:group-hover:opacity-100">

                    {/* Progress bar with buffer */}
                    <div className="mb-2 flex items-center gap-3">
                        <div className="relative w-full cursor-pointer py-2" aria-label="Seek bar">
                            <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-white/25"/>
                            <div
                                className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-white/40"
                                style={{width: `${bufferPct}%`}}
                            />
                            <div
                                className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-white"
                                style={{width: `${progressPct}%`}}
                            />
                            {/*<div*/}
                            {/*    className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-white shadow"*/}
                            {/*    style={{left: `calc(${progressPct}% - 6px)`}}*/}
                            {/*/>*/}
                             {/*Invisible input overlays the track for native dragging */}
                            <input
                                type="range"
                                min={0}
                                max={Math.max(0, duration)}
                                step={0.1}
                                value={playedSeconds}
                                onChange={handleSeek}
                                className="absolute inset-0 w-full cursor-pointer opacity-0"
                            />
                        </div>
                        <div className="w-[110px] shrink-0 text-right text-xs tabular-nums text-white/90">
                            {fmt(playedSeconds)} / {fmt(duration)}
                        </div>
                    </div>

                    {/* Buttons row */}
                    <div className="flex items-center gap-2">
                        <button onClick={() => seekBy(-10)} className={btn()} aria-label="Rewind 10 seconds">
                            <RotateCcw className="h-5 w-5"/>
                            <span className="sr-only">-10s</span>
                        </button>
                        <button onClick={togglePlay} className={btn("px-3")}
                                aria-label={playing ? "Pause" : "Play"}>
                            {playing ? <Pause className="h-5 w-5"/> : <Play className="h-5 w-5"/>}
                        </button>
                        <button onClick={() => seekBy(10)} className={btn()} aria-label="Forward 10 seconds">
                            <RotateCw className="h-5 w-5"/>
                            <span className="sr-only">+10s</span>
                        </button>

                        {/* Volume */}
                        <div className="ml-2 flex items-center gap-2">
                            <button onClick={toggleMute} className={btn("px-2")} aria-label={muted ? "Unmute" : "Mute"}>
                                {muted || volume === 0 ? <VolumeX className="h-5 w-5"/> :
                                    <Volume2 className="h-5 w-5"/>}
                            </button>
                            <input
                                type="range"
                                min={0}
                                max={1}
                                step={0.01}
                                value={muted ? 0 : volume}
                                onChange={(e) => {
                                    const v = parseFloat(e.target.value);
                                    setVolume(v);
                                    if (v > 0 && muted) setMuted(false);
                                }}
                                aria-label="Volume"
                                className="h-1 w-28 cursor-pointer accent-white"
                            />
                        </div>

                        {/* Playback rate */}
                        <div className="ml-2 hidden items-center gap-2 sm:flex">

                            <select
                                value={rate}
                                onChange={(e) => setRate(parseFloat(e.target.value))}
                                aria-label="Playback speed"
                                className="rounded-md border border-white/20 bg-white/10 px-2 py-1 text-sm text-white backdrop-blur-md hover:bg-white/20 focus:outline-none"
                            >
                                {[0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map(r => (
                                    <option key={r} value={r}>{r}×</option>
                                ))}
                            </select>
                            <style jsx global>{`
                                select option {
                                    background: #111; /* dark dropdown */
                                    color: #fff; /* white text */
                                }
                            `}</style>
                            <div className="text-xs text-white/70">Speed</div>
                        </div>

                        {/* Spacer */}
                        <div className="grow"/>

                        {/* Settings placeholder (extend with captions/quality, etc.) */}
                        <button className={btn()} aria-label="Settings">
                            <Settings className="h-5 w-5"/>
                        </button>

                        {/* Fullscreen */}
                        {isFullscreen ? (
                            <button onClick={exitFullscreen} className={btn()} aria-label="Exit Fullscreen">
                                <Minimize className="h-5 w-5"/>
                            </button>
                        ) : (
                            <button onClick={enterFullscreen} className={btn()} aria-label="Enter Fullscreen">
                                <Maximize className="h-5 w-5"/>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Tailwind button helper
const btn = (extra = "") =>
    `inline-flex items-center gap-2 rounded-xl bg-white/10 px-2.5 py-2 text-white shadow-sm ring-1 ring-white/20 backdrop-blur-md transition hover:bg-white/20 active:scale-[0.98] ${extra}`;
