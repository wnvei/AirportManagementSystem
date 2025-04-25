import { useState, useEffect } from 'react';
import axios from 'axios';
import videoSource from '../../assets/world.mp4';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 
  const navigate = useNavigate(); 

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', {
        emailOrUsername,
        password,
      });
  
      if (response.data.success) {
        sessionStorage.setItem('user', JSON.stringify(response.data));
        setErrorMessage('');
  
        if (response.data.role === 'admin') {
          navigate('/admin'); 
        } else if (response.data.role === 'crew') {
          navigate('/crew'); 
        }
      } else {
        setErrorMessage('Invalid credentials');
      }
    } catch (err) {
      setErrorMessage('Invalid credentials');
    }
  };

  return (
    <section id="login" className="relative min-h-screen flex flex-row items-stretch overflow-hidden">
      
      <div className="w-2/5 h-screen relative flex items-center justify-center mix-blend-normal absolute inset-0 z-10" onContextMenu={(e) => e.preventDefault()}>
      <video
        className="pt-20 w-full h-5/6 object-cover z-0 brightness-60"
        autoPlay
        loop
        muted
        src={videoSource}
        onContextMenu={(e) => e.preventDefault()} 
      />
      </div>

      <div className="w-[0.5px] h-screen bg-neutral-700 z-20" />

      <div className="w-3/5 h-screen relative flex items-center justify-center">
        <div className="relative flex flex-col justify-center items-center h-full z-10 px-4 w-full">

          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center w-full max-w-md space-y-5"
          >
          <h1 className="min-w-full text-center pb-6 text-7xl shiny-text">Login</h1>

            <input
              type="text"
              placeholder="Username"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              className="bg-neutral-800 w-85 h-14 px-8 py-2 border text-gray-300 border-gray-300 rounded-4xl"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-neutral-800 w-85 h-14 px-8 py-2 text-gray-300 border border-gray-300 rounded-4xl"
            />

            <button
              type="submit"
              className="w-85 h-14 bg-white text-black py-2 rounded-4xl hover:bg-neutral-700 transition duration-200"
            >
              Submit
            </button>
          </form>

          {errorMessage && (
            <div className="absolute bottom-35 text-red-500 text-center">{errorMessage}</div> 
          )}

        <div className="absolute bottom-8 text-center text-gray-400 pb-2 italic text-sm">
          <p>Access restricted to authorised personnel only.</p>
          <p>If you are an authorised member, please log in to proceed.</p>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
