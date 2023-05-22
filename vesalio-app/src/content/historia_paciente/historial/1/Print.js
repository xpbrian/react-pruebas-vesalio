import React from "react";
import { Grid, List, Typography, ListItem, Box } from "@mui/material";
import "./style.css";
import useLayoutContext from "src/hooks/useAuthLayout";
import { Markup } from "interweave";
import Codes from './Codes'



export const ComponentToPrint = React.forwardRef((props, ref) => {
    const { tipoDocumentosSistComp } = useLayoutContext()

    return (
        <div
            ref={ref}
            style={{
                width: 255,
                maxWidth: 255,
                fontFamily: "Verdana",
                marginLeft: "30px"
            }}>
            <Grid container spacing={1} >
                <Grid style={{ textAlign: "right", marginLeft: "55px" }} item lg={12}>
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
                        <div style={{ fontSize: "12px" }}><b>PACIENTE:</b>{" "}{`${props.datosUsuario.Des_ApePaterno} ${props.datosUsuario.Des_ApeMaterno} ${props.datosUsuario.Des_Nombres}`}</div>
                    </Grid>
                </Grid>
            </Box>
            <Box >
                <Grid container rowSpacing={0} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
                    <Grid item xs={12}>
                        <div style={{ fontSize: "12px" }}><b>EDAD:</b>{" "}{new Date().getFullYear() - parseInt(props.datosUsuario.Fec_Nacimien.split('T')[0].split('-')[0])}</div>
                    </Grid>
                </Grid>
            </Box>
            <Box >
                <Grid container rowSpacing={0} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
                    <Grid item xs={12}>
                        <div style={{ fontSize: "12px" }}><b>{tipoDocumentosSistComp.find(x => x.id === props.datosUsuario.Cod_TipIdenti).title}:</b>{" "}{`${props.datosUsuario.Nro_DocIdenti}`}</div>
                    </Grid>
                </Grid>
            </Box>
            <Box >
                <Grid container rowSpacing={0} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
                    <Grid item xs={12}>
                        <div style={{ fontSize: "12px" }}><b>Nro HC:</b>{" "}{`${props.datosUsuario.Nro_Historia}`}</div>
                    </Grid>
                </Grid>
            </Box>
            {/* <Grid contain2 */}
            <Grid container alignItems="left" justifyContent={"left"} spacing={0} sx={{ my: 0, mt: 1 }} >
                <Grid style={{ textAlign: "left" }} item lg={12}>
                    <Typography sx={{ fontSize: 14 }}><b>EXÁMENES AUXILIARES</b></Typography>
                </Grid>
            </Grid>

            <Grid container spacing={0} sx={{ ml: 0, mt: 1 }} >
                <Grid item lg={2}>
                    <Typography sx={{ fontSize: 12 }}><b>DIAGNÓSTICO:</b></Typography>
                </Grid>
                <Grid item lg={12} >

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
                                    <Typography sx={{ fontSize: 14 }}>{value.nombreLista}</Typography>
                                </ListItem>
                            );
                        })}
                    </List>
                </Grid>

            </Grid>
            <Grid container spacing={.1} sx={{ ml: .2 }} >
                {props.datos.map((x, ix) => <Grid style={{ marginLeft: "10px" }} item key={ix} lg={12}>
                    <Typography sx={{ fontSize: 12 }}><b>{ix + 1}. {'    '} {x.titulo}</b> </Typography>
                    <Grid container spacing={.1} >
                        <Grid item lg={2}> <Typography sx={{ fontSize: 12 }}><b>IMPRESIÓN</b> </Typography></Grid>
                        <Grid item lg={10}><Markup style={{ marginLeft: "-10px !important", marginTop: "-50px !important" }} content={x.impresion} /></Grid>
                        <Grid item lg={2}> <Typography sx={{ fontSize: 12 }}><b>INFORMACIÓN</b> </Typography></Grid>
                        <Grid item lg={10}> <Markup style={{ marginLeft: "-10px !important", marginTop: "-50px !important" }} content={x.informacion} /></Grid>
                    </Grid>
                    {
                        x.componentes.map(y => <>
                            <Typography sx={{ fontSize: 12 }}><b>{y.nombre}</b> </Typography>
                            <Typography sx={{ fontSize: 12 }}><b>{y.nombreCodigo}</b> </Typography>
                            <div style={{ marginLeft: "60px" }}>
                                <Codes value={y.nombreCodigo} />
                            </div>
                        </>)
                    }
                </Grid>)}
            </Grid>
        </div>
    );
});
