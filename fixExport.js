const fs = require("fs");
let content = fs.readFileSync("src/components/editor/ExportModal.vue", "utf8");

content = content.replace("<body>", "<body>".replace("<body>", "<body class=\"${mode === 'iframe' ? 'is-iframe' : mode === 'pdf' ? 'is-pdf' : ''}\">"));

content = content.replace("<link rel=\"stylesheet\" href=\"style.css\">", "${mode !== 'pdf' ? `<link rel=\"stylesheet\" href=\"style.css\">` : `<style>${css}</style>`}");

content = content.replace("${runtimeScriptTag}", "${mode !== 'pdf' ? runtimeScriptTag : `<script>${js}</script>`}");

let triggerStr = `    zip.file('index.html', html)
    zip.file('style.css', css)
    zip.file('script.js', js)`;

content = content.replace(triggerStr, `
  if (mode === 'pdf') {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(html);
    printWindow.document.close();
    exportStatus.value = 'success';
    setTimeout(() => exportStatus.value = '', 3000);
    return;
  }
  
  zip.file('index.html', html)
  zip.file('style.css', css)
  zip.file('script.js', js)
`);

fs.writeFileSync("src/components/editor/ExportModal.vue", content);

