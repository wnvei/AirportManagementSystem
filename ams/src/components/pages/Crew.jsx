import { useEffect, useState } from 'react';
import { RevealOnScroll } from '../RevealOnScroll';

const Crew = () => {
  const [user, setUser] = useState(null);
  const [flightDetails, setFlightDetails] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    console.log("Stored user:", storedUser);
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser.user);
        setFlightDetails(parsedUser.flightDetails); 
      } catch (error) {
        console.error("Failed to parse stored user:", error);
      }
    }
  }, []);

  if (!user || !flightDetails) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-8">
        Error 404
      </div>
    );
  }

  return (
    <section>
    <h1 className="pl-20 flex flex-col justify-center items-left text-7xl pt-30">Welcome, <span className="text-neutral-600 italic">{user.name}</span></h1>
    <div className="pl-20 pt-10 pb-20 flex flex-col justify-center items-left">
      <p className="text-neutral-600 text-3xl">You are currently assigned as a <span className="text-white italic">{user.designation}</span> for flight code <span className="text-white italic">{user.flight}</span></p>
    </div>

    <RevealOnScroll>
    <div className="text-3xl flex flex-col justify-center items-center pb-30 w-full">
    <h2 className="mt-8 mb-6 text-4xl text-neutral-200">Flight Details</h2>
    <div className="overflow-x-auto border-1 border-neutral-500 shadow-lg rounded-3xl w-11/12">
        <table className="min-w-full text-white text-lg">
        <thead className="bg-neutral-800">
            <tr className="text-xl">
            <th className="px-6 py-4 font-normal">Flight Code</th>
            <th className="px-6 py-4 font-normal">Flight Name</th>
            <th className="px-6 py-4 font-normal">Arrival</th>
            <th className="px-6 py-4 font-normal">Departure</th>
            <th className="px-6 py-4 font-normal">Origin</th>
            <th className="px-6 py-4 font-normal">Destination</th>
            <th className="px-6 py-4 font-normal">Status</th>
            </tr>
        </thead>
        <tbody className="text-center divide-y divide-neutral-600">
            <tr>
            <td className="px-6 py-4">{flightDetails.Flight_id}</td>
            <td className="px-6 py-4">{flightDetails.Flight_name}</td>
            <td className="px-6 py-4">{flightDetails.Arrival}</td>
            <td className="px-6 py-4">{flightDetails.Departure}</td>
            <td className="px-6 py-4">{flightDetails.Origin}</td>
            <td className="px-6 py-4">{flightDetails.Destination}</td>
            <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-mb text-black
                ${flightDetails.Status === 'Ontime' ? 'bg-green-600' : 
                    flightDetails.Status === 'Delayed' ? 'bg-yellow-500' :
                    flightDetails.Status === 'Baggage Delivered' ? 'bg-neutral-500' : 
                    'bg-red-600'}
                `}>
                {flightDetails.Status}
                </span>
            </td>
            </tr>
        </tbody>
        </table>
    </div>
    </div>
    </RevealOnScroll>

    <RevealOnScroll>
    <div className="text-lg flex flex-col justify-center items-center space-y-2">
    <h1 className="p-4 text-3xl">International Standard Operating Guidelines for Crew Members</h1>
    <ol className="italic list-decimal pl-8 space-y-2">
        <li>Please arrive at the airport at least two hours prior to the scheduled departure to ensure sufficient preparation time.</li>
        <li>Ensure that your full uniform is worn properly and that your official identification badge is clearly visible throughout duty hours.</li>
        <li>Kindly attend the pre-flight briefing conducted by the captain or senior crew to review flight-specific details and responsibilities.</li>
        <li>Review and familiarise yourself with all safety procedures, including emergency protocols and first aid guidelines, prior to boarding.</li>
        <li>Provide courteous and attentive assistance to passengers, prioritising their safety, comfort, and overall experience.</li>
        <li>Maintain clear, respectful, and professional communication with both passengers and fellow crew members at all times.</li>
        <li>Diligently complete all pre-flight and post-flight inspections and promptly report any irregularities to the relevant authorities.</li>
        <li>Handle passenger information, documentation, and operational matters with discretion and confidentiality.</li>
        <li>Uphold the airline’s values through professional conduct, integrity, and dedication to high standards of service.</li>
        <li className="pb-10">Remain vigilant and composed, prepared to respond to unforeseen circumstances or emergencies with efficiency and care.</li>
    </ol>
    <p className="text-sm mb-0 pb-0">*Additional information will be provided at the venue or briefing as necessary.</p>
    <p className="italic text-mb pb-10">Wishing you a safe journey.</p>
    </div>
    </RevealOnScroll>
    </section>
  );
};

export default Crew;
