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
              }
              return newSet;
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const getAnimationClass = useCallback((id: string, index: number = 0) => {
    const isVisible = visibleElements.has(id);
    
    if (!isVisible) {
      return 'opacity-0 translate-y-6';
    }

    return 'opacity-100 translate-y-0 transition-all duration-500 ease-out';
  }, [visibleElements]);

  const getAnimationStyle = useCallback((index: number = 0) => {
    return {
      transitionDelay: `${Math.min(index * 50, 400)}ms`
    };
  }, []);

  return {
    setElementRef,
    getAnimationClass,
    getAnimationStyle,
    visibleElements
  };
}