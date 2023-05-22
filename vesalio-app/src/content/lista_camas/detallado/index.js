import { Box, Button, Card, CardHeader, Grid, InputAdornment, TextField, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import useLayoutContext from 'src/hooks/useAuthLayout';

export default function Index({ datos, ocupados, libreSistComp }) {
    const theme = useTheme()
    const { mostrarComponent } = useLayoutContext()
    const navigate = useNavigate();
    const [libre, setLibre] = useState([])
    const [query, setQuery] = useState('')
    const [lista, setLista] = useState([])
    const handleConsultar = (obj) => {
        navigate('/clinica/historiaEnfermeria/' + obj.documento)
    }
    const handleQueryChange = (e) => {
        setQuery(e.target.value)
    }
    useEffect(() => { setLibre(libreSistComp) }, [libreSistComp])
    useEffect(() => {
        if (query.length === 0) {
            setLista(datos.sort(function (a, b) {
                if (a.nombreSala > b.nombreSala) {
                    return 1;
                }
                if (a.nombreSala < b.nombreSala) {
                    return -1;
                }
                return 0;
            }))
        } else {
            let busca = ocupados.filter(x => x.titulo.toUpperCase().includes(query.toUpperCase()))
            setLista(datos.filter(t => busca.map(x => x.id).includes(t.camaId)).sort(function (a, b) {
                if (a.nombreSala > b.nombreSala) {
                    return 1;
                }
                if (a.nombreSala < b.nombreSala) {
                    return -1;
                }
                return 0;
            }))

        }
    }, [query, ocupados, datos])
    return (
        <>

            <Grid
                sx={{
                    px: { xs: 0, md: 2 }
                }}
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={1}
            >
                <Grid item xs={12} lg={12}>
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
                            onChange={handleQueryChange}
                            value={query}
                            placeholder={'Buscar'}
                            size="small"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                    </Box>

                </Grid>
                {lista.map((x, ix) => <Grid key={ix} item xs={12} lg={4}>
                    <Card >
                        <CardHeader
                            sx={{ p: 2, background: ocupados.find(y => parseInt(y.id) === parseInt(x.camaId)) !== undefined ? "#ff1943" : '#3cb371' }}
                            disableTypography

                            title={
                                <>
                                    <Typography
                                        sx={{
                                            fontSize: `${theme.typography.pxToRem(17)}`,
                                            color: ocupados.find(y => parseInt(y.id) === parseInt(x.camaId)) !== undefined ? "white" : '#black'
                                        }}
                                        gutterBottom
                                        variant="h3"
                                        textAlign="center"
                                    >
                                        {`${x.nombreSala} ${x.nombreCama}`}
                                    </Typography>
                                </>
                            }
                        />
                        {
                            ocupados.find(y => parseInt(y.id) === parseInt(x.camaId)) !== undefined && <Grid
                                sx={{
                                    px: { xs: 1, md: 2 },
                                    py: 2
                                }}
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="stretch"
                                spacing={1}>
                                <Grid item lg={12} sx={{ mt: 1 }}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        disabled
                                        label="Apellidos y nombres"
                                        value={`${ocupados.find(y => parseInt(y.id) === parseInt(x.camaId)).titulo}`}
                                    />

                                </Grid>
                                <Grid item lg={12}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        disabled
                                        label="Nro Historia"
                                        value={`${ocupados.find(y => parseInt(y.id) === parseInt(x.camaId)).historia}`}
                                    />
                                </Grid>
                                <Grid item lg={6}>
                                    <Button fullWidth variant="outlined" sx={{ mx: .5 }} onClick={() => handleConsultar(ocupados.find(y => parseInt(y.id) === parseInt(x.camaId)))}>Historia</Button>
                                </Grid>
                                {
                                    libre.find(y => parseInt(y.enlace1) === parseInt(x.camaId)) !== undefined && <Grid item lg={6}>
                                        <Button fullWidth variant="outlined" color={"info"} sx={{ mx: .5 }} >Liberar cama</Button>
                                    </Grid>
                                }




                            </Grid>
                        }
                        {
                            ocupados.find(y => parseInt(y.id) === parseInt(x.camaId)) === undefined && <Grid
                                sx={{
                                    px: { xs: 1, md: 2 },
                                    py: 2
                                }}
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="stretch"
                                spacing={1}>
                                <Grid item lg={12}>
                                    <Button fullWidth variant="outlined" sx={{ mx: .5 }} onClick={() => mostrarComponent({
                                        contenido: 'agregarCama',
                                        estado: true,
                                        title: x.nombreSala + '/ ' + x.nombreHabitacion + '/ ' + x.nombreCama,
                                        subtitle: '',
                                        item: { cama: x }
                                    }, 'drawerOpen')}>Asignar cama</Button>
                                </Grid>

                            </Grid>
                        }

                    </Card>

                </Grid>)}
            </Grid>

        </>
    )
}
