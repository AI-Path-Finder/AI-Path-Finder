"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Language = "en" | "es" | "fr" | "de" | "pt" | "it";

export const languages: { code: Language; label: string; short: string }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "es", label: "Español", short: "ES" },
  { code: "fr", label: "Français", short: "FR" },
  { code: "de", label: "Deutsch", short: "DE" },
  { code: "pt", label: "Português", short: "PT" },
  { code: "it", label: "Italiano", short: "IT" },
];

const en: Record<string, string> = {
  platform: "Platform", how: "How it works", outcomes: "Outcomes", start: "Start assessment",
  heroEyebrow: "AI transformation, with a plan", heroTitle: "Find the AI ideas worth building.",
  heroText: "Turn how your business works into a prioritized AI roadmap, with clear opportunities and ROI before you invest.",
  fiveMinutes: "Takes about 5 minutes", askAnalyzeAct: "ASK. ANALYZE. ACT.",
  contextTitle: "From business context to a confident first move.",
  contextText: "AdoptAI asks the right questions, evaluates every opportunity, and makes the business case easy to understand.",
  discover: "DISCOVER", discoverTitle: "Describe your company naturally", discoverText: "A conversational assessment learns how teams work, where time is lost, and what slows people down.",
  prioritize: "PRIORITIZE", prioritizeTitle: "Know what should happen first", prioritizeText: "Every initiative is scored for value, feasibility, speed, risk, and data readiness.",
  prove: "PROVE", proveTitle: "Make the financial case", proveText: "Model savings, implementation cost, payback period, and twelve-month return.",
  intelligentDiscovery: "INTELLIGENT DISCOVERY", questionsTitle: "Questions that lead somewhere.",
  questionsText: "One focused question at a time. Every answer shapes a more relevant set of recommendations for your organization.",
  tryAssessment: "Try the assessment", discovery: "Discovery", questionDepartments: "Which departments should we focus on?",
  selectAreas: "Select all areas where AI could create impact.", decisionIntelligence: "DECISION INTELLIGENCE",
  roadmapTitle: "Ideas become an actionable roadmap.", finalCta: "Make your next AI investment the right one.",
  opportunityIntelligence: "AI opportunity intelligence", continue: "Continue", workflows: "Workflows",
  industryQuestion: "What industry is your company in?", industryHelp: "This helps tailor opportunities to your sector.",
  technology: "Technology", financialServices: "Financial Services", healthcare: "Healthcare", retail: "Retail",
  manufacturing: "Manufacturing", professionalServices: "Professional Services", other: "Other",
  companySizeQuestion: "How large is your organization?", companySizeHelp: "Company size affects implementation scope and ROI.",
  departmentsHelp: "Select all departments where AI could create impact.", processesQuestion: "Describe your core business processes",
  processesHelp: "Tell us about the workflows that drive your business.", workflowsQuestion: "What repetitive workflows slow your team down?",
  workflowsHelp: "Pick common workflows or add your own.", hoursQuestion: "How much time goes into manual operations?",
  hoursHelp: "Estimate weekly hours spent on manual, repetitive tasks.", readyQuestion: "Ready to analyze your organization?",
  reviewHelp: "Review your inputs and launch the AI opportunity analysis.", employees: "employees",
  customerSupport: "Customer Support", sales: "Sales", operations: "Operations", hr: "HR", finance: "Finance", it: "IT", marketing: "Marketing", legal: "Legal",
  invoiceProcessing: "Invoice processing", ticketRouting: "Customer ticket routing", documentReview: "Document review", leadQualification: "Lead qualification", employeeOnboarding: "Employee onboarding", reportGeneration: "Report generation", dataEntry: "Data entry", complianceChecks: "Compliance checks",
  addWorkflow: "Add custom workflow...", add: "Add", hoursWeek: "hours / week", minimal: "Minimal", significantLoad: "Significant manual load",
  industry: "Industry", companySize: "Company size", departments: "Departments", manualHours: "Manual hours/week", notProvided: "Not provided",
  back: "Back", launchAnalysis: "Launch Analysis", pressEnter: "Press Enter ↵",
  preparingAnalysis: "Preparing your analysis", stage1: "Mapping business processes", stage2: "Reviewing repetitive workflows", stage3: "Estimating automation potential", stage4: "Scoring implementation opportunities", stage5: "Preparing your strategy report", complete: "complete",
  analysisComplete: "Analysis complete", opportunitiesIdentified: "opportunities identified", analysisTitle: "Where AI can create meaningful value.",
  basedOn: "Based on your {industry} profile across {departments}.", prioritizeOpportunities: "Prioritize opportunities",
  aiOpportunity: "AI opportunity", annualSavings: "Annual savings", complexity: "Complexity", deployment: "Deployment", automation: "Automation",
  simulateRoi: "Simulate ROI", portfolioView: "Portfolio view", priorityTitle: "Decide what deserves attention first.",
  priorityText: "Compare business value with implementation difficulty. Select any initiative to review the reasoning behind its position.",
  roiSimulation: "ROI simulation", roiTitle: "Understand the return before you invest.", roiText: "Adjust the assumptions and see how the financial case changes in real time.",
  viewRecommendation: "View recommendation", assumptions: "Assumptions", employeeCount: "Employee count", averageSalary: "Average salary",
  manualHoursWeek: "Manual hours per week", expectedAutomation: "Expected automation", implementationCost: "Implementation cost",
  projectedReturn: "Projected return", implementation: "Implementation", paybackPeriod: "Payback period", months: " months", roi12: "12-month ROI", cumulativeValue: "Cumulative value over 24 months",
  executiveRecommendation: "Executive recommendation", startWith: "Start with {title}.", recommendationText: "This initiative offers the strongest balance of measurable impact, implementation feasibility, and manageable operational risk.",
  projectedSavings: "Projected annual savings", expectedDeployment: "Expected deployment", recommendationConfidence: "Recommendation confidence", whyFirst: "Why this should come first",
  reviewAll: "Review all opportunities", startNew: "Start new assessment", low: "Low", medium: "Medium", high: "High",
};

