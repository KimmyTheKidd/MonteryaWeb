import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';

export async function fetchplayerInfo(useId: string) {
  try {
    const docRef = doc(db, 'users', useId);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  } catch (error) {
    console.log(error);
  }
}
