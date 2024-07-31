//Se almacena la URL de la API
let url="http://10.192.66.35:8000/libreria/api/v1/multa/";
//let url = "http://192.168.1.8:8000/libreria/api/v1/multa/";


//1) Función de caracteres no permitidos

//Este método le dice al sistema cuales son los caracteres que no se pueden digitar
document.getElementById("valor_multa").addEventListener("keypress",soloLetras);

function soloLetras(event){
    console.log("LLave presionada: "+event.key);
    console.log("Codigo tecla: "+event.keyCode);
    
    const caracteresNoPermitidos = [
        '#', 'º', '@', '%', '^', '&', '*', '(', ')', '_', '-', '+', '{', '}', '[', ']',
        '\\', '|', ';', ':', '"', ',', '<', '>', '/', '`', '~', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ]; // Lista de caracteres no permitidos
    
    /*
    Este método solo permite letras
    */
   
   
   // Verificar si el carácter no está permitido
   if (caracteresNoPermitidos.includes(event.key)) {
       event.preventDefault(); // Prevenir la entrada del carácter
       return;
    }
}

//2) Función para que no pegue caracteres indebidos

//Para prevenir que pegue caracteres que dañen el sistema:
document.getElementById('valor_multa').addEventListener('paste', function(e) {
    e.preventDefault();
});


function listarMulta() {
    $.ajax({
        url: url,
        type: "GET",
        success: function(result) {
            console.log(result);
            let cuerpoTablaMulta = document.getElementById("cuerpoTablaMulta");
            cuerpoTablaMulta.innerHTML = "";
            for (let i = 0; i < result.length; i++) {
                let trRegistro = document.createElement("tr");
                let celdaId = document.createElement("td");
                let celdaValorMulta = document.createElement("td");
                let celdaFechaMulta = document.createElement("td");
                let celdaUsuarioMultado = document.createElement("td");
                let celdaEstadoPrestamo = document.createElement("td");
                

                celdaId.innerText = result[i]["id"];
                celdaValorMulta.innerText = result[i]["valor_multa"];
                celdaFechaMulta.innerText = result[i]["fecha_multa"];
                obtenerNombreUsuario(result[i]["usuario"], celdaUsuarioMultado);
                obtenerEstadoPrestamo(result[i]["prestamo"], celdaEstadoPrestamo);
                

                trRegistro.appendChild(celdaId);
                trRegistro.appendChild(celdaValorMulta);
                trRegistro.appendChild(celdaFechaMulta);
                trRegistro.appendChild(celdaUsuarioMultado);
                trRegistro.appendChild(celdaEstadoPrestamo);

                let celdaOpcion = document.createElement("td");
                let botonEditarMulta = document.createElement("button");
                botonEditarMulta.value = result[i]["id"];
                botonEditarMulta.innerHTML = "<i class='fas fa-edit'></i> Editar";

                botonEditarMulta.onclick = function(e) {
                    $('#exampleModal').modal('show');
                    CargarFormulario();
                    consultarMultaID(this.value);
                }
                botonEditarMulta.className = "btn btn-danger";

                celdaOpcion.appendChild(botonEditarMulta);
                trRegistro.appendChild(celdaOpcion);

                let botonEliminarMulta = document.createElement("button");
                botonEliminarMulta.innerHTML = "<i class='fas fa-minus-circle'></i> Eliminar";
                botonEliminarMulta.className = "btn btn-dark";

                let multaIdParaEliminar = result[i]["id"];
                botonEliminarMulta.onclick = function() {
                    eliminarMulta(multaIdParaEliminar);
                }
                celdaOpcion.appendChild(botonEliminarMulta);
                trRegistro.appendChild(celdaOpcion);

                cuerpoTablaMulta.appendChild(trRegistro);
            }
        },
        error: function(error) {
            alert("Error en la petición: " + error);
        }
    });
}