const translations: Record<Language, Record<string, string>> = {
  en,
  es: { ...en, platform:"Plataforma",how:"Cómo funciona",outcomes:"Resultados",start:"Iniciar evaluación",heroEyebrow:"Transformación con IA, con un plan",heroTitle:"Encuentra las ideas de IA que merece la pena construir.",heroText:"Convierte el funcionamiento de tu empresa en una hoja de ruta de IA priorizada, con oportunidades claras y ROI antes de invertir.",fiveMinutes:"Solo necesitas unos 5 minutos",contextTitle:"Del contexto empresarial a una primera decisión segura.",contextText:"AdoptAI hace las preguntas adecuadas, evalúa cada oportunidad y facilita la justificación empresarial.",discover:"DESCUBRIR",discoverTitle:"Describe tu empresa de forma natural",discoverText:"Una evaluación conversacional aprende cómo trabajan los equipos, dónde se pierde tiempo y qué los frena.",prioritize:"PRIORIZAR",prioritizeTitle:"Descubre qué debe hacerse primero",prioritizeText:"Cada iniciativa se evalúa por valor, viabilidad, rapidez, riesgo y disponibilidad de datos.",prove:"DEMOSTRAR",proveTitle:"Construye el caso financiero",proveText:"Modela ahorro, coste de implementación, periodo de retorno y ROI a doce meses.",questionsTitle:"Preguntas que llevan a alguna parte.",questionsText:"Una pregunta enfocada cada vez. Cada respuesta genera recomendaciones más relevantes para tu organización.",tryAssessment:"Probar la evaluación",questionDepartments:"¿En qué departamentos debemos centrarnos?",selectAreas:"Selecciona todas las áreas donde la IA puede generar impacto.",roadmapTitle:"Las ideas se convierten en una hoja de ruta accionable.",finalCta:"Haz que tu próxima inversión en IA sea la correcta.",continue:"Continuar",industryQuestion:"¿En qué sector opera tu empresa?",industryHelp:"Esto nos ayuda a adaptar las oportunidades a tu sector.",technology:"Tecnología",financialServices:"Servicios financieros",healthcare:"Sanidad",retail:"Retail",manufacturing:"Industria",professionalServices:"Servicios profesionales",other:"Otro",companySizeQuestion:"¿Qué tamaño tiene tu organización?",companySizeHelp:"El tamaño afecta al alcance y al ROI.",departmentsHelp:"Selecciona todos los departamentos donde la IA puede generar impacto.",processesQuestion:"Describe tus procesos de negocio principales",processesHelp:"Cuéntanos qué flujos impulsan tu empresa.",workflowsQuestion:"¿Qué tareas repetitivas ralentizan a tu equipo?",workflowsHelp:"Selecciona flujos comunes o añade los tuyos.",hoursQuestion:"¿Cuánto tiempo se dedica a operaciones manuales?",hoursHelp:"Estima las horas semanales dedicadas a tareas manuales y repetitivas.",readyQuestion:"¿Listo para analizar tu organización?",reviewHelp:"Revisa tus respuestas e inicia el análisis de oportunidades.",employees:"empleados",customerSupport:"Atención al cliente",sales:"Ventas",operations:"Operaciones",hr:"RR. HH.",finance:"Finanzas",it:"TI",marketing:"Marketing",legal:"Legal",addWorkflow:"Añadir flujo personalizado...",add:"Añadir",hoursWeek:"horas / semana",minimal:"Mínimo",significantLoad:"Carga manual significativa",industry:"Sector",companySize:"Tamaño de empresa",departments:"Departamentos",manualHours:"Horas manuales/semana",notProvided:"No indicado",back:"Atrás",launchAnalysis:"Iniciar análisis",pressEnter:"Pulsa Enter ↵",preparingAnalysis:"Preparando tu análisis",stage1:"Mapeando procesos de negocio",stage2:"Revisando flujos repetitivos",stage3:"Estimando potencial de automatización",stage4:"Puntuando oportunidades de implementación",stage5:"Preparando tu informe estratégico",complete:"completado",analysisComplete:"Análisis completado",opportunitiesIdentified:"oportunidades identificadas",analysisTitle:"Dónde puede la IA generar valor real.",prioritizeOpportunities:"Priorizar oportunidades",aiOpportunity:"Oportunidad de IA",annualSavings:"Ahorro anual",complexity:"Complejidad",deployment:"Implementación",automation:"Automatización",simulateRoi:"Simular ROI",portfolioView:"Vista de cartera",priorityTitle:"Decide qué merece atención primero.",priorityText:"Compara el valor empresarial con la dificultad de implementación.",roiSimulation:"Simulación de ROI",roiTitle:"Comprende el retorno antes de invertir.",roiText:"Ajusta las hipótesis y observa cómo cambia el caso financiero.",viewRecommendation:"Ver recomendación",assumptions:"Hipótesis",employeeCount:"Número de empleados",averageSalary:"Salario medio",manualHoursWeek:"Horas manuales por semana",expectedAutomation:"Automatización esperada",implementationCost:"Coste de implementación",projectedReturn:"Retorno proyectado",implementation:"Implementación",paybackPeriod:"Periodo de retorno",months:" meses",cumulativeValue:"Valor acumulado durante 24 meses",executiveRecommendation:"Recomendación ejecutiva",startWith:"Empieza por {title}.",recommendationText:"Esta iniciativa ofrece el mejor equilibrio entre impacto medible, viabilidad y riesgo operativo.",projectedSavings:"Ahorro anual proyectado",expectedDeployment:"Implementación esperada",recommendationConfidence:"Confianza de la recomendación",whyFirst:"Por qué debe ir primero",reviewAll:"Revisar todas las oportunidades",startNew:"Iniciar nueva evaluación",low:"Baja",medium:"Media",high:"Alta" },
  fr: { ...en, platform:"Plateforme",how:"Fonctionnement",outcomes:"Résultats",start:"Commencer l'évaluation",heroEyebrow:"La transformation IA, avec un plan",heroTitle:"Trouvez les idées IA qui méritent d'être développées.",heroText:"Transformez le fonctionnement de votre entreprise en feuille de route IA priorisée, avec des opportunités claires et un ROI avant d'investir.",fiveMinutes:"Environ 5 minutes",contextTitle:"Du contexte métier à une première décision confiante.",discover:"DÉCOUVRIR",discoverTitle:"Décrivez naturellement votre entreprise",prioritize:"PRIORISER",prioritizeTitle:"Sachez quoi faire en premier",prove:"PROUVER",proveTitle:"Construisez le dossier financier",continue:"Continuer",industryQuestion:"Dans quel secteur votre entreprise opère-t-elle ?",industryHelp:"Cela nous aide à adapter les opportunités à votre secteur.",technology:"Technologie",financialServices:"Services financiers",healthcare:"Santé",retail:"Commerce",manufacturing:"Industrie",professionalServices:"Services professionnels",other:"Autre",companySizeQuestion:"Quelle est la taille de votre organisation ?",questionDepartments:"Sur quels départements devons-nous nous concentrer ?",processesQuestion:"Décrivez vos principaux processus métier",workflowsQuestion:"Quels workflows répétitifs ralentissent votre équipe ?",hoursQuestion:"Combien de temps consacrez-vous aux opérations manuelles ?",employees:"employés",customerSupport:"Service client",sales:"Ventes",operations:"Opérations",hr:"RH",finance:"Finance",it:"IT",marketing:"Marketing",legal:"Juridique",back:"Retour",launchAnalysis:"Lancer l'analyse",analysisComplete:"Analyse terminée",opportunitiesIdentified:"opportunités identifiées",analysisTitle:"Où l'IA peut créer une valeur significative.",prioritizeOpportunities:"Prioriser les opportunités",annualSavings:"Économies annuelles",complexity:"Complexité",deployment:"Déploiement",automation:"Automatisation",simulateRoi:"Simuler le ROI",priorityTitle:"Décidez ce qui mérite votre attention en premier.",roiTitle:"Comprenez le retour avant d'investir.",viewRecommendation:"Voir la recommandation",assumptions:"Hypothèses",employeeCount:"Nombre d'employés",averageSalary:"Salaire moyen",implementationCost:"Coût de mise en œuvre",projectedReturn:"Retour projeté",paybackPeriod:"Délai de récupération",months:" mois",executiveRecommendation:"Recommandation exécutive",startWith:"Commencez par {title}.",reviewAll:"Voir toutes les opportunités",startNew:"Nouvelle évaluation",low:"Faible",medium:"Moyenne",high:"Élevée" },
  de: { ...en, platform:"Plattform",how:"So funktioniert es",outcomes:"Ergebnisse",start:"Bewertung starten",heroEyebrow:"KI-Transformation mit Plan",heroTitle:"Finden Sie die KI-Ideen, die sich wirklich lohnen.",heroText:"Verwandeln Sie Ihre Geschäftsabläufe in eine priorisierte KI-Roadmap mit klaren Chancen und ROI vor der Investition.",fiveMinutes:"Dauert etwa 5 Minuten",contextTitle:"Vom Geschäftskontext zur sicheren ersten Entscheidung.",discover:"ENTDECKEN",discoverTitle:"Beschreiben Sie Ihr Unternehmen natürlich",prioritize:"PRIORISIEREN",prioritizeTitle:"Wissen, was zuerst geschehen sollte",prove:"BELEGEN",proveTitle:"Erstellen Sie den Business Case",continue:"Weiter",industryQuestion:"In welcher Branche ist Ihr Unternehmen tätig?",industryHelp:"So können wir Chancen auf Ihre Branche abstimmen.",technology:"Technologie",financialServices:"Finanzdienstleistungen",healthcare:"Gesundheitswesen",retail:"Einzelhandel",manufacturing:"Fertigung",professionalServices:"Professionelle Dienstleistungen",other:"Andere",companySizeQuestion:"Wie groß ist Ihre Organisation?",questionDepartments:"Auf welche Abteilungen sollen wir uns konzentrieren?",processesQuestion:"Beschreiben Sie Ihre wichtigsten Geschäftsprozesse",workflowsQuestion:"Welche wiederkehrenden Abläufe bremsen Ihr Team?",hoursQuestion:"Wie viel Zeit fließt in manuelle Abläufe?",employees:"Mitarbeiter",customerSupport:"Kundensupport",sales:"Vertrieb",operations:"Betrieb",hr:"Personal",finance:"Finanzen",it:"IT",marketing:"Marketing",legal:"Recht",back:"Zurück",launchAnalysis:"Analyse starten",analysisComplete:"Analyse abgeschlossen",opportunitiesIdentified:"Chancen identifiziert",analysisTitle:"Wo KI echten Mehrwert schaffen kann.",prioritizeOpportunities:"Chancen priorisieren",annualSavings:"Jährliche Einsparungen",complexity:"Komplexität",deployment:"Bereitstellung",automation:"Automatisierung",simulateRoi:"ROI simulieren",priorityTitle:"Entscheiden Sie, was zuerst Aufmerksamkeit verdient.",roiTitle:"Verstehen Sie die Rendite vor der Investition.",viewRecommendation:"Empfehlung anzeigen",assumptions:"Annahmen",employeeCount:"Mitarbeiterzahl",averageSalary:"Durchschnittsgehalt",implementationCost:"Implementierungskosten",projectedReturn:"Prognostizierte Rendite",paybackPeriod:"Amortisationszeit",months:" Monate",executiveRecommendation:"Management-Empfehlung",startWith:"Beginnen Sie mit {title}.",reviewAll:"Alle Chancen prüfen",startNew:"Neue Bewertung",low:"Niedrig",medium:"Mittel",high:"Hoch" },
  pt: { ...en, platform:"Plataforma",how:"Como funciona",outcomes:"Resultados",start:"Iniciar avaliação",heroEyebrow:"Transformação com IA, com um plano",heroTitle:"Encontre as ideias de IA que vale a pena desenvolver.",heroText:"Transforme o funcionamento da sua empresa num roteiro de IA priorizado, com oportunidades claras e ROI antes de investir.",fiveMinutes:"Demora cerca de 5 minutos",contextTitle:"Do contexto empresarial a uma primeira decisão confiante.",discover:"DESCOBRIR",discoverTitle:"Descreva a sua empresa naturalmente",prioritize:"PRIORIZAR",prioritizeTitle:"Saiba o que deve acontecer primeiro",prove:"COMPROVAR",proveTitle:"Construa o caso financeiro",continue:"Continuar",industryQuestion:"Em que setor opera a sua empresa?",industryHelp:"Isto ajuda-nos a adaptar oportunidades ao seu setor.",technology:"Tecnologia",financialServices:"Serviços financeiros",healthcare:"Saúde",retail:"Retalho",manufacturing:"Indústria",professionalServices:"Serviços profissionais",other:"Outro",companySizeQuestion:"Qual é o tamanho da sua organização?",questionDepartments:"Em que departamentos devemos focar?",processesQuestion:"Descreva os seus principais processos empresariais",workflowsQuestion:"Que fluxos repetitivos atrasam a sua equipa?",hoursQuestion:"Quanto tempo é dedicado a operações manuais?",employees:"funcionários",customerSupport:"Apoio ao cliente",sales:"Vendas",operations:"Operações",hr:"RH",finance:"Finanças",it:"TI",marketing:"Marketing",legal:"Jurídico",back:"Voltar",launchAnalysis:"Iniciar análise",analysisComplete:"Análise concluída",opportunitiesIdentified:"oportunidades identificadas",analysisTitle:"Onde a IA pode criar valor significativo.",prioritizeOpportunities:"Priorizar oportunidades",annualSavings:"Poupança anual",complexity:"Complexidade",deployment:"Implementação",automation:"Automação",simulateRoi:"Simular ROI",priorityTitle:"Decida o que merece atenção primeiro.",roiTitle:"Compreenda o retorno antes de investir.",viewRecommendation:"Ver recomendação",assumptions:"Premissas",employeeCount:"Número de funcionários",averageSalary:"Salário médio",implementationCost:"Custo de implementação",projectedReturn:"Retorno projetado",paybackPeriod:"Período de retorno",months:" meses",executiveRecommendation:"Recomendação executiva",startWith:"Comece por {title}.",reviewAll:"Rever todas as oportunidades",startNew:"Nova avaliação",low:"Baixa",medium:"Média",high:"Alta" },
  it: { ...en, platform:"Piattaforma",how:"Come funziona",outcomes:"Risultati",start:"Inizia la valutazione",heroEyebrow:"Trasformazione AI, con un piano",heroTitle:"Trova le idee AI che vale davvero la pena sviluppare.",heroText:"Trasforma il modo in cui opera la tua azienda in una roadmap AI prioritaria, con opportunità chiare e ROI prima di investire.",fiveMinutes:"Richiede circa 5 minuti",contextTitle:"Dal contesto aziendale a una prima decisione sicura.",contextText:"AdoptAI pone le domande giuste, valuta ogni opportunità e rende chiaro il business case.",discover:"SCOPRI",discoverTitle:"Descrivi la tua azienda in modo naturale",discoverText:"Una valutazione conversazionale comprende come lavorano i team, dove si perde tempo e cosa li rallenta.",prioritize:"DAI PRIORITÀ",prioritizeTitle:"Scopri cosa fare per primo",prioritizeText:"Ogni iniziativa viene valutata per valore, fattibilità, velocità, rischio e disponibilità dei dati.",prove:"DIMOSTRA",proveTitle:"Costruisci il business case",proveText:"Modella risparmi, costi di implementazione, tempo di rientro e ROI a dodici mesi.",questionsTitle:"Domande che portano a risultati.",questionsText:"Una domanda mirata alla volta. Ogni risposta genera raccomandazioni più pertinenti.",tryAssessment:"Prova la valutazione",questionDepartments:"Su quali reparti dovremmo concentrarci?",selectAreas:"Seleziona tutte le aree in cui l'AI può creare impatto.",roadmapTitle:"Le idee diventano una roadmap concreta.",finalCta:"Rendi corretto il tuo prossimo investimento in AI.",continue:"Continua",industryQuestion:"In quale settore opera la tua azienda?",industryHelp:"Questo ci aiuta ad adattare le opportunità al tuo settore.",technology:"Tecnologia",financialServices:"Servizi finanziari",healthcare:"Sanità",retail:"Vendita al dettaglio",manufacturing:"Produzione",professionalServices:"Servizi professionali",other:"Altro",companySizeQuestion:"Quanto è grande la tua organizzazione?",companySizeHelp:"Le dimensioni influenzano portata e ROI.",departmentsHelp:"Seleziona tutti i reparti in cui l'AI può creare impatto.",processesQuestion:"Descrivi i principali processi aziendali",processesHelp:"Raccontaci i flussi che guidano la tua azienda.",workflowsQuestion:"Quali attività ripetitive rallentano il tuo team?",workflowsHelp:"Scegli flussi comuni o aggiungi i tuoi.",hoursQuestion:"Quanto tempo viene dedicato alle operazioni manuali?",hoursHelp:"Stima le ore settimanali dedicate ad attività manuali e ripetitive.",readyQuestion:"Pronto ad analizzare la tua organizzazione?",reviewHelp:"Rivedi le risposte e avvia l'analisi delle opportunità.",employees:"dipendenti",customerSupport:"Assistenza clienti",sales:"Vendite",operations:"Operazioni",hr:"Risorse umane",finance:"Finanza",it:"IT",marketing:"Marketing",legal:"Legale",addWorkflow:"Aggiungi flusso personalizzato...",add:"Aggiungi",hoursWeek:"ore / settimana",minimal:"Minimo",significantLoad:"Carico manuale significativo",industry:"Settore",companySize:"Dimensioni azienda",departments:"Reparti",manualHours:"Ore manuali/settimana",notProvided:"Non indicato",back:"Indietro",launchAnalysis:"Avvia analisi",pressEnter:"Premi Invio ↵",preparingAnalysis:"Preparazione dell'analisi",stage1:"Mappatura dei processi aziendali",stage2:"Analisi dei flussi ripetitivi",stage3:"Stima del potenziale di automazione",stage4:"Valutazione delle opportunità",stage5:"Preparazione del report strategico",complete:"completato",analysisComplete:"Analisi completata",opportunitiesIdentified:"opportunità identificate",analysisTitle:"Dove l'AI può creare valore significativo.",prioritizeOpportunities:"Dai priorità alle opportunità",aiOpportunity:"Opportunità AI",annualSavings:"Risparmio annuale",complexity:"Complessità",deployment:"Implementazione",automation:"Automazione",simulateRoi:"Simula ROI",portfolioView:"Vista portfolio",priorityTitle:"Decidi cosa merita attenzione per primo.",priorityText:"Confronta il valore aziendale con la difficoltà di implementazione.",roiSimulation:"Simulazione ROI",roiTitle:"Comprendi il ritorno prima di investire.",roiText:"Modifica le ipotesi e osserva come cambia il caso finanziario.",viewRecommendation:"Vedi raccomandazione",assumptions:"Ipotesi",employeeCount:"Numero di dipendenti",averageSalary:"Stipendio medio",manualHoursWeek:"Ore manuali settimanali",expectedAutomation:"Automazione prevista",implementationCost:"Costo di implementazione",projectedReturn:"Ritorno previsto",implementation:"Implementazione",paybackPeriod:"Tempo di rientro",months:" mesi",cumulativeValue:"Valore cumulativo in 24 mesi",executiveRecommendation:"Raccomandazione esecutiva",startWith:"Inizia con {title}.",recommendationText:"Questa iniziativa offre il miglior equilibrio tra impatto misurabile, fattibilità e rischio operativo.",projectedSavings:"Risparmio annuale previsto",expectedDeployment:"Implementazione prevista",recommendationConfidence:"Affidabilità della raccomandazione",whyFirst:"Perché dovrebbe venire prima",reviewAll:"Rivedi tutte le opportunità",startNew:"Nuova valutazione",low:"Bassa",medium:"Media",high:"Alta" },
};

