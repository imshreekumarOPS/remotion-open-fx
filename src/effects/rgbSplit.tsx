import React from 'react';
import { useCurrentFrame } from 'remotion';

export interface RGBSplitProps {
    /** Offset intensity in pixels. */
    intensity?: number;
    /** Whether the split animates over time. */
    animate?: boolean;
    /** Direction of the chromatic split. */
    direction?: 'horizontal' | 'vertical' | 'diagonal';
    /** Animation speed multiplier. */
    speed?: number;
    children?: React.ReactNode;
}

/**
 * RGB Split — Chromatic aberration / digital distortion effect.
 * Separates the red and cyan channels with configurable offset direction.
 *
 * @example
 * <RGBSplit intensity={5} animate direction="horizontal">
 *   <AbsoluteFill><YourScene /></AbsoluteFill>
 * </RGBSplit>
 */
export const RGBSplit: React.FC<RGBSplitProps> = ({
    intensity = 4,
    animate = true,
    direction = 'horizontal',
    speed = 0.15,
    children,
}) => {
    const frame = useCurrentFrame();

    const shift = animate
        ? intensity * Math.sin(frame * speed)
        : intensity;

    // Calculate X/Y offsets based on direction
    let dx = 0;
    let dy = 0;
    switch (direction) {
        case 'horizontal':
            dx = shift;
            break;
        case 'vertical':
            dy = shift;
            break;
        case 'diagonal':
            dx = shift * 0.7;
            dy = shift * 0.7;
            break;
    }

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
            }}
        >
            {/* Red channel — offset positive */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    transform: `translate(${dx}px, ${dy}px)`,
                    mixBlendMode: 'screen',
                    opacity: 0.8,
                    filter: 'url(#rgb-split-red)',
                }}
            >
                {children}
            </div>

            {/* Green channel — center (base) */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    mixBlendMode: 'screen',
                    opacity: 0.8,
                    filter: 'url(#rgb-split-green)',
                }}
            >
                {children}
            </div>

            {/* Blue channel — offset negative */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    transform: `translate(${-dx}px, ${-dy}px)`,
                    mixBlendMode: 'screen',
                    opacity: 0.8,
                    filter: 'url(#rgb-split-blue)',
                }}
            >
                {children}
            </div>

            {/* SVG filters for channel isolation */}
            <svg
                style={{
                    position: 'absolute',
                    width: 0,
                    height: 0,
                    pointerEvents: 'none',
                }}
            >
                <defs>
                    <filter id="rgb-split-red">
                        <feColorMatrix
                            type="matrix"
                            values="1 0 0 0 0
                                    0 0 0 0 0
                                    0 0 0 0 0
                                    0 0 0 1 0"
                        />
                    </filter>
                    <filter id="rgb-split-green">
                        <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0
                                    0 1 0 0 0
                                    0 0 0 0 0
                                    0 0 0 1 0"
                        />
                    </filter>
                    <filter id="rgb-split-blue">
                        <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0
                                    0 0 0 0 0
                                    0 0 1 0 0
                                    0 0 0 1 0"
                        />
                    </filter>
                </defs>
            </svg>
        </div>
    );
};
