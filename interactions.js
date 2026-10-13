/* ============================================================
   INTERACTIONS.JS — Lightweight vanilla JS
   Mobile menu, scroll reveal, modal system
   ============================================================ */

(function () {
  'use strict';

  // === MOBILE MENU ===
  const menuBtn = document.querySelector('.menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-menu-link');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function () {
      menuBtn.classList.toggle('active');
      mobileMenu.classList.toggle('open');
    });

    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        menuBtn.classList.remove('active');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // === SCROLL REVEAL (IntersectionObserver) ===
  var revealEls = document.querySelectorAll(
    '.h1, .h2, .hero-sub, .hero-stats, .hero-btn, .about-content, ' +
    '.title-wrap, .case-studies-card, .why-card, .process-step, ' +
    '.cta-inner, .footer-top, .lead-text, .more-work-wrap'
  );

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal', 'visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(function (el) {
      el.classList.add('reveal');
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show everything
    revealEls.forEach(function (el) {
      el.classList.add('reveal', 'visible');
    });
  }

  // === SMOOTH SCROLL FOR ANCHOR LINKS ===
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile menu if open
        if (mobileMenu && mobileMenu.classList.contains('open')) {
          menuBtn.classList.remove('active');
          mobileMenu.classList.remove('open');
        }
      }
    });
  });

  // === WORKFLOW MODAL SYSTEM ===
  var workflowRegistry = {
    claude_scraper: {
      type: 'video',
      src: 'workflows/claude-code-scraper/claude_code_scraper_execution.mp4',
      poster: 'workflows/claude-code-scraper/poster.jpg',
      badge: 'Claude Opus 5 · 74s Video Demo',
      title: 'Claude Code Autonomous Lead Harvester & Enrichment Swarm',
      desc: 'Autonomous terminal orchestration powered by Claude Opus 5. The agent ingests regional medical clinic directories across Miami and New York, coordinates parallel headless Playwright workers with anti bot stealth fingerprinting, validates ICP criteria with Gemini Flash Lite, and launches autonomous background recovery daemons for unverified records with zero human prompts.',
      bullets: [
        'Autonomous CLI Orchestration decomposing high level objectives into executable bash commands.',
        'Playwright Stealth Scraping bypassing Cloudflare and bot detection mechanisms.',
        'Gemini 2.0 Flash Lite Enrichment extracting verified decision maker contacts and metadata.',
        'Autonomous Self Healing Daemon recovering missing fields before final pipeline termination.'
      ],
      metrics: [
        { val: '100%', label: 'Extraction Fidelity' },
        { val: '0', label: 'Human Prompts Needed' },
        { val: 'Auto', label: 'Recovery Daemon' }
      ],
      tags: ['Claude Opus 5', 'Playwright Stealth', 'Gemini Flash Lite', 'Autonomous Daemons', 'Pydantic V2'],
      download: 'downloads/workflow_3_claude_scraper.zip',
      downloadLabel: 'Download Blueprint (.zip)'
    },
    agentic_sdr: {
      type: 'image',
      src: 'workflows/agentic-sdr/architecture.svg',
      badge: 'LangGraph 0.2 · Outbound Swarm',
      title: 'Autonomous Outbound SDR Swarm',
      desc: 'Three layer autonomous outbound infrastructure. Directive Ingestion parses ICP rules, the LangGraph Supervisor coordinates specialized research and email agents under strict JSON schemas, and a paced relay daemon dispatches sequences at randomized 15 to 30 minute human cadences to maintain deliverability.',
      bullets: [
        'LangGraph 0.2 State Machine with supervisor routing and isolated agent memory.',
        'Multi Source Waterfall Enrichment verifying emails without guessing patterns.',
        'Strict 0.85 Evaluator Critic Quality Gate ensuring authentic founder tone.',
        'Paced Relay Dispatch Daemon preventing mailbox burn and domain blacklisting.'
      ],
      metrics: [
        { val: '15 to 20', label: 'Meetings / Week' },
        { val: '0.19%', label: 'Bounce Ceiling' },
        { val: '0.85+', label: 'Quality Gate' }
      ],
      tags: ['LangGraph 0.2', 'Playwright', 'Gemini Flash Lite', 'Pydantic V2', 'Zero Bounce OS'],
      download: 'downloads/workflow_1_outbound_sdr_swarm.zip',
      downloadLabel: 'Download Blueprint (.zip)'
    },
    agentic_dev: {
      type: 'image',
      src: 'workflows/agentic-dev/architecture.svg',
      badge: 'Python 3.12 · Autonomous Dev',
      title: 'Autonomous Full Stack Developer Agent',
      desc: 'End to end autonomous coding agent. Ingests GitHub issue directives, performs AST syntax parsing, authors test suites first under strict TDD Red Green Refactor cycles, runs sandboxed verification, and self repairs syntax and logic errors autonomously.',
      bullets: [
        'GitHub Issue Directive Ingestion parsing specs into executable test contracts.',
        'AST Syntax Parsing and tree manipulation verifying code changes before disk writes.',
        'Strict TDD Red Green Refactor Cycles targeting 80%+ test suite coverage.',
        'Sandboxed Execution with autonomous three strike self healing and git commit generation.'
      ],
      metrics: [
        { val: '80%+', label: 'Test Coverage' },
        { val: '3x', label: 'Auto Retries' },
        { val: '0', label: 'Human Guidance' }
      ],
      tags: ['Python 3.12', 'AST Parser', 'Pytest Sandbox', 'GitPython', 'Self Healing Loop'],
      download: 'downloads/workflow_2_autonomous_dev.zip',
      downloadLabel: 'Download Blueprint (.zip)'
    },
    n8n_multimodal: {
      type: 'video',
      src: 'workflows/n8n-multimodal-agent/multimodal_agent_demo.mp4',
      poster: 'workflows/n8n-multimodal-agent/poster.jpg',
      badge: 'n8n Production · 87s Video Demo',
      title: 'Multimodal Voice & Visual Lead Qualification Engine',
      desc: 'Autonomous multimodal pipeline processing Instagram direct messages and voice notes. The system transcribes audio payloads using Whisper, interprets visual media using Gemini 2.0 Flash Lite, assesses lead intent against custom qualification matrices, and records verified records into Google Drive with instant Telegram notifications.',
      bullets: [
        'Voice Note Audio Transcription via Whisper with 99% accuracy across complex accents.',
        'Visual Image Inspection via Gemini 2.0 for automated intent and context extraction.',
        'Webhook Trigger Architecture with zero missed messages and sub 60 second execution.',
        'Synchronized Data Storage into Google Drive and Google Sheets with zero human touch.'
      ],
      metrics: [
        { val: 'Sub 60s', label: 'Lead Intake SLA' },
        { val: '100%', label: 'Hands Free Extraction' },
        { val: '87s', label: 'Live Demonstration' }
      ],
      tags: ['n8n', 'Gemini 2.0', 'Whisper', 'Instagram Webhook', 'Google Drive', 'Telegram'],
      download: 'downloads/n8n/09_omnimodal_whatsapp_rag_agent_35nodes.json',
      downloadLabel: 'Download Blueprint (.json)'
    },
    n8n_autoposting: {
      type: 'video',
      src: 'workflows/n8n-autoposting-engine/autoposting_engine_demo.mp4',
      poster: 'workflows/n8n-autoposting-engine/poster.jpg',
      badge: 'n8n Production · 56s Video Demo',
      title: 'Master Multi Channel Content Syndication Engine',
      desc: 'Enterprise multi channel distribution swarm engineered to scale organic visibility. When a master video or text draft is approved, this workflow coordinates parallel publishing across YouTube, LinkedIn, X, and Instagram with platform specific metadata, high click hooks, and failure alert dispatch.',
      bullets: [
        'Simultaneous Multi Network Publishing across YouTube, LinkedIn, X, and Instagram.',
        'Dynamic Platform Formatting adjusting character limits and hashtag densities per channel.',
        'Automated Error Handling Watchdog with real time error notification dispatch.',
        'Sticky Note Operational Architecture ensuring zero maintainability debt for operations teams.'
      ],
      metrics: [
        { val: '4 Channels', label: 'Simultaneous Syndication' },
        { val: '25+ Hrs', label: 'Weekly Team Time Saved' },
        { val: '57 Nodes', label: 'Orchestrated Pipeline' }
      ],
      tags: ['n8n', 'YouTube API', 'LinkedIn REST', 'X API', 'Instagram Graph', 'Telegram Watchdog'],
      download: 'downloads/n8n/02_social_content_swarm_57nodes.json',
      downloadLabel: 'Download Blueprint (.json)'
    },
    make_linkedin: {
      type: 'video',
      src: 'workflows/linkedin-post-generator/linkedin_post_generator.mp4',
      poster: 'workflows/linkedin-post-generator/poster.jpg',
      badge: 'Make.com Production · Social AI',
      title: 'LinkedIn Social Intelligence & Copy Engine',
      desc: 'Autonomous thought leadership pipeline engineered on Make.com. The system monitors trending industry discussions across Apify scrapers, classifies timely news versus timeless evergreen hooks using GPT 4o, synthesizes high retention posts in founder authentic voice, and stages them directly into the publication buffer.',
      bullets: [
        'Automated Trend Harvesting scanning top niche newsletters and thought leaders.',
        'Editorial Classification Engine separating rapid response news from evergreen assets.',
        'Founder Voice Persona Alignment matching cadence, vocabulary, and paragraph rhythm.',
        'Direct Buffer and LinkedIn API Sync eliminating manual copy paste workflows.'
      ],
      metrics: [
        { val: '20+ Hrs', label: 'Reclaimed Every Week' },
        { val: '3.8x', label: 'Engagement Velocity' },
        { val: '100%', label: 'Automated Pipeline' }
      ],
      tags: ['Make.com', 'GPT 4o', 'Apify Scraping', 'LinkedIn API', 'Buffer'],
      download: 'workflows/linkedin-post-generator/blueprint.json',
      downloadLabel: 'Download Blueprint (.json)'
    },
    n8n_clinic: {
      type: 'image',
      src: 'workflows/n8n-clinic-management/canvas.png',
      badge: 'n8n Production · 38 Nodes Swarm',
      title: 'Multi Agent Clinic Management & EHR Swarm',
      desc: 'Autonomous healthcare workflow architecture orchestrating patient intake triage, dynamic calendar booking, EHR records synchronization, and physician notification alerts across HIPAA compliant webhooks with zero human latency.',
      bullets: [
        'Multi Agent Triage Routing dynamically classifying urgency and booking corresponding specialists.',
        'Bidirectional EHR & Calendar Synchronization ensuring zero double bookings or lost records.',
        'Deterministic Error Handling & Retries preventing data loss during upstream EHR outages.',
        'Automated Post Intake Follow Up Dispatch notifying patients and clinical coordinators.'
      ],
      metrics: [
        { val: '38 Nodes', label: 'Orchestrated Pipeline' },
        { val: 'Sub 30s', label: 'Intake to EHR Sync' },
        { val: '100%', label: 'Autonomous Booking' }
      ],
      tags: ['n8n', 'Healthcare EHR', 'Multi Agent Triage', 'Google Calendar', 'PostgreSQL', 'Telegram Alerts'],
      download: 'downloads/n8n/08_multiagent_clinic_booking_38nodes.json',
      downloadLabel: 'Download Blueprint (.json)'
    },
    make_whatsapp: {
      type: 'video',
      src: 'workflows/whatsapp-replying-bot/whatsapp_replying_bot.mp4',
      poster: 'workflows/whatsapp-replying-bot/poster.jpg',
      badge: 'Make.com Production · Conversational Commerce',
      title: 'WhatsApp Conversational Support & Order Routing Bot',
      desc: 'Full duplex conversational agent deployed on Make.com. Handles prospective customer inquiries around the clock, answers technical product questions, checks order status in Google Sheets, coordinates calendar appointments, and escalates high value leads directly to executive sales reps.',
      bullets: [
        'Realtime Webhook Ingestion capturing inbound customer chats within milliseconds.',
        'Dynamic Context Lookup querying inventory, booking slots, and customer order history.',
        'Human Handover Gate transferring complex edge cases to team members with chat history.',
        'Zero Cold Leads Guaranteed with automated immediate follow up triggers.'
      ],
      metrics: [
        { val: '<60s', label: 'Customer Response SLA' },
        { val: '42%', label: 'Support Ticket Deflection' },
        { val: '24/7', label: 'Active Uptime' }
      ],
      tags: ['Make.com', 'Meta Cloud API', 'OpenAI Whisper', 'Google Sheets', 'Twilio'],
      download: 'workflows/whatsapp-replying-bot/blueprint.json',
      downloadLabel: 'Download Blueprint (.json)'
    }
  };

  // Make openWorkflowModal globally accessible
  window.openWorkflowModal = function (key) {
    var data = workflowRegistry[key];
    if (!data) return;

    var overlay = document.getElementById('workflow-modal-overlay');
    var container = document.getElementById('modal-dynamic-content');
    if (!overlay || !container) return;

    var mediaHtml = '';
    if (data.type === 'video') {
      mediaHtml =
        '<div class="modal-media-col">' +
        '<video controls autoplay playsinline poster="' + data.poster + '">' +
        '<source src="' + data.src + '" type="video/mp4"/>' +
        '</video></div>';
    } else {
      mediaHtml =
        '<div class="modal-media-col">' +
        '<img src="' + data.src + '" alt="' + data.title + '" loading="lazy"/>' +
        '</div>';
    }

    var bulletsHtml = data.bullets
      .map(function (b) {
        return '<li><span class="bullet-dot"></span><span>' + b + '</span></li>';
      })
      .join('');

    var metricsHtml = data.metrics
      .map(function (m) {
        return (
          '<div><div class="modal-metric-val">' +
          m.val +
          '</div><div class="modal-metric-label">' +
          m.label +
          '</div></div>'
        );
      })
      .join('');

    var tagsHtml = data.tags
      .map(function (t) {
        return '<span class="tech-pill-dark">' + t + '</span>';
      })
      .join('');

    container.innerHTML =
      mediaHtml +
      '<div class="modal-info-col">' +
      '<div>' +
      '<div class="modal-meta-top">' +
      '<span class="live-pill"><span class="pulse-dot"></span> ' + data.badge + '</span>' +
      '<span class="flow-step-tag emerald">Production Verified</span>' +
      '</div>' +
      '<h2 class="modal-title">' + data.title + '</h2>' +
      '<p class="modal-desc">' + data.desc + '</p>' +
      '<ul class="modal-bullets-list">' + bulletsHtml + '</ul>' +
      '<div class="tech-pills-row" style="margin-bottom:20px;">' + tagsHtml + '</div>' +
      '</div>' +
      '<div>' +
      '<div class="modal-metrics-strip">' + metricsHtml + '</div>' +
      '<div class="modal-actions-row">' +
      '<a href="' + data.download + '" download class="btn-download-blueprint">' +
      '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> ' +
      data.downloadLabel +
      '</a>' +
      '</div>' +
      '</div>' +
      '</div>';

    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  window.closeWorkflowModal = function () {
    var overlay = document.getElementById('workflow-modal-overlay');
    if (!overlay) return;
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    var vid = overlay.querySelector('video');
    if (vid) vid.pause();
  };

  window.handleModalOverlayClick = function (e) {
    if (e.target.id === 'workflow-modal-overlay') {
      window.closeWorkflowModal();
    }
  };

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      window.closeWorkflowModal();
    }
  });

})();
