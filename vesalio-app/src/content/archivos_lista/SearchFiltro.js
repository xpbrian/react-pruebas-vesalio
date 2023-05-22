// import { DatePicker } from '@mui/lab';
import { Button, Grid, TextField } from '@mui/material'

import SearchIcon from '@mui/icons-material/Search';



export default function SearchFiltro({ filter, handleChangedFilter, handleBuscarFiltro }) {
    return (
        <>
            <Grid
                container
                direction="row"
                sx={{ px: 2 }}
                justifyContent="center"
                alignItems="stretch"
                spacing={1}
            >
                <Grid item xs={12} lg={2} md={2}>

                    <TextField fullWidth
                        type={'date'}
                        onChange={(e) => {
                            handleChangedFilter('fecha', e.target.value)
                        }}
                        value={filter.fecha}
                        variant="outlined" />
                </Grid>
                <Grid item xs={12} lg={2} md={2}>
                    <Button variant='contained'
                        onClick={() => handleBuscarFiltro()}
                        fullWidth startIcon={<SearchIcon />}>Buscar</Button>
                </Grid>
            </Grid>
        </>
    )
}
