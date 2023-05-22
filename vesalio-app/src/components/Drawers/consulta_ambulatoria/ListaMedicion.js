import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import { useTranslation } from 'react-i18next';

export default function ListaCitasTabla({ mediciones: datos, handleMediciones, hgt }) {
    const { t } = useTranslation();
    const [lista, setLista] = useState([])
    const [text, setText] = useState([
        { id: 'tension_arterial_maxima', value: '' },
        { id: 'tension_arterial_minima', value: '' },
        { id: 'peso', value: '' },
        { id: 'talla', value: '' },
        { id: 'temperatura', value: '' },
        { id: 'f_card', value: '' },
        { id: 'f_resp', value: '' },
        { id: 'sato', value: '' },
        { id: 'hgt', value: '' },
    ])

    useEffect(() => {
        setLista(datos)
        setText(x => x.reduce((arr, item) => {
            arr.push({ ...item, value: datos[0][item.id] })
            return arr
        }, []))
    }, [datos, hgt])

    const handleChanged = (e) => {
        setText(x => x.reduce((arr, item) => {
            arr.push({ ...item, value: item.id === e.target.name ? e.target.value : item.value })
            return arr
        }, []))
        handleMediciones(e.target.name, e.target.value)
    }

    return (
        <>
            {
                lista.length > 0 && <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">{t('PA Max')}</TableCell>
                                <TableCell align="center">{t('PA Min')}</TableCell>
                                <TableCell align="center">{t('Peso (Kg.)')}</TableCell>
                                <TableCell align="center">{t('Talla (cm)')}</TableCell>
                                <TableCell align="center">{t('Temp. (°C)')}</TableCell>
                                <TableCell align="center">{t('F. Card')}</TableCell>
                                <TableCell align="center">{t('F. Resp')}</TableCell>
                                <TableCell align="center">{t('Sat. O2')}</TableCell>
                                <TableCell align="center">{t('HGT')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow hover>
                                {
                                    text.map((x, ix) => <TableCell key={ix} align="center">
                                        <TextField
                                            name={x.id}
                                            size={"small"}
                                            sx={{ width: 85 }}
                                            type={"tel"}
                                            value={x.value}
                                            variant="outlined"
                                            onChange={(e) => handleChanged(e)}
                                        />
                                    </TableCell>)
                                }
                            </TableRow>
                        </TableBody>
                    </Table>

                </TableContainer>
            }


        </>
    )
}
