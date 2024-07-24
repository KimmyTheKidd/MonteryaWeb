import PatchNote from "./Patches";

const notes = [
  { title: "Patch 1.0", description: "Initial release with basic features." },
  { title: "Patch 1.1", description: "Bug fixes and performance improvements." },
  { title: "Patch 1.3", description: "New levels and challenges added." },
  { title: "Patch 1.4", description: "New levels and challenges added." },
  { title: "Patch 1.5", description: "New levels and challenges added." },
  { title: "Patch 1.6", description: "New levels and challenges added." },
  { title: "Patch 1.7", description: "New levels and challenges added." },
  { title: "Patch 1.8", description: "New levels and challenges added." },
  { title: "Patch 1.9", description: "New levels and challenges added." },
  // Add more notes as needed
];

const PatchNoteList = () => {
  return (
    <div className="grid grid-cols-4 gap-1 max-w-[1800px] rounded-xl bg-transparent p-4 mx-auto items-center">
      {notes.map((note, index) => (
        <PatchNote key={index} note={note} index={index} />
      ))}
    </div>
  );
};

export default PatchNoteList;
