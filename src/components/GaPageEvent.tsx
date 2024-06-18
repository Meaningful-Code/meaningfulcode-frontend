'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { GOOGLE_TAG_ID } from '@/constants/constants';

const GaPageEvent = () => {
  const pathname = usePathname();
  useEffect(() => {
    if (!window.gtag) {
      return;
    }
    window.gtag('config', GOOGLE_TAG_ID, {
      page_path: pathname,
    });
  }, [pathname]);
  return <></>;
};

export default GaPageEvent;
