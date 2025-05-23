import { db, storage } from '@/config/firebase';
import {
  FieldValue,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
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
    // Check if the user exists
    const userDocRef = doc(db, 'users', data.userId);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      console.error('User does not exist');
      return JSON.stringify({ status: 404, message: 'User not found' });
    }

    // Check the time since the last bug report from this user
    const lastReportQuery = collection(db, 'bugReport');
    const q = query(
      lastReportQuery,
      where('userId', '==', data.submitId),
      orderBy('timeCreated', 'desc'),
      limit(1)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const lastReport = querySnapshot.docs[0].data();
      const lastReportTime = lastReport.timeCreated.toDate();
      const now = new Date();

      const timeDiff = now.getTime() - lastReportTime.getTime();
      const fiveMinutesInMillis = 5 * 60 * 1000;

      if (timeDiff < fiveMinutesInMillis) {
        return JSON.stringify({
          status: 429,
          message: 'Please wait 5 minutes before submitting another bug report.',
        });
      }
    }

    // Generate a unique BugID
    const BugID = uuidv4();

    // Prepare bug report data
    const bugData: BugData = {
      userId: data.submitId,
      bugType: data.bugType,
      bugName: data.bugName,
      Description: data.Description,
      timeCreated: serverTimestamp(),
      BugId: BugID,
      resolve: false,
    };

    // If a bug image is provided, upload the image
    if (data.bugImage) {
      try {
        const fileExtension = data.bugImage.name.split('.').pop(); // Extract file extension
        const imageRef = ref(
          getStorage(),
          `BugReports/${BugID}.${fileExtension}`
        );
        
        const uploadResult = await uploadBytes(imageRef, data.bugImage);
        console.log('Image uploaded successfully');
        
        // Get the image's download URL
        const url = await getDownloadURL(uploadResult.ref);
        bugData.bugImage = url; // Add image URL to bugData
      } catch (uploadError) {
        console.error('Error uploading bug image:', uploadError);
        return JSON.stringify({
          status: 500,
          message: 'Image upload failed',
        });
      }
    }

    // Save bugData to Firestore using the BugID as the document ID
    await setDoc(doc(db, 'bugReport', BugID), bugData);
    console.log('Bug report saved successfully');

    return JSON.stringify({ status: 200, message: 'Bug report submitted successfully.' });
  } catch (error) {
    console.error('Error sending bug report:', error);
  
    // Default error message
    let errorMessage = "Failed to do something exceptional";
  
    // Check if the error is an instance of the Error object
    if (error instanceof Error) {
      errorMessage = error.message;
    }
  
    console.log(errorMessage);
  
    // Return the error response with the error message
    return JSON.stringify({
      status: 500,
      message: errorMessage || 'An unexpected error occurred',
    });
  }
}
