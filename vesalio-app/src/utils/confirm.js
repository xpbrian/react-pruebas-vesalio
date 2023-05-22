import swal from "sweetalert";

const confirmSweetAlert = async (title, text, icon,buttons) => {
    let datos = await swal({
        title: title,
        text: text,
        icon: icon,
        buttons: buttons,
    })
    return  datos;
};
export default confirmSweetAlert;
