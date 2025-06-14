import { useState, useEffect, useRef, useMemo } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface LazyGridProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemsPerPage?: number;
  className?: string;
  loadingComponent?: React.ReactNode;
}

export default function LazyGrid<T extends { id: number }>({
  items,
  renderItem,
  itemsPerPage = 12,
  className = '',
  loadingComponent = <div className="text-center py-4">Loading more...</div>
}: LazyGridProps<T>) {
  const [displayedItems, setDisplayedItems] = useState(itemsPerPage);
  const [isLoading, setIsLoading] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const isIntersecting = useIntersectionObserver(loadMoreRef, {
    threshold: 0.1,
    rootMargin: '100px'
  });

  const visibleItems = useMemo(() => 
    items.slice(0, displayedItems),
    [items, displayedItems]
  );

  const hasMore = displayedItems < items.length;

  useEffect(() => {
    if (isIntersecting && hasMore && !isLoading) {
      setIsLoading(true);
      
      // Simulate brief loading delay for better UX
      setTimeout(() => {
        setDisplayedItems(prev => Math.min(prev + itemsPerPage, items.length));
        setIsLoading(false);
      }, 200);
    }
  }, [isIntersecting, hasMore, isLoading, itemsPerPage, items.length]);

  // Reset displayed items when items array changes
  useEffect(() => {
    setDisplayedItems(itemsPerPage);
  }, [items, itemsPerPage]);

  return (
    <div>
      <div className={className}>
        {visibleItems.map((item, index) => renderItem(item, index))}
      </div>
      
      {hasMore && (
        <div 
          ref={loadMoreRef}
          className="flex justify-center py-8"
        >
          {isLoading ? loadingComponent : <div className="h-4" />}
        </div>
      )}
    </div>
  );
}