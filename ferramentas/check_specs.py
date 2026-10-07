#!/usr/bin/env python3
"""Valida a estrutura mínima do fluxo SDD sem dependências externas."""

from pathlib import Path
import re
import sys


ROOT = Path(__file__).resolve().parents[1]
SPECS = ROOT / "specs"
CHANGE_PATTERN = re.compile(r"^\d{4}-[a-z0-9]+(?:-[a-z0-9]+)*$")
VERSION_PATTERN = re.compile(r"^v\d+\.\d+\.\d+$")

REQUIRED_TEMPLATES = (
    "spec-template.md",
    "plan-template.md",
    "tasks-template.md",
    "release-template.md",
)

REQUIRED_CHANGE_FILES = ("spec.md", "tasks.md")
REQUIRED_SPEC_HEADINGS = (
    "## Contexto",
    "## Objetivo",
    "## Fora do escopo",
    "## Requisitos",
    "## Critérios de aceite",
)
REQUIRED_TASK_HEADINGS = (
    "## Legenda",
    "## Tarefas",
    "## Verificação final",
)


def require(condition: bool, message: str, errors: list[str]) -> None:
    if not condition:
        errors.append(message)


def validate_headings(path: Path, headings: tuple[str, ...], errors: list[str]) -> None:
    if not path.is_file():
        return
    content = path.read_text(encoding="utf-8")
    for heading in headings:
        require(heading in content, f"{path.relative_to(ROOT)}: seção ausente: {heading}", errors)


def main() -> int:
    errors: list[str] = []

    require((SPECS / "README.md").is_file(), "specs/README.md não encontrado", errors)

    templates = SPECS / "templates"
    for name in REQUIRED_TEMPLATES:
        require((templates / name).is_file(), f"Template ausente: specs/templates/{name}", errors)

    changes = SPECS / "changes"
    require(changes.is_dir(), "Diretório specs/changes não encontrado", errors)
    if changes.is_dir():
        for change in sorted(path for path in changes.iterdir() if path.is_dir()):
            require(
                CHANGE_PATTERN.fullmatch(change.name) is not None,
                f"Nome inválido em specs/changes: {change.name}",
                errors,
            )
            for name in REQUIRED_CHANGE_FILES:
                require((change / name).is_file(), f"{change.name}: {name} não encontrado", errors)
            validate_headings(change / "spec.md", REQUIRED_SPEC_HEADINGS, errors)
            validate_headings(change / "tasks.md", REQUIRED_TASK_HEADINGS, errors)

    versions = SPECS / "versions"
    require((versions / "README.md").is_file(), "specs/versions/README.md não encontrado", errors)
    if versions.is_dir():
        for version in sorted(path for path in versions.iterdir() if path.is_dir()):
            require(
                VERSION_PATTERN.fullmatch(version.name) is not None,
                f"Versão inválida: specs/versions/{version.name}",
                errors,
            )
            require((version / "README.md").is_file(), f"{version.name}: README.md não encontrado", errors)

    if errors:
        print("Estrutura SDD inválida:")
        for error in errors:
            print(f"- {error}")
        return 1

    change_count = sum(1 for path in changes.iterdir() if path.is_dir())
    version_count = sum(1 for path in versions.iterdir() if path.is_dir())
    print(f"Estrutura SDD válida: {change_count} mudança(s), {version_count} versão(ões).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
