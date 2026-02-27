import React, { CSSProperties } from 'react';
import {
    CharReveal,
    WordReveal,
    Typewriter,
    LineReveal,
} from '../animations/text';
import {
    ScrambleText,
    NeonText,
    ThreeDText,
    TextMorph,
    HandwrittenText,
    OutlineText,
    GradientText,
} from '../animations/advancedText';

export interface AnimatedTextProps {
    children: string;
    mode?: 'chars' | 'words' | 'typewriter' | 'reveal' | 'scramble' | 'neon' | 'threed' | 'morph' | 'handwritten' | 'outline' | 'gradient';
    startFrame?: number;
    durationFrames?: number;
    delay?: number; // delay between chars/words
    animation?: 'fadeUp' | 'fadeIn' | 'pop' | 'glitch';
    revealDirection?: 'up' | 'down' | 'left' | 'right';
    style?: CSSProperties;
    // Props for specific modes
    from?: string; // for morph
    color?: string; // for neon, outline, handwritten, threed
    colors?: string[]; // for gradient
    fontSize?: number; // for neon, handwritten
}

/**
 * Unified animated text component — pick your mode and go.
 *
 * @example
 * <AnimatedText mode="chars" animation="fadeUp" startFrame={10}>
 *   Hello World
 * </AnimatedText>
 *
 * <AnimatedText mode="words" startFrame={0} delay={6}>
 *   The quick brown fox jumps over the lazy dog
 * </AnimatedText>
 *
 * <AnimatedText mode="typewriter" startFrame={20} durationFrames={90}>
 *   Typing this out...
 * </AnimatedText>
 */
export const AnimatedText: React.FC<AnimatedTextProps> = ({
    children,
    mode = 'words',
    startFrame = 0,
    durationFrames = 30,
    delay = 4,
    animation = 'fadeUp',
    revealDirection = 'up',
    style,
    from = '',
    color,
    colors,
    fontSize,
}) => {
    if (mode === 'chars') {
        return (
            <CharReveal
                text={children}
                startFrame={startFrame}
                durationFrames={durationFrames}
                charDelay={delay}
                animation={animation}
                style={style}
            />
        );
    }
    if (mode === 'words') {
        return (
            <WordReveal
                text={children}
                startFrame={startFrame}
                durationFrames={durationFrames}
                wordDelay={delay}
                style={style}
            />
        );
    }
    if (mode === 'typewriter') {
        return (
            <Typewriter
                text={children}
                startFrame={startFrame}
                durationFrames={durationFrames}
                style={style}
            />
        );
    }
    if (mode === 'reveal') {
        return (
            <LineReveal
                startFrame={startFrame}
                durationFrames={durationFrames}
                direction={revealDirection}
                style={style}
            >
                <span>{children}</span>
            </LineReveal>
        );
    }
    if (mode === 'scramble') {
        return (
            <ScrambleText
                text={children}
                startFrame={startFrame}
                durationFrames={durationFrames}
                style={style}
            />
        );
    }
    if (mode === 'neon') {
        return (
            <NeonText
                text={children}
                color={color}
                fontSize={fontSize}
                startFrame={startFrame}
                durationFrames={durationFrames}
                style={style}
            />
        );
    }
    if (mode === 'threed') {
        return (
            <ThreeDText
                text={children}
                color={color}
                startFrame={startFrame}
                durationFrames={durationFrames}
                style={style}
            />
        );
    }
    if (mode === 'morph') {
        return (
            <TextMorph
                from={from}
                to={children}
                startFrame={startFrame}
                durationFrames={durationFrames}
                style={style}
            />
        );
    }
    if (mode === 'handwritten') {
        return (
            <HandwrittenText
                text={children}
                color={color}
                fontSize={fontSize}
                startFrame={startFrame}
                durationFrames={durationFrames}
                style={style}
            />
        );
    }
    if (mode === 'outline') {
        return (
            <OutlineText
                text={children}
                outlineColor={color}
                startFrame={startFrame}
                durationFrames={durationFrames}
                style={style}
            />
        );
    }
    if (mode === 'gradient') {
        return (
            <GradientText
                text={children}
                colors={colors}
                style={style}
            />
        );
    }
    return <span style={style}>{children}</span>;
};
