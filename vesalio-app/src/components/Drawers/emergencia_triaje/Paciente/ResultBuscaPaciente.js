import {
    Box,
    Typography,
    TableHead,
    Tooltip,
    IconButton,
    TableRow,
    TableCell,
    TableBody,
    Table,
    TableContainer,
    styled,
    useTheme
} from '@mui/material';

import { useTranslation } from 'react-i18next';
import CheckIcon from '@mui/icons-material/Check';
import Text from 'src/components/Text';
import { useEffect, useState } from 'react';

const TableHeadWrapper = styled(TableHead)(
    ({ theme }) => `
        .MuiTableCell-root {
            text-transform: none;
            font-size: ${theme.typography.pxToRem(15)};
            padding-top: 0;
            padding-bottom: ${theme.spacing(1)};
            color: ${theme.colors.alpha.black[100]};
        }
  
        .MuiTableRow-root {
            background: transparent;
        }
    `
);

const TableWrapper = styled(Table)(
    () => `
      .MuiTableCell-root {
          border-bottom: 0;
      }
    `
);

const IconButtonWrapper = styled(IconButton)(
    ({ theme }) => `
      transition: ${theme.transitions.create(['transform', 'background'])};
      transform: scale(1);
      transform-origin: center;
  
      &:hover {
          transform: scale(1.1);
      }
    `
);



function ResultBuscaPaciente({ lista, handleSleccionarPaciente }) {
    const { t } = useTranslation();
    const theme = useTheme();

    const handleSeleccionar = (tipo, item) => {
        handleSleccionarPaciente(tipo, item)
    }
    const [datos, setDatos] = useState([])
    useEffect(() => {
        if (lista.length > 0) {
            setDatos(lista)
        }

    }, [lista])
    return (
        <>
            <Box p={2}>
                <TableContainer>
                    <TableWrapper>
                        <TableHeadWrapper>
                            <TableRow>
                                <TableCell>{t('Datos')}</TableCell>
                                <TableCell align="right">{t('#Documento')}</TableCell>
                                <TableCell align="right">{t('Historia')}</TableCell>
                                <TableCell align="right">{t('Seleccionar')}</TableCell>
                            </TableRow>
                        </TableHeadWrapper>
                        <TableBody>
                            {datos.map((x, i) => i === 0 && <TableRow hover key={i}>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <Box ml={1.5}>
                                            <Typography color="text.primary" variant="h5" noWrap>
                                                {x.Des_ApePaterno + ' ' + x.Des_ApeMaterno + ' ' + x.Des_Nombres}
                                            </Typography>
                                            <Typography variant="subtitle1" noWrap>
                                                {x.Fec_Nacimien.split('T')[0]}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="h5">{x.Nro_DocIdenti}</Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Box
                                        mt={0.5}
                                        display="flex"
                                        justifyContent="flex-end"
                                        alignItems="flex-start"
                                    >

                                        <Typography
                                            sx={{
                                                fontSize: `${theme.typography.pxToRem(15)}`,
                                                lineHeight: 1
                                            }}
                                            variant="h5"
                                        >
                                            <Text color={'secondary'}>{x.Nro_Historia} </Text>
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">
                                    <Tooltip
                                        arrow
                                        placement="top"
                                        title={t('Seleccionar')}
                                    >
                                        <IconButtonWrapper size="small" color="success" onClick={() => handleSeleccionar('paciente', x)}>
                                            <CheckIcon />
                                        </IconButtonWrapper>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>)}
                        </TableBody>
                    </TableWrapper>
                </TableContainer>
            </Box>
        </>
    );
}

export default ResultBuscaPaciente;
