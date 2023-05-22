import { Box, Grid } from "@mui/material";
import { Markup } from "interweave";
import React, { useEffect, useState } from "react";
import useLayoutContext from "src/hooks/useAuthLayout";




export const ComponentToPrint = React.forwardRef((props, ref) => {
    const [cabecera, setCabecera] = useState(null)
    const { drawerOpen } = useLayoutContext()
    useEffect(() => {
        setCabecera(props.cabecera);
    }, [props])

    return (
        <div ref={ref}>
            <Box style={{ padding: "3rem", fontSize: "12px" }}>
                <Box style={{ marginTop: "10px" }}>
                    <Grid style={{ border: "1px solid black" }} container rowSpacing={1} columnSpacing={{ xs: 0 }}>

                        <Grid style={{ padding: "5px", border: "1px solid black", textAlign: "center" }} item xs={3}>
                            <img style={{ width: "100px" }} src="/static/images/img/logoLogin.png" alt="Imgen clinica vesalio" />
                        </Grid>

                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={5}>
                            <div style={{ textAlign: "center", marginTop: "15px" }}><b>{props.tipo}</b></div>
                        </Grid>

                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={4}>
                            <Box style={{ marginTop: "10px" }}>
                                <Grid style={{}} container rowSpacing={1} columnSpacing={{ xs: 0 }}>
                                    <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={6}>
                                        <div>Código:</div>
                                    </Grid>
                                    <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={6}>
                                        <div style={{ fontSize: "12px" }}>FO - DMED - {props.tipo === 'HOJA DE EVOLUCION' && '03'} </div>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box style={{ marginTop: "10px" }}>
                                <Grid style={{}} container rowSpacing={1} columnSpacing={{ xs: 0 }}>
                                    <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={6}>
                                        <div>Versión:</div>
                                    </Grid>
                                    <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={6}>
                                        <div style={{ textAlign: "center" }}>02</div>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>

                    </Grid>
                </Box>

                <Box style={{ marginTop: "15px" }}>
                    <Grid style={{}} container columnGap={0} columnSpacing={{ xs: 0 }}>
                        <Grid style={{ padding: "5px", border: "1px solid black", backgroundColor: "#fff" }} item xs={5}>
                            <div style={{ textAlign: "left" }}>Nombres y Apellidos del paciente:</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={7}>
                            <div style={{ textAlign: "left" }}>
                                {cabecera !== null && `${cabecera.Des_ApePaterno + ' ' + cabecera.Des_ApeMaterno + ' ' + cabecera.Des_Nombres}`}
                            </div>
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    <Grid style={{}} container columnGap={0} columnSpacing={{ xs: 0 }}>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={1.5}>
                            <div style={{ textAlign: "left", marginTop: "10px" }}>N° de H.C.:</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={1.5}>
                            <div style={{ textAlign: "left", marginTop: "10px" }}>{cabecera !== null && `${cabecera.Nro_Historia}`}</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={1.5}>
                            <div style={{ textAlign: "left", marginTop: "10px" }}>N° de Cama:</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={1.5}>
                            <div style={{ textAlign: "left", marginTop: "10px" }}>{drawerOpen.item.boton.cama_id}</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={1.5}>
                            <div style={{ textAlign: "left", marginTop: "10px" }}>Edad:</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={1.5}>
                            <div style={{ textAlign: "left", marginTop: "10px" }}>{new Date().getFullYear() - parseInt(props.cabecera.Fec_Nacimien.split('T')[0].split('-')[0])}</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={1.5}>
                            <div style={{ textAlign: "left", marginTop: "10px" }}>Sexo:</div>
                        </Grid>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={1.5}>
                            <div style={{ textAlign: "center", border: "1px solid black", background: props.cabecera.Des_Sexo === 'M' ? 'yellow' : '' }}>M</div>
                            <div style={{ textAlign: "center", border: "1px solid black", background: props.cabecera.Des_Sexo === 'F' ? 'yellow' : '' }}>F</div>
                        </Grid>
                    </Grid>
                </Box>


                <Box style={{ marginTop: "15px" }}>
                    <Grid style={{}} container columnGap={0} columnSpacing={{ xs: 0 }}>
                        <Grid style={{ padding: "5px", border: "1px solid black", backgroundColor: "#fff" }} item xs={4}>
                            <div style={{ textAlign: "left", paddingBottom: "20px" }}>Datos a Registrar:</div>
                            {
                                props.tipo === 'HOJA DE EVOLUCION' && <>  <div style={{ textAlign: "left" }}>1. Fecha y Hora</div>
                                    <div style={{ textAlign: "left" }}>2. Apreciación Subjetiva</div>
                                    <div style={{ textAlign: "left" }}>3. Apreciación Objetiva</div>
                                    <div style={{ textAlign: "left" }}>4. Verificación del tratamiento y dieta</div>
                                    <div style={{ textAlign: "left" }}>5. Interpretación de exámenes y comentario</div>
                                    <div style={{ textAlign: "left" }}>6. Terapéutica y Plan de Trabajo</div>
                                    <div style={{ textAlign: "left" }}>7. Firma, sello y colegiatura del médico que brinda la atención</div></>
                            }

                        </Grid>
                        <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={8}>
                            <div style={{ textAlign: "left" }}><i>Fecha y Hora: {props.lista.fechahora}</i>
                                <br />

                                <Markup content={props.lista.descripcion} />

                            </div>
                        </Grid>
                    </Grid>
                </Box>


            </Box>
        </div>
    );
});
