import React, { useEffect, useRef, useState } from 'react'
import { Ticket } from './print/Ticket'
import ReactToPrint from 'react-to-print';
import {  IconButton } from '@mui/material';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';

export default function ContenedorTicket({ list: recivido }) {
    const [list, setList] = useState(null)
    const componentRef = useRef();
    useEffect(() => {

        setList(recivido);

    }, [recivido])
    return (
            <>
                {
                    list !== null && <div>
                        <ReactToPrint 
                            trigger={() => <IconButton
                                size="small"
                                color="secondary"
                            >
                                <LocalPrintshopIcon fontSize="small" />
                            </IconButton>}
                            content={() => componentRef.current}
                        />
                        <div style={{ display: "none" }}>
                            <Ticket
                                list={list}
                                ref={componentRef} />
                        </div>
                    </div>
                }

            </>
    )
}
