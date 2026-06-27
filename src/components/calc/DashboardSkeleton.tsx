"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="mx-auto max-w-[90vw] w-full px-4 py-8 sm:px-6 md:px-8 lg:px-12 animate-pulse">
      {/* Workspace Dashboard Header */}
      <div className="mb-8 flex flex-col justify-between gap-6 border-b border-border pb-6 lg:flex-row lg:items-center">
        <div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="mt-2 h-10 w-64 sm:w-80" />
          <Skeleton className="mt-2 h-4 w-96 max-w-full" />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Skeleton className="h-9 w-40 rounded-xl" />
          <Skeleton className="h-9 w-52 rounded-xl" />
          <Skeleton className="h-9 w-28 rounded-xl" />
        </div>
      </div>

      {/* Main Core Section */}
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Side: Inputs Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass rounded-2xl p-6 border border-border space-y-6">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-20" />
            </div>

            {/* Sliders Loading */}
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-12" />
                </div>
                <Skeleton className="h-2 w-full rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Main Dashboard Content */}
        <div className="lg:col-span-8 space-y-6">
          {/* Row of 4 Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="glass rounded-2xl p-5 border border-border space-y-3">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-5 w-5 rounded-full" />
                </div>
                <Skeleton className="h-8 w-28" />
                <Skeleton className="h-3 w-36" />
              </div>
            ))}
          </div>

          {/* Tabs buttons */}
          <div className="flex flex-wrap gap-2 border-b border-border pb-px">
            {Array.from({ length: 6 }).map((_, idx) => (
              <Skeleton key={idx} className="h-9 w-28 rounded-lg" />
            ))}
          </div>

          {/* Big Chart Skeleton */}
          <div className="glass rounded-2xl p-6 border border-border space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-72 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
