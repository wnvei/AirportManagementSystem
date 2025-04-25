import './Home.css';
import videoSource from '../../assets/promo.mp4';
import { useEffect } from 'react';

export const Home = () => {
  useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <video
  className="absolute top-0 left-0 min-w-full min-h-full object-cover z-0 brightness-45"
  autoPlay
  loop
  muted
  src={videoSource}
  onContextMenu={(e) => e.preventDefault()} 
      />
      <div className="relative  text-center z-10 px-4">
      <h1 className="text-8xl md:text-[11rem] mb-6 shiny-text">
          Welcome to AMS.
        </h1>
        <p className="text-gray-400 text-xl mb-5 max-w-lg mx-auto">
          Redefining the way for a smoother, smarter tomorrow.
        </p>
      </div>
    </section>
  );
};