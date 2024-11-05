import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const token = req.headers.authorization?.split(' ')[1]; // Extract the JWT token from the Authorization header
    if (!token) {
      return res.status(401).json({ message: 'Authorization token missing' });
    }

    // Forward the request to the FastAPI backend to fetch user information
    const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-info`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!backendResponse.ok) {
      return res.status(backendResponse.status).json({ message: 'Failed to fetch user info from backend' });
    }

    const userInfo = await backendResponse.json();

    // Send the user information back to the frontend
    return res.status(200).json(userInfo);
  } catch (error) {
    console.error('Error fetching user info:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