function obtenerNombreUsuario(id, celdaUsuario) {
    // Hacer una petición AJAX para obtener el nombre del usuario
    $.ajax({
        url: 'http://10.192.66.35:8000/libreria/api/v1/usuario'+ '/' + id + '/',  // Ajusta la URL según tu configuración
        //url: 'http://192.168.1.8:8000/libreria/api/v1/usuario'+ '/' + id + '/',  // Ajusta la URL según tu configuración
        type: 'GET',
        success: function (usuario) {
            celdaUsuario.innerText = usuario.nombreUsuario;
        },
        error: function (error) {
            console.error('Error obteniendo nombre de usuario: ', error);
        }
    });
}

function obtenerEstadoPrestamo(id, celdaEstadoPrestamo) {
    // Hacer una petición AJAX para obtener el título del libro
    $.ajax({
       url: 'http://10.192.66.35:8000/libreria/api/v1/prestamo'+ '/' + id + '/',  // Ajusta la URL según tu configuración
       // url: 'http://192.168.1.8:8000/libreria/api/v1/prestamo'+ '/' + id + '/',  // Ajusta la URL según tu configuración
        type: 'GET',
        success: function (prestamo) {
            celdaEstadoPrestamo.innerText = prestamo.estado_prestamo;
            
        },
        error: function (error) {
            console.error('Error obteniendo estado del préstamo: ', error);
        }
    });
}


