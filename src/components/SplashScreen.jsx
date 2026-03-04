import React, { useState, useEffect, useRef } from 'react'

const SplashScreen = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState('loading'); // loading | exiting | done
    const rafRef = useRef(null);
    const startRef = useRef(null);

    const DURATION = 3000; // 3 seconds

    useEffect(() => {
        const animate = (timestamp) => {
            if (!startRef.current) startRef.current = timestamp;
            const elapsed = timestamp - startRef.current;
            const pct = Math.min(Math.floor((elapsed / DURATION) * 100), 100);
            setProgress(pct);

            if (pct < 100) {
                rafRef.current = requestAnimationFrame(animate);
            } else {
                // Start exit animation
                setTimeout(() => {
                    setPhase('exiting');
                    setTimeout(() => {
                        setPhase('done');
                        onComplete();
                    }, 800);
                }, 400);
            }
        };

        rafRef.current = requestAnimationFrame(animate);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [onComplete]);

    if (phase === 'done') return null;

    const circumference = 2 * Math.PI * 28;
    const strokeOffset = circumference - (progress / 100) * circumference;

    return (
        <div className={`splash-screen ${phase === 'exiting' ? 'splash-exit' : ''}`}>
            {/* Animated background grid */}
            <div className="splash-grid"></div>

            {/* Floating particles */}
            <div className="splash-particles">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="splash-particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 4}s`,
                        }}
                    ></div>
                ))}
            </div>

            {/* Center tagline */}
            <div className="splash-center">
                <div className="splash-logo-glitch" data-text="BHANUSAI">BHANUSAI</div>
                <div className="splash-tagline">
                    <span className="tagline-bracket">[</span>
                    <span className="tagline-text">INITIALIZING UPLINK</span>
                    <span className="tagline-dots">
                        <span>.</span><span>.</span><span>.</span>
                    </span>
                    <span className="tagline-bracket">]</span>
                </div>
                <div className="splash-status">
                    {progress < 30 && 'Loading modules...'}
                    {progress >= 30 && progress < 60 && 'Compiling assets...'}
                    {progress >= 60 && progress < 90 && 'Establishing connection...'}
                    {progress >= 90 && 'System ready.'}
                </div>
            </div>

            {/* Circular progress in bottom-right */}
            <div className="splash-progress-wrap">
                <svg className="splash-progress-svg" viewBox="0 0 64 64">
                    <circle
                        className="progress-track"
                        cx="32" cy="32" r="28"
                        fill="none"
                        stroke="rgba(255,255,255,0.06)"
                        strokeWidth="2"
                    />
                    <circle
                        className="progress-fill"
                        cx="32" cy="32" r="28"
                        fill="none"
                        stroke="url(#progressGrad)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeOffset}
                        transform="rotate(-90 32 32)"
                    />
                    <defs>
                        <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#ff6b6b" />
                            <stop offset="100%" stopColor="#4ecdc4" />
                        </linearGradient>
                    </defs>
                </svg>
                <div className="splash-pct">{progress}<span>%</span></div>
            </div>
        </div>
    );
};

export default SplashScreen;
