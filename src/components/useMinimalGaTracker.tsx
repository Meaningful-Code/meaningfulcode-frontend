import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useMinimalGaTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (!window.gtag) {
      return;
    }
    window.gtag('config', 'G-C9SQS63TJQ', {
      page_path: location.pathname + location.search,
    });
  }, [location]);
};

export default useMinimalGaTracker;
