import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography, styled, Button, Divider, Zoom } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useLayoutContext from 'src/hooks/useAuthLayout'
import HorasGeneradas from './SeleccionarHorasGeneradas';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import useAuth from 'src/hooks/useAuth';
import { useSnackbar } from 'notistack';

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
    const { drawerOpen,mostrarComponent } = useLayoutContext()
    const { enqueueSnackbar } = useSnackbar();
    const [horas, setHoras] = useState([])
    const [horaSelected, setHoraSelected] = useState([])
    const [botones, setBotones] = useState([
        { id: '01', display: true, texto: 'Seleccionar todos', color: 'primary' },
        { id: '02', display: false, texto: 'Limpiar', color: 'error' }
    ])
    const {user} = useAuth()
    useEffect(() => {
        let filtro = drawerOpen.item.fechasGeneradasHoras.filter(x => x.id.split('T')[0] === drawerOpen.item.id.split('T')[0])
        console.log(filtro);

        setHoras(filtro);
    }, [drawerOpen])
    const setEventSelected = (id, tipo) => {
        if (tipo) {
            setHoraSelected(x => [...x, id])
        } else {
            setHoraSelected(x => x.reduce((arr, item) => {
                if (item !== id) {
                    arr.push(item)
                }
                return arr
            }, []))
        }   
    }
    const handleClickBoton = (tipo) => {
        setBotones(x => x.reduce((arr, item) => {
            arr.push({ ...item, display: !item.display })
            return arr
        }, []))
        setHoraSelected(tipo === '01' ? horas.map(x => x.id) : [])
    }
    const handleGuardar = async()=>{
        
        let datos = horaSelected.reduce((arr,item)=>{
            let existe = horas.find(x=>x.id === item)
            if(existe !== undefined){
                arr.push({...existe})
            }
            return arr
        },[])
        
        await axios.post('http://apis-vesalio.com.pe/liberarDoctor',{
            datos,
            id_usuario : user._id
        })
        enqueueSnackbar('Registrado correctamente', {
            variant: 'success',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right'
            },
            TransitionComponent: Zoom
        })
        mostrarComponent({
            contenido: '',
            estado: false,
        }, 'drawerOpen')
    }
    return (
        <>
            <Accordion
                sx={{
                    p: 1
                }}
                defaultExpanded
            >
                <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h5">Horas disponibles</Typography>
                </AccordionSummaryWrapper>
                <AccordionDetails
                    sx={{
                        p: 0
                    }}
                >

                    {
                        horas.length > 0 && <Grid container spacing={3}>
                            <Grid item xs={12} md={12} sm={12}>
                                {
                                    botones.filter(x => x.display).map(x => <Button key={x.id} variant="outlined" color={x.color} sx={{ float: 'right', m: 2 }} size='small'
                                        onClick={() => handleClickBoton(x.id)}
                                    >
                                        {x.texto}
                                    </Button>)
                                }

                            </Grid>
                            {horas.map(item => <Grid item xs={12} xl={3} md={4} sm={6} key={item.id}>
                                <HorasGeneradas item={item} horaSelected={horaSelected} setEventSelected={setEventSelected} />
                            </Grid>)}
                        </Grid>
                    }
                </AccordionDetails>
            </Accordion>
            <Divider sx={{ mt: 2 }} />
            <Grid container spacing={3} sx={{ p: 2 }}>
                <Grid item lg={12}>
                    <Button fullWidth variant="outlined" 
                    onClick={handleGuardar}>
                        Liberar horas del doctor
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}
