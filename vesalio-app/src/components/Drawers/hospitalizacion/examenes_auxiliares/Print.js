import React from "react";
import "./style.css";
import { Markup } from 'interweave';

export const ComponentToPrint = React.forwardRef((props, ref) => {

    return (
        <div ref={ref}>
            <br />

            <div className="ticket">

                <br />
                <p style={{ fontSize: 16, fontFamily: "'Courier New', arial" }}>
                    Brian chicoma
                </p>
                <p style={{ fontSize: 16, fontFamily: "'Courier New', arial" }}>
                    471609055
                </p>
                <hr />
                <h6 style={{ fontSize: 20, fontFamily: "'Courier New', arial" }}>
                    Lista de Examenes
                </h6>
                <table>
                    <thead>


                        <tr style={{ fontSize: 20, fontFamily: "'Courier New', arial" }}>
                            <td
                                style={{ fontSize: 16, fontFamily: "'Courier New', arial" }}
                                width={10}
                            >
                                #
                            </td>
                            <td
                                style={{ fontSize: 16, fontFamily: "'Courier New', arial" }}
                                width={60}
                            >
                                Examen
                            </td>
                            <td
                                style={{ fontSize: 16, fontFamily: "'Courier New', arial" }}
                                width={30}
                            >
                                Informacion
                            </td>

                        </tr>
                    </thead>
                    <tbody>
                        {props.datos.map((car, i) => (
                            <tr key={i} style={{ fontSize: 20 }}>
                                <td style={{ fontSize: 16, fontFamily: "'Courier New', arial" }}>
                                    {parseInt(i) + 1}
                                </td>
                                <td style={{ fontSize: 16, fontFamily: "'Courier New', arial" }}>
                                    {car.estudioNombre}
                                </td>
                                <td style={{ fontSize: 16, fontFamily: "'Courier New', arial" }}>
                                    <Markup content={car.informacion} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>


                <br />

                <p
                    className="centrado"
                    style={{ fontSize: 20, fontFamily: "'Courier New', arial" }}
                >
                    ¡GRACIAS POR SU COMPRA Y PREFERENCIA!
                    <br />
                </p>

            </div>
        </div>
    );
});
