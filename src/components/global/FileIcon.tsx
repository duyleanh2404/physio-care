import { Icon } from "@iconify/react";

export function FileIcon({ file }: { file?: File }) {
  const ext = file?.name.split(".").pop()?.toLowerCase();

  let iconName = "vscode-icons:file-type-generic";

  if (ext === "pdf") iconName = "vscode-icons:file-type-pdf2";
  else if (ext === "doc" || ext === "docx")
    iconName = "vscode-icons:file-type-word";
  else if (ext === "xls" || ext === "xlsx")
    iconName = "vscode-icons:file-type-excel";

  return <Icon icon={iconName} width={20} height={20} />;
}
