import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import useLayoutContext from 'src/hooks/useAuthLayout';
import PorEspecialidad from './PorEspecialidad'
import PorMedico from './PorMedico'


export default function CalendarCitas({ calendario, tipo, agignacionSelecteds,datos : recividoPrincipal }) {
    const { dias } = useLayoutContext()
    const [construir, setConstruir] = useState([])
    const [datos, setDatos] = useState([])



    useEffect(() => {
        setDatos(calendario)
    }, [calendario])

    useEffect(() => {

        setConstruir(dias.filter(x => x.id !== 1).reduce((arr, item) => {
            let tmp = []
            for (let i = 1; i <= 5; i++) {
                let obj = datos.find(z => parseInt(z.dia_de_la_semana) === parseInt(item.id) && parseInt(z.semana_del_mes) === parseInt(i))
                tmp.push({
                    ...obj === undefined ? { existe: false } : { ...obj, existe: true }
                })
            }
            arr.push({ ...item, semanas: tmp })
            return arr
        }, []))

    }, [datos])
    return (
        <>
            <Box>
                <Card>
                    <CardContent>
                        <Grid container>
                            <Grid item lg={12}>
                                <Box style={{ display: "flex" }}>
                                    {
                                        dias.filter(x => x.id !== 1).map((x, ix) => <Card key={ix} style={{ padding: "15px", marginRight: "0px", width: "300px", textAlign: "center", borderRadius: "0", marginBottom: "3px" }}><Typography style={{ fontSize: "16px", color: "#5569ff" }}><b>{x.value}</b></Typography></Card>
                                        )
                                    }
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid lg={12} item>
                                <Box style={{ display: "flex" }}>

                                    {construir.map((x, ix) =>

                                        <Card key={ix} style={{ width: "350px", textAlign: "center", minHeight: "220px", borderRadius: "0" }}>
                                            <Box>
                                                {
                                                    x.semanas.map((y, iX) =>
                                                        <Card key={iX} style={{ background: 'white', padding: "0px", textAlign: "center", height: "220px", margin: "5px 10px 10px -5px" }}>
                                                            {
                                                                y.existe && <>
                                                                    <Typography variant='h5'><b>{y.fecha_calendario_legible.split('/')[2] + '/' + y.fecha_calendario_legible.split('/')[1] + '/' + y.fecha_calendario_legible.split('/')[0]}</b></Typography>
                                                                    <Box style={{ minHeight: "220px" }}>

                                                                        {
                                                                            (tipo === '01' && agignacionSelecteds.length > 0) && <PorEspecialidad recividoPrincipal={recividoPrincipal}  item={y} agignacionSelecteds={agignacionSelecteds} />
                                                                        }
                                                                        {
                                                                            (tipo === '02' && agignacionSelecteds.length > 0) && <PorMedico recividoPrincipal={recividoPrincipal} item={y} agignacionSelecteds={agignacionSelecteds} />
                                                                        }
                                                                    </Box>

                                                                </>
                                                            }


                                                        </Card>
                                                    )
                                                }

                                            </Box>
                                        </Card>

                                    )
                                    }

                                </Box>
                            </Grid>
                        </Grid>

                    </CardContent>
                </Card>
            </Box>
        </>
    )
}

