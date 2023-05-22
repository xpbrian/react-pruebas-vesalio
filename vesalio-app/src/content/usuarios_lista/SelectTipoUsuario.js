import { FormControl, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';
import confirmSweetAlert from 'src/utils/confirm';

export default function SelectTipoUsuario({ item }) {
    const arrayTipo = [{ id: '01', name: 'Paciente' }, { id: '02', name: 'Administrador' }, { id: '03', name: 'Doctor' }, { id: '04', name: 'Archivos' }, { id: '05', name: 'Call Center' }, { id: '06', name: 'Secretaria' }, { id: '07', name: 'Admisión' }, { id: '08', name: 'Recepción' }, { id: '09', name: 'Enfermeria' }];
    const [selected, setSelected] = useState(null)
    useEffect(() => {
        setSelected(item.cuenta.tipo_usuario);
    }, [item])
    const handleOnchanged = async (e) => {
        const rpta = await confirmSweetAlert('Cambiar usuario', 'Esta seguro que desea campiar el tipo de usuario?', 'warning', true)
        if (rpta) {
            await axios.post('http://apis-vesalio.com.pe/updateTipoUsuario', {
                datos: [
                    { id: 'id', value: item._id },
                    { id: 'id_tipoUusario', value: arrayTipo.find(x => x.id === e.target.value).id },
                    { id: 'value', value: arrayTipo.find(x => x.id === e.target.value).name },
                ]
            })
            setSelected(arrayTipo.find(x => x.id === e.target.value))

        }
    }
    return (
        <FormControl fullWidth variant="outlined">
            {selected !== null && <Select
                value={selected.id}
                onChange={(e) => handleOnchanged(e)}
            >
                {arrayTipo.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        {option.name}
                    </MenuItem>
                ))}
            </Select>}
        </FormControl >
    )
}
