'use client';

import { useEffect } from 'react';

export default function ScrollUp() {
  useEffect(() => {
    // Ensure window is defined before using it
    if (typeof window !== 'undefined') {
      window.document.scrollingElement?.scrollTo(0, 0);
    }
  }, []);

  return null;
}
