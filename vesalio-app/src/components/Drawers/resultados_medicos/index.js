import React, { useEffect, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Grid, styled, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useLayoutContext from 'src/hooks/useAuthLayout';
import Result from 'src/content/resultado_doctores/Results'
import axios from 'axios';

const AccordionSummaryWrapper = styled(AccordionSummary)(
    () => `
        &.Mui-expanded {
          min-height: 48px;
        }
  
        .MuiAccordionSummary-content.Mui-expanded {
          margin: 12px 0;
        }
    `
);

export default function Index() {
    const { drawerOpen } = useLayoutContext()
    const [openAcordion, setOpenAcordion] = useState({ reporteUso: true })
    const [lista, setLista] = useState([])


    useEffect(() => {
        const handleEnviar = async () => {
            if (drawerOpen.item) {
                const enviar = await axios.post(`http://apis-vesalio.com.pe/resultadosMedicos`, { paciente: drawerOpen.item.documento_paciente })
                setLista(enviar.data);
            }

        }
        handleEnviar()
    }, [drawerOpen])
    const openAcordionClick = (id) => {
        setOpenAcordion(x => {
            return {
                ...x,
                [id]: !x[id]
            }
        })
    }

    return (
        <>
            <Accordion
                sx={{
                    p: 1
                }}
                expanded={openAcordion.reporteUso}
            >
                <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />} onClick={() => openAcordionClick('reporteUso')}>
                    <Typography variant="h5">{'Resultados médicos'}</Typography>
                </AccordionSummaryWrapper>
                <AccordionDetails
                    sx={{
                        p: 0
                    }}
                >
                    <Grid
                        container
                        direction="row"
                        sx={{ px: 2 }}
                        // justifyContent="center"
                        // alignItems="stretch"
                        spacing={1}
                    >
                        <Grid item xs={12} lg={12} md={12}>
                            <Result lista={lista} />
                        </Grid>

                    </Grid>
                </AccordionDetails>
            </Accordion>

        </>
    )
}
