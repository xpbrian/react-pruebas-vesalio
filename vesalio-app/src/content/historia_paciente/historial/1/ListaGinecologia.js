import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next';

export default function ListaCitasTabla({ ginecologia: datos }) {
    const { t } = useTranslation();
    const [lista, setLista] = useState([])

    useEffect(() => {
        setLista(datos)
    }, [datos])

    return (
        <>
    {
        lista.length > 0 &&  <TableContainer>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell align="center">{t('FUM')}</TableCell>
                    <TableCell align="center">{t('Ciclo')}</TableCell>
                    <TableCell align="center">{t('Ritmo menstrual')}</TableCell>
                    <TableCell align="center">{t('Edad I.S.')}</TableCell>
                    <TableCell align="center">{t('Partos')}</TableCell>
                    <TableCell align="center">{t('Tiempo de gestación')}</TableCell>
                    <TableCell align="center">{t('Fecha posible parto')}</TableCell>
                    <TableCell align="center">{t('#Abortos')}</TableCell>
                    <TableCell align="center">{t('PAP')}</TableCell>
                    <TableCell align="center">{t('Fuma')}</TableCell>
                    <TableCell align="center">{t('MAC')}</TableCell>
                    <TableCell align="center">{t('Tto. Hormonal')}</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>

                <TableRow hover>
                    <TableCell>
                        <Typography
                            noWrap
                            variant="subtitle1"
                            color="text.primary">
                            <b>{lista[0].fecha_ultima_menstruacion}</b>
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography
                            noWrap
                            variant="subtitle1"
                            color="text.primary">
                            <b>{lista[0].ciclo}</b>
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography
                            noWrap
                            variant="subtitle1"
                            color="text.primary">
                            <b>{lista[0].ritmoMenstural}</b>
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography
                            noWrap
                            variant="subtitle1"
                            color="text.primary">
                            <b>{lista[0].edad_iniciacion_sexual}</b>
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography
                            noWrap
                            variant="subtitle1"
                            color="text.primary">
                            <b>{lista[0].partos}</b>
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography
                            noWrap
                            variant="subtitle1"
                            color="text.primary">
                            <b>{lista[0].gestacion}</b>
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography
                            noWrap
                            variant="subtitle1"
                            color="text.primary">
                            <b>{lista[0].fecha_probable_parto}</b>
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography
                            noWrap
                            variant="subtitle1"
                            color="text.primary">
                            <b>{lista[0].abortos}</b>
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography
                            noWrap
                            variant="subtitle1"
                            color="text.primary">
                            <b>{lista[0].pap}</b>
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography
                            noWrap
                            variant="subtitle1"
                            color="text.primary">
                            <b>{lista[0].fuma}</b>
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography
                            noWrap
                            variant="subtitle1"
                            color="text.primary">
                            <b>{lista[0].metodo}</b>
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography
                            noWrap
                            variant="subtitle1"
                            color="text.primary">
                            <b>{lista[0].tratamiento}</b>
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
