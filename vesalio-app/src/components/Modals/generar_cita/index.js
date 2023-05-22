import { Box, Button, Divider, Step, StepLabel, Stepper, styled, Zoom } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import useAuth from 'src/hooks/useAuth';
import useLayoutContext from 'src/hooks/useAuthLayout';
import Paciente from './Paciente';
import NuevaCita from './nueva_cita';
import { useSnackbar } from 'notistack';


const BoxActions = styled(Box)(
  ({ theme }) => `
      background: ${theme.colors.alpha.black[5]}
  `
);


export default function Index() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const steps = ['Paciente', 'Horario', 'Completado']
  const { user } = useAuth()
  const { misCoberturas } = useLayoutContext()
  const [step, setStep] = useState(0)
  const [completed, setCompleted] = useState(false);
  const [pacienteDocumento, setPacienteDocumento] = useState(null)
  const [tipoCobertura, setTipoCobertura] = useState('01')
  const [pacienteCobertura, setPacienteCobertura] = useState(null)

  function isLastStep() {
    return step === steps.length - 2;
  }
  useEffect(() => {
    if (step === 2) {
      setCompleted(true)
    }
  }, [step])
  
  useEffect(() => {
    let nombres = `(${user.datos.numero_documento}) ${user.datos.ape_paterno} ${user.datos.ape_materno} ${user.datos.nombres}`
    setPacienteDocumento({ id: user.datos.numero_documento, label: nombres })
  }, [user])

  useEffect(() => {
    let found = misCoberturas.find(x => x.principal)
    if (found !== undefined) {

      setPacienteCobertura({ id: found.cobertura, label: found.descripcionCobertura })
    }

  }, [misCoberturas])

  const datosPacienteSiguiente = () => {
    let errors = []
    if (pacienteDocumento.id === '999') {
      errors.push('Debe seleccionar un paciente')
    }
    if (tipoCobertura === '01') {
      if (pacienteCobertura === null) {
        errors.push('Debe seleccionar una cobertura')
      } else if (pacienteCobertura.id === '999') {
        errors.push('Debe seleccionar una cobertura')
      }
    }
    if (errors.length > 0) {
      errors.map(x => enqueueSnackbar(t(x), {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        },
        TransitionComponent: Zoom
      }))
    } else {
      setStep((s) => s + 1)
    }
  }
  const handleSiguiente = () => {
    switch (step) {
      case 0:
        datosPacienteSiguiente()
        break;
      default:
        console.log("wepoigfn")
        break;
    }
  }
  return (
    <>
      <Stepper alternativeLabel activeStep={step}>
        {steps.map((child, index) => (
          <Step
            key={child}
            completed={step > index || completed}
          >
            <StepLabel>{child}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Divider />
      {
        step === 0 && <Paciente setPacienteDocumento={setPacienteDocumento} setTipoCobertura={setTipoCobertura} pacienteDocumento={pacienteDocumento} pacienteCobertura={pacienteCobertura} setPacienteCobertura={setPacienteCobertura} />
      }
      {
        step === 1 &&<NuevaCita />
      }
      {
        step === 2 && "hecho"
      }

      {!completed ? (
        <BoxActions
          p={4}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Button
            disabled={step === 0 && true}
            variant="outlined"
            color="primary"
            type="button"
            onClick={() => setStep((s) => s - 1)}
          >
            {t('Anterior')}
          </Button>

          <Button
            variant="contained"
            color="primary"
            type="button"
            onClick={handleSiguiente}
          >
            {isLastStep()
              ? t('Finalizar')
              : t('Siguiente')}
          </Button>
        </BoxActions>
      ) : null}

    </>
  )
}