function RegistrarMulta() {
    let valor_multa = document.getElementById("valor_multa").value;
    let fecha_multa = document.getElementById("fecha_multa").value;
    let usuario = document.getElementById("usuario").value;
    let prestamo = document.getElementById("prestamo").value;
    let estado_multa = document.getElementById("estado_multa").value;

    let formData = {
        "valor_multa": valor_multa,
        "fecha_multa": fecha_multa,
        "usuario": usuario,
        "prestamo": prestamo,
        "estado_multa": estado_multa
        
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
   
    var valor_multa = document.getElementById("valor_multa");
    var fecha_multa = document.getElementById("fecha_multa");
    var usuario = document.getElementById("usuario"); 
    var prestamo = document.getElementById("prestamo"); 
    var estado_multa = document.getElementById("estado_multa"); 
 
 
   
    

    return validarValorMulta(valor_multa) && validarFechaMulta(fecha_multa) && validarUsuarioMulta(usuario) 
    && validarPrestamoMulta(prestamo) && validarEstadoMulta(estado_multa);
}

function validarValorMulta(valorMulta) {
    if (!valorMulta || !valorMulta.value) {
        return false;
    }

    let valor = valorMulta.value;
    let valido = true;
    if (valor.length < 1 || valor.length > 6) {
        valido = false;
    }

    

    if (valido) {
        valorMulta.className = "form-control is-valid";
    } else {
        valorMulta.className = "form-control is-invalid";
    }
    return valido;
}


function validarFechaMulta(fechaMulta) {
    if (!fechaMulta || !fechaMulta.value) {
        return false;
    }

    let valor = fechaMulta.value;
    let valido = true;
    if (valor.length < 1 || valor.length > 60) {
        valido = false;
    }

    if (valido) {
        fechaMulta.className = "form-control is-valid";
    } else {
        fechaMulta.className = "form-control is-invalid";
    }
    return valido;
}


function validarUsuarioMulta(usuarioMulta){
    var valido=true;
    if(usuarioMulta.value.length <=0 || usuarioMulta.value.length > 45){
        valido=false;
    }

    if (valido) {
        usuarioMulta.className = "form-control is-valid"
    }
    else{
        usuarioMulta.className = "form-control is-invalid"
    }
    return valido;
}

function validarPrestamoMulta(prestamoMulta){
    var valido=true;
    if(prestamoMulta.value.length <=0 || prestamoMulta.value.length > 20){
        valido=false;
    }

    if (valido) {
        prestamoMulta.className = "form-control is-valid"
    }
    else{
        prestamoMulta.className = "form-control is-invalid"
    }
    return valido;
}

function validarEstadoMulta(estado){
    var valido=true;
    if(estado.value.length <= 0 || estado.value.length > 20){
        valido=false;
    }

    if (valido) {
        estado.className = "form-control is-valid"
    }
    else{
        estado.className = "form-control is-invalid"
    }
    return valido;
}

/* metodo para obtener los datos en el modal de actualizar*/ 
//1.Crear petición que traiga la información del medico por id
function consultarMultaID(id){
    //alert(id);
    $.ajax({
        url:url+id,
        type:"GET",
        success: function(result){
            document.getElementById("id").value=result["id"];
            document.getElementById("valor_multa").value = result["valor_multa"];
            document.getElementById("fecha_multa").value=result["fecha_multa"];
            document.getElementById("usuario").value=result[ "usuario"];
            document.getElementById("prestamo").value=result[ "prestamo"];
            document.getElementById("estado_multa").value=result[ "estado_multa"];
  
        }
    });
  }

function LimpiarMulta(){
    document.getElementById("valor_multa").className="form-control";
    document.getElementById("fecha_multa").className="form-control";
    document.getElementById("usuario").className="form-control";
    document.getElementById("prestamo").className="form-control";
    document.getElementById("estado_multa").className="form-control";
    

    document.getElementById("valor_multa").value = "";
    document.getElementById("fecha_multa").value = "";
    document.getElementById("usuario").value = "";
    document.getElementById("prestamo").value = "";
    document.getElementById("estado_multa").value = "";
 
 
}


// funcion  de deshabilitar prestamo
function eliminarMulta(id){
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
              'La multa ha sido eliminada',
              'success'
            );
            listarMulta();//recarga la lista de usuarios
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

function CargarFormulario() {
    cargarUsuario();
    cargarPrestamo();
}

// Función para traer los libros
function cargarPrestamo() {
    let urlPrestamo = "http://10.192.66.35:8000/libreria/api/v1/prestamo/";
    //let urlPrestamo = "http://192.168.1.8:8000/libreria/api/v1/prestamo";

    $.ajax({
        url: urlPrestamo,
        type: "GET",
        success: function (result) {
            let prestamo = document.getElementById("prestamo");
            prestamo.innerHTML = '<option selected disabled value="">Estado préstamo...</option>'; // Añadir opción por defecto
            
            for (let i = 0; i < result.length; i++) {
                let estadoPrestamo = document.createElement("option");
                estadoPrestamo.value = result[i]["id"];
                estadoPrestamo.innerText = result[i]["estado_prestamo"];
                prestamo.appendChild(estadoPrestamo);
            }
        },
    });
}


// Función para traer los libros
function cargarUsuario() {
    let urlUsuario = "http://10.192.66.35:8000/libreria/api/v1/usuario/";
    //let urlUsuario = "http://192.168.1.8:8000/libreria/api/v1/usuario";

    $.ajax({
        url: urlUsuario,
        type: "GET",
        success: function (result) {
            let usuario = document.getElementById("usuario");

            usuario.innerHTML = '<option selected disabled value="">Usuario...</option>'; // Añadir opción por defecto
            
            for (let i = 0; i < result.length; i++) {
                let nombreUsuarioCompleto = document.createElement("option");
                nombreUsuarioCompleto.value = result[i]["id"];
                nombreUsuarioCompleto.innerText = result[i]["nombreUsuario"];
                usuario.appendChild(nombreUsuarioCompleto);
            }
        },
    });
}


//Cuando le damos click al boton de guardar, este llamara a la function UpdateProducto por medio del onclick******

function updateMulta() {
    var id = document.getElementById("id").value;
    consultarMultaID(id);
    let formData = {
        "valor_multa": document.getElementById("valor_multa").value,
        "fecha_multa": document.getElementById("fecha_multa").value,
        "usuario": document.getElementById("usuario").value,
        "prestamo": document.getElementById("prestamo").value,
        "estado_multa": document.getElementById("estado_multa").value
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

            listarMulta(); //Lista los prestamos después de actualizar
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


