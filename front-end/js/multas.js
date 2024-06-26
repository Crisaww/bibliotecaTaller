//Se almacena la URL de la API
let url="http://10.192.66.25:8000/libreria/api/v1/multa/";
//let url="http://192.168.1.8:8000/libreria/api/v1/prestamo/";

function listarMulta() {
    $.ajax({
        url:url,
        type: "GET",
        success: function(result){//success: funcion que se ejecuta cusndo la peticion tiene exito
            console.log(result);
            let cuerpoTablaMulta = document.getElementById("cuerpoTablaMulta");
            cuerpoTablaMulta.innerHTML="";
            for (let i = 0; i < result.length; i++) {
               //se crea una etiqueta tr por cada registro
                let trRegistro = document.createElement("tr");//fila por cada registro de la tabla
                let celdaId = document.createElement("td");
                let celdaFechaPrestamo = document.createElement("td");
                let celdaFechaDevolucion = document.createElement("td");
                let celdaUsuario = document.createElement("td");
                let celdaLibro = document.createElement("td");
                let celdaEstadoPrestamo = document.createElement("td");
            
               
                
                //almacenamos en valor
                
                celdaId.innerText = result[i]["id"];
                celdaFechaPrestamo.innerText = result[i]["fecha_prestamo"];
                celdaFechaDevolucion.innerText = result[i]["fecha_devolucion"];
                celdaUsuario.innerText = nombreUsuarioCompleto = result[i]["usuario"]["nombreUsuario"];
                celdaLibro.innerText = nombreLibroCompleto = result[i]["libro"]["titulo"];
                celdaEstadoPrestamo.innerText = result[i]["estado_prestamo"];
            

    
                
                //agregando a los td a su respectivo th y agregandolos a la fila

                trRegistro.appendChild(celdaId);
                trRegistro.appendChild(celdaFechaPrestamo);
                trRegistro.appendChild(celdaFechaDevolucion);
                trRegistro.appendChild(celdaUsuario);
                trRegistro.appendChild(celdaLibro);
                trRegistro.appendChild(celdaEstadoPrestamo);
                

                
                //boton editar 
                let celdaOpcion= document.createElement("td");
                let botonEditarMulta= document.createElement("button");
                botonEditarMulta.value=result[i]["id"];
                botonEditarMulta.innerHTML="<i class='fas fa-edit'></i> Editar"; 

                botonEditarMulta.onclick=function(e){
                    $('#exampleModal').modal('show');
                    CargarFormulario();
                    consultarMultaID(this.value); 
                }
                botonEditarMulta.className= "btn btn-danger"

                celdaOpcion.appendChild(botonEditarMulta); 
                trRegistro.appendChild(celdaOpcion);

                cuerpoTablaMulta.appendChild(trRegistro);//se traen todos los registros

                 //boton desahiblitar- la funcion de deshabilitar se encuentra abajo 
                 let botoneliminarMulta= document.createElement("button");
                 botoneliminarMulta.innerHTML="<i class='fas fa-minus-circle'></i> Eliminar"; 
                 botoneliminarMulta.className="btn btn-dark"; 
 
                 let multaIdParaEliminar= result[i]["id"]; 
                 botoneliminarMulta.onclick=function(){
                   eliminarMulta(multaIdParaEliminar);
                 }
                 celdaOpcion.appendChild(botoneliminarMulta); 
                 trRegistro.appendChild(celdaOpcion)
            }
        },
        error:function(error){
            alert("Error en la peticion ${error}");
        }
    })
 
}

