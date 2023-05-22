import React, { useRef, useState } from 'react'
import { Box, styled, OutlinedInput, InputAdornment, Button, FormControl, Menu, MenuItem, Divider, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useLayoutContext from 'src/hooks/useAuthLayout';
import KeyboardArrowDownTwoToneIcon from '@mui/icons-material/KeyboardArrowDownTwoTone';
import axios from 'axios';
import ResultBuscaPaciente from './ResultBuscaPaciente'

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
    const { tipoDocumentosSistComp, mostrarComponent } = useLayoutContext()
    const actionRef1 = useRef(null);
    const [openPeriod, setOpenMenuPeriod] = useState(false);
    const [period, setPeriod] = useState(tipoDocumentosSistComp[0]);
    const [text, setText] = useState('')
    const [lista, setlista] = useState([]);
    const [mostrar, setMostrar] = useState(false);

    const handleBuscarPaciente = async () => {
        const rpta = await axios.post(`http://apis-vesalio.com.pe/historiaSistcomp`, {
            numero: text, tipo: period.id
        })
        console.log(rpta.data)
        setlista(rpta.data.recordset.sort(function (a, b) {
            if (a.Nro_Historia > b.Nro_Historia) {
                return 1;
            }
            if (a.Nro_Historia < b.Nro_Historia) {
                return -1;
            }
            // a must be equal to b
            return 0;
        }));
        setMostrar(rpta.data.recordset.length === 0 && true)
    }

    return (
        <>

            <Box p={2}>
                <FormControl variant="outlined" fullWidth>
                    <OutlinedInputWrapper
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        type="number"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleBuscarPaciente()
                            }
                        }}
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

                                <Button
                                    variant="outlined"
                                    ref={actionRef1}
                                    onClick={() => setOpenMenuPeriod(true)}
                                    sx={{
                                        mr: 1
                                    }}
                                    endIcon={<KeyboardArrowDownTwoToneIcon fontSize="small" />}
                                >
                                    {period.title}
                                </Button>
                                <Menu
                                    disableScrollLock
                                    anchorEl={actionRef1.current}
                                    onClose={() => setOpenMenuPeriod(false)}
                                    open={openPeriod}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right'
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right'
                                    }}
                                >
                                    {tipoDocumentosSistComp.map((_period) => (
                                        <MenuItem
                                            key={_period.id}
                                            onClick={() => {
                                                setPeriod(_period);
                                                setOpenMenuPeriod(false);
                                            }}
                                        >
                                            {_period.title}
                                        </MenuItem>
                                    ))}
                                </Menu>
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
                            contenido: 'registrarPacienteAdminsionTriaje',
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
