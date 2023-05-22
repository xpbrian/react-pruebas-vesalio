import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import ListaEmpresas from './ListaEmpresas'
import TablaPolizas from './TablaPolizas'
import TablaCoberturas from './TablaCoberturas'

export default function Index() {
    const [empresaSelected, setEmpresaSelected] = useState('')
    const [coberturas, setCoberturas] = useState([])
    const handleSeleccionar = (codEmpresa) => {
        setEmpresaSelected(codEmpresa)
    }
    const handleCoberturas = (array) => {
        setCoberturas(array)
    }
    useEffect(() => { console.log(empresaSelected) }, [empresaSelected])
    return (
        <>
            <Grid alignItems="center" justifyContent={"center"} container spacing={3} sx={{ p: 2 }}>
                <Grid item xs={12} lg={12} md={12}>
                    <ListaEmpresas handleSeleccionar={handleSeleccionar} />
                </Grid>
                <Grid item xs={12} lg={12} md={12}>
                    <TablaPolizas empresaSelected={empresaSelected} handleCoberturas={handleCoberturas} />
                </Grid>
                <Grid item xs={12} lg={12} md={12}>
                    <TablaCoberturas coberturas={coberturas} />
                </Grid>
            </Grid>
        </>
    )
}
