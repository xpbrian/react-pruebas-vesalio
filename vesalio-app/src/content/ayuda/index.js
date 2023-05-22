import { Grid, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import useAuth from "src/hooks/useAuth";
import video1 from './video/citas paciente_Trim.mp4'
import video2 from './video/citas_call_center .mp4'
import video3 from './video/Perfil medico.mp4'
import video4 from './video/Anulacion de cita call center.mp4'
import { useEffect, useState } from "react";

export default function index() {
    const { user } = useAuth()
    const [mostrar1, setMostrarVideo1] = useState(false)
    const [mostrar2, setMostrarVideo2] = useState(false)
    const [mostrar3, setMostrarVideo3] = useState(false)
    const [mostrar4, setMostrarVideo4] = useState(false)

    useEffect(() => {

        if (user.cuenta.tipo_usuario.id === '01') {
            setMostrarVideo1(true)
        }
        if (user.cuenta.tipo_usuario.id === '03') {
            setMostrarVideo3(true)
        }
        if (user.cuenta.tipo_usuario.id === '02' || user.cuenta.tipo_usuario.id === '04' || user.cuenta.tipo_usuario.id === '05'  || user.cuenta.tipo_usuario.id === '06'  || user.cuenta.tipo_usuario.id === '07'  || user.cuenta.tipo_usuario.id === '08') {
            setMostrarVideo2(true)
            setMostrarVideo4(true)
        }
    }, [user])
    useEffect(() => {

        console.log(mostrar1);
        console.log(mostrar2);
        console.log(mostrar3);
        console.log(mostrar4);
    }, [mostrar1,mostrar2,mostrar3,mostrar4])
    return (
        <>
            <Helmet>
                <title>Clínica vesalio -  Ayuda</title>
            </Helmet>
            <PageTitleWrapper>
                <Grid container alignItems="center">
                    <Grid item xs={12} lg={12}>
                        <Typography variant={'h3'} component={'h3'} gutterBottom>
                            Videos de ayuda
                        </Typography>


                    </Grid>
                </Grid>
            </PageTitleWrapper>
            <Grid container alignItems="center" >
                <Grid item xs={12} lg={4} >
                    {
                        mostrar1 &&
                        <video controls >
                            <source src={video1} type="video/mp4" />
                            <track src="myvideo_en.vtt" kind="captions" label="English" />
                        </video>
                    }
                    {
                        mostrar3 &&
                        <video controls >
                            <source src={video2} type="video/mp4" />
                            <track src="myvideo_en.vtt" kind="captions" label="English" />
                        </video>
                    }
                    {
                        mostrar2 &&
                        <video controls >
                            <source src={video3} type="video/mp4" />
                            <track src="myvideo_en.vtt" kind="captions" label="English" />
                        </video>
                    }
                </Grid>

            </Grid>
            <Grid container alignItems="center" >
                <Grid item xs={12} lg={4} >

                    {
                        mostrar4 &&
                        <video controls >
                            <source src={video4} type="video/mp4" />
                            <track src="myvideo_en.vtt" kind="captions" label="English" />
                        </video>
                    }

                </Grid>

            </Grid>
        </>
    )
}
