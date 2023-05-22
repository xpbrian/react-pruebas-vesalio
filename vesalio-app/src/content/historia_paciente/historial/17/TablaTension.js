import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next';

export default function ListaCitasTabla({ contenido: datos }) {
    const { t } = useTranslation();
    const [lista, setLista] = useState([])
    const [array, setArray] = useState([])

    useEffect(() => {
        setLista(datos)
    }, [datos])
    
    useEffect(() => {
        if (lista.length > 0) {
            setArray([
                { label: 'Valoración Pupilas', od: lista[0].od_val_pupila, oi: lista[0].oi_val_pupila },
                { label: 'AVSC', od: lista[0].od_avsc, oi: lista[0].oi_avsc },
                { label: 'AV CSC', od: lista[0].od_avcsc, oi: lista[0].oi_avcsc },
                { label: 'AVCC', od: lista[0].od_avcc, oi: lista[0].oi_avcc },
                { label: 'Presión Intraocular (mmHG)', od: lista[0].od_tension_ocular, oi: lista[0].oi_tension_ocular },
                { label: 'Visión de colores', od: lista[0].od_vision_color, oi: lista[0].oi_vision_color }
            ])
        }

    }, [lista])

    return (
        <>
            {
                array.length > 0 && <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">{' '}</TableCell>
                                <TableCell align="center">{t('Ojo Derecho')}</TableCell>
                                <TableCell align="center">{t('Ojo Izquierdo')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {array.map((list, ix) => {
                                return (
                                    <TableRow hover key={ix} >
                                        <TableCell align="center">
                                            <Typography
                                                noWrap
                                                variant="subtitle1"
                                                color="text.primary">
                                                <b>{list.label}</b>
                                            </Typography>

                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography
                                                noWrap
                                                variant="subtitle1"
                                                color="text.primary">
                                                <b>{list.od}</b>
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography
                                                noWrap
                                                variant="subtitle1"
                                                color="text.primary">
                                                <b>{list.oi}</b>
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}

                        </TableBody>
                    </Table>

                </TableContainer>
            }


        </>
    )
}