const supplemental: Record<Language, Record<string, string>> = {
  en: {
    askAnalyzeAct:"ASK. ANALYZE. ACT.", intelligentDiscovery:"INTELLIGENT DISCOVERY", decisionIntelligence:"DECISION INTELLIGENCE",
    discoveryDemo:"AdoptAI discovery", stepOf:"{current} of {total}", supportAutomation:"Support automation", internalKnowledgeAssistant:"Internal knowledge assistant", invoiceProcessingShort:"Invoice processing", salesAssistantShort:"Sales assistant",
    annualSavingsShort:"€42k annual savings", deploymentShort:"6 week deployment", priorityScoreShort:"87 priority score",
    quickWins:"Quick Wins", strategicProjects:"Strategic Projects", strategic:"Strategic", secondary:"Secondary", avoid:"Avoid",
    implementationDifficulty:"Implementation Difficulty", businessValue:"Business Value", confidence:"Confidence", perYear:"/yr",
    workflowPlaceholder:"e.g. We process 500+ customer support tickets daily, manually route invoices through three approval stages, and generate weekly reports from multiple data sources...", hoursShort:" hrs", cumulativeSavings:"Cumulative savings", netValue:"Net value", close:"Close",
  },
  es: {
    askAnalyzeAct:"PREGUNTA. ANALIZA. ACTÚA.", intelligentDiscovery:"DESCUBRIMIENTO INTELIGENTE", decisionIntelligence:"INTELIGENCIA DE DECISIÓN",
    discoveryDemo:"Descubrimiento AdoptAI", stepOf:"{current} de {total}", supportAutomation:"Automatización de soporte", internalKnowledgeAssistant:"Asistente interno de conocimiento", invoiceProcessingShort:"Procesamiento de facturas", salesAssistantShort:"Asistente de ventas",
    annualSavingsShort:"42 mil € de ahorro anual", deploymentShort:"Implementación en 6 semanas", priorityScoreShort:"87 puntos de prioridad",
    quickWins:"Victorias rápidas", strategicProjects:"Proyectos estratégicos", strategic:"Estratégicos", secondary:"Secundarios", avoid:"Evitar",
    implementationDifficulty:"Dificultad de implementación", businessValue:"Valor empresarial", confidence:"Confianza", perYear:"/año",
    workflowPlaceholder:"Ej.: Procesamos más de 500 consultas diarias, enviamos facturas manualmente por tres fases de aprobación y generamos informes semanales desde varias fuentes...", hoursShort:" h", cumulativeSavings:"Ahorro acumulado", netValue:"Valor neto", close:"Cerrar",
  },
  fr: {
    askAnalyzeAct:"QUESTIONNER. ANALYSER. AGIR.", intelligentDiscovery:"DÉCOUVERTE INTELLIGENTE", decisionIntelligence:"INTELLIGENCE DÉCISIONNELLE",
    discoveryDemo:"Découverte AdoptAI", stepOf:"{current} sur {total}", supportAutomation:"Automatisation du support", internalKnowledgeAssistant:"Assistant de connaissances interne", invoiceProcessingShort:"Traitement des factures", salesAssistantShort:"Assistant commercial",
    annualSavingsShort:"42 k€ d'économies annuelles", deploymentShort:"Déploiement en 6 semaines", priorityScoreShort:"Score de priorité 87",
    quickWins:"Gains rapides", strategicProjects:"Projets stratégiques", strategic:"Stratégiques", secondary:"Secondaires", avoid:"À éviter",
    implementationDifficulty:"Difficulté de mise en œuvre", businessValue:"Valeur métier", confidence:"Confiance", perYear:"/an",
    workflowPlaceholder:"Ex. : Nous traitons plus de 500 demandes par jour, acheminons les factures manuellement et générons des rapports hebdomadaires...", hoursShort:" h", cumulativeSavings:"Économies cumulées", netValue:"Valeur nette", close:"Fermer",
  },
  de: {
    askAnalyzeAct:"FRAGEN. ANALYSIEREN. HANDELN.", intelligentDiscovery:"INTELLIGENTE ANALYSE", decisionIntelligence:"ENTSCHEIDUNGSINTELLIGENZ",
    discoveryDemo:"AdoptAI Analyse", stepOf:"{current} von {total}", supportAutomation:"Support-Automatisierung", internalKnowledgeAssistant:"Interner Wissensassistent", invoiceProcessingShort:"Rechnungsverarbeitung", salesAssistantShort:"Vertriebsassistent",
    annualSavingsShort:"42 Tsd. € jährliche Einsparung", deploymentShort:"Bereitstellung in 6 Wochen", priorityScoreShort:"Prioritätswert 87",
    quickWins:"Schnelle Erfolge", strategicProjects:"Strategische Projekte", strategic:"Strategisch", secondary:"Sekundär", avoid:"Vermeiden",
    implementationDifficulty:"Implementierungsaufwand", businessValue:"Geschäftswert", confidence:"Konfidenz", perYear:"/Jahr",
    workflowPlaceholder:"Z. B.: Wir bearbeiten täglich über 500 Anfragen, leiten Rechnungen manuell weiter und erstellen wöchentliche Berichte...", hoursShort:" Std.", cumulativeSavings:"Kumulierte Einsparungen", netValue:"Nettowert", close:"Schließen",
  },
  pt: {
    askAnalyzeAct:"PERGUNTAR. ANALISAR. AGIR.", intelligentDiscovery:"DESCOBERTA INTELIGENTE", decisionIntelligence:"INTELIGÊNCIA DE DECISÃO",
    discoveryDemo:"Descoberta AdoptAI", stepOf:"{current} de {total}", supportAutomation:"Automação do apoio", internalKnowledgeAssistant:"Assistente interno de conhecimento", invoiceProcessingShort:"Processamento de faturas", salesAssistantShort:"Assistente de vendas",
    annualSavingsShort:"42 mil € de poupança anual", deploymentShort:"Implementação em 6 semanas", priorityScoreShort:"87 pontos de prioridade",
    quickWins:"Ganhos rápidos", strategicProjects:"Projetos estratégicos", strategic:"Estratégicos", secondary:"Secundários", avoid:"Evitar",
    implementationDifficulty:"Dificuldade de implementação", businessValue:"Valor empresarial", confidence:"Confiança", perYear:"/ano",
    workflowPlaceholder:"Ex.: Processamos mais de 500 pedidos diários, encaminhamos faturas manualmente e geramos relatórios semanais...", hoursShort:" h", cumulativeSavings:"Poupança acumulada", netValue:"Valor líquido", close:"Fechar",
  },
  it: {
    askAnalyzeAct:"CHIEDI. ANALIZZA. AGISCI.", intelligentDiscovery:"ANALISI INTELLIGENTE", decisionIntelligence:"INTELLIGENZA DECISIONALE",
    discoveryDemo:"Analisi AdoptAI", stepOf:"{current} di {total}", supportAutomation:"Automazione del supporto", internalKnowledgeAssistant:"Assistente interno della conoscenza", invoiceProcessingShort:"Elaborazione fatture", salesAssistantShort:"Assistente vendite",
    annualSavingsShort:"42 mila € di risparmio annuo", deploymentShort:"Implementazione in 6 settimane", priorityScoreShort:"Punteggio priorità 87",
    quickWins:"Risultati rapidi", strategicProjects:"Progetti strategici", strategic:"Strategici", secondary:"Secondari", avoid:"Evitare",
    implementationDifficulty:"Difficoltà di implementazione", businessValue:"Valore aziendale", confidence:"Affidabilità", perYear:"/anno",
    workflowPlaceholder:"Es.: Gestiamo oltre 500 richieste al giorno, instradiamo manualmente le fatture e generiamo report settimanali...", hoursShort:" h", cumulativeSavings:"Risparmio cumulativo", netValue:"Valore netto", close:"Chiudi",
  },
};

