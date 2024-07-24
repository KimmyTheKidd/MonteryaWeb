"use client"
import { faFileArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/button";
import { useRef, useState } from "react";
import { FaFileUpload } from "react-icons/fa";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  onReset: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, onReset }) => {
  const [dragging, setDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // State for image preview
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);

    if (e.dataTransfer.files.length) {
      const file = e.dataTransfer.files[0];
      handleFileUpload(file);
    }
  };

  const handleFileSelect = () => {
    if (fileInputRef.current?.files?.length) {
      const file = fileInputRef.current.files[0];
      handleFileUpload(file);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const { items } = e.clipboardData;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (item.kind === "file" && item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (file) {
          handleFileUpload(file);
          break;
        }
      }
    }
  };

  const handleFileUpload = (file: File) => {
    onFileSelect(file);

    // Read and display image preview
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Reset function to clear selected file and image preview
  const resetFileUpload = () => {
    setSelectedImage(null);
    onReset(); // Call parent component's reset function to clear selected file
  };

  return (
    <div
  style={{
    border: `2px dashed ${dragging ? "blue" : "gray"}`,
    padding: "1rem",
    borderRadius: "8px",
    textAlign: "center",
    minHeight: "100px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }}
  onDragEnter={handleDragEnter}
  onDragOver={handleDragEnter}
  onDragLeave={handleDragLeave}
  onDrop={handleDrop}
  onPaste={handlePaste}
>
  <input
    type="file"
    ref={fileInputRef}
    style={{ display: "none" }}
    onChange={handleFileSelect}
  />
  <div>
    {selectedImage ? (
      <>
        <img
          src={selectedImage}
          alt="Uploaded Preview"
          style={{
            display: "block",
            margin: "0 auto",
            maxWidth: "100%",
            maxHeight: "200px",
            marginBottom: "1rem",
            textAlign: "center",
          }}
        />

        <button
          onClick={resetFileUpload}
          style={{ marginBottom: "1rem" }}
          color="error"
        >
          Clear Image
        </button>
      </>
    ) : (
      <Button
        onClick={() => fileInputRef.current?.click()}
        color="primary"
        style={{ marginBottom: "2rem" }}
      >
        <FontAwesomeIcon icon={faFileArrowUp} />
        Select File
      </Button>
    )}
    <p color="gray">
      {selectedImage
        ? "Drag and drop or paste another image to replace"
        : "Drag and drop your file here, or click to select a file or paste an image."}
    </p>
  </div>
</div>

  );
};

export default FileUpload;
