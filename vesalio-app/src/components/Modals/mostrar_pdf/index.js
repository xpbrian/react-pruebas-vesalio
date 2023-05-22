import { Box } from '@mui/material'
import React from 'react'
import Scrollbar from 'src/components/Scrollbar'
import PdfItem from 'src/pdf/PidfItem'

export default function Index() {
    return (
        <Box
            justifyContent={'center'}
            alignItems={'center'}
            sx={{ height: 750, width: 'auto' }}>
            <Scrollbar>
                <PdfItem
                    pdf={'127.0.0.1/vesalio/pdf/prueba2.pdf'}
                />
            </Scrollbar>
        </Box>
    )
}
