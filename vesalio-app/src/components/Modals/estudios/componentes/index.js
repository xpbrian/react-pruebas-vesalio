import React from 'react'
import Patologia from './Patologia'
import Endocrinologia from './Endocrinologia'
import Resonancia from './Resonancia'
import Radiologia from './Radiologia'
import Tomografia from './Tomografia'
import Ecografia from './Ecogrfia'
import Ecografia1 from './Ecogrfia1'
import Laboratorio from './Laboratorio'
import { useSnackbar } from 'notistack';
import { Zoom } from '@mui/material'

export default function index({ selected, mostrarCheck, seleccionados, text, setSeleccionados, handleChangedTextState }) {
    const { enqueueSnackbar } = useSnackbar();


    const handleGuardarCheck = async () => {

        mostrarCheck(selected.id)
        enqueueSnackbar('Agregado correctamente', {
            variant: 'success',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right'
            },
            TransitionComponent: Zoom,
            autoHideDuration: 1000
        })


    }


    return (
        <>
            {
                selected.id === 'SEXP' && <Patologia handleGuardarCheck={handleGuardarCheck} seleccionados={seleccionados} text={text} selected={selected} setSeleccionados={setSeleccionados} handleChangedTextState={handleChangedTextState} />
            }
            {
                selected.id === 'LABEND' && <Endocrinologia handleGuardarCheck={handleGuardarCheck} seleccionados={seleccionados} text={text} selected={selected} setSeleccionados={setSeleccionados} handleChangedTextState={handleChangedTextState} />
            }
            {
                selected.id === 'RRM' && <Resonancia handleGuardarCheck={handleGuardarCheck} seleccionados={seleccionados} text={text} selected={selected} setSeleccionados={setSeleccionados} handleChangedTextState={handleChangedTextState} />
            }
            {
                selected.id === 'RD' && <Radiologia handleGuardarCheck={handleGuardarCheck} seleccionados={seleccionados} text={text} selected={selected} setSeleccionados={setSeleccionados} handleChangedTextState={handleChangedTextState} />
            }
            {
                selected.id === 'RDTM' && <Tomografia handleGuardarCheck={handleGuardarCheck} seleccionados={seleccionados} text={text} selected={selected} setSeleccionados={setSeleccionados} handleChangedTextState={handleChangedTextState} />
            }
            {
                selected.id === 'ee' && <Ecografia handleGuardarCheck={handleGuardarCheck} seleccionados={seleccionados} text={text} selected={selected} setSeleccionados={setSeleccionados} handleChangedTextState={handleChangedTextState} />
            }
            {
                selected.id === 'eco01' && <Ecografia1 handleGuardarCheck={handleGuardarCheck} seleccionados={seleccionados} text={text} selected={selected} setSeleccionados={setSeleccionados} handleChangedTextState={handleChangedTextState} />
            }
            {
                selected.id === 'LAB' && <Laboratorio handleGuardarCheck={handleGuardarCheck} seleccionados={seleccionados} text={text} selected={selected} setSeleccionados={setSeleccionados} handleChangedTextState={handleChangedTextState} />
            }

        </>
    )
}
