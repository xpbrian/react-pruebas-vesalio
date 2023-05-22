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
} from '@mui/material';

import { useTranslation } from 'react-i18next';
import CheckIcon from '@mui/icons-material/Check';
import { useEffect, useState } from 'react';
import axios from 'axios';

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

    const handleSeleccionar = async (tipo, item) => {

        let nombre = item.apellidos.toUpperCase().trim() + item.nombres.toUpperCase().trim()
        let compuesto = ''
        for (let i = 0; i < nombre.split(' ').length; i++) {
            if (nombre.split(' ')[i].length > 0) {
                compuesto += nombre.split(' ')[i]
            }
        }
        const rpta = await axios.post(`http://apis-vesalio.com.pe/getHistoriasSISCOMPSin`, {
            numero: compuesto,
        })

        handleSleccionarPaciente(tipo, { ...rpta.data.recordset[0], Nro_DocIdenti: item.documento })
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
                                <TableCell >{t('Apellidos y nombres')}</TableCell>
                                <TableCell align="right">{t('Seleccionar')}</TableCell>
                            </TableRow>
                        </TableHeadWrapper>
                        <TableBody>
                            {datos.map((x, i) => i === 0 && <TableRow hover key={i}>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <Box ml={1.5}>
                                            <Typography color="text.primary" variant="h5" noWrap>
                                                {x.apellidos + ' ' + x.nombres}
                                            </Typography>
                                            <Typography variant="subtitle1" noWrap>
                                                {x.fecha_nacimiento.split('T')[0]}
                                            </Typography>
                                        </Box>
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
