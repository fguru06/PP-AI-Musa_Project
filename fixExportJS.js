const fs = require("fs");
let content = fs.readFileSync("src/components/editor/ExportModal.vue", "utf8");

const oldJSStr = `    slides.forEach(function (slide, index) {
      slideLookup[slide.id] = index;
      var node = renderSlide(slide, index);
      mount.appendChild(node);
      slideNodes.push(node);
    });

    if (!slideNodes.length) {
      mount.innerHTML = '<div class="lf-empty">This export has no slides.</div>';
      if (counter) counter.textContent = '0 / 0';
      if (prevBtn) prevBtn.disabled = true;
      if (nextBtn) nextBtn.disabled = true;
      return;
    }`;

const newJSStr = `    var inPdfMode = typeof mode !== "undefined" && mode === "pdf";

    slides.forEach(function (slide, index) {
      slideLookup[slide.id] = index;
      var node = renderSlide(slide, index);
      if (inPdfMode) node.classList.add("active");
      mount.appendChild(node);
      slideNodes.push(node);
    });

    if (!slideNodes.length) {
      mount.innerHTML = '<div class="lf-empty">This export has no slides.</div>';
      if (counter) counter.textContent = '0 / 0';
      if (prevBtn) prevBtn.disabled = true;
      if (nextBtn) nextBtn.disabled = true;
      return;
    }
    
    if (inPdfMode) {
      setTimeout(function() { window.print(); }, 800);
      return;
    }`;

content = content.replace(oldJSStr, newJSStr);
fs.writeFileSync("src/components/editor/ExportModal.vue", content);

