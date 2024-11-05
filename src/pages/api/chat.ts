/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { message } = req.body;
  const token = req.headers.authorization; // Pass the Authorization header

  if (!token) {
    return res.status(401).json({ message: 'No authorization token provided' });
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,  // Include the JWT token in the Authorization header
      },
      body: JSON.stringify({ message }),
    });

    if (response.ok) {
      const data = await response.json();
      res.status(200).json(data); // Send success message back to the frontend
    } else {
      res.status(response.status).json({ message: 'Chat failed' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}
