import React, { useRef, useState } from 'react'
import { Box, TableCell, TableRow, Typography, Button, Divider, Grid, Tooltip, IconButton } from '@mui/material'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditIcon from '@mui/icons-material/Edit';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import PermDeviceInformationIcon from '@mui/icons-material/PermDeviceInformation';
// import { Print, NoPrint } from "react-easy-print";
// import printJS from "print-js";
// import PrintProvider from 'react-easy-print'
import ReactToPrint from 'react-to-print';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import SitedImpresion from '../sited';

export default function FilasTicket({ list, retornarGrado, anularCita, addObservacion, addMensajeWsp, verObservacion, mostrarComponent, editarPaciente, addTeleconsulta }) {


    const componentRef = useRef();
    
    const [visibiliti, setVisibiliti] = useState(false);

 

    return (
        <>
            <TableRow onMouseEnter={() => setVisibiliti(true)} onMouseLeave={() => setVisibiliti(false)} hover key={list.id}>
                <TableCell>
                    <Tooltip title={('Editar paciente')} arrow>
                        <IconButton
                            size="small"
                            color="secondary"
                            onClick={() => editarPaciente(list)}>
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Box style={{ display: visibiliti ? "flex" : "none", color: "transparent", marginTop: "20px" }}>
                        <IconButton
                            size="small"
                            style={{ color: "transparent" }}
                            onClick={null}>
                            <FileUploadIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </TableCell>
                <TableCell>
                    <Box style={{ display: "flex", flexDirection: "column" }}>
                        <Typography
                            noWrap
                            variant="subtitle1"
                            color="text.primary"
                        >
                            <b>{list.fecha.split('T')[0].split('-')[2] + '-' + list.fecha.split('T')[0].split('-')[1] + '-' + list.fecha.split('T')[0].split('-')[0]}</b>
                        </Typography>
                        <Typography noWrap color="text.secondary">
                            {list.hora}
                        </Typography>
                    </Box>


                    <Box style={{ display: visibiliti ? "flex" : "none", justifyContent: "space-between", marginTop: "20px" }}>
                        <Tooltip title={('Subir pdf')} arrow>
                            <IconButton
                                size="small"
                                color="secondary"
                                onClick={() => mostrarComponent({
                                    contenido: 'addFirma',
                                    estado: true,
                                    size: 'xs',
                                    item: list.documento_paciente
                                }, 'modalOpen')}>
                                <FileUploadIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={('Anular cita')} arrow>
                            <IconButton
                                size="small"
                                color="secondary"
                                onClick={() => anularCita(list.id)}>
                                <DeleteTwoToneIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>

                    </Box>

                </TableCell>
                <TableCell>
                    <Box style={{ display: "flex", flexDirection: "column" }}>
                        <Typography
                            noWrap
                            variant="subtitle1"
                            color="text.primary"
                        >
                            <b>{`${list.nombre_paciente}`}</b>
                        </Typography>
                        <Typography noWrap color="text.secondary">
                            {list.documento_paciente}
                        </Typography>
                    </Box>

                    <Box style={{ display: visibiliti ? "flex" : "none", justifyContent: "space-around", marginTop: "20px" }}>
                        <Tooltip title={('Agregar observación')} arrow>
                            <IconButton
                                size="small"
                                color="secondary"
                                onClick={() => addObservacion(list.id)}>
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={('Ver observaciones')} arrow>
                            <IconButton
                                size="small"
                                color="secondary"
                                onClick={() => verObservacion(list.id)}>
                                <PermDeviceInformationIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={('Enviar mensaje paciente')} arrow>
                            <IconButton
                                size="small"
                                color="secondary"
                                onClick={() => addMensajeWsp(list.celular)}>
                                <PhoneAndroidIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={
                            ('Agregar link de teleconsulta')} arrow>
                            <IconButton
                                size="small"
                                color="secondary"
                                onClick={() => addTeleconsulta(list)}>
                                <VideoCameraFrontIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <SitedImpresion list={list} />
                    </Box>
                </TableCell>
                <TableCell>
                    <Typography
                        noWrap
                        variant="subtitle1"
                        color="text.primary"
                    >
                        <b>{list.nombre_doctor}</b>
                    </Typography>
                    <Typography noWrap color="text.secondary">
                        {list.especialidad_nombre}
                    </Typography>
                    <Box style={{ display: visibiliti ? "flex" : "none", color: "transparent", marginTop: "20px" }}>
                        <IconButton
                            size="small"
                            style={{ color: "transparent" }}
                            onClick={null}>
                            <FileUploadIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </TableCell>
                <TableCell>
                    <Typography
                        noWrap
                        variant="subtitle1"
                        color="text.primary"
                    >
                        {
                            retornarGrado(list.grado_emergencia)
                        }
                    </Typography>
                    <Box style={{ display: visibiliti ? "flex" : "none", color: "transparent", marginTop: "20px" }}>
                        <IconButton
                            size="small"
                            style={{ color: "transparent" }}
                            onClick={null}>
                            <FileUploadIcon fontSize="small" />
                        </IconButton>
                    </Box>

                </TableCell>
                <TableCell>
                    <Typography
                        noWrap
                        variant="subtitle1"
                        color="text.primary"
                    >
                        <b>{list.lugar_nombre}</b>
                    </Typography>
                    <Typography noWrap color="text.secondary">
                        {list.piso_nombre}
                    </Typography>
                    <Box style={{ display: visibiliti ? "flex" : "none", color: "transparent", marginTop: "20px" }}>
                        <IconButton
                            size="small"
                            style={{ color: "transparent" }}
                            onClick={null}>
                            <FileUploadIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </TableCell>
                <TableCell>
                    {list.estado}
                    <Box style={{ display: visibiliti ? "flex" : "none", color: "transparent", marginTop: "20px" }}>
                        <IconButton
                            size="small"
                            style={{ color: "transparent" }}
                            onClick={null}>
                            <FileUploadIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </TableCell>

                <TableCell>
                    <Typography
                        noWrap
                        variant="subtitle1"
                        color="text.primary"
                    >
                        <b>{list.celular}</b>
                    </Typography>
                    <Box style={{ display: visibiliti ? "flex" : "none", color: "transparent", marginTop: "20px" }}>
                        <IconButton
                            size="small"
                            style={{ color: "transparent" }}
                            onClick={null}>
                            <FileUploadIcon fontSize="small" />
                        </IconButton>
                    </Box>

                </TableCell>
                {/* <TableCell>
                                        <Typography
                                            noWrap
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            <b>{list.Nro_TelMovil}</b>
                                        </Typography>

                                    </TableCell> */}
                <TableCell>
                    {list.observacion}
                    <Box style={{ display: visibiliti ? "flex" : "none", color: "transparent", marginTop: "20px" }}>
                        <IconButton
                            size="small"
                            style={{ color: "transparent" }}
                            onClick={null}>
                            <FileUploadIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </TableCell>
                <TableCell>
                    <Typography
                        noWrap
                        variant="subtitle1"
                        color="text.primary"
                    >
                        {list.nombre_usuario}
                    </Typography>
                    <Box style={{ display: visibiliti ? "flex" : "none", color: "transparent", marginTop: "20px" }}>
                        <IconButton
                            size="small"
                            style={{ color: "transparent" }}
                            onClick={null}>
                            <FileUploadIcon fontSize="small" />
                        </IconButton>
                    </Box>

                </TableCell>
                <TableCell>
                    <Typography
                        noWrap
                        variant="subtitle1"
                        color="text.primary"
                    >
                        <b>{list.created_at.split('T')[0].split('-')[2] + '-' + list.created_at.split('T')[0].split('-')[1] + '-' + list.created_at.split('T')[0].split('-')[0]}</b>
                    </Typography>
                    <Typography
                        noWrap
                        variant="subtitle1"
                        color="text.primary"
                    >
                        <b> {((parseInt(list.created_at.split('T')[1].split('.')[0].split(':')[0]) - 5) < 0 ? (parseInt(list.created_at.split('T')[1].split('.')[0].split(':')[0]) - 5) * -1 : (parseInt(list.created_at.split('T')[1].split('.')[0].split(':')[0]) - 5)) + ':' + list.created_at.split('T')[1].split('.')[0].split(':')[1]}</b>

                    </Typography>
                    <Box style={{ display: visibiliti ? "flex" : "none", color: "transparent", marginTop: "20px" }}>
                        <IconButton
                            size="small"
                            style={{ color: "transparent" }}
                            onClick={null}>
                            <FileUploadIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </TableCell>
                <TableCell>

                    {/* <a href={`https://vesalio.alephoo.com/facturacion/proof_turn/generate_proof_turn/${list.id}`} rel="noreferrer" target="_blank">Ticket</a> */}



                    {/* <ContenedorTicket
                                                list={list}
                                            /> */}



                    <Box>

                        <Grid item lg={5} sx={{ mt: 0 }}>
                            <ReactToPrint
                                trigger={() => (
                                    <Button style={{ width: "100px", fontSize: "16px" }} color="primary" fontSize="large" variant="contained" fullWidth>
                                        Imprimir
                                    </Button>
                                )}
                                content={() => componentRef.current}
                            />
                            <div style={{ display: "none" }}>
                                <div ref={componentRef} media="print" id="test">

                                    <Box style={{ padding: "0rem 1rem 0rem 1rem", fontFamily: 'Segoe' }}>

                                        <Box style={{ display: "flex", marginTop: "00px" }}>
                                            <Box><img width={120} src={'/static/images/img/logoLogin.png'} alt='imgVesalio' /></Box>

                                            <Box style={{ textAlign: "center", marginTop: "10px", marginLeft: "0px" }}>

                                                <Typography style={{ fontFamily: 'Pexico Regular', fontSize: "14px" }}><b>Clínica Vesalio</b></Typography>
                                                <Typography style={{ fontFamily: 'Arial', fontSize: "14px" }}><i>Comprobante</i></Typography>

                                                <Typography style={{ fontFamily: 'Arial', fontSize: "14px" }}><i>de Turno</i></Typography>
                                            </Box>
                                        </Box>
                                        <Divider />

                                        {/* <Box style={{ marginTop: "10px" }}>
                                            <Typography style={{ fontSize: "15px",fontFamily: 'Arial'  }}><b>Fecha turno:</b>{` ${list.fecha.split('T')[0].split('-')[2] + '-' + list.fecha.split('T')[0].split('-')[1] + '-' + list.fecha.split('T')[0].split('-')[0]}`} </Typography>
                                        </Box>
                                        <Box style={{ marginTop: "10px" }}>
                                            <Typography style={{ fontSize: "15px",fontFamily: 'Arial'  }}><b>Fecha turno:</b>{list.fecha} </Typography>
                                        </Box> */}
                                        <Box style={{ marginTop: "10px" }}>
                                            <Typography style={{ fontSize: "15px", fontFamily: 'Arial' }}><b>Fecha turno:</b>{` ${new Date(list.fecha).toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}`} </Typography>
                                        </Box>
                                        <Box style={{ marginTop: "0px" }}>
                                            <Typography style={{ fontSize: "15px" }}><b>Hora Turno:</b>{` ${list.hora.split(':')[0] + ':' + list.hora.split(':')[1]} hrs`}</Typography>
                                        </Box>
                                        <Box style={{ marginTop: "0px" }}>
                                            <Typography style={{ fontSize: "15px", }}><b>Profesional:</b>{` ${list.nombre_doctor}`}</Typography>
                                        </Box>
                                        <Box style={{ marginTop: "0px" }}>
                                            <Typography style={{ fontSize: "15px", }}><b>Especialidad:</b>{` ${list.especialidad_nombre}`}</Typography>
                                        </Box>
                                        <Box style={{ marginTop: "0px" }}>
                                            <Typography style={{ fontSize: "15px", }}><b>Consultorio:</b>{` ${list.lugar_nombre}`}</Typography>
                                        </Box>
                                        <Box style={{ marginTop: "18px" }}>
                                            <Typography style={{ fontSize: "15px", }}><b>Paciente:</b>{` ${list.nombre_paciente}`}</Typography>
                                        </Box>
                                        <Box style={{ marginTop: "0px" }}>
                                            <Typography style={{ fontSize: "15px", }}><b>Fecha y hora de emisión:</b>{` ${list.created_at.split('T')[0].split('-')[2] + '-' + list.created_at.split('T')[0].split('-')[1] + '-' + list.created_at.split('T')[0].split('-')[0] + ' ' + (parseInt(list.created_at.split('T')[1].split(':')[0]) - 5) + ':' + list.created_at.split('T')[1].split(':')[1]}`}</Typography>
                                        </Box>
                                        <Box style={{ marginTop: "0px" }}>
                                            <Typography style={{ fontSize: "15px", }}><b>Registrado por:</b>{` ${list.nombre_usuario}`}</Typography>
                                        </Box>
                                        <Box style={{ marginTop: "0px" }}>
                                            <Typography style={{ fontSize: "15px", }}><b>Impreso por:</b>{` ${list.nombre_usuario}`}</Typography>
                                        </Box>
                                        <Box style={{ marginTop: "18px" }}>
                                            <Typography style={{ fontSize: "12px", }}>Los cambios se realizan con 48hs de anticipación a nuestra central telefónica N°. 618 9999</Typography>
                                        </Box>

                                    </Box>

                                </div>
                            </div>
                        </Grid>
                        {/* <PrintProvider >
                            <NoPrint>

                                <Button style={{ fontSize: "14px", width: "120px", padding: "8px" }} fontSize="small" variant='contained' onClick={() => {
                                    printJS("test", "html")
                                }}>
                                    Imprimir Ticket
                                </Button>
                                <Print printOnly >
                                    <div media="print" id="test">
                                    

                                        <h1 style={{ fontSize: "30px !important" }} >
                                            .............................................................................
                                        </h1>
                                        <Box style={{ padding: "0rem 2rem 0rem 2rem", fontFamily: 'Segoe' }}>

                                            <Box style={{ display: "flex", marginTop: "00px" }}>
                                                <Box><img width={150} src={'/static/images/img/logoLogin.png'} alt='imgVesalio' /></Box>
                                                <Box><img width={20} src={'https://www.villasalicante.es/wp-content/uploads/2022/02/cuadro-transparente.png'} alt='imgVesalio' /></Box>
                                                <Box style={{ textAlign: "center", marginTop: "10px", marginLeft: "50px" }}>
                                                    <Box><img width={20} src={'https://www.villasalicante.es/wp-content/uploads/2022/02/cuadro-transparente.png'} alt='imgVesalio' /></Box>
                                                    <Typography style={{ fontFamily: 'Pexico Regular' }}><b>Clínica Vesalio</b></Typography>
                                                    <Typography style={{ fontFamily: 'Arial' }}><i>Comprobante</i></Typography>
                                                   
                                                    <Typography style={{ fontFamily: 'Arial' }}><i>de Turno</i></Typography>
                                                </Box>
                                            </Box>
                                            <Divider />

                                            <Box style={{ marginTop: "10px" }}>
                                                <Typography style={{ fontFamily: 'Arial' }}><b>Fecha turno:</b>{` ${list.fecha.split('T')[0].split('-')[2] + '-' + list.fecha.split('T')[0].split('-')[1] + '-' + list.fecha.split('T')[0].split('-')[0]}`} </Typography>
                                            </Box>
                                            <Box style={{ marginTop: "10px" }}>
                                                <Typography style={{ fontFamily: 'Arial' }}><b>Fecha turno:</b>{list.fecha} </Typography>
                                            </Box>
                                            <Box style={{ marginTop: "10px" }}>
                                                <Typography style={{ fontFamily: 'Arial' }}><b>Fecha turno:</b>{` ${new Date(list.fecha).toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}`} </Typography>
                                            </Box>
                                            <Box style={{ marginTop: "0px" }}>
                                                <Typography style={{ fontSize: "12pt", fontFamily: 'velneo' }}><b>Hora Turno:</b>{` ${list.hora.split(':')[0] + ':' + list.hora.split(':')[1]} hrs`}</Typography>
                                            </Box>
                                            <Box style={{ marginTop: "0px" }}>
                                                <Typography style={{}}><b>Profesional:</b>{` ${list.nombre_doctor}`}</Typography>
                                            </Box>
                                            <Box style={{ marginTop: "0px" }}>
                                                <Typography style={{}}><b>Especialidad:</b>{` ${list.especialidad_nombre}`}</Typography>
                                            </Box>
                                            <Box style={{ marginTop: "0px" }}>
                                                <Typography style={{}}><b>Consultorio:</b>{` ${list.lugar_nombre}`}</Typography>
                                            </Box>
                                            <Box><img width={20} src={'https://www.villasalicante.es/wp-content/uploads/2022/02/cuadro-transparente.png'} alt='imgVesalio' /></Box>


                                            <Box style={{ marginTop: "18px" }}>
                                                <Typography style={{}}><b>Paciente:</b>{` ${list.nombre_paciente}`}</Typography>
                                            </Box>
                                            <Box style={{ marginTop: "0px" }}>
                                                <Typography style={{}}><b>Fecha y hora de emisión:</b>{` ${list.created_at.split('T')[0].split('-')[2] + '-' + list.created_at.split('T')[0].split('-')[1] + '-' + list.created_at.split('T')[0].split('-')[0] + ' ' + (parseInt(list.created_at.split('T')[1].split(':')[0]) - 5) + ':' + list.created_at.split('T')[1].split(':')[1]}`}</Typography>
                                            </Box>
                                            <Box style={{ marginTop: "0px" }}>
                                                <Typography style={{}}><b>Registrado por:</b>{` ${list.nombre_usuario}`}</Typography>
                                            </Box>
                                            <Box style={{ marginTop: "0px" }}>
                                                <Typography style={{}}><b>Impreso por:</b>{` ${list.nombre_usuario}`}</Typography>
                                            </Box>
                                            <Box><img width={20} src={'https://www.villasalicante.es/wp-content/uploads/2022/02/cuadro-transparente.png'} alt='imgVesalio' /></Box>

                                            <Box style={{ marginTop: "18px" }}>
                                                <Typography style={{}}>Los cambios se realizan con 48hs de anticipación a nuestra central telefónica N°. 618 9999</Typography>
                                            </Box>

                                        </Box>

                                    </div>
                                </Print>
                            </NoPrint>
                        </PrintProvider> */}
                    </Box>



                    {/* <Box style={{ marginTop: "0px", textAlign: "center" }}>
                                            <div>
                                                <ReactToPrint style={{ textAlign: "right" }}
                                                    trigger={() => <Button style={{ fontSize: "18px", width: "180px" }} variant='contained'>Imprimir Ticket</Button>}
                                                    content={() => componentRef.current}
                                                />
                                                <div style={{ display: "none" }}>

                                                    <Ticket
                                                        // pacienteLl={pacienteLl}
                                                        // datosDiag={datosDiag}
                                                        // descrip={descrip}
                                                        // user={user}
                                                        list={list}
                                                        ref={componentRef} />
                                                </div>
                                            </div>
                                        </Box> */}

                </TableCell>
                {/* <TableCell>
                    <Button variant='text' onClick={() => handleClickSited(list)}>Sited</Button>
                </TableCell> */}
            </TableRow>
        </>
    )
}
