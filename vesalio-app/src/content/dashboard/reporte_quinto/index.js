import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    IconButton,
    TextField,
} from '@mui/material';
import axios from 'axios';
import Lista from './Lista';

export default function Index() {
    const { t } = useTranslation();

    const [display, setDisplay] = useState(true)
    const [fecha, setFecha]   = useState(new Date().toISOString().split('T')[0])
    const [fecha2, setFecha2] = useState(new Date().toISOString().split('T')[0])
    const [datos, setDatos] = useState([])

    const handleClickBuscar = async () => {
        const response = await axios.post(`http://200.121.91.211:4001/QuintoReporteAplehoo`, { fecha:fecha,fechaFin:fecha2 })
        setDatos(response.data);
    }

    return (
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
                title={t('Cantidad de citas generadas')}
            />
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
                    <Grid item lg={4}>
                        <TextField
                            fullWidth
                            type={"date"}
                            value={fecha}

                            variant="outlined"

                            onChange={(e) => setFecha(e.target.value)}
                        />

                    </Grid>
                    <Grid item lg={4}>
                        <TextField
                            fullWidth
                            type={"date"}
                            value={fecha2}
                            variant="outlined"
                            onChange={(e) => setFecha2(e.target.value)}
                        />

                    </Grid>
                    <Grid item lg={4}  >
                        <Button

                            variant="outlined"
                            size='large'
                            onClick={() => handleClickBuscar()}
                            endIcon={<SearchIcon fontSize="small" />}
                        >
                            Generar
                        </Button>
                    </Grid>
                    <Grid item lg={12}>
                        <Lista datos={datos}/>

                    </Grid>
                </Grid>
            </CardContent>
            <Divider />

        </Card>
    );
}

