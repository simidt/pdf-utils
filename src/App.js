import Dropzone from "react-dropzone";
import { useState } from "react";
import PDFDisplay from "./Components/PDFDisplay";
import PDFList from "./Components/PDFList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
function App() {
  const [files, setFiles] = useState([]);

  const handleDrop = (droppedFile) => {
    setFiles(files.concat(droppedFile));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex min-w-1/5 bg-gray-100 p-8 h-screen">
        <div className="ml-4 flex-col justify-center">
          <Dropzone onDrop={handleDrop}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
              </section>
            )}
          </Dropzone>
          <div className="flex-col overflow-auto flex-1 max-h-[65%]">
            {files.map((file, idx) => (
              <PDFDisplay key={file.path} file={file}></PDFDisplay>
            ))}
          </div>
          {files.length === 0 ? (
            <></>
          ) : (
            <div className="mt-6">
              <button className="ml-4">Extract pages</button>
            </div>
          )}
        </div>
        <PDFList className="w-1/5"></PDFList>
      </div>
    </DndProvider>
  );
}

export default App;
