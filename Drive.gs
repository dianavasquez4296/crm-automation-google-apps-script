function crearCarpetaDrive(lead, analisis) {
  try {
    // Busca o crea la carpeta principal del CRM
    let carpetaPrincipal;
    const carpetasExistentes = DriveApp.getFoldersByName('CRM - Clientes');
    
    if (carpetasExistentes.hasNext()) {
      carpetaPrincipal = carpetasExistentes.next();
    } else {
      carpetaPrincipal = DriveApp.createFolder('CRM - Clientes');
    }

    // Crea subcarpeta para el cliente
    const nombreCarpeta = `${analisis.clasificacion} | ${lead.nombre} - ${lead.empresa}`;
    const carpetaCliente = carpetaPrincipal.createFolder(nombreCarpeta);

    // Crea documento de resumen dentro de la carpeta
    const doc = DocumentApp.create(`Resumen - ${lead.nombre}`);
    const body = doc.getBody();

    body.appendParagraph(`RESUMEN DEL LEAD`).setHeading(DocumentApp.ParagraphHeading.HEADING1);
    body.appendParagraph(`Fecha: ${lead.fecha}`);
    body.appendParagraph(`Nombre: ${lead.nombre}`);
    body.appendParagraph(`Empresa: ${lead.empresa}`);
    body.appendParagraph(`Email: ${lead.email}`);
    body.appendParagraph(`Teléfono: ${lead.telefono}`);
    body.appendParagraph(`Servicio: ${lead.servicio}`);
    body.appendParagraph(`Presupuesto: ${lead.presupuesto}`);
    body.appendParagraph(`Fuente: ${lead.fuente}`);
    body.appendParagraph(`Ciudad: ${lead.ciudad}`);
    body.appendParagraph(``);
    body.appendParagraph(`ANÁLISIS IA`).setHeading(DocumentApp.ParagraphHeading.HEADING1);
    body.appendParagraph(`Clasificación: ${analisis.clasificacion}`);
    body.appendParagraph(`Score: ${analisis.score}/10`);
    body.appendParagraph(`Resumen: ${analisis.resumen}`);
    body.appendParagraph(`Razón: ${analisis.razon_clasificacion}`);
    body.appendParagraph(`Acción recomendada: ${analisis.accion_recomendada}`);
    doc.saveAndClose();

    // Mueve el documento a la carpeta del cliente
    const docFile = DriveApp.getFileById(doc.getId());
    carpetaCliente.addFile(docFile);
    DriveApp.getRootFolder().removeFile(docFile);

    Logger.log('✅ Carpeta creada: ' + carpetaCliente.getUrl());
    return carpetaCliente.getUrl();

  } catch (error) {
    Logger.log('❌ Error en Drive: ' + error.message);
    return null;
  }
}
