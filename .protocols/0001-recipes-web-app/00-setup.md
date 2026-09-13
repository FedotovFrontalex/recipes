# Шаг 00: Подготовка и фиксация плана

## Briefing
- **Цель:** рабочее пространство протокола готово: worktree, артефакты, коммит плана.
- **Ключевые файлы:**
  - `.protocols/0001-recipes-web-app/*` (создать — этот шаг)
  - `.gitignore` в корне main (создан до worktree: `.worktrees/`, `node_modules/`)
- **Additional info:** worktree размещён внутри репозитория (`.worktrees/`), потому что
  терминал агента ограничен корнем проекта и `../worktrees/` недоступен. PR пропущен:
  `gh` CLI отсутствует. SSH-ключ для GitHub генерируется на этом шаге (без passphrase —
  машина разработки); пользователь добавляет публичный ключ в аккаунт и сообщает, когда
  готово, после чего выполняется первый пуш.

## Sub-tasks
1. **Артефакты:** создать файлы протокола по шаблонам `.memory-bank/commands/templates/`.
2. **SSH-ключ:** `ssh-keygen -t ed25519 -N "" -C "FedotovFrontalex" -f ~/.ssh/id_ed25519`;
   вывести пользователю содержимое `~/.ssh/id_ed25519.pub` с инструкцией добавить его на
   <https://github.com/settings/keys>.
3. **Коммит:** только `.protocols/0001-recipes-web-app` —
   `feat(protocol): add plan for 0001-recipes-web-app [protocol-0001/00]`.
4. **Пуш:** отложить до подключения SSH (пользователь добавил ключ); затем
   `git push --set-upstream origin 0001-recipes-web-app`.

## Acceptance criteria (шаг считается готовым, когда)
- Все файлы протокола на месте и согласованы (plan ↔ шаги ↔ context).
- Коммит с тегом `[protocol-0001/00]` создан в ветке `0001-recipes-web-app`.
- `git status` в PROJECT_ROOT чист (файлы не утекли на main).
- Пользователю показан план на согласование; выполнение шага 1 не начато до «ок».
