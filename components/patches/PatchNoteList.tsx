// Add a blank line between import groups
import { useState, useEffect } from 'react';
import PatchNote from './Patches';
import { fetchPatchNotes } from './patch-server-action/patchNoteService';

// Define the type for the patch note
interface PatchNoteType {
  title: string;
  description: string;
  bugFixes: string[];
  NewFeatures: string[];
  improvements: string[];
}

const PatchNoteList = () => {
  // Use the defined type for the state
  const [notes, setNotes] = useState<PatchNoteType[]>([]);

  // Fix the warning by adding a blank line before this statement
  const getUser = async () => {
    try {
      const result = await fetchPatchNotes();
      // Assuming result is an array of patch notes
      const patchNotes: PatchNoteType[] = result.map((note) => ({
        title: `Version ${note.version}`,
        description: `${note.updateType} - ${note.date}`,
        bugFixes: note.bugFixes,
        NewFeatures: note.NewFeatures,
        improvements: note.improvements,
      }));
       setNotes(patchNotes);
    } catch (error) {
      // console.error('Error fetching patch notes:', error); // Consider removing console statement if not needed
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-1 max-w-[1800px] mx-auto items-center rounded-xl bg-transparent p-4">
      {notes.map((note, index) => (
        <PatchNote key={index} index={index} note={note} />
      ))}
    </div>
  );
};

export default PatchNoteList;
