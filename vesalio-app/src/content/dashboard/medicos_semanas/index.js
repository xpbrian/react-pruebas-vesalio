import { Button, Card, CardContent, CardHeader, Divider, Grid, IconButton } from '@mui/material'
import React, { useState } from 'react'
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import ListaGeneral from './Lista'
import axios from 'axios';

export default function Index() {
    const [display, setDisplay] = useState(true)
    const [listaPrimer,setListaPrimer] =useState([])
    const handleClickBuscar =async()=>{
        const getDatos = async () => {
            const response = await axios.get(`http://200.121.91.211:4001/reporteMedicosSemana`)
            setListaPrimer(response.data)
        }
        getDatos();
    }
    return (

        <>
            <Card>
                <CardHeader
                    action={
                        <>
                            <IconButton
                                size="medium"
                                color="secondary"
                                onClick={() => setDisplay(x => !x)}
                            >
                                <ExpandMoreTwoToneIcon fontSize="small" />
                            </IconButton>
                        </>
                    }
                    title={'Reporte de horarios de medicos'} />
                <Divider />
                <CardContent sx={{ display: display ? '' : 'none' }}>
                    <Grid
                        sx={{
                            px: 4
                        }}
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="stretch"
                        spacing={1}
                    >
                        <Grid item lg={12}  >
                            <Button
                                sx={{ float: "right" }}
                                variant="outlined"
                                size='large'
                                onClick={() => handleClickBuscar()}
                                endIcon={<SearchIcon fontSize="small" />}
                            >
                                Generar
                            </Button>
                        </Grid>
                        <Grid item lg={12}  >
                            <ListaGeneral  listaPrimer={listaPrimer}/>
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />

            </Card>
        </>
    )
}
