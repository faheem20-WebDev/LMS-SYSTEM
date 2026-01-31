import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const ApplicantContext = createContext();

export const useApplicant = () => useContext(ApplicantContext);

export const ApplicantProvider = ({ children }) => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Draft Data (Persist in LocalStorage)
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('applicant_profile');
    return saved ? JSON.parse(saved) : {
      fullName: '', dob: '', cnic: '', nationality: 'Pakistani', religion: 'Islam', bloodGroup: '',
      address: '', city: '', district: '', phone: '', email: '',
      fatherName: '', fatherCnic: '', fatherOccupation: '', fatherIncome: '',
      photo: null // Photo handling might need distinct logic (base64 or separate upload)
    };
  });

  const [education, setEducation] = useState(() => {
    const saved = localStorage.getItem('applicant_education');
    return saved ? JSON.parse(saved) : {
      matric: { degree: 'Matric', marks: '', total: '', board: '', passed: true },
      intermediate: { degree: 'Intermediate', marks: '', total: '', board: '', passed: true } // 'passed' handles Appearing option
    };
  });

  // Fetch Applications from Backend
  const fetchApplications = async () => {
    try {
      // Assuming existing API endpoint
      const res = await axios.get('https://muhammadfaheem52006-lmsbackend.hf.space/api/applicants/my-applications');
      setApplications(res.data);
    } catch (err) {
      console.error("Failed to fetch applications", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'applicant') {
      fetchApplications();
    } else {
      setLoading(false);
    }
  }, [user]);

  // Persist Drafts
  useEffect(() => {
    localStorage.setItem('applicant_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('applicant_education', JSON.stringify(education));
  }, [education]);

  // Derived States for Validation
  const isProfileComplete = () => {
    const required = ['fullName', 'dob', 'cnic', 'phone', 'fatherName', 'address']; // Add more as needed
    return required.every(field => profile[field] && profile[field].trim() !== '');
  };

  const isEducationComplete = () => {
    // Check if at least Matric is filled
    return education.matric.marks && education.matric.board;
  };

  // Check if at least one application is submitted
  const hasSubmittedApplication = applications.length > 0;
  
  // Check if fee voucher is issued (for the latest application)
  const hasFeeVoucher = applications.some(app => app.status === 'fee_challan_issued' || app.status === 'admitted');

  return (
    <ApplicantContext.Provider value={{
      profile, setProfile,
      education, setEducation,
      applications, fetchApplications,
      loading,
      isProfileComplete: isProfileComplete(),
      isEducationComplete: isEducationComplete(),
      hasSubmittedApplication,
      hasFeeVoucher
    }}>
      {children}
    </ApplicantContext.Provider>
  );
};
