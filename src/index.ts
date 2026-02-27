// ─── Utilities ───────────────────────────────────────────────────────────────
export type { EasingFn } from './utils/easing';
export {
    linear,
    easeInQuad, easeOutQuad, easeInOutQuad,
    easeInCubic, easeOutCubic, easeInOutCubic,
    easeInQuart, easeOutQuart, easeInOutQuart,
    easeInQuint, easeOutQuint, easeInOutQuint,
    easeInSine, easeOutSine, easeInOutSine,
    easeInExpo, easeOutExpo, easeInOutExpo,
    easeInCirc, easeOutCirc, easeInOutCirc,
    easeInElastic, easeOutElastic, easeInOutElastic,
    easeInBack, easeOutBack, easeInOutBack,
    easeInBounce, easeOutBounce, easeInOutBounce,
    snap, punch, wobble,
    steps, cubicBezier,
    cssEase, cssEaseIn, cssEaseOut, cssEaseInOut,
    reverse, mirror, chain,
    Easing,
} from './utils/easing';

export {
    interp,
    progress,
    springValue,
    stagger,
    oscillate,
    loopProgress,
    pingPong,
} from './utils/interpolate';
export type { InterpOptions, SpringOptions, StaggerOptions } from './utils/interpolate';

export {
    clamp, remap, lerp, smoothstep, degToRad, round,
    seededRandom, valueNoise,
} from './utils/math';

export {
    hexToRgb, rgbToCss, lerpColor, brighten, withOpacity,
} from './utils/color';
export type { RGB, RGBA, HSL } from './utils/color';

// ─── Hooks ───────────────────────────────────────────────────────────────────
export { useAnimatedValue } from './hooks/useAnimatedValue';
export type { AnimationKeyframe } from './hooks/useAnimatedValue';

export { useSpring, SpringPresets } from './hooks/useSpring';
export type { SpringConfig } from './hooks/useSpring';

export { useStagger } from './hooks/useStagger';

export { useTimeline } from './hooks/useTimeline';
export type { TimelineEvent, TimelineState } from './hooks/useTimeline';

// ─── Animations ──────────────────────────────────────────────────────────────
export {
    fadeIn, slideInLeft, slideInRight, slideInUp, slideInDown,
    scaleIn, popIn, flipInY, flipInX,
    revealFromLeft, revealFromBottom, irisIn,
    flyIn, glideIn,
} from './animations/entrance';
export type { EntranceOptions } from './animations/entrance';

export {
    fadeOut, slideOutLeft, slideOutRight, slideOutUp, slideOutDown,
    scaleOut, irisOut, burstOut,
} from './animations/exit';
export type { ExitOptions } from './animations/exit';

export {
    pulse, shake, bounce, wiggle, flash, swing, heartbeat, glimmer,
} from './animations/attention';
export type { AttentionOptions } from './animations/attention';

export {
    CharReveal, WordReveal, Typewriter, LineReveal,
} from './animations/text';
export type {
    CharRevealProps, WordRevealProps, TypewriterProps, LineRevealProps,
} from './animations/text';

export {
    ScrambleText, NeonText, ThreeDText, TextMorph, HandwrittenText, OutlineText, GradientText,
} from './animations/advancedText';
export type {
    ScrambleTextProps, NeonTextProps, ThreeDTextProps, TextMorphProps, HandwrittenTextProps, OutlineTextProps, GradientTextProps,
} from './animations/advancedText';

export {
    tiltIn, cardFlip, pushFromDepth, parallax,
} from './animations/threed';
export type { ThreeDOptions } from './animations/threed';

// ─── Transitions ─────────────────────────────────────────────────────────────
export {
    wipeLeft, wipeRight, wipeUp, wipeDown,
    wipeDiagonal, barnDoors, irisTransition,
} from './transitions/wipe';

export {
    crossDissolve, zoomIn, zoomOut,
    pushLeft, pushRight, dollyZoom, flashCut,
} from './transitions/zoom';

export { crossBlur, focusPull, motionBlurWipe } from './transitions/blur';

export {
    rgbSplitTransition, pixelate, GlitchOverlay, vhsRewind,
} from './transitions/creative';

// ─── Overlays ────────────────────────────────────────────────────────────────
export {
    CinematicGrade, WarmGrade, CoolGrade,
    BlackAndWhiteGrade, VintageGrade,
    Vignette, Letterbox,
} from './overlays/colorGrade';

export { Confetti, DustParticles, Bokeh } from './overlays/particles';

export {
    FilmGrain, Scanlines, ChromaticAberration, ExposureVignette,
} from './overlays/noise';

export {
    AnimatedCircle, AnimatedLine, KineticGradient, AnimatedProgressBar,
} from './overlays/shapes';

export { LowerThird, KineticLowerThird } from './overlays/lowerThirds';
export type { LowerThirdProps } from './overlays/lowerThirds';

// ─── Components ──────────────────────────────────────────────────────────────
export { AnimatedText } from './components/AnimatedText';
export type { AnimatedTextProps } from './components/AnimatedText';

export { KineticTitle } from './components/KineticTitle';
export type { KineticTitleProps } from './components/KineticTitle';

export { ProgressBar } from './components/ProgressBar';

export { VideoCallout } from './components/VideoCallout';

export { SceneWrapper } from './components/SceneWrapper';

// ─── Video Effects ───────────────────────────────────────────────────────────
export { VHSRetro } from './effects/vhsRetro';
export type { VHSRetroProps } from './effects/vhsRetro';

export { NeonGlow } from './effects/neonGlow';
export type { NeonGlowProps } from './effects/neonGlow';

export { CinematicBars } from './effects/cinematicBars';
export type { CinematicBarsProps } from './effects/cinematicBars';

export { ShakeVibrate } from './effects/shakeVibrate';
export type { ShakeVibrateProps } from './effects/shakeVibrate';

export { LightLeak } from './effects/lightLeak';
export type { LightLeakProps } from './effects/lightLeak';

export { Mirror } from './effects/mirror';
export type { MirrorProps } from './effects/mirror';

export { SpeedRamp, useSpeedRamp } from './effects/speedRamp';
export type { SpeedRampProps, SpeedSegment } from './effects/speedRamp';

export { DreamBokeh } from './effects/dreamBokeh';
export type { DreamBokehProps } from './effects/dreamBokeh';

export { RGBSplit } from './effects/rgbSplit';
export type { RGBSplitProps } from './effects/rgbSplit';

export { OutlineDuotone } from './effects/outlineDuotone';
export type { OutlineDuotoneProps, DuotoneMode } from './effects/outlineDuotone';
