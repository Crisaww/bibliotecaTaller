//Se almacena la URL de la API
let url="http://10.192.66.35:8000/libreria/api/v1/usuario/";
//let url="http://192.168.1.8:8000/libreria/api/v1/usuario/";

//1) Función de caracteres no permitidos

//Este método le dice al sistema cuales son los caracteres que no se pueden digitar
document.getElementById("nombreUsuario").addEventListener("keypress",soloLetras);
document.getElementById("direccionResidencia").addEventListener("keypress",soloLetras);
document.getElementById("correo").addEventListener("keypress",soloLetras);



function soloLetras(event){
    console.log("LLave presionada: "+event.key);
    console.log("Codigo tecla: "+event.keyCode);
    
    const caracteresNoPermitidos = [
        '$', '%', '^', '&', '*', '(', ')', '_', '+', '{', '}', '[', ']',
        '\\', '|', ';', ':', '"', ',', '<', '>', '/', '`', '~'
    ]; // Lista de caracteres no permitidos
    

   // Verificar si el carácter no está permitido
   if (caracteresNoPermitidos.includes(event.key)) {
       event.preventDefault(); // Prevenir la entrada del carácter
      return;
    }
}

//2) Función para que no pegue caracteres indebidos

//Para prevenir que pegue caracteres que dañen el sistema:
document.getElementById('nombreUsuario').addEventListener('paste', function(e) {
    e.preventDefault();
});

document.getElementById('direccionResidencia').addEventListener('paste', function(e) {
    e.preventDefault();
});

document.getElementById('correo').addEventListener('paste', function(e) {
    e.preventDefault();
});


function listarUsuario() {
    var busqueda = document.getElementById("buscar").value;
    var urlBusqueda = url;
    if (busqueda!=""){
    urlBusqueda+="?search="+busqueda;
    }
    $.ajax({
        url:urlBusqueda,
        type: "GET",
        success: function(result){//success: funcion que se ejecuta cusndo la peticion tiene exito
            console.log(result);
            let cuerpoTablaUsuario = document.getElementById("cuerpoTablaUsuario");
            cuerpoTablaUsuario.innerHTML="";
            for (let i = 0; i < result.length; i++) {
               //se crea una etiqueta tr por cada registro
                let trRegistro = document.createElement("tr");//fila por cada registro de la tabla
                let celdaId = document.createElement("td");
                let celdaNombreUsuario = document.createElement("td");
                let celdaDireccionResidencia = document.createElement("td");
                let celdaCorreoElectronico = document.createElement("td");
                let celdaTipoUsuario = document.createElement("td");
            
               
                
                //almacenamos en valor
                
                celdaId.innerText = result[i]["id"];
                celdaNombreUsuario.innerText = result[i]["nombreUsuario"];
                celdaDireccionResidencia.innerText = result[i]["direccionResidencia"];
                celdaCorreoElectronico.innerText = result[i]["correo"];
                celdaTipoUsuario.innerText = result[i]["tipo_usuario"];
            

    
                
                //agregando a los td a su respectivo th y agregandolos a la fila

                trRegistro.appendChild(celdaId);
                trRegistro.appendChild(celdaNombreUsuario);
                trRegistro.appendChild(celdaDireccionResidencia);
                trRegistro.appendChild(celdaCorreoElectronico);
                trRegistro.appendChild(celdaTipoUsuario);
                

                
                //boton editar 
                let celdaOpcion= document.createElement("td");
                let botonEditarUsuario= document.createElement("button");
                botonEditarUsuario.value=result[i]["id"];
                botonEditarUsuario.innerHTML="<i class='fas fa-edit'></i> Editar"; 

                botonEditarUsuario.onclick=function(e){
                    $('#exampleModal').modal('show');
                    consultarUsuarioID(this.value); 
                }
                botonEditarUsuario.className= "btn btn-danger"

                celdaOpcion.appendChild(botonEditarUsuario); 
                trRegistro.appendChild(celdaOpcion);

                cuerpoTablaUsuario.appendChild(trRegistro);//se traen todos los registros

                 //boton desahiblitar- la funcion de deshabilitar se encuentra abajo 
                 let botonEliminarUsuario= document.createElement("button");
                 botonEliminarUsuario.innerHTML="<i class='fas fa-minus-circle'></i> Eliminar"; 
                 botonEliminarUsuario.className="btn btn-dark"; 
 
                 let usuarioIdParaEliminar= result[i]["id"]; 
                 botonEliminarUsuario.onclick=function(){
                   eliminarUsuario(usuarioIdParaEliminar);
                 }
                 celdaOpcion.appendChild(botonEliminarUsuario); 
                 trRegistro.appendChild(celdaOpcion)
            }
        },
        error:function(error){
            alert("Error en la peticion ${error}");
        }
    })
 
}

function RegistrarUsuario() {
    let nombreUsuario = document.getElementById("nombreUsuario").value;
    let direccionResidencia = document.getElementById("direccionResidencia").value;
    let correo = document.getElementById("correo").value;
    let tipo_usuario = document.getElementById("tipo_usuario").value;

    let formData = {
        "nombreUsuario": nombreUsuario,
        "direccionResidencia": direccionResidencia,
        "correo": correo,
        "tipo_usuario": tipo_usuario
        
    };

    if (validarCampos()) {
        $.ajax({
            url: url,
            type: "POST",
            data: formData,
            success: function(result){
              Swal.fire({
                title: "Excelente",
                text: "Su registro se guardó correctamente",
                icon: "success"
              });
              // window.location.href= "http://127.0.0.1:5500/front_end/clienteRegistro.html";
            },
            error: function(error){
              Swal.fire("Error", "Error al guardar ", "error");
            }
          });
        }else{
         // alert("llena los campos correctamente")
          Swal.fire({
            title: "Error!",
            text: "complete los campos correctamente",
            icon: "error"
          });
        }
  }


