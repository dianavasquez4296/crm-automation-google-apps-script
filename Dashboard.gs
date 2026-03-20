function actualizarDashboard(lead, analisis) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Busca o crea la hoja de Dashboard
    let hoja = ss.getSheetByName('Dashboard CRM');
    if (!hoja) {
      hoja = ss.insertSheet('Dashboard CRM');
      // Encabezados
      hoja.getRange(1, 1, 1, 9).setValues([[
        'Fecha', 'Nombre', 'Empresa', 'Servicio', 
        'Presupuesto', 'Clasificación', 'Score', 
        'Acción recomendada', 'Resumen IA'
      ]]);
      // Formato encabezados
      hoja.getRange(1, 1, 1, 9)
        .setBackground('#4A90D9')
        .setFontColor('#FFFFFF')
        .setFontWeight('bold');
      hoja.setFrozenRows(1);
    }

    // Agrega la nueva fila con los datos
    hoja.appendRow([
      new Date(lead.fecha),
      lead.nombre,
      lead.empresa,
      lead.servicio,
      lead.presupuesto,
      analisis.clasificacion,
      analisis.score,
      analisis.accion_recomendada,
      analisis.resumen
    ]);

    // Colorea la fila según clasificación
    const ultimaFila = hoja.getLastRow();
    const colores = { 'Hot': '#FFE0E0', 'Warm': '#FFF3E0', 'Cold': '#E0F0FF' };
    const color = colores[analisis.clasificacion] || '#FFFFFF';
    hoja.getRange(ultimaFila, 1, 1, 9).setBackground(color);

    // Auto-ajusta el ancho de columnas
    hoja.autoResizeColumns(1, 9);

    Logger.log('✅ Dashboard actualizado');
    return true;

  } catch (error) {
    Logger.log('❌ Error en dashboard: ' + error.message);
    return false;
  }
}
