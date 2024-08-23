import LoginCard from '@/components/authentication/LoginCard';

export default function LoginPage() {
  return (
    <>
      <section
        id="home"
        className="dark:bg-gray-dark relative z-10 overflow-hidden bg-white pb-16 pt-[120px] md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px] bg-cover bg-center flex justify-center items-center"
        style={{
          backgroundImage: "url('/kingforge.png')",
          backgroundPosition: 'center center', // Center the image
          backgroundRepeat: 'no-repeat', // Ensure image is not repeated
          backgroundSize: 'cover', // Adjust this property
          height: '980px', // Set a specific height if needed
        }}
      >
        <LoginCard />
      </section>
    </>
  );
}
