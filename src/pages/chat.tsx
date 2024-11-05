/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Howl } from 'howler';
import BackgroundSelector, { BackgroundOptions } from '@/components/BackgroundSelector';
import { sendMessage } from '@/utils/api-service';
import ChatResponseDisplay from '@/components/MarkdownDisplay';

const girlAvatar = '/images/girl-full-body.png';
const boyAvatar = '/images/boy-full-body.png';
const botAvatar = '/images/chef-full-body.png';

type Character = 'girl' | 'boy';

const Chat = () => {
  const [backgroundImage, setBackgroundImage] = useState<string>(BackgroundOptions[0].imageUrl);
  const [inputValue, setInputValue] = useState<string>('');
  const [currentMessage, setCurrentMessage] = useState<{ text: string, sender: string } | null>({ text: 'Hello! How can I help you today?', sender: 'bot' });
  const [typedMessage, setTypedMessage] = useState<string>(''); // For typing effect
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null); // Track the selected character

  const [backgroundMusic, setBackgroundMusic] = useState<string>(BackgroundOptions[0].musicUrl);
  const [backgroundSound, setBackgroundSound] = useState<Howl | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const router = useRouter();

  const handleBackgroundChange = (imageUrl: string, musicUrl: string) => {
    setBackgroundImage(imageUrl);
    setBackgroundMusic(musicUrl);
  };

  // Fetch the user's information from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch('/api/user-info', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await response.json();
        const { selectedCharacter, backgroundImage, backgroundMusic } = userData;

        // Set the avatar and background based on the fetched data
        setSelectedCharacter(selectedCharacter);
        if (backgroundImage) setBackgroundImage(backgroundImage);
        if (backgroundMusic) setBackgroundMusic(backgroundMusic);
      } catch (error) {
        console.error(error);
        router.push('/login'); // Redirect to login if there is an issue fetching user data
      }
    };

    fetchUserData();
  }, [router]);

  // Typing effect to display text one character at a time
  useEffect(() => {
    if (currentMessage && typedMessage.length < currentMessage.text.length) {
      const timeout = setTimeout(() => {
        setTypedMessage(currentMessage.text.slice(0, typedMessage.length + 1));
      }, 50); // Adjust the typing speed
      return () => clearTimeout(timeout);
    }
  }, [typedMessage, currentMessage]);

  // Handler for user input submission
  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    const userMessage = { text: inputValue, sender: 'user' };
    setCurrentMessage(userMessage);
    setTypedMessage(''); // Reset typing effect
    setInputValue(''); // Clear input

    // Typing effect for the bot
    setIsTyping(true);

    setTimeout(async () => {
      const botResponse = await sendMessage(inputValue);
      setCurrentMessage({ text: botResponse, sender: 'bot' });
      setTypedMessage(''); // Reset typing effect for bot message
      setIsTyping(false);
    }, 1000); // Simulate a delay before the bot responds
  };

  useEffect(() => {
    if (!backgroundMusic) return;
    const sound = new Howl({
      src: [backgroundMusic],
      loop: true,
      volume: 0.0,
    });

    const soundId = sound.play();
    sound.on('playerror', function () {
      setIsPlaying(false);
    });

    sound.on('play', function () {
      sound.fade(0.0, 1.0, 1000);
      setIsPlaying(true);
    });

    setBackgroundSound(sound);
    return () => {
      sound.stop();
    };
  }, [backgroundMusic]);

  const handlePlaySound = () => {
    if (backgroundSound && !isPlaying) {
      backgroundSound.play();
      backgroundSound.fade(0.0, 1.0, 1000);
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex flex-col justify-end items-center h-screen w-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="flex flex-col w-4/5 max-w-4xl bg-gray-200 bg-opacity-90 rounded-lg p-5 shadow-lg">
        {currentMessage && (
          <div className={`flex mb-5 animate-fade-in ${currentMessage.sender === 'bot' ? 'justify-start' : 'justify-end'}`}>
            {currentMessage.sender === 'bot' && <img src={botAvatar} alt="Bot avatar" className="w-28 h-28" />}
            {currentMessage.sender === 'bot' ? (<ChatResponseDisplay content={typedMessage} />) : (<p className="bg-white p-3 rounded-lg text-lg text-black max-w-[80%] break-words">{typedMessage}</p>)}
            
            {currentMessage.sender === 'user' && (
              <img
                src={selectedCharacter === 'girl' ? girlAvatar : boyAvatar} // Use the selected character for the avatar
                alt="User avatar"
                className="w-28 h-28"
              />
            )}
          </div>
        )}
        <div className="flex mt-5">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow p-2 rounded-lg border border-gray-300 text-base text-black bg-gray-100"
          />
          <button onClick={handleSendMessage} className="ml-3 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
            Send
          </button>
        </div>
        <div className="mt-6">
          <BackgroundSelector onBackgroundChange={handleBackgroundChange} />
          {!isPlaying && <button onClick={handlePlaySound} className="mt-4 p-2 bg-green-500 text-white rounded-lg hover:bg-green-700">Start Sound</button>}
        </div>
      </div>
    </div>
  );
};

export default Chat;
