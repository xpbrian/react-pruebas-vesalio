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
    const handleSeleccionar = (item) => {
        handleSleccionarPaciente(item)
    }

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
                            {lista.map(x => <TableRow hover key={x.id}>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <Box ml={1.5}>
                                            <Typography color="text.primary" variant="h5" noWrap>
                                                {x.nombres}
                                            </Typography>
                                            <Typography variant="subtitle1" noWrap>
                                                {x.fecha_nacimiento.split('T')[0]}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="h5">{x.documento}</Typography>
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
                                                fontSize: `${theme.typography.pxToRem(12)}`,
                                                lineHeight: 1
                                            }}
                                            variant="body1"
                                        >
                                            <Text color={x.historia === 'Sin historia' ? 'error' : 'info'}>{x.historia}</Text>
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">
                                    <Tooltip
                                        arrow
                                        placement="top"
                                        title={t('Seleccionar')}
                                    >
                                        <IconButtonWrapper size="small" color="success" onClick={() => handleSeleccionar(x)}>
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
