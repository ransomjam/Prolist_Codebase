import { useEffect, useRef, useState, useCallback } from 'react';

export function useScrollAnimations() {
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  const setElementRef = useCallback((id: string, element: HTMLElement | null) => {
    if (element && observerRef.current) {
      observerRef.current.observe(element);
    }
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const elementId = entry.target.getAttribute('data-animation-id');
          if (elementId) {
            setVisibleElements(prev => {
              const newSet = new Set(prev);
              if (entry.isIntersecting) {
                newSet.add(elementId);
              } else {
                // Remove from visible when out of view to allow re-triggering
                newSet.delete(elementId);
              }
              return newSet;
            });
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const getAnimationClass = useCallback((id: string, index: number = 0, animationType: 'slide' | 'default' = 'default') => {
    const isVisible = visibleElements.has(id);
    
    if (!isVisible) {
      if (animationType === 'slide') {
        // Enhanced left to right slide-in entrance state with more dramatic effect
        return 'opacity-0 -translate-x-32 scale-85 blur-sm';
      } else {
        // Cool entrance states with 3D transforms
        const entranceTypes = [
          'opacity-0 translate-y-12 rotate-3 scale-95',
          'opacity-0 translate-x-8 -translate-y-8 rotate-6 scale-90',
          'opacity-0 -translate-x-8 translate-y-8 -rotate-3 scale-95',
          'opacity-0 translate-y-16 skew-x-3 scale-90',
          'opacity-0 -translate-y-12 rotate-12 scale-85'
        ];
        return entranceTypes[index % entranceTypes.length];
      }
    }

    // Enhanced smooth slide-in visible states with better timing
    return 'opacity-100 translate-x-0 translate-y-0 rotate-0 scale-100 blur-none transition-all duration-1200 ease-out';
  }, [visibleElements]);

  const getAnimationStyle = useCallback((index: number = 0) => {
    const delay = Math.min(index * 150, 800);
    
    return {
      transitionDelay: `${delay}ms`,
      willChange: 'transform, opacity',
      backfaceVisibility: 'hidden' as const,
      perspective: '1000px',
      transformStyle: 'preserve-3d' as const,
      filter: visibleElements.size > 0 ? 'drop-shadow(0 10px 25px rgba(0,0,0,0.1))' : 'none'
    };
  }, [visibleElements]);

  return {
    setElementRef,
    getAnimationClass,
    getAnimationStyle,
    visibleElements
  };
}