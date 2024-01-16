'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const GaPageEvent = () => {
  const pathname = usePathname();
  useEffect(() => {
    if (!window.gtag) {
      return;
    }
    window.gtag('config', 'G-C9SQS63TJQ', {
      page_path: pathname,
    });
  }, [pathname]);
  return <></>;
};

export default GaPageEvent;
