import { useCallback, useState } from "react";
import PDFList from "./Components/PDFList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import MergeControl from "./Components/MergeControl";
function App() {
  const [files, setFiles] = useState([]);

  const handleDrop = (newFiles) => {
    setFiles(() => {
      if (!newFiles) {
        return files;
      }
      // Keep only the files that are not already present
      const filteredNewFiles = newFiles.filter((f) => !files.includes(f));
      return filteredNewFiles.length > 0
        ? files.concat(filteredNewFiles)
        : files;
    });
  };

  const movePDF = useCallback((dragIndex, hoverIndex) => {
    setFiles((prevPDFs) => {
      const newPDFs = [...prevPDFs];
      const dragged = newPDFs.splice(dragIndex, 1)[0];
      newPDFs.splice(hoverIndex, 0, dragged);
      return newPDFs;
    });
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-row bg-gray-100 p-8 h-screen justify-center">
        <div className="ml-4 flex-col min-w-[20%] h-full">
          <div>
            Drag and drop your files into the box below. You may reorder the
            files by dragging them to a new position.
            <p>
              Clicking on "Merge PDFs" will concatenate the PDFs and show the
              result.
            </p>
            <p>All computations run locally. No file leaves your machine.</p>
          </div>
          <div className="flex-col flex-1 min-h-fit h-1/3 border-dashed border-4 mt-8">
            <PDFList
              files={files}
              movePDF={movePDF}
              handleDrop={handleDrop}
            ></PDFList>
          </div>
        </div>
        <div className="flex-col flex  justify-center fit-content ml-4">
          <MergeControl files={files}></MergeControl>
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
