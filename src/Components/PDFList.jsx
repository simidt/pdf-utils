import { React, useState } from "react";
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
            console.log(item)
            setSelectedPDFs((selectedPDFs) =>
                !selectedPDFs.includes(item) ? [...selectedPDFs, item] : selectedPDFs)
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    })

    const handleClick = (file) => {
        setEditingFile(file.path);
    }
    return (
        <>
        <div className=" flex ml-6  mt-6  min-w-[20%]">
            <div className=" flex flex-col overflow-auto w-full ml-6 min-h-[65%] max-h-[67.25%] " ref={dropRef}>
                <div className="flex-1 h-full m-2 border-2 rounded-md ">
                        {selectedPDFs.map(pdf => <PDFDisplay key={pdf.path} file={pdf} handleClick={handleClick}></PDFDisplay>)}
                    </div>
                    <MergeControl  files={selectedPDFs}></MergeControl>

            </div>

            </div>
            <div>Currently editing file {editingFile}</div>
            </>
    )
}

export default PDFList;