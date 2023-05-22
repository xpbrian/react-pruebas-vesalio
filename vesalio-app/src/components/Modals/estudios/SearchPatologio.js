import { Grid, ListItemButton, styled, ListItemText, List, ListSubheader, ListItemAvatar, Button, Zoom } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ExamenesAuxiliares from './componentes';
import CheckIcon from '@mui/icons-material/Check';
import useLayoutContext from 'src/hooks/useAuthLayout';
import { useSnackbar } from 'notistack';
import confirmSweetAlert from 'src/utils/confirm';

const ListItemWrapper = styled(ListItemButton)(
    () => `
        &.MuiButtonBase-root {
          border-radius: 0;
        }
    `
);

export default function SearchPatologio() {
    const { enqueueSnackbar } = useSnackbar();
    const [examenes, setExamenes] = useState([])
    const [selected, setSelected] = useState(null)
    const [check, setCheck] = useState([])
    const [seleccionados, setSeleccionados] = useState([])
    const [text, setText] = useState([
        { id: 'infPatologia', text: '' }, { id: 'impPatologia', text: '' },
        { id: 'infEndocrinologia', text: '' }, { id: 'impEndocrinologia', text: '' },
        { id: 'infResonancai', text: '' }, { id: 'impResonancia', text: '' },
        { id: 'infRadiologia', text: '' }, { id: 'impRadiologia', text: '' },
        { id: 'infTomografia', text: '' }, { id: 'impTomografia', text: '' },
        { id: 'infEcografia', text: '' }, { id: 'impEcografia', text: '' },
        { id: 'infEcografia01', text: '' }, { id: 'impEcografia01', text: '' },
        { id: 'infLaboratorio', text: '' }, { id: 'impLaboratorio', text: '' },
    ])
    const { modalOpen, mostrarComponent } = useLayoutContext()

    const handleChangedTextState = (t, id) => {
        setText(x => x.reduce((arr, item) => {
            arr.push({ ...item, text: item.id === id ? t : item.text })
            return arr
        }, []))
    }

    useEffect(() => {
        const getDatos = async () => {
            const response = await axios.get(`http://200.121.91.211:4001/estudiosExamenesNew`)
            setExamenes(response.data.length > 0 ? response.data.reduce((arr, item) => {
                let existe = arr.findIndex(x => x.id === item.tituloCodigo)
                if (existe < 0) {
                    arr.push({ id: item.tituloCodigo, titulo: item.titulo.toUpperCase(), componentes: [item] })
                } else {
                    arr[existe].componentes.push(item)
                }
                return arr
            }, []) : [])
        }
        getDatos()
    }, [])

    const handleClick = (item) => {
        setSelected(item)
    }
    const mostrarCheck = (id) => {
        setCheck(x => [...x, id])
    }
    const handleContinuar = async () => {
        const rpta = await confirmSweetAlert('Guardar exámenes auxiliares', 'Esta seguro que desea guardar los exámenes auxiliares', 'warning', true)

        if (rpta) {
            enqueueSnackbar('Agregado correctamente', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                },
                TransitionComponent: Zoom,
                autoHideDuration: 1000
            })
            let tmp = []
            examenes.filter(x => check.find(y => y === x.id) !== undefined).map(x => {
                x.componentes.map(y => {
                    if (seleccionados.includes(y.nombreCodigo)) {
                        tmp.push(y)
                    }
                    return false
                })
                return false
            })
            modalOpen.item.addEstudiosModal(tmp.reduce((arr, item) => {
                let existe = arr.findIndex(x => x.id === item.tituloCodigo)
                if (existe < 0) {
                    let informacion = ''
                    let impresion = ''
                    if (item.tituloCodigo === 'SEXP') {
                        informacion = text.find(x => x.id === 'infPatologia').text
                        impresion = text.find(x => x.id === 'impPatologia').text
                    }
                    if (item.tituloCodigo === 'LABEND') {
                        informacion = text.find(x => x.id === 'infEndocrinologia').text
                        impresion = text.find(x => x.id === 'impEndocrinologia').text
                    }
                    if (item.tituloCodigo === 'RRM') {
                        informacion = text.find(x => x.id === 'infResonancai').text
                        impresion = text.find(x => x.id === 'impResonancia').text
                    }
                    if (item.tituloCodigo === 'RD') {
                        informacion = text.find(x => x.id === 'infRadiologia').text
                        impresion = text.find(x => x.id === 'impRadiologia').text
                    }
                    if (item.tituloCodigo === 'RDTM') {
                        informacion = text.find(x => x.id === 'infTomografia').text
                        impresion = text.find(x => x.id === 'impTomografia').text
                    }
                    if (item.tituloCodigo === 'ee') {
                        informacion = text.find(x => x.id === 'infEcografia').text
                        impresion = text.find(x => x.id === 'impEcografia').text
                    }
                    arr.push({ id: item.tituloCodigo, titulo: item.titulo.toUpperCase(), componentes: [item], informacion, impresion })
                } else {
                    arr[existe].componentes.push(item)
                }
                return arr
            }, []))
            mostrarComponent({
                contenido: '',
                estado: false,
            }, 'modalOpen')
        }


    }
    return (
        <Grid container spacing={1} sx={{ my: 1, pb: 3, px: 2, mt: 2 }} >
            <Grid item xs={12} lg={4} md={4}>
                <List disablePadding component="div" subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Lista de examenes auxiliares
                    </ListSubheader>
                }>
                    {examenes.map((value, ix) => {
                        return (
                            <ListItemWrapper
                                sx={{
                                    py: 1
                                }}
                                onClick={() => handleClick(value)}
                                key={ix}
                            >
                                <ListItemText
                                    primary={value.titulo}
                                    primaryTypographyProps={{ variant: 'h5' }}
                                />
                                {
                                    (check.find(x => x === value.id) && <ListItemAvatar>
                                        <CheckIcon color='success' />
                                    </ListItemAvatar>)
                                }

                            </ListItemWrapper>
                        );
                    })}
                </List>

                <Button fullWidth variant='contained'
                    onClick={handleContinuar}> Continuar con la consulta</Button>
            </Grid>
            <Grid item xs={12} lg={8} md={8} >
                {
                    selected !== null && <ExamenesAuxiliares
                        seleccionados={seleccionados}
                        setSeleccionados={setSeleccionados}
                        text={text}
                        handleChangedTextState={handleChangedTextState}
                        selected={selected}
                        mostrarCheck={mostrarCheck} />
                }
            </Grid>
        </Grid>
    )
}
