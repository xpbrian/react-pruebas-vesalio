import { Box, Grid } from '@mui/material'
import axios from 'axios';
import { Markup } from 'interweave';
import React, { useEffect, useState } from 'react'


export default function PrintConsulta({ item, selected }) {

    const [datos, setDatos] = useState(null)
    const [contenido, setContenido] = useState(null)
    const [diagnostico, setDiagnostico] = useState([])
    const [cie10, setCie10] = useState([])
    const [cabecera, setCabecera] = useState(null)
    const [persona, setPersona] = useState(null)
    const [fecha, setFecha] = useState('')
    const [compania, setCompania] = useState(null)

    useEffect(() => {
        setDatos(item.datos);
        setFecha(item.fechahora);
    }, [item])
    useEffect(() => {
        console.log(selected);
        const getDatosF = async (consultaId) => {
            try {
                const financiadora = await axios.get(`http://200.121.91.211:4001/getFinanciadora/${consultaId}`)
                console.log(financiadora.data)
                setCompania(financiadora.data.length === 0 ? null : financiadora.data[0]);
            } catch (e) {
                console.log(e);
            }

        }
        setCabecera(selected)
        getDatosF(selected.Nro_DocIdenti)
    }, [selected])
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
                <Box style={{ paddingRight: "3rem", paddingLeft: "5rem", paddingTop: "3rem", paddingBottom: "2rem", fontSize: "10px" }}>
                    {
                        cabecera !== null && <Box>
                            <Grid style={{ border: "1px solid black", padding: "5px", borderBottom: "none" }} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid item xs={2}>
                                    <img style={{ width: "100px" }} src='/static/images/img/logoLogin.png' alt='Clinica Vesalio' />
                                </Grid>
                                {/* <Grid item xs={4.5}>
                                    <div>{`Nombre: ${cabecera.Des_Nombres}, ${cabecera.Des_ApePaterno}  ${cabecera.Des_ApeMaterno}`}</div>
                                    <div>{`Historia: ${cabecera.Nro_Historia}`}</div>
                                    <div>{`Fecha: ${cabecera.Nro_Historia}`}</div>
                                </Grid> */}

                                <Grid item xs={10}>
                                    <div style={{ textAlign: "right", marginTop: "-10px", fontSize: "15px" }}><b>HISTORIA CLÍNICA DE AMBULATORIA</b></div>

                                    <Box style={{ display: "flex", justifyContent: "space-between" }}>
                                        <div>{`Nombre: ${cabecera.Des_Nombres}, ${cabecera.Des_ApePaterno}  ${cabecera.Des_ApeMaterno}`}</div>
                                        <div>{`Historia: ${cabecera.Nro_Historia}`}</div>
                                    </Box>

                                    {/* <Box style={{ display: "flex", justifyContent: "space-between" }}>
                                        <div>{`Documento: ${null}`}</div>
                                        <div>{`Dirección: ${null}`}</div>
                                    </Box> */}

                                    {/* <Box style={{ display: "flex", justifyContent: "space-between" }}>
                                        <div>{`Telefono: ${null}`}</div>
                                        <div>{`Aut/Ord: ${null}`}</div>
                                    </Box> */}
                                    {
                                        fecha.length > 0 && <Box style={{ display: "flex", justifyContent: "space-between" }}>
                                            <div>{`Fecha y Hora: ${fecha.split('T')[0].split('-')[2] + '/' + fecha.split('T')[0].split('-')[1] + '' + fecha.split('T')[0].split('-')[0]} ${fecha.split('T')[1].split('Z')[0]}`}</div>
                                        </Box>

                                    }
                                    {
                                        compania !== null && <Box style={{ display: "flex", justifyContent: "space-between" }}>
                                            <div>{`Financ.: ${compania.Cod_CiaSeguro}   ${compania.Des_CiaSeguro}`}</div>
                                        </Box>
                                    }

                                    {/* <Box style={{ display: "flex", justifyContent: "space-between" }}>
                                        <div>{`Usuario: ${null}`}</div>
                                    </Box> */}
                                </Grid>
                            </Grid>
                        </Box>
                    }

                    <Box style={{ marginTop: "7px" }}>
                        <Grid style={{ border: "1px solid black", paddingBottom: "10px", borderBottom: "none" }} container rowSpacing={1} columnSpacing={{ xs: 0, sm: 2, md: 3 }}>
                            <Grid item xs={2}>
                                <div>ATENDIDO POR: </div>
                            </Grid>
                            <Grid item xs={4}>
                                {persona !== null && <div style={{ textAlign: "left" }}>{persona.apellidos.toUpperCase()}</div>}
                            </Grid>
                            <Grid item xs={2}>
                                <div>ESPECIALIDAD: </div>
                            </Grid>
                            <Grid item xs={4}>
                                {persona !== null && <div style={{ textAlign: "left" }}>{persona.nombre.toUpperCase()}</div>}
                            </Grid>
                        </Grid>
                    </Box>

                    <Box style={{ marginTop: "7px" }}>
                        <Grid style={{ border: "1px solid black", paddingBottom: "10px", borderBottom: "none" }} container rowSpacing={1} columnSpacing={{ xs: 0, sm: 2, md: 3 }}>
                            <Grid item xs={12}>
                                {contenido !== null && <div style={{ textAlign: "center" }}>{contenido.tipovezqueconsulta.toUpperCase()}</div>}
                            </Grid>
                        </Grid>
                    </Box>

                    <Box style={{ marginTop: "7px" }}>
                        <Grid style={{ border: "1px solid black", paddingBottom: "10px", borderBottom: "none" }} container rowSpacing={1} columnSpacing={{ xs: 0, sm: 2, md: 3 }}>
                            <Grid item xs={12} style={{ minHeight: "10px" }}>
                                <div>MOTIVO PRINCIPAL DE LA CONSULTA: </div>
                                {contenido !== null && <div style={{ textAlign: "left" }}> <Markup content={contenido.motivo_consulta} />  </div>}
                            </Grid>
                        </Grid>
                    </Box>

                    <Box style={{ marginTop: "7px" }}>
                        <Grid style={{ border: "1px solid black", paddingBottom: "10px", borderBottom: "none" }} container rowSpacing={1} columnSpacing={{ xs: 0, sm: 2, md: 3 }}>
                            <Grid item xs={12} style={{ minHeight: "10px" }}>
                                <div>ANTECEDENTES DE IMPORTANCIA: </div>
                                {contenido !== null && <div style={{ textAlign: "left" }}> <Markup content={contenido.antecedenteActual} />  </div>}
                            </Grid>
                        </Grid>
                    </Box>

                    <Box style={{ marginTop: "7px" }}>
                        <Grid style={{ border: "1px solid black", paddingBottom: "10px", minHeight: "10px", borderBottom: "none" }} container rowSpacing={1} columnSpacing={{ xs: 0, sm: 2, md: 3 }}>

                            <Grid item xs={12}>
                                <div style={{ border: "none" }}>TIEMPO DE EMFERMEDAD:</div>
                                {contenido !== null && <div style={{ textAlign: "left" }}> <Markup content={contenido.tiempoEvolucion} />  </div>}
                            </Grid>
                        </Grid>
                    </Box>

                    <Box style={{ marginTop: "7px" }}>
                        <Grid style={{ border: "1px solid black", paddingBottom: "10px", minHeight: "10px", borderBottom: "none" }} container rowSpacing={1} columnSpacing={{ xs: 0, sm: 2, md: 3 }}>
                            <Grid item xs={12}>
                                <div>EXAMEN FÍSICO: </div>
                                {contenido !== null && <div style={{ textAlign: "left" }}> <Markup content={contenido.examenfisico} />  </div>}

                            </Grid>
                        </Grid>
                    </Box>

                    <Box style={{ marginTop: "7px" }}>
                        <Grid style={{ border: "1px solid black", paddingBottom: "10px", minHeight: "10px", borderBottom: "none" }} container rowSpacing={1} columnSpacing={{ xs: 0, sm: 2, md: 3 }}>
                            <Grid item xs={8}>
                                <div>DIAGNÓSTICO PRESUNTIVO: </div>
                                {
                                    diagnostico.map((x, ix) => <div style={{ textAlign: "left" }} key={ix}> <Markup content={x} />  </div>)
                                }
                            </Grid>
                            <Grid item xs={4}>
                                <div style={{ border: "none" }}>CIE 10</div>
                                {
                                    cie10.map((x, ix) => <div style={{ textAlign: "left" }} key={ix}> <Markup content={x} /></div>)
                                }
                            </Grid>
                        </Grid>
                    </Box>



                    <Box style={{ marginTop: "7px" }}>
                        <Grid style={{ border: "1px solid black", paddingBottom: "0", height: "140px" }} container rowSpacing={1} columnSpacing={{ xs: 0, sm: 2, md: 3 }}>
                            <Grid item xs={2}>
                                <div>FUNC. VITALES</div>
                                <div>PA:  {contenido !== null && <> {contenido.tension_arterial_maxima}/{contenido.tension_arterial_minima}  </>}</div>
                                <div>FR:  {contenido !== null && <> {contenido.f_resp}  </>}</div>
                                <div>FC:  {contenido !== null && <> {contenido.f_card}  </>}</div>
                                <div>T°:  {contenido !== null && <> {contenido.temperatura}  </>}</div>
                                <div>PULSO: {contenido !== null && <> {contenido.pulso}  </>}</div>
                                <div>SAT O2:  {contenido !== null && <> {contenido.sato} </>}</div>
                            </Grid>

                            <Grid style={{ border: "1px solid black", paddingLeft: "5px", borderLeft: "none", borderTop: "none", borderBottom: "0", borderRight: "0" }} item xs={3}>
                                <div style={{ border: "none" }}>HORA</div>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box style={{ marginTop: "7px" }}>
                        <Grid style={{ border: "1px solid black", paddingBottom: "10px", minHeight: "10px", borderTop: "none" }} container rowSpacing={1} columnSpacing={{ xs: 0, sm: 2, md: 3 }}>
                            <Grid item xs={12}>
                                <div>EVOLUCION: </div>
                                {contenido !== null && <div style={{ textAlign: "left" }}> <Markup content={contenido.evoluciontto} />  </div>}
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </div>
        </>
    )
}
