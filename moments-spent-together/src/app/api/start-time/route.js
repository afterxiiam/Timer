// src/app/api/start-time/route.js
import { db } from '../../../lib/firebase.js';

export async function handler(req, res) {
  if (req.method === 'GET') {
    const doc = await db.collection('timer').doc('start-time').get();
    if (!doc.exists) {
      const startTime = Date.now();
      await db.collection('timer').doc('start-time').set({ startTime });
      return res.status(200).json({ startTime });
    }
    return res.status(200).json(doc.data());
  }

  res.status(405).json({ message: 'Method Not Allowed' });
}
