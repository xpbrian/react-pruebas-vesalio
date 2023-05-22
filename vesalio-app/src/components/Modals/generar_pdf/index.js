import { Button, Grid, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditorWrapper = styled(Box)(
    ({ theme }) => `
  
      .ql-editor {
        min-height: 100px;
      }
  
      .ql-toolbar.ql-snow {
        border-top-left-radius: ${theme.general.borderRadius};
        border-top-right-radius: ${theme.general.borderRadius};
      }
  
      .ql-toolbar.ql-snow,
      .ql-container.ql-snow {
        border-color: ${theme.colors.alpha.black[30]};
      }
  
      .ql-container.ql-snow {
        border-bottom-left-radius: ${theme.general.borderRadius};
        border-bottom-right-radius: ${theme.general.borderRadius};
      }
  
      &:hover {
        .ql-toolbar.ql-snow,
        .ql-container.ql-snow {
          border-color: ${theme.colors.alpha.black[50]};
        }
      }
  `
);
/*
const formats = [
    'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'script',
    'header', 'blockquote', 'code-block',
    'indent', 'list',
    'direction', 'align',
    'link', 'image', 'video', 'formula',
]
const modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }]
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        ['clean']
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    }
}
*/

export default function GenerarPdf() {

    const [text, setText] = useState('')
    const handleChangeText = (content, delta, source, editor) => {
        console.log(editor.getHTML());
        setText(editor.getHTML())
    }




    const handleGuardar = async () => {
        let html = text
        const enviar = await axios.post(`http://apis-vesalio.com.pe/generarPdf`, { contenido: html, nombrepdf: "prueba2" })
        console.log(enviar);
    }


    return (
        <>
            <Grid alignItems="center" container spacing={3} sx={{ p: 3 }}>
                <Grid item xs={12} lg={12} md={12} >
                    <EditorWrapper>
                        <ReactQuill
                            value={text}
                            onChange={handleChangeText}
                            modules={{
                                toolbar: [
                                    [{ 'header': [] }, { 'font': [] }],
                                    [{ size: []}],
                                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                    [
                                        { 'list': 'ordered' },
                                        { 'list': 'bullet' },
                                        { 'indent': '-1' },
                                        { 'indent': '+1' },
                                    ],
                                    ['link', 'image', 'video'],
                                    ['clean'],
                                    [{ 'color': [] }, { 'background': [] }],
                                    [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
                                    // [],
                                ],
                                clipboard: {
                                    // toggle to add extra line breaks when pasting HTML:
                                    matchVisual: false,
                                },
                            }}
                            formats={[
                                'header', 'font', 'size', 'color',
                                'bold', 'italic', 'underline', 'strike', 'blockquote',
                                'list', 'bullet', 'indent',
                                'link', 'image', 'video',
                                'align',
                            ]}
                        />
                    </EditorWrapper>
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
                        onClick={handleGuardar}
                    >
                        {'Guardar cambios'}
                    </Button>
                </Grid>

            </Grid>

        </>
    )
}
