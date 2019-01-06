const conn = require('../../database/conexionpg')

const getNoLeidos = (request, response) =>{
    const id = parseInt(request.params.id);
    console.log(id)

    let query =     'SELECT COUNT(public."DETALLE_REFERIDO"."FK_ID_ESTADO_NOTIFICACION_REFERIDO") AS no_leidos'+
                            ' FROM public."DETALLE_REFERIDO"'+
                            ' INNER JOIN public."REFERIDO"'+
                            ' ON public."REFERIDO"."ID_REFERIDO" = public."DETALLE_REFERIDO"."FK_ID_REFERIDO"'+
                            ' WHERE public."DETALLE_REFERIDO"."FK_ID_ESTADO_NOTIFICACION_REFERIDO" = 2'+
                            ' AND public."REFERIDO"."FK_ID_PERFIL_VENDEDOR" = $1;';

        conn.query(query, [id])
        .then(no_leidos=>response.json({
            success:true,no_leidos
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}

/*-----------------------*/
const getReferidoEnviado = (request, response) => {

    const id = parseInt(request.params.id);
    console.log(id)

    let query =     'SELECT  COUNT(*) AS ref_enviados, SUM(public."REFERIDO"."Monto") AS monto_enviado'+
                            ' FROM public."REFERIDO"'+
                            ' WHERE public."REFERIDO"."FK_ID_PERFIL_VENDEDOR" = $1;';

        conn.query(query, [id])
        .then(ref_enviados=>response.json({
            success:true,ref_enviados
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}

const getReferidoTramite = (request, response) => {

    const id = parseInt(request.params.id);
    console.log(id)

    let query =          'SELECT  COUNT(*) AS ref_tramite, SUM(public."REFERIDO"."Monto") AS monto_tramite'+
                                ' FROM public."REFERIDO"'+
                                ' INNER JOIN public."DETALLE_REFERIDO"'+
                                ' ON public."DETALLE_REFERIDO"."FK_ID_REFERIDO" = public."REFERIDO"."ID_REFERIDO"'+
                                ' WHERE public."REFERIDO"."FK_ID_PERFIL_VENDEDOR" = $1'+
                                ' AND public."DETALLE_REFERIDO"."FK_ID_ESTADO_REFERIDO" = 2';

        conn.query(query, [id])
        .then(ref_tramite=>response.json({
            success:true,ref_tramite
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}

const getReferidoAprobado = (request, response) => {

    const id = parseInt(request.params.id);
    console.log(id)

    let query =    'SELECT  COUNT(*) AS ref_aprobado, SUM(public."REFERIDO"."Monto") AS monto_aprobado'+
                            ' FROM public."REFERIDO"'+
                            ' INNER JOIN public."DETALLE_REFERIDO"'+
                            ' ON public."DETALLE_REFERIDO"."FK_ID_REFERIDO" = public."REFERIDO"."ID_REFERIDO"'+
                            ' WHERE public."REFERIDO"."FK_ID_PERFIL_VENDEDOR" = $1'+
                            ' AND public."DETALLE_REFERIDO"."FK_ID_ESTADO_REFERIDO" = 3';

        conn.query(query, [id])
        .then(ref_aprobado=>response.json({
            success:true,ref_aprobado
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}

const getReferidoRechazado = (request, response) => {

    const id = parseInt(request.params.id);
    console.log(id)

    let query =     'SELECT  COUNT(*) AS ref_rechazado, SUM(public."REFERIDO"."Monto") AS monto_rechazado'+
                            ' FROM public."REFERIDO"'+
                            ' INNER JOIN public."DETALLE_REFERIDO"'+
                            ' ON public."DETALLE_REFERIDO"."FK_ID_REFERIDO" = public."REFERIDO"."ID_REFERIDO"'+
                            ' WHERE public."REFERIDO"."FK_ID_PERFIL_VENDEDOR" = $1'+
                            ' AND public."DETALLE_REFERIDO"."FK_ID_ESTADO_REFERIDO" = 4';

        conn.query(query, [id])
        .then(ref_rechazado=>response.json({
            success:true,ref_rechazado
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}

/************************/
const getReferidoEnviadoVendedorFecha = (request, response) => {
    const id = parseInt(request.params.id);
    const fecha_menor = request.params.fecha_menor;
    const fecha_mayor = request.params.fecha_mayor;
    console.log(id+"/"+fecha_menor+"/"+fecha_mayor)

    let query =     'SELECT  COUNT(*) AS ref_enviados_vendedor_fecha, SUM(public."REFERIDO"."Monto") AS monto_enviados_vendedor_fecha'+
                            ' FROM public."REFERIDO"'+
                            ' WHERE public."REFERIDO"."FK_ID_PERFIL_VENDEDOR" = $1'+
                            ' AND public."REFERIDO"."Fecha" BETWEEN \''+fecha_menor+'\' AND \''+fecha_mayor+'\';';
        console.log(query)
        conn.query(query, [id])
        .then(ref_enviados_vendedor_fecha=>response.json({
            success:true,ref_enviados_vendedor_fecha
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}

const getReferidoTramiteVendedorFecha = (request, response) => {

    const id = parseInt(request.params.id);
    const fecha_menor = request.params.fecha_menor;
    const fecha_mayor = request.params.fecha_mayor;
    console.log(id+"/"+fecha_menor+"/"+fecha_mayor)

    let query =     'SELECT  COUNT(*) AS ref_tramite_vendedor_fecha, SUM(public."REFERIDO"."Monto") AS monto_tramite_vendedor_fecha'+
                            ' FROM public."REFERIDO"'+
                            ' INNER JOIN public."DETALLE_REFERIDO"'+
                            ' ON public."DETALLE_REFERIDO"."FK_ID_REFERIDO" = public."REFERIDO"."ID_REFERIDO"'+
                            ' WHERE public."REFERIDO"."FK_ID_PERFIL_VENDEDOR" = $1'+
                            ' AND public."DETALLE_REFERIDO"."FK_ID_ESTADO_REFERIDO" = 2'+
                            ' AND public."DETALLE_REFERIDO"."Fecha" BETWEEN \''+fecha_menor+'\' AND \''+fecha_mayor+'\';';

        conn.query(query, [id])
        .then(ref_tramite_vendedor_fecha=>response.json({
            success:true,ref_tramite_vendedor_fecha
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}

const getReferidoAprobadoVendedorFecha = (request, response) => {

    const id = parseInt(request.params.id);
    const fecha_menor = request.params.fecha_menor;
    const fecha_mayor = request.params.fecha_mayor;
    console.log(id+"/"+fecha_menor+"/"+fecha_mayor)

    let query =     'SELECT  COUNT(*) AS ref_aprobado_vendedor_fecha, SUM(public."REFERIDO"."Monto") AS monto_aprobado_vendedor_fecha'+
                            ' FROM public."REFERIDO"'+
                            ' INNER JOIN public."DETALLE_REFERIDO"'+
                            ' ON public."DETALLE_REFERIDO"."FK_ID_REFERIDO" = public."REFERIDO"."ID_REFERIDO"'+
                            ' WHERE public."REFERIDO"."FK_ID_PERFIL_VENDEDOR" = $1'+
                            ' AND public."DETALLE_REFERIDO"."FK_ID_ESTADO_REFERIDO" = 3'+
                            ' AND public."DETALLE_REFERIDO"."Fecha" BETWEEN \''+fecha_menor+'\' AND \''+fecha_mayor+'\';';

        conn.query(query, [id])
        .then(ref_aprobado_vendedor_fecha=>response.json({
            success:true,ref_aprobado_vendedor_fecha
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}

const getReferidoRechazadoVendedorFecha = (request, response) => {

    const id = parseInt(request.params.id);
    const fecha_menor = request.params.fecha_menor;
    const fecha_mayor = request.params.fecha_mayor;
    console.log(id+"/"+fecha_menor+"/"+fecha_mayor)

    let query =     'SELECT  COUNT(*) AS ref_rechazado_vendedor_fecha, SUM(public."REFERIDO"."Monto") AS monto_rechazado_vendedor_fecha'+
                            ' FROM public."REFERIDO"'+
                            ' INNER JOIN public."DETALLE_REFERIDO"'+
                            ' ON public."DETALLE_REFERIDO"."FK_ID_REFERIDO" = public."REFERIDO"."ID_REFERIDO"'+
                            ' WHERE public."REFERIDO"."FK_ID_PERFIL_VENDEDOR" = $1'+
                            ' AND public."DETALLE_REFERIDO"."FK_ID_ESTADO_REFERIDO" = 4'+
                            ' AND public."DETALLE_REFERIDO"."Fecha" BETWEEN \''+fecha_menor+'\' AND \''+fecha_mayor+'\';';

        conn.query(query, [id])
        .then(ref_rechazado_vendedor_fecha=>response.json({
            success:true,ref_rechazado_vendedor_fecha
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
    getReferidoEnviadoVendedorFecha,
    getReferidoTramiteVendedorFecha, 
    getReferidoAprobadoVendedorFecha, 
    getReferidoRechazadoVendedorFecha
}