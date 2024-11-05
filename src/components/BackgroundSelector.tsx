import { useState } from 'react';

type BackgroundOption = {
  id: string;
  imageUrl: string;
  musicUrl: string;
  label: string;
};

export const BackgroundOptions: BackgroundOption[] = [
  {
    id: 'cozy-cafe',
    imageUrl: 'https://res.cloudinary.com/dkkwc6wnw/image/upload/v1728875614/midnight-diner/cozy-restaurant_okzbqz.png',
    musicUrl: 'https://res.cloudinary.com/dkkwc6wnw/video/upload/v1728875630/midnight-diner/bossa-nova-morning-cafe-233025_llvbkp.mp3',
    label: 'Cozy Café'
  },
  {
    id: 'treehouse',
    imageUrl: 'https://res.cloudinary.com/dkkwc6wnw/image/upload/v1728875588/midnight-diner/warm-restaurant_akaerd.png',
    musicUrl: 'https://res.cloudinary.com/dkkwc6wnw/video/upload/v1728875642/midnight-diner/jazz-podcast-night-relaxing-vibes-242886_qec7y9.mp3',
    label: 'Treehouse'
  },
  {
    id: 'riverside',
    imageUrl: 'https://res.cloudinary.com/dkkwc6wnw/image/upload/v1728875606/midnight-diner/chinese-style-restaurant_wctdqk.png',
    musicUrl: 'https://res.cloudinary.com/dkkwc6wnw/video/upload/v1728875648/midnight-diner/soothing-calming-relaxing-jazz-podcast-music-243340_ucjkci.mp3',
    label: 'Riverside Café'
  },
];

type Props = {
  onBackgroundChange: (imageUrl: string, musicUrl: string) => void;
};

const BackgroundSelector: React.FC<Props> = ({ onBackgroundChange }) => {
  const [selectedBackground, setSelectedBackground] = useState<string>(BackgroundOptions[0].id);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = BackgroundOptions.find(option => option.id === e.target.value);
    if (selectedOption) {
      setSelectedBackground(selectedOption.id);
      onBackgroundChange(selectedOption.imageUrl, selectedOption.musicUrl);
    }
  };

  return (
    <div className="flex flex-col items-start">
      <h5 className="mb-2 text-lg font-semibold text-gray-700">Select a background:</h5>
      <select
        value={selectedBackground}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded-md text-base bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {BackgroundOptions.map(option => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BackgroundSelector;
