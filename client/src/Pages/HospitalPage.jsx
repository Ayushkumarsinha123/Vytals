import React from 'react';
import HospitalHeader from '../Components/HospitalHeader';
import BedAvailability from '../Components/BedAvailability';
import OPDAppointmentSection from '../Components/OPDAppointmentSection';
import LiveQueueDisplay from '../Components/LiveQueueDisplay';
import HospitalContactDetails from '../Components/HospitalContactDetails';
import EmergencyNotice from '../Components/EmergencyNotice';

const HospitalPage = () => {
  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      <HospitalHeader />
      <EmergencyNotice />
      <BedAvailability />
      <OPDAppointmentSection />
      <LiveQueueDisplay />
      <HospitalContactDetails />
    </div>
  );
};

export default HospitalPage;