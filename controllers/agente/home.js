const conn = require('../../database/conexionpg')

const getNoLeidos = (request, response) => {

    let query =     'SELECT COUNT(*) AS num_notificaciones'+
                            ' FROM public."REFERIDO"'+
                            ' INNER JOIN public."PROVEEDOR"'+
                            ' ON public."REFERIDO"."FK_ID_PROVEEDOR" =  public."PROVEEDOR"."ID_PROVEEDOR"'+
                            ' INNER JOIN public."AGENTE_ADMINISTRADOR"'+
                            ' ON public."PROVEEDOR"."FK_ID_AGENTE_ADMINISTRADOR" = public."AGENTE_ADMINISTRADOR"."ID_AGENTE_ADMINISTRADOR"'+
                            ' WHERE public."AGENTE_ADMINISTRADOR"."ID_AGENTE_ADMINISTRADOR" = 1'+ //agregar id agente con session
                            ' AND public."REFERIDO"."FK_ID_ESTADO_NOTIFICACION_REFERIDO" = 2;';
        conn.query(query)
        .then(num_notificaciones=>response.json({
            success:true,num_notificaciones
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}

/*-----------------------*/
const getReferidoEnviado = (request, response) => {

    let query =     'SELECT COUNT(*) AS ref_enviados, SUM(public."REFERIDO"."Monto") AS monto_enviado'+
                            ' FROM public."REFERIDO"'+
                            ' INNER JOIN public."PROVEEDOR"'+
                            ' ON public."REFERIDO"."FK_ID_PROVEEDOR" = public."PROVEEDOR"."ID_PROVEEDOR"'+
                            ' WHERE public."PROVEEDOR"."FK_ID_AGENTE_ADMINISTRADOR" = 1';//idsession
        conn.query(query)
        .then(ref_enviados=>response.json({
            success:true,ref_enviados
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}

const getReferidoTramite = (request, response) => {

    let query =      'SELECT COUNT(*) AS ref_tramite, SUM(public."REFERIDO"."Monto") AS monto_tramite'+
                            ' FROM public."DETALLE_REFERIDO"'+
                            ' INNER JOIN public."REFERIDO"'+
                            ' ON public."DETALLE_REFERIDO"."FK_ID_REFERIDO" = public."REFERIDO"."ID_REFERIDO"'+
                            ' WHERE "FK_ID_AGENTE_ADMINISTRADOR" = 1'+//id session
                            ' AND "FK_ID_ESTADO_REFERIDO" = 2';
        conn.query(query)
        .then(ref_tramite=>response.json({
            success:true,ref_tramite
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}

const getReferidoAprobado = (request, response) => {

    let query =    'SELECT COUNT(*) AS ref_aprobado, SUM(public."REFERIDO"."Monto") AS monto_aprobado'+
                            ' FROM public."DETALLE_REFERIDO"'+
                            ' INNER JOIN public."REFERIDO"'+
                            ' ON public."DETALLE_REFERIDO"."FK_ID_REFERIDO" = public."REFERIDO"."ID_REFERIDO"'+
                            ' WHERE "FK_ID_AGENTE_ADMINISTRADOR" = 1'+//id session
                            ' AND "FK_ID_ESTADO_REFERIDO" = 3';
        conn.query(query)
        .then(ref_aprobado=>response.json({
            success:true,ref_aprobado
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}

const getReferidoRechazado = (request, response) => {

    let query =     'SELECT COUNT(*) AS ref_rechazado, SUM(public."REFERIDO"."Monto") AS monto_rechazado'+
                            ' FROM public."DETALLE_REFERIDO"'+
                            ' INNER JOIN public."REFERIDO"'+
                            ' ON public."DETALLE_REFERIDO"."FK_ID_REFERIDO" = public."REFERIDO"."ID_REFERIDO"'+
                            ' WHERE "FK_ID_AGENTE_ADMINISTRADOR" = 1'+//id session
                            ' AND "FK_ID_ESTADO_REFERIDO" = 4';
        conn.query(query)
        .then(ref_rechazado=>response.json({
            success:true,ref_rechazado
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}

/*-----------------------*/
const getProveedorCodigo = (request, response) => {
    const id = parseInt(request.params.id);
    const dato = request.params.dato;
    console.log(id+" / "+dato)
    let query =     'SELECT "ID_PROVEEDOR", "RazonSocial", "RUC", "FK_ID_ESTADO_ACTIVIDAD"'+
                            ' FROM public."PROVEEDOR"'+
                            ' WHERE "FK_ID_AGENTE_ADMINISTRADOR" = $1'+
                            ' AND "ID_PROVEEDOR" = $2;';

        console.log(query)

        conn.query(query, [id,dato])
        .then(lst_proveedores=>response.json({
            success:true,lst_proveedores
        }))
        .catch(err=>response.status(500).json({
             success:false,message:err.message,err
        }))
}

const getProveedorRazonSocial = (request, response) => {
    const id = parseInt(request.params.id);
    const dato = "%"+request.params.dato+"%";
    console.log(id+" / "+dato)
    let query =     'SELECT "ID_PROVEEDOR", "RazonSocial", "RUC", "FK_ID_ESTADO_ACTIVIDAD"'+
                            ' FROM public."PROVEEDOR"'+
                            ' WHERE "FK_ID_AGENTE_ADMINISTRADOR" = $1'+
                            ' AND UPPER("RazonSocial") like UPPER(\''+dato+'\');';

        console.log(query)

        conn.query(query, [id])
        .then(lst_proveedores=>response.json({
            success:true,lst_proveedores
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}

const getProveedorRuc = (request, response) => {
    const id = parseInt(request.params.id);
    const dato = "%"+request.params.dato+"%";
    console.log(id+" / "+dato)
    let query =     'SELECT "ID_PROVEEDOR", "RazonSocial", "RUC", "FK_ID_ESTADO_ACTIVIDAD"'+
                            ' FROM public."PROVEEDOR"'+
                            ' WHERE "FK_ID_AGENTE_ADMINISTRADOR" = $1'+
                            ' AND UPPER("RUC") like UPPER(\''+dato+'\');';

        console.log(query)

        conn.query(query, [id])
        .then(lst_proveedores=>response.json({
             success:true,lst_proveedores
        }))
        .catch(err=>response.status(500).json({
             success:false,message:err.message,err
        }))
}
/*-----------------------------------*/
const getReferidoEnviadoProveedor = (request, response) => {
    const id = parseInt(request.params.id);
    console.log(id)

    let query =     'SELECT COUNT(*) AS ref_enviados_proveedor, SUM(public."REFERIDO"."Monto") AS monto_enviado_proveedor'+
                            ' FROM public."REFERIDO"'+
                            ' INNER JOIN public."PROVEEDOR"'+
                            ' ON public."REFERIDO"."FK_ID_PROVEEDOR" = public."PROVEEDOR"."ID_PROVEEDOR"'+
                            ' WHERE public."PROVEEDOR"."FK_ID_AGENTE_ADMINISTRADOR" = 1'+//idsession
                            ' AND public."PROVEEDOR"."ID_PROVEEDOR" = $1';

        conn.query(query, [id])
        .then(ref_enviados_proveedor=>response.json({
            success:true,ref_enviados_proveedor
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}

const getReferidoEnviadoProveedorFecha = (request, response) => {
    const id = parseInt(request.params.id);
    const fecha_menor = request.params.fecha_menor;
    const fecha_mayor = request.params.fecha_mayor;
    console.log(id+"/"+fecha_menor+"/"+fecha_mayor)

    let query =     'SELECT COUNT(*) AS ref_enviados_proveedor_fecha, SUM(public."REFERIDO"."Monto") AS monto_enviado_proveedor_fecha'+
                            ' FROM public."REFERIDO"'+
                            ' INNER JOIN public."PROVEEDOR"'+
                            ' ON public."REFERIDO"."FK_ID_PROVEEDOR" = public."PROVEEDOR"."ID_PROVEEDOR"'+
                            ' WHERE public."PROVEEDOR"."FK_ID_AGENTE_ADMINISTRADOR" = 1'+//idsession
                            ' AND public."PROVEEDOR"."ID_PROVEEDOR" = $1'+
                            ' AND "Fecha" BETWEEN \''+fecha_menor+'\' AND \''+fecha_mayor+'\';';
        console.log(query)
        conn.query(query, [id])
        .then(ref_enviados_proveedor_fecha=>response.json({
            success:true,ref_enviados_proveedor_fecha
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}

/*-----------------------------------*/
const getReferidoTramiteProveedor = (request, response) => {

    const id = parseInt(request.params.id);
    console.log(id)

    let query =     'SELECT COUNT(*) AS ref_tramite_proveedor, SUM(public."REFERIDO"."Monto") AS monto_tramite_proveedor'+
                            ' FROM public."DETALLE_REFERIDO"'+
                            ' INNER JOIN public."REFERIDO"'+
                            ' ON public."DETALLE_REFERIDO"."FK_ID_REFERIDO" = public."REFERIDO"."ID_REFERIDO"'+
                            ' INNER JOIN public."PROVEEDOR"'+
                            ' ON public."PROVEEDOR"."ID_PROVEEDOR" = public."REFERIDO"."FK_ID_PROVEEDOR"'+
                            ' WHERE  public."DETALLE_REFERIDO"."FK_ID_AGENTE_ADMINISTRADOR" = 1'+
                            ' AND  public."DETALLE_REFERIDO"."FK_ID_ESTADO_REFERIDO" = 2'+
                            ' AND  public."PROVEEDOR"."ID_PROVEEDOR" = $1;';

        conn.query(query, [id])
        .then(ref_tramite_proveedor=>response.json({
            success:true,ref_tramite_proveedor
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}

const getReferidoTramiteProveedorFecha = (request, response) => {

    const id = parseInt(request.params.id);
    const fecha_menor = request.params.fecha_menor;
    const fecha_mayor = request.params.fecha_mayor;
    console.log(id+"/"+fecha_menor+"/"+fecha_mayor)

    let query =     'SELECT COUNT(*) AS ref_tramite_proveedor_fecha, SUM(public."REFERIDO"."Monto") AS monto_tramite_proveedor_fecha'+
                            ' FROM public."DETALLE_REFERIDO"'+
                            ' INNER JOIN public."REFERIDO"'+
                            ' ON public."DETALLE_REFERIDO"."FK_ID_REFERIDO" = public."REFERIDO"."ID_REFERIDO"'+
                            ' INNER JOIN public."PROVEEDOR"'+
                            ' ON public."PROVEEDOR"."ID_PROVEEDOR" = public."REFERIDO"."FK_ID_PROVEEDOR"'+
                            ' WHERE  public."DETALLE_REFERIDO"."FK_ID_AGENTE_ADMINISTRADOR" = 1'+
                            ' AND  public."DETALLE_REFERIDO"."FK_ID_ESTADO_REFERIDO" = 2'+
                            ' AND  public."PROVEEDOR"."ID_PROVEEDOR" = $1'+
                            ' AND public."DETALLE_REFERIDO"."Fecha" BETWEEN \''+fecha_menor+'\' AND \''+fecha_mayor+'\';';

        conn.query(query, [id])
        .then(ref_tramite_proveedor_fecha=>response.json({
            success:true,ref_tramite_proveedor_fecha
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}
    
/*-----------------------------------*/
const getReferidoAprobadoProveedor = (request, response) => {

    const id = parseInt(request.params.id);
    console.log(id)

    let query =     'SELECT COUNT(*) AS ref_aprobado_proveedor, SUM(public."REFERIDO"."Monto") AS monto_aprobado_proveedor'+
                            ' FROM public."DETALLE_REFERIDO"'+
                            ' INNER JOIN public."REFERIDO"'+
                            ' ON public."DETALLE_REFERIDO"."FK_ID_REFERIDO" = public."REFERIDO"."ID_REFERIDO"'+
                            ' INNER JOIN public."PROVEEDOR"'+
                            ' ON public."PROVEEDOR"."ID_PROVEEDOR" = public."REFERIDO"."FK_ID_PROVEEDOR"'+
                            ' WHERE  public."DETALLE_REFERIDO"."FK_ID_AGENTE_ADMINISTRADOR" = 1'+
                            ' AND  public."DETALLE_REFERIDO"."FK_ID_ESTADO_REFERIDO" = 3'+
                            ' AND  public."PROVEEDOR"."ID_PROVEEDOR" = $1;';

        conn.query(query, [id])
        .then(ref_aprobado_proveedor=>response.json({
            success:true,ref_aprobado_proveedor
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}

const getReferidoAprobadoProveedorFecha = (request, response) => {

    const id = parseInt(request.params.id);
    const fecha_menor = request.params.fecha_menor;
    const fecha_mayor = request.params.fecha_mayor;
    console.log(id+"/"+fecha_menor+"/"+fecha_mayor)

    let query =     'SELECT COUNT(*) AS ref_aprobado_proveedor_fecha, SUM(public."REFERIDO"."Monto") AS monto_aprobado_proveedor_fecha'+
                            ' FROM public."DETALLE_REFERIDO"'+
                            ' INNER JOIN public."REFERIDO"'+
                            ' ON public."DETALLE_REFERIDO"."FK_ID_REFERIDO" = public."REFERIDO"."ID_REFERIDO"'+
                            ' INNER JOIN public."PROVEEDOR"'+
                            ' ON public."PROVEEDOR"."ID_PROVEEDOR" = public."REFERIDO"."FK_ID_PROVEEDOR"'+
                            ' WHERE  public."DETALLE_REFERIDO"."FK_ID_AGENTE_ADMINISTRADOR" = 1'+
                            ' AND  public."DETALLE_REFERIDO"."FK_ID_ESTADO_REFERIDO" = 3'+
                            ' AND  public."PROVEEDOR"."ID_PROVEEDOR" = $1'+
                            ' AND public."DETALLE_REFERIDO"."Fecha" BETWEEN \''+fecha_menor+'\' AND \''+fecha_mayor+'\';';

        conn.query(query, [id])
        .then(ref_aprobado_proveedor_fecha=>response.json({
            success:true,ref_aprobado_proveedor_fecha
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}
/*-----------------------------------*/
const getReferidoRechazadoProveedor = (request, response) => {

    const id = parseInt(request.params.id);
    console.log(id)

    let query =     'SELECT COUNT(*) AS ref_rechazado_proveedor, SUM(public."REFERIDO"."Monto") AS monto_rechazado_proveedor'+
                            ' FROM public."DETALLE_REFERIDO"'+
                            ' INNER JOIN public."REFERIDO"'+
                            ' ON public."DETALLE_REFERIDO"."FK_ID_REFERIDO" = public."REFERIDO"."ID_REFERIDO"'+
                            ' INNER JOIN public."PROVEEDOR"'+
                            ' ON public."PROVEEDOR"."ID_PROVEEDOR" = public."REFERIDO"."FK_ID_PROVEEDOR"'+
                            ' WHERE  public."DETALLE_REFERIDO"."FK_ID_AGENTE_ADMINISTRADOR" = 1'+
                            ' AND  public."DETALLE_REFERIDO"."FK_ID_ESTADO_REFERIDO" = 4'+
                            ' AND  public."PROVEEDOR"."ID_PROVEEDOR" = $1;';

        conn.query(query, [id])
        .then(ref_rechazado_proveedor=>response.json({
            success:true,ref_rechazado_proveedor
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}

const getReferidoRechazadoProveedorFecha = (request, response) => {

    const id = parseInt(request.params.id);
    const fecha_menor = request.params.fecha_menor;
    const fecha_mayor = request.params.fecha_mayor;
    console.log(id+"/"+fecha_menor+"/"+fecha_mayor)

    let query =     'SELECT COUNT(*) AS ref_rechazado_proveedor_fecha, SUM(public."REFERIDO"."Monto") AS monto_rechazado_proveedor_fecha'+
                            ' FROM public."DETALLE_REFERIDO"'+
                            ' INNER JOIN public."REFERIDO"'+
                            ' ON public."DETALLE_REFERIDO"."FK_ID_REFERIDO" = public."REFERIDO"."ID_REFERIDO"'+
                            ' INNER JOIN public."PROVEEDOR"'+
                            ' ON public."PROVEEDOR"."ID_PROVEEDOR" = public."REFERIDO"."FK_ID_PROVEEDOR"'+
                            ' WHERE  public."DETALLE_REFERIDO"."FK_ID_AGENTE_ADMINISTRADOR" = 1'+
                            ' AND  public."DETALLE_REFERIDO"."FK_ID_ESTADO_REFERIDO" = 4'+
                            ' AND  public."PROVEEDOR"."ID_PROVEEDOR" = $1'+
                            ' AND public."DETALLE_REFERIDO"."Fecha" BETWEEN \''+fecha_menor+'\' AND \''+fecha_mayor+'\';';

        conn.query(query, [id])
        .then(ref_rechazado_proveedor_fecha=>response.json({
            success:true,ref_rechazado_proveedor_fecha
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}


module.exports = {
    getNoLeidos,
    getReferidoEnviado,
    getReferidoTramite,
    getReferidoAprobado,
    getReferidoRechazado,
    getProveedorCodigo,
    getProveedorRazonSocial,
    getProveedorRuc,
    getReferidoEnviadoProveedor,
    getReferidoTramiteProveedor,
    getReferidoAprobadoProveedor,
    getReferidoRechazadoProveedor,
    getReferidoEnviadoProveedorFecha,
    getReferidoTramiteProveedorFecha,
    getReferidoAprobadoProveedorFecha,
    getReferidoRechazadoProveedorFecha
}