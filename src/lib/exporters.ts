async function snapshot(target: HTMLElement, scale = 2): Promise<string> {
  const { toPng } = await import("html-to-image");
  return await toPng(target, {
    pixelRatio: scale,
    cacheBust: true,
    backgroundColor: "#f4ead3",
    style: { transform: "none" },
  });
}

export async function exportMapPdf(target: HTMLElement) {
  const dataUrl = await snapshot(target, 2);
  const img = new Image();
  img.src = dataUrl;
  await new Promise<void>((res, rej) => {
    img.onload = () => res();
    img.onerror = () => rej(new Error("snapshot image failed to load"));
  });
  const jsPDFModule = await import("jspdf");
  const jsPDF = jsPDFModule.default;
  const orientation = img.width >= img.height ? "landscape" : "portrait";
  const pdf = new jsPDF({
    orientation,
    unit: "pt",
    format: [img.width, img.height],
    compress: true,
  });
  pdf.addImage(dataUrl, "PNG", 0, 0, img.width, img.height, undefined, "FAST");
  pdf.save("ai-engineering-roadmap.pdf");
}

export async function downloadOgCard(opts: { checked: number; total: number }) {
  const width = 1200;
  const height = 630;
  const node = document.createElement("div");
  node.style.cssText = `
    width: ${width}px;
    height: ${height}px;
    background: #f4ead3;
    position: fixed;
    left: -9999px;
    top: -9999px;
    font-family: "Cinzel", serif;
    color: #1c1610;
    padding: 80px;
    box-sizing: border-box;
  `;
  node.innerHTML = `
    <div style="border: 2px solid #1c1610; height: 100%; padding: 56px; display:flex; flex-direction:column; justify-content:space-between;">
      <div>
        <div style="font-size: 18px; letter-spacing: 12px; color: #a73a26; text-transform: uppercase;">a cartographer's chart</div>
        <div style="font-size: 92px; line-height: 1; margin-top: 18px;">AI Engineering Roadmap</div>
        <div style="font-family: Georgia, serif; font-style: italic; font-size: 28px; color: #3a2f24; margin-top: 18px;">
          six phases. one summit. ${opts.checked} of ${opts.total} checkpoints stamped.
        </div>
      </div>
      <div style="display:flex; justify-content: space-between; align-items: flex-end;">
        <div style="font-size: 14px; letter-spacing: 6px; text-transform: uppercase; color: #6e5b46;">set sail</div>
        <div style="font-size: 14px; letter-spacing: 6px; text-transform: uppercase; color: #6e5b46;">${new Date().getFullYear()}</div>
      </div>
    </div>
  `;
  document.body.appendChild(node);
  const { toPng } = await import("html-to-image");
  const dataUrl = await toPng(node, {
    pixelRatio: 1,
    cacheBust: true,
    backgroundColor: "#f4ead3",
  });
  document.body.removeChild(node);
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = "ai-engineering-roadmap-share.png";
  a.click();
}
