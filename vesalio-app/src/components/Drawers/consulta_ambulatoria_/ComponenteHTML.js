import { Box, Typography } from "@mui/material"
import { styled } from '@mui/material/styles';
import { useEffect, useState } from "react";
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

export default function ComponenteHTML({ handleChangedTextState, text: dato, title }) {
    const [text, setText] = useState('')
    const [idText, setIdText] = useState('')
    useEffect(() => {
        setIdText(dato.id)
    }, [dato]
    )

    const handleChangeText = (content, delta, source, editor) => {
        setText(editor.getHTML())
        handleChangedTextState(editor.getHTML(), idText)
    }

    return (
        <>
            <Typography variant="h5" sx={{ mb: 1 }}><b>{title}</b></Typography>
            <EditorWrapper>
                <ReactQuill
                    value={text}
                    onChange={handleChangeText}
                    modules={{
                        toolbar: [
                            [{ 'header': [] }, { 'font': [] }],
                            [{ size: [] }],
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


        </>
    )
}
