## Запуск проекту
Для запуску проекту необхідно в корені розмістити .env з ключем: VITE_API_KEY=78684310-850d-427a-8432-4a6487f6dbc4

```npm run dev```

## Структура
- pages: Home - головна сторінка застосунку;
- components: Основні компоненти застосунку (TextArea - поле введення, HistoryPanel - історія запитів, PdfViewer - відображення файлів, Button - комопнент кнопки)
- services: містить сервіси для роботи з апі та БД для збергіання історії
  - idbService: містить методи для роботи з IndexedDB
  - pdfService: сервіс для роботи з запитами
- helpers: методи для форматування даних
- utils: константна інформація
- hooks:
  - usePdfHistory: Відповідає за синхронізацію та відтворення інформації з БД та стейтом додатку для історії запитів.
- types:
  - app: можна знайти тип PdfHistoryItem який описує інформацію про файли, що були конвертовані та збережені.
