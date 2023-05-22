import { useEffect, useState } from 'react'
import { Alert, Box, Button, Card, Grid, IconButton, InputAdornment, TextField, Tooltip, Typography } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';
import useLayoutContext from 'src/hooks/useAuthLayout';
import DiasSemana from './DiasSemana';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import Horarios from './Horarios';

export default function index({ agignacion, getDatosMedicoSelected, setAsignacionSelecteds }) {
    const [lista, setLista] = useState([])
    const [query, setQuery] = useState('')
    const [mostrar, setMostrar] = useState([])

    useEffect(() => {

        setLista(agignacion)
    }, [agignacion])


    useEffect(() => {

        setLista(x => query.length === 0 ? agignacion : x.filter(y => y.datosDoctor.toUpperCase().includes(query.toUpperCase()) ||
            //  || .filter(c => c.id === y.asignacion_id) > 0
            //   )
            mostrar.reduce((arr, item) => {
                let existeFind = arr.findIndex(x => x.id === item.id)
                if (existeFind < 0) {
                    arr.push(item)
                }
                return arr
            }, []).filter(z => z.dias.filter(j => j.diaNombre.toUpperCase().includes(query.toUpperCase())).length > 0).filter(x => x.id === y.asignacion_id).length > 0
        ))
    }, [query, mostrar])

    useEffect(() => {
        setAsignacionSelecteds(lista)
    }, [lista])

    const { mostrarComponent } = useLayoutContext()
    const handleClick = (obj) => {
        mostrarComponent({
            contenido: 'editMedicoMensaje',
            estado: true,
            item: { datos: obj, getDatosMedicoSelected: () => getDatosMedicoSelected() },
            size: 'xs'
        }, 'modalOpen')
    }
    const handleClickAgenda =(item)=>{
        console.log(item);
        mostrarComponent({
            contenido: 'agregarAgenda',
            estado: true,
            title: 'Agregar agenda',
            item: {
                personalId: item
            }
        }, 'drawerOpen')
    }
    return (
        <>
            <Card>
                <Box p={2}>
                    <TextField
                        sx={{
                            m: 0
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchTwoToneIcon />
                                </InputAdornment>
                            )
                        }}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={'Buscar'}
                        value={query}
                        size="small"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />

                </Box>
            </Card>

            {lista.map((item, ix) => <Card key={ix} sx={{
                p: 2,
                my: 1,
                display: mostrar.find(x => x.id === item.asignacion_id) === undefined ? 'none' : ''
            }}>

                <Typography variant='h5'>Médico: {item.datosDoctor} <Tooltip title={'Seleccionar'} arrow>
                    <IconButton
                        size="small"
                        sx={{
                            float: "right",
                            mt: -1
                        }}
                        color="secondary"
                        onClick ={()=>handleClickAgenda(item)}
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
                            <DiasSemana item={item} setMostrar={setMostrar} />
                        </Grid>
                        <Grid item lg={12}>
                            <Horarios item={item} />
                        </Grid>
                        <Grid item lg={12}>
                            <Button fullWidth sx={{ mt: 2 }}
                                size={"small"} variant="outlined" onClick={() => handleClick(item)}>{item.comentario.length > 0 ? 'Editar' : "Agregar"} Mensaje</Button>
                        </Grid>
                    </Grid>

                </Box>
            </Card>)}

        </>
    )
}
