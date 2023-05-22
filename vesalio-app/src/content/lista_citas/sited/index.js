import { Box, Grid, IconButton, Tooltip } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import ReactToPrint from 'react-to-print'
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import SitedPrint from '../print/SitedPrint';
import axios from 'axios';


export default function Index({ list }) {
    const componentRef2 = useRef();
    const [mostrar, setMostrar] = useState(null)

    useEffect(() => {
        const getDatos = async (obj) => {
            const datos = await axios.post(`http://200.121.91.211:4001/atencionSited`, { dniMedico: obj.documento_doctor, dni: obj.documento_paciente })
            setMostrar(datos.data.length === 0 ? null : datos.data)
        }
        getDatos(list)
    }, [list])

    return (
        <Box>

            {mostrar !== null && <Grid item lg={5} sx={{ mt: 0 }}>
                <ReactToPrint
                    trigger={() => (
                        <Tooltip placement='top' title={('Sited')} arrow>
                            <IconButton
                                size="small"
                                color="secondary"
                            >
                                <MedicalInformationIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )}
                    content={() => componentRef2.current}
                />
                <div style={{ display: "none" }}>
                    <SitedPrint
                        ref={componentRef2}
                        list={list}
                    />
                </div>
            </Grid>}


        </Box>
    )
}
