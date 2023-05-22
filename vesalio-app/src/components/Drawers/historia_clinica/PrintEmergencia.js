import { Box, Grid } from '@mui/material'
import axios from 'axios';
import { Markup } from 'interweave';
import React, { useEffect, useState } from 'react'


export default function PrintConsulta({ item }) {

    const [datos, setDatos] = useState(null)
    const [contenido, setContenido] = useState(null)
    const [diagnostico, setDiagnostico] = useState([])
    const [cie10, setCie10] = useState([])
    const [persona, setPersona] = useState(null)
    useEffect(() => {
        setDatos(item.datos);
    }, [item])

    useEffect(() => {
        const getDatos = async (consultaId) => {
            try {
                const citas = await axios.get(`http://200.121.91.211:4001/consultaBasica/${consultaId}`)
                const pResponse = await axios.get(`http://200.121.91.211:4001/personaHistoriaPDFCabecera/${consultaId}`)

                setPersona(pResponse.data.length === 0 ? null : pResponse.data[0])

                let tmpDiagnostico = [];
                let tmpCIE10 = [];
                if (citas.data.diagnostico.length > 0) {
                    citas.data.diagnostico.map(x => {
                        console.log(x);
                        tmpCIE10.push(x.nombreLista.split('-')[1].trim())
                        tmpDiagnostico.push(x.nombreLista.split('-')[0].trim())
                        return false
                    })
                    setDiagnostico(tmpDiagnostico)
                    setCie10(tmpCIE10)
                }
                setContenido(citas.data.datos.length === 0 ? null : citas.data.datos[0]);
            } catch (e) {
                console.log(e);
            }

        }
        if (datos !== null) {
            getDatos(datos)
        }

    }, [datos])

    return (
        <>
            <div style={{ pageBreakBefore: "always" }}>
                <Box className="pag1" style={{ paddingRight: "3rem", paddingLeft: "5rem", paddingTop: "3rem", paddingBottom: "5rem !important", fontSize: "10px", pageBreakInside: "avoid", marginBottom: "80px" }}>

                    <Box>
                        <Grid style={{ border: "1px solid black", padding: "5px", borderBottom: "none" }} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={6}>
                                <img style={{ width: "100px" }} src='/static/images/img/logoLogin.png' alt='Clinica Vesalio' />
                            </Grid>
                            <Grid item xs={6}>
                                <div style={{ textAlign: "right", marginTop: "-10px", fontSize: "15px" }}><b>HISTORIA CLÍNICA DE EMERGENCIA</b></div>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box style={{ marginTop: "7px" }}>
                        <Grid style={{ border: "1px solid black", paddingBottom: "10px", borderBottom: "none" }} container rowSpacing={1} columnSpacing={{ xs: 0, sm: 2, md: 3 }}>
                            <Grid item xs={2}>
                                <div>ATENDIDO POR: </div>
                            </Grid>
                            <Grid item xs={1}>
                                <div style={{ color: "white", border: "none" }}>df</div>
                            </Grid>
                            <Grid item xs={3}>
                                <div style={{ backgroundColor: "white", textAlign: "left", border: "none" }}>MÉDICO DE EMERGENCIA: </div>
                            </Grid>
                            <Grid item xs={0.5}>
                                <div style={{ textAlign: "left", border: "none", marginLeft: "-20px" }}>⬜</div>
                            </Grid>
                            <Grid item xs={2.5}>
                                <div style={{ backgroundColor: "white", textAlign: "right", border: "none" }}>ESPECIALISTA: </div>
                            </Grid>
                            <Grid item xs={1}>
                                <div style={{ textAlign: "left", border: "none", marginLeft: "-20px" }}>⬜</div>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box style={{ marginTop: "7px" }}>
                        <Grid style={{ border: "1px solid black", paddingBottom: "10px", borderBottom: "none" }} container rowSpacing={1} columnSpacing={{ xs: 0, sm: 2, md: 3 }}>
                            <Grid item xs={12}>
                                <div style={{ textAlign: "center" }}>TIPO DE EMERGENCIA</div>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box style={{ marginTop: "7px" }}>
                        <Grid style={{ border: "1px solid black", paddingBottom: "10px", borderBottom: "none" }} container rowSpacing={1} columnSpacing={{ xs: 0, sm: 2, md: 3 }}>
                            <Grid item xs={12} style={{ minHeight: "80px" }}>
                                <div>MOTIVO PRINCIPAL DE LA CONSULTA: </div>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box style={{ marginTop: "7px" }}>
                        <Grid style={{ border: "1px solid black", paddingBottom: "10px", borderBottom: "none" }} container rowSpacing={1} columnSpacing={{ xs: 0, sm: 2, md: 3 }}>
                            <Grid item xs={12} style={{ minHeight: "80px" }}>
                                <div>ANTECEDENTES DE IMPORTANCIA: </div>
                                <div>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                                </div>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box style={{ marginTop: "7px" }}>
                        <Grid style={{ border: "1px solid black", paddingBottom: "10px", minHeight: "180px", borderBottom: "none" }} container rowSpacing={1} columnSpacing={{ xs: 0, sm: 2, md: 3 }}>
                            <Grid item xs={4}>
                                <div>ANAMNESIS: </div>
                            </Grid>
                            <Grid item xs={8}>
                                <div style={{ border: "none" }}>TIEMPO DE EMFERMEDAD:</div>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box style={{ marginTop: "7px" }}>
                        <Grid style={{ border: "1px solid black", paddingBottom: "10px", minHeight: "130px", borderBottom: "none" }} container rowSpacing={1} columnSpacing={{ xs: 0, sm: 2, md: 3 }}>
                            <Grid item xs={4}>
                                <div>EXAMEN FÍSICO: </div>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box style={{ marginTop: "7px" }}>
                        <Grid style={{ border: "1px solid black", paddingBottom: "10px", minHeight: "130px", borderBottom: "none" }} container rowSpacing={1} columnSpacing={{ xs: 0, sm: 2, md: 3 }}>
                            <Grid item xs={8}>
                                <div>DIAGNÓSTICO PRESUNTIVO: </div>
                            </Grid>
                            <Grid item xs={4}>
                                <div style={{ border: "none" }}>CIE 10</div>
                            </Grid>
                        </Grid>
                    </Box>


                    <Box style={{ marginTop: "7px" }}>
                        <Grid style={{ border: "1px solid black", paddingBottom: "10px", borderBottom: "none" }} container rowSpacing={1} columnSpacing={{ xs: 0, sm: 2, md: 3 }}>
                            <Grid item xs={12}>
                                <div style={{ textAlign: "center" }}>PLAN DE TRABAJO</div>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box style={{ marginTop: "7px" }}>
                        <Grid style={{ border: "1px solid black", paddingBottom: "0", minHeight: "100px", borderBottom: "none" }} container rowSpacing={1} columnSpacing={{ xs: 0, sm: 2, md: 3 }}>
                            <Grid item xs={6}>
                                <div>INDICACIONES MÉDICAS: </div>
                            </Grid>
                            <Grid style={{ border: "1px solid black", paddingLeft: "5px", borderTop: "none", borderBottom: "0" }} item xs={3}>
                                <div style={{ border: "none" }}>LABORATORIO</div>
                            </Grid>
                            <Grid style={{ border: "1px solid black", paddingLeft: "5px", borderLeft: "none", borderTop: "none", borderBottom: "0", borderRight: "0" }} item xs={3}>
                                <div style={{ border: "none" }}>IMAGENOLOGIA</div>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box style={{ marginTop: "7px" }}>
                        <Grid style={{ border: "1px solid black", paddingBottom: "0", minHeight: "140px" }} container rowSpacing={1} columnSpacing={{ xs: 0, sm: 2, md: 3 }}>
                            <Grid item xs={2}>
                                <div>FUNC. VITALES</div>
                                <div>PA: ____________</div>
                                <div>FR: ____________</div>
                                <div>FC: ____________</div>
                                <div>T°: ____________</div>
                                <div>PULSO: _______</div>
                                <div>SAT 02: _______</div>
                            </Grid>
                            <Grid style={{ border: "1px solid black", paddingLeft: "5px", borderTop: "none", borderBottom: "0" }} item xs={7}>
                                <div style={{ border: "none", color: "white" }}>LABORATORIO</div>
                            </Grid>
                            <Grid style={{ border: "1px solid black", paddingLeft: "5px", borderLeft: "none", borderTop: "none", borderBottom: "0", borderRight: "0" }} item xs={3}>
                                <div style={{ border: "none" }}>HORA</div>
                            </Grid>
                        </Grid>
                    </Box>



                    <Box style={{ marginTop: "7px" }}>
                        <Grid style={{ border: "1px solid black", paddingBottom: "10px", minHeight: "140px", borderTop: "none" }} container rowSpacing={1} columnSpacing={{ xs: 0, sm: 2, md: 3 }}>
                            <Grid item xs={12}>
                                <div style={{ textAlign: "left" }}>INDICACIONES DE ALTA</div>
                            </Grid>
                        </Grid>
                    </Box>


                    <Box style={{ marginTop: "7px" }}>
                        <Grid style={{ border: "1px solid black", borderTop: "none", minHeight: "40px" }} container rowSpacing={1} columnSpacing={{ xs: 0, sm: 2, md: 3 }}>
                            <Grid item xs={12}>
                                <div style={{ textAlign: "left" }}>OBSERVACIONES</div>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box style={{ marginTop: "7px" }}>
                        <Grid style={{ border: "1px solid black", borderTop: "none", minHeight: "40px" }} container rowSpacing={1} columnSpacing={{ xs: 0, sm: 2, md: 3 }}>
                            <Grid item xs={3}>
                                <div style={{ textAlign: "left", fontSize: "17px" }}><b>REFERENCIA:</b></div>
                            </Grid>
                            <Grid item xs={9}>
                                <div style={{ textAlign: "left" }}>AUTORIZADO POR:</div>
                                <div style={{ textAlign: "left" }}>COORDINADO CON:</div>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box style={{ marginTop: "7px" }}>
                        <Grid style={{ border: "1px solid black", borderTop: "none", minHeight: "40px", padding: "10px" }} container rowSpacing={1} columnSpacing={{ xs: 0, sm: 2, md: 3 }}>
                            <Grid item xs={3}>
                                <div style={{ textAlign: "left", fontSize: "17px", color: "white" }}>.</div>
                            </Grid>
                            <Grid item xs={6}>
                                <div style={{ textAlign: "left" }}>A: ESSALUD:</div>
                                <div style={{ textAlign: "left" }}>MINSA:</div>
                                <div style={{ textAlign: "left" }}>CLÍNICA:</div>
                                <div style={{ textAlign: "left" }}>OTROS:</div>
                            </Grid>
                            <Grid item xs={3}>
                                <div style={{ textAlign: "left", color: "white" }}>AUTORIZADO POR:</div>
                            </Grid>
                        </Grid>
                    </Box>


                </Box>
            </div>
        </>
    )
}
