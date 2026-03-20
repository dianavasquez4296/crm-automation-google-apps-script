// Config.gs — ejecuta esta función UNA sola vez para instalar el trigger
function instalarTrigger() {
  // Elimina triggers anteriores para evitar duplicados
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(t => {
    if (t.getHandlerFunction() === 'procesarNuevoLead') {
      ScriptApp.deleteTrigger(t);
    }
  });

  // Instala el trigger vinculado al Sheets (no al Form directamente)
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ScriptApp.newTrigger('procesarNuevoLead')
    .forSpreadsheet(ss)
    .onFormSubmit()
    .create();

  Logger.log('✅ Trigger instalado correctamente');
}
// Code.gs — función principal que se dispara con cada envío
function procesarNuevoLead(e) {
  try {
    // e.namedValues contiene los datos del form como objeto clave-valor
    const datos = e.namedValues;

    const lead = {
      nombre:    datos['Nombre completo']?.[0]    || '',
      email:     datos['Correo electrónico']?.[0] || '',
      telefono:  datos['Teléfono']?.[0]           || '',
      empresa:   datos['Empresa']?.[0]            || '',
      servicio:  datos['Servicio de interés']?.[0]|| '',
      presupuesto: datos['Presupuesto']?.[0]      || '',
      mensaje:   datos['Mensaje / Necesidad']?.[0]|| '',
      fuente:    datos['¿Cómo nos encontró?']?.[0]|| '',
      ciudad:    datos['País / Ciudad']?.[0]      || '',
      fecha:     new Date().toISOString()
    };

    Logger.log('Nuevo lead recibido: ' + JSON.stringify(lead));

// Aquí llamaremos a las demás funciones del sistema
    const analisis = procesarConIA(lead);
    Logger.log('Análisis: ' + JSON.stringify(analisis));
    const carpetaUrl = crearCarpetaDrive(lead, analisis);
    Logger.log('Carpeta: ' + carpetaUrl);
    enviarEmailBienvenida(lead, analisis);
    actualizarDashboard(lead, analisis);

  } catch (error) {
    Logger.log('❌ Error en procesarNuevoLead: ' + error.message);
    // Notificar al admin por email si hay error
    GmailApp.sendEmail(
      Session.getActiveUser().getEmail(),
      '⚠️ Error en CRM Automation',
      error.message
    );
  }
}
// Función de prueba — simula un envío real del formulario
function testLead() {
  const eventoSimulado = {
    namedValues: {
      'Nombre completo':      ['Carlos Pérez'],
      'Correo electrónico':   ['va.dvasquezm@gmail.com'],
      'Teléfono':             ['+57 300 123 4567'],
      'Empresa':              ['Tech Solutions SAS'],
      'Servicio de interés':  ['Automatización'],
      'Presupuesto':          ['$1,000 - $3,000'],
      'Mensaje / Necesidad':  ['Necesitamos automatizar nuestro proceso de facturación y envío de reportes mensuales a clientes.'],
      '¿Cómo nos encontró?':  ['LinkedIn'],
      'País / Ciudad':        ['Medellín, Colombia']
    }
  };

  procesarNuevoLead(eventoSimulado);
}
