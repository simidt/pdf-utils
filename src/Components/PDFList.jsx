import { React, useState, useCallback, useEffect } from "react";
import PDFDisplay from "./PDFDisplay";
import {useDrop} from "react-dnd"
import MergeControl from "./MergeControl";
// files will be used for a "move all" button
const PDFList = ({ files }) => {
    const [selectedPDFs, setSelectedPDFs] = useState([])
    const [editingFile, setEditingFile] = useState("")
    const [{ isOver }, dropRef] = useDrop({
        accept: 'PDFDisplay',
        drop: (item) => {
            setSelectedPDFs((selectedPDFs) => {
                // Throws away the index
                const pdfs = selectedPDFs.map((obj) => obj.file);
                return !pdfs.includes(item.file) ? [...selectedPDFs, item] : selectedPDFs
        })
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    })

    const movePDF = useCallback((dragIndex, hoverIndex) => {
        setSelectedPDFs((prevPDFs) => {
            const newPDFs = [...prevPDFs]
            const dragged = newPDFs.splice(dragIndex, 1)[0]
            newPDFs.splice(hoverIndex, 0, dragged)
            return newPDFs
        });
    }, []);
    
    const renderPDF = useCallback(({ file, index }) => {
        return (<PDFDisplay key={file.path} file={file} handleClick={handleClick} index={index} movePDF={movePDF}></PDFDisplay>)
    }, []);
    const handleClick = (file) => {
        setEditingFile(file.path);
    }
    return (
        <>
            <div className=" flex ml-6 w-1/5 mt-6 min-h-[65%]">
                {/* TODO: Find a better solution for "max-h-67.25%" */}
                <div className=" flex flex-col overflow-auto w-full ml-6" ref={dropRef}>
                    <div className="flex-1 h-full m-2 border-2 rounded-md ">
                        {selectedPDFs.map((pdf, index) => renderPDF(pdf,index))}
                    </div>
                    <MergeControl  files={selectedPDFs.map(pdf => pdf.file)}></MergeControl>

                </div>

            </div>
            <div>Currently editing file {editingFile}</div>
        </>
    )
}

export default PDFList;