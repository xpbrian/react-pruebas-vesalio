import React, { useRef } from 'react'
import { Ticket } from './print/Ticket'
import ReactToPrint from 'react-to-print';
import { Box, Button } from '@mui/material';

export default function ContenedorTicket({list}) {

    const componentRef = useRef();

    return (
        <div>
            <Box style={{ marginTop: "0px", textAlign: "center" }}>
                <div>
                    <ReactToPrint style={{ textAlign: "right" }}
                        trigger={() => <Button style={{ fontSize: "18px", width: "180px" }} variant='contained'>Imprimir Ticket</Button>}
                        content={() => componentRef.current}
                    />
                    <div style={{ display: "none" }}>

                        <Ticket
                            // pacienteLl={pacienteLl}
                            // datosDiag={datosDiag}
                            // descrip={descrip}
                            // user={user}
                            list={list}
                            ref={componentRef} />
                    </div>
                </div>
            </Box>
        </div>
    )
}
