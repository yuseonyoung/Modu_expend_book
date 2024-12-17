import { useEffect } from 'react';

const ViewportFix: React.FC = () => {
  useEffect(() => {
    const updateViewportHeight = () => {
      document.documentElement.style.setProperty(
        '--viewport-height',
        `${window.innerHeight}px`
      );
    };

    updateViewportHeight();

    window.addEventListener('resize', updateViewportHeight);

    return () => {
      window.removeEventListener('resize', updateViewportHeight);
    };
  }, []);

  return null;
};

export default ViewportFix;
