import { Box, Chip, styled, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'


const ChipWrapper = styled(Chip)(
    ({ theme }) => `
        background: ${theme.colors.alpha.black[10]};
        margin: ${theme.spacing(0.5)};
        padding: ${theme.spacing(1)};
        height: 28px;
        line-height: 28px;
        font-weight: bold;
`
);
export default function DiasSemana({ item, setMostrar }) {
    const [diasAgrupados, setDiasAgrupados] = useState([])
    const [diasTotal, setDiasTotal] = useState([])
    useEffect(() => {
        const buscarDatos = async (id) => {
            const response2 = await axios.get(`http://apis-vesalio.com.pe/datosAgendaSemana/${id}`)
            if (response2.status === 200) {
                setDiasAgrupados(response2.data.datos)
                setDiasTotal(response2.data.general)
                if (response2.data.datos.length > 0) {
                    setMostrar(x => [...x, {
                        id: item.asignacion_id, dias: response2.data.datos
                    }])
                }
            }
        }
        buscarDatos(item.asignacion_id);
    }, [item])

    useEffect(()=>{
        console.log(diasTotal);
    },[diasTotal])

    return (
        <>
            <Box px={2} py={1} direction="row"
                justifyContent="center"
                alignItems="stretch">
                {diasAgrupados.length > 0 && <Typography>Dias de la semana</Typography>}

                {diasAgrupados.sort(function (a, b) {
                    if (a.dia > b.dia) {
                        return 1;
                    }
                    if (a.dia < b.dia) {
                        return -1;
                    }
                    return 0;
                }).map((value) => {
                    return (
                        <ChipWrapper
                            key={value.dia}
                            color="secondary"
                            label={value.diaNombre}
                         
                        />
                    );
                })}
            </Box>

        </>
    )
}
