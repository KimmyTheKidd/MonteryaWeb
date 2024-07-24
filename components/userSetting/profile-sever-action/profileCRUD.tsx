"use server"
import { db } from "@/config/firebase";
import { sendEmailVerification } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";

interface UserData {
  displayName: string;
  emailVerified: string;
  username: string;
}

export async function fetchUser(uid: string): Promise<UserData | null> {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as UserData;
    } else {
      console.error("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

export async function setDisplayName(uid: any, DisplayName: any) {
  try {
    const userDoc = doc(db, "users", uid); // Adjust the path to your users collection if needed
    console.log(uid, DisplayName);
    await updateDoc(userDoc, {
      displayName: DisplayName,
    });
    // console.log('Display Name updated successfully');
    return JSON.stringify({ status: 200 });
  } catch (error) {
    // console.error('Error updating display name:', error);
    return JSON.stringify({ status: 400, error: error });
  }
}

export async function setUserName(uid: any, UserName: any) {
  try {
    const userDoc = doc(db, "users", uid); // Adjust the path to your users collection if needed

    console.log(uid, UserName);
    await updateDoc(userDoc, {
      username: UserName,
    });

    // console.log('Display Name updated successfully');
    return JSON.stringify({ status: 200 });
  } catch (error) {
    // console.error('Error updating display name:', error);
    return JSON.stringify({ status: 400, error: error });
  }
}

export async function EmailVerification(user:any) {
  sendEmailVerification(user).then(()=>{
    console.log("Email Varification Send!");
  })
}
