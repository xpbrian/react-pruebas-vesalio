import { useRef, useState } from 'react'
import { Button, Menu, MenuItem } from '@mui/material'
import useAuthLayout from 'src/hooks/useAuthLayout'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import axios from 'axios';

export default function MenuResultsItem({ job }) {
    const { especialidad, mostrarComponent } = useAuthLayout()

    const actionRef1 = useRef(null);
    const [openPeriod, setOpenMenuPeriod] = useState(false);

    const getDatos = async (obj) => {
        const response = await axios.post(`http://apis-vesalio.com.pe/medicosEspecialidadHorario`, obj)
        return response.data;
    }

    const handleClick = async (especialidad, object) => {
        setOpenMenuPeriod(false)
        let datos = await getDatos({ id_especialidad: especialidad, documento: object.documento })
        mostrarComponent({
            contenido: 'generarHorario',
            estado: true,
            size: 'sm',
            item: {
                item: datos
            }
        }, 'modalOpen')
    }

    return (
        <>
            <Button
                size="small"
                fullWidth
                variant="outlined"
                ref={actionRef1}
                endIcon={<ArrowDropDownIcon />}
                onClick={() => setOpenMenuPeriod(true)}>
                {'Seleccionar'}
            </Button>
            <Menu
                disableScrollLock
                anchorEl={actionRef1.current}
                onClose={() => setOpenMenuPeriod(false)}
                open={openPeriod}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
            >
                {job.especialidades.map((_period) => (
                    <MenuItem
                        key={_period}
                        onClick={() => handleClick(_period, job)}
                    >
                        {especialidad.find(x => x.id_especialidad === _period).epecialidad}
                    </MenuItem>
                ))}
            </Menu>
        </>

    )
}
