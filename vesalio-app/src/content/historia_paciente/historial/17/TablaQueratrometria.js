import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next';

export default function ListaCitasTabla({ queratrometia: datos }) {
    const { t } = useTranslation();
    const [lista, setLista] = useState([])
    const [array, setArray] = useState([])

    useEffect(() => {
        setLista(datos)
    }, [datos])

    useEffect(() => {
        if (lista.length > 0) {
            let derecho = lista.find(x=>x.ojo ==='OD')
            let izquierdo = lista.find(x=>x.ojo ==='OI')
            setArray([
                { label: 'K1', od: derecho.cornea1, ejeD: derecho.eje1, label1: 'K1', oi:izquierdo.cornea1, ejeI:izquierdo.eje1},
                { label: 'K2', od: derecho.cornea2, ejeD: derecho.eje2, label1: 'K2', oi:izquierdo.cornea2, ejeI:izquierdo.eje2},
              
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
                                <TableCell align="center">{t('OD')}</TableCell>
                                <TableCell align="center">{t('EJE')}</TableCell>
                                <TableCell align="center">{' '}</TableCell>
                                <TableCell align="center">{t('OI')}</TableCell>
                                <TableCell align="center">{t('EJE')}</TableCell>
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
                                                <b>{list.ejeD}</b>
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography
                                                noWrap
                                                variant="subtitle1"
                                                color="text.primary">
                                                <b>{list.label1}</b>
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
                                        <TableCell align="center">
                                            <Typography
                                                noWrap
                                                variant="subtitle1"
                                                color="text.primary">
                                                <b>{list.ejeI}</b>
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
