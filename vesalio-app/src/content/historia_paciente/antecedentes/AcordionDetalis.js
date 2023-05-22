import { Accordion, AccordionDetails, AccordionSummary, Link, List, ListItemButton, ListItemText, styled, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import useLayoutContext from 'src/hooks/useAuthLayout';

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
const ListItemWrapper = styled(ListItemButton)(
    () => `
    
        &.MuiButtonBase-root {
          border-radius: 0;
        }
    `
);
export default function AcordionDetalisDashboard({ item, datosUsuario, setDatos: setDatosAntecedentes,actualizarView }) {
    const [datos, setDatos] = useState(null)
    const { mostrarComponent } = useLayoutContext()
    useEffect(() => {
        setDatos(item);
    }, [item])

    const openModalList = (type,title) => {
        mostrarComponent({
            contenido: type,
            estado: true,
            title: title,
            subtitle: 'Lista de antecedentes',
            item: { item, datosUsuario, setDatosAntecedentes: (tipo) => setDatosAntecedentes(tipo),actualizarView:() => actualizarView() },

        }, 'drawerOpen')
    }
    
    return (

        <>
            {datos !== null && <Accordion
                sx={{
                    p: 1,
                    display: null
                }}
                expanded
            >
                <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />}>
                    <Link href="#" onClick={() => openModalList(datos.id,datos.title)}><Typography variant="h5">{datos.title}</Typography></Link>
                </AccordionSummaryWrapper>
                <AccordionDetails
                    sx={{
                        p: 0
                    }}
                >
                    <List disablePadding component="div" sx={{ mt: 1 }}>

                        {datos.lista.length > 0 && datos.lista.map((value, ix) => {
                            return (
                                <ListItemWrapper
                                    sx={{
                                        py: 0,
                                        px: 2
                                    }}
                                    key={ix}
                                >
                                    <ListItemText
                                        primary={value.nombre}
                                        primaryTypographyProps={{ variant: 'body1' }}
                                    />
                                </ListItemWrapper>
                            );
                        })}
                    </List>
                </AccordionDetails>
            </Accordion>}


        </>


    )
}
