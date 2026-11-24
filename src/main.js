
import "./style.css";

const divisions = [
  {
    id: "requirements",
    number: "01",
    name: "Thermal Requirements",
    short: "Define the operating envelope",
    description:
      "Establish temperature targets, operating conditions, duty cycles, component constraints, and thermal requirements for each vehicle subsystem.",
    outputs: ["Requirements register", "Operating envelopes", "Component limits", "Engineering assumptions"],
    status: "ACTIVE",
  },
  {
    id: "cooling",
    number: "02",
    name: "Cooling Systems Engineering",
    short: "Engineer the cooling architecture",
    description:
      "Coordinate the engineering of cooling circuits, heat exchangers, pumps, radiators, coolant paths, and interfaces with the vehicle package.",
    outputs: ["Cooling system specification", "Circuit architecture", "Component interface register", "Design review"],
    status: "IN DEVELOPMENT",
  },
  {
    id: "simulation",
    number: "03",
    name: "Thermal Simulation",
    short: "Model heat and energy behavior",
    description:
      "Organize engineering models and simulation studies to evaluate heat transfer, thermal loads, airflow interaction, and operating scenarios.",
    outputs: ["Simulation plan", "Model assumptions", "Thermal maps", "Analysis report"],
    status: "PLANNED",
  },
  {
    id: "instrumentation",
    number: "04",
    name: "Instrumentation & Telemetry",
    short: "Define how thermal data is measured",
    description:
      "Specify sensor requirements, measurement locations, data acquisition channels, telemetry interfaces, and data-quality checks.",
    outputs: ["Sensor register", "Channel map", "Telemetry specification", "Data-quality plan"],
    status: "PLANNED",
  },
  {
    id: "testing",
    number: "05",
    name: "Thermal Testing",
    short: "Put the engineering through testing",
    description:
      "Build controlled test plans for components and subsystems, including environmental, endurance, and integrated thermal testing.",
    outputs: ["Test procedures", "Test matrix", "Results register", "Issue reports"],
    status: "PLANNED",
  },
  {
    id: "validation",
    number: "06",
    name: "Validation & Certification",
    short: "Control evidence and engineering release",
    description:
      "Track acceptance criteria, test evidence, open engineering issues, reviews, approvals, and release readiness.",
    outputs: ["Validation matrix", "Evidence ledger", "Approval records", "Release recommendation"],
    status: "PLANNED",
  },
];

const testQueue = [
  { id: "VT-001", name: "Powertrain thermal requirements review", division: "Requirements", state: "IN REVIEW" },
  { id: "VT-002", name: "Cooling circuit architecture definition", division: "Cooling Engineering", state: "OPEN" },
  { id: "VT-003", name: "Thermal simulation plan", division: "Simulation", state: "PLANNED" },
  { id: "VT-004", name: "Sensor and telemetry channel register", division: "Instrumentation", state: "PLANNED" },
];

const integrationNodes = [
  { code: "HEXCORE", role: "Thermal architecture", color: "orange" },
  { code: "VIAF", role: "Airflow and aero interfaces", color: "blue" },
  { code: "COBRA", role: "Driver and vehicle intelligence", color: "purple" },
  { code: "VCON", role: "System coordination frame", color: "green" },
  { code: "VEME", role: "Engineering and manufacturing", color: "cyan" },
];

let selectedDivision = "requirements";
let activeView = "overview";

const app = document.querySelector("#app");

if (!app) {
  throw new Error('VTSE could not find the #app element. Check index.html.');
}

