'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const messages = [
  { text: "Heyyyyy, pretty girl.", emoji: "👋", image: "one.png" },
  { text: "Recently, we met. And somehow, you've been on my mind ever since.", emoji: "📅", image: "two.png" },
  { text: "You're beautiful, you're smart, you're fun, and you make spending time together feel too short.", emoji: "✨", image: "four.png" },
  { text: "I look forward to when I'll see you again, hold your hands, and look into your pretty eyes..", emoji: "✨", image: "seven.png" },
  { text: "So now I've got a question for you…", emoji: "✨", image: "six.png" },
];

const galleryImages = ["1.png", "2.png", "3.png"]; // Separate images for final scene

export default function Valentine() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [animateImages, setAnimateImages] = useState([false, false, false]);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
        setShowGallery(true);
      }, 3000);
    }
  }, [loading]);

  useEffect(() => {
    if (showGallery) {
      const timers = animateImages.map((_, index) =>
        setTimeout(() => {
          setAnimateImages(prev => {
            const newAnimateImages = [...prev];
            newAnimateImages[index] = true;
            return newAnimateImages;
          });
        }, index * 500)
      );

      return () => timers.forEach(timer => clearTimeout(timer));
    }
  }, [showGallery]);

  const handleYesClick = () => {
    setLoading(true);
    const audio = new Audio('/song.mp3');
    audio.play();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      {showGallery ? (
        <div>
          <h1 className="text-primary animate-fade-in">Happy Valentine's! 💖</h1>
          <div className="flex space-x-4 mt-6">
            {galleryImages.map((img, index) => (
              <motion.img
                key={index}
                src={`/${img}`}
                width={200}
                height={200}
                alt="Her"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.5, duration: 1 }}
                className="rounded-xl shadow-lg"
              />
            ))}
          </div>
        </div>
      ) : loading ? (
        <h1 className="text-primary animate-pulse">Loading... 💕</h1>
      ) : step < messages.length ? (
        <div className="flex flex-col items-center">
          {/* Image above each text */}
          <motion.img
            src={`/${messages[step].image}`}
            width={250}
            height={250}
            alt="Message Image"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="rounded-xl shadow-lg mb-4"
          />

          <motion.div
            key={step}
            className="text-primary bg-opacity-50 p-4 rounded-xl animate-fade-in"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {messages[step].emoji} {messages[step].text}
          </motion.div>

          <div className="button-container">
            {step > 0 && (
              <motion.button
                onClick={() => setStep(step - 1)}
                className="button-primary"
                whileHover={{ scale: 1.05 }}
              >
                Back
              </motion.button>
            )}
            <motion.button
              onClick={() => setStep(step + 1)}
              className="button-primary"
              whileHover={{ scale: 1.05 }}
            >
              Next
            </motion.button>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-primary">Will you be my Valentine? 💘</h1>
          <div className="button-container">
            <motion.button
              onClick={handleYesClick}
              className="button-primary"
              whileHover={{ scale: 1.05 }}
            >
              Yes
            </motion.button>
            <motion.button
              onClick={handleYesClick}
              className="button-primary"
              whileHover={{ scale: 1.05 }}
            >
              Yes
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}
