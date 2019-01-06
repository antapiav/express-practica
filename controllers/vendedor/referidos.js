const conn = require('../../database/conexionpg')

const getLstReferidosTodos = (request, response) => {

    const id = parseInt(request.params.id);
    console.log(id);

    /*let query =     'SELECT DISTINCT public."REFERIDO"."ID_REFERIDO", public."REFERIDO"."ApPaterno", public."REFERIDO"."ApMaterno",'+
                            ' public."REFERIDO"."Nombre", public."REFERIDO"."Descripcion", public."REFERIDO"."Fecha",'+
                            ' public."DETALLE_REFERIDO"."FK_ID_ESTADO_NOTIFICACION_REFERIDO"'+
                            ' FROM public."REFERIDO"'+
                            ' INNER JOIN public."DETALLE_REFERIDO"'+
                            ' ON public."DETALLE_REFERIDO"."FK_ID_REFERIDO" = public."REFERIDO"."ID_REFERIDO"'+
                            ' INNER JOIN public."ESTADO_NOTIFICACION_REFERIDO"'+
                            ' ON public."DETALLE_REFERIDO"."FK_ID_ESTADO_NOTIFICACION_REFERIDO" = public."ESTADO_NOTIFICACION_REFERIDO"."ID_ESTADO_NOTIFICACION_REFERIDO"'+
                            ' WHERE public."REFERIDO"."FK_ID_PERFIL_VENDEDOR" = $1'+
                            ' ORDER BY public."REFERIDO"."Fecha" DESC;';*/

        let query =     'SELECT DISTINCT public."REFERIDO"."ID_REFERIDO", public."REFERIDO"."ApPaterno", public."REFERIDO"."ApMaterno",'+
                                ' public."REFERIDO"."Nombre", public."REFERIDO"."Descripcion", public."REFERIDO"."Fecha"'+
                                ' FROM public."REFERIDO"'+
                                ' WHERE public."REFERIDO"."FK_ID_PERFIL_VENDEDOR" =$1'+
                                ' ORDER BY public."REFERIDO"."Fecha" DESC;'
    
        conn.query(query, [id])
        .then(lst_referidos_vendedor_todos=>response.json({
            success:true,lst_referidos_vendedor_todos
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}

const getLstReferidosBandeja = (request, response) => {

    const id = parseInt(request.params.id);
    console.log(id);

    let query =     'SELECT DISTINCT public."REFERIDO"."ID_REFERIDO", public."REFERIDO"."ApPaterno", public."REFERIDO"."ApMaterno",'+
                            ' public."REFERIDO"."Nombre", public."REFERIDO"."Descripcion", public."DETALLE_REFERIDO"."Fecha",'+
                            ' public."DETALLE_REFERIDO"."FK_ID_ESTADO_NOTIFICACION_REFERIDO"'+
                            ' FROM public."REFERIDO"'+
                            ' INNER JOIN public."DETALLE_REFERIDO"'+
                            ' ON public."DETALLE_REFERIDO"."FK_ID_REFERIDO" = public."REFERIDO"."ID_REFERIDO"'+
                            ' INNER JOIN public."ESTADO_NOTIFICACION_REFERIDO"'+
                            ' ON public."DETALLE_REFERIDO"."FK_ID_ESTADO_NOTIFICACION_REFERIDO" = public."ESTADO_NOTIFICACION_REFERIDO"."ID_ESTADO_NOTIFICACION_REFERIDO"'+
                            ' WHERE public."REFERIDO"."FK_ID_PERFIL_VENDEDOR" = $1'+
                            ' ORDER BY public."DETALLE_REFERIDO"."Fecha" DESC;';
    
        conn.query(query, [id])
        .then(lst_bandeja_referidos=>response.json({
            success:true,lst_bandeja_referidos
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
                            ' public."REFERIDO"."Nombre", public."REFERIDO"."Descripcion", public."REFERIDO"."Fecha",'+
                            ' public."ESTADO_NOTIFICACION_REFERIDO"."NotificacionReferido"'+
                            ' FROM public."REFERIDO"'+
                            ' INNER JOIN public."DETALLE_REFERIDO"'+
                            ' ON public."DETALLE_REFERIDO"."FK_ID_REFERIDO" = public."REFERIDO"."ID_REFERIDO"'+
                            ' INNER JOIN public."ESTADO_NOTIFICACION_REFERIDO"'+
                            ' ON public."DETALLE_REFERIDO"."FK_ID_ESTADO_NOTIFICACION_REFERIDO" = public."ESTADO_NOTIFICACION_REFERIDO"."ID_ESTADO_NOTIFICACION_REFERIDO"'+
                            ' WHERE public."REFERIDO"."FK_ID_PERFIL_VENDEDOR" = $1'+
                            ' AND public."DETALLE_REFERIDO"."FK_ID_ESTADO_REFERIDO" = $2'+
                            ' ORDER BY public."DETALLE_REFERIDO"."Fecha" DESC;';//"REFERIDO"
                            
        conn.query(query, [id, estado])
        .then(lst_referidos_Estado=>response.json({
            success:true,lst_referidos_Estado
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}
/********************/
const putMarcarLeido = (request, response) => {
    const id_referido = parseInt(request.params.id_referido)
    console.log(id_referido);
  
    let query =     'UPDATE public."DETALLE_REFERIDO"'+
                            ' SET "FK_ID_ESTADO_NOTIFICACION_REFERIDO"=1'+
                            ' WHERE public."DETALLE_REFERIDO"."FK_ID_REFERIDO" = $1;';
    conn.query(query, [id_referido])
    .then(data=>response.json({
        success:true,data
    }))
    .catch(err=>response.status(500).json({
        success:false,message:err.message,err
    }))
  }

const putMarcarNoLeido = (request, response) => {
    const id_referido = parseInt(request.params.id_referido)
    console.log(id_referido);
  
    let query =     'UPDATE public."DETALLE_REFERIDO"'+
                            ' SET "FK_ID_ESTADO_NOTIFICACION_REFERIDO"=2'+
                            ' WHERE public."DETALLE_REFERIDO"."FK_ID_REFERIDO" = $1;';
    conn.query(query, [id_referido])
    .then(data=>response.json({
        success:true,data
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

    let query =     'SELECT DISTINCT public."REFERIDO"."ID_REFERIDO", public."REFERIDO"."ApPaterno", public."REFERIDO"."ApMaterno",'+
                            ' public."REFERIDO"."Nombre", public."REFERIDO"."Descripcion", public."REFERIDO"."Fecha",'+
                            ' public."ESTADO_NOTIFICACION_REFERIDO"."NotificacionReferido"'+
                            ' FROM public."REFERIDO"'+
                            ' INNER JOIN public."DETALLE_REFERIDO"'+
                            ' ON public."DETALLE_REFERIDO"."FK_ID_REFERIDO" = public."REFERIDO"."ID_REFERIDO"'+
                            ' INNER JOIN public."ESTADO_NOTIFICACION_REFERIDO"'+
                            ' ON public."DETALLE_REFERIDO"."FK_ID_ESTADO_NOTIFICACION_REFERIDO" = public."ESTADO_NOTIFICACION_REFERIDO"."ID_ESTADO_NOTIFICACION_REFERIDO"'+
                            ' WHERE public."REFERIDO"."FK_ID_PERFIL_VENDEDOR" = $1'+
                            ' and public."REFERIDO"."ID_REFERIDO" = $2'+
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

    let query =     'SELECT DISTINCT public."REFERIDO"."ID_REFERIDO", public."REFERIDO"."ApPaterno", public."REFERIDO"."ApMaterno",'+
                            ' public."REFERIDO"."Nombre", public."REFERIDO"."Descripcion", public."REFERIDO"."Fecha",'+
                            ' public."ESTADO_NOTIFICACION_REFERIDO"."NotificacionReferido"'+
                            ' FROM public."REFERIDO"'+
                            ' INNER JOIN public."DETALLE_REFERIDO"'+
                            ' ON public."DETALLE_REFERIDO"."FK_ID_REFERIDO" = public."REFERIDO"."ID_REFERIDO"'+
                            ' INNER JOIN public."ESTADO_NOTIFICACION_REFERIDO"'+
                            ' ON public."DETALLE_REFERIDO"."FK_ID_ESTADO_NOTIFICACION_REFERIDO" = public."ESTADO_NOTIFICACION_REFERIDO"."ID_ESTADO_NOTIFICACION_REFERIDO"'+
                            ' WHERE public."REFERIDO"."FK_ID_PERFIL_VENDEDOR" = $1'+
                            ' and UPPER(public."REFERIDO"."RUC") LIKE UPPER(\''+dato+'\')'+
                            ' ORDER BY public."REFERIDO"."Fecha" DESC;';
    
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

    let query =     'SELECT DISTINCT public."REFERIDO"."ID_REFERIDO", public."REFERIDO"."ApPaterno", public."REFERIDO"."ApMaterno",'+
                            ' public."REFERIDO"."Nombre", public."REFERIDO"."Descripcion", public."REFERIDO"."Fecha",'+
                            ' public."ESTADO_NOTIFICACION_REFERIDO"."NotificacionReferido"'+
                            ' FROM public."REFERIDO"'+
                            ' INNER JOIN public."DETALLE_REFERIDO"'+
                            ' ON public."DETALLE_REFERIDO"."FK_ID_REFERIDO" = public."REFERIDO"."ID_REFERIDO"'+
                            ' INNER JOIN public."ESTADO_NOTIFICACION_REFERIDO"'+
                            ' ON public."DETALLE_REFERIDO"."FK_ID_ESTADO_NOTIFICACION_REFERIDO" = public."ESTADO_NOTIFICACION_REFERIDO"."ID_ESTADO_NOTIFICACION_REFERIDO"'+
                            ' WHERE public."REFERIDO"."FK_ID_PERFIL_VENDEDOR" = $1'+
                            ' and UPPER(public."REFERIDO"."ApPaterno") LIKE UPPER(\''+dato+'\')'+
                            ' ORDER BY public."REFERIDO"."Fecha" DESC;';
    
        conn.query(query, [id])
        .then(lst_buscar_referido_apellidos=>response.json({
            success:true,lst_buscar_referido_apellidos
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

    let query =     'SELECT DISTINCT public."REFERIDO"."ID_REFERIDO", public."REFERIDO"."ApPaterno", public."REFERIDO"."ApMaterno",'+
                            ' public."REFERIDO"."Nombre", public."REFERIDO"."Descripcion", public."REFERIDO"."Fecha",'+
                            ' public."ESTADO_NOTIFICACION_REFERIDO"."NotificacionReferido"'+
                            ' FROM public."REFERIDO"'+
                            ' INNER JOIN public."DETALLE_REFERIDO"'+
                            ' ON public."DETALLE_REFERIDO"."FK_ID_REFERIDO" = public."REFERIDO"."ID_REFERIDO"'+
                            ' INNER JOIN public."ESTADO_NOTIFICACION_REFERIDO"'+
                            ' ON public."DETALLE_REFERIDO"."FK_ID_ESTADO_NOTIFICACION_REFERIDO" = public."ESTADO_NOTIFICACION_REFERIDO"."ID_ESTADO_NOTIFICACION_REFERIDO"'+
                            ' WHERE public."REFERIDO"."FK_ID_PERFIL_VENDEDOR" = $1'+
                            ' AND public."REFERIDO"."Fecha" BETWEEN \''+dato_menor+'\' AND \''+dato_mayor+'\''+
                            ' ORDER BY public."REFERIDO"."Fecha" DESC;';
    
        conn.query(query, [id])
        .then(lst_buscar_referido_vendedor_fecha=>response.json({
            success:true,lst_buscar_referido_vendedor_fecha
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}

const postCrearReferido = (request, response) => {
    const { apaterno, amaterno, nombre, ruc, telefono, correo, descripcion, fecha, id_proveedor,
    id_vendedor, id_moneda, monto} = request.body
    console.log(apaterno+"/"+amaterno+"/"+nombre+"/"+ruc+"/"+telefono+"/"+correo+"/"+descripcion+"/"+fecha+"/"+id_proveedor+"/"+
        id_vendedor+"/"+id_moneda+"/"+monto);
        /*let query =     'INSERT INTO public."DETALLE_REFERIDO"('+
                                ' "Fecha", "FK_ID_REFERIDO", "FK_ID_ESTADO_REFERIDO", "FK_ID_ESTADO_NOTIFICACION_REFERIDO", "FK_ID_AGENTE_ADMINISTRADOR")'+
                                ' VALUES (\''+fecha+'\', $1, $2, 2, $3);';*/

        let query = 'INSERT INTO public."REFERIDO"('+
                            ' "ApPaterno", "ApMaterno", "Nombre", "RUC", "Telefono", "Correo",'+
                            ' "Descripcion", "Fecha", "FK_ID_PROVEEDOR", "FK_ID_PERFIL_VENDEDOR",'+
                            ' "FK_ID_TIPO_MONEDA", "FK_ID_ESTADO_NOTIFICACION_REFERIDO", "Monto")'+
                            ' VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 2, $12)';

    conn.query(query, [apaterno, amaterno, nombre, ruc, telefono, correo, descripcion, fecha, id_proveedor,
        id_vendedor, id_moneda, monto])
    .then(data=>response.json({
        success:true,data
    }))
    .catch(err=>response.status(500).json({
        success:false,message:err.message,err
    }))
}

module.exports = {
    getLstReferidosTodos,
    getLstReferidosBandeja,
    getLstReferidosEstado,
    putMarcarLeido,
    putMarcarNoLeido,
    getLstReferidosBuscarCodigo,
    getLstReferidosBuscarRuc,
    getLstReferidosBuscarApellidos,
    getLstReferidosBuscarFecha,
    postCrearReferido
}