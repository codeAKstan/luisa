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

const galleryImages = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "9.jpg", "10.jpg", "11.jpg"];

export default function Valentine() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [audio, setAudio] = useState(null);
  const [raining, setRaining] = useState(false);

  useEffect(() => {
    // Auto-play first song
    const bgMusic = new Audio('/song.mp3');
    bgMusic.loop = true;
    bgMusic.play().catch(err => console.log("Autoplay blocked:", err));
    setAudio(bgMusic);

    return () => {
      bgMusic.pause();
      bgMusic.currentTime = 0; // Reset on unmount
    };
  }, []);

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
      const interval = setInterval(() => {
        setGalleryIndex(prevIndex => (prevIndex + 1) % galleryImages.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [showGallery]);

  const handleYesClick = () => {
    setLoading(true);
    setRaining(true);
    if (audio) {
      audio.pause(); // Stop first song
    }
    const newMusic = new Audio('/new-song.mp3'); // Play new song
    newMusic.play().catch(err => console.log("Autoplay blocked:", err));
    setAudio(newMusic);

    // Start raining effect
    const rainInterval = setInterval(() => {
      const heart = document.createElement('div');
      heart.className = 'heart';
      heart.innerHTML = '❤️';
      heart.style.left = `${Math.random() * 100}vw`;
      heart.style.animationDuration = `${Math.random() * 3 + 2}s`;
      document.body.appendChild(heart);

      const rose = document.createElement('div');
      rose.className = 'rose';
      rose.innerHTML = '🌹';
      rose.style.left = `${Math.random() * 100}vw`;
      rose.style.animationDuration = `${Math.random() * 3 + 2}s`;
      document.body.appendChild(rose);

      // Remove elements after animation ends
      setTimeout(() => {
        heart.remove();
        rose.remove();
      }, 5000);
    }, 300);

  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      {showGallery ? (
        <div>
          <h1 className="text-primary animate-fade-in mb-4">Happy Valentine's! 💖</h1>
          <motion.img
            key={galleryIndex}
            src={`/${galleryImages[galleryIndex]}`}
            width={250}
            height={250}
            alt="Her"
            className="rounded-xl shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1 }}
          />
        </div>
      ) : loading ? (
        <motion.div
          className="text-6xl text-red-500"
          animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.4, 1] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
        >
          ❤️
        </motion.div>
      ) : step < messages.length ? (
        <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-6">
          <motion.img
            src={`/${messages[step].image}`}
            width={250}
            height={250}
            alt="Message Image"
            className="rounded-xl shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />

          <motion.div
            key={step}
            className="text-primary bg-opacity-50 p-4 rounded-xl max-w-xs"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {messages[step].emoji} {messages[step].text}
          </motion.div>

          <div className="button-container flex space-x-4 mt-4">
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
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
          <h1 className="text-primary mb-4">Will you be my Valentine? 💘</h1>
          <div className="button-container flex space-x-4">
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