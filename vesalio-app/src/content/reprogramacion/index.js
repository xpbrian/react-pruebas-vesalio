
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Label from 'src/components/Label';
import { Box, Divider, Grid, Link, Tooltip } from '@mui/material';
import useLayoutContext from 'src/hooks/useAuthLayout';
import SearchFiltro from './SearchFiltro';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function RecipeReviewCard() {
    const [expanded, setExpanded] = useState(false);
    const [datos, setDatos] = useState(null);
    const { id } = useParams()
    const navigate = useNavigate()
    const { mostrarComponent } = useLayoutContext()
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    useEffect(() => {
        const mostrarComponente = async (id) => {
            const rpta = await axios.get(`http://apis-vesalio.com.pe/turnoProgramadoListaCitasItem/${id}`)
            if (rpta.data.length > 0) {
                setDatos(rpta.data[0])
            }
        }
        try {
            mostrarComponente(id)

        } catch (e) {
            console.log(e)
        }
    }, [])
    const handleVolver = () => {
        navigate(`/citas/agendas`);
    }
    const editarPaciente = (obj) => {
        mostrarComponent({
            contenido: 'editarPaciente',
            estado: true,
            size: 'xs',
            item: obj
        }, 'modalOpen')
    }
    return (
        <>
            <Card sx={{ mt: 2 }} >
                <CardActions disableSpacing>
                    <IconButton
                        aria-label="Volver"
                        onClick={() => handleVolver()}
                    >
                        <KeyboardArrowLeftIcon />
                    </IconButton>
                    <Typography lineHeight="lg" variant='h3'>
                        {datos !== null ? datos.nombre_paciente : ''} <Label color='warning'> {datos !== null ? datos.fecha.split('T')[0] : ''}</Label>
                    </Typography>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Divider />

                    {
                        datos !== null && <Card>
                            <CardContent >
                                <Box>
                                    <Card style={{ border: "1px solid #efefef", boxShadow: "7px 7px 7px -7px #333", padding: "10px" }}>
                                        <Grid
                                            sx={{
                                                px: { xs: 0, md: 2 }
                                            }}
                                            container
                                            direction="row"
                                            justifyContent="center"
                                            alignItems="center"
                                            spacing={1}
                                        >
                                            <Grid container style={{ marginTop: "20px" }} xs={12} lg={12}>

                                                <Grid style={{ padding: "0px", textAlign: "left" }} item xs={9}>
                                                    <Typography variant='subtitle2'>
                                                        <Tooltip title="Agregar Datos" placement='top-end'>
                                                            <Link href='#' onClick={() => editarPaciente(datos)}>
                                                                {datos.apellidos + ' ' + datos.nombres}
                                                            </Link>
                                                        </Tooltip>
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} lg={4}>
                                                <Typography variant='subtitle2'>
                                                    <b>DNI:{" "}</b>{datos.documento_paciente}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} lg={8}>
                                                <Typography variant='subtitle2'>
                                                    <b>Celular:{" "}</b>{datos.celular}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} lg={4}>
                                                <Typography variant='subtitle2'>
                                                    <b>Especialidad:{" "}</b>{datos.especialidad_nombre}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} lg={8}>
                                                <Typography variant='subtitle2'>
                                                    <b>Doctor:{" "}</b>{datos.nombre_doctor}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} lg={4}>
                                                <Typography variant='subtitle2'>
                                                    <b>Fecha:{" "}</b>{datos.fecha.split('T')[0]}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} lg={8}>
                                                <Typography variant='subtitle2'>
                                                    <b>Hora:{" "}</b><Label color={"error"} >{datos.hora}</Label>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Card>

                                </Box>

                            </CardContent>

                        </Card>
                    }

                </Collapse>
            </Card>
            {
                datos!==null && <SearchFiltro datos={datos}/>
            }
            
        </>

    );
}