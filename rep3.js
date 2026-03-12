const fs = require("fs");
let content = fs.readFileSync("src/components/editor/ExportModal.vue", "utf8");

content = content.replace("async function exportHTML() {", `async function exportHTML() { return doExportWeb('html') }
async function exportIframe() { return doExportWeb('iframe') }
async function exportPDF() { return doExportWeb('pdf') }

async function doExportWeb(mode = 'html') {`);

fs.writeFileSync("src/components/editor/ExportModal.vue", content);
