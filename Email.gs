function enviarEmailBienvenida(lead, analisis) {
  try {
    const emojis = { 'Hot': '🔥', 'Warm': '⚡', 'Cold': '❄️' };
    const emoji = emojis[analisis.clasificacion] || '👋';

    const asunto = `[${analisis.clasificacion}] Gracias por contactarnos, ${lead.nombre.split(' ')[0]}`;

    const cuerpo = `
Hola ${lead.nombre.split(' ')[0]},

Gracias por contactarnos. Recibimos tu solicitud sobre ${lead.servicio} y ya estamos revisando tu caso.

Aquí un resumen de lo que nos compartiste:
- Servicio de interés: ${lead.servicio}
- Presupuesto: ${lead.presupuesto}
- Empresa: ${lead.empresa}

${analisis.accion_recomendada}

Nos pondremos en contacto contigo muy pronto.

Saludos,
El equipo de automatización
    `;

    GmailApp.sendEmail(lead.email, asunto, cuerpo);
    Logger.log('✅ Email enviado a: ' + lead.email);
    return true;

  } catch (error) {
    Logger.log('❌ Error en email: ' + error.message);
    return false;
  }
}
