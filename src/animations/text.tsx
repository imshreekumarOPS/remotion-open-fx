import React, { CSSProperties } from 'react';
import { useCurrentFrame } from 'remotion';
import { progress } from '../utils/interpolate';
import { easeOutCubic, easeOutBack } from '../utils/easing';
import { seededRandom } from '../utils/math';

// ─── Character-Level ─────────────────────────────────────────────────────────

export interface CharRevealProps {
    text: string;
    startFrame?: number;
    durationFrames?: number;
    charDelay?: number;
    style?: CSSProperties;
    charStyle?: CSSProperties;
    animation?: 'fadeUp' | 'fadeIn' | 'pop' | 'glitch';
}

/**
 * Reveals text character by character.
 * Each char gets its own animated entrance.
 *
 * @example
 * <CharReveal text="Hello World" startFrame={10} durationFrames={20} charDelay={2} />
 */
export const CharReveal: React.FC<CharRevealProps> = ({
    text,
    startFrame = 0,
    durationFrames = 15,
    charDelay = 2,
    style,
    charStyle,
    animation = 'fadeUp',
}) => {
    const frame = useCurrentFrame();
    const chars = text.split('');

    return (
        <span style={{ display: 'inline-block', ...style }}>
            {chars.map((char, i) => {
                const charStart = startFrame + i * charDelay;
                const p = progress(frame, charStart, durationFrames, easeOutCubic);

                let animStyle: CSSProperties = {};
                if (animation === 'fadeUp') {
                    animStyle = {
                        opacity: p,
                        transform: `translateY(${(1 - p) * 20}px)`,
                    };
                } else if (animation === 'fadeIn') {
                    animStyle = { opacity: p };
                } else if (animation === 'pop') {
                    animStyle = {
                        opacity: Math.min(p * 3, 1),
                        transform: `scale(${0.5 + p * 0.5})`,
                    };
                } else if (animation === 'glitch') {
                    const glitchX =
                        p < 1
                            ? (seededRandom(i * 7 + Math.floor(frame * 0.5)) - 0.5) *
                            10 *
                            (1 - p)
                            : 0;
                    animStyle = {
                        opacity: p,
                        transform: `translateX(${glitchX}px)`,
                    };
                }

                return (
                    <span
                        key={i}
                        style={{
                            display: 'inline-block',
                            whiteSpace: char === ' ' ? 'pre' : 'normal',
                            ...animStyle,
                            ...charStyle,
                        }}
                    >
                        {char}
                    </span>
                );
            })}
        </span>
    );
};

// ─── Word-Level ───────────────────────────────────────────────────────────────

export interface WordRevealProps {
    text: string;
    startFrame?: number;
    durationFrames?: number;
    wordDelay?: number;
    style?: CSSProperties;
    wordStyle?: CSSProperties;
}

/**
 * Reveals text word by word.
 *
 * @example
 * <WordReveal text="The quick brown fox" startFrame={0} wordDelay={8} />
 */
export const WordReveal: React.FC<WordRevealProps> = ({
    text,
    startFrame = 0,
    durationFrames = 20,
    wordDelay = 8,
    style,
    wordStyle,
}) => {
    const frame = useCurrentFrame();
    const words = text.split(' ');

    return (
        <span style={{ display: 'inline-block', ...style }}>
            {words.map((word, i) => {
                const wordStart = startFrame + i * wordDelay;
                const p = progress(frame, wordStart, durationFrames, easeOutBack);
                return (
                    <React.Fragment key={i}>
                        <span
                            style={{
                                display: 'inline-block',
                                opacity: p,
                                transform: `translateY(${(1 - p) * 30}px)`,
                                ...wordStyle,
                            }}
                        >
                            {word}
                        </span>
                        {i < words.length - 1 && ' '}
                    </React.Fragment>
                );
            })}
        </span>
    );
};

// ─── Typewriter ───────────────────────────────────────────────────────────────

export interface TypewriterProps {
    text: string;
    startFrame?: number;
    durationFrames?: number;
    cursorChar?: string;
    showCursor?: boolean;
    style?: CSSProperties;
}

/**
 * Classic typewriter effect with optional cursor.
 *
 * @example
 * <Typewriter text="Hello, World!" startFrame={0} durationFrames={60} />
 */
export const Typewriter: React.FC<TypewriterProps> = ({
    text,
    startFrame = 0,
    durationFrames = 60,
    cursorChar = '|',
    showCursor = true,
    style,
}) => {
    const frame = useCurrentFrame();
    const p = progress(frame, startFrame, durationFrames);
    const charCount = Math.floor(p * text.length);
    const cursorVisible =
        showCursor && frame >= startFrame && Math.floor(frame / 15) % 2 === 0;

    return (
        <span style={style}>
            {text.slice(0, charCount)}
            {cursorVisible && (
                <span style={{ opacity: 1, marginLeft: 1 }}>{cursorChar}</span>
            )}
        </span>
    );
};

// ─── Line Reveal (mask reveal) ────────────────────────────────────────────────

export interface LineRevealProps {
    children: React.ReactNode;
    startFrame?: number;
    durationFrames?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
    style?: CSSProperties;
}

/**
 * Reveals content using a clip-path mask — like text sliding up from behind a bar.
 * Works great for headline reveals.
 *
 * @example
 * <LineReveal startFrame={10} durationFrames={25}>
 *   <h1>BIG HEADLINE</h1>
 * </LineReveal>
 */
export const LineReveal: React.FC<LineRevealProps> = ({
    children,
    startFrame = 0,
    durationFrames = 25,
    direction = 'up',
    style,
}) => {
    const frame = useCurrentFrame();
    const p = progress(frame, startFrame, durationFrames, easeOutCubic);

    const clipPaths = {
        up: `inset(${(1 - p) * 100}% 0 0 0)`,
        down: `inset(0 0 ${(1 - p) * 100}% 0)`,
        left: `inset(0 ${(1 - p) * 100}% 0 0)`,
        right: `inset(0 0 0 ${(1 - p) * 100}%)`,
    };

    return (
        <div style={{ overflow: 'hidden', ...style }}>
            <div style={{ clipPath: clipPaths[direction] }}>{children}</div>
        </div>
    );
};
