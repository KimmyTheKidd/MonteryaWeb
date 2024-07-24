import { db , storage } from '@/config/firebase';
import { FieldValue, collection, doc, getDoc, getDocs, limit, orderBy, query, serverTimestamp, setDoc, where } from 'firebase/firestore';
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

interface BugData {
  userId: string;
  bugType: string;
  // customBugType?: string;
  bugName: string;
  Description: string;
  timeCreated: FieldValue; // Assuming FieldValue is imported from Firestore
  BugId: string;
  resolve: boolean;
  bugImage?: string; // Store URL instead of File
}

export interface BugReportData {
  userId: string;
  submitId: string;
  bugType: string;
  // customBugType?: string; // Make customBugType optional
  bugName: string;
  Description: string;
  bugImage?: File | null; // Use File type for bugImage
}

export async function SendBugReport(data: BugReportData): Promise<string> {
  try {
    // Check if user exists
    const userDocRef = doc(db, "users", data.userId);
    const userDoc = await getDoc(userDocRef);
    console.log(data);
    if (!userDoc.exists()) {
      console.error('User does not exist');
      return JSON.stringify({ status: 404, message: 'User not found' });
    }

    // Check the time since the last report
    const lastReportQuery = collection(db, "bugReport");
    const q = query(
      lastReportQuery,
      where('userId', '==', data.submitId),
      orderBy('timeCreated', 'desc'),
      limit(1)
    );

    console.log(q);
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const lastReport = querySnapshot.docs[0].data();
      const lastReportTime = lastReport.timeCreated.toDate();
      const now = new Date();

      // Calculate time difference
      const timeDiff = now.getTime() - lastReportTime.getTime();
      const fiveMinutesInMillis = 5 * 60 * 1000;

      // Check if 5 minutes have passed
      if (timeDiff < fiveMinutesInMillis) {
        return JSON.stringify({ status: 429, message: 'Please wait before submitting another bug report.' });
      }
    }


    const BugID = uuidv4();
    const bugData: BugData = {
      userId: data.submitId,
      bugType: data.bugType,
      bugName: data.bugName,
      Description: data.Description,
      timeCreated: serverTimestamp(),
      BugId: BugID,
      resolve: false,
      // ...(data.customBugType && { customBugType: data.customBugType }),
    };

    if (data.bugImage) {
      const imageRef = ref(storage, `BugReports/${data.bugImage.name + uuidv4()}`);
      const uploadResult = await uploadBytes(imageRef, data.bugImage);
      console.log("Image uploaded successfully");

      const url = await getDownloadURL(uploadResult.ref);
      bugData.bugImage = url;
    }
    // Save bugData to Firestore
    await setDoc(doc(collection(db, "bugReport")), bugData);
    console.log("Bug report saved successfully");

    return JSON.stringify({ status: 200 });
  } catch (error) {
    console.error('Error sending bug report:', error);
    return JSON.stringify({ status: 500, message: error || 'An unexpected error occurred' });
  }
}