const dynamic: Record<Language, Record<string, string>> = {
  en: {},
  es: {
    "Technology":"Tecnología","Financial Services":"Servicios financieros","Healthcare":"Sanidad","Retail":"Comercio minorista","Manufacturing":"Industria","Professional Services":"Servicios profesionales","Other":"Otro",
    "Customer Support":"Atención al cliente","Sales":"Ventas","Operations":"Operaciones","HR":"RR. HH.","Finance":"Finanzas","IT":"TI","Marketing":"Marketing","Legal":"Legal",
    "Invoice processing":"Procesamiento de facturas","Customer ticket routing":"Enrutamiento de consultas de clientes","Document review":"Revisión de documentos","Lead qualification":"Cualificación de clientes potenciales","Employee onboarding":"Incorporación de empleados","Report generation":"Generación de informes","Data entry":"Introducción de datos","Compliance checks":"Controles de cumplimiento",
    "Customer Support Automation":"Automatización de atención al cliente","Document Processing Automation":"Automatización del procesamiento documental","Internal Knowledge Assistant":"Asistente interno de conocimiento","AI Sales Assistant":"Asistente de ventas con IA","Invoice & Expense Automation":"Automatización de facturas y gastos","IT Helpdesk Automation":"Automatización del soporte de TI",
    "AI-powered ticket routing, response drafting, and sentiment analysis.":"Enrutamiento de consultas, redacción de respuestas y análisis de sentimiento mediante IA.","AI-powered ticket routing, response drafting, and sentiment analysis to reduce handle time.":"Enrutamiento de consultas, redacción de respuestas y análisis de sentimiento mediante IA para reducir tiempos.","Intelligent document extraction, classification, and routing.":"Extracción, clasificación y enrutamiento inteligente de documentos.","Extract, classify, and route documents automatically with intelligent OCR and NLP.":"Extrae, clasifica y enruta documentos automáticamente mediante OCR y PLN inteligentes.","Enterprise Q&A across policies, docs, and internal knowledge.":"Preguntas y respuestas empresariales sobre políticas, documentos y conocimiento interno.","Enterprise search and Q&A across policies, docs, and tribal knowledge.":"Búsqueda empresarial y preguntas y respuestas sobre políticas, documentos y conocimiento interno.","Lead scoring, outreach personalization, and pipeline insights.":"Puntuación de clientes potenciales, personalización del contacto e información del embudo.","Automated lead scoring, personalized outreach, and CRM enrichment for your sales team.":"Puntuación automática de clientes potenciales, contacto personalizado y enriquecimiento del CRM.","Automated invoice matching, expense categorization, and anomaly detection.":"Conciliación automática de facturas, clasificación de gastos y detección de anomalías.","Self-service resolution, ticket triage, and automated runbook execution.":"Resolución de autoservicio, clasificación de incidencias y ejecución automatizada de procedimientos.",
    "Highest projected ROI among evaluated initiatives":"El ROI proyectado más alto entre las iniciativas evaluadas","Strong return on investment relative to implementation cost":"Gran retorno en relación con el coste de implementación","Low implementation complexity enables fast time-to-value":"La baja complejidad permite obtener valor rápidamente","Balanced implementation complexity with manageable risk":"Complejidad equilibrada con un riesgo manejable","Strong data availability supports reliable AI performance":"La buena disponibilidad de datos permite un rendimiento fiable","Low compliance risk simplifies deployment and governance":"El bajo riesgo normativo simplifica el despliegue y la gobernanza",
  },
  fr: {"Technology":"Technologie","Financial Services":"Services financiers","Customer Support":"Service client","Sales":"Ventes","Operations":"Opérations","HR":"RH","Finance":"Finance","Invoice processing":"Traitement des factures","Customer ticket routing":"Routage des demandes clients","Document review":"Révision de documents","Lead qualification":"Qualification des prospects","Employee onboarding":"Intégration des employés","Report generation":"Génération de rapports","Data entry":"Saisie de données","Compliance checks":"Contrôles de conformité","Customer Support Automation":"Automatisation du service client","Document Processing Automation":"Automatisation du traitement documentaire","Internal Knowledge Assistant":"Assistant de connaissances interne","AI Sales Assistant":"Assistant commercial IA","Intelligent document extraction, classification, and routing.":"Extraction, classification et routage intelligents des documents.","AI-powered ticket routing, response drafting, and sentiment analysis.":"Routage des demandes, rédaction des réponses et analyse des sentiments par IA.","Enterprise Q&A across policies, docs, and internal knowledge.":"Questions-réponses sur les politiques, documents et connaissances internes.","Lead scoring, outreach personalization, and pipeline insights.":"Notation des prospects, personnalisation des contacts et analyse du pipeline."},
  de: {"Technology":"Technologie","Financial Services":"Finanzdienstleistungen","Customer Support":"Kundensupport","Sales":"Vertrieb","Operations":"Betrieb","HR":"Personal","Finance":"Finanzen","Invoice processing":"Rechnungsverarbeitung","Customer ticket routing":"Weiterleitung von Kundenanfragen","Document review":"Dokumentenprüfung","Lead qualification":"Lead-Qualifizierung","Employee onboarding":"Mitarbeiter-Onboarding","Report generation":"Berichterstellung","Data entry":"Dateneingabe","Compliance checks":"Compliance-Prüfungen","Customer Support Automation":"Automatisierung des Kundensupports","Document Processing Automation":"Automatisierte Dokumentenverarbeitung","Internal Knowledge Assistant":"Interner Wissensassistent","AI Sales Assistant":"KI-Vertriebsassistent","Intelligent document extraction, classification, and routing.":"Intelligente Extraktion, Klassifizierung und Weiterleitung von Dokumenten.","AI-powered ticket routing, response drafting, and sentiment analysis.":"KI-gestützte Weiterleitung, Antworterstellung und Stimmungsanalyse.","Enterprise Q&A across policies, docs, and internal knowledge.":"Unternehmensweite Fragen und Antworten zu Richtlinien, Dokumenten und internem Wissen.","Lead scoring, outreach personalization, and pipeline insights.":"Lead-Bewertung, personalisierte Ansprache und Pipeline-Einblicke."},
  pt: {"Technology":"Tecnologia","Financial Services":"Serviços financeiros","Customer Support":"Apoio ao cliente","Sales":"Vendas","Operations":"Operações","HR":"RH","Finance":"Finanças","Invoice processing":"Processamento de faturas","Customer ticket routing":"Encaminhamento de pedidos de clientes","Document review":"Revisão de documentos","Lead qualification":"Qualificação de leads","Employee onboarding":"Integração de funcionários","Report generation":"Geração de relatórios","Data entry":"Introdução de dados","Compliance checks":"Verificações de conformidade","Customer Support Automation":"Automação do apoio ao cliente","Document Processing Automation":"Automação do processamento documental","Internal Knowledge Assistant":"Assistente interno de conhecimento","AI Sales Assistant":"Assistente de vendas com IA","Intelligent document extraction, classification, and routing.":"Extração, classificação e encaminhamento inteligente de documentos.","AI-powered ticket routing, response drafting, and sentiment analysis.":"Encaminhamento de pedidos, redação de respostas e análise de sentimento com IA.","Enterprise Q&A across policies, docs, and internal knowledge.":"Perguntas e respostas empresariais sobre políticas, documentos e conhecimento interno.","Lead scoring, outreach personalization, and pipeline insights.":"Pontuação de leads, personalização do contacto e informações do pipeline."},
  it: {"Technology":"Tecnologia","Financial Services":"Servizi finanziari","Customer Support":"Assistenza clienti","Sales":"Vendite","Operations":"Operazioni","HR":"Risorse umane","Finance":"Finanza","Invoice processing":"Elaborazione fatture","Customer ticket routing":"Instradamento richieste clienti","Document review":"Revisione documenti","Lead qualification":"Qualificazione lead","Employee onboarding":"Inserimento dipendenti","Report generation":"Generazione report","Data entry":"Inserimento dati","Compliance checks":"Controlli di conformità","Customer Support Automation":"Automazione dell'assistenza clienti","Document Processing Automation":"Automazione dell'elaborazione documentale","Internal Knowledge Assistant":"Assistente interno della conoscenza","AI Sales Assistant":"Assistente vendite AI","Intelligent document extraction, classification, and routing.":"Estrazione, classificazione e instradamento intelligente dei documenti.","AI-powered ticket routing, response drafting, and sentiment analysis.":"Instradamento delle richieste, preparazione delle risposte e analisi del sentiment tramite AI.","Enterprise Q&A across policies, docs, and internal knowledge.":"Domande e risposte aziendali su policy, documenti e conoscenza interna.","Lead scoring, outreach personalization, and pipeline insights.":"Valutazione dei lead, personalizzazione dei contatti e analisi della pipeline."},
};

