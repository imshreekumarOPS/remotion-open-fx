import React, { CSSProperties, useMemo } from 'react';
import { useCurrentFrame, AbsoluteFill } from 'remotion';
import { progress, interp } from '../utils/interpolate';
import { easeOutCubic, easeInOutCubic } from '../utils/easing';
import { seededRandom } from '../utils/math';

// ─── Scramble Text ────────────────────────────────────────────────────────────

export interface ScrambleTextProps {
    text: string;
    startFrame?: number;
    durationFrames?: number;
    scrambleChars?: string;
    style?: CSSProperties;
}

/**
 * Text that scrambles characters before revealing the target word.
 */
export const ScrambleText: React.FC<ScrambleTextProps> = ({
    text,
    startFrame = 0,
    durationFrames = 30,
    scrambleChars = '!@#$%^&*()_+{}[];,./<>?',
    style,
}) => {
    const frame = useCurrentFrame();
    const p = progress(frame, startFrame, durationFrames, easeOutCubic);

    const chars = text.split('');
    const revealedCount = Math.floor(p * text.length);

    return (
        <span style={{ fontFamily: 'monospace', ...style }}>
            {chars.map((char, i) => {
                if (i < revealedCount) return <span key={i}>{char}</span>;

                // For unrevealed chars, show a random scramble char if we are in progress
                if (frame >= startFrame) {
                    const randomIdx = Math.floor(seededRandom(i + frame) * scrambleChars.length);
                    return <span key={i} style={{ opacity: 0.5 }}>{scrambleChars[randomIdx]}</span>;
                }

                return <span key={i} style={{ opacity: 0 }}>{char}</span>;
            })}
        </span>
    );
};

// ─── Neon Text ────────────────────────────────────────────────────────────────

export interface NeonTextProps {
    text: string;
    color?: string;
    fontSize?: number;
    flicker?: boolean;
    startFrame?: number;
    durationFrames?: number;
    style?: CSSProperties;
}

/**
 * High-end neon text with glowing effects and optional flicker.
 */
export const NeonText: React.FC<NeonTextProps> = ({
    text,
    color = '#00ffff',
    fontSize = 60,
    flicker = true,
    startFrame = 0,
    durationFrames = 20,
    style,
}) => {
    const frame = useCurrentFrame();
    const p = progress(frame, startFrame, durationFrames);

    // Flicker logic
    const flickerVal = flicker ? (seededRandom(frame) > 0.9 ? 0.2 : 1) : 1;
    const opacity = p * flickerVal;

    const glowStyle: CSSProperties = {
        color: '#fff',
        fontSize,
        fontWeight: 'bold',
        textShadow: `
            0 0 5px #fff,
            0 0 10px #fff,
            0 0 20px ${color},
            0 0 30px ${color},
            0 0 40px ${color}
        `,
        opacity,
        ...style,
    };

    return <span style={glowStyle}>{text}</span>;
};

// ─── ThreeD Text ─────────────────────────────────────────────────────────────

export interface ThreeDTextProps {
    text: string;
    depth?: number;
    color?: string;
    startFrame?: number;
    durationFrames?: number;
    style?: CSSProperties;
}

/**
 * Text with simulated 3D depth.
 */
export const ThreeDText: React.FC<ThreeDTextProps> = ({
    text,
    depth = 10,
    color = '#4ECDC4',
    startFrame = 0,
    durationFrames = 40,
    style,
}) => {
    const frame = useCurrentFrame();
    const p = progress(frame, startFrame, durationFrames, easeOutCubic);

    const layers = Array.from({ length: depth }).map((_, i) => {
        const offset = (i + 1) * p;
        return (
            <span
                key={i}
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    transform: `translate(${-offset}px, ${offset}px)`,
                    color: color,
                    opacity: 1 - i / depth,
                    zIndex: -i,
                }}
            >
                {text}
            </span>
        );
    });

    return (
        <span style={{ position: 'relative', display: 'inline-block', ...style }}>
            <span style={{ position: 'relative', zIndex: 1, color: '#fff' }}>{text}</span>
            {layers}
        </span>
    );
};

