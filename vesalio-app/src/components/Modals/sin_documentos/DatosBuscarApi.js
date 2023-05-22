
import {
    TextField,
    FormControl,
    MenuItem,
    Select,
    InputLabel,
    Grid,
} from '@mui/material';



export default function Register({ tipos, handleChangedApi, busca }) {
    return (

        <Grid alignItems="center" justifyContent={"center"} container spacing={3} mt={1}>
            <Grid item xs={12} lg={6} md={6}>
                <FormControl fullWidth variant="outlined">
                    <InputLabel>Tipo documento</InputLabel>
                    <Select
                        value={busca.tipodocumento}
                        label={'Tipo documento'}
                        name={'tipodocumento'}
                        onChange={(e) => handleChangedApi(e)}
                    >
                        {tipos.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} lg={6} md={6}>
                <TextField
                    fullWidth
                    label={'Numero documento'}
                    name={'numerodocumento'}
                    type={'number'}
                    value={busca.numerodocumento}
                    variant="outlined"
                    onChange={(e) => {
                        if (e.target.name === 'paternos' || e.target.name === 'maternos' || e.target.name === 'nombres') {
                            let numeros = '0123456789°!"#$%&/()=?¡*¨[]_:;><'
                            let inserta = true
                            numeros.split('').map((x) => {
                                if (e.target.value.includes(x)) {
                                    inserta = false
                                }
                                return false
                            })
                            if (inserta) {
                                handleChangedApi(e)
                            }
                        } else {
                            handleChangedApi(e)
                        }

                    }}
                />
            </Grid>


        </Grid>
    )
}