const dynamicKeys: Record<string, string> = {
  "Customer support automation": "supportAutomation",
  "Internal knowledge assistant": "internalKnowledgeAssistant",
  "Invoice processing": "invoiceProcessingShort",
  "€42k annual savings": "annualSavingsShort",
  "6 week deployment": "deploymentShort",
  "87 priority score": "priorityScoreShort",
  "Support automation": "supportAutomation",
  "Sales assistant": "salesAssistantShort",
};

const dynamicExtended: Record<Language, Record<string, string>> = {
  en: {},
  es: {},
  fr: {
    "Automated lead scoring, personalized outreach, and CRM enrichment for your sales team.":"Notation automatisée des prospects, contacts personnalisés et enrichissement du CRM pour votre équipe commerciale.",
    "Enterprise search and Q&A across policies, docs, and tribal knowledge.":"Recherche d'entreprise et questions-réponses sur les politiques, documents et connaissances internes.",
    "Automated invoice matching, expense categorization, and anomaly detection.":"Rapprochement automatique des factures, catégorisation des dépenses et détection des anomalies.",
    "Self-service resolution, ticket triage, and automated runbook execution.":"Résolution en libre-service, triage des tickets et exécution automatisée des procédures.",
    "Invoice & Expense Automation":"Automatisation des factures et dépenses","IT Helpdesk Automation":"Automatisation du support IT",
  },
  de: {
    "Automated lead scoring, personalized outreach, and CRM enrichment for your sales team.":"Automatische Lead-Bewertung, personalisierte Ansprache und CRM-Anreicherung für Ihr Vertriebsteam.",
    "Enterprise search and Q&A across policies, docs, and tribal knowledge.":"Unternehmenssuche und Fragen und Antworten zu Richtlinien, Dokumenten und internem Wissen.",
    "Automated invoice matching, expense categorization, and anomaly detection.":"Automatischer Rechnungsabgleich, Ausgabenkategorisierung und Anomalieerkennung.",
    "Self-service resolution, ticket triage, and automated runbook execution.":"Self-Service-Lösung, Ticket-Triage und automatisierte Ausführung von Betriebsabläufen.",
    "Invoice & Expense Automation":"Automatisierung von Rechnungen und Ausgaben","IT Helpdesk Automation":"Automatisierung des IT-Helpdesks",
  },
  pt: {
    "Automated lead scoring, personalized outreach, and CRM enrichment for your sales team.":"Pontuação automática de leads, contacto personalizado e enriquecimento do CRM para a equipa de vendas.",
    "Enterprise search and Q&A across policies, docs, and tribal knowledge.":"Pesquisa empresarial e perguntas e respostas sobre políticas, documentos e conhecimento interno.",
    "Automated invoice matching, expense categorization, and anomaly detection.":"Correspondência automática de faturas, categorização de despesas e deteção de anomalias.",
    "Self-service resolution, ticket triage, and automated runbook execution.":"Resolução self-service, triagem de pedidos e execução automatizada de procedimentos.",
    "Invoice & Expense Automation":"Automação de faturas e despesas","IT Helpdesk Automation":"Automação do suporte de TI",
  },
  it: {
    "Automated lead scoring, personalized outreach, and CRM enrichment for your sales team.":"Valutazione automatica dei lead, contatti personalizzati e arricchimento del CRM per il team vendite.",
    "Enterprise search and Q&A across policies, docs, and tribal knowledge.":"Ricerca aziendale e domande e risposte su policy, documenti e conoscenza interna.",
    "Automated invoice matching, expense categorization, and anomaly detection.":"Abbinamento automatico delle fatture, classificazione delle spese e rilevamento delle anomalie.",
    "Self-service resolution, ticket triage, and automated runbook execution.":"Risoluzione self-service, classificazione delle richieste ed esecuzione automatizzata delle procedure.",
    "Invoice & Expense Automation":"Automazione di fatture e spese","IT Helpdesk Automation":"Automazione del supporto IT",
  },
};

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, values?: Record<string, string | number>) => string;
  td: (text: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  useEffect(() => {
    const stored = localStorage.getItem("adopt-ai-language") as Language | null;
    const browser = navigator.language.slice(0, 2) as Language;
    const initial = stored && translations[stored] ? stored : translations[browser] ? browser : "en";
    setLanguageState(initial);
    document.documentElement.lang = initial;
  }, []);
  const setLanguage = (next: Language) => {
    setLanguageState(next);
    localStorage.setItem("adopt-ai-language", next);
    document.documentElement.lang = next;
  };
  const value = useMemo(() => ({
    language,
    setLanguage,
    t: (key: string, values: Record<string, string | number> = {}) => {
      let text = supplemental[language][key] ?? translations[language][key] ?? supplemental.en[key] ?? en[key] ?? key;
      for (const [name, value] of Object.entries(values)) text = text.replace(`{${name}}`, String(value));
      return text;
    },
    td: (text: string) => {
      const key = dynamicKeys[text];
      if (key) return supplemental[language][key] ?? supplemental.en[key] ?? text;
      const exact = dynamic[language][text] ?? dynamicExtended[language][text];
      if (exact) return exact;
      const weeks = text.match(/^(\d+)-(\d+) weeks$/);
      if (weeks && language !== "en") {
        const word = language === "es" ? "semanas" : language === "fr" ? "semaines" : language === "de" ? "Wochen" : language === "pt" ? "semanas" : "settimane";
        return `${weeks[1]}-${weeks[2]} ${word}`;
      }
      return text;
    },
  }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
