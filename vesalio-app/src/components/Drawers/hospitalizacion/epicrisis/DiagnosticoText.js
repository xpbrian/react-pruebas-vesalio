import { Autocomplete, Grid, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Diagnostico({ selected, setSelected }) {
    const [array, setArray] = useState([])
    const [valores, setValores] = useState('')
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

        <Grid item lg={10}>
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

                        fullWidth
                        variant="outlined"
                        label={''}
                        placeholder={'Seleccione diagnostico ...'}
                    />
                )}
            />
        </Grid>
    )
}
