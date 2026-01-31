import React from 'react';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';

const ContactTab = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-slate-800">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
           <h2 className="text-lg font-bold text-slate-700 mb-6">Get in Touch</h2>
           <div className="space-y-6">
             <div className="flex items-start gap-4">
               <div className="p-3 bg-primary/10 rounded-lg text-primary"><MapPin className="h-6 w-6" /></div>
               <div>
                 <h3 className="font-bold text-slate-800">Campus Address</h3>
                 <p className="text-slate-500 text-sm mt-1">123 Education City, Main Boulevard,<br/>Islamabad, Pakistan</p>
               </div>
             </div>
             
             <div className="flex items-start gap-4">
               <div className="p-3 bg-primary/10 rounded-lg text-primary"><Phone className="h-6 w-6" /></div>
               <div>
                 <h3 className="font-bold text-slate-800">Phone Numbers</h3>
                 <p className="text-slate-500 text-sm mt-1">+92 51 1234567<br/>+92 300 9876543</p>
               </div>
             </div>

             <div className="flex items-start gap-4">
               <div className="p-3 bg-primary/10 rounded-lg text-primary"><Mail className="h-6 w-6" /></div>
               <div>
                 <h3 className="font-bold text-slate-800">Email</h3>
                 <p className="text-slate-500 text-sm mt-1">admissions@rsiit.edu.pk<br/>info@rsiit.edu.pk</p>
               </div>
             </div>
           </div>
        </div>

        <div className="bg-slate-50 p-8 rounded-xl border border-slate-200">
          <h2 className="text-lg font-bold text-slate-700 mb-4">Send us a Message</h2>
          <form className="space-y-4">
            <div><label className="label">Subject</label><input className="input" placeholder="Admission Inquiry" /></div>
            <div><label className="label">Message</label><textarea className="input h-32 resize-none" placeholder="How can we help you?"></textarea></div>
            <button className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:opacity-90 w-full">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactTab;
