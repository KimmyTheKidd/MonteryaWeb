import SignUpCard from '@/components/authentication/SignupCard';
import { motion } from 'framer-motion';

export default function SignUpPage() {
  return (
    <>
      <section
        id="home"
        className="dark:bg-gray-dark relative z-10 overflow-hidden bg-white pb-16 pt-[120px] md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px] bg-cover bg-center flex justify-center items-center"
        style={{
          backgroundImage: "url('/kingforge.png')",
          backgroundSize: 'cover', // Adjust this property
          backgroundRepeat: 'no-repeat', // Ensure image is not repeated
          backgroundPosition: 'center center', // Center the image
          height: '980px', // Set a specific height if needed
        }}
      >
        <SignUpCard />
      </section>
    </>
  );
}
