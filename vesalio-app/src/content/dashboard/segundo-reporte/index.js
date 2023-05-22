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
import Lista from './Lista'


export default function Index() {
    const { t } = useTranslation();

    const [display, setDisplay] = useState(true)
    const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0])
    const [datos, setDatos] = useState([])
    const handleClickBuscar = async () => {
        const response = await axios.post(`http://apis-vesalio.com.pe/segundoReporte`, { fecha })
        setDatos(response.data.filter(x => parseInt(x.estado_turno_id) !== 3));

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
                title={t('Citas generadas por paciente/financiadora y fecha')}
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
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleClickBuscar()
                                }
                            }}
                            variant="outlined"

                            onChange={(e) => setFecha(e.target.value)}
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
                    <Grid item lg={12}  >
                        {datos.length > 0 && <Lista datos={datos} />}













                    </Grid>
                </Grid>
            </CardContent>
            <Divider />

        </Card>
    );
}

