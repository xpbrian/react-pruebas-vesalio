import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next';

export default function ListaCitasTabla({ datos }) {
    const { t } = useTranslation();
    const [lista, setLista] = useState([])

    useEffect(() => {

        setLista(datos.reduce((arr, item) => {
            let findInde = arr.findIndex(x => x.origen === item.origen && x.destino === item.destino)
            if (findInde < 0) {
                arr.push({ ...item, origen: item.origen !== null ? item.origen : 'Sin origen', destino: item.destino !== null ? item.destino : 'Sin destino' })


            }
            return arr
        }, []))
    }, [datos])


    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t('Fecha')}</TableCell>
                            <TableCell>{t('Origen')}</TableCell>
                            <TableCell>{t('Destino')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lista.map((list, ix) => {
                            return (
                                <TableRow hover key={ix} >
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{list.fecha_hora_evento.split('T')[0]}</b>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{`${list.origen}`}</b>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{list.destino}</b>
                                        </Typography>
                                    </TableCell>
                                </TableRow>

                            );
                        })}
                    </TableBody>
                </Table>

            </TableContainer>
        </>
    )
}
