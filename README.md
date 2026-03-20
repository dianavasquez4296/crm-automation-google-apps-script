# CRM Automation System — Google Apps Script + Gemini AI

Automated lead management system built with Google Apps Script and Gemini AI. When a prospect fills out a Google Form, the system handles everything automatically — no manual work required.

## Live Demo Flow

1. Prospect submits Google Form
2. Gemini AI analyzes the lead and classifies it as Hot / Warm / Cold
3. A personalized folder is created in Google Drive with a summary document
4. A personalized welcome email is sent automatically via Gmail
5. The CRM dashboard in Google Sheets updates in real time

**Total time from form submission to email delivery: under 10 seconds.**

## Why This Matters

Most businesses lose leads because follow-up is slow or inconsistent. This system eliminates that problem — every lead gets an immediate, personalized response and is automatically organized for your team.

## Tech Stack

| Tool | Purpose |
|---|---|
| Google Apps Script | Core automation engine |
| Gemini AI (gemini-2.5-flash) | Lead analysis and classification |
| Google Forms | Lead capture trigger |
| Google Sheets | CRM dashboard with real-time data |
| Google Drive | Automatic folder and document creation |
| Gmail | Personalized email delivery |

## File Structure

| File | Description |
|---|---|
| `Codigo.gs` | Main engine — onFormSubmit trigger and orchestration |
| `IA.gs` | Gemini AI integration — lead scoring and analysis |
| `Drive.gs` | Automatic folder and document generation |
| `Email.gs` | Personalized email delivery |
| `Dashboard.gs` | Real-time CRM dashboard updates |

## Setup

1. Create a Google Form and link it to a Google Sheet
2. Open Apps Script from the Sheet (Extensions → Apps Script)
3. Copy each `.gs` file into the editor
4. Get a Gemini API key from [Google AI Studio](https://aistudio.google.com)
5. Run `guardarApiKey()` once to store your key securely
6. Run `instalarTrigger()` once to activate the automation
7. Test with `testLead()` to verify the full flow

## Key Features

- **AI-powered lead scoring** — every lead classified instantly with reasoning and recommended action
- **Zero manual intervention** — fully automated from form submission to dashboard update
- **Secure API key storage** — credentials stored in PropertiesService, never in code
- **Error handling** — admin email alert if any step fails
- **Scalable** — works for any industry: agencies, SaaS, real estate, clinics

## Built by

Diana Vasquez — Automation Engineer specialized in Google Apps Script, Gemini AI, and no-code workflow systems.

[Upwork Profile](https://www.upwork.com/freelancers/dianavasquez)
