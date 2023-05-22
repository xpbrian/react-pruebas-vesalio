import { Box, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Lista from './Lista'

export default function Index() {
  const [lista, setLista] = useState([])
  useEffect(() => {
    const getDatos = async () => {
      try {
        const response = await axios.get(`http://.91.211:4001/ordenesHospitalizacion`)
        console.log(response.data);
        setLista(response.data)
      } catch (e) {
        console.log(e);
      }

    }
    getDatos()

  }, [])

  return (
    <>
      <Box sx={{ m: 2 }}>
        <Typography variant='h4'>
          Asignar cama
        </Typography>
      </Box>
      <Lista lista={lista} />



    </>
  )
}
