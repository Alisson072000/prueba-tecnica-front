# Task Manager — Frontend

## Stack declarado

| Componente   | Tecnología                              |
|--------------|-----------------------------------------|
| Frontend     | Angular 21 (standalone components)      |
| Estilos      | Tailwind CSS v4                         |
| State        | Angular Signals                         |
| HTTP         | HttpClient con RxJS                     |
| AI Tool(s)   | Claude Code                             |

## Requisitos previos

- Node.js >= 18
- npm >= 9
- Backend corriendo en `http://localhost:3001`

## Instalación

```bash
npm install
```

## Levantar el servidor de desarrollo

```bash
npm start
```

La aplicación estará disponible en `http://localhost:4200`

## Build de producción

```bash
npm run build
```

## Funcionalidades

- Lista de tareas con título, asignado, estado y fecha límite
- Filtro visual por status sin recargar la página (Todas / Por hacer / En progreso / Completadas)
- Modal para crear nueva tarea con validaciones
- Cambio de estado de tarea (TODO → IN_PROGRESS → DONE) con un clic
- Eliminación de tareas
- Indicadores visuales de tarea vencida o próxima a vencer
- Manejo visible de errores del API (banner auto-dismissible)
- Estado de carga con spinner
- Estado vacío con mensaje contextual
