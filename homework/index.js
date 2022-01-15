let server='http://localhost:5000/amigos'
//!  Parametros de FETCH
const get={
    method: "GET"
}
const post={
    method: "POST"
}
const del={
    method: "DELETE"
}


//*    Funciones 

const muestraAmigos = function(){    
    fetch(server,get)
    .then(response => response.json())
    .then(function(data)
    {    
        let lista = document.getElementById("lista")
        lista.innerHTML=""        
        for (const pers of data) {                       
            let li = document.createElement("li");
            li.innerText = pers.name
            lista.appendChild(li)           
            var cruz = document.createElement("button");
            cruz.innerHTML=""; 
            cruz.classList="btnDel"          
            cruz.addEventListener("click", function(){
                eliminaAmigos(pers.id)
            })
            li.appendChild(cruz)                  
        }
    }
    );   
}


const buscaAmigos = function(){
    muestraAmigos();
     fetch(server,get)
     .then(response => response.json())
     .then(function(data)
     {
     let input = document.getElementById("input");
     let span = document.getElementById("amigo")
     for (const per of data) {
         if(input.value==per.id){ 
             span.innerHTML = per.name
            }
     }
     })
 }

const eliminaAmigos = function(id){
    fetch( `${server}/${id}`,del)
    .then(res => res.text()) // or res.json()
    .then(function(el) { 
        muestraAmigos()
        let sucess = document.getElementById("sucess");
        sucess.innerText = "Tu amigo fue borrado con exito"
    }                 
    )}

// * Acciones de los botones    

//! Actualiza amigos
$('#boton').click(muestraAmigos)
//! Buscar amigo
$('#search').click(buscaAmigos);
//! Eliminar amigo
$('#delete').click(function(){ 
    let id= document.getElementById("inputDelete").value;
    id=parseInt(id)
    eliminaAmigos(id);
});




