import moment from 'moment-timezone'


const retornarFecha = () => {
    let fecha = moment().tz('America/Lima').format();
    
    // let ano = parseInt(fecha.split('T')[0].split('-')[0])
    // let mes = parseInt(fecha.split('T')[0].split('-')[1]) - 1
    // let dia = parseInt(fecha.split('T')[0].split('-')[2])
    // let hora = parseInt(fecha.split('T')[1].split(':')[0])
    // let minuto = parseInt(fecha.split('T')[1].split(':')[1])
    let retornar  = new Date(fecha)
    let retornar2  = new Date()
    if(retornar2>retornar){
        console.log("si es mayor");
    }else{
        console.log("no es mayor");
    }
    return retornar
}


export default retornarFecha;
