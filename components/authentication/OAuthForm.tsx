import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Button, Spinner, Image } from "@nextui-org/react";
import { UserAuth } from "@/config/AuthContext";
import { useRouter } from 'next/navigation'; // Import the useRouter hook
import toast, { Toaster } from 'react-hot-toast';
import { showFailedToast, showSuccessToast } from "../toast/CustomToast";

interface OAuthFormProps {
  isFormDisable: boolean;
}

const OAuthForm: React.FC<OAuthFormProps> = ({ isFormDisable }) => {
  const [isPending, setIsPending] = useState(false);
  const { googleSignIn } = UserAuth();
  const router = useRouter();

  const goToSignUp = () => {
    // router.push('/signup'); // Replace with your signup page path
  };

  const handleLoginWithGoogle = async () => {
    setIsPending(true);
    try {
      const result = await googleSignIn();
      console.log(result);
      if (!result) {
        showFailedToast('Error signing in with Google');
      } else {
        showSuccessToast("Login Successfully");
        router.push("/");
      }
      goToSignUp();
    } catch (error) {
      console.error('Error signing in with Google:', error);
    } finally {
      setIsPending(false);
    }
  };
  return (
    <Button
      onClick={handleLoginWithGoogle}
      style={{ width: '80%' }}
      className={`bg-black hover:bg-rose-700 text-white font-bold py-3 px-6 rounded-xl ${
        isFormDisable ? 'cursor-not-allowed opacity-50' : ''
      }`}
      disabled={isFormDisable} // Disable the button if form is disabled
    >
      {isPending ? (
        <Spinner color="primary" />
      ) : (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Image src="/google.png" alt="Google Logo" width={24} height={24} />
          <span style={{ marginLeft: 10 }}>Login With Google</span>
        </div>
      )}
    </Button>
  );
};

export default OAuthForm;
