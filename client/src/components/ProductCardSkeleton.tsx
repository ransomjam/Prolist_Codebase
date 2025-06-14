export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden optimized-grid-item">
      {/* Image skeleton */}
      <div className="h-48 bg-gray-200 skeleton-shimmer" />
      
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        
        {/* Category */}
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        
        {/* Price */}
        <div className="h-5 bg-gray-200 rounded w-1/3" />
        
        {/* Location */}
        <div className="h-3 bg-gray-200 rounded w-2/3" />
        
        {/* Stats row */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex space-x-2">
            <div className="h-3 bg-gray-200 rounded w-12" />
            <div className="h-3 bg-gray-200 rounded w-16" />
          </div>
          <div className="h-3 bg-gray-200 rounded w-8" />
        </div>
        
        {/* Verification badge */}
        <div className="h-6 bg-gray-200 rounded-full w-20" />
      </div>
    </div>
  );
}