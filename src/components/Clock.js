import { useEffect, useState } from 'react';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';

export function MyClock() {
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div style={{transform: 'scale(0.35)', display: 'inline-block'}}> 
      <Clock value={value} />
    </div>
  );
}