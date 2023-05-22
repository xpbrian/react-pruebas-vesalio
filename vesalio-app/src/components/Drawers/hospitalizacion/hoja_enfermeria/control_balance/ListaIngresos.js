import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next';


export default function ListaCitasTabla({ lista: datos }) {
    const { t } = useTranslation();
    const [lista, setLista] = useState([])



    useEffect(() => {
        setLista(datos)
    }, [datos])



    return (
        <>


            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t('Tipo')}</TableCell>
                            <TableCell>{t('Medicamento')}</TableCell>
                            <TableCell>{t('Cantidad')}</TableCell>
                            <TableCell>{t('Via Administracion')}</TableCell>
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
                                            color="text.primary">
                                            <b>{list.tipo}</b>
                                        </Typography>

                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary">
                                            <b>{list.medicamento}</b>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary">
                                            <b>{list.cantidad}</b>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary">
                                            Intravenosa:<b>{list.intravenosa}</b>
                                        </Typography>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary">
                                           Oral: <b>{list.oral}</b>
                                        </Typography>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary">
                                            Sanguinea<b>{list.sanguinea}</b>
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
