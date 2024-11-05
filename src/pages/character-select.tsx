import { useState } from 'react';
import { useRouter } from 'next/router';
import { saveCharacter } from '@/utils/api-service';
import { Character } from '@/utils/types';



export default function CharacterSelect() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character>(null);
  const router = useRouter();

  // Function to handle saving the selected character
  const handleSaveCharacter = async () => {
    if (!selectedCharacter) {
      alert("Please select a character before saving.");
      return;
    }

    try {
      
      const res = await saveCharacter(selectedCharacter);

      if (res.ok) {
        // Redirect to home page after successful save
        router.push('/chat');
      } else {
        throw new Error('Failed to save character');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-4">Select Your Character</h1>
      <div className="flex justify-center space-x-4 mb-6">
        <div
          onClick={() => setSelectedCharacter('girl')}
          className={`cursor-pointer border p-4 rounded ${selectedCharacter === 'girl' ? 'border-blue-500' : 'border-gray-300'}`}
        >
          <img src="/images/girl-full-body.png" alt="Girl Character" className="h-40" />
          <p className="mt-2">Girl</p>
        </div>
        <div
          onClick={() => setSelectedCharacter('boy')}
          className={`cursor-pointer border p-4 rounded ${selectedCharacter === 'boy' ? 'border-blue-500' : 'border-gray-300'}`}
        >
          <img src="/images/boy-full-body.png" alt="Boy Character" className="h-40" />
          <p className="mt-2">Boy</p>
        </div>
      </div>
      <button
        onClick={handleSaveCharacter}
        className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
      >
        Confirm
      </button>
    </div>
  );
}
