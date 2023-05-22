import { useEffect, useState } from 'react';

import {
  Grid,
  Chip,
  Typography,
  Card,
  Box,
  Avatar,
  Divider,
  styled,
  TablePagination,
  Link,
  Button,
  useTheme,
  useMediaQuery
} from '@mui/material';
import useAuthLayout from 'src/hooks/useAuthLayout'
import MenuResultsItem from './MenuResultsItem';
import Label from 'src/components/Label';

const applyPagination = (medicosLista, page, limit) => {
  return medicosLista.slice(page * limit, page * limit + limit);
};

const Results = ({ lista: datos, filtroMedico }) => {

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('md'));
  const { mostrarComponent, dias } = useAuthLayout()
  const [page, setPage] = useState(0);
  const { especialidad } = useAuthLayout()
  const [limit, setLimit] = useState(mobile ? 5 : 10);
  const [lista, setLista] = useState([])
  const handlePageChange = (_event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };
  useEffect(() => {
    if (mobile) {
      setLimit(5)
    } else {
      setLimit(10)
    }
  }, [mobile])

  useEffect(() => {
    let array = filtroMedico === '' ? datos : datos.filter(x => x.id_usuario === filtroMedico)
    setLista(array)

  }, [datos, filtroMedico])

  const paginatedmedicosLista = applyPagination(lista, page, limit);

  const AvatarWrapper = styled(Avatar)(
    ({ theme }) => `
        height: ${theme.spacing(12)};
        width: ${theme.spacing(12)};
`
  );

  const ChipWrapper = styled(Chip)(
    ({ theme }) => `
        background: ${theme.colors.alpha.black[10]};
        margin: ${theme.spacing(0.5)};
        padding: ${theme.spacing(1)};
        height: 28px;
        line-height: 28px;
        font-weight: bold;
`
  );
  return (
    <>
      <Grid container spacing={4}>
        {
          mobile && <Grid item xs={12} >
            <Card
              sx={{
                p: 2
              }}
            >
              <TablePagination
                component="div"
                labelRowsPerPage={"Páginas:"}
                count={lista.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 50, lista.length]}
              />
            </Card>
          </Grid>
        }

        {paginatedmedicosLista.sort(function (a, b) {
          if (a.nombres > b.nombres) {
            return 1;
          }
          if (a.nombres < b.nombres) {
            return -1;
          }
          // a must be equal to b
          return 0;
        }).map((job) => {
          return (
            <Grid key={job.id_usuario} item xs={12} md={6}>
              <Card>
                <Box
                  p={3}
                  display="flex"
                  alignItems="flex-start"
                  justifyContent="space-between"
                >
                  <AvatarWrapper src={job.company_logo} variant="rounded" />
                </Box>
                <Box px={3}>
                  <Link href="#" onClick={() => mostrarComponent({
                    contenido: 'verMedico',
                    estado: true,
                    size: 'xs',
                    item: job
                  }, 'modalOpen')}>
                    <Typography
                      variant="h4"
                      sx={{
                        mb: 1
                      }}
                    >
                      Médico: {job.nombres}
                    </Typography>
                  </Link>
                  <Label color="primary" sx={{ mb: 1 }}>{especialidad.find(x => x.id_especialidad === job.especialidades[0]).epecialidad}</Label>
                  <Typography variant="subtitle1" >Dias de Atención</Typography>
                </Box>
                <Box px={2} py={1}>
                  {job.dia.map((value) => {
                    return (
                      <ChipWrapper
                        key={value}
                        color="secondary"
                        label={dias.find(x => x.id === value).value}
                      />
                    );
                  })}
                </Box>

                <Divider />
                <Box px={3} py={2}>
                  <Grid
                    container
                    spacing={3}
                    justifyContent="center"
                    alignItems="center">
                    <Grid item md={6}>
                      {job.especialidades.length === 1 ?
                        <Button
                          size="small"
                          fullWidth
                          variant="outlined"
                          onClick={() => mostrarComponent({
                            contenido: 'cita',
                            estado: true,
                            title: 'Generar cita con: Dr.' + job.nombres,
                            subtitle: especialidad.find(x => x.id_especialidad === job.especialidades[0]).epecialidad,
                            item: {
                              job
                            }
                          }, 'drawerOpen')}>
                          {'Seleccionar'}
                        </Button> :
                        <MenuResultsItem job={job} />}
                    </Grid>
                  </Grid>
                </Box>
              </Card>
            </Grid>
          );
        })}
        <Grid item xs={12}>
          <Card
            sx={{
              p: 2
            }}
          >
            <TablePagination
              component="div"
              count={lista.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 50, lista.length]}
              labelRowsPerPage={"Páginas:"}
              labelDisplayedRows={({ from, to, count }) => { return `${from}–${to} de ${count !== -1 ? count : `${to}`}`; }}
            />
          </Card>
        </Grid>
      </Grid>
    </>
  );
};


export default Results;
