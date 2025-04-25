import { useState } from "react";
import AirplaneIcon from '../../assets/plane.png';

const Explore = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [flightDetails, setFlightDetails] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/explore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: emailOrUsername.trim(),
          bookingId: password.trim(),
        }),
      });

      const result = await response.json();

      if (result.success) {
        setFlightDetails(result.data);
        setError('');
      } else {
        setFlightDetails(null);
        setError(result.message || 'Booking details not found.');
      }
    } catch (err) {
      console.error(err);
      setFlightDetails(null);
      setError('An error occurred while fetching flight details.');
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4">
      {!flightDetails ? (
        <div className="w-full max-w-md">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center space-y-5"
          >
            <h1 className="text-7xl shiny-text italic text-center pb-6">Explore</h1>

            <input
              type="text"
              placeholder="Name"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              className="bg-neutral-800 italic w-full h-17 px-8 py-2 border text-gray-300 border-gray-300 rounded-4xl"
            />

            <input
              type="text"
              placeholder="Booking ID"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-neutral-800 italic w-full h-17 px-8 py-2 text-gray-300 border border-gray-300 rounded-4xl"
            />

            <button
              type="submit"
              className="w-full h-17 bg-white text-black py-2 rounded-4xl hover:bg-neutral-700 transition duration-200"
            >
              Submit
            </button>

            {error && <p className="absolute bottom-30 text-red-500 text-sm pt-2">{error}</p>}
          </form>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center min-w-6xl min-h-[60vh] bg-neutral-900 p-8 rounded-[5rem] shadow-lg text-gray-300 space-y-4 border-2 border-neutral-700">
            <div className="flex flex-row justify-center text-center">
              <p className="px-6">
                <span className="text-center">Passenger Name</span><br />
                <span className="text-center text-2xl">{flightDetails.name}</span>
              </p>
              <p className="px-6">
                <span className="text-center">Gate</span><br />
                <span className="text-center text-2xl">{flightDetails.gate}</span>
              </p>
              <p className="px-6">
                <span className="text-center">Flight</span><br />
                <span className="text-center text-2xl">{flightDetails.flight}</span>
              </p>
              <p className="px-6">
                <span className="text-center">Seat</span><br />
                <span className="text-center text-2xl">{flightDetails.seat}</span>
              </p>
              <p className="px-6">
                <span className="text-center">Departure Time</span><br />
                <span className="text-center text-2xl">{flightDetails.departureTime}</span>
              </p>
            </div>
            <div className="flex flex-row justify-center p-6">
              <p className="p-8">
                <span className="text-9xl font-bold">{flightDetails.departure}</span>
              </p>

              <img src={AirplaneIcon} alt="Airplane" className="w-24 h-24 my-12" />

              <p className="p-8">
                <span className="text-9xl font-bold">{flightDetails.destination}</span>
              </p>
            </div>
            <p className="text-sm text-center text-gray-200 pt-2 pb-1 italic">
              This is NOT the official ticket. All information provided is accurate and will be verified at the check-in counter, where your official boarding pass will be issued.
            </p>
          </div>
          <button onClick={() => {
            setFlightDetails(null);
            setEmailOrUsername('');
            setPassword('');
            setError('');
          }}
            className="absolute bottom-15 px-6 py-2 text-white rounded-4xl hover:bg-neutral-700 hover:text-black transition duration-200 border-1">
            Clear Selection
          </button>
        </div>
      )}
    </section>
  );
};

export default Explore;