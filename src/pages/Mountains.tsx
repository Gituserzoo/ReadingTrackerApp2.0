import { useEffect } from 'react';
import './Mountains.css';

export default function Mountains() {
  useEffect(() => {
    const scriptId = 'weatherwidget-io-js';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://weatherwidget.io/js/widget.min.js';
      script.async = true;
      document.body.appendChild(script);
    } else {
      if ((window as any).__weatherwidget_init) {
        (window as any).__weatherwidget_init();
      }
    }
  }, []);

  return (
    <div className="mountains-page">
      {/* Weather Widget */}
      <div className="mountains-weather">
        <a
          className="weatherwidget-io"
          href="https://forecast7.com/en/38d99n105d06/woodland-park/?unit=us"
          data-label_1="Woodland Park"
          data-label_2="WEATHER"
          data-days="5"
          data-theme="sky"
        >
          Woodland Park WEATHER
        </a>
      </div>

      {/* Mountain Images */}
      <div className="mountains-gallery">
        <img src="https://imgur.com/LqOQbuF.jpg" alt="Mountain 1" />
        <img src="https://imgur.com/TEbkTZv.jpg" alt="Mountain 2" />
        <img src="https://www.rockymtnresorts.com/wp-content/uploads/2020/04/GettyImages-1403500536.jpg" alt="Mountain 3" />
        {/* Add or replace these image sources as needed */}
      </div>
    </div>
  );
}

