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

                {
                    label: 'Autorefracción',
                    esfDerecho: lista[0].auto_ref_od_esf, esfIzquierdo: lista[0].auto_ref_oi_esf,
                    cilDerecho: lista[0].auto_ref_od_cil, cilIzquierdo: lista[0].auto_ref_oi_cil,
                    xDerecho: lista[0].auto_ref_od_x, xIzquierdo: lista[0].auto_ref_oi_x,
                    recetaDerecho: lista[0].auto_ref_od_rec_, recetaIzquierda: lista[0].auto_ref_oi_rec_,
                },
                {
                    label: 'Lejos',
                    esfDerecho: lista[0].l_od_esf, esfIzquierdo: lista[0].l_oi_esf,
                    cilDerecho: lista[0].l_od_cil, cilIzquierdo: lista[0].l_oi_cil,
                    xDerecho: lista[0].l_od_x, xIzquierdo: lista[0].l_oi_x,
                    recetaDerecho: lista[0].l_od_rec_, recetaIzquierda: lista[0].l_oi_rec_,
                },
                {
                    label: 'Cerca',
                    esfDerecho: lista[0].c_od_esf, esfIzquierdo: lista[0].c_oi_esf,
                    cilDerecho: lista[0].c_od_cil, cilIzquierdo: lista[0].c_oi_cil,
                    xDerecho: lista[0].c_od_x, xIzquierdo: lista[0].c_oi_x,
                    recetaDerecho: lista[0].c_od_rec_, recetaIzquierda: lista[0].c_oi_rec_,
                },
                {
                    label: 'ADD',
                    esfDerecho: lista[0].add_od_esf, esfIzquierdo: lista[0].add_oi_esf,
                    cilDerecho: lista[0].add_od_cil, cilIzquierdo: lista[0].add_oi_cil,
                    xDerecho: lista[0].add_od_x, xIzquierdo: lista[0].add_oi_x,
                    recetaDerecho: lista[0].add_od_rec_, recetaIzquierda: lista[0].add_oi_rec_,
                },
                {
                    label: 'Media Distancia',
                    esfDerecho: lista[0].md_od_esf, esfIzquierdo: lista[0].md_oi_esf,
                    cilDerecho: lista[0].md_od_cil, cilIzquierdo: lista[0].md_oi_cil,
                    xDerecho: lista[0].md_od_x, xIzquierdo: lista[0].md_oi_x,
                    recetaDerecho: lista[0].md_od_rec_, recetaIzquierda: lista[0].md_oi_rec_,
                },
                {
                    label: 'Gafas',
                    esfDerecho: lista[0].gafas_od_esf, esfIzquierdo: lista[0].gafas_oi_esf,
                    cilDerecho: lista[0].gafas_od_cil, cilIzquierdo: lista[0].gafas_oi_cil,
                    xDerecho: lista[0].gafas_od_x, xIzquierdo: lista[0].gafas_oi_x,
                    recetaDerecho: lista[0].gafas_od_rec_, recetaIzquierda: lista[0].gafas_oi_rec_,
                },
                {
                    label: 'Refracción Cicloplegica',
                    esfDerecho: lista[0].ref_ciclo_od_esf, esfIzquierdo: lista[0].ref_ciclo_oi_esf,
                    cilDerecho: lista[0].ref_ciclo_od_cil, cilIzquierdo: lista[0].ref_ciclo_oi_cil,
                    xDerecho: lista[0].ref_ciclo_od_x, xIzquierdo: lista[0].ref_ciclo_oi_x,
                    recetaDerecho: lista[0].ref_ciclo_od_rec_, recetaIzquierda: lista[0].ref_ciclo_oi_rec_,
                },
                {
                    label: 'Lentes Contacto',
                    esfDerecho: lista[0].lentes_contacto_od_esf, esfIzquierdo: lista[0].lentes_contacto_oi_esf,
                    cilDerecho: lista[0].lentes_contacto_od_cil, cilIzquierdo: lista[0].lentes_contacto_oi_cil,
                    xDerecho: lista[0].lentes_contacto_od_x, xIzquierdo: lista[0].lentes_contacto_oi_x,
                    recetaDerecho: lista[0].lentes_contacto_od_rec_, recetaIzquierda: lista[0].lentes_contacto_oi_rec_,
                },
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
                                <TableCell align="center">{' '}</TableCell>
                                <TableCell align="center">{t('Esf')}</TableCell>
                                <TableCell align="center">{t('Cil')}</TableCell>
                                <TableCell align="center">{t('X')}</TableCell>
                                <TableCell align="center">{t('Incluir Receta')}</TableCell>
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
                                                <b>OD</b>
                                            </Typography>
                                            <Typography
                                                noWrap
                                                variant="subtitle1"
                                                color="text.primary">
                                                <b>OI</b>
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography
                                                noWrap
                                                variant="subtitle1"
                                                color="text.primary">
                                                <b>{list.esfDerecho}</b>
                                            </Typography>
                                            <Typography
                                                noWrap
                                                variant="subtitle1"
                                                color="text.primary">
                                                <b>{list.esfIzquierdo}</b>
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography
                                                noWrap
                                                variant="subtitle1"
                                                color="text.primary">
                                                <b>{list.cilDerecho}</b>
                                            </Typography>
                                            <Typography
                                                noWrap
                                                variant="subtitle1"
                                                color="text.primary">
                                                <b>{list.cilIzquierdo}</b>
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography
                                                noWrap
                                                variant="subtitle1"
                                                color="text.primary">
                                                <b>{list.xDerecho}</b>
                                            </Typography>
                                            <Typography
                                                noWrap
                                                variant="subtitle1"
                                                color="text.primary">
                                                <b>{list.xIzquierdo}</b>
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography
                                                noWrap
                                                variant="subtitle1"
                                                color="text.primary">
                                                <b>{list.recetaDerecho}</b>
                                            </Typography>
                                            <Typography
                                                noWrap
                                                variant="subtitle1"
                                                color="text.primary">
                                                <b>{list.recetaIzquierda}</b>
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
