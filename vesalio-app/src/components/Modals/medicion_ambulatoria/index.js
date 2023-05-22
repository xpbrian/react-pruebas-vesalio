import { Button, Grid, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import useLayoutContext from "src/hooks/useAuthLayout"

export default function Index() {


    const { mostrarComponent, modalOpen } = useLayoutContext()

    const [text, setText] = useState([
        { id: 'tension_arterial_maxima', label: 'TA Max', value: '', type: 'number', lg: 4 },
        { id: 'tension_arterial_minima', label: 'TA Min', value: '', type: 'number', lg: 4 },
        { id: 'peso', label: 'Peso(Kg)', value: '', type: 'number', lg: 4 },
        { id: 'talla', label: 'Talla(cm)', value: '', type: 'number', lg: 4 },
        { id: 'temperatura', label: 'Temp. (°C)', value: '', type: 'number', lg: 4 },
        { id: 'f_card', label: 'F. Card.', value: '', type: 'number', lg: 4 },
        { id: 'f_resp', label: 'F. Resp.', value: '', type: 'number', lg: 4 },
        { id: 'sato', label: 'SAT. O2', value: '', type: 'number', lg: 4 },
        { id: 'hgt', label: 'HGT', value: '', type: 'number', lg: 4 },
    ])

    useEffect(() => {
        if (modalOpen.item.isEditar) {
            setText(x => x.reduce((arr, item) => {
                arr.push({ ...item, value: modalOpen.item.mediciones[item.id] })
                return arr
            }, []))
        }

    }, [modalOpen])

    const handleChangedText = (e) => {
        setText(x => x.reduce((arr, item) => {
            arr.push({ ...item, value: item.id === e.target.name ? e.target.value : item.value })
            return arr
        }, []))
    }

    const handleGuardarRegistro = () => {
        modalOpen.item.addMedicion(text.reduce((arr, item) => {
            arr[item.id] = item.value
            return arr
        }, {}))
        mostrarComponent({
            contenido: '',
            estado: false,
            size: 'xs'
        }, 'modalOpen')
    }

    return (
        <>
            <Grid alignItems="center" container spacing={3} sx={{ p: 3 }}>
                {text.length > 0 && text.map(x => <Grid item lg={x.lg} key={x.id}>
                    <TextField
                        fullWidth
                        label={x.label}
                        name={x.id}
                        type={x.type}
                        value={x.value}
                        variant="outlined"
                        onChange={(e) => handleChangedText(e)}
                    />
                </Grid>
                )}
                <Grid item xs={12} lg={12} md={12} >
                    <Button
                        sx={{
                            mt: 3,
                        }}
                        color="primary"
                        fullWidth
                        size="large"
                        variant="contained"
                        onClick={() => handleGuardarRegistro()}
                    >
                        {'Guardar cambios'}
                    </Button>
                </Grid>
            </Grid>

        </>
    )
}
