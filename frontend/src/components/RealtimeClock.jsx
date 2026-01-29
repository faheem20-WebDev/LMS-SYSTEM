import React, { useState, useEffect } from 'react';
import { Clock as ClockIcon, Calendar } from 'lucide-react';
import { format } from 'date-fns';

const RealtimeClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
      <div className="flex items-center gap-2 text-rsiit-blue font-semibold">
        <Calendar className="h-5 w-5" />
        <span>{format(time, 'EEEE, MMMM do, yyyy')}</span>
      </div>
      <div className="hidden sm:block w-px h-6 bg-slate-200"></div>
      <div className="flex items-center gap-2 text-rsiit-slate font-mono font-bold text-lg">
        <ClockIcon className="h-5 w-5 text-rsiit-lightBlue" />
        <span>{format(time, 'hh:mm:ss a')}</span>
      </div>
    </div>
  );
};

export default RealtimeClock;
