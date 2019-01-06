const conn = require('../../database/conexionpg')

const getLstReferidosTodos = (request, response) => {

    const id = parseInt(request.params.id);
    console.log(id);

    let query =     'SELECT "ID_REFERIDO", "ApPaterno", "ApMaterno", "Nombre", "Descripcion", "Fecha"'+
                            ' FROM public."REFERIDO"'+
                            ' WHERE public."REFERIDO"."FK_ID_PROVEEDOR" = $1'+
                            ' ORDER BY public."REFERIDO"."Fecha" DESC;';
    
        conn.query(query, [id])
        .then(lst_referidos_todos=>response.json({
            success:true,lst_referidos_todos
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}

const getLstReferidosEstado = (request, response) => {

    const id = parseInt(request.params.id);
    const estado = parseInt(request.params.estado);
    console.log(id+"-"+estado);

    let query =     'SELECT public."REFERIDO"."ID_REFERIDO", public."REFERIDO"."ApPaterno", public."REFERIDO"."ApMaterno",'+
                            ' public."REFERIDO"."Nombre", public."REFERIDO"."Descripcion", public."REFERIDO"."Fecha"'+
                            ' FROM public."REFERIDO"'+
                            ' INNER JOIN public."DETALLE_REFERIDO"'+
                            ' ON public."REFERIDO"."ID_REFERIDO" = public."DETALLE_REFERIDO"."FK_ID_REFERIDO"'+
                            ' WHERE public."REFERIDO"."FK_ID_PROVEEDOR" = $1'+
                            ' AND public."DETALLE_REFERIDO"."FK_ID_ESTADO_REFERIDO" = $2'+
                            ' ORDER BY public."REFERIDO"."Fecha" DESC;';
    
        conn.query(query, [id, estado])
        .then(lst_referidos_Estado=>response.json({
            success:true,lst_referidos_Estado
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}

/*busqueda*/
const getLstReferidosBuscarCodigo = (request, response) => {
    const id = parseInt(request.params.id);
    const dato = parseInt(request.params.dato);
    console.log(id+"-"+dato);

    let query =     'SELECT "ID_REFERIDO", "ApPaterno", "ApMaterno", "Nombre", "Descripcion", "Fecha"'+
                            ' FROM public."REFERIDO"'+
                            ' WHERE public."REFERIDO"."FK_ID_PROVEEDOR" = $1'+
                            ' AND public."REFERIDO"."ID_REFERIDO" = $2'+
                            ' ORDER BY public."REFERIDO"."Fecha" DESC;';
    
        conn.query(query, [id, dato])
        .then(lst_buscar_referido_codigo=>response.json({
            success:true,lst_buscar_referido_codigo
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}

const getLstReferidosBuscarRuc = (request, response) => {

    const id = parseInt(request.params.id);
    const dato = "%"+request.params.dato+"%";
    console.log(id+"-"+dato);

    let query =     'SELECT "ID_REFERIDO", "ApPaterno", "ApMaterno", "Nombre", "Descripcion", "Fecha"'+
                            ' FROM public."REFERIDO"'+
                            ' WHERE public."REFERIDO"."FK_ID_PROVEEDOR" = $1'+
                            ' AND UPPER(public."REFERIDO"."RUC") LIKE UPPER(\''+dato+'\')'+
                            ' ORDER BY public."REFERIDO"."Fecha" DESC;';
    
        console.log(query);
        conn.query(query, [id])
        .then(lst_buscar_referido_ruc=>response.json({
            success:true,lst_buscar_referido_ruc
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}

const getLstReferidosBuscarApellidos = (request, response) => {

    const id = parseInt(request.params.id);
    const dato = "%"+request.params.dato+"%";
    console.log(id+"-"+dato);

    let query =     'SELECT "ID_REFERIDO", "ApPaterno", "ApMaterno", "Nombre", "Descripcion", "Fecha"'+
                            ' FROM public."REFERIDO"'+
                            ' WHERE public."REFERIDO"."FK_ID_PROVEEDOR" = $1'+
                            ' AND UPPER(public."REFERIDO"."ApPaterno") LIKE UPPER(\''+dato+'\')'+
                            ' ORDER BY public."REFERIDO"."Fecha" DESC;';
    
        conn.query(query, [id])
        .then(lst_buscar_referido_apellidos=>response.json({
            success:true,lst_buscar_referido_apellidos
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}

const getLstReferidosBuscarCodigoVendedor = (request, response) => {

    const id = parseInt(request.params.id);
    const dato = parseInt(request.params.dato);
    console.log(id+"-"+dato);

    let query =     'SELECT "ID_REFERIDO", "ApPaterno", "ApMaterno", "Nombre", "Descripcion", "Fecha"'+
                            ' FROM public."REFERIDO"'+
                            ' WHERE public."REFERIDO"."FK_ID_PROVEEDOR" = $1'+
                            ' AND public."REFERIDO"."FK_ID_PERFIL_VENDEDOR" = $2'+
                            ' ORDER BY public."REFERIDO"."Fecha" DESC;';
    
        conn.query(query, [id, dato])
        .then(lst_buscar_referido_vendedor_codigo=>response.json({
            success:true,lst_buscar_referido_vendedor_codigo
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}

/*BUSQUEDA RANGO FECHAS*/
const getLstReferidosBuscarFecha = (request, response) => {

    const id = parseInt(request.params.id);
    const dato_menor = request.params.dato_menor;
    const dato_mayor = request.params.dato_mayor;
    console.log(id+"-"+dato_menor+"-"+dato_mayor);

    let query =     'SELECT "ID_REFERIDO", "ApPaterno", "ApMaterno", "Nombre", "Descripcion", "Fecha"'+
                            ' FROM public."REFERIDO"'+
                            ' WHERE public."REFERIDO"."FK_ID_PROVEEDOR" = $1'+
                            ' AND public."REFERIDO"."Fecha" BETWEEN \''+dato_menor+'\' AND \''+dato_mayor+'\''+
                            ' ORDER BY public."REFERIDO"."Fecha" DESC;';
                            
        conn.query(query, [id])
        .then(lst_buscar_referido_proveedor_fecha=>response.json({
            success:true,lst_buscar_referido_proveedor_fecha
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}

module.exports = {
    getLstReferidosTodos,
    getLstReferidosEstado,
    getLstReferidosBuscarCodigo,
    getLstReferidosBuscarRuc,
    getLstReferidosBuscarApellidos,
    getLstReferidosBuscarCodigoVendedor,
    getLstReferidosBuscarFecha
}