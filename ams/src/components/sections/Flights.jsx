  import { RevealOnScroll } from "../RevealOnScroll";
  import { useEffect, useState } from "react";

  export const Flights = () => {
    const [flightsData, setFlightsData] = useState([]);

    useEffect(() => {
      window.scrollTo(0, 0);
    
      const fetchFlights = async () => {
        try {
          const response = await fetch('http://localhost:3001/flights'); 
          const data = await response.json(); 
          console.log(data); 
          setFlightsData(data);
        } catch (err) {
          console.error('Error fetching flight data:', err); 
        }
      };
    
      fetchFlights();
    }, []);

    return (
      <section
        id="flights"
        className="min-h-screen flex items-center justify-center py-20 overflow-hidden"
      >
        <RevealOnScroll>
          <div className="min-w-screen flex flex-col items-center justify-center max-w-5xl mx-auto px-4">
            <h2 className="p-4 text-7xl mb-8 bg-gradient-to-r from-gray-300 to-neutral-500 bg-clip-text text-transparent text-center">
              Flight Schedule
            </h2>

            <div className="pt-4 w-full flex justify-center">
              <div className="w-3/4 overflow-x-auto border-1 border-neutral-800 rounded-2xl shadow-lg">
                <table className="w-full table-fixed border-collapse text-center text-gray-300">
                  <thead className="text-gray-300 bg-neutral-900 rounded-t-2xl">
                    <tr className="text-xl">
                      <th className="px-6 py-4 font-medium whitespace-nowrap">Airline</th>
                      <th className="px-6 py-4 font-medium whitespace-nowrap">Code</th>
                      <th className="px-6 py-4 font-medium whitespace-nowrap">Origin</th>
                      <th className="px-6 py-4 font-medium whitespace-nowrap">Destination</th>
                      <th className="px-6 py-4 font-medium whitespace-nowrap">Departure</th>
                      <th className="px-6 py-4 font-medium whitespace-nowrap">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-lg">
                    {flightsData.length > 0 ? (
                      flightsData.map((flight) => (
                        <tr key={flight.Airline_id} className="border-b border-white/10">
                          <td className="px-6 py-4 whitespace-nowrap">{flight.Airline_name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{flight.Airline_id}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{flight.Origin}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{flight.Destination}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{flight.Departure}</td>
                          <td className="px-6 py-4 whitespace-nowrap font-normal"> 
                            <span className={`px-3 py-1 rounded-full text-mb text-black ${
                              flight.Status === 'Ontime' ? 'bg-green-500' :
                              flight.Status === "Delayed" ? 'bg-red-500' : "text-yellow-400"
                            }`}
                          >
                            {flight.Status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center px-6 py-4">Loading data...</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>
    );
  };