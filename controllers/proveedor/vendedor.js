const conn = require('../../database/conexionpg')

const getLstVendedoresTodos = (request, response) => {

    const id = parseInt(request.params.id);
    console.log(id);

    let query =     'SELECT public."PERFIL_VENDEDOR"."ID_PERFIL_VENDEDOR", public."PERFIL_VENDEDOR"."ApPaterno",'+
                            ' public."PERFIL_VENDEDOR"."ApMaterno", public."PERFIL_VENDEDOR"."Nombre", public."PERFIL_VENDEDOR"."DNI",'+
                            ' public."PERFIL_VENDEDOR"."FK_ID_ESTADO_ACTIVIDAD", public."ESTADO_ACTIVIDAD"."ESTADO_ACTIVIDAD"'+
                            ' FROM public."PERFIL_VENDEDOR"'+
                            ' INNER JOIN public."ESTADO_ACTIVIDAD"'+
                            ' ON public."PERFIL_VENDEDOR"."FK_ID_ESTADO_ACTIVIDAD" = public."ESTADO_ACTIVIDAD"."ID_ESTADO_ACTIVIDAD"'+
                            ' WHERE public."PERFIL_VENDEDOR"."FK_ID_PROVEEDOR" = $1;';
    
        conn.query(query, [id])
        .then(lst_vendedores_todos=>response.json({
            success:true,lst_vendedores_todos
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}

const getLstVendedoresEstado = (request, response) => {

    const id = parseInt(request.params.id);
    const estado = parseInt(request.params.estado);
    console.log(id+"--"+estado);

    let query =     'SELECT public."PERFIL_VENDEDOR"."ID_PERFIL_VENDEDOR", public."PERFIL_VENDEDOR"."ApPaterno",'+
                            ' public."PERFIL_VENDEDOR"."ApMaterno", public."PERFIL_VENDEDOR"."Nombre", public."PERFIL_VENDEDOR"."DNI",'+
                            ' public."PERFIL_VENDEDOR"."FK_ID_ESTADO_ACTIVIDAD", public."ESTADO_ACTIVIDAD"."ESTADO_ACTIVIDAD"'+
                            ' FROM public."PERFIL_VENDEDOR"'+
                            ' INNER JOIN public."ESTADO_ACTIVIDAD"'+
                            ' ON public."PERFIL_VENDEDOR"."FK_ID_ESTADO_ACTIVIDAD" = public."ESTADO_ACTIVIDAD"."ID_ESTADO_ACTIVIDAD"'+
                            ' WHERE public."PERFIL_VENDEDOR"."FK_ID_PROVEEDOR" = $1'+
                            ' AND public."PERFIL_VENDEDOR"."FK_ID_ESTADO_ACTIVIDAD" = $2'+
                            ' ORDER BY public."PERFIL_VENDEDOR"."ID_PERFIL_VENDEDOR" ASC;';

        conn.query(query, [id, estado])
        .then(lst_vendedores_Estado=>response.json({
            success:true,lst_vendedores_Estado
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}
/********************/
const getVendedoresDetalle = (request, response) => {

    const id_vendedor = parseInt(request.params.id_vendedor);
    console.log(id_vendedor);

    let query =     'SELECT public."PERFIL_VENDEDOR"."ID_PERFIL_VENDEDOR", public."PERFIL_VENDEDOR"."ApPaterno", public."PERFIL_VENDEDOR"."ApMaterno",'+
                            ' public."PERFIL_VENDEDOR"."Nombre", public."PERFIL_VENDEDOR"."DNI", public."PERFIL_VENDEDOR"."Direccion", public."PERFIL_VENDEDOR"."Correo",'+
                            ' public."ESTADO_ACTIVIDAD"."ESTADO_ACTIVIDAD", public."PERFIL_VENDEDOR"."FK_ID_ESTADO_ACTIVIDAD"'+
                            ' FROM public."PERFIL_VENDEDOR"'+
                            ' INNER JOIN public."ESTADO_ACTIVIDAD"'+
                            ' ON public."ESTADO_ACTIVIDAD"."ID_ESTADO_ACTIVIDAD" = public."PERFIL_VENDEDOR"."FK_ID_ESTADO_ACTIVIDAD"'+
                            ' WHERE public."PERFIL_VENDEDOR"."ID_PERFIL_VENDEDOR" = $1;';
    
        conn.query(query, [id_vendedor])
        .then(vendedor_detalle=>response.json({
            success:true,vendedor_detalle
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}
/*******************/
const getLstVendedoresBuscarCodigo = (request, response) => {
    const id = parseInt(request.params.id);
    const dato = parseInt(request.params.dato);
    console.log(id+"-"+dato);

    let query =     'SELECT public."PERFIL_VENDEDOR"."ID_PERFIL_VENDEDOR", public."PERFIL_VENDEDOR"."ApPaterno",'+
                            ' public."PERFIL_VENDEDOR"."ApMaterno", public."PERFIL_VENDEDOR"."Nombre", public."PERFIL_VENDEDOR"."DNI",'+
                            ' public."PERFIL_VENDEDOR"."FK_ID_ESTADO_ACTIVIDAD", public."ESTADO_ACTIVIDAD"."ESTADO_ACTIVIDAD"'+
                            ' FROM public."PERFIL_VENDEDOR"'+
                            ' INNER JOIN public."ESTADO_ACTIVIDAD"'+
                            ' ON public."PERFIL_VENDEDOR"."FK_ID_ESTADO_ACTIVIDAD" = public."ESTADO_ACTIVIDAD"."ID_ESTADO_ACTIVIDAD"'+
                            ' WHERE public."PERFIL_VENDEDOR"."FK_ID_PROVEEDOR" = $1'+
                            ' AND public."PERFIL_VENDEDOR"."ID_PERFIL_VENDEDOR" = $2'+
                            ' ORDER BY public."PERFIL_VENDEDOR"."ID_PERFIL_VENDEDOR" ASC;';
                            
        conn.query(query, [id, dato])
        .then(lst_buscar_vendedores_codigo=>response.json({
            success:true,lst_buscar_vendedores_codigo
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}

const getLstVendedoresBuscarDni = (request, response) => {

    const id = parseInt(request.params.id);
    const dato = "%"+request.params.dato+"%";
    console.log(id+"-"+dato);

    let query =     'SELECT public."PERFIL_VENDEDOR"."ID_PERFIL_VENDEDOR", public."PERFIL_VENDEDOR"."ApPaterno",'+
                            ' public."PERFIL_VENDEDOR"."ApMaterno", public."PERFIL_VENDEDOR"."Nombre", public."PERFIL_VENDEDOR"."DNI",'+
                            ' public."PERFIL_VENDEDOR"."FK_ID_ESTADO_ACTIVIDAD", public."ESTADO_ACTIVIDAD"."ESTADO_ACTIVIDAD"'+
                            ' FROM public."PERFIL_VENDEDOR"'+
                            ' INNER JOIN public."ESTADO_ACTIVIDAD"'+
                            ' ON public."PERFIL_VENDEDOR"."FK_ID_ESTADO_ACTIVIDAD" = public."ESTADO_ACTIVIDAD"."ID_ESTADO_ACTIVIDAD"'+
                            ' WHERE public."PERFIL_VENDEDOR"."FK_ID_PROVEEDOR" = $1'+
                            ' AND UPPER(public."PERFIL_VENDEDOR"."DNI") LIKE UPPER(\''+dato+'\')'+
                            ' ORDER BY public."PERFIL_VENDEDOR"."ID_PERFIL_VENDEDOR" ASC;';
    
        conn.query(query, [id])
        .then(lst_buscar_vendedores_dni=>response.json({
            success:true,lst_buscar_vendedores_dni
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}

const getLstVendedoresBuscarApellidos = (request, response) => {

    const id = parseInt(request.params.id);
    const dato = "%"+request.params.dato+"%";
    console.log(id+"-"+dato);

    let query =     'SELECT public."PERFIL_VENDEDOR"."ID_PERFIL_VENDEDOR", public."PERFIL_VENDEDOR"."ApPaterno",'+
                            ' public."PERFIL_VENDEDOR"."ApMaterno", public."PERFIL_VENDEDOR"."Nombre", public."PERFIL_VENDEDOR"."DNI",'+
                            ' public."PERFIL_VENDEDOR"."FK_ID_ESTADO_ACTIVIDAD", public."ESTADO_ACTIVIDAD"."ESTADO_ACTIVIDAD"'+
                            ' FROM public."PERFIL_VENDEDOR"'+
                            ' INNER JOIN public."ESTADO_ACTIVIDAD"'+
                            ' ON public."PERFIL_VENDEDOR"."FK_ID_ESTADO_ACTIVIDAD" = public."ESTADO_ACTIVIDAD"."ID_ESTADO_ACTIVIDAD"'+
                            ' WHERE public."PERFIL_VENDEDOR"."FK_ID_PROVEEDOR" = $1'+
                            ' AND UPPER(public."PERFIL_VENDEDOR"."ApPaterno") LIKE UPPER(\''+dato+'\')'+
                            ' ORDER BY public."PERFIL_VENDEDOR"."ID_PERFIL_VENDEDOR" ASC;';
    
        conn.query(query, [id])
        .then(lst_buscar_vendedores_apellidos=>response.json({
            success:true,lst_buscar_vendedores_apellidos
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}
/*******************/
const postCrearVendedor = (request, response) => {

    const { apaterno, amaterno, nombres, dni, direccion, correo, id_proveedor} = request.body
    console.log(apaterno+"/"+amaterno+"/"+nombres+"/"+dni+"/"+direccion+"/"+correo+"/"+id_proveedor);
    //let query = 'INSERT INTO users (name, email) VALUES ($1, $2)';
    let query =     'INSERT INTO public."PERFIL_VENDEDOR"('+
                            ' "ApPaterno", "ApMaterno", "Nombre", "DNI", "Direccion", "Correo", "Clave", "FK_ID_PROVEEDOR", "FK_ID_ESTADO_ACTIVIDAD")'+
                            ' VALUES ($1, $2, $3, $4, $5, $6, 123456, $7, 1);';

    conn.query(query, [apaterno, amaterno, nombres, dni, direccion, correo, id_proveedor])
    .then(data=>response.json({
      success:true,data
    }))
    .catch(err=>response.status(500).json({
      success:false,message:err.message,err
    }))
  }
  
const putActualizarVendedor = (request, response) => {
    const id = parseInt(request.params.id)
    const { apaterno, amaterno, nombres, dni, direccion, correo, id_estado_actividad} = request.body
    console.log(id+"/"+apaterno+"/"+amaterno+"/"+nombres+"/"+dni+"/"+direccion+"/"+correo+"/"+id_estado_actividad);

    //let query = 'UPDATE users SET name = $1, email = $2 WHERE id = $3';

    let query =     'UPDATE public."PERFIL_VENDEDOR"'+
                            ' SET "ApPaterno"=$1, "ApMaterno"=$2, "Nombre"=$3, "DNI"=$4, "Direccion"=$5, "Correo"=$6, "FK_ID_ESTADO_ACTIVIDAD"=$7'+
                            ' WHERE public."PERFIL_VENDEDOR"."ID_PERFIL_VENDEDOR" = $8;';

    conn.query(query, [apaterno, amaterno, nombres, dni, direccion, correo, id_estado_actividad, id])
    .then(data=>response.json({
        success:true,data
    }))
    .catch(err=>response.status(500).json({
        success:false,message:err.message,err
    }))
}

module.exports = {
    getLstVendedoresTodos,
    getLstVendedoresEstado,
    getVendedoresDetalle,
    getLstVendedoresBuscarCodigo,
    getLstVendedoresBuscarDni,
    getLstVendedoresBuscarApellidos,
    postCrearVendedor,
    putActualizarVendedor
}