const conn = require('../../database/conexionpg')

const getLstReferidosTodos = (request, response) => {

    const id = parseInt(request.params.id);
    console.log(id);

    let query =     'SELECT public."REFERIDO"."ID_REFERIDO", public."REFERIDO"."Nombre", public."REFERIDO"."ApPaterno",'+
                            ' public."REFERIDO"."ApMaterno", public."REFERIDO"."Descripcion", public."REFERIDO"."Fecha",'+ 
                            ' public."REFERIDO"."FK_ID_PROVEEDOR", public."REFERIDO"."FK_ID_ESTADO_NOTIFICACION_REFERIDO"'+
                            ' FROM public."REFERIDO"'+
                            ' INNER JOIN public."PROVEEDOR"'+
                            ' ON public."REFERIDO"."FK_ID_PROVEEDOR" = public."PROVEEDOR"."ID_PROVEEDOR"'+
                            ' WHERE public."PROVEEDOR"."FK_ID_AGENTE_ADMINISTRADOR" = $1'+
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

    let query =     'SELECT public."REFERIDO"."ID_REFERIDO", public."REFERIDO"."Nombre", public."REFERIDO"."ApPaterno",'+
                            ' public."REFERIDO"."ApMaterno", public."REFERIDO"."Descripcion", public."REFERIDO"."Fecha",'+
                            ' public."REFERIDO"."FK_ID_PROVEEDOR", public."REFERIDO"."FK_ID_ESTADO_NOTIFICACION_REFERIDO"'+
                            ' FROM public."REFERIDO"'+
                            ' INNER JOIN public."DETALLE_REFERIDO"'+
                            ' ON public."REFERIDO"."ID_REFERIDO" = public."DETALLE_REFERIDO"."FK_ID_REFERIDO"'+
                            ' WHERE public."DETALLE_REFERIDO"."FK_ID_AGENTE_ADMINISTRADOR" = $1'+
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
/********************/
const putMarcarLeido = (request, response) => {
    const id_referido = parseInt(request.params.id_referido)
    console.log(id_referido);
  
    let query =     'UPDATE public."REFERIDO"'+
                            ' SET "FK_ID_ESTADO_NOTIFICACION_REFERIDO" = 1'+
                            ' WHERE public."REFERIDO"."ID_REFERIDO" = $1;';
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
  
    let query =     'UPDATE public."REFERIDO"'+
                            ' SET "FK_ID_ESTADO_NOTIFICACION_REFERIDO" = 2'+
                            ' WHERE public."REFERIDO"."ID_REFERIDO" = $1;';
    conn.query(query, [id_referido])
    .then(data=>response.json({
        success:true,data
    }))
    .catch(err=>response.status(500).json({
        success:false,message:err.message,err
    }))
  }

/********************/
const getReferidoDetalle = (request, response) => {

    const id_referido = parseInt(request.params.id_referido);
    console.log(id_referido);

    let query =     'SELECT public."REFERIDO"."ID_REFERIDO", public."REFERIDO"."ApPaterno", public."REFERIDO"."ApMaterno",'+
                            ' public."REFERIDO"."Nombre", public."REFERIDO"."RUC", public."REFERIDO"."Telefono", public."REFERIDO"."Correo",'+
                            ' public."REFERIDO"."Descripcion", public."REFERIDO"."Fecha",	public."PROVEEDOR"."RazonSocial",'+
                            ' public."TIPO_MONEDA"."TipoMoneda", public."TIPO_MONEDA"."Abreviatura", public."REFERIDO"."Monto"'+
                            ' FROM public."REFERIDO"'+
                            ' INNER JOIN public."PROVEEDOR"'+
                            ' ON public."REFERIDO"."FK_ID_PROVEEDOR" = public."PROVEEDOR"."ID_PROVEEDOR"'+
                            ' INNER JOIN public."TIPO_MONEDA"'+
                            ' ON public."TIPO_MONEDA"."ID_TIPO_MONEDA" = public."REFERIDO"."FK_ID_TIPO_MONEDA"'+
                            ' WHERE PUBLIC."REFERIDO"."ID_REFERIDO" = $1;';
    
        conn.query(query, [id_referido])
        .then(referido_detalle=>response.json({
            success:true,referido_detalle
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}

const getReferidoDetalleTrack = (request, response) => {

    const id_referido = parseInt(request.params.id_referido);
    console.log(id_referido);

    let query =     'SELECT public."DETALLE_REFERIDO"."Fecha", public."ESTADO_REFERIDO"."ESTADO_REFERIDO"'+
                            ' FROM public."DETALLE_REFERIDO"'+
                            ' INNER JOIN public."ESTADO_REFERIDO"'+
                            ' ON public."ESTADO_REFERIDO"."ID_ESTADO_REFERIDO" = public."DETALLE_REFERIDO"."FK_ID_ESTADO_REFERIDO"'+
                            ' WHERE public."DETALLE_REFERIDO"."FK_ID_REFERIDO" = $1;';
    
        conn.query(query, [id_referido])
        .then(referido_detalle_track=>response.json({
            success:true,referido_detalle_track
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

    let query =     'SELECT public."REFERIDO"."ID_REFERIDO", public."REFERIDO"."Nombre", public."REFERIDO"."ApPaterno",'+
                            ' public."REFERIDO"."ApMaterno", public."REFERIDO"."Descripcion", public."REFERIDO"."Fecha",'+
                            ' public."REFERIDO"."FK_ID_PROVEEDOR", public."REFERIDO"."FK_ID_ESTADO_NOTIFICACION_REFERIDO"'+
                            ' FROM public."REFERIDO"'+
                            ' INNER JOIN public."PROVEEDOR"'+
                            ' ON public."REFERIDO"."FK_ID_PROVEEDOR" = public."PROVEEDOR"."ID_PROVEEDOR"'+
                            ' WHERE public."PROVEEDOR"."FK_ID_AGENTE_ADMINISTRADOR" = $1'+
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

    let query =     'SELECT public."REFERIDO"."ID_REFERIDO", public."REFERIDO"."Nombre", public."REFERIDO"."ApPaterno",'+
                            ' public."REFERIDO"."ApMaterno", public."REFERIDO"."Descripcion", public."REFERIDO"."Fecha",'+
                            ' public."REFERIDO"."FK_ID_PROVEEDOR", public."REFERIDO"."FK_ID_ESTADO_NOTIFICACION_REFERIDO"'+
                            ' FROM public."REFERIDO"'+
                            ' INNER JOIN public."PROVEEDOR"'+
                            ' ON public."REFERIDO"."FK_ID_PROVEEDOR" = public."PROVEEDOR"."ID_PROVEEDOR"'+
                            ' WHERE public."PROVEEDOR"."FK_ID_AGENTE_ADMINISTRADOR" = $1'+
                            ' AND UPPER(public."REFERIDO"."RUC") LIKE UPPER(\''+dato+'\')'+
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

    let query =     'SELECT public."REFERIDO"."ID_REFERIDO", public."REFERIDO"."Nombre", public."REFERIDO"."ApPaterno",'+
                            ' public."REFERIDO"."ApMaterno", public."REFERIDO"."Descripcion", public."REFERIDO"."Fecha",'+
                            ' public."REFERIDO"."FK_ID_PROVEEDOR", public."REFERIDO"."FK_ID_ESTADO_NOTIFICACION_REFERIDO"'+
                            ' FROM public."REFERIDO"'+
                            ' INNER JOIN public."PROVEEDOR"'+
                            ' ON public."REFERIDO"."FK_ID_PROVEEDOR" = public."PROVEEDOR"."ID_PROVEEDOR"'+
                            ' WHERE public."PROVEEDOR"."FK_ID_AGENTE_ADMINISTRADOR" = $1'+
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

const getLstReferidosBuscarProveedorCodigo = (request, response) => {

    const id = parseInt(request.params.id);
    const dato = parseInt(request.params.dato);
    console.log(id+"-"+dato);

    let query =     'SELECT public."REFERIDO"."ID_REFERIDO", public."REFERIDO"."Nombre", public."REFERIDO"."ApPaterno",'+
                            ' public."REFERIDO"."ApMaterno", public."REFERIDO"."Descripcion", public."REFERIDO"."Fecha",'+
                            ' public."REFERIDO"."FK_ID_PROVEEDOR", public."REFERIDO"."FK_ID_ESTADO_NOTIFICACION_REFERIDO"'+
                            ' FROM public."REFERIDO"'+
                            ' INNER JOIN public."PROVEEDOR"'+
                            ' ON public."PROVEEDOR"."ID_PROVEEDOR" = public."REFERIDO"."FK_ID_PROVEEDOR"'+
                            ' WHERE public."PROVEEDOR"."FK_ID_AGENTE_ADMINISTRADOR" = $1'+
                            ' AND public."PROVEEDOR"."ID_PROVEEDOR" = $2'+
                            ' ORDER BY public."REFERIDO"."Fecha" DESC;';
    
        conn.query(query, [id, dato])
        .then(lst_buscar_referido_proveedor_codigo=>response.json({
            success:true,lst_buscar_referido_proveedor_codigo
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}

/*BUSQUEDA RANGO FECHAS*/
const getLstReferidosBuscarProveedorFecha = (request, response) => {

    const id = parseInt(request.params.id);
    const dato_menor = request.params.dato_menor;
    const dato_mayor = request.params.dato_mayor;
    console.log(id+"-"+dato_menor+"-"+dato_mayor);

    let query =     'SELECT public."REFERIDO"."ID_REFERIDO", public."REFERIDO"."Nombre", public."REFERIDO"."ApPaterno",'+
                            ' public."REFERIDO"."ApMaterno", public."REFERIDO"."Descripcion", public."REFERIDO"."Fecha",'+
                            ' public."REFERIDO"."FK_ID_PROVEEDOR", public."REFERIDO"."FK_ID_ESTADO_NOTIFICACION_REFERIDO"'+
                            ' FROM public."REFERIDO"'+
                            ' INNER JOIN public."PROVEEDOR"'+
                            ' ON public."REFERIDO"."FK_ID_PROVEEDOR" = public."PROVEEDOR"."ID_PROVEEDOR"'+
                            ' WHERE public."PROVEEDOR"."FK_ID_AGENTE_ADMINISTRADOR" = $1'+
                            ' AND public."REFERIDO"."Fecha" BETWEEN \''+dato_menor+'\' AND \''+dato_mayor+'\';';
                            ' ORDER BY public."REFERIDO"."Fecha" DESC;';
    
        conn.query(query, [id])
        .then(lst_buscar_referido_proveedor_fecha=>response.json({
            success:true,lst_buscar_referido_proveedor_fecha
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}

const agregarEstadoReferido = (request, response) => {
    const { fecha, id_referido, estado, id} = request.body
    console.log(fecha+"/"+id_referido+"/"+estado+"/"+id);
        let query =     'INSERT INTO public."DETALLE_REFERIDO"('+
                                ' "Fecha", "FK_ID_REFERIDO", "FK_ID_ESTADO_REFERIDO", "FK_ID_ESTADO_NOTIFICACION_REFERIDO", "FK_ID_AGENTE_ADMINISTRADOR")'+
                                ' VALUES (\''+fecha+'\', $1, $2, 2, $3);';
    conn.query(query, [id_referido, estado, id])
    .then(data=>response.json({
        success:true,data
    }))
    .catch(err=>response.status(500).json({
        success:false,message:err.message,err
    }))
  }

module.exports = {
    getLstReferidosTodos,
    getLstReferidosEstado,
    putMarcarLeido,
    putMarcarNoLeido,
    getReferidoDetalle,
    getReferidoDetalleTrack,
    getLstReferidosBuscarCodigo,
    getLstReferidosBuscarRuc,
    getLstReferidosBuscarApellidos,
    getLstReferidosBuscarProveedorCodigo,
    getLstReferidosBuscarProveedorFecha,
    agregarEstadoReferido
}