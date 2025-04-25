import React, { useState, useEffect } from 'react';

const Admin = () => {
  const [selectedAirport, setSelectedAirport] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isAirportOpen, setIsAirportOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [airportData, setAirportData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  const toggleAirportDropdown = () => setIsAirportOpen(!isAirportOpen);
  const toggleCategoryDropdown = () => setIsCategoryOpen(!isCategoryOpen);

  const selectAirportOption = (value) => {
    setSelectedAirport(value);
    setIsAirportOpen(false);
  };

  const selectCategoryOption = (value) => {
    setSelectedCategory(value);
    setIsCategoryOpen(false);
  };

  useEffect(() => {
    if (selectedAirport) {
      fetch(`http://localhost:3001/admin?airportName=${selectedAirport}`)
        .then((response) => response.json())
        .then((data) => setAirportData(data))
        .catch((error) => console.error('Error fetching airport data:', error));
    }
  }, [selectedAirport]);

  useEffect(() => {
    if (selectedCategory) {
      fetch(`http://localhost:3001/admin/category?category=${selectedCategory}`)
        .then((response) => response.json())
        .then((data) => setCategoryData(data))
        .catch((error) => console.error('Error fetching category data:', error));
    }
  }, [selectedCategory]);

  return (
    <section>
      <h1 className="pl-20 flex flex-col justify-center items-left text-7xl pt-30">
        Welcome, <span className="text-neutral-600 italic">Management & Security Personnel</span>
      </h1>
    
      <div className="pt-10 pl-20 flex flex-col justify-center items-left max-w-1/2">
        <label htmlFor="airportSelect" className="block text-lg font-medium mb-2 text-neutral-600">
          Choose Airport:
        </label>
        <div className="relative">
          <button
            onClick={toggleAirportDropdown}
            className="w-full p-3 rounded-md bg-neutral-100 border text-left border-neutral-300 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-500"
          >
            {selectedAirport || '-- Select Airport --'}
          </button>

          {isAirportOpen && (
            <ul className="absolute w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg">
              <li
                onClick={() => selectAirportOption('Mangalore International Airport')}
                className="rounded-md px-4 py-2 text-neutral-800 cursor-pointer hover:bg-neutral-500"
              >
                Mangalore International Airport
              </li>
              <li
                onClick={() => selectAirportOption('Dubai International Airport')}
                className="rounded-md px-4 py-2 text-neutral-800 cursor-pointer hover:bg-neutral-500"
              >
                Dubai International Airport
              </li>
            </ul>
          )}
        </div>
      </div>

      {selectedAirport && (
        <div className="pt-10 pl-2 pr-2">
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full border-collapse border-1 border-neutral-700">
              <thead className="bg-neutral-800">
                <tr>
                  <th className="px-4 py-2">Runway ID</th>
                  <th className="px-4 py-2">Runway Length</th>
                  <th className="px-4 py-2">Runway Status</th>
                  <th className="px-4 py-2">Flight ID</th>
                  <th className="px-4 py-2">Flight Name</th>
                  <th className="px-4 py-2">Arrival</th>
                  <th className="px-4 py-2">Departure</th>
                  <th className="px-4 py-2">Flight Status</th>
                  <th className="px-4 py-2">Airline Name</th>
                  <th className="px-4 py-2">Airline Country</th>
                  <th className="px-4 py-2">Aircraft Model</th>
                  <th className="px-4 py-2">Aircraft Capacity</th>
                  <th className="px-4 py-2">Gate ID</th>
                  <th className="px-4 py-2">Gate Terminal</th>
                  <th className="px-4 py-2">Gate Status</th>
                </tr>
              </thead>
              <tbody>
                {airportData.map((data, index) => (
                  <tr key={index} className="border-b border-white/10">
                    <td className="px-4 py-2">{data.Runway_id}</td>
                    <td className="px-4 py-2">{data.Runway_Length}</td>
                    <td className="px-4 py-2">{data.Runway_Status}</td>
                    <td className="px-4 py-2">{data.Flight_id}</td>
                    <td className="px-4 py-2">{data.Flight_name}</td>
                    <td className="px-4 py-2">{data.Arrival}</td>
                    <td className="px-4 py-2">{data.Departure}</td>
                    <td className="px-4 py-2">{data.Flight_Status}</td>
                    <td className="px-4 py-2">{data.Airline_name}</td>
                    <td className="px-4 py-2">{data.Airline_Country}</td>
                    <td className="px-4 py-2">{data.Aircraft_Model}</td>
                    <td className="px-4 py-2">{data.Aircraft_Capacity}</td>
                    <td className="px-4 py-2">{data.Gate_id}</td>
                    <td className="px-4 py-2">{data.Gate_Terminal}</td>
                    <td className="px-4 py-2">{data.Gate_Status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      <div className="pt-10 pl-20 flex flex-col justify-center items-left max-w-1/2">
      <h1 className='w-full text-5xl italic pt-17 pb-13'>Passenger & Crew Operations</h1>
        <label htmlFor="categorySelect" className="block text-lg font-medium mb-2 text-neutral-600">
          Choose Category:
        </label>
        <div className="relative">
          <button
            onClick={toggleCategoryDropdown}
            className="w-full p-3 rounded-md bg-neutral-100 border text-left border-neutral-300 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-500"
          >
            {selectedCategory || '-- Select Category --'}
          </button>

          {isCategoryOpen && (
            <ul className="absolute w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg">
              <li
                onClick={() => selectCategoryOption('Passenger')}
                className="rounded-md px-4 py-2 text-neutral-800 cursor-pointer hover:bg-neutral-500"
              >
                Passenger
              </li>
              <li
                onClick={() => selectCategoryOption('Crew')}
                className="rounded-md px-4 py-2 text-neutral-800 cursor-pointer hover:bg-neutral-500"
              >
                Crew
              </li>
            </ul>
          )}
        </div>
      </div>

      {selectedCategory && (
        <div className="pt-10 pl-2 pr-2">
          {selectedCategory === 'Passenger' && 
          <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full border-collapse border-1 border-neutral-700">
            <thead className="text-left bg-neutral-800">
              <tr>
                <th className="px-4 py-2">Passport</th>
                <th className="px-4 py-2">Passenger Name</th>
                <th className="px-4 py-2">Nationality</th>
                <th className="px-4 py-2">Date of Birth</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Contact</th>
                <th className="px-4 py-2">Booking ID</th>
                <th className="px-4 py-2">Seat</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Baggage</th>
                <th className="px-4 py-2">Boarding Time</th>
                <th className="px-4 py-2">Gate ID</th>
              </tr>
            </thead>
            <tbody>
              {categoryData.map((data, index) => (
                <tr key={index} className="border-b border-white/10">
                  <td className="px-4 py-2">{data.Passport}</td>
                  <td className="px-4 py-2">{data.Passenger_name}</td>
                  <td className="px-4 py-2">{data.Nationality}</td>
                  <td className="px-4 py-2">{new Date(data.DOB).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{data.Email}</td>
                  <td className="px-4 py-2">{data.Contact}</td>
                  <td className="px-4 py-2">{data.Booking_id}</td>
                  <td className="px-4 py-2">{data.Seat}</td>
                  <td className="px-4 py-2">{new Date(data.Date).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{data.Baggage}</td>
                  <td className="px-4 py-2">{data.Boarding}</td>
                  <td className="px-4 py-2">{data.Gate_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          }

          {selectedCategory === 'Crew' && 
          <div className="overflow-x-auto rounded-lg">
          <table className="text-center min-w-full border-collapse border-1 border-neutral-700">
            <thead className="text-center bg-neutral-800">
              <tr>
                <th className="px-4 py-2">Crew ID</th>
                <th className="px-4 py-2">Crew Name</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Flight ID</th>
              </tr>
            </thead>
            <tbody>
              {categoryData.map((data, index) => (
                <tr key={index} className="border-b border-white/10">
                  <td className="px-4 py-2">{data.Crew_id}</td>
                  <td className="px-4 py-2">{data.Crew_name}</td>
                  <td className="px-4 py-2">{data.Role}</td>
                  <td className="px-4 py-2">{data.Username}</td>
                  <td className="px-4 py-2">{data.Flight_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          }
        </div>
      )}
      <div className='pt-20 pb-10 flex flex-col justify-center items-center'>
        <p className='italic'>*Please visit the Security and Administations room on Level 5 for additional details</p>
        <p className='text-lg font-mono'>AMS.</p>
      </div>
    </section>
  );
};

export default Admin;
