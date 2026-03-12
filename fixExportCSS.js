const fs = require("fs");
let content = fs.readFileSync("src/components/editor/ExportModal.vue", "utf8");

const customCSS = `
.lf-shell {
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
body.is-iframe {
  background: transparent !important;
}
body.is-iframe .lf-shell {
  background: transparent !important;
}
body.is-iframe .lf-shell::before, 
body.is-iframe .lf-shell::after, 
body.is-iframe .lf-grid,
body.is-pdf .lf-grid,
body.is-pdf .lf-shell::before, 
body.is-pdf .lf-shell::after, 
body.is-pdf nav, 
body.is-pdf .progress, 
body.is-pdf .dot-nav {
  display: none !important;
}
body.is-iframe .lf-stage-shell, body.is-pdf .lf-stage-shell {
  padding: 0; box-shadow: none; border: none; background: none; margin: 0; border-radius: 0;
}
body.is-iframe .lf-stage-shell::before, body.is-pdf .lf-stage-shell::before { display: none; }

body.is-pdf { background: #fff !important; display: block; overflow: visible; min-height: auto; }
body.is-pdf .lf-shell { display: block; width: auto; height: auto; position: static; background: white; }
body.is-pdf .presentation { box-shadow: none !important; transform: none !important; width: var(--lf-slide-width) !important; height: auto; border-radius: 0; }
body.is-pdf .slide { position: relative; display: block !important; page-break-after: always; overflow: hidden; width: var(--lf-slide-width); height: var(--lf-slide-height); margin: 0 auto 20px auto; box-shadow: 0 0 1px rgba(0,0,0,0.2); }

@media print {
  @page { size: \\${canvasSize.width}px \\${canvasSize.height}px; margin: 0; }
  body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body.is-pdf .slide { margin: 0; box-shadow: none; }
}
`;

content = content.replace(`.lf-shell {
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}`, customCSS);

fs.writeFileSync("src/components/editor/ExportModal.vue", content);

