const fs = require("fs");
let content = fs.readFileSync("src/components/editor/ExportModal.vue", "utf8");

content = content.replace(`(function () {
    var dataNode = document.getElementById('lf-data');`, `(function () {
    var mode = "\\${mode}";
    var dataNode = document.getElementById('lf-data');`);
    
fs.writeFileSync("src/components/editor/ExportModal.vue", content);

