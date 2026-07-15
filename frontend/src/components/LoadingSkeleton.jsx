import React from 'react';

const ProductSkeleton = () => (
  <div className="card p-0 overflow-hidden">
    <div className="loading-skeleton h-64 w-full"></div>
    <div className="p-4 space-y-3">
      <div className="loading-skeleton h-4 w-3/4"></div>
      <div className="loading-skeleton h-4 w-1/2"></div>
      <div className="flex items-center justify-between">
        <div className="loading-skeleton h-6 w-20"></div>
        <div className="loading-skeleton h-4 w-16"></div>
      </div>
    </div>
  </div>
);

const ProductSkeletonGrid = ({ count = 8 }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
    {Array.from({ length: count }).map((_, index) => (
      <ProductSkeleton key={index} />
    ))}
  </div>
);

const CartSkeleton = () => (
  <div className="card p-4">
    <div className="flex items-center gap-4">
      <div className="loading-skeleton h-20 w-20 rounded-lg"></div>
      <div className="flex-1 space-y-2">
        <div className="loading-skeleton h-4 w-3/4"></div>
        <div className="loading-skeleton h-3 w-1/2"></div>
        <div className="loading-skeleton h-4 w-20"></div>
      </div>
    </div>
  </div>
);

const OrderSkeleton = () => (
  <div className="card p-6">
    <div className="flex items-center justify-between mb-4">
      <div className="loading-skeleton h-5 w-32"></div>
      <div className="loading-skeleton h-8 w-24 rounded-full"></div>
    </div>
    <div className="space-y-3">
      <div className="loading-skeleton h-4 w-full"></div>
      <div className="loading-skeleton h-4 w-3/4"></div>
      <div className="loading-skeleton h-4 w-1/2"></div>
    </div>
  </div>
);

export { ProductSkeleton, ProductSkeletonGrid, CartSkeleton, OrderSkeleton };
