import { useEffect } from 'react';

export default function Mountains() {
  useEffect(() => {
    const scriptId = 'weatherwidget-io-js';
    const existingScript = document.getElementById(scriptId);

    if (existingScript) {
      if ((window as any).__weatherwidget_init) {
        (window as any).__weatherwidget_init();
      }
    } else {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://weatherwidget.io/js/widget.min.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        backgroundImage:
          'url(https://images.unsplash.com/photo-1598899134739-e13c7d7ab18e?auto=format&fit=crop&w=1470&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Weather Widget */}
      <div
        style={{
          position: 'absolute',
          top: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          width: '600px',
          maxWidth: '90vw',
          background: 'transparent',
        }}
      >
        <a
          className="weatherwidget-io"
          href="https://forecast7.com/en/38d99n105d06/woodland-park/?unit=us"
          data-label_1="Woodland Park"
          data-label_2="WEATHER"
          data-days="5"
          data-theme="sky"
        ></a>
      </div>

      {/* Top Left Image */}
      <img
        src="https://imgur.com/TEbkTZv.jpg"
        alt="Top Left"
        style={{
          position: 'absolute',
          top: '1rem',
          left: '11rem',
          width: '300px',
          height: 'auto',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
          zIndex: 5,
        }}
      />

      {/* Top Right Image */}
      <img
        src="https://imgur.com/LqOQbuF.jpg"
        alt="Top Right"
        style={{
          position: 'absolute',
          top: '2rem',
          right: '11rem',
          width: '300px',
          height: 'auto',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
          zIndex: 5,
        }}
      />

      {/* Bottom Left Image */}
      <img
        src="https://cdn.outsideonline.com/wp-content/uploads/2020/03/12/gem-lake-and-longs-peak-sunset_h.jpg"
        alt="Bottom Left"
        style={{
          position: 'absolute',
          bottom: '5rem',
          left: '1rem',
          width: '900px',
          height: 'auto',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
          zIndex: 5,
        }}
      />

      {/* Bottom Right Image */}
      <img
        src="https://www.rockymtnresorts.com/wp-content/uploads/2020/04/GettyImages-1403500536.jpg"
        alt="Bottom Right"
        style={{
          position: 'absolute',
          bottom: '5rem',
          right: '1rem',
          width: '900px',
          height: 'auto',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
          zIndex: 5,
        }}
      />
    </div>
  );
}
