import React from "react";
import { Grid, List, Typography, ListItem, Box } from "@mui/material";
import "./style.css";
import useLayoutContext from "src/hooks/useAuthLayout";
import Codes from './Codes'


export const ComponentToPrint = React.forwardRef((props, ref) => {
    const { tipoDocumentosSistComp } = useLayoutContext()


    return (
        <div ref={ref} style={{
            width: 255,
            maxWidth: 255,
            fontFamily: "Verdana",
            marginLeft: "22px"
        }}>
            <Grid container spacing={1} >
                <Grid style={{ textAlign: "center" }} item lg={12}>
                    <img alt="Auth0" src={'/static/images/img/logoLogin.png'} width={150} />
                </Grid>
            </Grid>
            <Box >
                <Grid container rowSpacing={0} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
                    <Grid item xs={12}>
                        <div style={{ fontSize: "12px" }}><b>CLINICA VESALIO</b></div>
                    </Grid>
                </Grid>
            </Box>
            <Box>
                <Grid container rowSpacing={0} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
                    <Grid item xs={12}>
                        <div style={{ fontSize: "12px" }}>CALLE JOSEPH THOMPSON 140</div>
                    </Grid>
                </Grid>
            </Box>
            <Box >
                <Grid container rowSpacing={0} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
                    <Grid item xs={12}>
                        <div style={{ fontSize: "12px" }}>URB. SANTO THOMAS SAN BORJA</div>
                    </Grid>
                </Grid>
            </Box>
            <Box >
                <Grid container rowSpacing={0} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
                    <Grid item xs={12}>
                        <div style={{ fontSize: "12px" }}><b>FECHA:</b>{" "}{props.item.fechahora}</div>
                    </Grid>
                </Grid>
            </Box>
            <Box >
                <Grid container rowSpacing={0} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
                    <Grid item xs={12}>
                        <div style={{ fontSize: "12px" }}><b>PACIENTE:</b>{' '}{`${props.datosUsuario.Des_ApePaterno} ${props.datosUsuario.Des_ApeMaterno} ${props.datosUsuario.Des_Nombres}`}</div>
                    </Grid>
                </Grid>
            </Box>
            <Box >
                <Grid container rowSpacing={0} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
                    <Grid item xs={12}>
                        <div style={{ fontSize: "12px" }}><b>EDAD:</b>{' '}{new Date().getFullYear() - parseInt(props.datosUsuario.Fec_Nacimien.split('T')[0].split('-')[0])} años</div>
                    </Grid>
                </Grid>
            </Box>
            <Box >
                <Grid container rowSpacing={0} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
                    <Grid item xs={12}>
                        <div style={{ fontSize: "12px" }}><b>ESPECIALIDAD:</b>{' '}{props.item.especialidad}</div>
                    </Grid>
                </Grid>
            </Box>
            <Box >
                <Grid container rowSpacing={0} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
                    <Grid item xs={12}>
                        <div style={{ fontSize: "12px" }}><b>{tipoDocumentosSistComp.find(x => x.id === props.datosUsuario.Cod_TipIdenti).title}:{" "}</b>{`${props.datosUsuario.Nro_DocIdenti}`}</div>
                    </Grid>
                </Grid>
            </Box>
            <Box >
                <Grid container rowSpacing={0} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
                    <Grid item xs={12}>
                        <div style={{ fontSize: "12px" }}><b>Nro HC:{" "}</b>{`${props.datosUsuario.Nro_Historia}`}</div>
                    </Grid>
                </Grid>
            </Box>
            <Grid container alignItems="left" justifyContent={"left"} spacing={0} sx={{ my: 0, mt: 1 }} >
                <Grid style={{ textAlign: "left" }} item lg={12}>
                    <Typography sx={{ fontSize: 14 }}><b>RECETA MÉDICA</b></Typography>
                </Grid>
            </Grid>
            <Grid container >
                <Grid item lg={2}>
                    <Typography sx={{ fontSize: 12 }}><b>DIAGNÓSTICO:</b></Typography>
                </Grid>
                <Grid item lg={12}>
                    <List disablePadding component="div">

                        {props.diagnosticos.map((value, ix) => {
                            return (
                                <ListItem
                                    sx={{
                                        py: 0,
                                        ml: .2
                                    }}
                                    key={ix}
                                >
                                    <Typography sx={{ fontSize: 14, ml: 1 }}>{value.nombreLista}</Typography>
                                </ListItem>
                            );
                        })}
                    </List>
                </Grid>

            </Grid>
            <Grid container spacing={.1} sx={{ ml: .2 }} >
                {
                    props.datos.map((x, ix) => <Grid style={{ marginLeft: "10px" }} item key={ix} lg={12}>
                        <Typography sx={{ fontSize: 12 }}><b>{ix + 1}. {'    '} {x.nombre}</b> </Typography>
                        <Typography sx={{ fontSize: 12 }}><b>Dosis y frecuencia:</b>{' '}{x.cadaTiempo} </Typography>
                        <Typography sx={{ fontSize: 12 }}><b>Cantidad Total:</b>{' '}{parseInt(x.cantidad_indicacion)} </Typography>
                        <Typography sx={{ fontSize: 12 }}><b>Unica dosis:</b>{x.unica_dosis}{'    '}{x.via_administracion}</Typography>
                        <Typography sx={{ fontSize: 12 }}><b>Día(s) de tratamiento:{' '}</b>{x.duracion_cantidad}</Typography>
                        <Typography sx={{ fontSize: 12 }}><b>OBS:</b>{' '}{x.comentario}</Typography>
                        <div style={{ textAlign: "center" }}>
                            <Codes value={x.tprodfarma_id} />
                        </div>
                    </Grid>)}
            </Grid>
            <Grid container spacing={.1} sx={{ mt: 4, ml: 1 }} >
                <Typography sx={{ fontSize: 12 }}><b>RECETA VALIDA POR 7 DIAS</b> </Typography>
            </Grid>
            {/* 
            <div className="ticket">

                <br />
                <p style={{ fontSize: 16, fontFamily: "'Courier New', arial" }}>
                    Brian chicoma
                </p>
                <p style={{ fontSize: 16, fontFamily: "'Courier New', arial" }}>
                    471609055
                </p>
                <hr />
                <h6 style={{ fontSize: 20, fontFamily: "'Courier New', arial" }}>
                    Lista de Examenes
                </h6>
                <table>
                    <thead>


                        <tr style={{ fontSize: 20, fontFamily: "'Courier New', arial" }}>
                            <td
                                style={{ fontSize: 16, fontFamily: "'Courier New', arial" }}
                                width={10}
                            >
                                #
                            </td>
                            <td
                                style={{ fontSize: 16, fontFamily: "'Courier New', arial" }}
                                width={60}
                            >
                                Examen
                            </td>
                            <td
                                style={{ fontSize: 16, fontFamily: "'Courier New', arial" }}
                                width={30}
                            >
                                Informacion
                            </td>

                        </tr>
                    </thead>
                    <tbody>
                        {props.datos.map((car, i) => (
                            <tr key={i} style={{ fontSize: 20 }}>
                                <td style={{ fontSize: 16, fontFamily: "'Courier New', arial" }}>
                                    {parseInt(i) + 1}
                                </td>
                                <td style={{ fontSize: 16, fontFamily: "'Courier New', arial" }}>
                                    {car.estudioNombre}
                                </td>
                                <td style={{ fontSize: 16, fontFamily: "'Courier New', arial" }}>
                                    <Markup content={car.informacion} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>


                <br />

                <p
                    className="centrado"
                    style={{ fontSize: 20, fontFamily: "'Courier New', arial" }}
                >
                    ¡GRACIAS POR SU COMPRA Y PREFERENCIA!
                    <br />
                </p>

            </div> */}
        </div>
    );
});
