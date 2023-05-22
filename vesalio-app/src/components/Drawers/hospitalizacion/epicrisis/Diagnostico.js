import { Autocomplete, Button, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Diagnostico({ addDiagnostico, selected, setSelected }) {
    const [array, setArray] = useState([])
    const [valores, setValores] = useState('')

    let inputRef;
    useEffect(() => {
        const getDatos = async (query) => {
            try {
                const response = await axios.get(`http://200.121.91.211:4001/diagnosticos/${query}`)
                setArray(response.data.reduce((arr, item) => {
                    arr.push({ id: item.id, label: item.label })
                    return arr
                }, []))
            } catch (e) {
                console.log(e);
            }

        }

        if (valores.length >= 3) {
            getDatos(valores)
        } else {
            setArray([])
        }

    }, [valores])
    const handleChanged = (value) => {
        setValores(value === null ? '' : value.label);
        setSelected(value)
    }
    return (
        <>
            <Grid item lg={10}>
                <Typography variant="h5" sx={{ mb: 1 }}><b>Diagnóstico</b></Typography>
                <Autocomplete
                    inputValue={valores}
                    value={selected}
                    onChange={(_, value) => handleChanged(value)}
                    autoHighlight
                    options={array}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            onChange={(e) =>
                                setValores(e.target.value)
                            }
                            inputRef={input => {
                                inputRef = input;
                            }}
                            fullWidth
                            variant="outlined"
                            label={''}
                            placeholder={'Seleccione diagnostico ...'}
                        />
                    )}
                />
            </Grid>
            <Grid item lg={2}>
                <Button
                    variant="contained"
                    onClick={() => {
                        addDiagnostico()
                        setValores('')
                        setSelected(null)
                        inputRef.focus();
                    }}
                    sx={{ m: 0.2, mt: 4 }}
                >
                    Agregar
                </Button>
            </Grid>
        </>
    )
}
