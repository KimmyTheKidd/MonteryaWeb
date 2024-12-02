import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchPatchNotes, PatchNote } from './patch-server-action/patchNoteService';

const PatchNoteList = () => {
  const [notes, setNotes] = useState<PatchNote[]>([]);
  const [page, setPage] = useState(1); // For pagination if needed
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadPatchNotes = async () => {
    setIsLoading(true);
    try {
      const patchNotes = await fetchPatchNotes();
      if (patchNotes.length === 0) {
        setHasMore(false);
        return;
      }
      setNotes((prev) => [...prev, ...patchNotes]);
    } catch (error) {
      console.error('Error fetching patch notes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPatchNotes();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !isLoading && hasMore) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, hasMore]);

  // Variants for page and card animations
  const pageVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <div className="max-w-[90%] mx-auto p-6">
      <motion.header
        className="text-center mb-12"
        initial="hidden"
        animate="visible"
        variants={pageVariants} // Animate header when the page loads
      >
        <h1
          className="text-5xl font-bold text-blue-600 md:text-7xl"
          style={{
            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)',
          }}
        >
          Patch Notes
        </h1>
        <p
          className="mt-6 text-xl text-white md:text-2xl"
          style={{
            textShadow: '1px 1px 6px rgba(0, 0, 0, 0.7)',
          }}
        >
          Stay updated with the latest improvements, fixes, and new features in our software.
        </p>
      </motion.header>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={pageVariants} // Animate the grid as the page loads
      >
        {notes.map((note) => (
          <motion.div
            key={note.id}
            className="p-6 rounded-lg bg-gradient-to-r from-blue-50 via-white to-blue-50 shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
            variants={cardVariants} // Add animation for each card when revealed
            whileHover={{ scale: 1.05 }} // Hover effect
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Version {note.version}
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              {note.updateType} - {note.date}
            </p>
            <div className="mb-4">
              <p className="text-lg font-medium text-gray-700 mb-2">New Features:</p>
              {note.NewFeatures.length ? (
                <ul className="list-disc list-inside text-gray-600 text-sm">
                  {note.NewFeatures.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 text-sm">None</p>
              )}
            </div>
            <div className="mb-4">
              <p className="text-lg font-medium text-gray-700 mb-2">Bug Fixes:</p>
              {note.bugFixes.length ? (
                <ul className="list-disc list-inside text-gray-600 text-sm">
                  {note.bugFixes.map((fix, index) => (
                    <li key={index}>{fix}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 text-sm">None</p>
              )}
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700 mb-2">Improvements:</p>
              {note.improvements.length ? (
                <ul className="list-disc list-inside text-gray-600 text-sm">
                  {note.improvements.map((improvement, index) => (
                    <li key={index}>{improvement}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 text-sm">None</p>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {isLoading && (
        <div className="text-center mt-12">
          <p className="text-gray-500 animate-pulse">Loading more patch notes...</p>
        </div>
      )}

      {!hasMore && !isLoading && (
        <div className="text-center mt-12">
          <p className="text-gray-500">No more patch notes to load.</p>
        </div>
      )}
    </div>
  );
};

export default PatchNoteList;
