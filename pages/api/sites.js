import db from '@/lib/firebase-admin';

const sites = async (_, res) => {
  const snapshot = await db.collection('sites').get();
  const sites = [];

  snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data().data });
  });

  res.status(200).json({ sites });
};

export default sites;