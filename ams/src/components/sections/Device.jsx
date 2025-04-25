import React from 'react';

const Device = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center p-8 shadow-lg rounded-lg">
        <h1 className="text-3xl">This App is Not Compatible on this Devices</h1>
        <p className="mt-4 text-lg italic">*We are currently developing a version for all devices. Please use a laptop or desktop to access the app.</p>
      </div>
    </div>
  );
};

export default Device;