function RegistrarMulta() {
    let fecha_prestamo = document.getElementById("fecha_prestamo").value;
    let fecha_devolucion = document.getElementById("fecha_devolucion").value;
    let usuario = document.getElementById("usuario").value;
    let libro = document.getElementById("libro").value;
    let estado_prestamo = document.getElementById("estado_prestamo").value;

    let formData = {
        "fecha_prestamo": fecha_prestamo,
        "fecha_devolucion": fecha_devolucion,
        "usuario": usuario,
        "libro": libro,
        "estado_prestamo": estado_prestamo
        
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
   
    var fecha_prestamo = document.getElementById("fecha_prestamo");
    var fecha_devolucion = document.getElementById("fecha_devolucion");
    var usuario = document.getElementById("usuario"); 
    var libro = document.getElementById("libro"); 
    var estado_prestamo = document.getElementById("estado_prestamo"); 
 
 
   
    

    return validarFechaPrestamo(fecha_prestamo) && validarFechaDevolucion(fecha_devolucion) && validarUsuarioMulta(usuario) 
    && validarLibroPrestado(libro) && validarEstadoPrestamo(estado_prestamo);
}

function validarFechaPrestamo(fechaPrestamo) {
    if (!fechaPrestamo || !fechaPrestamo.value) {
        return false;
    }

    let valor = fechaPrestamo.value;
    let valido = true;
    if (valor.length < 1 || valor.length > 60) {
        valido = false;
    }

    if (valido) {
        fechaPrestamo.className = "form-control is-valid";
    } else {
        fechaPrestamo.className = "form-control is-invalid";
    }
    return valido;
}


function validarFechaDevolucion(fechaDevolucion) {
    if (!fechaDevolucion || !fechaDevolucion.value) {
        return false;
    }

    let valor = fechaDevolucion.value;
    let valido = true;
    if (valor.length < 1 || valor.length > 60) {
        valido = false;
    }

    if (valido) {
        fechaDevolucion.className = "form-control is-valid";
    } else {
        fechaDevolucion.className = "form-control is-invalid";
    }
    return valido;
}


function validarUsuarioMulta(usuarioPrestamo){
    var valido=true;
    if(usuarioPrestamo.value.length <=0 || usuarioPrestamo.value.length > 45){
        valido=false;
    }

    if (valido) {
        usuarioPrestamo.className = "form-control is-valid"
    }
    else{
        usuarioPrestamo.className = "form-control is-invalid"
    }
    return valido;
}

function validarLibroPrestado(libroPrestado){
    var valido=true;
    if(libroPrestado.value.length <=0 || libroPrestado.value.length > 100){
        valido=false;
    }

    if (valido) {
        libroPrestado.className = "form-control is-valid"
    }
    else{
        libroPrestado.className = "form-control is-invalid"
    }
    return valido;
}

function validarEstadoPrestamo(estado){
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
            document.getElementById("fecha_prestamo").value = result["fecha_prestamo"];
            document.getElementById("fecha_devolucion").value=result["fecha_devolucion"];
            document.getElementById("usuario").value=result[ "usuario"]["nombreUsuario"];
            document.getElementById("libro").value=result[ "libro"]["titulo"];
            document.getElementById("estado_prestamo").value=result[ "estado_prestamo"];
  
        }
    });
  }

function LimpiarMulta(){
    document.getElementById("fecha_prestamo").className="form-control";
    document.getElementById("fecha_devolucion").className="form-control";
    document.getElementById("usuario").className="form-control";
    document.getElementById("libro").className="form-control";
    document.getElementById("estado_prestamo").className="form-control";
    

    document.getElementById("fecha_prestamo").value = "";
    document.getElementById("fecha_devolucion").value = "";
    document.getElementById("usuario").value = "";
    document.getElementById("libro").value = "";
    document.getElementById("estado_prestamo").value = "";
 
 
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
              'El usuario ha sido eliminado ',
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
    cargarLibro();
    cargarUsuario();
}

// Función para traer los libros
function cargarLibro() {
    let urlLibro = "http://192.168.1.8:8000/libreria/api/v1/libro/";

    $.ajax({
        url: urlLibro,
        type: "GET",
        success: function (result) {
            let libro = document.getElementById("libro");
            libro.innerHTML = '<option selected disabled value="">Libro...</option>'; // Añadir opción por defecto
            
            for (let i = 0; i < result.length; i++) {
                let nombreLibroCompleto = document.createElement("option");
                nombreLibroCompleto.value = result[i]["id"];
                nombreLibroCompleto.innerText = result[i]["titulo"];
                libro.appendChild(nombreLibroCompleto);
            }
        },
    });
}


// Función para traer los libros
function cargarUsuario() {
    let urlUsuario = "http://192.168.1.8:8000/libreria/api/v1/usuario/";

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
        "fecha_prestamo": document.getElementById("fecha_prestamo").value,
        "fecha_devolucion": document.getElementById("fecha_devolucion").value,
        "usuario": document.getElementById("usuario").value,
        "libro": document.getElementById("libro").value,
        "estado_prestamo": document.getElementById("estado_prestamo").value
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


