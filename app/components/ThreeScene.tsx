'use client';

import { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ErrorBoundary } from 'react-error-boundary';
import CssStarsBackground from '@/components/css-stars-background';
import { canUseWebGL, STARFIELD_BG } from '@/lib/starfield-css';

const DynamicCanvas = dynamic(
  () => import('@react-three/fiber').then((mod) => mod.Canvas),
  { ssr: false }
);

const DynamicSpaceScene = dynamic(
  () => import('./SpaceScene').then((mod) => mod.SpaceScene),
  { ssr: false }
);

function WebGLFallback() {
  return <CssStarsBackground variant="absolute" />;
}

export function ThreeScene() {
  const [mounted, setMounted] = useState(false);
  const [webglOk, setWebglOk] = useState(false);

  useEffect(() => {
    setMounted(true);
    setWebglOk(canUseWebGL());
  }, []);

  if (!mounted) {
    return <div className="absolute inset-0 z-0" style={{ backgroundColor: STARFIELD_BG }} aria-hidden />;
  }

  if (!webglOk) {
    return <WebGLFallback />;
  }

  return (
    <div className="absolute inset-0 z-0" aria-hidden>
      <ErrorBoundary FallbackComponent={WebGLFallback}>
        <DynamicCanvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          gl={{
            antialias: false,
            alpha: false,
            powerPreference: 'default',
            failIfMajorPerformanceCaveat: false,
          }}
          dpr={1}
          frameloop="always"
          style={{ background: STARFIELD_BG }}
          className="!absolute inset-0"
        >
          <Suspense fallback={null}>
            <DynamicSpaceScene />
          </Suspense>
        </DynamicCanvas>
      </ErrorBoundary>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-black/10 to-black/60" />
    </div>
  );
}
