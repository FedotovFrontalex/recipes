---
file: .memory-bank/mbb/file-standards.md
description: "MBB: стандарты файлов — frontmatter, duo-файлы, аннотированные ссылки"
version: 0.1.0
status: ACTIVE
---

# Стандарты файлов Memory Bank

## Frontmatter (обязателен у каждого файла)

```yaml
---
file: .memory-bank/docs/<путь/к/файлу>.md
description: 'Одно предложение: что это'
purpose: 'Когда и зачем читать'
version: '1.0.0'
date: '2026-09-11'
status: 'ACTIVE'            # ACTIVE | DRAFT | DEPRECATED
c4_level: 'L1'              # L1 | L2 | L3 | standard
parent: '.memory-bank/docs/index.md'   # ближайший индекс-родитель (null у корневых)
children: []                # дочерние документы, если есть
tags: [relevant, tags]
history:
  - version: '1.0.0'
    date: '2026-09-11'
    changes: 'Создан'
---
```

Правила: все поля однострочные; `file` совпадает с фактическим путём; при изменении документа подними `version` и добавь запись в `history`.

## Аннотированные ссылки

Ссылка без аннотации — мусор для агента. Каждый пункт навигации отвечает на вопрос «что это и зачем открывать»:

```markdown
## Архитектура

StateManager — централизованное управление состоянием workflows.

**Детализация:**
- [State Architecture](state-architecture.md): V7-архитектура, atomic-операции, distributed locking
- [State Implementation](state-implementation.md): StateCoreService и LockManagerService
- [State API](state-api.md): публичные методы и их использование
```

## Именование

- Файлы: `kebab-case.md` (`state-management.md`, `event-bus.md`).
- Индекс — всегда `index.md` в папке раздела.
- Детализация: `<концепция>-architecture.md`, `<концепция>-implementation.md`, `<концепция>-api.md`.
- Группировки вне C4 — в скобках: `(packages)/`, `(archive)/`.

## Duo-паттерн: структура папки компонента

```
state-management/
├── index.md                  # навигация (если файлов много)
├── state-management.md       # саммари 150–250 строк
├── state-management-architecture.md
└── state-management-api.md
```

## Связи с кодом

В документе указывай пути к реализациям: `Реализация: src/services/state/core.service.ts`.
При рефакторинге кода по протоколу — обновляй эти указатели (см. шаг «документация» в шаблоне протокола).
