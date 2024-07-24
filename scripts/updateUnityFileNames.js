const fs = require('fs');
const path = require('path');

const unityBuildDir = path.join(__dirname, '../public/Unity-WebGl-Build/Build'); // Adjust the path as necessary

// Define the possible extensions
const extensions = ['data', 'framework.js', 'loader.js', 'wasm'];

fs.readdir(unityBuildDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach(file => {
    // Find the extension that matches the end of the filename
    const matchedExtension = extensions.find(ext => file.endsWith(ext));
    
    if (matchedExtension) {
      // Split the filename to get the base name
      const baseName = file.slice(0, -matchedExtension.length); // Remove the extension part

      // Construct the new file name
      const newFileName = `Monterya_WebBuild.${matchedExtension}`;
      const oldFilePath = path.join(unityBuildDir, file);
      const newFilePath = path.join(unityBuildDir, newFileName);

      fs.rename(oldFilePath, newFilePath, (err) => {
        if (err) {
          console.error(`Error renaming file ${file}:`, err);
        } else {
          //console.log(`Renamed ${file} to ${newFileName}`);
        }
      });
    }
  });
});
