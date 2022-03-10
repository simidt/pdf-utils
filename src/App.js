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
      <div className="flex flex-row bg-gray-100 p-8 h-screen">
        <div className="ml-4 flex-col min-w-[20%] border-dashed border-4 mt-8">
          <Dropzone onDrop={handleDrop} className="h-full">
            {({ getRootProps, getInputProps }) => (
              <section className="h-full">
                <div {...getRootProps()} className=" h-full">
                  <input {...getInputProps()} />
                  {files.length === 0 ? (
                    <p className="h-full flex flex-col justify-center opacity-50">
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  ) : (
                    <div className="flex-col overflow-auto flex-1 max-h-[65%]">
                      {files.map((file, idx) => (
                        <PDFDisplay
                          key={file.path}
                          file={file}
                          index={idx}
                        ></PDFDisplay>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            )}
          </Dropzone>

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
