interface ProjectEvidenceInput {
  evidenceLabel?: string;
  sourceUrl?: string;
  facts?: string[];
  details?: {
    year?: string;
  };
}

const evidenceLabels = ["Caso documentado", "Referencia publicada", "Escenario de solución"];

export function getProjectEvidenceLabel(project: ProjectEvidenceInput) {
  if (project.evidenceLabel && evidenceLabels.includes(project.evidenceLabel)) {
    return project.evidenceLabel;
  }

  const sourceUrl = project.sourceUrl ?? "";
  const evidenceText = [
    sourceUrl,
    project.details?.year ?? "",
    ...(project.facts ?? []),
  ].join(" ").toLowerCase();

  if (sourceUrl.includes("fenmicasa.com") || evidenceText.includes("basada en")) {
    return "Escenario de solución";
  }

  if (
    evidenceText.includes("pdf") ||
    evidenceText.includes("video") ||
    evidenceText.includes("fotos") ||
    evidenceText.includes("material interno")
  ) {
    return "Caso documentado";
  }

  return "Referencia publicada";
}
