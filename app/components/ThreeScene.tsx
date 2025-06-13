'use client';

import { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ErrorBoundary } from 'react-error-boundary';

const DynamicCanvas = dynamic(
  () => import('@react-three/fiber').then((mod) => mod.Canvas),
  { ssr: false }
);

const DynamicSpaceScene = dynamic(
  () => import('./SpaceScene').then((mod) => mod.SpaceScene),
  { ssr: false }
);

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
      <div className="text-white text-center">
        <h2 className="text-xl font-bold mb-2">Something went wrong:</h2>
        <pre className="text-sm">{error.message}</pre>
      </div>
    </div>
  );
}

export function ThreeScene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="absolute inset-0 z-0">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <DynamicCanvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <DynamicSpaceScene />
          </Suspense>
        </DynamicCanvas>
      </ErrorBoundary>
    </div>
  );
} 