function validarCampos() {
   
    var nombreUsuario = document.getElementById("nombreUsuario");
    var direccionResidencia = document.getElementById("direccionResidencia");
    var correo = document.getElementById("correo"); 
    var tipo_usuario = document.getElementById("tipo_usuario"); 
 
 
   
    

    return validarNombreUsuario(nombreUsuario) && validarDireccionResidencia(direccionResidencia) && validarCorreo(correo) 
         && validarUsuario(tipo_usuario);
}

function validarNombreUsuario(NombreUsuario) {
    if (!NombreUsuario || !NombreUsuario.value) {
        return false;
    }

    let valor = NombreUsuario.value;
    let valido = true;
    if (valor.length <=0 || valor.length > 200) {
        valido = false;
    }

    if (valido) {
        NombreUsuario.className = "form-control is-valid";
    } else {
        NombreUsuario.className = "form-control is-invalid";
    }
    return valido;
}

function validarDireccionResidencia(DireccionResidencia) {
    if (!DireccionResidencia || !DireccionResidencia.value) {
        return false;
    }

    let valor = DireccionResidencia.value;
    let valido = true;
    if (valor.length < 3 || valor.length > 60) {
        valido = false;
    }

    if (valido) {
        DireccionResidencia.className = "form-control is-valid";
    } else {
        DireccionResidencia.className = "form-control is-invalid";
    }
    return valido;
}


function validarCorreo(correoE) {
    console.log("Validando correo:", correoE.value);  // Debug
    const correo = correoE.value;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errorDiv = document.getElementById("correo-error");

    if (!regex.test(correo)) {
        console.log("Correo no válido");  // Debug
        correoE.classList.add("is-invalid");
        errorDiv.style.display = "block";
        return false;
    } else {
        console.log("Correo válido");  // Debug
        correoE.classList.remove("is-invalid");
        errorDiv.style.display = "none";
        return true;
    }
}

function validarUsuario(TipoUsuario){
    var valido=true;
    if(TipoUsuario.value.length <= 0 || TipoUsuario.value.length > 20){
        valido=false;
    }

    if (valido) {
        TipoUsuario.className = "form-control is-valid"
    }
    else{
        TipoUsuario.className = "form-control is-invalid"
    }
    return valido;
}




function LimpiarUsuario(){
    document.getElementById("nombreUsuario").className="form-control";
    document.getElementById("direccionResidencia").className="form-control";
    document.getElementById("correo").className="form-control";
    document.getElementById("tipo_usuario").className="form-control";
    

    document.getElementById("nombreUsuario").value = "";
    document.getElementById("direccionResidencia").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("tipo_usuario").value = "";
 
 
}


// funcion  de deshabilitar usuario
function eliminarUsuario(id){
    swal.fire({
      title: '¿Estás seguro?',
      text: "Esta opción no tiene marcha atrás",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor:'#3085d6',
      cancelButtonText:'Cancelar',
      cancelButtonColor:'#d33',
      confirmButtonText:'Sí, !Eliminar!',
  
    }).then((result)=>{
      if (result.isConfirmed){
        $.ajax({
          url: url +id,
          type: "DELETE",
          success: function(result){
            swal.fire(
              'Eliminado',
              'El usuario ha sido eliminado ',
              'success'
            );
            listarUsuario();//recarga la lista de usuarios
          },
          error: function(error){
            Swal.fire(
              'Error',
              'No se puede eliminar el registro ',
              'Error',
            );
          }
        });
      }
    });
  }


/* metodo para obtener los datos en el modal de actualizar*/ 
//1.Crear petición que traiga la información del cliente por id
function consultarUsuarioID(id){
    //alert(id);
    $.ajax({
        url:url+id,
        type:"GET",
        success: function(result){
            
            document.getElementById("id").value=result["id"];
            document.getElementById("nombreUsuario").value=result["nombreUsuario"];
            document.getElementById("direccionResidencia").value=result["direccionResidencia"];
            document.getElementById("correo").value=result["correo"];
            document.getElementById("tipo_usuario").value=result["tipo_usuario"];

        }
    });
}

//Cuando le damos click al boton de guardar, este llamara a la function UpdateProducto por medio del onclick******

function updateUsuario() {
    var id = document.getElementById("id").value;

    let formData = {
        "nombreUsuario": document.getElementById("nombreUsuario").value,
        "direccionResidencia": document.getElementById("direccionResidencia").value,
        "correo": document.getElementById("correo").value,
        "tipo_usuario": document.getElementById("tipo_usuario").value
        // "estado": document.getElementById("estado").value
    };


    //Cuando estamos actualizando los datos, y lo hacemos correctamente Aparecerá la Alerta EXCELENTE ***
    if(validarCampos()){
    $.ajax({
        url: url + id+"/",
        type: "PUT",
        data: formData,
        success: function(result) {
            Swal.fire({
                title: "Excelente",
                text: "Su registro se actualizó correctamente",
                icon: "success"
            });
            
            var modal = document.getElementById("exampleModal"); 
            modal.style.display = "hide";

            listarUsuario(); //Lista los usuarios después de actualizar
        },
        error: function(error) {
            Swal.fire("Error", "Error al guardar", "error");
        }  
    });
    }else{
        Swal.fire({
            title: "Error!",
            text: "Complete los campos correctamente",
            icon: "error"
        });
        }
}


