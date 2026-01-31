import React from 'react';
import { Calendar, Clock, MapPin, Phone, Mail } from 'lucide-react';

const ScheduleTab = () => {
  const events = [
    { date: 'Jan 01, 2026', title: 'Applications Open', description: 'Online portal opens for new applicants.' },
    { date: 'Feb 15, 2026', title: 'Last Date to Apply', description: 'Deadline for submission of online applications.' },
    { date: 'Feb 20, 2026', title: 'Entrance Test (if applicable)', description: 'Test for engineering/medical programs.' },
    { date: 'Mar 01, 2026', title: 'First Merit List', description: 'Display of first merit list on website.' },
    { date: 'Mar 10, 2026', title: 'Commencement of Classes', description: 'Orientation and start of academic session.' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-slate-800">Admission Schedule 2026</h1>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {events.map((event, index) => (
          <div key={index} className="flex border-b border-slate-100 last:border-0 p-6 hover:bg-slate-50 transition-colors">
            <div className="w-24 flex-shrink-0 text-center mr-6 border-r border-slate-100 pr-6">
              <span className="block text-2xl font-bold text-primary">{event.date.split(' ')[1].replace(',', '')}</span>
              <span className="block text-sm font-bold text-slate-500 uppercase">{event.date.split(' ')[0]}</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-1">{event.title}</h3>
              <p className="text-slate-500">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleTab;
