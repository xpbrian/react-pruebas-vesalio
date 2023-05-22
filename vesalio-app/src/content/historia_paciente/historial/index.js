import { Avatar, Box, Card, CardHeader, Chip, Divider, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react'
// import ManIcon from '@mui/icons-material/Man';
// import WomanIcon from '@mui/icons-material/Woman';
import Text from 'src/components/Text';
import ConsultaBasica from './1'
import CambioAntecedentesPatologicos from './3'
import CambioMedicacionCronica from './4'
import CambioAntecedenteHeredoFamiliar from './6'
import CambioAntecedenteQuirurgico from './7'
import CambioAntecedenteNoPatologico from './15'
import InformacionAdicional from './8'
import Oftalmologia from './17'
import Enfermeria from './9';
import Internacion from './14';



export default function Historial({ historial, datosUsuario, actualizarView, filtroEsp }) {
    const [datos, setDatos] = useState([])

    useEffect(() => {
        setDatos(historial);
        console.log(historial);
    }, [historial, filtroEsp])


    return (
        <>

            <Grid
                sx={{
                    px: { xs: 0, md: 2 },
                    py: 1.5
                }}
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={1}
            >
                <Box style={{ display: "flex " }}>
                    {filtroEsp.map((h =>
                        <Chip
                        label={h}
                        component="a"
                        href="#basic-chip"
                        variant="contained"
                        color='primary'
                        style={{ marginLeft: "5px" }}
                      />
                    ))}
                </Box>
                <Divider />
                {datos.filter(objeto => filtroEsp.length === 0 ? objeto.datos : filtroEsp.includes(objeto.especialidad)).map(x => <Grid item lg={12} key={x.evento_id}>
                    <Card style={{ border: "1px solid #efefef", boxShadow: "7px 7px 7px -7px #333" }} sx={{ p: 2, background: x.tipocontenido_id !== 14 ? 'white' : '#ff9999' }} >

                        {
                            x.tipocontenido_id !== 14 && <>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ bgcolor: x.genero === 'f' ? 'red' : 'blue' }} aria-label="recipe">
                                            {x.genero === 'f' ? <img style={{ width: "45px" }} src='/static/images/img/femenino.jpeg' alt='Clinica Vesalio' /> :
                                                <img style={{ width: "45px" }} src='/static/images/img/masculino.jpeg' alt='Clinica Vesalio' />}

                                        </Avatar>
                                    }
                                    title={<Typography variant='h5'>
                                        <b>{x.doctor}</b>
                                    </Typography>}
                                    subheader={<>
                                        <Grid container direction="row">
                                            <Grid item lg={7}>{x.especialidad}</Grid>
                                            <Grid item lg={5}>
                                                <Text sx={{ float: 'right' }}>
                                                    {x.fechahora}
                                                </Text>
                                            </Grid>
                                        </Grid>
                                    </>}
                                />
                                <Divider />
                            </>
                        }




                        {
                            parseInt(x.tipocontenido_id) === 1 && <ConsultaBasica item={x} datosUsuario={datosUsuario} />
                        }
                        {
                            parseInt(x.tipocontenido_id) === 3 && <CambioAntecedentesPatologicos item={x} />
                        }
                        {
                            parseInt(x.tipocontenido_id) === 4 && <CambioMedicacionCronica item={x} />
                        }
                        {
                            parseInt(x.tipocontenido_id) === 6 && <CambioAntecedenteHeredoFamiliar item={x} />
                        }
                        {
                            parseInt(x.tipocontenido_id) === 7 && <CambioAntecedenteQuirurgico item={x} />
                        }
                        {
                            parseInt(x.tipocontenido_id) === 8 && <InformacionAdicional item={x} datosUsuario={datosUsuario} actualizarView={actualizarView} />
                        }
                        {
                            parseInt(x.tipocontenido_id) === 9 && <Enfermeria item={x} />
                        }
                        {
                            parseInt(x.tipocontenido_id) === 14 && <Internacion item={x} />
                        }
                        {
                            parseInt(x.tipocontenido_id) === 15 && <CambioAntecedenteNoPatologico item={x} />
                        }
                        {
                            parseInt(x.tipocontenido_id) === 17 && <Oftalmologia item={x} />
                        }

                    </Card>
                </Grid>)}



            </Grid>



        </>
    )
}
