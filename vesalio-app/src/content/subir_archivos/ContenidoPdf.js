import React, { useEffect, useState } from 'react'
import PdfItem from 'src/pdf/PdfAll'

export default function ContenidoPdf({ file }) {
    const [pdf, setPdf] = useState(null)
    useEffect(() => {
        if (file !== null) {
            setPdf(file)
        }
    }, [file])
    return (
        <>{
            file !== null && <PdfItem
                pdf={pdf}
            />
        }</>
    )
}
