const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const db = require('../../controllers/proveedor/home')
const db2 = require('../../controllers/proveedor/referidos')
const db3 = require('../../controllers/proveedor/vendedor')
const port = 3001

app.use(cors());

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Bienvenido api proveedor' })
})

  /*****************************/
 /*         HOME PROVEEDOR    */
/*****************************/
app.get('/referido_enviado_proveedor/:id', db.getReferidoEnviado)
app.get('/referido_tramite_proveedor/:id', db.getReferidoTramite)
app.get('/referido_aprobado_proveedor/:id', db.getReferidoAprobado)
app.get('/referido_rechazado_proveedor/:id', db.getReferidoRechazado)
/*-----------------*/
app.get('/lst_vendedores/:id/:dato', db.getVendedores)
/*-----------------*/
app.get('/referido_enviado_vendedor_proveedor/:id/:id2', db.getReferidoEnviadoVendedor)
app.get('/referido_tramite_vendedor_proveedor/:id/:id2', db.getReferidoTramiteVendedor)
app.get('/referido_aprobado_vendedor_proveedor/:id/:id2', db.getReferidoAprobadoVendedor)
app.get('/referido_rechazado_vendedor_proveedor/:id/:id2', db.getReferidoRechazadoVendedor)
/*-----------------*/
app.get('/referido_enviado_vendedor_fecha_proveedor/:id/:fecha_menor/:fecha_mayor', db.getReferidoEnviadoVendedorFecha)
app.get('/referido_tramite_vendedor_fecha_proveedor/:id/:fecha_menor/:fecha_mayor', db.getReferidoTramiteVendedorFecha)
app.get('/referido_aprobado_vendedor_fecha_proveedor/:id/:fecha_menor/:fecha_mayor', db.getReferidoAprobadoVendedorFecha)
app.get('/referido_rechazado_vendedor_fecha_proveedor/:id/:fecha_menor/:fecha_mayor', db.getReferidoRechazadoVendedorFecha)

  /*****************************/
 /*     REFERIDOS PROVEEDOR   */
/*****************************/
app.get('/lst_referidos_todos/:id', db2.getLstReferidosTodos)
app.get('/lst_referidos_estado/:id/:estado', db2.getLstReferidosEstado)
/*------------------*/
/*----esto consumimos de otra ruta
app.get('/referido_detalle/:id_referido', db2.getReferidoDetalle)
app.get('/referido_detalle_track/:id_referido', db2.getReferidoDetalleTrack)*/
/*-----------------*/
app.get('/lst_buscar_referido_codigo/:id/:dato', db2.getLstReferidosBuscarCodigo)
app.get('/lst_buscar_referido_ruc/:id/:dato', db2.getLstReferidosBuscarRuc)
app.get('/lst_buscar_referido_apellidos/:id/:dato', db2.getLstReferidosBuscarApellidos)
app.get('/lst_buscar_referido_vendedor/:id/:dato', db2.getLstReferidosBuscarCodigoVendedor)
/*-----------------*/
app.get('/lst_buscar_referido_rango_fechas/:id/:dato_menor/:dato_mayor', db2.getLstReferidosBuscarFecha)

  /*****************************/
 /*     PROVEEDORES CREAR    */
/*****************************/
app.get('/lst_vendedores_todos/:id', db3.getLstVendedoresTodos)
app.get('/lst_vendedores_estado/:id/:estado', db3.getLstVendedoresEstado)
/*-----------------*/
app.get('/vendedores_detalle/:id_vendedor', db3.getVendedoresDetalle)
/*-----------------*/
app.get('/lst_buscar_vendedores_codigo/:id/:dato', db3.getLstVendedoresBuscarCodigo)
app.get('/lst_buscar_vendedores_dni/:id/:dato', db3.getLstVendedoresBuscarDni)
app.get('/lst_buscar_vendedores_apellidos/:id/:dato', db3.getLstVendedoresBuscarApellidos)
/*-----------------*/
app.post('/agregar_vendedor', db3.postCrearVendedor)
app.put('/actualizar_vendedor/:id', db3.putActualizarVendedor)


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})