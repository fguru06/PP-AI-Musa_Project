const fs = require("fs");
let content = fs.readFileSync("src/components/editor/ExportModal.vue", "utf8");

content = content.replace("function buildRuntimeCSS(theme, settings) {", "function buildRuntimeCSS(theme, settings, mode = 'html') {");
content = content.replace("function buildRuntimeJS() {", "function buildRuntimeJS(mode = 'html') {");
content = content.replace("const css = buildRuntimeCSS(p.theme, p.settings)", "const css = buildRuntimeCSS(p.theme, p.settings, mode)");
content = content.replace("const js = buildRuntimeJS()", "const js = buildRuntimeJS(mode)");

fs.writeFileSync("src/components/editor/ExportModal.vue", content);
