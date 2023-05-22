import { Box, Button, Grid, IconButton, TextField, Typography, Zoom } from '@mui/material';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react'
import useLayoutContext from 'src/hooks/useAuthLayout';
import confirmSweetAlert from 'src/utils/confirm';
import ContenidoPdf from 'src/content/subir_archivos/ContenidoPdf';


export default function AnularCita() {
    const { enqueueSnackbar } = useSnackbar();
    const { modalOpen, mostrarComponent } = useLayoutContext()
    const [file, setFile] = useState(null)
    const [fileName, setFileName] = useState(null)
    const [text, setText] = useState([
        { id: 'celular', label: 'Celular', value: modalOpen.item.id, tipo: 'text', type: 'number', xs: 12, lg: 12, md: 12, enviar: false, disabled: false },
        { id: 'motivo', label: 'Mensaje', value: '', tipo: 'text1', type: 'text', xs: 12, lg: 12, md: 12, enviar: false, disabled: false },
    ])

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

    const handleChangedText = async (e) => {
        setText(x => x.reduce((arr, item) => {
            arr.push({
                ...item,
                value: item.id === e.target.name ? e.target.value : item.value,
            })
            return arr;
        }, []))

    }
    const handleGuardarRegistro = async () => {
        let errors = []
        if (text.filter(x => x.value.length === 0).length > 0) {
            errors.push('No debe existir campos vacios')
        }
        if (errors.length > 0) {
            errors.map(x => enqueueSnackbar(x, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                },
                TransitionComponent: Zoom
            }))
        } else {
            let rpta = await confirmSweetAlert('Enviar Mensaje', '¿Seguro que desea enviar mensaje?', 'warning', true)

            if (rpta) {
                const enviar = await axios.post('http://apis-vesalio.com.pe/mensajePaciente', {
                    datos: [
                        { id: 'id', value: text.find(x => x.id === 'celular').value },
                        { id: 'motivo', value: text.find(x => x.id === 'motivo').value },
                    ],
                    pdf: file
                })
                let msj = {
                    msj: enviar.data.msj,
                    icon: enviar.data.rpta === 1 ? 'success' : 'error'
                }
                confirmSweetAlert('Mensaje', msj.msj, msj.icon, false)
                if (enviar.data.rpta === 1) {
                    setTimeout(() => {
                        mostrarComponent({
                            contenido: '',
                            estado: false,
                            size: 'xs',
                        }, 'modalOpen')
                    }, 800)

                }
            }
        }
    }
    return (
        <>
            <Grid alignItems="center" container spacing={3} sx={{ p: 3 }}>
                {text.length > 0 && text.map(x => <Grid item xs={x.xs} lg={x.lg} md={x.md} key={x.id}>
                    {
                        x.tipo === 'text1' && <TextField
                            fullWidth
                            label={x.label}
                            name={x.id}
                            type={'text'}
                            multiline
                            rows={5}
                            value={x.value}
                            disabled={x.disabled}
                            variant="outlined"
                            onChange={(e) => handleChangedText(e)}
                        />
                    }
                    {
                        x.tipo === 'text' && <TextField
                            fullWidth
                            label={x.label}
                            name={x.id}
                            type={'number'}
                            value={x.value}
                            disabled={x.disabled}
                            variant="outlined"
                            onChange={(e) => handleChangedText(e)}
                        />
                    }
                </Grid>
                )}
                <Grid item lg={12}>
                    <Box style={{ marginTop: "25px", display: "flex", justifyContent: "center", justifyItems: "center", alignContent: "center", alignItems: "center" }}>
                        <Typography style={{}} variant='h4'>↓ Presione la carpeta+ para cargar archivo ↓</Typography>
                    </Box>
                    <div style={{ marginTop: "10px" }} className="App">
                        <div className="upload-area">
                            <div style={{ display: "flex", justifyContent: "center", justifyItems: "center", alignContent: "center", alignItems: "center", flexDirection: "column" }}>
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
                                        <Box sx={{ maxHeight: 500, maxWidth: 400, overflowX: "scroll", overflowY: "scroll" }}>
                                            <ContenidoPdf file={file} />
                                        </Box>
                                    </>
                                }

                            </div>
                        </div>
                        <br />
                    </div>
                </Grid>
                <Grid item xs={12} lg={12} md={12} >
                    <Button
                        sx={{
                            mt: 3,
                        }}
                        color="primary"
                        fullWidth
                        size="large"
                        variant="contained"
                        onClick={() => handleGuardarRegistro(modalOpen.item)}
                    >
                        {'Guardar cambios'}
                    </Button>
                </Grid>

            </Grid>

        </>
    )
}
