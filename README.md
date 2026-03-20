# CRM Automation con Google Apps Script + Gemini AI

Sistema de automatización completo para gestión de leads, construido con Google Apps Script e integración con Gemini AI.

## ¿Qué hace este proyecto?

Cuando un cliente llena un formulario de Google, el sistema automáticamente:

1. Analiza el lead con Gemini AI y lo clasifica como Hot, Warm o Cold
2. Crea una carpeta personalizada en Google Drive con un documento de resumen
3. Envía un email de bienvenida personalizado al cliente
4. Registra el lead en un dashboard en Google Sheets con métricas en tiempo real

## Stack tecnológico

- Google Apps Script
- Google Forms, Sheets, Drive, Gmail, Docs
- Gemini AI API (gemini-2.5-flash)
- Triggers automáticos (onFormSubmit)

## Archivos

| Archivo | Descripción |
|---|---|
| `Codigo.gs` | Motor principal y trigger onFormSubmit |
| `IA.gs` | Integración con Gemini AI |
| `Drive.gs` | Creación de carpetas y documentos |
| `Email.gs` | Envío de emails personalizados |
| `Dashboard.gs` | Actualización del dashboard en Sheets |

## Resultado

- 0 intervención manual requerida
- Leads clasificados automáticamente por IA
- Tiempo de respuesta al cliente: inmediato
