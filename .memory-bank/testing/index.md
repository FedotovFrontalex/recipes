---
file: .memory-bank/testing/index.md
description: "Стратегия тестирования: уровни, tooling, хелперы"
version: '0.1.0'
date: '2026-09-11'
status: 'DRAFT'
c4_level: 'L2'
parent: '.memory-bank/index.md'
---

# 🧪 Testing

- Уровни тестов: {unit / integration / e2e — какие инструменты}
- Где лежат тесты и как называются: {...}
- Запуск: {команды; полный набор входит в гейт test — см. .flow/gates.md}
- Хелперы и фабрики: {переиспользуемые утилиты, чтобы не плодить копии}
- Правило протоколов: каждый шаг, добавляющий поведение, добавляет тесты (Red → Green → Refactor).
