import React, { useState } from 'react';
import { useApplicant } from '../../../context/ApplicantContext';
import { Save, User, MapPin, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfileTab = () => {
  const { profile, setProfile } = useApplicant();
  const [activeSection, setActiveSection] = useState('personal');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Validation could go here
    alert('Profile saved successfully!');
    // Ideally navigate to next step or just show success
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Profile Information</h1>
        <button onClick={handleSave} className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-bold hover:opacity-90 transition-colors">
          <Save className="h-4 w-4" /> Save Profile
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Tabs for sections within Profile */}
        <div className="flex border-b border-slate-200">
          <button 
            onClick={() => setActiveSection('personal')}
            className={`flex-1 p-4 text-sm font-bold text-center border-b-2 transition-colors ${activeSection === 'personal' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            <User className="h-4 w-4 mx-auto mb-1" /> Personal
          </button>
          <button 
            onClick={() => setActiveSection('contact')}
            className={`flex-1 p-4 text-sm font-bold text-center border-b-2 transition-colors ${activeSection === 'contact' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            <MapPin className="h-4 w-4 mx-auto mb-1" /> Contact
          </button>
          <button 
            onClick={() => setActiveSection('guardian')}
            className={`flex-1 p-4 text-sm font-bold text-center border-b-2 transition-colors ${activeSection === 'guardian' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            <Users className="h-4 w-4 mx-auto mb-1" /> Guardian
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {activeSection === 'personal' && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="text-lg font-bold text-slate-700">Personal Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><label className="label">Full Name</label><input className="input" name="fullName" value={profile.fullName} onChange={handleChange} /></div>
                <div><label className="label">Date of Birth</label><input type="date" className="input" name="dob" value={profile.dob} onChange={handleChange} /></div>
                <div><label className="label">CNIC / B-Form</label><input className="input" name="cnic" value={profile.cnic} onChange={handleChange} /></div>
                <div><label className="label">Nationality</label><input className="input" name="nationality" value={profile.nationality} onChange={handleChange} /></div>
                <div><label className="label">Religion</label><input className="input" name="religion" value={profile.religion} onChange={handleChange} /></div>
                <div><label className="label">Blood Group</label><input className="input" name="bloodGroup" value={profile.bloodGroup} onChange={handleChange} /></div>
              </div>
            </div>
          )}

          {activeSection === 'contact' && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="text-lg font-bold text-slate-700">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2"><label className="label">Address</label><input className="input" name="address" value={profile.address} onChange={handleChange} /></div>
                <div><label className="label">City</label><input className="input" name="city" value={profile.city} onChange={handleChange} /></div>
                <div><label className="label">District</label><input className="input" name="district" value={profile.district} onChange={handleChange} /></div>
                <div><label className="label">Mobile No</label><input className="input" name="phone" value={profile.phone} onChange={handleChange} /></div>
                <div><label className="label">Email</label><input className="input" name="email" value={profile.email} onChange={handleChange} /></div>
              </div>
            </div>
          )}

          {activeSection === 'guardian' && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="text-lg font-bold text-slate-700">Guardian Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><label className="label">Father Name</label><input className="input" name="fatherName" value={profile.fatherName} onChange={handleChange} /></div>
                <div><label className="label">Father CNIC</label><input className="input" name="fatherCnic" value={profile.fatherCnic} onChange={handleChange} /></div>
                <div><label className="label">Occupation</label><input className="input" name="fatherOccupation" value={profile.fatherOccupation} onChange={handleChange} /></div>
                <div><label className="label">Monthly Income</label><input type="number" className="input" name="fatherIncome" value={profile.fatherIncome} onChange={handleChange} /></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
