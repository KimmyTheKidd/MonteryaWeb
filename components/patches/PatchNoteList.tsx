import { useState, useEffect } from 'react';
import { fetchPatchNotes } from './patch-server-action/patchNoteService';
import PatchNote from './Patches';

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
      console.error('Error fetching patch notes:', error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-1 max-w-[1800px] rounded-xl bg-transparent p-4 mx-auto items-center">
      {notes.map((note, index) => (
        <PatchNote key={index} note={note} index={index} />
      ))}
    </div>
  );
};

export default PatchNoteList;
