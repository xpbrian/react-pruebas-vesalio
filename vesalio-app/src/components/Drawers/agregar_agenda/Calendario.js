import { Box, Card, Checkbox, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import useLayoutContext from 'src/hooks/useAuthLayout';

export default function CalendarCitas({ calendario, setDiaSelected, diaSelected }) {
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
    const handleChanged = (e, obj) => {
        if (e.target.checked) {
            setDiaSelected(x => [...x, obj])
        } else {
            setDiaSelected(x => x.filter(y => y.fecha_calendario !== obj.fecha_calendario))
        }
    }
    useEffect(()=>{console.log(diaSelected);},[diaSelected])
    return (
        <>
            <Box>

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
                {datos.length > 0 && <Grid container>
                    <Grid lg={12} item>
                        <Box style={{ display: "flex" }}>


                            {construir.map((x, ix) =>

                                <Card key={ix} style={{ width: "350px", textAlign: "center", minHeight: "130px", borderRadius: "0" }}>
                                    {
                                        x.semanas.map((y, iX) =>

                                            <Box key={iX} sx={{ display: "flex", justifyContent: "center" }}>

                                                {
                                                    y.existe ?

                                                        <Box style={{ display: "flex", justifyContent: "center", justifyItems: "center", alignContent: "center", alignItems: "center", marginTop: "5px", marginBottom: "15px" }}>

                                                            <Box>
                                                                <Checkbox onChange={(e) => handleChanged(e, y)} checked={diaSelected.filter(x => x.fecha_calendario === y.fecha_calendario).length  !== 0} />
                                                            </Box>
                                                            <Box>
                                                                <Typography variant='h'><b>{y.dia_calendario}</b></Typography>
                                                            </Box>


                                                        </Box> : <Box sx={{ justifyContent: "center", minHeight: "32.99px", }}>-</Box>
                                                }
                                            </Box>)
                                    }

                                </Card>

                            )
                            }

                        </Box>
                    </Grid>
                </Grid>}



            </Box>
        </>
    )
}

