import type { AnalysisResult, KanbanItem } from "../types";

export const handleDownload = (
  format: "md" | "pdf",
  projectPath: string,
  result: AnalysisResult | null,
) => {
  if (!result) return;

  if (format === "md") {
    let md = `# Project Analysis Report\n\n`;
    md += `**Project:** ${projectPath}\n\n`;
    md += `**Readiness Score:** ${result.readinessScore}%\n`;
    md += `> ${result.readinessSummary}\n\n`;

    const printSection = (title: string, items: KanbanItem[]) => {
      md += `## ${title}\n\n`;
      items.forEach((item) => {
        md += `### ${item.title}\n`;
        md += `- **Description:** ${item.description}\n`;
        md += `- **Path:** \`${item.path}\`\n`;
        md += `- **Priority/Status:** ${item.priorityOrStatus}\n`;
        md += `- **Category:** ${item.category}\n\n`;
      });
    };

    printSection("Features to Implement", result.features);
    printSection("Risks / Issues", result.risks);
    printSection("Solutions", result.solutions);
    printSection("Already Implemented", result.implemented);

    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "project_analysis.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } else if (format === "pdf") {
    import("jspdf").then(({ jsPDF }) => {
      const doc = new jsPDF();
      let y = 20;
      const pageHeight = doc.internal.pageSize.height;
      const margin = 20;
      const printWidth = doc.internal.pageSize.width - margin * 2;

      const checkNewPage = (neededHeight: number) => {
        if (y + neededHeight > pageHeight - margin) {
          doc.addPage();
          y = margin;
        }
      };

      // Header Title
      doc.setFillColor(37, 99, 235); // Blue-600
      doc.rect(0, 0, doc.internal.pageSize.width, 40, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.text("Project Analysis Report", margin, 25);

      y = 55;

      doc.setTextColor(50, 50, 50);
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      const pathLine = doc.splitTextToSize(
        `Project Path: ${projectPath}`,
        printWidth,
      );
      doc.text(pathLine, margin, y);
      y += pathLine.length * 6 + 6;

      doc.setFont("helvetica", "bold");
      doc.text(`Readiness Score: ${result.readinessScore}%`, margin, y);
      y += 6;

      doc.setFont("helvetica", "italic");
      doc.setTextColor(100, 100, 100);
      const summaryLine = doc.splitTextToSize(
        result.readinessSummary,
        printWidth,
      );
      doc.text(summaryLine, margin, y);
      y += summaryLine.length * 6 + 10;

      const addText = (
        text: string,
        size: number,
        isBold: boolean = false,
        color: number[] = [0, 0, 0],
        xOffset: number = 0,
      ) => {
        doc.setFontSize(size);
        doc.setTextColor(color[0], color[1], color[2]);
        doc.setFont("helvetica", isBold ? "bold" : "normal");
        const splitText = doc.splitTextToSize(text, printWidth - xOffset);
        const textHeight = splitText.length * (size * 0.4);
        checkNewPage(textHeight + 5);
        doc.text(splitText, margin + xOffset, y);
        y += textHeight + 4;
      };

      const printSection = (
        title: string,
        items: KanbanItem[],
        color: number[],
      ) => {
        checkNewPage(20);
        y += 5;
        doc.setFillColor(color[0], color[1], color[2]);
        doc.rect(margin, y - 6, printWidth, 10, "F");

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text(title.toUpperCase(), margin + 5, y + 1);
        y += 12;

        if (items.length === 0) {
          addText("No items found.", 11, false, [100, 100, 100], 5);
          y += 5;
        }

        items.forEach((item) => {
          checkNewPage(30);

          // Draw a subtle line separator
          doc.setDrawColor(220, 220, 220);
          doc.setLineWidth(0.5);
          doc.line(margin, y, margin + printWidth, y);
          y += 6;

          // Title and Priority inline
          doc.setFontSize(12);
          doc.setFont("helvetica", "bold");
          doc.setTextColor(30, 41, 59); // slate-800

          const titleLines = doc.splitTextToSize(item.title, printWidth - 40);
          doc.text(titleLines, margin + 5, y);

          // badge-like for priority
          doc.setFontSize(9);
          doc.setFont("helvetica", "bold");
          doc.setTextColor(100, 116, 139);
          doc.text(
            `[${item.priorityOrStatus.toUpperCase()}]`,
            margin + printWidth - 35,
            y,
          );

          y += titleLines.length * 5 + 2;

          // path
          addText(`Path: ${item.path}`, 10, false, [100, 116, 139], 5);
          // desc
          addText(item.description, 11, false, [71, 85, 105], 5);

          y += 4;
        });
        y += 10;
      };

      printSection("Features to Implement", result.features, [79, 70, 229]); // Indigo 600
      printSection("Risks / Issues", result.risks, [239, 68, 68]); // Red 500
      printSection("Solutions", result.solutions, [59, 130, 246]); // Blue 500
      printSection("Already Implemented", result.implemented, [16, 185, 129]); // Emerald 500

      // Footer
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.setTextColor(150, 150, 150);
        doc.text(
          `Page ${i} of ${pageCount}`,
          doc.internal.pageSize.width / 2,
          doc.internal.pageSize.height - 10,
          { align: "center" },
        );
      }

      doc.save("project_analysis.pdf");
    });
  }
};
