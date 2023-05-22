import { Box, styled, OutlinedInput, InputAdornment, Button, FormControl, Divider, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import ResultBuscaPaciente from 'src/content/nueva_cita/ResultBuscaPaciente';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import axios from 'axios';

const OutlinedInputWrapper = styled(OutlinedInput)(
    ({ theme }) => `
      background-color: ${theme.colors.alpha.white[100]};
  `
);
const ButtonSearch = styled(Button)(
    ({ theme }) => `
      margin-right: -${theme.spacing(1)};
  `
);

export default function Paciente({ handleSleccionarPaciente }) {
    const { t } = useTranslation();
    const [text, setText] = useState('');
    const [lista, setlista] = useState([]);
    const [mostrarRegistrar, setMostrarRegistrar] = useState(false);
    const handleBuscarPaciente = async () => {
        if (text.length === 8) {
            const rpta = await axios.get(`http://apis-vesalio.com.pe/personaAlepho/${text}`)
            if (rpta.data.length === 0) {
                setMostrarRegistrar(true)
            }
            setlista(rpta.data);
        }
    }

    return (
        <>


            <Box p={2}>
                <FormControl variant="outlined" fullWidth>
                    <OutlinedInputWrapper
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        type="number"
                        placeholder={t('Ingrese numero de documento de identidad...')}
                        endAdornment={
                            <InputAdornment position="end">
                                <ButtonSearch variant="contained" size="small" onClick={handleBuscarPaciente}>
                                    {t('Buscar')}
                                </ButtonSearch>
                            </InputAdornment>
                        }
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchTwoToneIcon />
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </Box>
            <Divider />
            {
                lista.length > 0 && <ResultBuscaPaciente lista={lista} handleSleccionarPaciente={handleSleccionarPaciente} />
            }
            {
                mostrarRegistrar && <Box my={2}
                    mx={2}
                    flexDirection='column'
                    display="flex"
                    justifyContent="center"
                    alignItems="center">
                    <Typography
                        variant="h4"
                        color="text.secondary"
                        fontWeight="normal"
                    >
                        No se encontro paciente con el documento ingresado
                    </Typography>
                    <br />
                    <Button variant="outlined">
                        Registrar nuevo usuario
                    </Button>
                </Box>
            }

        </>
    )
}
