import { Box, Button,Divider } from "@mui/material";
import React, { useState } from "react";
import { Document, Page } from "react-pdf";

export default function SinglePage(props) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
    }

    function nextPage() {
        changePage(1);
    }

    const { pdf } = props;

    return (
        <>
            <Document
                file={pdf}
                options={{ workerSrc: "/pdf.worker.js" }}
                onLoadSuccess={(item) => onDocumentLoadSuccess(item)}
            >
                <Page width={1270} pageNumber={pageNumber} />
            </Document>
            <Box 
                sx={{p:2}}
                alignItems="center"
                justifyContent="center">
                {/* <p>
                    Pagina {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
                </p> */}
                <Button type="button" disabled={pageNumber <= 1} onClick={() => previousPage()}>
                    Anterior
                </Button>
                <Button
                    type="button"
                    disabled={pageNumber >= numPages}
                    onClick={() => nextPage()}
                >
                    Siguiente
                </Button>
            </Box>
            <Divider />
        </>
    );
}
