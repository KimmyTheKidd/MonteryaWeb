import { Button } from "@nextui-org/button";

const MiniMont = () => {
  const handleDownload = () => {
    console.log("Trigger");
    // const link = document.createElement('a');
    // link.href = 'path/to/your/game.zip'; // Replace with the actual file path
    // link.download = 'game.zip'; // You can name the file whatever you want
    // link.click();
  };

  return (
    <div className="flex flex-col items-center mt-8">
      {/* Place the gif above the button */}
      <img
        src="/yunki.gif" // path to the gif inside the public folder
        alt="Yunki"
        className="mb-4 w-16 h-16" // Adjust width and height as per your requirements
      />
      <Button 
        color="primary" 
        size="lg"  // Larger button size
        className="px-12 py-4 text-xl shadow-lg hover:shadow-2xl transition-all duration-300" 
        onClick={handleDownload}
        style={{
          backgroundColor: '#1E40AF', // Custom blue color for the button
          borderRadius: '8px',  // Rounded corners for a softer look
        }}
      >
        Download Game
      </Button>
    </div>
  );
};

export default MiniMont;
