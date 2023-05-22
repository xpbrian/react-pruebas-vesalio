import React, { useEffect, useState } from 'react'
import AcordionDetalis from './AcordionDetalis'

export default function Index({ antecedentes, datosUsuario, setDatos, actualizarView }) {

    const [array, setArray] = useState(null)


    useEffect(() => {
        if (antecedentes !== null) {
            setArray([
                { id: "patologicos", lista: antecedentes.patologicos, title: "Patológicos" },
                { id: "medicamentos", lista: antecedentes.medicamentos, title: "Medicación Habitual" },
                { id: "noPatologicos", lista: antecedentes.noPatologicos, title: "Alergias" },
                { id: "heredo", lista: antecedentes.heredoFamiliar, title: "Familiares" },
                { id: "quirurgico", lista: antecedentes.quirurgico, title: "Quirúrgico" },
                { id: "habito", lista: antecedentes.habito, title: "Hábitos nocivos" },
                { id: "informacion_adicional", lista: [], title: "Información adicional" }
            ])
        }
    }, [antecedentes])
    return (
        <>
            {array !== null && array.map(item => <AcordionDetalis item={item} key={item.id} datosUsuario={datosUsuario} setDatos={setDatos} actualizarView={actualizarView} />)}

        </>
    )
}
