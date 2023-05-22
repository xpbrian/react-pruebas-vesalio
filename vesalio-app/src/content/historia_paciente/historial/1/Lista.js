import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next';

export default function ListaCitasTabla({ contenido: datos }) {
    const { t } = useTranslation();
    const [lista, setLista] = useState([])

    useEffect(() => {
        setLista(datos)
        console.log(datos);
    }, [datos])

    return (
        <>
    {
        lista.length > 0 &&  <TableContainer>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell align="center">{t('TA Max')}</TableCell>
                    <TableCell align="center">{t('TA Min')}</TableCell>
                    <TableCell align="center">{t('Peso (Kg.)')}</TableCell>
                    <TableCell align="center">{t('Talla (cm)')}</TableCell>
                    <TableCell align="center">{t('Temperatura (°C)')}</TableCell>
                    <TableCell align="center">{t('F. Card')}</TableCell>
                    <TableCell align="center">{t('F. Resp')}</TableCell>
                    <TableCell align="center">{t('Sat. O2')}</TableCell>
                    <TableCell align="center">{t('HGT')}</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>

                <TableRow hover>
                    <TableCell align="center">
                        <Typography
                            noWrap
                            variant="subtitle1"
                            color="text.primary">
                            <b>{lista[0].tension_arterial_maxima}</b>
                        </Typography>
                    </TableCell>
                    <TableCell align="center">
                        <Typography
                            noWrap
                            variant="subtitle1"
                            color="text.primary">
                            <b>{lista[0].tension_arterial_minima}</b>
                        </Typography>
                    </TableCell>
                    <TableCell align="center">
                        <Typography
                            noWrap
                            variant="subtitle1"
                            color="text.primary">
                            <b>{lista[0].peso}</b>
                        </Typography>
                    </TableCell>
                    <TableCell align="center">
                        <Typography
                            noWrap
                            variant="subtitle1"
                            color="text.primary">
                            <b>{lista[0].talla}</b>
                        </Typography>
                    </TableCell>
                    <TableCell align="center">
                        <Typography
                            noWrap
                            variant="subtitle1"
                            color="text.primary">
                            <b>{lista[0].temperatura}</b>
                        </Typography>
                    </TableCell>
                    <TableCell align="center">
                        <Typography
                            noWrap
                            variant="subtitle1"
                            color="text.primary">
                            <b>{lista[0].f_card}</b>
                        </Typography>
                    </TableCell>
                    <TableCell align="center">
                        <Typography
                            noWrap
                            variant="subtitle1"
                            color="text.primary">
                            <b>{lista[0].f_resp}</b>
                        </Typography>
                    </TableCell>
                    <TableCell align="center">
                        <Typography
                            noWrap
                            variant="subtitle1"
                            color="text.primary">
                            <b>{lista[0].sato}</b>
                        </Typography>
                    </TableCell>
                    <TableCell align="center">
                        <Typography
                            noWrap
                            variant="subtitle1"
                            color="text.primary">
                            <b>{lista[0].hgt}</b>
                        </Typography>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>

    </TableContainer>
    }
           

        </>
    )
}
