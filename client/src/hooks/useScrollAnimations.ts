import { useEffect, useRef, useState } from 'react';

interface ScrollAnimationOptions {
  threshold?: number[];
  rootMargin?: string;
  enableParallax?: boolean;
  staggerDelay?: number;
}

export function useScrollAnimations(options: ScrollAnimationOptions = {}) {
  const {
    threshold = [0, 0.1, 0.9, 1],
    rootMargin = '100px 0px -100px 0px',
    enableParallax = true,
    staggerDelay = 150
  } = options;

  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const elementRefs = useRef<Map<string, HTMLElement>>(new Map());

  const setElementRef = (id: string, element: HTMLElement | null) => {
    if (element) {
      elementRefs.current.set(id, element);
    } else {
      elementRefs.current.delete(id);
    }
  };

  // Enhanced Intersection Observer for bidirectional scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const elementId = entry.target.getAttribute('data-animation-id');
          if (elementId) {
            if (entry.isIntersecting) {
              setVisibleElements(prev => {
                const newSet = new Set(prev);
                newSet.add(elementId);
                return newSet;
              });
            } else {
              const element = entry.target as HTMLElement;
              element.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
              element.style.transform = 'translateY(20px)';
              element.style.opacity = '0.7';
              
              setTimeout(() => {
                setVisibleElements(prev => {
                  const newSet = new Set(prev);
                  newSet.delete(elementId);
                  return newSet;
                });
                element.style.transform = '';
                element.style.opacity = '';
              }, 300);
            }
          }
        });
      },
      { threshold, rootMargin }
    );

    elementRefs.current.forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  // Scroll direction detection for enhanced animations
  useEffect(() => {
    if (!enableParallax) return;

    let lastScrollY = window.scrollY;
    let lastScrollX = window.scrollX;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const currentScrollX = window.scrollX;
          const deltaY = currentScrollY - lastScrollY;
          const deltaX = currentScrollX - lastScrollX;
          
          elementRefs.current.forEach((element, elementId) => {
            if (element && visibleElements.has(elementId)) {
              const rect = element.getBoundingClientRect();
              const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
              
              if (isInViewport) {
                const parallaxY = deltaY * 0.1;
                const parallaxX = deltaX * 0.05;
                
                element.style.transform = `translate3d(${-parallaxX}px, ${-parallaxY}px, 0) scale(${1 + Math.abs(deltaY) * 0.0001})`;
                element.style.transition = 'transform 0.1s ease-out';
                
                setTimeout(() => {
                  element.style.transform = '';
                  element.style.transition = 'transform 0.3s ease-out';
                }, 150);
              }
            }
          });

          lastScrollY = currentScrollY;
          lastScrollX = currentScrollX;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleElements, enableParallax]);

  const getAnimationClass = (id: string, index: number = 0) => {
    const isVisible = visibleElements.has(id);
    
    if (isVisible) {
      return 'entrance-visible animate-scroll-zoom';
    }
    
    // Cycle through different entrance directions
    const directions = [
      'entrance-from-left',
      'entrance-from-bottom', 
      'entrance-from-right',
      'entrance-from-top'
    ];
    
    return directions[index % 4];
  };

  const getAnimationStyle = (index: number = 0) => ({
    transitionDelay: `${index * staggerDelay}ms`,
    animationDelay: `${index * staggerDelay}ms`
  });

  return {
    setElementRef,
    getAnimationClass,
    getAnimationStyle,
    visibleElements
  };
}