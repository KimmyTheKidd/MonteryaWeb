// patchNoteService.ts
import { db } from "@/config/firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const patchNotesCollection = collection(db, "patchNotes");

export interface PatchNote {
  id?: string;
  version: string;
  date: string;
  updateType: string;
  NewFeatures: [];
  bugFixes: string[];
  improvements: string[];
}

// Read
export const fetchPatchNotes = async () => {
  const querySnapshot = await getDocs(patchNotesCollection);
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() }) as PatchNote,
  );
};
