import Firestore from 'firebase-firestore-lite';
import firebaseAuth from './firebaseAuth';

const db = new Firestore({
  projectId: process.env.PROJECT_ID,
  auth: firebaseAuth
});

export const transaction = db.transaction();

export default db;
