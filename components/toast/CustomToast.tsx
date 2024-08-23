import toast from "react-hot-toast";

export const showSuccessToast = (message: string) => {
  return toast.success(message, {
    position: "top-right",
    style: {
      border: "1px solid #4CAF50", // Green border color
      padding: "12px",
      color: "#4CAF50", // Green text color
      backgroundColor: "#E7F7E4", // Light green background color
      width: "300px", // Adjust width as needed
    },
    iconTheme: {
      primary: "#4CAF50", // Green icon color
      secondary: "#FFFFFF", // White icon background color
    },
  });
};

export const showFailedToast = (message: string) => {
  return toast.error(message, {
    position: "top-right",
    style: {
      border: "1px solid #FF7043", // Red border color
      padding: "12px",
      color: "#FF7043", // Red text color
      backgroundColor: "#FFE0D7", // Light red background color
      width: "300px", // Adjust width as needed
    },
    iconTheme: {
      primary: "#FF7043", // Red icon color
      secondary: "#FFFFFF", // White icon background color
    },
  });
};
