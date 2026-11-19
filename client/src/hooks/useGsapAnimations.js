import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Prevent mobile URL bar show/hide from triggering janky ScrollTrigger recalculations
ScrollTrigger.config({
  ignoreMobileResize: true
});

/**
 * Centralized Apple/Linear-style GSAP scroll choreography for the entire landing page.
 * - Uses gsap.matchMedia() to respect `prefers-reduced-motion` and tune mobile vs desktop distances.
 * - Uses data-animate="fade-up" for standalone headers/blocks.
 * - Uses data-animate-stagger + data-animate-item for grids/card groups.
 */
export function usePageScrollAnimations(containerRef, lang) {
  useEffect(() => {
    const root = containerRef?.current;
    if (!root) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
        isMobile: '(max-width: 767px) and (prefers-reduced-motion: no-preference)'
      },
      (context) => {
        const { isMobile } = context.conditions;
        const yOffset = isMobile ? 16 : 26;
        const duration = isMobile ? 0.55 : 0.72;
        const staggerDelay = isMobile ? 0.06 : 0.09;

        // 1. Standalone fade-up elements (section headers, callouts, mockups)
        const fadeUpEls = gsap.utils.toArray(root.querySelectorAll('[data-animate="fade-up"]'));
        fadeUpEls.forEach((el) => {
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: yOffset },
            {
              autoAlpha: 1,
              y: 0,
              duration,
              ease: 'power3.out',
              clearProps: 'transform,opacity,visibility',
              scrollTrigger: {
                trigger: el,
                start: isMobile ? 'top 92%' : 'top 86%',
                once: true
              }
            }
          );
        });

        // 2. Staggered groups (card grids, feature rows, steps)
        const staggerGroups = gsap.utils.toArray(root.querySelectorAll('[data-animate-stagger]'));
        staggerGroups.forEach((group) => {
          const items = group.querySelectorAll('[data-animate-item]');
          if (!items.length) return;

          gsap.fromTo(
            items,
            { autoAlpha: 0, y: yOffset },
            {
              autoAlpha: 1,
              y: 0,
              duration,
              stagger: staggerDelay,
              ease: 'power3.out',
              clearProps: 'transform,opacity,visibility',
              scrollTrigger: {
                trigger: group,
                start: isMobile ? 'top 92%' : 'top 85%',
                once: true
              }
            }
          );
        });
      },
      root
    );

    // Refresh trigger positions after layout/RTL direction settles
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);

    return () => {
      clearTimeout(refreshTimer);
      mm.revert();
    };
  }, [containerRef, lang]);
}

export { gsap, ScrollTrigger };
