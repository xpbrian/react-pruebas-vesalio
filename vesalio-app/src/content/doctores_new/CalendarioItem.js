import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import useLayoutContext from 'src/hooks/useAuthLayout';
import CardContenidoItem from './CardContenidoItem';

export default function CalendarCitas({ calendario, asignacionSelected,setAsignacionSelected }) {
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

                                        <Card key={ix} style={{ width: "350px", textAlign: "center", minHeight: "130px", borderRadius: "0" }}>
                                            <Box>
                                                {
                                                    x.semanas.map((y, iX) =>
                                                        <CardContenidoItem key={iX} item={y} asignacionSelected={asignacionSelected} setAsignacionSelected={setAsignacionSelected}/>
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

