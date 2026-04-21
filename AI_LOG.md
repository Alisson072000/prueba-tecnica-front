# AI_LOG.md — Registro de uso de Claude Code

Herramienta utilizada: **Claude Code**

---

## Entrada #1 — Herramienta: Claude Code

**Prompt enviado:**
"Configura el HttpClient en Angular 21 standalone y crea el modelo Task con su servicio para consumir la API del backend."

**Respuesta IA:**
Creó `task.model.ts` con la interfaz `Task`, el tipo `TaskStatus` y los payloads de creación y actualización. Creó `TaskService` con los métodos `getAll`, `create`, `updateStatus` y `delete`. Registró `provideHttpClient(withFetch())` en `app.config.ts` para compatibilidad con Angular SSR.

**Problema encontrado:**
Ninguno. La configuración base funcionó correctamente desde el primer intento.

**Corrección aplicada:**
No fue necesaria corrección.

---

## Entrada #2 — Herramienta: Claude Code

**Prompt enviado:**
"Crea el componente principal de lista de tareas con filtros por status. Debe usar Angular Signals para el estado y mostrar el conteo por cada filtro."

**Respuesta IA:**
Implementó `TaskListComponent` usando `signal()` para el estado de tareas, filtro activo, modal y errores. Usó `computed()` para las tareas filtradas sin recargar desde el servidor. Incluyó `loading` spinner, estado vacío contextual y banner de error auto-dismissible a los 6 segundos.

**Problema encontrado:**
Ninguno en la lógica de filtros. Los signals de Angular 21 funcionaron correctamente con `computed()`.

**Corrección aplicada:**
No fue necesaria corrección.

---

## Entrada #3 — Herramienta: Claude Code

**Prompt enviado:**
"Diseña un TaskCard bonito con Tailwind que muestre el título, asignado, badge de estado con colores y fecha límite. Que tenga botón para avanzar el estado y eliminar."

**Respuesta IA:**
Creó `TaskCardComponent` con input signals (`input.required<Task>()`), outputs para `statusChanged` y `deleted`. Implementó lógica de flujo de estados (TODO → IN_PROGRESS → DONE), badges con colores por estado (slate/amber/emerald), indicadores de tarea vencida (rojo) y próxima a vencer (amarillo). Diseño con hover effects y transiciones suaves.

**Problema encontrado:**
Ninguno en el diseño. Tailwind v4 con clases dinámicas funcionó correctamente usando `[class.X]` binding en lugar de interpolación dinámica de strings (requerido para que el tree-shaking de Tailwind detecte las clases).

**Corrección aplicada:**
No fue necesaria corrección.

---

## Entrada #4 — Herramienta: Claude Code

**Prompt enviado:**
"Crea el modal para crear tareas con un reactive form. Debe validar title (requerido, máximo 120 chars), assignee (requerido) y dueDate (opcional). Que muestre errores inline."

**Respuesta IA:**
Implementó `TaskFormModalComponent` con `ReactiveFormsModule`, `FormBuilder` y `Validators`. Modal con overlay backdrop, animación, campos con estilos de error condicionales (`[class.border-red-300]`), mensajes de error inline y estado de carga en el botón de submit. Propagó errores del API al componente padre mediante output `errorOccurred`.

**Problema encontrado:**
Ninguno. La integración de reactive forms con Angular 21 standalone funcionó sin inconvenientes.

**Corrección aplicada:**
No fue necesaria corrección.

---

## Entrada #5 — Herramienta: Claude Code

**Prompt enviado:**
"El build de Angular SSR muestra un error de conexión al hacer el prerender. ¿Es un problema real?"

**Respuesta IA:**
Explicó que Angular SSR intenta hacer prerender de las rutas durante el build, lo que ejecuta el componente en el servidor e intenta llamar al backend en `http://localhost:3001`. Como el backend no estaba corriendo durante el build, lanza el error de conexión pero el build **sí completa exitosamente** con todos los bundles generados correctamente.

**Problema encontrado:**
El error `ECONNREFUSED` en el log del build generaba confusión. No era un error real del código sino un comportamiento esperado del prerendering SSR sin backend activo.

**Corrección aplicada:**
No requirió cambio de código. Se documentó en el README que el backend debe estar corriendo antes de iniciar el frontend en desarrollo.
