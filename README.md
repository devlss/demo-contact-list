# Демонстрационное приложение: список контактов

## Запуск
Выполнить команду:
```bash
npm start
```

Сервер будет доступен по ссылке: **[localhost](http://localhost:3000)**

## Другие скрипты
```bash
# Запуск сервера CRA(порт 3000) и бэка (порт 3001)
npm run start:dev

# Сборка прода и запуск сервера (npm start запускает это)
npm run start:prod

# Сборка и запуск json-server(порт 3001)
npm run start:server

# Проверка кода линтером
npm run lint:verify

# Попытка выполнить fix кода линтером
npm run lint:fix
```

## Варианты доработки
- [x] Адаптивность списка
- [ ] !Аутентификация на отдельном эндпоинте
- [ ] Сортировка на полях
- [ ] Плейсхолдеры списка
- [ ] Анимация при навигации
- [ ] Бесконечный скрол

Реализовано с помощью [create-react-app](README_CRA.md)