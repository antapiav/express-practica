const conn = require('../../database/conexionpg')

/*-----------------------*/
const getReferidoEnviado = (request, response) => {

    const id = parseInt(request.params.id);
    console.log(id)

    let query =     'SELECT  COUNT(*) AS ref_enviados, SUM(public."REFERIDO"."Monto") AS monto_enviado'+
                            ' FROM public."REFERIDO"'+
                            ' WHERE public."REFERIDO"."FK_ID_PROVEEDOR" = $1;';

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
    console.log(id+"ppp")

    let query =      'SELECT  COUNT(*) AS ref_tramite, SUM(public."REFERIDO"."Monto") AS monto_tramite'+
                            ' FROM public."REFERIDO"'+
                            ' INNER JOIN public."DETALLE_REFERIDO"'+
                            ' ON public."DETALLE_REFERIDO"."FK_ID_ESTADO_REFERIDO" = public."REFERIDO"."ID_REFERIDO"'+
                            ' WHERE public."REFERIDO"."FK_ID_PROVEEDOR" = $1'+
                            ' AND public."DETALLE_REFERIDO"."FK_ID_ESTADO_REFERIDO" = 2;';
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
                            ' ON public."DETALLE_REFERIDO"."FK_ID_ESTADO_REFERIDO" = public."REFERIDO"."ID_REFERIDO"'+
                            ' WHERE public."REFERIDO"."FK_ID_PROVEEDOR" = $1'+
                            ' AND public."DETALLE_REFERIDO"."FK_ID_ESTADO_REFERIDO" = 3;';
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
                            ' ON public."DETALLE_REFERIDO"."FK_ID_ESTADO_REFERIDO" = public."REFERIDO"."ID_REFERIDO"'+
                            ' WHERE public."REFERIDO"."FK_ID_PROVEEDOR" = $1'+
                            ' AND public."DETALLE_REFERIDO"."FK_ID_ESTADO_REFERIDO" = 4;';
        conn.query(query, [id])
        .then(ref_rechazado=>response.json({
            success:true,ref_rechazado
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}
/*-----------------------------------*/
const getVendedores = (request, response) => {

    const id = parseInt(request.params.id);
    const dato = "%"+request.params.dato+"%";
    console.log(id+dato)

    let query =     'SELECT "ID_PERFIL_VENDEDOR", "ApPaterno", "ApMaterno", "Nombre", "DNI"'+
                            ' FROM public."PERFIL_VENDEDOR"'+
                            ' WHERE "FK_ID_PROVEEDOR" = $1'+
                            ' AND UPPER("ApPaterno") LIKE UPPER(\''+dato+'\');';

        conn.query(query, [id])
        .then(lst_vendedores=>response.json({
            success:true,lst_vendedores
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}

/*-----------------------------------*/
const getReferidoEnviadoVendedor = (request, response) => {
    const id = parseInt(request.params.id);
    const id2 = parseInt(request.params.id2);
    console.log(id+"/"+id2)

    let query =     'SELECT  COUNT(*) AS ref_enviados_proveedor, SUM(public."REFERIDO"."Monto") AS monto_enviado_proveedor'+
                            ' FROM public."REFERIDO"'+
                            ' WHERE public."REFERIDO"."FK_ID_PROVEEDOR" = $1'+
                            ' AND public."REFERIDO"."FK_ID_PERFIL_VENDEDOR" = $2';

        conn.query(query, [id, id2])
        .then(ref_enviados_vendedor=>response.json({
            success:true,ref_enviados_vendedor
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}

const getReferidoTramiteVendedor = (request, response) => {

    const id = parseInt(request.params.id);
    const id2 = parseInt(request.params.id2);
    console.log(id+"/"+id2)

    let query =     'SELECT  COUNT(*) AS ref_tramite_proveedor, SUM(public."REFERIDO"."Monto") AS monto_tramite_proveedor'+
                            ' FROM public."REFERIDO"'+
                            ' INNER JOIN public."DETALLE_REFERIDO"'+
                            ' ON public."DETALLE_REFERIDO"."FK_ID_ESTADO_REFERIDO" = public."REFERIDO"."ID_REFERIDO"'+
                            ' WHERE public."REFERIDO"."FK_ID_PROVEEDOR" = $1'+
                            ' AND public."REFERIDO"."FK_ID_PERFIL_VENDEDOR" = $2'+
                            ' AND public."DETALLE_REFERIDO"."FK_ID_ESTADO_REFERIDO" = 2;';

        conn.query(query, [id, id2])
        .then(ref_tramite_vendedor=>response.json({
            success:true,ref_tramite_vendedor
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}

const getReferidoAprobadoVendedor = (request, response) => {

    const id = parseInt(request.params.id);
    const id2 = parseInt(request.params.id2);
    console.log(id+"/"+id2)

    let query =     'SELECT  COUNT(*) AS ref_aprobado_proveedor, SUM(public."REFERIDO"."Monto") AS monto_aprobado_proveedor'+
                            ' FROM public."REFERIDO"'+
                            ' INNER JOIN public."DETALLE_REFERIDO"'+
                            ' ON public."DETALLE_REFERIDO"."FK_ID_ESTADO_REFERIDO" = public."REFERIDO"."ID_REFERIDO"'+
                            ' WHERE public."REFERIDO"."FK_ID_PROVEEDOR" = $1'+
                            ' AND public."REFERIDO"."FK_ID_PERFIL_VENDEDOR" = $2'+
                            ' AND public."DETALLE_REFERIDO"."FK_ID_ESTADO_REFERIDO" = 3;';

        conn.query(query, [id, id2])
        .then(ref_aprobado_vendedor=>response.json({
            success:true,ref_aprobado_vendedor
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}

const getReferidoRechazadoVendedor = (request, response) => {

    const id = parseInt(request.params.id);
    const id2 = parseInt(request.params.id2);
    console.log(id+"/"+id2)

    let query =     'SELECT  COUNT(*) AS ref_rechazado_proveedor, SUM(public."REFERIDO"."Monto") AS monto_rechazado_proveedor'+
                            ' FROM public."REFERIDO"'+
                            ' INNER JOIN public."DETALLE_REFERIDO"'+
                            ' ON public."DETALLE_REFERIDO"."FK_ID_ESTADO_REFERIDO" = public."REFERIDO"."ID_REFERIDO"'+
                            ' WHERE public."REFERIDO"."FK_ID_PROVEEDOR" = $1'+
                            ' AND public."REFERIDO"."FK_ID_PERFIL_VENDEDOR" = $2'+
                            ' AND public."DETALLE_REFERIDO"."FK_ID_ESTADO_REFERIDO" = 4;';

        conn.query(query, [id, id2])
        .then(ref_rechazado_vendedor=>response.json({
            success:true,ref_rechazado_vendedor
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

    let query =     'SELECT  COUNT(*) AS ref_enviados_proveedor_fecha, SUM(public."REFERIDO"."Monto") AS monto_enviado_proveedor_fecha'+
                            ' FROM public."REFERIDO"'+
                            ' WHERE public."REFERIDO"."FK_ID_PERFIL_VENDEDOR" = $1'+
                            ' AND public."REFERIDO"."Fecha" BETWEEN \''+fecha_menor+'\' AND \''+fecha_mayor+'\';';
        console.log(query)
        conn.query(query, [id])
        .then(ref_enviados_fecha=>response.json({
            success:true,ref_enviados_fecha
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

    let query =     'SELECT  COUNT(*) AS ref_tramite_proveedor_fecha, SUM(public."REFERIDO"."Monto") AS monto_tramite_proveedor_fecha'+
                            ' FROM public."REFERIDO"'+
                            ' INNER JOIN public."DETALLE_REFERIDO"'+
                            ' ON public."DETALLE_REFERIDO"."FK_ID_ESTADO_REFERIDO" = public."REFERIDO"."ID_REFERIDO"'+
                            ' WHERE public."REFERIDO"."FK_ID_PERFIL_VENDEDOR" = $1'+
                            ' AND public."DETALLE_REFERIDO"."FK_ID_ESTADO_REFERIDO" = 2'+
                            ' AND public."DETALLE_REFERIDO"."Fecha" BETWEEN \''+fecha_menor+'\' AND \''+fecha_mayor+'\';';

        conn.query(query, [id])
        .then(ref_tramite_fecha=>response.json({
            success:true,ref_tramite_fecha
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

    let query =     'SELECT  COUNT(*) AS ref_aprobado_proveedor_fecha, SUM(public."REFERIDO"."Monto") AS monto_aprobado_proveedor_fecha'+
                            ' FROM public."REFERIDO"'+
                            ' INNER JOIN public."DETALLE_REFERIDO"'+
                            ' ON public."DETALLE_REFERIDO"."FK_ID_ESTADO_REFERIDO" = public."REFERIDO"."ID_REFERIDO"'+
                            ' WHERE public."REFERIDO"."FK_ID_PERFIL_VENDEDOR" = $1'+
                            ' AND public."DETALLE_REFERIDO"."FK_ID_ESTADO_REFERIDO" = 3'+
                            ' AND public."DETALLE_REFERIDO"."Fecha" BETWEEN \''+fecha_menor+'\' AND \''+fecha_mayor+'\';';

        conn.query(query, [id])
        .then(ref_aprobado_fecha=>response.json({
            success:true,ref_aprobado_fecha
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

    let query =     'SELECT  COUNT(*) AS ref_rechazado_proveedor_fecha, SUM(public."REFERIDO"."Monto") AS monto_rechazado_proveedor_fecha'+
                            ' FROM public."REFERIDO"'+
                            ' INNER JOIN public."DETALLE_REFERIDO"'+
                            ' ON public."DETALLE_REFERIDO"."FK_ID_ESTADO_REFERIDO" = public."REFERIDO"."ID_REFERIDO"'+
                            ' WHERE public."REFERIDO"."FK_ID_PERFIL_VENDEDOR" = $1'+
                            ' AND public."DETALLE_REFERIDO"."FK_ID_ESTADO_REFERIDO" = 4'+
                            ' AND public."DETALLE_REFERIDO"."Fecha" BETWEEN \''+fecha_menor+'\' AND \''+fecha_mayor+'\';';

        conn.query(query, [id])
        .then(ref_rechazado_fecha=>response.json({
            success:true,ref_rechazado_fecha
        }))
        .catch(err=>response.status(500).json({
            success:false,message:err.message,err
        }))
}

module.exports = {
    getReferidoEnviado,
    getReferidoTramite,
    getReferidoAprobado,
    getReferidoRechazado,
    getVendedores,
    getReferidoEnviadoVendedor,
    getReferidoTramiteVendedor,
    getReferidoAprobadoVendedor,
    getReferidoRechazadoVendedor,
    getReferidoEnviadoVendedorFecha,
    getReferidoTramiteVendedorFecha, 
    getReferidoAprobadoVendedorFecha, 
    getReferidoRechazadoVendedorFecha
}