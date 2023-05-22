import { Fragment, useEffect, useState } from 'react';

import {
    Box,
    ListItemText,
    Divider,
    List,
    Card,
    Button,
    Typography,
    styled,
    ListItem,
    OutlinedInput,
    InputAdornment,
    FormControl,
    useTheme
} from '@mui/material';
import Scrollbar from 'src/components/Scrollbar';

import { useTranslation } from 'react-i18next';
import CheckIcon from '@mui/icons-material/Check';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import Text from 'src/components/Text';
import useLayoutContext from 'src/hooks/useAuthLayout';





const OutlinedInputWrapper = styled(OutlinedInput)(
    ({ theme }) => `
      background-color: ${theme.colors.alpha.white[100]};

      .MuiOutlinedInput-notchedOutline {
          border: 0;
      }
  `
);

const ListWrapper = styled(List)(
    () => `
      .MuiListItem-root:last-of-type + .MuiDivider-root {
          display: none;
      }
  `
);

function Block10({ handleSeleccionar }) {
    const { t } = useTranslation();
    const theme = useTheme();
    const { empresasSistcomp } = useLayoutContext()
    const [filtro, setFiltro] = useState('')
    const [tamano, setTamano] = useState(0)
    const [datos, setDatos] = useState([])
    const [display, setDisplay] = useState(false)
    const [itemSelect, setItemSelect] = useState(false)

    useEffect(() => {
        if (filtro.length >= 3) {
            setDatos(empresasSistcomp.filter(x => x.Des_Empresa.toUpperCase().includes(filtro.toUpperCase())))
            setTamano(410)

        } else {
            setDatos([])
            setTamano(0)
        }
    }, [filtro, empresasSistcomp])

    const handleClicSeleccionar = (codEmpresa) => {
        handleSeleccionar(codEmpresa)
        setTamano(0)
        setDisplay(true)
        setItemSelect(datos.find(x => x.Cod_Empresa === codEmpresa))
    }
    return (
        <Card>
            {
                display && <><Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    p={2}
                >
                    <Box>
                        <Typography
                            variant="caption"
                            fontWeight="bold"
                            sx={{
                                fontSize: `${theme.typography.pxToRem(12)}`
                            }}
                        >
                            {itemSelect.Des_Empresa}
                        </Typography>
                        <Typography variant="h4">  {itemSelect.Cod_Empresa}</Typography>
                    </Box>
                    <Button
                        size="small"
                        variant="text"
                        color="secondary"
                    >
                        {t('Limpiar')}
                    </Button>
                </Box>
                    <Divider /></>
            }
            {
                !display && <>      <Box>
                    <FormControl variant="outlined" fullWidth>
                        <OutlinedInputWrapper
                            type="text"
                            value={filtro}
                            onChange={(e) => setFiltro(e.target.value)}
                            placeholder={t('Empresas...')}
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchTwoToneIcon />
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Box>
                    <Divider /></>
            }


            <Box
                sx={{
                    height: tamano,

                }}
            >
                <Scrollbar>
                    <ListWrapper disablePadding>
                        {datos.map((item) => (
                            <Fragment key={item.Cod_Empresa}>
                                <ListItem
                                    sx={{
                                        '&:hover': {
                                            background: `${theme.colors.alpha.black[5]}`
                                        }
                                    }}
                                    secondaryAction={
                                        <Button
                                            size="small"
                                            variant="text"
                                            color="secondary"
                                            startIcon={<CheckIcon />}
                                            onClick={() => handleClicSeleccionar(item.Cod_Empresa)}
                                            sx={{
                                                alignSelf: 'center',
                                                padding: `${theme.spacing(0.5, 1.6, 0.5, 1.2)}`,
                                                backgroundColor: `${theme.colors.secondary.lighter}`,
                                                textTransform: 'uppercase',
                                                fontSize: `${theme.typography.pxToRem(11)}`,
                                                '&:hover': {
                                                    backgroundColor: `${theme.colors.secondary.main}`,
                                                    color: `${theme.palette.getContrastText(
                                                        theme.colors.secondary.main
                                                    )}`
                                                }
                                            }}
                                        >
                                            {t('Seleccionar')}
                                        </Button>
                                    }
                                >
                                    <ListItemText
                                        sx={{
                                            flexGrow: 0,
                                            maxWidth: '50%',
                                            flexBasis: '50%'
                                        }}
                                        disableTypography
                                        primary={
                                            <Typography
                                                sx={{
                                                    pb: 0.6
                                                }}
                                                color="text.primary"
                                                variant="h5"
                                            >
                                                {item.Des_Empresa}
                                            </Typography>
                                        }
                                        secondary={
                                            <>
                                                <Box display="flex" alignItems="flex-start">

                                                    <Typography
                                                        sx={{
                                                            fontSize: `${theme.typography.pxToRem(11)}`,
                                                            lineHeight: 1
                                                        }}
                                                        variant="body1"
                                                    >
                                                        <Text color="primary"> {item.Nro_RUC}</Text>
                                                    </Typography>
                                                </Box>
                                            </>
                                        }
                                    />
                                </ListItem>
                                <Divider />
                            </Fragment>
                        ))}
                    </ListWrapper>
                </Scrollbar>
            </Box>
            <Divider />
        </Card>
    );
}

export default Block10;
