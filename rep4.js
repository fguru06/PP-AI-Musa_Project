const fs = require("fs");
let content = fs.readFileSync("src/components/editor/ExportModal.vue", "utf8");

// 1. Adjust doExportWeb signature to handle PDF directly
let doExportWebStart = `    const html = \\`<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>\\${exportName}</title>
  <style>\\${css}</style>
  <script>\\${js}</script>
  </head>
  <body class="\\${mode === 'iframe' ? 'is-iframe' : mode === 'pdf' ? 'is-pdf' : ''}">
  <div class="lf-shell">
  <div class="progress" id="progress"></div>
  <div class="lf-grid"></div>
  <div class="lf-stage-shell">
    <div class="presentation" id="presentation"></div>
  </div>
  <div class="dot-nav" id="dot-nav"></div>
  <nav>
    <button class="nav-btn prev" id="prev-btn" aria-label="Previous">â—€</button>
    <div class="counter" id="counter">1 / 1</div>
    <button class="nav-btn next" id="next-btn" aria-label="Next">â–¶</button>
  </nav>
  </div>
  \\${dataScriptTag}
  </body>
  </html>\\`;

  if (mode === 'pdf') {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(html);
    printWindow.document.close();
    exportStatus.value = 'success';
    setTimeout(() => exportStatus.value = '', 3000);
    return;
  }
`;

// wait, the original html has <link rel="stylesheet">. Let me fetch the actual HTML structure

