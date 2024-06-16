//Se almacena la URL de la API
let url="http://localhost:8000/libreria/api/v1/libro/";

function listarLibro() {
    $.ajax({
        url:url,
        type: "GET",
        success: function(result){//success: funcion que se ejecuta cusndo la peticion tiene exito
            console.log(result);
            let cuerpoTablaLibro = document.getElementById("cuerpoTablaLibro");
            cuerpoTablaLibro.innerHTML="";
            for (let i = 0; i < result.length; i++) {
               //se crea una etiqueta tr por cada registro
                let trRegistro = document.createElement("tr");//fila por cada registro de la tabla
                let celdaId = document.createElement("td");
                let celdaTitulo = document.createElement("td");
                let celdaAutor = document.createElement("td");
                let celdaIsbn = document.createElement("td");
                let celdaGenero = document.createElement("td");
                let celdaDisponibles = document.createElement("td");
                let celdaOcupados = document.createElement("td");
            
               
                
                //almacenamos en valor
                
                celdaId.innerText = result[i]["id"];
                celdaTitulo.innerText = result[i]["titulo"];
                celdaAutor.innerText = result[i]["autor"];
                celdaIsbn.innerText = result[i]["isbn"];
                celdaGenero.innerText = result[i]["genero"];
                celdaDisponibles.innerText = result[i]["num_ejem_disponibles"];
                celdaOcupados.innerText = result[i]["num_ejem_ocupados"];

    
                
                //agregando a los td a su respectivo th y agregandolos a la fila

                trRegistro.appendChild(celdaId);
                trRegistro.appendChild(celdaTitulo);
                trRegistro.appendChild(celdaAutor);
                trRegistro.appendChild(celdaIsbn);
                trRegistro.appendChild(celdaGenero);
                trRegistro.appendChild(celdaDisponibles);
                trRegistro.appendChild(celdaOcupados);

                
                //boton editar 
                let celdaOpcion= document.createElement("td");
                let botonEditarLibro= document.createElement("button");
                botonEditarLibro.value=result[i]["id"];
                botonEditarLibro.innerHTML="<i class='fas fa-edit'></i> Editar"; 

                botonEditarLibro.onclick=function(e){
                    $('#exampleModal').modal('show');
                    consultarLibroID(this.value); 
                }
                botonEditarLibro.className= "btn btn-danger"

                celdaOpcion.appendChild(botonEditarLibro); 
                trRegistro.appendChild(celdaOpcion);

                cuerpoTablaLibro.appendChild(trRegistro);//se traen todos los registros

                 //boton desahiblitar- la funcion de deshabilitar se encuentra abajo 
                 let botonEliminarLibro= document.createElement("button");
                 botonEliminarLibro.innerHTML="<i class='fas fa-minus-circle'></i> Eliminar"; 
                 botonEliminarLibro.className="btn btn-dark"; 
 
                 let libroIdParaEliminar= result[i]["id"]; 
                 botonEliminarLibro.onclick=function(){
                   eliminarLibro(libroIdParaEliminar);
                 }
                 celdaOpcion.appendChild(botonEliminarLibro); 
                 trRegistro.appendChild(celdaOpcion)
            }
        },
        error:function(error){
            alert("Error en la peticion ${error}");
        }
    })
 
}

function RegistrarLibro() {
    let titulo = document.getElementById("titulo").value;
    let autor = document.getElementById("autor").value;
    let isbn = document.getElementById("isbn").value;
    let genero = document.getElementById("genero").value;
    let num_ejem_disponibles = document.getElementById("num_ejem_disponibles").value;
    let num_ejem_ocupados = document.getElementById("num_ejem_ocupados").value;

    let formData = {
        "titulo": titulo,
        "autor": autor,
        "isbn": isbn,
        "genero": genero,
        "num_ejem_disponibles": num_ejem_disponibles,
        "num_ejem_ocupados": num_ejem_ocupados
    };

    if (validarCampos()) {
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify(formData),
            contentType: "application/json",
            success: function(result) {
                Swal.fire({
                    title: "Excelente",
                    text: "Su registro se guardó correctamente",
                    icon: "success"
                });
                listarLibro(); // Lista los libros después de registrar
            },
            error: function(error) {
                Swal.fire("Error", "Error al guardar " + error.responseText, "error");
            }
        });
    } else {
        Swal.fire({
            title: "Error!",
            text: "Complete los campos correctamente",
            icon: "error"
        });
    }
}


function validarCampos() {
   
    var titulo = document.getElementById("titulo");
    var autor = document.getElementById("autor");
    var isbn = document.getElementById("isbn"); 
    var genero = document.getElementById("genero"); 
    var num_ejem_disponibles = document.getElementById("num_ejem_disponibles");
    var num_ejem_ocupados = document.getElementById("num_ejem_ocupados"); 
 
   
    

    return validarTitulo(titulo) && validarAutor(autor) && validarIsbn(isbn) 
         && validarGenero(genero) && validarDisponibles(num_ejem_disponibles) && validarOcupados(num_ejem_ocupados);
}

