// ============================================================
//  Конфигурация фронтенда
//
//  API_URL — адрес math-server.
//  Локально:  http://localhost:3001
//  В продакшене: https://wrok502o1g46-production-i6cmq141.europe-west1.suga.run
//
//  Можно переопределить через .env файл в корне сайта:
//    VITE_API_URL=https://...
// ============================================================

export const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3001';