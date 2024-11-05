import { Character } from "./types";

export const saveCharacter = async (character: Character) => {
  const token = sessionStorage.getItem('token'); // Get the JWT token from sessionStorage
      if (!token) {
        throw new Error('No authentication token found');
      }
  const res = await fetch('/api/select-character', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Set the token in the Authorization header
        },
        body: JSON.stringify({ character: character }),
      });
  return res;
}


// Function to send a message to the chat API and get a response
export const sendMessage = async (message: string): Promise<string> => {
  if (!message) throw new Error('Message is required');

  const token = sessionStorage.getItem('token');
  if (!token) throw new Error('No authentication token found');

  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error('Failed to send message');
  }

  const data = await response.json();
  return data.response;  // Assuming the backend returns the response as { "response": "message" }
};