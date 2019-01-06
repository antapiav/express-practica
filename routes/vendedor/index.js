const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const db = require('../../controllers/vendedor/home')
const db2 = require('../../controllers/vendedor/referidos')
const port = 3002

app.use(cors());

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Bienvenido api vendedor' })
})

  /*****************************/
 /*         HOME VENDEDOR     */
/*****************************/
app.get('/no_leidos_vendedor/:id', db.getNoLeidos)

/*-----------------*/
app.get('/referido_enviado_Vendedor/:id', db.getReferidoEnviado)
app.get('/referido_tramite_Vendedor/:id', db.getReferidoTramite)
app.get('/referido_aprobado_Vendedor/:id', db.getReferidoAprobado)
app.get('/referido_rechazado_Vendedor/:id', db.getReferidoRechazado)
/*-----------------*/
app.get('/referido_enviado_vendedor_fecha/:id/:fecha_menor/:fecha_mayor', db.getReferidoEnviadoVendedorFecha)
app.get('/referido_tramite_vendedor_fecha/:id/:fecha_menor/:fecha_mayor', db.getReferidoTramiteVendedorFecha)
app.get('/referido_aprobado_vendedor_fecha/:id/:fecha_menor/:fecha_mayor', db.getReferidoAprobadoVendedorFecha)
app.get('/referido_rechazado_vendedor_fecha/:id/:fecha_menor/:fecha_mayor', db.getReferidoRechazadoVendedorFecha)

  /*****************************/
 /*     REFERIDOS VENDEDOR    */
/*****************************/
app.get('/lst_referidos_vendedor/:id', db2.getLstReferidosTodos)//ordenar ultimo enviado
app.get('/lst_bandeja_entrada_referidos/:id', db2.getLstReferidosBandeja)//ordenar ultimo editado
app.get('/lst_referidos_estado/:id/:estado', db2.getLstReferidosEstado)
/*---------MARCAR LEIDO / NO LEIDO--------*/
app.put('/marcar_leido/:id_referido', db2.putMarcarLeido)
app.put('/marcar_no_leido/:id_referido', db2.putMarcarNoLeido)
/*---------DETALLE REFERIDO CONSUMIR DE LA API AGENTE --------
app.get('/referido_detalle/:id_referido', db2.getReferidoDetalle)
app.get('/referido_detalle_track/:id_referido', db2.getReferidoDetalleTrack)
----------------*/
app.get('/lst_buscar_referido_vendedor_codigo/:id/:dato', db2.getLstReferidosBuscarCodigo)
app.get('/lst_buscar_referido_vendedor_ruc/:id/:dato', db2.getLstReferidosBuscarRuc)
app.get('/lst_buscar_referido_vendedor_apellidos/:id/:dato', db2.getLstReferidosBuscarApellidos)
/*-----------------*/
app.get('/lst_buscar_referido_rango_fechas/:id/:dato_menor/:dato_mayor', db2.getLstReferidosBuscarFecha)
/*----------CREAR NUEVO REFERIDO-------*/
app.post('/agregar_referido', db2.postCrearReferido)


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})