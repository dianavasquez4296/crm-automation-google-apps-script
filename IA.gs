function procesarConIA(lead) {
  const apiKey = PropertiesService.getScriptProperties()
                   .getProperty('GEMINI_API_KEY');

  if (!apiKey) {
    Logger.log('❌ No se encontró la API key de Gemini');
    return {
      resumen: 'API key no configurada',
      clasificacion: 'Warm',
      razon_clasificacion: 'Error de configuración',
      accion_recomendada: 'Configurar API key',
      score: 5
    };
  }

  const prompt = `Eres un asistente de ventas experto. Analiza este lead y responde SOLO en formato JSON, sin texto adicional, sin backticks, sin markdown.

Datos del lead:
- Nombre: ${lead.nombre}
- Empresa: ${lead.empresa}
- Servicio de interés: ${lead.servicio}
- Presupuesto: ${lead.presupuesto}
- Mensaje: ${lead.mensaje}
- Fuente: ${lead.fuente}

Responde exactamente con este JSON:
{
  "resumen": "resumen ejecutivo del lead en 2 oraciones",
  "clasificacion": "Hot",
  "razon_clasificacion": "explicación breve",
  "accion_recomendada": "qué hacer esta semana",
  "score": 8
}

Criterios:
- Hot: presupuesto alto + necesidad clara + mensaje detallado
- Warm: presupuesto medio o mensaje genérico
- Cold: presupuesto bajo o mensaje muy vago`;

const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + apiKey;

  const payload = {
    contents: [{
      parts: [{ text: prompt }]
    }]
  };

  const options = {
    method: 'POST',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  try {
    const response = UrlFetchApp.fetch(url, options);
    const data = JSON.parse(response.getContentText());

    if (!data.candidates || !data.candidates[0]) {
      Logger.log('❌ Respuesta inesperada de Gemini: ' + response.getContentText());
      throw new Error('Sin respuesta válida de Gemini');
    }

    const textoRespuesta = data.candidates[0].content.parts[0].text.trim();
    Logger.log('Respuesta raw de Gemini: ' + textoRespuesta);

    const analisis = JSON.parse(textoRespuesta);
    Logger.log('✅ Análisis IA: ' + JSON.stringify(analisis));
    return analisis;

  } catch (error) {
    Logger.log('❌ Error en IA: ' + error.message);
    return {
      resumen: 'No se pudo analizar con IA',
      clasificacion: 'Warm',
      razon_clasificacion: 'Error en análisis automático',
      accion_recomendada: 'Revisar manualmente',
      score: 5
    };
  }
}

function guardarApiKey() {
  PropertiesService.getScriptProperties().setProperty(
    'GEMINI_API_KEY',
    'AIzaSyB4z3Ez9p4maWrEqprThFg73i_lQuTHdo0'
  );
  Logger.log('✅ API key guardada');
}
function listarModelos() {
  const apiKey = PropertiesService.getScriptProperties()
                   .getProperty('GEMINI_API_KEY');
                   
  const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + apiKey;

  const response = UrlFetchApp.fetch(url, {muteHttpExceptions: true});
  Logger.log(response.getContentText());
}
