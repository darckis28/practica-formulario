export function valida(input){
    const tipoInput= input.dataset.tipo;
    if(validadores[tipoInput]){
        validadores[tipoInput](input);
    }
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML="";
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML= mostrarmensajeDeError(tipoInput,input);
    }
}
const tipoDeErrores=[
    "valueMissing",
    "typeMismatch",
    "patterMissmatch",
    "customError"
]

const mensajesDeError={
    nombre: {
        valueMissing : "El campo nombre no puede estar vacio"
    },
    email:{
        valueMissing:"El campo email no puede estar vacio",
        typeMismatch:"El correo no es valido"
    },
    password:{
        valueMissing:"El campo contraseña no puede estar vacio",
        patterMissmatch:"debe tener 8 caracteres, debe tener menos de 13 caracteres y almenos un numero"
    },
    nacimiento:{
        valueMissing : "este campo no puede estar vacio",
        customError:"debes tener al menos 18 años"

    },
    celular:{
        valueMissing : "este campo de telefono no puede estar vacio",
        patterMissmatch:"debe tener 8 caracteres, debe tener menos de 13 caracteres y almenos un numero",
       
    },
    direccion:{
        valueMissing : "este campo de direccion no puede estar vacio",
        patterMissmatch:"la direccion debe contener entre 10 a 40 caracteres"
    },
    ciudad:{
        valueMissing : "este campo de ciudad no puede estar vacio",
        patterMissmatch:"la direccion debe contener entre 10 a 40 caracteres"
    },
    estado:{
        valueMissing : "este campo de estado no puede estar vacio",
        patterMissmatch:"la direccion debe contener entre 10 a 40 caracteres"
    }
}
const validadores = {
    nacimiento : input=> validarNacimiento(input),
}
function mostrarmensajeDeError(tipoInput,input){
    let mensaje=""
    tipoDeErrores.forEach(error=>{
        if(input.validity[error]){
            console.log(tipoInput, error)
            mensaje= mensajesDeError[tipoInput][error];
        }
    })
    return mensaje;
}
const inputNacimiento = document.querySelector("#birth");
inputNacimiento.addEventListener("blur",(e)=>{ //blur para cuando sacas el focus del input o de cualquier elemento
    validarNacimiento(e.target)
})
const validarNacimiento =(input)=>{
    const fechaCliente = new Date (input.value); //crear dia hora y año
    let mensaje=""
    if(!mayorDeEdad(fechaCliente)){
        mensaje="debes tener 18 años de edad"
    }
    input.setCustomValidity(mensaje)
}
const mayorDeEdad = (fecha)=>{
 const fechaActual =  new Date();
 const diferenciaFechas= new Date(
    fecha.getUTCFullYear() + 18, 
    fecha.getUTCMonth(),
    fecha.getUTCDate())
 return(fechaActual>= diferenciaFechas)
}