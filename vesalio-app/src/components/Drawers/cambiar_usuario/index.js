import { Button, Grid, TextField } from '@mui/material'
import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from 'react-router';
import useLayoutContext from 'src/hooks/useAuthLayout';
import confirmSweetAlert from 'src/utils/confirm';

export default function Index() {
    const [text, setText] = useState('');
    const navigate = useNavigate();

    const { drawerOpen } = useLayoutContext()
    const handleClickGuardar = async () => {
        console.log(drawerOpen.item.object.cuenta.method_sigin.id === '03');
        if (text.length === 0) {
            alert("No debes ingresar campos vacios")
        } else {
            const res = await axios.post(`http://200.121.91.211:4001/cambiarUsuario`, {
                id: drawerOpen.item.object._id,
                usuario: text
            })
            confirmSweetAlert('Cambiar usuario', res.data.msj, res.data.color, false)
            navigate(`/citas/usuarios-lista`);
        }
    }
    return (
        <>
            <Grid alignItems="center" justifyContent={"center"} container spacing={1} sx={{ my: 1, pb: 3, px: 3 }} >

                <Grid item lg={12}>
                    <TextField
                        fullWidth
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        variant="outlined"
                        label={'Nuevo nombre'}
                        placeholder={'Seleccione usuario'}
                    />
                </Grid>
                <Grid item lg={12} sx={{ mt: 2 }}>
                    <Button
                        fullWidth
                        variant='outlined'
                        onClick={handleClickGuardar}
                    >Cambiar usuario</Button>
                </Grid>
            </Grid>

        </>
    )
}