function render() {
  const selected = divisions.find((item) => item.id === selectedDivision);

  app.innerHTML = `
    <div class="vtse-shell">
      <aside class="sidebar">
        <div class="brand">
          <div class="brand-mark"><span>V</span><i></i></div>
          <div>
            <div class="brand-name">VENOM SYSTEMS</div>
            <div class="brand-sub">ENGINEERING DIVISION</div>
          </div>
        </div>

        <div class="side-label">COMMAND NAVIGATION</div>
        <button class="nav-item ${activeView === "overview" ? "active" : ""}" data-view="overview">
          <span class="nav-icon">⌂</span> Engineering Overview
        </button>
        <button class="nav-item ${activeView === "divisions" ? "active" : ""}" data-view="divisions">
          <span class="nav-icon">▦</span> Six Divisions
        </button>
        <button class="nav-item ${activeView === "testing" ? "active" : ""}" data-view="testing">
          <span class="nav-icon">⌁</span> Test Queue
        </button>
        <button class="nav-item ${activeView === "validation" ? "active" : ""}" data-view="validation">
          <span class="nav-icon">◈</span> Validation Gates
        </button>
        <button class="nav-item ${activeView === "integration" ? "active" : ""}" data-view="integration">
          <span class="nav-icon">⌘</span> System Integration
        </button>

        <div class="sidebar-bottom">
          <div class="side-status"><span class="pulse"></span> PROTOTYPE ONLINE</div>
          <div class="sidebar-version">VTSE COMMAND CENTER<br />VERSION 0.1.0 / CONCEPT</div>
        </div>
      </aside>

      <main class="main-content">
        <header class="topbar">
          <div class="breadcrumb">SHELBY PREDATOR <span>/</span> VEHICLE ENGINEERING <span>/</span> <b>VTSE</b></div>
          <div class="topbar-right">
            <span class="system-clock">ENGINEERING ENVIRONMENT</span>
            <div class="user-chip"><span>RM</span> COMMAND</div>
          </div>
        </header>

        <section class="hero">
          <div class="hero-copy">
            <div class="eyebrow"><span></span> VENOM THERMAL SYSTEMS ENGINEERING</div>
            <h1>VTSE<span>.</span></h1>
            <h2>THERMAL SYSTEMS. ENGINEERED TO PERFORM.</h2>
            <p>
              The engineering authority responsible for translating thermal architecture
              into requirements, engineered systems, test evidence, and validation decisions.
            </p>
            <div class="hero-actions">
              <button class="primary-button" data-view="divisions">EXPLORE DIVISIONS <span>↗</span></button>
              <button class="text-button" data-view="validation">VIEW VALIDATION GATES</button>
            </div>
          </div>
          <div class="hero-visual">
            <div class="visual-ring ring-one"></div>
            <div class="visual-ring ring-two"></div>
            <div class="visual-ring ring-three"></div>
            <div class="thermal-core">
              <div class="core-cross"></div>
              <div class="core-label">VTSE</div>
              <div class="core-sub">THERMAL ENGINEERING</div>
            </div>
            <div class="visual-tag tag-top">THERMAL CONTROL / 01</div>
            <div class="visual-tag tag-bottom">ENGINEERING FRAME / 06</div>
            <div class="orbit-dot dot-one"></div>
            <div class="orbit-dot dot-two"></div>
            <div class="orbit-dot dot-three"></div>
          </div>
        </section>

        <div class="notice">
          <span class="notice-icon">i</span>
          <span><b>CONCEPT PROTOTYPE</b> — All displayed readings, statuses, and records are sample interface data. No vehicle sensors, telemetry, test equipment, or certification systems are connected.</span>
        </div>

        <section class="metric-grid">
          <div class="metric-card">
            <div class="metric-label">ENGINEERING DIVISIONS</div>
            <div class="metric-value">06</div>
            <div class="metric-foot"><span class="metric-dot blue"></span> Defined architecture</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">SAMPLE TEST RECORDS</div>
            <div class="metric-value">04</div>
            <div class="metric-foot"><span class="metric-dot orange"></span> Demonstration queue</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">VALIDATION GATES</div>
            <div class="metric-value">04</div>
            <div class="metric-foot"><span class="metric-dot purple"></span> Proposed workflow</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">LIVE DATA CONNECTIONS</div>
            <div class="metric-value">00</div>
            <div class="metric-foot"><span class="metric-dot muted"></span> Not connected</div>
          </div>
        </section>

        <section class="section-block">
          <div class="section-heading">
            <div>
              <div class="eyebrow">ENGINEERING ARCHITECTURE</div>
              <h3>THE SIX-DIVISION FRAMEWORK</h3>
            </div>
            <span class="section-index">VTSE / 001</span>
          </div>
          <div class="division-layout">
            <div class="division-list">
              ${divisions.map((division) => `
                <button class="division-item ${selectedDivision === division.id ? "selected" : ""}" data-division="${division.id}">
                  <span class="division-number">${division.number}</span>
                  <span class="division-name">${division.name}<small>${division.short}</small></span>
                  <span class="division-arrow">↗</span>
                </button>
              `).join("")}
            </div>
            <div class="division-detail">
              <div class="detail-topline">
                <span>DIVISION PROFILE / ${selected.number}</span>
                <span class="status-tag">${selected.status}</span>
              </div>
              <div class="detail-number">${selected.number}</div>
              <h4>${selected.name}</h4>
              <p>${selected.description}</p>
              <div class="outputs-title">ENGINEERING OUTPUTS</div>
              <div class="output-list">
                ${selected.outputs.map((output) => `<div><span>＋</span>${output}</div>`).join("")}
              </div>
              <div class="detail-footer">
                <span>VTSE ENGINEERING REGISTER</span>
                <span>CONCEPT / NOT RELEASED</span>
              </div>
            </div>
          </div>
        </section>

        <section class="section-block">
          <div class="section-heading">
            <div>
              <div class="eyebrow">THERMAL OBSERVATORY</div>
              <h3>SAMPLE ENGINEERING INDICATORS</h3>
            </div>
            <span class="section-index">SIMULATED DATA</span>
          </div>
          <div class="observatory">
            <div class="thermal-graphic">
              <div class="thermal-grid"></div>
              <div class="thermal-engine">
                <div class="engine-block"><span>427</span><small>POWERTRAIN</small></div>
                <div class="engine-line line-a"></div>
                <div class="engine-line line-b"></div>
                <div class="engine-line line-c"></div>
              </div>
              <div class="thermal-legend"><span></span> CONCEPTUAL THERMAL ZONES — NOT A SIMULATION</div>
            </div>
            <div class="reading-panel">
              <div class="reading-heading">ILLUSTRATIVE TEMPERATURES <span>DEMO</span></div>
              ${[
                ["Powertrain reference", "82", "°C", "orange", "68%"],
                ["Coolant reference", "74", "°C", "blue", "59%"],
                ["Electronics bay", "39", "°C", "cyan", "31%"],
                ["Brake interface", "116", "°C", "red", "84%"],
              ].map(([name, value, unit, color, width]) => `
                <div class="reading">
                  <div class="reading-info"><span>${name}</span><b>${value}<small>${unit}</small></b></div>
                  <div class="reading-track"><span class="${color}" style="width:${width}"></span></div>
                </div>
              `).join("")}
              <div class="reading-foot">Illustrative values only. Not operating limits, sensor readings, or validated vehicle data.</div>
            </div>
          </div>
        </section>

        <section class="section-block">
          <div class="section-heading">
            <div>
              <div class="eyebrow">ENGINEERING CONTROL</div>
              <h3>TEST & VALIDATION PIPELINE</h3>
            </div>
            <span class="section-index">PROPOSED WORKFLOW</span>
          </div>
          <div class="pipeline">
            ${[
              ["01", "REQUIREMENTS", "Define criteria"],
              ["02", "ENGINEERING", "Develop system"],
              ["03", "SIMULATION", "Analyze models"],
              ["04", "TESTING", "Collect evidence"],
              ["05", "VALIDATION", "Review results"],
            ].map(([number, title, description], index) => `
              <div class="pipeline-step">
                <div class="pipeline-node">${number}</div>
                <b>${title}</b>
                <small>${description}</small>
                ${index < 4 ? '<div class="pipeline-connector"></div>' : ""}
              </div>
            `).join("")}
          </div>
          <div class="gate-row">
            <div class="gate-card"><span>GATE 01</span><b>Requirements Review</b><small>Criteria defined and reviewed</small></div>
            <div class="gate-card"><span>GATE 02</span><b>Design Review</b><small>Engineering interfaces assessed</small></div>
            <div class="gate-card"><span>GATE 03</span><b>Test Evidence Review</b><small>Results and issues evaluated</small></div>
            <div class="gate-card"><span>GATE 04</span><b>Release Approval</b><small>Human approval required</small></div>
          </div>
        </section>

        <section class="section-block">
          <div class="section-heading">
            <div>
              <div class="eyebrow">SYSTEM COORDINATION</div>
              <h3>THE VENOM ENGINEERING NETWORK</h3>
            </div>
            <span class="section-index">INTERFACE MAP</span>
          </div>
          <div class="integration-grid">
            ${integrationNodes.map((node) => `
              <div class="integration-node">
                <span class="integration-indicator ${node.color}"></span>
                <div><b>${node.code}</b><small>${node.role}</small></div>
                <span class="interface-label">PLANNED INTERFACE</span>
              </div>
            `).join("")}
          </div>
          <div class="integration-note">
            VTSE owns thermal engineering evidence and validation workflow. HEXCORE owns the thermal architecture definition. These are planned interfaces, not active software integrations.
          </div>
        </section>

        <footer class="footer">
          <div class="footer-brand">VTSE <span>/</span> VENOM THERMAL SYSTEMS ENGINEERING</div>
          <div>THE SHELBY PREDATOR ENTERPRISE <span>·</span> THE COBRA WAY</div>
          <div class="footer-bottom">CONCEPT PROTOTYPE / 2026 / ENGINEERING DEVELOPMENT ENVIRONMENT</div>
        </footer>
      </main>
    </div>
  `;

  app.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
      activeView = button.dataset.view;
      render();
      if (activeView !== "overview") {
        const target = {
          divisions: ".division-layout",
          testing: ".observatory",
          validation: ".gate-row",
          integration: ".integration-grid",
        }[activeView];
        document.querySelector(target)?.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  });

  app.querySelectorAll("[data-division]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedDivision = button.dataset.division;
      activeView = "divisions";
      render();
      document.querySelector(".division-layout")?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });
}

render();

