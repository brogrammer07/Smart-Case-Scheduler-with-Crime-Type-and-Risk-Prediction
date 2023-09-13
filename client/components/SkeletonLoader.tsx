import React from "react";
import { Skeleton } from "@mui/material";
const SingleSkeleton = () => {
  return (
    <div className="grid grid-cols-12  gap-2">
      <div className="col-span-1">
        <Skeleton height={100} />
      </div>
      <div className="col-span-3">
        <Skeleton height={100} />
      </div>
      <div className="col-span-2">
        <Skeleton height={100} />
      </div>
      <div className="col-span-1">
        <Skeleton height={100} />
      </div>
      <div className="col-span-2">
        <Skeleton height={100} />
      </div>
      <div className="col-span-1">
        <Skeleton height={100} />
      </div>
      <div className="col-span-1">
        <Skeleton height={100} />
      </div>
      <div className="col-span-1">
        <Skeleton height={100} />
      </div>
    </div>
  );
};
const SkeletonLoader = () => {
  return (
    <div className="flex flex-col">
      <SingleSkeleton />
      <SingleSkeleton />
      <SingleSkeleton />
      <SingleSkeleton />
      <SingleSkeleton />
      <SingleSkeleton />
      <SingleSkeleton />
      <SingleSkeleton />
    </div>
  );
};

export default SkeletonLoader;
