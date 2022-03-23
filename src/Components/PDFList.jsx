import { React} from "react";
import PDFDisplay from "./PDFDisplay";
import {useDrop} from "react-dnd"
import { NativeTypes } from "react-dnd-html5-backend";

const PDFList = ({ files, movePDF, handleDrop }) => {
    const [{canDrop, isOver }, dropRef] = useDrop(() => ({
        accept: ['PDFDisplay', NativeTypes.FILE],
        drop(item) {
            handleDrop(item.files)
            
        },
        canDrop(item) {
            return true;
        },
        collect: (monitor) => {
            return {
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop()
            }
        
        }
    }), [handleDrop])

    const renderPDF = ( file, index ) => {
        if(file)
        return (<PDFDisplay key={file.path} file={file} index={index} movePDF={movePDF}></PDFDisplay>)
    };

    return (
        <div ref={dropRef} className="h-full">
            <div className=" flex  mr-4 mt-2" >
                <div className=" flex flex-col w-full " >
                        {files.map((pdf, index) => renderPDF(pdf, index))}

                </div>
            </div>
        </div>
    )
}

export default PDFList;