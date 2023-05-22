import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import useAuth from 'src/hooks/useAuth';

const initialAuthState = {
    departamentos: [],
    provincias: [],
    distritos: [],
    especialidad: [],
    medicos: [],
    coberturas: [],
    citas: [],
    citasLista: [],
    planes: [],
    familiares: [],
    misCoberturas: [],
    inconformidades: [],
    usuariosLista: [],
    empresasSistcomp: [],
    estadoTurnos: [],
    dias: [
        { id: 2, value: 'Lunes' },
        { id: 3, value: 'Martes' },
        { id: 4, value: 'Miércoles' },
        { id: 5, value: 'Jueves' },
        { id: 6, value: 'Viernes' },
        { id: 7, value: 'Sábado' },
        { id: 1, value: 'Domingo' }
    ],
    tipoDocumentos: [
        { id: 1, label: 'DNI' },
        { id: 2, label: 'CI' },
        { id: 7, label: 'Pasaporte' },
    ],
    tipoDocumentosSistComp: [
        { id: '01', title: 'DNI' },
        { id: '02', title: 'LIB MILITAR' },
        { id: '03', title: 'CARNE EXTRANJERIA' },
    ],
    consultorios: [],
    especialidadesRegistro: [],
    modalOpen: {
        estado: false,
        contenido: '',
        size: 'xs',
    },
    drawerOpen: {
        estado: false,
        contenido: '',
        // size: 'xs',
    },
    camasEmergencia: []

};

const handlers = {
    INITIALIZE: (state, action) => {
        const { departamentos, camasEmergencia, coberturas, inconformidades, estadoTurnos, provincias, distritos, especialidad, medicos, citas, familiares, misCoberturas, citasLista, consultorios, especialidadesRegistro, empresasSistcomp, usuariosLista } = action.payload;
        return {
            ...state,
            departamentos,
            provincias,
            distritos,
            especialidad,
            medicos,
            citas,
            familiares,
            misCoberturas,
            citasLista,
            especialidadesRegistro,
            consultorios,
            empresasSistcomp,
            usuariosLista,
            inconformidades,
            estadoTurnos,
            coberturas,
            camasEmergencia


        };
    },
    MOSTRAR_OCULTAR_COMPONENT: (state, action) => {
        const { obj, tipo } = action.payload;
        let state_ = state;
        state_[tipo] = obj
        return {
            ...state_
        };
    },
    ADD_CITAS: (state, action) => {
        const { cita } = action.payload;
        return {
            ...state,
            citas: [...state.citas, cita]
        };
    },
    ADD_FAMILIARES: (state, action) => {
        const { familiares } = action.payload;
        return {
            ...state,
            familiares
        };
    },
    ADD_COBERTURAS: (state, action) => {
        const { misCoberturas } = action.payload;
        return {
            ...state,
            misCoberturas
        };
    },
    UPDATE_CITAS: (state, action) => {
        const { cita } = action.payload;
        return {
            ...state,
            citas: state.citas.reduce((arr, item) => {
                if (item._id === cita._id) {
                    arr.push(cita)
                } else {
                    arr.push(item)
                }
                return arr;
            }, [])
        };
    },
    CITAS_LISTA: (state, action) => {
        const { citasLista } = action.payload;
        return {
            ...state,
            citasLista
        };
    },

    ADD_ITEM_DRAWER: (state, action) => {
        const { lista } = action.payload;
        let state_ = state.drawerOpen;
        return {
            ...state,
            drawerOpen: {
                ...state_,
                item: {
                    ...state_.item, item: {
                        ...state_.item.item, lista
                    }
                }
            }
        };
    },
};

const reducer = (state, action) =>
    handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContextLayout = createContext({
    ...initialAuthState,
    mostrarComponent: () => Promise.mostrarComponent(),
    addCita: () => Promise.addCita(),
    addFamiliares: () => Promise.addFamiliares(),
    addCoberturas: () => Promise.addCoberturas(),
    updateCitas: () => Promise.updateCitas(),
    addItemDrawer: () => Promise.addItemDrawer(),
});

