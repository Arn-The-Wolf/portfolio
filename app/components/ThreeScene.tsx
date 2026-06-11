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
    <div className="absolute inset-0 flex items-center justify-center bg-background/80">
      <div className="text-foreground text-center">
        <h2 className="text-xl font-bold mb-2">Something went wrong:</h2>
        <pre className="text-sm text-muted-foreground">{error.message}</pre>
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
    return <div className="absolute inset-0 z-0 bg-[#0a0f0c]" aria-hidden />;
  }

  return (
    <div className="absolute inset-0 z-0" aria-hidden>
      <div className="absolute inset-0 bg-[#0a0f0c]" />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <DynamicCanvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          gl={{ antialias: true, alpha: false }}
          dpr={[1, 1.5]}
          style={{ background: '#0a0f0c' }}
          className="!absolute inset-0"
        >
          <Suspense fallback={null}>
            <DynamicSpaceScene />
          </Suspense>
        </DynamicCanvas>
      </ErrorBoundary>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-background/20 to-background/80" />
    </div>
  );
}
