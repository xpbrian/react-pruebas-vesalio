import { Box, Grid } from "@mui/material";
import { Markup } from "interweave";
import React, { useEffect } from "react";
import useLayoutContext from "src/hooks/useAuthLayout";


export const ComponentToPrint = React.forwardRef((props, ref) => {
    const { drawerOpen } = useLayoutContext()
    useEffect(() => {
        console.log(props)
    }, [props])
    return (
        <div ref={ref}>
            <Box container style={{ paddingRight: "2rem", paddingLeft: "3rem", paddingTop: "3rem", paddingBottom: "3rem", fontSize: "11px" }}>
                <Box>
                    <Grid style={{ border: "1px solid black" }} container rowSpacing={1} columnSpacing={{ xs: 0 }}>

                        <Grid style={{ padding: "0px", border: "1px solid black", textAlign: "center" }} item xs={3}>
                            <img style={{ width: "100px", marginTop: "10px" }} src="/static/images/img/logoLogin.png" alt="Imgen clinica vesalio" />
                        </Grid>

                        <Grid style={{ padding: "0px", border: "1px solid black" }} item xs={5}>
                            <div style={{ textAlign: "center", marginTop: "25px" }}><b>FORMATO DE INTERCONSULTA</b></div>
                        </Grid>

                        <Grid style={{ padding: "0px", border: "1px solid black" }} item xs={4}>
                            <Box style={{ marginTop: "10px" }}>
                                <Grid style={{}} container rowSpacing={1} columnSpacing={{ xs: 0 }}>
                                    <Grid style={{ padding: "0.5rem", border: "1px solid black" }} item xs={6}>
                                        <div>Código:</div>
                                    </Grid>
                                    <Grid style={{ padding: "0.5rem", border: "1px solid black" }} item xs={6}>
                                        <div style={{ fontSize: "13px" }}>FO - DMED - 10</div>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box style={{ marginTop: "10px" }}>
                                <Grid style={{}} container rowSpacing={1} columnSpacing={{ xs: 0 }}>
                                    <Grid style={{ padding: "0.5rem", border: "1px solid black" }} item xs={6}>
                                        <div>Versión:</div>
                                    </Grid>
                                    <Grid style={{ padding: "0.5rem", border: "1px solid black" }} item xs={6}>
                                        <div style={{ textAlign: "center" }}>02</div>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>

                    </Grid>
                </Box>

                <Box style={{ marginTop: "5px" }}>
                    <Grid style={{}} container columnGap={0} columnSpacing={{ xs: 0 }}>
                        <Grid style={{ padding: "1px", backgroundColor: "#ddd" }} item xs={12}>
                            <div style={{ textAlign: "left" }}>1. SOLICITUD DE LA INTERCONSULTA</div>
                        </Grid>
                    </Grid>
                </Box>

                <Box style={{ marginTop: "5px" }}>
                    <Grid style={{}} container columnGap={0} columnSpacing={{ xs: 0, sm: 0 }}>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={3.5}>
                            <div style={{ textAlign: "left" }}>Fecha:</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={4.5}>
                            <div style={{ textAlign: "left" }}>{props.lista.fecha_}</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={1.5}>
                            <div style={{ textAlign: "left" }}>Hora:</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={2.5}>
                            <div style={{ textAlign: "left" }}>{props.lista.hora_}</div>
                        </Grid>
                    </Grid>
                </Box>

                <Box style={{ marginTop: "5px" }}>
                    <Grid style={{}} container columnGap={0} columnSpacing={{ xs: 0, sm: 0 }}>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={3.5}>
                            <div style={{ textAlign: "left" }}>Nombres y Ap. del Paciente:</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={8.5}>
                            <div style={{ textAlign: "left" }}>{`${props.cabecera.Des_ApePaterno + ' ' + props.cabecera.Des_ApeMaterno + ' ' + props.cabecera.Des_Nombres}`}</div>
                        </Grid>
                    </Grid>
                </Box>

                <Box style={{ marginTop: "5px" }}>
                    <Grid style={{}} container columnGap={0} columnSpacing={{ xs: 0, sm: 0 }}>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={1.75}>
                            <div style={{ textAlign: "left" }}>Edad:</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={1.75}>
                            <div style={{ textAlign: "left" }}>{new Date().getFullYear() - parseInt(props.cabecera.Fec_Nacimien.split('T')[0].split('-')[0])}</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={1}>
                            <div style={{ textAlign: "left" }}>Sexo:</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={0.75}>
                            <div style={{ textAlign: "center", background: props.cabecera.Des_Sexo === 'M' ? 'yellow' : '' }}>M</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={0.75}>
                            <div style={{ textAlign: "center", background: props.cabecera.Des_Sexo === 'F' ? 'yellow' : '' }}>F</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={1.5}>
                            <div style={{ textAlign: "left" }}>N° de H.C.:</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={1.5}>
                            <div style={{ textAlign: "left" }}>{`${props.cabecera.Nro_Historia}`}</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={1.5}>
                            <div style={{ textAlign: "left" }}>N° de Cama:</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={1.5}>
                            <div style={{ textAlign: "left" }}>{drawerOpen.item.boton.cama_id}</div>
                        </Grid>
                    </Grid>
                </Box>

                <Box style={{ marginTop: "5px" }}>
                    <Grid style={{}} container columnGap={0} columnSpacing={{ xs: 0, sm: 0 }}>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={3.5}>
                            <div style={{ textAlign: "left" }}>Médico Solicitante:</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={8.5}>
                            <div style={{ textAlign: "left" }}>{props.lista.solicitante}</div>
                        </Grid>
                    </Grid>
                </Box>

                <Box style={{ marginTop: "5px" }}>
                    <Grid style={{}} container columnGap={0} columnSpacing={{ xs: 0, sm: 0 }}>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={3.5}>
                            <div style={{ textAlign: "left" }}>Médico Interconsulta:</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={8.5}>
                            <div style={{ textAlign: "left" }}>{props.lista.solicitado}</div>
                        </Grid>
                    </Grid>
                </Box>

                <Box style={{ marginTop: "5px" }}>
                    <Grid style={{}} container columnGap={0} columnSpacing={{ xs: 0, sm: 0 }}>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={3.5}>
                            <div style={{ textAlign: "left" }}>Motivo de Interconsulta:</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={8.5}>
                            <div style={{ textAlign: "left" }}>{props.lista.tipoInterconsulta}</div>
                        </Grid>
                    </Grid>
                </Box>

                <Box style={{ marginTop: "5px" }}>
                    <Grid style={{}} container columnGap={0} columnSpacing={{ xs: 0 }}>
                        <Grid style={{ padding: "1px", backgroundColor: "#ddd" }} item xs={12}>
                            <div style={{ textAlign: "left" }}>Breve resumen de la enfermedad actual:</div>
                        </Grid>
                    </Grid>
                </Box>
                <Box style={{ marginTop: "0px" }}>
                    <Grid style={{}} container columnGap={0} columnSpacing={{ xs: 0 }}>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={12}>
                            <div style={{ textAlign: "left", minHeight: "30px" }}><Markup content={props.lista.descripcionSolicitud} /></div>
                        </Grid>
                    </Grid>
                </Box>

                {/* <Box style={{ marginTop: "5px" }}>
                    <Grid style={{}} container columnGap={0} columnSpacing={{ xs: 0 }}>
                        <Grid style={{ padding: "1px", backgroundColor: "#ddd" }} item xs={12}>
                            <div style={{ textAlign: "left" }}>Diagnóstico Presuntivo:</div>
                        </Grid>
                    </Grid>
                </Box>
                <Box style={{ marginTop: "5px" }}>
                    <Grid style={{}} container columnGap={0} columnSpacing={{ xs: 0 }}>
                        <Grid style={{ padding: "5px", border: "none" }} item xs={8}>
                            <div style={{ textAlign: "left", color: "white" }}>Aquino va nada es espacio en blanco OJO</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={4}>
                            <div style={{ textAlign: "center" }}>Código CIE 10</div>
                        </Grid>
                    </Grid>
                </Box>
                <Box style={{ marginTop: "0px" }}>
                    <Grid style={{}} container columnGap={0} columnSpacing={{ xs: 0 }}>
                        <Grid style={{ padding: "5px", borderBottom: "1px solid black", marginRight: "5.5px" }} item xs={7.9}>
                            <div style={{ textAlign: "left" }}>Lorem</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={4 / 5}>
                            <div style={{ textAlign: "left" }}>Lorem</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={4 / 5}>
                            <div style={{ textAlign: "left" }}>Lorem</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={4 / 5}>
                            <div style={{ textAlign: "left" }}>Lorem</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={4 / 5}>
                            <div style={{ textAlign: "left" }}>Lorem</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={4 / 5}>
                            <div style={{ textAlign: "left" }}>Lorem</div>
                        </Grid>
                    </Grid>
                </Box>
                <Box style={{ marginTop: "0px" }}>
                    <Grid style={{}} container columnGap={0} columnSpacing={{ xs: 0 }}>
                        <Grid style={{ padding: "5px", borderBottom: "1px solid black", marginRight: "5.5px" }} item xs={7.9}>
                            <div style={{ textAlign: "left" }}>Lorem</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={4 / 5}>
                            <div style={{ textAlign: "left" }}>Lorem</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={4 / 5}>
                            <div style={{ textAlign: "left" }}>Lorem</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={4 / 5}>
                            <div style={{ textAlign: "left" }}>Lorem</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={4 / 5}>
                            <div style={{ textAlign: "left" }}>Lorem</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={4 / 5}>
                            <div style={{ textAlign: "left" }}>Lorem</div>
                        </Grid>
                    </Grid>
                </Box> */}

                <Box style={{ marginTop: "40px" }}>
                    <Grid style={{}} container columnGap={0} columnSpacing={{ xs: 0, sm: 0 }}>
                        <Grid style={{ padding: "5px", border: "none" }} item xs={4}>
                            <div style={{ textAlign: "center", color: "white" }}>Aquino va nada es espacio en blanco OJO</div>
                        </Grid>
                        <Grid style={{ padding: "5px", borderTop: "1px solid black" }} item xs={4}>
                            <div style={{ textAlign: "center" }}>FIRMA Y SELLO DEL MÉDICO SOLICITANTE:</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "none" }} item xs={4}>
                            <div style={{ textAlign: "center", color: "white" }}>Aquino va nada es espacio en blanco OJO</div>
                        </Grid>
                    </Grid>
                </Box>

                <Box style={{ marginTop: "5px" }}>
                    <Grid style={{}} container columnGap={0} columnSpacing={{ xs: 0 }}>
                        <Grid style={{ padding: "1px", backgroundColor: "#ddd" }} item xs={12}>
                            <div style={{ textAlign: "left" }}>2. RESPUESTA DE LA INTERCONSULTA</div>
                        </Grid>
                    </Grid>
                </Box>

                <Box style={{ marginTop: "5px" }}>
                    <Grid style={{}} container columnGap={0} columnSpacing={{ xs: 0, sm: 0 }}>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={3.5}>
                            <div style={{ textAlign: "left" }}>Fecha:</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={4.5}>
                            <div style={{ textAlign: "left" }}>{props.lista.fecha_rpta}</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={1.5}>
                            <div style={{ textAlign: "left" }}>Hora:</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={2.5}>
                            <div style={{ textAlign: "left" }}>{props.lista.hora_rpta}</div>
                        </Grid>
                    </Grid>
                </Box>

                <Box style={{ marginTop: "5px" }}>
                    <Grid style={{}} container columnGap={0} columnSpacing={{ xs: 0 }}>
                        <Grid style={{ padding: "1px", backgroundColor: "#ddd" }} item xs={12}>
                            <div style={{ textAlign: "left" }}>Descripción de los Hallazgos:</div>
                        </Grid>
                    </Grid>
                </Box>
               <Box style={{ marginTop: "0px" }}>
                    <Grid style={{}} container columnGap={0} columnSpacing={{ xs: 0 }}>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={12}>
                            <div style={{ textAlign: "left", minHeight: "30px" }}><Markup content={props.lista.comentario} /></div>
                        </Grid>
                    </Grid>
                </Box>
                {/* 
                <Box style={{ marginTop: "5px" }}>
                    <Grid style={{}} container columnGap={0} columnSpacing={{ xs: 0 }}>
                        <Grid style={{ padding: "1px", backgroundColor: "#ddd" }} item xs={12}>
                            <div style={{ textAlign: "left" }}>Examenes y/o Precedimientos Realizados:</div>
                        </Grid>
                    </Grid>
                </Box>
                <Box style={{ marginTop: "0px" }}>
                    <Grid style={{}} container columnGap={0} columnSpacing={{ xs: 0 }}>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={12}>
                            <div style={{ textAlign: "left", minHeight: "30px" }}>Lorem</div>
                        </Grid>
                    </Grid>
                </Box>

                <Box style={{ marginTop: "5px" }}>
                    <Grid style={{}} container columnGap={0} columnSpacing={{ xs: 0 }}>
                        <Grid style={{ padding: "1px", backgroundColor: "#ddd" }} item xs={12}>
                            <div style={{ textAlign: "left" }}>Diagnósticos:</div>
                        </Grid>
                    </Grid>
                </Box>
                <Box style={{ marginTop: "5px" }}>
                    <Grid style={{}} container columnGap={0} columnSpacing={{ xs: 0 }}>
                        <Grid style={{ padding: "5px", border: "none" }} item xs={8}>
                            <div style={{ textAlign: "left", color: "white" }}>Aquino va nada es espacio en blanco OJO</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={4}>
                            <div style={{ textAlign: "center" }}>Código CIE 10</div>
                        </Grid>
                    </Grid>
                </Box>
                <Box style={{ marginTop: "0px" }}>
                    <Grid style={{}} container columnGap={0} columnSpacing={{ xs: 0 }}>
                        <Grid style={{ padding: "5px", borderBottom: "1px solid black", marginRight: "5.5px" }} item xs={7.9}>
                            <div style={{ textAlign: "left" }}>Lorem</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={4 / 5}>
                            <div style={{ textAlign: "left" }}>Lorem</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={4 / 5}>
                            <div style={{ textAlign: "left" }}>Lorem</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={4 / 5}>
                            <div style={{ textAlign: "left" }}>Lorem</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={4 / 5}>
                            <div style={{ textAlign: "left" }}>Lorem</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={4 / 5}>
                            <div style={{ textAlign: "left" }}>Lorem</div>
                        </Grid>
                    </Grid>
                </Box>
                <Box style={{ marginTop: "0px" }}>
                    <Grid style={{}} container columnGap={0} columnSpacing={{ xs: 0 }}>
                        <Grid style={{ padding: "5px", borderBottom: "1px solid black", marginRight: "5.5px" }} item xs={7.9}>
                            <div style={{ textAlign: "left" }}>Lorem</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={4 / 5}>
                            <div style={{ textAlign: "left" }}>Lorem</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={4 / 5}>
                            <div style={{ textAlign: "left" }}>Lorem</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={4 / 5}>
                            <div style={{ textAlign: "left" }}>Lorem</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={4 / 5}>
                            <div style={{ textAlign: "left" }}>Lorem</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={4 / 5}>
                            <div style={{ textAlign: "left" }}>Lorem</div>
                        </Grid>
                    </Grid>
                </Box>

                <Box style={{ marginTop: "5px" }}>
                    <Grid style={{}} container columnGap={0} columnSpacing={{ xs: 0 }}>
                        <Grid style={{ padding: "1px", backgroundColor: "#ddd" }} item xs={12}>
                            <div style={{ textAlign: "left" }}>Descripción de los Hallazgos:</div>
                        </Grid>
                    </Grid>
                </Box>
                <Box style={{ marginTop: "0px" }}>
                    <Grid style={{}} container columnGap={0} columnSpacing={{ xs: 0 }}>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={12}>
                            <div style={{ textAlign: "left", minHeight: "30px" }}>Lorem</div>
                        </Grid>
                    </Grid>
                </Box> */}

                <Box style={{ marginTop: "50px" }}>
                    <Grid style={{}} container columnGap={0} columnSpacing={{ xs: 0, sm: 0 }}>
                        <Grid style={{ padding: "5px", border: "none" }} item xs={4}>
                            <div style={{ textAlign: "center", color: "white" }}>Aquino va nada es espacio en blanco OJO</div>
                        </Grid>
                        <Grid style={{ padding: "5px", borderTop: "1px solid black" }} item xs={4}>
                            <div style={{ textAlign: "center" }}>FIRMA Y SELLO DEL MÉDICO INTERCONSULTADO:</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "none" }} item xs={4}>
                            <div style={{ textAlign: "center", color: "white" }}>Aquino va nada es espacio en blanco OJO</div>
                        </Grid>
                    </Grid>
                </Box>

            </Box>
        </div>
    );
});
