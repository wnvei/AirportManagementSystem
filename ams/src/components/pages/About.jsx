import { RevealOnScroll } from "../RevealOnScroll";
import "./About.css"
import { useEffect, useRef } from "react";

const About = () => {
  const canvasRef = useRef(null);
  const frameCount = 150;
  const images = useRef([]);
  const img = new Image();

  useEffect(() => {
    window.scrollTo(0, 0);
    const importedImages = import.meta.glob('../../assets/images/*.jpg', {
      eager: true,
      import: 'default',
    });

    const sortedImages = Object.entries(importedImages)
      .sort(([a], [b]) => {
        const getNumber = str => parseInt(str.match(/\d+/)?.[0] || 0, 10);
        return getNumber(a) - getNumber(b);
      })
      .map(([, value]) => value);

    images.current = sortedImages;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const applyBrightnessAndFade = (img, index) => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0, canvas.width, canvas.height);

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const BRIGHTNESS = -97;

      for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(32, data[i] + BRIGHTNESS);       // Red
        data[i + 1] = Math.min(32, data[i + 1] + BRIGHTNESS); // Green
        data[i + 2] = Math.min(32, data[i + 2] + BRIGHTNESS); // Blue
      }

      context.putImageData(imageData, 0, 0);

      if (index < 10) {
        const fadeAlpha = 1 - index / 10;
        context.fillStyle = `rgba(0, 0, 0, ${fadeAlpha})`;
        context.fillRect(0, 0, canvas.width, canvas.height);
      }

      if (index > frameCount - 10) {
        const fadeAlpha = (index - (frameCount - 10)) / 10;
        context.fillStyle = `rgba(0, 0, 0, ${fadeAlpha})`;
        context.fillRect(0, 0, canvas.width, canvas.height);
      }
    };

    const updateImage = (index) => {
      if (!images.current[index]) return;
      img.src = images.current[index];
      img.onload = () => applyBrightnessAndFade(img, index);
    };

    updateImage(0);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = scrollTop / maxScrollTop;
      const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
      );
      requestAnimationFrame(() => updateImage(frameIndex));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const testimonials = [
    {
      quote:
        "AMS has drastically improved our operational efficiency and reduced passenger complaints.",
      name: "Airport Operations Manager",
      location: "Heathrow Regional",
    },
    {
      quote:
        "It’s a complete game-changer. The interface is simple, and our staff adapted to it quickly.",
      name: "Director of Airport Systems",
      location: "Lagos International",
    },
    {
      quote: "AMS helped us modernise outdated systems and drastically reduce turnaround times for flights.",
      name: "Chief Technical Officer",
      location: "Dubai International"
    },
    {
      quote: "The support team is outstanding. AMS feels less like a vendor and more like a technology partner.",
      name: "IT Manager",
      location: "Singapore Changi"
    },
    {
      quote: "Thanks to AMS, we’ve had smoother operations, better staff coordination, and a noticeable uptick in passenger satisfaction.",
      name: "Ground Operations Head",
      location: "Frankfurt Airport"
    },
    {
      quote: "It's intuitive, powerful, and built with airport logic in mind. AMS is the future of airport management.",
      name: "Airport Director",
      location: "Toronto Pearson"
    }
  ];

  return (
    <>
    <section className="relative z-10">
    <canvas ref={canvasRef} className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  w-full h-full max-w-screen max-h-screen pointer-events-none z-0" />
    <RevealOnScroll>
      <div className="min-h-150 flex flex-col justify-center items-center text-center p-8 text-white">
        <h1 className="text-4xl md:text-6xl mb-6">About AMS</h1>
        <p className="max-w-4xl text-lg text-gray-400">
          AMS is a streamlined platform designed to manage airport operations efficiently. Our system is built to streamline every aspect of airport management—from flight scheduling and baggage handling to security, passenger services and so much more.
        </p>
      </div>
    </RevealOnScroll>
    <RevealOnScroll>
      <div className="flex flex-col text-left p-8 text-white">
        <p className="pl-50 text-3xl text-gray-400">Our Story</p>
        <p className="pl-50 text-lg max-w-[34rem] text-gray-400">
          AMS was born out of a passion for aviation and a deep understanding of the challenges that modern airports face. With growing passenger numbers and increasing complexity in operations, we recognised the need for a smarter, more responsive solution. That’s when our team of aviation experts and software engineers joined forces to create a system that simplifies the complex.
        </p>
      </div>
    </RevealOnScroll>
    <RevealOnScroll>
      <div className="flex flex-col items-end text-right p-8 text-white">
        <p className="pr-50 text-3xl text-gray-400">Our Mission</p>
        <p className="pr-50 text-lg max-w-[34rem] text-gray-400">
          To empower airports with smart, secure, and scalable solutions that ensure smooth operations, happier passengers, and better overall management.
        </p>
      </div>
    </RevealOnScroll>
    <RevealOnScroll>
      <div className="flex flex-col text-left p-8 text-white">
        <p className="pl-50 text-3xl text-gray-400">Our Vision</p>
        <p className="pl-50 text-lg max-w-[34rem] text-gray-400">
          A world where every airport runs like clockwork—efficient, connected, and passenger-friendly.
        </p>
      </div>
    </RevealOnScroll>
    <RevealOnScroll>
      <div className="flex flex-col items-center justify-center py-6 px-6 text-gray-400 md:px-20">
        <h2 className="py-4 text-3xl text-center mb-12">
          Testimonials
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center max-w-100 min-h-70 bg-neutral-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <p className="text-gray-400 text-lg italic mb-5">“{t.quote}”</p>
              <p className="text-right text-sm text-gray-100">
                — {t.name},{" "}
                <span className="text-right text-gray-400">{t.location}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </RevealOnScroll>
      <RevealOnScroll>
      <div>
        <p className="shiny-text min-h-50 flex flex-col justify-center items-center text-center text-gray-400 text-9xl">AMS is not just about technology—it’s about people</p>
      </div>
      </RevealOnScroll>
      </section>
    </>
  );
};

export default About;