export const AuthProviderLayout = (props) => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, initialAuthState);
    const { isAuthenticated, user } = useAuth()

    useEffect(() => {
        const initialize = async () => {
            const departamentos = await axios.get(`http://apis-vesalio.com.pe/departamentos`)
            const provincias = await axios.get(`http://apis-vesalio.com.pe/provincias`)
            const distritos = await axios.get(`http://apis-vesalio.com.pe/distritos`)
            const medicosEspecialidad = await axios.get(`http://apis-vesalio.com.pe/medicosEspecialidad`)
            const citas = await axios.get(`http://apis-vesalio.com.pe/citas/${user._id}`)
            const familiares = await axios.get(`http://apis-vesalio.com.pe/usuario/${user._id}`)
            const citasLista = await axios.get(`http://apis-vesalio.com.pe/citas`) // limitar por perfil de usuario
            const especialidadesRegistro = await axios.get(`http://apis-vesalio.com.pe/especialidades`) // limitar por perfil de usuario
            const consultorios = await axios.get(`http://apis-vesalio.com.pe/consultorios`) // limitar por perfil de usuario
            const empresasSistcomp = await axios.get(`http://apis-vesalio.com.pe/empresasSistcomp`) // limitar por perfil de usuario
            const usuariosLista = await axios.get(`http://apis-vesalio.com.pe/usuario`)
            const inconformidades = await axios.get(`http://apis-vesalio.com.pe/getInconformidades`)
            const estadoTurnos = await axios.get(`http://apis-vesalio.com.pe/estadoTurnos`)
            const coberturas = await axios.get(`http://apis-vesalio.com.pe/coberturas`)
            const camasEmergencia = await axios.get(`http://200.121.91.211:4001/camasEmergencia`)

            dispatch({
                type: 'INITIALIZE',
                payload: {
                    departamentos: departamentos.data,
                    provincias: provincias.data,
                    distritos: distritos.data,
                    citas: citas.data,
                    citasLista: citasLista.data,
                    familiares: familiares.data === null ? [] : familiares.data.familiares.integrantes,
                    misCoberturas: familiares.data === null ? [] : familiares.data.coberturas,
                    coberturas: coberturas.data,
                    camasEmergencia: camasEmergencia.data,
                    especialidad: medicosEspecialidad.data.reduce((arr, item) => {
                        let found = arr.findIndex(x => x.id_especialidad === item.id_especialidad)
                        if (found < 0) {
                            arr.push({
                                id_especialidad: item.id_especialidad,
                                epecialidad: item.epecialidad,
                                cantidad: 1
                            })
                        } else {
                            arr[found].cantidad += 1;
                        }
                        return arr
                    }, []),
                    medicos: medicosEspecialidad.data.reduce((arr, item) => {
                        let found = arr.findIndex(x => x.id_usuario === item.id_usuario)
                        if (found < 0) {
                            arr.push({
                                id_usuario: item.id_usuario,
                                nombres: item.nombres,
                                documento: item.documento,
                                aviso_portal: item.aviso_portal,
                                genero: item.genero,
                                especialidades: [item.id_especialidad],
                                dia: [item.dia],
                            })
                        } else {
                            let existe = arr[found].especialidades.findIndex(x => item.id_especialidad === x)
                            if (existe < 0) {
                                arr[found].especialidades.push(item.id_especialidad)
                            }
                            let existeDia = arr[found].dia.findIndex(x => item.dia === x)
                            if (existeDia < 0) {
                                arr[found].dia.push(item.dia)
                            }

                        }
                        return arr
                    }, []),
                    especialidadesRegistro: especialidadesRegistro.data,
                    consultorios: consultorios.data,
                    empresasSistcomp: empresasSistcomp.data,
                    usuariosLista: usuariosLista.data,
                    inconformidades: inconformidades.data,
                    estadoTurnos: estadoTurnos.data,
                }
            });
        };
        if (isAuthenticated) {
            initialize();
        }
    }, [isAuthenticated])

    const addItemDrawer = (lista) => {
        dispatch({
            type: 'ADD_ITEM_DRAWER',
            payload: {
                lista
            }
        });
    };

    const mostrarComponent = (obj, tipo) => {
        dispatch({
            type: 'MOSTRAR_OCULTAR_COMPONENT',
            payload: {
                obj,
                tipo
            }
        });
    };
    const addCita = (cita) => {
        dispatch({
            type: 'ADD_CITAS',
            payload: {
                cita
            }
        });
    };
    const updateCitas = (cita) => {
        dispatch({
            type: 'UPDATE_CITAS',
            payload: {
                cita
            }
        });
    };
    const updateCitasLista = async () => {
        const citasLista = await axios.get(`http://apis-vesalio.com.pe/citas`)
        dispatch({
            type: 'CITAS_LISTA',
            payload: {
                citasLista: citasLista.data
            }
        });
    };

    const addFamiliares = async () => {
        const familiares = await axios.get(`http://apis-vesalio.com.pe/usuario/${user._id}`)
        dispatch({
            type: 'ADD_FAMILIARES',
            payload: {
                familiares: familiares.data.familiares.integrantes
            }
        });
    };
    const addCoberturas = async () => {
        const familiares = await axios.get(`http://apis-vesalio.com.pe/usuario/${user._id}`)
        dispatch({
            type: 'ADD_COBERTURAS',
            payload: {
                misCoberturas: familiares.data.coberturas
            }
        });
    };
    return (
        <AuthContextLayout.Provider
            value={{
                ...state,
                mostrarComponent,
                addCita,
                addFamiliares,
                addCoberturas,
                updateCitas,
                updateCitasLista,
                addItemDrawer
            }}
        >
            {children}
        </AuthContextLayout.Provider>
    );
};

AuthProviderLayout.propTypes = {
    children: PropTypes.node.isRequired
};

export default AuthContextLayout;
