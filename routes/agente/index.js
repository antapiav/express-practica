const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const db = require('../../controllers/agente/home')
const db2 = require('../../controllers/agente/bandejaReferido')
const db3 = require('../../controllers/agente/proveedor')
const port = 3000

app.use(cors());

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Bienvenido api agente' })
})

  /*****************************/
 /*         HOME AGENTE       */
/*****************************/
app.get('/notificacion', db.getNoLeidos)
/*-----------------*/
app.get('/referido_enviado', db.getReferidoEnviado)
app.get('/referido_tramite', db.getReferidoTramite)
app.get('/referido_aprobado', db.getReferidoAprobado)
app.get('/referido_rechazado', db.getReferidoRechazado)
/*-----------------*/
app.get('/lst_proveedores_codigo/:id/:dato', db.getProveedorCodigo)
app.get('/lst_proveedores_razon_social/:id/:dato', db.getProveedorRazonSocial)
app.get('/lst_proveedores_ruc/:id/:dato', db.getProveedorRuc)
/*-----------------*/
app.get('/referido_enviado_proveedor/:id', db.getReferidoEnviadoProveedor)
app.get('/referido_tramite_proveedor/:id', db.getReferidoTramiteProveedor)
app.get('/referido_aprobado_proveedor/:id', db.getReferidoAprobadoProveedor)
app.get('/referido_rechazado_proveedor/:id', db.getReferidoRechazadoProveedor)
/*-----------------*/
app.get('/referido_enviado_proveedor_fecha/:id/:fecha_menor/:fecha_mayor', db.getReferidoEnviadoProveedorFecha)
app.get('/referido_tramite_proveedor_fecha/:id/:fecha_menor/:fecha_mayor', db.getReferidoTramiteProveedorFecha)
app.get('/referido_aprobado_proveedor_fecha/:id/:fecha_menor/:fecha_mayor', db.getReferidoAprobadoProveedorFecha)
app.get('/referido_rechazado_proveedor_fecha/:id/:fecha_menor/:fecha_mayor', db.getReferidoRechazadoProveedorFecha)

  /*****************************/
 /*     REFERIDOS AGENTE      */
/*****************************/
app.get('/lst_referidos_todos/:id', db2.getLstReferidosTodos)
app.get('/lst_referidos_estado/:id/:estado', db2.getLstReferidosEstado)
/*-----------------*/
app.put('/marcar_leido/:id_referido', db2.putMarcarLeido)
app.put('/marcar_no_leido/:id_referido', db2.putMarcarNoLeido)
/*-----------------*/
app.get('/referido_detalle/:id_referido', db2.getReferidoDetalle)
app.get('/referido_detalle_track/:id_referido', db2.getReferidoDetalleTrack)
/*-----------------*/
app.get('/lst_buscar_referido_codigo/:id/:dato', db2.getLstReferidosBuscarCodigo)
app.get('/lst_buscar_referido_ruc/:id/:dato', db2.getLstReferidosBuscarRuc)
app.get('/lst_buscar_referido_apellidos/:id/:dato', db2.getLstReferidosBuscarApellidos)
app.get('/lst_buscar_referido_proveedor/:id/:dato', db2.getLstReferidosBuscarProveedorCodigo)
/*-----------------*/
app.get('/lst_buscar_referido_rango_fechas/:id/:dato_menor/:dato_mayor', db2.getLstReferidosBuscarProveedorFecha)
/*-----------------*/
app.post('/agregar_estado_referido', db2.agregarEstadoReferido)

  /*****************************/
 /*     PROVEEDORES AGENTE    */
/*****************************/
app.get('/lst_proveedores_todos/:id', db3.getLstProveedoresTodos)
app.get('/lst_proveedores_estado/:id/:estado', db3.getLstProveedoresEstado)
/*-----------------*/
app.get('/proveedores_detalle/:id_proveedor', db3.getProveedorDetalle)
/*-----------------*/
app.get('/lst_buscar_proveedores_codigo/:id/:dato', db3.getLstProveedoresBuscarCodigo)
app.get('/lst_buscar_proveedores_ruc/:id/:dato', db3.getLstProveedoresBuscarRuc)
app.get('/lst_buscar_proveedores_razon_social/:id/:dato', db3.getLstProveedoresBuscarApellidos)
/*-----------------*/
app.post('/agregar_proveedor', db3.postCrearProveedor)
app.put('/actualizar_proveedor/:id', db3.putActualizarProveedores)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})