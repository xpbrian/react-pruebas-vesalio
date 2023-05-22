
import { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Checkbox, FormControl, FormControlLabel, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import useAuth from 'src/hooks/useAuth';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { Zoom } from '@mui/material'
import Lista from './Lista'
import ContenidoPdf from './ContenidoPdf';
import Text from 'src/components/Text';

export default function CargadorArchivos() {
    const { user } = useAuth()
    const [file, setFile] = useState(null)
    const [fileName, setFileName] = useState(null)
    const [lista, setLista] = useState([])
    const [type, setType] = useState('number')
    const [selected, setSelected] = useState(null)
    const [datosNombre, setdatosNombre] = useState(
        {
            nombre: ""
        }
    )
    const handleBuscarPaciente = async () => {
        try {
            if (datosNombre.nombre.length > 0) {
                const response = await axios.post('http://200.121.91.211:4001/obtenerDatos', {
                    nombrePaciente: datosNombre.nombre,
                    tipo: boxes.find(x => x.activo).id
                })
                console.log(response.data)
                if ((response.status === 200)) {
                    setLista(response.data)
                }
            }else{
                enqueueSnackbar("El campo no puede ir vacio", {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    },
                    TransitionComponent: Zoom,
                    autoHideDuration: 3000
                })
            }

        } catch (error) {
            console.log(error)
        }
    }
    const handleSleccionarPaciente = (item) => {
        setSelected(item)
    }
    const fileToBase64 = (file, cb) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
            cb(null, reader.result)
        }
        reader.onerror = function (error) {
            cb(error, null)
        }
    }

    const onUploadFileChange = ({ target }) => {
        if (target.files < 1 || !target.validity.valid) {
            return
        }
        fileToBase64(target.files[0], (err, result) => {
            if (result) {
                setFile(result)
                setFileName(target.files[0])
            }
        })
    }

    const { enqueueSnackbar } = useSnackbar();

    const handleSubir = async (e) => {
        e.preventDefault()
        try {

            let errores = []
            if (selected === null && boxes.find(x => x.activo).id === 3) {
                errores.push("Debe seleccionar un paciente")
            } else if (file === null) {
                errores.push("Debe seleccionar un archivo")
            }

            if (errores.length > 0) {
                errores.map(x => enqueueSnackbar(x, {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    },
                    TransitionComponent: Zoom,
                    autoHideDuration: 3000
                }))
            } else {
                const response = await axios.post('http://200.121.91.211:4001/generarPdfResultados', {
                    contenido: file,
                    dniDoctor: user.datos.numero_documento,
                    ruta: '\\pruebaPdf\\',
                    nombrePaciente:  boxes.find(x => x.activo).id === 3 ? selected.Nro_Historia : datosNombre.nombre,
                    tipo: boxes.find(x => x.activo).id
                })

                if ((response.status === 200)) {
                    enqueueSnackbar('Agregado correctamente, espere unos segundos', {
                        variant: 'success',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'right'
                        },
                        TransitionComponent: Zoom,
                        autoHideDuration: 3000
                    })
                    setTimeout(() => { window.location.reload() }, 3000)
                }
            }

        } catch (error) {
            console.log(error)
        }
    }


    const handleNombre = (event) => {
        if (true) {
            setdatosNombre({
                ...datosNombre,
                [event.target.name]: event.target.value,
            })
        }
    }
    const [boxes, setBoxes] = useState([
        {
            id: 1,
            value: "Historia Clínica",
            activo: true
        },
        {
            id: 2,
            value: "Número de Autorización",
            activo: false
        },
        {
            id: 3,
            value: "Apellidos",
            activo: false
        }
    ])
    useEffect(() => {
        if (boxes.find(x => x.activo).id === 3) {
            setType('text')
        } else {
            setType('number')
        }
    }, [boxes])

    const handleChange = (e) => {
        setBoxes(x => x.reduce((arr, item) => {
            arr.push({
                ...item,
                activo: parseInt(e.target.name) === item.id && true
            })
            return arr
        }, []))
    };

    return (
        <>
            <Typography style={{ textAlign: "center", marginTop: "30px" }} variant="h2">
                Repositorio de Archivos
            </Typography>
            <Card style={{ margin: "30px 2rem 30px 2rem" }}>
                <CardContent style={{ display: "flex", justifyContent: "center", justifyItems: "center", alignContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <Card style={{ boxShadow: "9px -7px 7px -7px #333", padding: "20px", border: "1px solid #efefef", display: "flex", flexDirection: "column" }} >
                        <FormControl>
                            <Box style={{ display: "flex", justifyContent: "center" }}>
                                {
                                    boxes.map(item =>
                                        <FormControlLabel
                                            key={item.id}
                                            control={
                                                <Checkbox checked={item.activo} onChange={(e) => handleChange(e)} name={item.id} />

                                            }
                                            label={item.value}
                                        />
                                    )
                                }
                            </Box>

                            <Tooltip placement='right' title='Si el número de la historia clínica o el número de autorización contiene ceros a la izquierda, también debe colocarlos' >



                                <TextField
                                    value={datosNombre.nombre}
                                    name='nombre'
                                    type={type}
                                    onChange={handleNombre}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleBuscarPaciente()

                                        }
                                    }}
                                />
                            </Tooltip>


                        </FormControl>
                        {
                            selected === null && <Lista lista={lista} handleSleccionarPaciente={handleSleccionarPaciente} />
                        }
                        {
                            selected !== null && <Box sx={{ my: 2 }}>
                                <Typography color="text.primary" variant="h5" noWrap>
                                    {selected.Des_ApePaterno + ' ' + selected.Des_ApeMaterno + ' ' + selected.Des_Nombres}
                                </Typography>
                                <Typography

                                    variant="h5"
                                >
                                    <Text color={'secondary'}>{selected.Nro_Historia} </Text>
                                </Typography>
                            </Box>
                        }


                        <Box style={{ marginTop: "25px", display: "flex", justifyContent: "center", justifyItems: "center", alignContent: "center", alignItems: "center" }}>
                            <Typography style={{}} variant='h4'>↓ Presione la carpeta+ para cargar archivo ↓</Typography>
                        </Box>
                        <div style={{ marginTop: "10px" }} className="App">
                            <div className="upload-area">
                                {/* <input style={{ border: "none", backgroundColor: "red" }} type="file" name="filetobase64" onChange={onUploadFileChange} accept="application/pdf" /> */}
                                <form style={{ display: "flex", justifyContent: "center", justifyItems: "center", alignContent: "center", alignItems: "center", flexDirection: "column" }}>
                                    <IconButton
                                        type='submit'
                                        component='label'
                                        variant='contained'
                                        color='info'
                                        onChange={onUploadFileChange}
                                    >
                                        <input
                                            accept="application/pdf"
                                            type='file'
                                            hidden
                                        />
                                        <CreateNewFolderIcon fontSize='large' style={{ backgroundColor: "#efefef", borderRadius: "10px", width: "60px" }} />
                                    </IconButton>
                                    {fileName &&
                                        <>
                                            <Box style={{ display: "flex", flexDirection: "column" }}>
                                                <p style={{ marginLeft: "0px" }} className="filename">{fileName.name}</p>
                                                <Button type='submit' onClick={handleSubir} variant='contained' color='success' size='small' style={{ marginLeft: "0px" }}>Subir Archivo</Button>
                                            </Box>
                                            <ContenidoPdf file={file} />
                                        </>
                                    }

                                </form>
                            </div>
                            <br />
                        </div>
                    </Card>

                </CardContent>
            </Card>
        </>
    );

}

