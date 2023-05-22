import { Button } from '@mui/material';
import React, { useRef } from 'react'
import ReactToPrint from 'react-to-print';
import { ComponentToPrint } from './Print';

export default function BotonImprimir({ cabecera, lista,tipo }) {
    const componentRef = useRef();
    console.log(cabecera);
    return (
        <>
            <ReactToPrint
                // onAfterPrint={() => resetCarrito()}
                trigger={() => (
                    <Button color="primary" variant="contained">
                        Imprimir
                    </Button>
                )}
                content={() => componentRef.current}
            />
            <div style={{ display: "none" }}>
                <ComponentToPrint
                    ref={componentRef}
                    cabecera={cabecera}
                    lista={lista}
                    tipo={tipo}
                />
            </div>
        </>
    )
}
