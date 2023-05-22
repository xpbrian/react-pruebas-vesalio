import { Box, Divider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'


export const Ticket = React.forwardRef((props, ref) => {

    const [datos, setDatos] = useState(null)

    useEffect(() => {
        setDatos(props.list)
    }, [props])
    useEffect(() => {
        console.log(datos)
    }, [datos])

    return (
        <div ref={ref}>

            {
                datos !== null && <Box style={{ padding: "0rem 2rem 2rem 2rem", fontFamily: 'Century Gothic' }}>

                    <Box style={{ display: "flex", fontSize: "10px", marginTop: "20px" }}>
                        <Box><img width={100} src={'/static/images/img/logoLogin.png'} alt='imgVesalio' /></Box>
                        <Box style={{ textAlign: "center", marginTop: "20px", marginLeft: "20px" }}>
                            <Typography style={{ fontSize: "12px" }}><b>Clínica Vesalio</b></Typography>
                            <Typography style={{ fontSize: "8px" }}><b>Comprobante de Turno</b></Typography>
                        </Box>
                    </Box>
                    <Divider />

                    <Box style={{ marginTop: "10px" }}>
                        <Typography style={{ fontSize: "10px" }}><b>Fecha y Hora:</b>{` ${datos.fecha.split('T')[0].split('-')[2] + '-' + datos.fecha.split('T')[0].split('-')[1] + '-' + datos.fecha.split('T')[0].split('-')[0]} ${datos.hora}`} </Typography>
                    </Box>
                    <Box style={{ marginTop: "0px" }}>
                        <Typography style={{ fontSize: "10px" }}><b>Profesional:</b>{` ${datos.nombre_doctor}`}</Typography>
                    </Box>
                    <Box style={{ marginTop: "0px" }}>
                        <Typography style={{ fontSize: "10px" }}><b>Hora Turno:</b>{` ${datos.hora}`}</Typography>
                    </Box>
                    <Box style={{ marginTop: "0px" }}>
                        <Typography style={{ fontSize: "10px" }}><b>Especialidad:</b>{` ${datos.especialidad_nombre}`}</Typography>
                    </Box>
                    <Box style={{ marginTop: "0px" }}>
                        <Typography style={{ fontSize: "10px" }}><b>Consultorio:</b>{` ${datos.lugar_nombre}`}</Typography>
                    </Box>
                    <Box style={{ marginTop: "18px" }}>
                        <Typography style={{ fontSize: "10px" }}><b>Paciente:</b>{` ${datos.nombre_paciente}`}</Typography>
                    </Box>
                    <Box style={{ marginTop: "0px" }}>
                        <Typography style={{ fontSize: "10px" }}><b>Fecha y Hora de Emisión:</b>{` ${datos.created_at.split('T')[0].split('-')[2] + '-' + datos.created_at.split('T')[0].split('-')[1] + '-' + datos.created_at.split('T')[0].split('-')[0]}`}</Typography>
                    </Box>
                    <Box style={{ marginTop: "0px" }}>
                        <Typography style={{ fontSize: "10px" }}><b>Registrado por:</b>{` ${datos.nombre_usuario}`}</Typography>
                    </Box>
                    <Box style={{ marginTop: "0px" }}>
                        <Typography style={{ fontSize: "10px" }}><b>Impreso por:</b>{` ${datos.nombre_usuario}`}</Typography>
                    </Box>
                    <Box style={{ marginTop: "18px" }}>
                        <Typography style={{ fontSize: "10px" }}>Los cambios se realizan con 48hs de anticipación a nuestra central telefónica N°. 618 9999</Typography>
                    </Box>

                </Box>
            }



        </div>
    )
})
