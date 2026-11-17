'use client';

import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

type Range = [number, number];

type ScrollParallaxProps = {
  children: ReactNode;
  className?: string;
  x?: Range;
  y?: Range;
  rotate?: Range;
  scale?: Range;
  opacity?: Range;
};

/** Section-scoped scroll motion. Values stay compositor-only and collapse under reduced motion. */
export function ScrollParallax({
  children,
  className = '',
  x = [0, 0],
  y = [0, 0],
  rotate = [0, 0],
  scale = [1, 1],
  opacity = [1, 1],
}: ScrollParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const xValue = useTransform(scrollYProgress, [0, 1], x);
  const yValue = useTransform(scrollYProgress, [0, 1], y);
  const rotateValue = useTransform(scrollYProgress, [0, 1], rotate);
  const scaleValue = useTransform(scrollYProgress, [0, 1], scale);
  const opacityValue = useTransform(scrollYProgress, [0, 1], opacity);
  const transform = useMotionTemplate`translate3d(${xValue}px, ${yValue}px, 0) rotate(${rotateValue}deg) scale(${scaleValue})`;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        transform: reduceMotion ? 'none' : transform,
        opacity: reduceMotion ? 1 : opacityValue,
        willChange: reduceMotion ? 'auto' : 'transform, opacity',
      }}
    >
      {children}
    </motion.div>
  );
}

export default ScrollParallax;
