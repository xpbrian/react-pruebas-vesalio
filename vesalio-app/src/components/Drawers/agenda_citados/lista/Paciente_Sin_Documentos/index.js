import React, { useState } from 'react'
import { Box, styled, OutlinedInput, InputAdornment, Button, FormControl, Divider, Typography, Zoom } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useLayoutContext from 'src/hooks/useAuthLayout';
import KeyboardArrowDownTwoToneIcon from '@mui/icons-material/KeyboardArrowDownTwoTone';
import axios from 'axios';
import ResultBuscaPaciente from './ResultBuscaPaciente'
import { useSnackbar } from 'notistack';

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
export default function Index({ handleSleccionarPaciente }) {
    const { t } = useTranslation();
    const { mostrarComponent } = useLayoutContext()
    const { enqueueSnackbar } = useSnackbar();
    const [text, setText] = useState('')
    const [lista, setlista] = useState([]);
    const [mostrar, setMostrar] = useState(false);

    const handleBuscarPaciente = async () => {
        if (text.length < 3) {
            enqueueSnackbar('Debe digitar como mínimo 3 digitos para realizar la busqueda.', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                },
                TransitionComponent: Zoom
            })
        } else {
            const rpta = await axios.post(`http://apis-vesalio.com.pe/getHistoriasAlephoo`, {
                numero: text
            })
            setlista(rpta.data);
            setMostrar(rpta.data.length === 0 && true)
        }

    }

    return (
        <>

            <Box p={2}>
                <FormControl variant="outlined" fullWidth>
                    <OutlinedInputWrapper
                        value={text}
                        onChange={(e) => {

                            let numeros = '0123456789°!"#$%&/()=?¡*¨[]_:;><'
                            let inserta = true
                            numeros.split('').map((x) => {
                                if (e.target.value.includes(x)) {
                                    inserta = false
                                }
                                return false
                            })
                            if (inserta) {
                                setText(e.target.value)
                            }

                        }}
                        type="text"
                        placeholder={t('Ingrese número de documento de identidad')}
                        endAdornment={
                            <InputAdornment position="end">
                                <ButtonSearch variant="contained" size="small"
                                    onClick={() => handleBuscarPaciente()}>
                                    {t('Buscar')}
                                </ButtonSearch>
                            </InputAdornment>
                        }
                        startAdornment={
                            <InputAdornment position="start">
                                <KeyboardArrowDownTwoToneIcon fontSize="small" />
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
                mostrar && <Box my={2}
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
                    <Button variant="outlined"
                        onClick={() => mostrarComponent({
                            contenido: 'registrarPacienteAdminsionSin',
                            estado: true,
                            size: 'xs',
                            item: text
                        }, 'modalOpen')}
                    >
                        Registrar nuevo paciente
                    </Button>
                </Box>
            }
        </>
    )
}
