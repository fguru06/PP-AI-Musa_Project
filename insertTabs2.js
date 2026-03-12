const fs = require("fs");
let content = fs.readFileSync("src/components/editor/ExportModal.vue", "utf8");
let rgx = /Download HTML\s*<\/button>\s*<\/template>/;
let match = rgx.exec(content);
if (match) {
  let endPos = match.index + match[0].length;
  let newTabs = `

        <!-- Iframe Export -->
        <template v-else-if="activeTab === 'iframe'">
          <div class="export-info">
            <div class="export-icon">???</div>
            <div>
              <h4>Iframe Package</h4>
              <p>Export a lightweight package optimized for embedding in other sites via an iframe. Strips out outer backgrounds and fits precisely.</p>
            </div>
          </div>
          <div class="export-options" style="margin-bottom: 20px;">
            <div class="form-group">
              <label style="display:block;margin-bottom:4px;font-size:13px;font-weight:600;color:#333;">Package Name</label>
              <input type="text" v-model="exportFileName" class="inp" placeholder="My Presentation" style="width:100%;padding:8px;border-radius:6px;border:1px solid #ddd;" />
            </div>
            <label style="display:flex;align-items:center;gap:8px;margin-top:12px;font-size:13px;cursor:pointer;">
              <input type="checkbox" v-model="exportIncludeAssets" /> Download external assets locally
            </label>
          </div>
          <button class="btn btn-primary export-btn" @click="exportIframe">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download Iframe Zip
          </button>
        </template>

        <!-- PDF Export -->
        <template v-else-if="activeTab === 'pdf'">
          <div class="export-info">
            <div class="export-icon">??</div>
            <div>
              <h4>PDF Document</h4>
              <p>Generate a printable, static PDF version of all slides. Converts perfectly to a standard presentation handout.</p>
            </div>
          </div>
          <p style="margin-bottom: 20px; font-size: 13px; color: #666;">This will open the presentation in a new printable window. Just use your browser's Print dialog and select "Save as PDF".</p>
          <button class="btn btn-primary export-btn" @click="exportPDF">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Generate PDF
          </button>
        </template>`;
        
   content = content.substring(0, endPos) + newTabs + content.substring(endPos);
   fs.writeFileSync("src/components/editor/ExportModal.vue", content);
   console.log("Injected templates via regex.");
} else {
  console.log("Regex not matched.");
}

