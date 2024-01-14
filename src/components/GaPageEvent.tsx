'use client';

import React, { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const GaPageEvent = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!window.gtag) {
      return;
    }
    window.gtag('config', 'G-C9SQS63TJQ', {
      page_path: pathname + searchParams,
    });
  }, [pathname, searchParams]);
  return <></>;
};

export default GaPageEvent;
