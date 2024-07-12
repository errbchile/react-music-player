import React, { useState, useRef } from "react";

function App() {
  const [currentTime, setCurrentTime] = useState("0:00");
  const [totalTime, setTotalTime] = useState("0:00");
  const audioRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      audioRef.current.src = fileURL;
      audioRef.current.load();
    }
  };

  const handleLoadedMetadata = () => {
    setTotalTime(formatTime(audioRef.current.duration));
  };

  const handleTimeUpdate = () => {
    setCurrentTime(formatTime(audioRef.current.currentTime));
  };

  const playAudio = () => {
    audioRef.current.play();
  };

  const pauseAudio = () => {
    audioRef.current.pause();
  };

  const stopAudio = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  const rewindAudio = () => {
    audioRef.current.currentTime -= 10;
  };

  const forwardAudio = () => {
    audioRef.current.currentTime += 10;
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="flex flex-col items-center mt-10 space-y-5">
      <input
        type="file"
        ref={fileInputRef}
        accept="audio/mp3"
        onChange={handleFileSelect}
        className="block w-1/2 p-2 border rounded-lg shadow-inner bg-gray-200 text-gray-800 focus:outline-none"
      />
      <audio
        ref={audioRef}
        controls
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        className="w-1/2 p-4 rounded-lg bg-gray-200 shadow-inner focus:outline-none"
      >
        Your browser does not support the audio element.
      </audio>
      <div className="flex space-x-4">
        <button
          onClick={playAudio}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg shadow-inner focus:outline-none transition duration-300 hover:bg-gray-300"
        >
          Play
        </button>
        <button
          onClick={pauseAudio}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg shadow-inner focus:outline-none transition duration-300 hover:bg-gray-300"
        >
          Pause
        </button>
        <button
          onClick={stopAudio}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg shadow-inner focus:outline-none transition duration-300 hover:bg-gray-300"
        >
          Stop
        </button>
        <button
          onClick={rewindAudio}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg shadow-inner focus:outline-none transition duration-300 hover:bg-gray-300"
        >
          Rewind 10s
        </button>
        <button
          onClick={forwardAudio}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg shadow-inner focus:outline-none transition duration-300 hover:bg-gray-300"
        >
          Forward 10s
        </button>
      </div>
      <div>
        <span>{currentTime}</span> / <span>{totalTime}</span>
      </div>
    </div>
  );
}

export default App;
