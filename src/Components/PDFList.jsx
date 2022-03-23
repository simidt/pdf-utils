import { React} from "react";
import PDFDisplay from "./PDFDisplay";
import {useDrop} from "react-dnd"
import { NativeTypes } from "react-dnd-html5-backend";

const PDFList = ({ files, movePDF, handleDrop }) => {
    const [, dropRef] = useDrop(() => ({
        accept: ['PDFDisplay', NativeTypes.FILE],
        drop(item) {
            handleDrop(item.files)
            
        },
        canDrop() {
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
            <div className=" flex  mr-4 mt-2 h-full" >
                <div className=" flex flex-col w-full h-full " >
                    {files.length > 0 ? files.map((pdf, index) => renderPDF(pdf, index)) :
                        (<div className=" flex-col flex justify-center items-center h-full opacity-50">Drag and drop files here</div>)}

                </div>
            </div>
        </div>
    )
}

export default PDFList;