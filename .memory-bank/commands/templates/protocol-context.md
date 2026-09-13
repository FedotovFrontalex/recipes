# Шаблон: context.md (текущее состояние протокола)

> Полностью перезаписывается после каждого шага. Это «точка сохранения» протокола.

```markdown
# Protocol status: NNNN — {краткое имя}

- **Current Step:** {Y}
- **Status:** {Not Started | In Progress | Blocked | Ready for review | Merged}
- **Last Action Summary:** "{что сделано последним}"
- **Next Action:** "{что делать следующим — обычно: приступить к шагу Y (см. YY-<имя>.md)}"
- **Blocked on:** {если Status=Blocked: чего ждём и от кого; иначе убрать строку}

## Git
- **Branch:** {NNNN-<имя>}
- **PR:** {URL / номер / нет}
- **Last commit:** {hash — message}

## Paths
- **PROJECT_ROOT:** {абсолютный путь}
- **CWD (worktree):** {абсолютный путь}
- **Protocol folder:** {абсолютный путь}

## Reference Materials (актуальные для текущего шага)
{файлы/сведения, которые нужно перечитать перед следующим шагом}
```
