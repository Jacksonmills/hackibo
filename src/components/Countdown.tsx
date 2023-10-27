'use client';

import React from 'react';

export default function Countdown({
  update,
}: {
  update: (time: number) => void;
}) {
  const [time, setTime] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>{time}</div>
  );
}
