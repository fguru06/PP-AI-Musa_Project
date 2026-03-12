const fs = require("fs");
let content = fs.readFileSync("src/components/editor/ExportModal.vue", "utf8");

content = content.replace(`if (!url || url.startsWith('data:') || url.startsWith('http://localhost') || url.startsWith('blob:')) {
        // For local blobs or data URIs`, `if (mode === 'pdf') return url;
      if (!url || url.startsWith('data:') || url.startsWith('http://localhost') || url.startsWith('blob:')) {
        // For local blobs or data URIs`);
        
fs.writeFileSync("src/components/editor/ExportModal.vue", content);

