import { useEffect, useRef, useState, useCallback } from 'react';

export function useScrollAnimations() {
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const [isScrolling, setIsScrolling] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const setElementRef = useCallback((id: string, element: HTMLElement | null) => {
    if (element && observerRef.current) {
      observerRef.current.observe(element);
    }
  }, []);

  useEffect(() => {
    let isThrottled = false;
    
    // Optimized scroll detection with throttling
    const handleScroll = () => {
      if (isThrottled) return;
      
      setIsScrolling(true);
      document.body.classList.add('scrolling');
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
        document.body.classList.remove('scrolling');
      }, 100);
      
      // Throttle scroll events
      isThrottled = true;
      setTimeout(() => {
        isThrottled = false;
      }, 16); // ~60fps
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.classList.remove('scrolling');
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Intersection Observer for scroll-triggered animations
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
                newSet.delete(elementId);
              }
              return newSet;
            });
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const getAnimationClass = useCallback((id: string, index: number = 0, animationType: 'slide' | 'default' | 'always-visible' = 'default') => {
    const isVisible = visibleElements.has(id);
    
    // Always visible content that only animates during scroll
    if (animationType === 'always-visible') {
      return `opacity-100 scale-100 translate-x-0 translate-y-0 transition-all duration-500 ease-out ${isScrolling ? 'transform-gpu' : ''}`;
    }
    
    if (!isVisible) {
      if (animationType === 'slide') {
        return 'opacity-0 scale-95 translate-y-8';
      } else {
        const entranceTypes = [
          'opacity-0 translate-y-12 scale-95',
          'opacity-0 translate-x-6 -translate-y-6 scale-90',
          'opacity-0 -translate-x-6 translate-y-6 scale-95',
          'opacity-0 translate-y-10 scale-90',
          'opacity-0 -translate-y-8 scale-95'
        ];
        return entranceTypes[index % entranceTypes.length];
      }
    }

    return 'opacity-100 scale-100 translate-x-0 translate-y-0 transition-all duration-500 ease-out';
  }, [visibleElements, isScrolling]);

  const getAnimationStyle = useCallback((index: number = 0) => {
    const delay = Math.min(index * 150, 800);
    
    return {
      transitionDelay: `${delay}ms`,
      willChange: isScrolling ? 'transform, opacity' : 'auto',
      backfaceVisibility: 'hidden' as const,
      perspective: '1000px',
      transformStyle: 'preserve-3d' as const,
      filter: 'none'
    };
  }, [isScrolling]);

  return {
    setElementRef,
    getAnimationClass,
    getAnimationStyle,
    visibleElements
  };
}