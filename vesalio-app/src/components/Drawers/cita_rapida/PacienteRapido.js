import { Autocomplete, Grid, Link, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useAuth from 'src/hooks/useAuth'
import useLayoutContext from 'src/hooks/useAuthLayout'

export default function Paciente({ pacienteDocumento, setPacienteDocumento, pacienteWsp, setPacienteWsp }) {
    const { familiares, mostrarComponent } = useLayoutContext()
    const { user } = useAuth()
    const [datos, setDatos] = useState([])


    useEffect(() => {
        let array = []
        let nombres = `${user.datos.ape_paterno} ${user.datos.ape_materno} ${user.datos.nombres}`
        array.push({ id: user.datos.numero_documento, label: nombres })
        familiares.map(x => {
            let nombresA = `${x.ape_paterno} ${x.ape_materno} ${x.nombres}`
            array.push({ id: x.numero_documento, label: nombresA })
            return false
        })
        setDatos(array)
    }, [familiares, user])


    const handleFilter = (value, autoValue) => {
        if (autoValue !== null) {
            setPacienteDocumento(autoValue)
        } else {
            setPacienteDocumento({ id: '999', label: '' })
        }
    }
    const agregarNuevoFamiliar = () => {
        mostrarComponent({
            contenido: 'addFamiliar',
            estado: true,
            size: 'xs',
            item: true
        }, 'modalOpen')
    }
    const handleText =(e)=>{
        setPacienteWsp(e.target.value)
    }
    return (
        <Grid alignItems="center" justifyContent={"center"} container spacing={3} sx={{ p: 2 }}>
            <Grid item xs={12} lg={12} md={12}>
                {pacienteDocumento !== null && <Autocomplete
                    fullWidth
                    onChange={handleFilter}
                    options={datos}
                    value={pacienteDocumento}
                    getOptionLabel={(option) => option.label}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            fullWidth
                            variant="outlined"
                            label={'Paciente'}
                            placeholder={'Seleccione Paciente'}
                        />
                    )}
                />}
                <Link component="a"
                    href="#"
                    onClick={agregarNuevoFamiliar}>
                    Agregar familiar
                </Link>
            </Grid>
            <Grid item xs={12} lg={12} md={12}>
                <TextField
                    variant="outlined"
                    label={'WhatsApp'}
                    value={pacienteWsp}
                    onChange={handleText}
                    fullWidth
                    type={'number'}
                    placeholder={'Ingrese numero de whatsapp'}
                />
            </Grid>
        </Grid>
    )
}
