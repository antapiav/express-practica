const conn = require('../../database/conexionpg')

const getLstProveedoresTodos = (request, response) => {

    const id = parseInt(request.params.id);
    console.log(id);

    let query =     'SELECT "ID_PROVEEDOR", "RazonSocial", "RUC", public."ESTADO_ACTIVIDAD"."ESTADO_ACTIVIDAD"'+
                            ' FROM public."PROVEEDOR"'+
                            ' INNER JOIN public."ESTADO_ACTIVIDAD"'+
                            ' ON public."PROVEEDOR"."FK_ID_ESTADO_ACTIVIDAD" = public."ESTADO_ACTIVIDAD"."ID_ESTADO_ACTIVIDAD"'+
                            ' WHERE public."PROVEEDOR"."FK_ID_AGENTE_ADMINISTRADOR" = $1'+
                            ' ORDER BY public."PROVEEDOR"."ID_PROVEEDOR" ASC;';
    
        conn.query(query, [id])
        .then(lst_proveedores_todos=>response.json({
            success:true,lst_proveedores_todos
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}

const getLstProveedoresEstado = (request, response) => {

    const id = parseInt(request.params.id);
    const estado = parseInt(request.params.estado);
    console.log(id+"--"+estado);

    let query =     'SELECT "ID_PROVEEDOR", "RazonSocial", "RUC", public."ESTADO_ACTIVIDAD"."ESTADO_ACTIVIDAD"'+
                            ' FROM public."PROVEEDOR"'+
                            ' INNER JOIN public."ESTADO_ACTIVIDAD"'+
                            ' ON public."PROVEEDOR"."FK_ID_ESTADO_ACTIVIDAD" = public."ESTADO_ACTIVIDAD"."ID_ESTADO_ACTIVIDAD"'+
                            ' WHERE public."PROVEEDOR"."FK_ID_AGENTE_ADMINISTRADOR" = $1'+
                            ' AND public."ESTADO_ACTIVIDAD"."ID_ESTADO_ACTIVIDAD" = $2'+
                            ' ORDER BY public."PROVEEDOR"."ID_PROVEEDOR" ASC;';
        conn.query(query, [id, estado])
        .then(lst_proveedores_Estado=>response.json({
            success:true,lst_proveedores_Estado
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}
/********************/
const getProveedorDetalle = (request, response) => {

    const id_proveedor = parseInt(request.params.id_proveedor);
    console.log(id_proveedor);

    let query =     'SELECT public."PROVEEDOR"."ID_PROVEEDOR", public."PROVEEDOR"."RazonSocial", public."PROVEEDOR"."RUC",'+
                            ' public."PROVEEDOR"."Direccion", public."PROVEEDOR"."Telefono", public."PROVEEDOR"."Correo",'+
                            ' public."ESTADO_ACTIVIDAD"."ID_ESTADO_ACTIVIDAD", public."ESTADO_ACTIVIDAD"."ESTADO_ACTIVIDAD"'+
                            ' FROM public."PROVEEDOR"'+
                            ' INNER JOIN public."ESTADO_ACTIVIDAD"'+
                            ' ON public."PROVEEDOR"."FK_ID_ESTADO_ACTIVIDAD" = public."ESTADO_ACTIVIDAD"."ID_ESTADO_ACTIVIDAD"'+
                            ' WHERE public."PROVEEDOR"."ID_PROVEEDOR" = $1;';
    
        conn.query(query, [id_proveedor])
        .then(proveedor_detalle=>response.json({
            success:true,proveedor_detalle
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}
/*******************/
const getLstProveedoresBuscarCodigo = (request, response) => {
    const id = parseInt(request.params.id);
    const dato = parseInt(request.params.dato);
    console.log(id+"-"+dato);

    let query =     'SELECT public."PROVEEDOR"."ID_PROVEEDOR", public."PROVEEDOR"."RazonSocial", public."PROVEEDOR"."RUC", public."ESTADO_ACTIVIDAD"."ESTADO_ACTIVIDAD"'+
                            ' FROM public."PROVEEDOR"'+
                            ' INNER JOIN public."ESTADO_ACTIVIDAD"'+
                            ' ON public."PROVEEDOR"."FK_ID_ESTADO_ACTIVIDAD" = public."ESTADO_ACTIVIDAD"."ID_ESTADO_ACTIVIDAD"'+
                            ' WHERE public."PROVEEDOR"."FK_ID_AGENTE_ADMINISTRADOR" = $1'+
                            ' AND public."PROVEEDOR"."ID_PROVEEDOR" = $2'+
                            ' ORDER BY public."PROVEEDOR"."ID_PROVEEDOR" ASC;';
    
        conn.query(query, [id, dato])
        .then(lst_buscar_proveedor_codigo=>response.json({
            success:true,lst_buscar_proveedor_codigo
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}

const getLstProveedoresBuscarRuc = (request, response) => {

    const id = parseInt(request.params.id);
    const dato = "%"+request.params.dato+"%";
    console.log(id+"-"+dato);

    let query =     'SELECT public."PROVEEDOR"."ID_PROVEEDOR", public."PROVEEDOR"."RazonSocial", public."PROVEEDOR"."RUC", public."ESTADO_ACTIVIDAD"."ESTADO_ACTIVIDAD"'+
                            ' FROM public."PROVEEDOR"'+
                            ' INNER JOIN public."ESTADO_ACTIVIDAD"'+
                            ' ON public."PROVEEDOR"."FK_ID_ESTADO_ACTIVIDAD" = public."ESTADO_ACTIVIDAD"."ID_ESTADO_ACTIVIDAD"'+
                            ' WHERE public."PROVEEDOR"."FK_ID_AGENTE_ADMINISTRADOR" = $1'+
                            ' AND UPPER(public."PROVEEDOR"."RUC") LIKE UPPER(\''+dato+'\')'+
                            ' ORDER BY public."PROVEEDOR"."ID_PROVEEDOR" ASC;';
    
        conn.query(query, [id])
        .then(lst_buscar_proveedor_ruc=>response.json({
            success:true,lst_buscar_proveedor_ruc
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}

const getLstProveedoresBuscarApellidos = (request, response) => {

    const id = parseInt(request.params.id);
    const dato = "%"+request.params.dato+"%";
    console.log(id+"-"+dato);

    let query =     'SELECT public."PROVEEDOR"."ID_PROVEEDOR", public."PROVEEDOR"."RazonSocial", public."PROVEEDOR"."RUC", public."ESTADO_ACTIVIDAD"."ESTADO_ACTIVIDAD"'+
                            ' FROM public."PROVEEDOR"'+
                            ' INNER JOIN public."ESTADO_ACTIVIDAD"'+
                            ' ON public."PROVEEDOR"."FK_ID_ESTADO_ACTIVIDAD" = public."ESTADO_ACTIVIDAD"."ID_ESTADO_ACTIVIDAD"'+
                            ' WHERE public."PROVEEDOR"."FK_ID_AGENTE_ADMINISTRADOR" = $1'+
                            ' AND UPPER(public."PROVEEDOR"."RazonSocial") LIKE UPPER(\''+dato+'\')'+
                            ' ORDER BY public."PROVEEDOR"."ID_PROVEEDOR" ASC;';
    
        conn.query(query, [id])
        .then(lst_buscar_proveedor_apellidos=>response.json({
            success:true,lst_buscar_proveedor_apellidos
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}
/*******************/
const postCrearProveedor = (request, response) => {
    const { razon_social, ruc, direccion, telefono, correo, id_agente} = request.body
    console.log(razon_social+" "+ruc+" "+direccion+" "+telefono+" "+correo+" "+id_agente);
    //let query = 'INSERT INTO users (name, email) VALUES ($1, $2)';
    let query =     'INSERT INTO public."PROVEEDOR"('+
                            ' "RazonSocial", "RUC", "Direccion", "Telefono", "Correo", "Clave", "FK_ID_ESTADO_ACTIVIDAD", "FK_ID_AGENTE_ADMINISTRADOR")'+
                            ' VALUES ($1, $2, $3, $4, $5, 123456, 1, $6);';

    conn.query(query, [razon_social, ruc, direccion, telefono, correo, id_agente])
    .then(data=>response.json({
      success:true,data
    }))
    .catch(err=>response.status(500).json({
      success:false,message:err.message,err
    }))
  }
  
const putActualizarProveedores = (request, response) => {
    const id = parseInt(request.params.id)
    const { razon_social, ruc, direccion, telefono, correo, id_estado} = request.body
    console.log(razon_social+" "+ruc+" "+direccion+" "+telefono+" "+correo+" "+id_estado);

    //let query = 'UPDATE users SET name = $1, email = $2 WHERE id = $3';

    let query =     'UPDATE public."PROVEEDOR"'+
                            ' SET "RazonSocial"=$1, "RUC"=$2, "Direccion"=$3, "Telefono"=$4, "Correo"=$5, "FK_ID_ESTADO_ACTIVIDAD"=$6'+
                            ' WHERE "ID_PROVEEDOR" = $7;';

    conn.query(query, [razon_social, ruc, direccion, telefono, correo, id_estado, id])
    .then(data=>response.json({
        success:true,data
    }))
    .catch(err=>response.status(500).json({
        success:false,message:err.message,err
    }))
}

module.exports = {
    getLstProveedoresTodos,
    getLstProveedoresEstado,
    getProveedorDetalle,
    getLstProveedoresBuscarCodigo,
    getLstProveedoresBuscarRuc,
    getLstProveedoresBuscarApellidos,
    postCrearProveedor,
    putActualizarProveedores
}