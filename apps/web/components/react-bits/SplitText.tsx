'use client';

import { useEffect, useRef, type ElementType } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type SplitTextProps = {
  text: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  splitBy?: 'chars' | 'words';
  trigger?: 'load' | 'view';
  duration?: number;
  stagger?: number;
};

export default function SplitText({
  text,
  className = '',
  tag: Tag = 'span',
  splitBy = 'chars',
  trigger = 'load',
  duration = 0.75,
  stagger = 0.018,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const pieces = splitBy === 'chars'
      ? Array.from(text).map((character, index) => ({ character, index }))
      : text.split(/(\s+)/).map((word, index) => ({ character: word, index }));

    element.replaceChildren(...pieces.map(({ character, index }) => {
      if (/^\s+$/.test(character)) return document.createTextNode(character);
      const span = document.createElement('span');
      span.dataset.splitPiece = 'true';
      span.textContent = character;
      span.style.display = 'inline-block';
      span.style.willChange = 'transform, opacity';
      span.setAttribute('aria-hidden', 'true');
      span.style.setProperty('--split-index', String(index));
      return span;
    }));

    element.setAttribute('aria-label', text);
    const nodes = element.querySelectorAll<HTMLElement>('[data-split-piece="true"]');

    const context = gsap.context(() => {
      gsap.fromTo(nodes, {
        opacity: 0,
        y: 24,
        rotateX: -18,
      }, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration,
        stagger,
        ease: 'power3.out',
        scrollTrigger: trigger === 'view' ? {
          trigger: element,
          start: 'top 88%',
          once: true,
        } : undefined,
      });
    }, element);

    return () => context.revert();
  }, [text, splitBy, trigger, duration, stagger]);

  const Component = Tag as ElementType;
  return <Component ref={ref} className={className}>{text}</Component>;
}