function validarTitulo(TituloLibro) {
    if (!TituloLibro || !TituloLibro.value) {
        return false;
    }

    let valor = TituloLibro.value;
    let valido = true;
    if (valor.length <=0 || valor.length > 200) {
        valido = false;
    }

    if (valido) {
        TituloLibro.className = "form-control is-valid";
    } else {
        TituloLibro.className = "form-control is-invalid";
    }
    return valido;
}

function validarAutor(NombreAutor) {
    if (!NombreAutor || !NombreAutor.value) {
        return false;
    }

    let valor = NombreAutor.value;
    let valido = true;
    if (valor.length < 3 || valor.length > 60) {
        valido = false;
    }

    if (valido) {
        NombreAutor.className = "form-control is-valid";
    } else {
        NombreAutor.className = "form-control is-invalid";
    }
    return valido;
}


function validarIsbn(Isbn){
    var valido=true;
    if(Isbn.value.length <=0 || Isbn.value.length > 13){
        valido=false;
    }

    if (valido) {
        Isbn.className = "form-control is-valid"
    }
    else{
        Isbn.className = "form-control is-invalid"
    }
    return valido;
}

function validarGenero(TipoGenero){
    var valido=true;
    if(TipoGenero.value.length <= 0 || TipoGenero.value.length > 10){
        valido=false;
    }

    if (valido) {
        TipoGenero.className = "form-control is-valid"
    }
    else{
        TipoGenero.className = "form-control is-invalid"
    }
    return valido;
}


function validarDisponibles(LibrosDisponibles) {
    
    let valor = LibrosDisponibles.value;
    let valido = true;
    if (valor.length < 1 || valor.length > 3) {
        valido = false
    }

    if (valido) {
        LibrosDisponibles.className = "form-control is-valid"
    }
    else{
        LibrosDisponibles.className = "form-control is-invalid"
    }
    return valido;
}


function validarOcupados(LibrosOcupados){
    let valor = LibrosOcupados.value;
    let valido = true;
    if (valor.length < 1 || valor.length > 3) {
        valido = false
    }
    if (valido) {
        LibrosOcupados.className = "form-control is-valid"
    }
    else{
        LibrosOcupados.className = "form-control is-invalid"
    }
    return valido;
}

function LimpiarLibro(){
    document.getElementById("titulo").className="form-control";
    document.getElementById("autor").className="form-control";
    document.getElementById("isbn").className="form-control";
    document.getElementById("genero").className="form-control";
    document.getElementById("num_ejem_disponibles").className="form-control";
    document.getElementById("num_ejem_ocupados").className="form-control";


    document.getElementById("titulo").value = "";
    document.getElementById("autor").value = "";
    document.getElementById("isbn").value = "";
    document.getElementById("genero").value = "";
    document.getElementById("num_ejem_disponibles").value = "";
    document.getElementById("num_ejem_ocupados").value = "";
 
}


// funcion  de deshabilitar libro
function eliminarLibro(id){
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
              'El libro ha sido eliminado ',
              'success'
            );
            listarLibro();//recarga la lista de libros
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
function consultarLibroID(id){
    //alert(id);
    $.ajax({
        url:url+id,
        type:"GET",
        success: function(result){
            
            document.getElementById("id").value=result["id"];
            document.getElementById("titulo").value=result["titulo"];
            document.getElementById("autor").value=result["autor"];
            document.getElementById("isbn").value=result["isbn"];
            document.getElementById("genero").value=result["genero"];
            document.getElementById("num_ejem_disponibles").value=result["num_ejem_disponibles"];
            document.getElementById("num_ejem_ocupados").value=result["num_ejem_ocupados"];

        }
    });
}

//Cuando le damos click al boton de guardar, este llamara a la function UpdateProducto por medio del onclick******
function updateLibro() {
    var id = document.getElementById("id").value;

    let formData = {
        "titulo": document.getElementById("titulo").value,
        "autor": document.getElementById("autor").value,
        "isbn": document.getElementById("isbn").value,
        "genero": document.getElementById("genero").value,
        "num_ejem_disponibles": document.getElementById("num_ejem_disponibles").value,
        "num_ejem_ocupados": document.getElementById("num_ejem_ocupados").value
    };

    if (validarCampos()) {
        $.ajax({
            url: url + id,
            type: "PUT",
            data: JSON.stringify(formData),
            contentType: "application/json",
            success: function(result) {
                Swal.fire({
                    title: "Excelente",
                    text: "Su registro se actualizó correctamente",
                    icon: "success"
                });
                $('#exampleModal').modal('hide');
                listarLibro(); // Lista los libros después de actualizar
            },
            error: function(error) {
                Swal.fire("Error", "Error al guardar", "error");
            }
        });
    } else {
        Swal.fire({
            title: "Error!",
            text: "Complete los campos correctamente",
            icon: "error"
        });
    }
}

