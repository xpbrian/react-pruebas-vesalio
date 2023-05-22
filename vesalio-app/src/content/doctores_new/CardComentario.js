import { Alert, Box, Button, Card, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';
import useLayoutContext from 'src/hooks/useAuthLayout';

export default function CardComentario({ item, handleMostrarCalendario, getDatosMedicoSelected }) {
    const { mostrarComponent } = useLayoutContext()
    const handleClick = (obj) => {
        mostrarComponent({
            contenido: 'editMedicoMensaje',
            estado: true,
            item: { datos: obj, getDatosMedicoSelected: () => getDatosMedicoSelected() },
            size: 'xs'
        }, 'modalOpen')
    }
    return (

        <Card sx={{
            p: 2
        }}>

            <Typography variant='h5'>Especialidad: {item.nombre} <Tooltip title={'Seleccionar'} arrow>
                <IconButton
                    size="small"
                    sx={{
                        float: "right",
                        mt: -1
                    }}
                    color="secondary"
                    onClick={() => handleMostrarCalendario(item)}
                >
                    <CheckIcon fontSize="small" />
                </IconButton>
            </Tooltip></Typography>
            {
                item.comentario.length > 0 && <><Alert sx={{ mx: 2, my: 2 }} severity="warning">{item.comentario}</Alert>

                </>
            }
            <Box sx={{ display: "flex", justifyContent: "center", justifyItems: "center" }}>
                <Grid container>
                    <Grid item lg={12}>
                        <Button fullWidth sx={{ mt: 2 }}
                            size={"small"} variant="outlined" onClick={() => handleClick(item)}>{item.comentario.length > 0 ? 'Editar' : "Agregar"} Mensaje</Button>
                    </Grid>
                    <Grid item lg={12}>
                        <Button
                            size={"small"}
                            fullWidth
                            sx={{
                                mt: .5
                            }}
                            variant="contained"
                            onClick={() => mostrarComponent({
                                contenido: 'agregarAgenda',
                                estado: true,
                                title: 'Agregar agenda',
                                item: {
                                    personalId: item
                                }
                            }, 'drawerOpen')}
                        >
                            {'Crear agenda'}
                        </Button>
                    </Grid>
                </Grid>

            </Box>
        </Card>
    )
}
