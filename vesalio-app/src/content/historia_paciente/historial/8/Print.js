import { Box, Grid } from '@mui/material'
import { Markup } from 'interweave'
import React, { useEffect } from 'react'

const Print = React.forwardRef((props, ref) => {


    // const [descripcion] = useState(null)



    useEffect(() => {
        // setDescripcion(contenido[0] !== undefined || contenido !== null ? contenido[0].informacion_adicional : null)
        // console.log(descripcion)
        console.log(props.contenido)
    }, [props])

    return (
        <div ref={ref}>

            {
                props.contenido !== null &&

                <Box style={{ padding: "3rem", fontSize: "12px" }}>
                    <Box style={{ marginTop: "10px" }}>
                        <Grid style={{ border: "1px solid black" }} container rowSpacing={1} columnSpacing={{ xs: 0 }}>

                            <Grid style={{ padding: "5px", border: "1px solid black", textAlign: "center" }} item xs={3}>
                                <img style={{ width: "100px" }} src="/static/images/img/logoLogin.png" alt="Imgen clinica vesalio" />
                            </Grid>

                            <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={5}>
                                <div style={{ textAlign: "center", marginTop: "15px" }}><b>NOTAS EVOLUCIÓN ENFERMERÍA</b></div>
                            </Grid>

                            <Grid style={{ padding: "0px", border: "1px solid black" }} item xs={4}>
                                <Grid container rowSpacing={0} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
                                    <Grid item xs={6}>
                                        <div style={{ border: "1px solid black", padding: "0.7em" }}>Código:</div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <div style={{ border: "1px solid black", padding: "0.7em", textAlign: "center" }}>FO-DMD-05</div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <div style={{ border: "1px solid black", padding: "0.7em" }}>Versión:</div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <div style={{ border: "1px solid black", padding: "0.7em", textAlign: "center" }}>02</div>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Box>

                    <Box style={{ marginTop: "15px" }}>
                        <Grid style={{}} container columnGap={0} columnSpacing={{ xs: 0 }}>
                            <Grid style={{ padding: "5px", border: "1px solid black", backgroundColor: "#fff" }} item xs={5}>
                                <div style={{ textAlign: "left" }}>Nombres y Apellidos del paciente:</div>
                            </Grid>
                            <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={7}>
                                <div style={{ textAlign: "left" }}>lorem</div>
                            </Grid>
                        </Grid>
                    </Box>


                    <Box style={{ marginTop: "15px" }}>
                        <Grid style={{}} container columnGap={0} columnSpacing={{ xs: 0 }}>
                            <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={1.5}>
                                <div style={{ textAlign: "left", marginTop: "5px" }}>N° de H.C.:</div>
                            </Grid>
                            <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={1.5}>
                                <div style={{ textAlign: "left", marginTop: "5px" }}>lorem</div>
                            </Grid>
                            <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={1.5}>
                                <div style={{ textAlign: "left", marginTop: "5px" }}>N° de Cama:</div>
                            </Grid>
                            <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={1.5}>
                                <div style={{ textAlign: "left", marginTop: "5px" }}>Lorem</div>
                            </Grid>
                            <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={1.5}>
                                <div style={{ textAlign: "left", marginTop: "5px" }}>Edad:</div>
                            </Grid>
                            <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={1.5}>
                                <div style={{ textAlign: "left", marginTop: "5px" }}>lorem</div>
                            </Grid>
                            <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={1.5}>
                                <div style={{ textAlign: "left", marginTop: "5px" }}>Sexo:</div>
                            </Grid>
                            <Grid style={{ padding: "0px", border: "1px solid black" }} item xs={1.5}>
                                <Grid container rowSpacing={0} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
                                    <Grid item xs={12}>
                                        <div style={{ border: "1px solid black", padding: "0.05em", textAlign: "center" }}>M</div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div style={{ border: "1px solid black", padding: "0.05em", textAlign: "center" }}>F</div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>


                    <Box style={{ marginTop: "15px" }}>
                        <Grid style={{}} container columnGap={0} columnSpacing={{ xs: 0 }}>
                            <Grid style={{ padding: "5px", border: "1px solid black", backgroundColor: "#fff" }} item xs={4}>
                                <div style={{ textAlign: "left", paddingBottom: "20px" }}>Datos a Registrar:</div>
                                <div style={{ textAlign: "left" }}>1. Fecha y Hora</div>
                                <div style={{ textAlign: "left" }}>2. Estado General</div>
                                <div style={{ textAlign: "left" }}>3. Funciones Vitales (P.A. / FC / FR / T° / SAT O2)</div>
                                <div style={{ textAlign: "left" }}>4. Funciones Biológicas (Apetico, Sed, Sueño, Orina, Desposiciones, Var. Ponderal)</div>
                                <div style={{ textAlign: "left" }}>5. Signos y síntomas significativos.</div>
                                <div style={{ textAlign: "left" }}>6. Tratamiento aplicado.</div>
                                <div style={{ textAlign: "left" }}>7. Firma, sello y número de colegiatura de la enfermera de turno.</div>
                            </Grid>
                            <Grid style={{ padding: "5px", border: "1px solid black" }} item xs={8}>
                                <div style={{ textAlign: "left" }}><i>Fecha y Hora: </i></div>
                                <Markup content={props.contenido[0].informacion_adicional} />
                                {/* <div>{contenido[0].informacion_adicional}</div> */}
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

            }

        </div>
    )
})

export default Print