import React from "react";
import PDFService from "../Services/PDFService";
const MergeControl = ({files}) => {

    const mergeAndShow = async () => {
        
        const pdfBytes = await PDFService.merge(files)

        const blob = new Blob([pdfBytes], {
            type: "application/pdf",
        });
        
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `merged-${+new Date()}.pdf`;
        window.open(link.href)
    }
    return(
   
        <button className="h-12 mt-8 w-1/3" onClick={mergeAndShow}>Merge PDFs</button>
)
}

export default MergeControl;