// ─── Text Morph ──────────────────────────────────────────────────────────────

export interface TextMorphProps {
    from: string;
    to: string;
    startFrame?: number;
    durationFrames?: number;
    style?: CSSProperties;
}

/**
 * Simple text morphing by interpolating characters.
 */
export const TextMorph: React.FC<TextMorphProps> = ({
    from,
    to,
    startFrame = 0,
    durationFrames = 40,
    style,
}) => {
    const frame = useCurrentFrame();
    const p = progress(frame, startFrame, durationFrames, easeInOutCubic);

    const maxLength = Math.max(from.length, to.length);
    const displayedChars = Array.from({ length: maxLength }).map((_, i) => {
        const charFrom = from[i] || '';
        const charTo = to[i] || '';

        // At p < 0.5 show 'from', else show 'to'
        // In the middle, show random or empty
        if (p === 0) return charFrom;
        if (p === 1) return charTo;

        const isRevealed = p > (i / maxLength);
        return isRevealed ? charTo : charFrom;
    });

    return <span style={style}>{displayedChars.join('')}</span>;
};

// ─── Handwritten Text ─────────────────────────────────────────────────────────

export interface HandwrittenTextProps {
    text: string;
    color?: string;
    fontSize?: number;
    strokeWidth?: number;
    startFrame?: number;
    durationFrames?: number;
    style?: CSSProperties;
}

/**
 * Draw-on effect using SVG dasharray. 
 * Note: This is an approximation since true handwriting requires path data.
 */
export const HandwrittenText: React.FC<HandwrittenTextProps> = ({
    text,
    color = '#fff',
    fontSize = 60,
    strokeWidth = 2,
    startFrame = 0,
    durationFrames = 60,
    style,
}) => {
    const frame = useCurrentFrame();
    const p = progress(frame, startFrame, durationFrames, easeOutCubic);

    // We use a simplified approach with text-decoration or SVG
    return (
        <svg width="100%" height={fontSize * 1.5} style={style}>
            <text
                x="10"
                y={fontSize}
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
                fontSize={fontSize}
                fontFamily="cursive"
                strokeDasharray="1000"
                strokeDashoffset={1000 * (1 - p)}
            >
                {text}
            </text>
        </svg>
    );
};

// ─── Outline Text ────────────────────────────────────────────────────────────

export interface OutlineTextProps {
    text: string;
    outlineColor?: string;
    fillColor?: string;
    strokeWidth?: number;
    startFrame?: number;
    durationFrames?: number;
    style?: CSSProperties;
}

/**
 * Animated text outline reveal.
 */
export const OutlineText: React.FC<OutlineTextProps> = ({
    text,
    outlineColor = '#FF6B6B',
    fillColor = 'transparent',
    strokeWidth = 2,
    startFrame = 0,
    durationFrames = 40,
    style,
}) => {
    const frame = useCurrentFrame();
    const p = progress(frame, startFrame, durationFrames, easeOutCubic);

    return (
        <span
            style={{
                WebkitTextStroke: `${strokeWidth}px ${outlineColor}`,
                color: p > 0.8 ? fillColor : 'transparent',
                transition: 'color 0.4s',
                display: 'inline-block',
                ...style,
            }}
        >
            {text}
        </span>
    );
};

// ─── Gradient Text ───────────────────────────────────────────────────────────

export interface GradientTextProps {
    text: string;
    colors?: string[];
    startFrame?: number;
    durationFrames?: number;
    style?: CSSProperties;
}

/**
 * Text with an animated gradient background-clip.
 */
export const GradientText: React.FC<GradientTextProps> = ({
    text,
    colors = ['#FF6B6B', '#4ECDC4', '#45B7D1'],
    style,
}) => {
    const frame = useCurrentFrame();
    const offset = (frame * 2) % 200;

    return (
        <span
            style={{
                background: `linear-gradient(90deg, ${colors.join(', ')}, ${colors[0]})`,
                backgroundSize: '200% auto',
                backgroundPosition: `${offset}% center`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
                fontWeight: 'bold',
                ...style,
            }}
        >
            {text}
        </span>
    );
};
