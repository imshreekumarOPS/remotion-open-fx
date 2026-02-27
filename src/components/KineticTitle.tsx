import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { interp } from '../utils/interpolate';
import { easeOutCubic, easeInCubic } from '../utils/easing';
import { WordReveal } from '../animations/text';
import { Vignette } from '../overlays/colorGrade';

export interface KineticTitleProps {
    headline: string;
    subheadline?: string;
    startFrame?: number;
    exitFrame?: number;
    transitionDuration?: number;
    backgroundColor?: string;
    accentColor?: string;
    textColor?: string;
    background?: React.ReactNode;
}

/**
 * Full-screen kinetic title card with headline, subheadline,
 * animated entrance/exit, and optional background layer.
 *
 * @example
 * <KineticTitle
 *   headline="THE FUTURE IS NOW"
 *   subheadline="A documentary about AI"
 *   startFrame={0}
 *   exitFrame={120}
 *   accentColor="#FF6B6B"
 *   background={<KineticGradient colors={['#0F0C29','#302B63']} />}
 * />
 */
export const KineticTitle: React.FC<KineticTitleProps> = ({
    headline,
    subheadline,
    startFrame = 0,
    exitFrame,
    transitionDuration = 25,
    backgroundColor = '#111',
    accentColor = '#FF6B6B',
    textColor = '#fff',
    background,
}) => {
    const frame = useCurrentFrame();

    const enterP = interp(
        frame,
        [startFrame, startFrame + transitionDuration],
        [0, 1],
        { easing: easeOutCubic },
    );
    const exitP = exitFrame
        ? interp(
            frame,
            [exitFrame, exitFrame + transitionDuration],
            [0, 1],
            { easing: easeInCubic },
        )
        : 0;
    const globalOpacity = Math.max(0, Math.min(enterP, 1 - exitP));

    const lineP = interp(
        frame,
        [startFrame, startFrame + transitionDuration * 0.8],
        [0, 1],
        { easing: easeOutCubic },
    );

    return (
        <AbsoluteFill
            style={{
                backgroundColor,
                opacity: globalOpacity,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {background}
            <Vignette />

            <div
                style={{
                    position: 'relative',
                    zIndex: 10,
                    textAlign: 'center',
                    padding: '0 60px',
                }}
            >
                {/* Accent line */}
                <div
                    style={{
                        width: `${lineP * 60}px`,
                        height: 3,
                        backgroundColor: accentColor,
                        margin: '0 auto 24px',
                        borderRadius: 2,
                    }}
                />

                {/* Headline */}
                <div
                    style={{
                        color: textColor,
                        fontSize: 72,
                        fontWeight: 900,
                        letterSpacing: -1,
                        lineHeight: 1.1,
                    }}
                >
                    <WordReveal
                        text={headline}
                        startFrame={startFrame + 8}
                        durationFrames={25}
                        wordDelay={6}
                    />
                </div>

                {/* Subheadline */}
                {subheadline && (
                    <div
                        style={{
                            color: accentColor,
                            fontSize: 16,
                            fontWeight: 500,
                            letterSpacing: 4,
                            textTransform: 'uppercase',
                            marginTop: 20,
                            opacity: interp(
                                frame,
                                [startFrame + 30, startFrame + 50],
                                [0, 1],
                                { easing: easeOutCubic },
                            ),
                        }}
                    >
                        {subheadline}
                    </div>
                )}
            </div>
        </AbsoluteFill>
    );
};
