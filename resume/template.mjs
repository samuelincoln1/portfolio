// Renders the resume data (pt.json / en.json) into a single A4 HTML page.
// Layout mirrors the original Canva resume: one column, Open Sans, bold italic
// dates aligned to the right.

const escape = (text) =>
  String(text).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

const ICONS = {
  email: '<path d="M2 5.5A1.5 1.5 0 0 1 3.5 4h17A1.5 1.5 0 0 1 22 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 18.5zm2 .9v.3l8 5.2 8-5.2v-.3z"/>',
  linkedin: '<path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM8.3 18.5V10H5.5v8.5zM6.9 8.6a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4zm11.6 9.9v-4.7c0-2.6-1.4-3.9-3.3-3.9-1.5 0-2.2.8-2.6 1.4V10h-2.8v8.5H13v-4.6c0-1.2.2-2.4 1.7-2.4s1.5 1.4 1.5 2.5v4.5z"/>',
  github: '<path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 3 .8.1-.6.4-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.6 5 .4.3.7 1 .7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2z"/>',
  location: '<path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/>',
};

const icon = (name) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[name]}</svg>`;

const contactHref = {
  email: (v) => `mailto:${v}`,
  linkedin: (v) => `https://${v}`,
  github: (v) => `https://${v}`,
};

function contacts(data) {
  return Object.entries(data.contacts)
    .map(([key, value]) => {
      const text = contactHref[key] ? `<a href="${escape(contactHref[key](value))}">${escape(value)}</a>` : escape(value);
      return `<li>${icon(key)}<span>${text}</span></li>`;
    })
    .join("");
}

function experience(items) {
  return items
    .map(
      (job) => `
      <div class="job">
        <div class="row"><span class="role">${escape(job.role)}</span><span class="period">${escape(job.period)}</span></div>
        <ul>${job.bullets.map((b) => `<li>${escape(b)}</li>`).join("")}</ul>
      </div>`
    )
    .join("");
}

export function renderResume(data) {
  return `<!doctype html>
<html lang="${escape(data.lang)}">
<head>
<meta charset="utf-8">
<title>${escape(data.name)} - Resume</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,600;0,700;1,700&display=swap" rel="stylesheet">
<style>
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { margin: 0; font-family: "Open Sans", Arial, sans-serif; color: #111; font-size: 8.6pt; line-height: 1.36; }
  a { color: inherit; text-decoration: none; }
  .page { width: 210mm; padding: 10mm 14mm 5mm; }
  header { display: flex; justify-content: space-between; align-items: flex-start; gap: 16pt; }
  .name { margin: 0; font-size: 22pt; font-weight: 700; line-height: 1.1; }
  .title { margin-top: 6pt; font-size: 9.5pt; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; }
  .portfolio { margin-top: 8pt; font-weight: 700; }
  .portfolio a { font-weight: 400; text-decoration: underline; }
  .contacts { list-style: none; margin: 0; padding: 0; font-size: 7.6pt; }
  .contacts li { display: flex; align-items: center; gap: 4pt; margin-bottom: 1.5pt; }
  .contacts svg { width: 9pt; height: 9pt; fill: #111; flex-shrink: 0; }
  h2 { margin: 15pt 0 5pt; font-size: 11pt; font-weight: 700; }
  .summary { margin: 0; text-align: justify; }
  .row { display: flex; justify-content: space-between; gap: 12pt; }
  .role { font-weight: 700; }
  .period { font-weight: 700; font-style: italic; white-space: nowrap; }
  ul { margin: 2pt 0 0; padding-left: 14pt; }
  li { margin: 1pt 0; }
  .job + .job { margin-top: 9pt; }
  .label { font-weight: 700; }
  .projects p { margin: 0 0 2.5pt; }
  .languages { display: flex; gap: 18pt; }
</style>
</head>
<body>
<div class="page">
  <header>
    <div>
      <h1 class="name">${escape(data.name)}</h1>
      <div class="title">${escape(data.title)}</div>
      <div class="portfolio">${escape(data.portfolio.label)} <a href="${escape(data.portfolio.url)}">${escape(data.portfolio.url)}</a></div>
    </div>
    <ul class="contacts">${contacts(data)}</ul>
  </header>

  <h2>${escape(data.summary.title)}</h2>
  <p class="summary">${escape(data.summary.text)}</p>

  <h2>${escape(data.experience.title)}</h2>
  ${experience(data.experience.items)}

  <h2>${escape(data.skills.title)}</h2>
  <ul>${data.skills.items.map((s) => `<li><span class="label">${escape(s.label)}:</span> ${escape(s.value)}</li>`).join("")}</ul>

  <h2>${escape(data.education.title)}</h2>
  <ul>${data.education.items
    .map((e) => `<li><div class="row"><span>${escape(e.text)}</span><span class="period">${escape(e.period)}</span></div></li>`)
    .join("")}</ul>

  <h2>${escape(data.projects.title)}</h2>
  <div class="projects">${data.projects.items
    .map((p) => `<p><span class="label">${escape(p.name)}</span> ${escape(p.text)}</p>`)
    .join("")}</div>

  <h2>${escape(data.languages.title)}</h2>
  <div class="languages">${data.languages.items.map((l) => `<span>${escape(l)}</span>`).join("")}</div>
</div>
</body>
</html>`;
}
