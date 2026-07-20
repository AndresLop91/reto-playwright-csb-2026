# Automatización de Pruebas

Solución técnica para la evaluación web utilizando **Playwright + TypeScript** implementando el patrón de diseño **Page Object Model (POM)**.

---

## Prerrequisitos
* **Node.js** (v18 o superior recomendado)
* **npm** (v9 o superior)

## Instalación de dependencias
Ejecuta el siguiente comando en la raíz del proyecto para descargar todas las dependencias necesarias:
### 1. Clonar el repositorio

```bash
git https://github.com/AndresLop91/reto-playwright-csb-2026.git
```

### 2. Ingresar al proyecto

```bash
cd playwright-api-challenge
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Instalar los navegadores de Playwright

```bash
npx playwright install
```

---

## Escenarios de Prueba Implementados

La suite automatiza **11 casos de prueba** divididos por bloques funcionales:

### 📂 Home y Navegación (`tests/home.spec.ts`)
* **`Abrir la página principal`**: Verifica que la página cargue correctamente validando el título principal.
* **`Ir a la página de productos desde el menú`**: Comprueba la correcta navegación hacia la sección `/products`.

### 📂 Autenticación (`tests/auth.spec.ts`)
* **`Registrar un usuario nuevo con email único`**: Realiza el registro completo de un nuevo usuario utilizando un correo dinámico único (`qa.candidato.[timestamp]@test.com`).
* **`Login con credenciales incorrectas (Caso Negativo)`**: Valida que el sistema muestre un mensaje de error correcto al ingresar credenciales erróneas.
* **`Cerrar sesión`**: Registra un usuario temporal, completa el flujo, y verifica que se pueda cerrar sesión retornando a la vista de login.

### 📂 Productos y Carrito (`tests/products.spec.ts`)
* **`Buscar un producto`**: Realiza la búsqueda de un producto en el catálogo y valida los resultados.
* **`Abrir detalle de un producto`**: Ingresa al detalle de un producto y valida que se visualicen correctamente el nombre, precio y botón de compra.
* **`Agregar un producto al carrito`**: Añade un producto desde su página de detalles y valida que figure en el carrito.
* **`Agregar dos productos distintos`**: Añade dos productos diferentes de forma consecutiva interactuando directamente desde la cuadrícula general de catálogo y valida la cantidad acumulada.
* **`Eliminar un producto del carrito`**: Agrega un producto, entra al carrito, lo elimina y valida que el carrito quede vacío.

### 📂 Compra de Extremo a Extremo (E2E) (`tests/e2e-checkout.spec.ts`)
* **`E2E: Compra completa`**: Automatiza el flujo de negocio completo:
  1. Registro de usuario único y confirmación.
  2. Adición de 2 productos desde el catálogo.
  3. Navegación al carrito de compras e inicio de checkout.
  4. Ingreso de dirección y pasarela de pago simulada.
  5. Confirmación final de la orden de compra (`Order Placed!`).

---

## Estrategia de Identificadores (Page Object Model)

Para asegurar la robustez, mantenibilidad y rapidez de las pruebas, se utiliza la siguiente estrategia de priorización de localizadores en las clases `Page`:

1. **Roles Accesibles (`page.getByRole`)**: Se prioriza la búsqueda por roles HTML estándar y nombre visible (`button`, `link`, `heading`), lo que garantiza la correcta accesibilidad y comportamiento real.
2. **Uso de Expresiones Regulares (`RegExp`)**: En lugar de coincidir con cadenas exactas, los enlaces y menús principales se localizan utilizando expresiones regulares (ej. `/Signup \/ Login/i`). Esto evita fallos causados por caracteres unicode adicionales (como iconos de FontAwesome `` o ``) y espacios en blanco.
3. **Atributos de Test Dedicados (`data-qa`)**: Para campos de entrada y botones específicos donde no hay etiquetas claras, se utiliza el atributo estructurado de control de calidad del sitio (`[data-qa="value"]`).
4. **Barrera de Sincronización de Sesiones**: Después de los registros se valida la visibilidad de elementos clave del header (`logoutMenu`) para sincronizar el navegador con la escritura de cookies del servidor y prevenir condiciones de carrera antes de navegar a otros bloques.
5. **Bloqueo Inteligente de Publicidad**: En `BasePage.ts`, durante el método `navigateTo`, se interceptan y cancelan las peticiones hacia dominios de anuncios y analytics (`googleads`, `doubleclick`, `googlesyndication`, `google-analytics`). Esto optimiza la carga de la página (reduciendo el tiempo total de pruebas a ~11 segundos) y evita que banners/iframes de anuncios intercepten los clics de Playwright.

---

## Ejecución en Paralelo (Workers)

La ejecución en paralelo está configurada en el archivo `playwright.config.ts`:

```typescript
export default defineConfig({
  fullyParallel: true, // Ejecución completamente paralela (archivos y casos individuales)
  workers: process.env.CI ? 1 : undefined, // Usa el 50% de los hilos de CPU locales o 1 worker en CI
  // ...
});
```

* **`fullyParallel: true`**: Permite a Playwright ejecutar pruebas del mismo archivo en paralelo, maximizando el rendimiento del procesador.
* **`workers`**: En un entorno local, el valor `undefined` le indica a Playwright que use la mitad de los núcleos lógicos del sistema. En entornos de Integración Continua (CI), se restringe a `1` worker para evitar saturación de recursos.

---

## Comandos de Ejecución

Todos los comandos se corren desde la terminal en el directorio raíz del proyecto:

### ⚙️ Ejecución de Pruebas
| Comando | Descripción |
| :--- | :--- |
| `npx playwright test` | Ejecuta toda la suite de pruebas en segundo plano (modo *headless*). |
| `npx playwright test --headed` | Ejecuta las pruebas abriendo el navegador de forma visible. |
| `npx playwright test --ui` | Abre la interfaz interactiva gráfica (*UI Mode*) para depurar paso a paso. |
| `npx playwright test tests/auth.spec.ts` | Ejecuta únicamente las pruebas del archivo especificado. |


### 📊 Reportes de Pruebas
| Comando | Descripción |
| :--- | :--- |
| `npx playwright show-report` | Abre automáticamente en el navegador el reporte detallado en formato HTML con gráficos, capturas y videos guardados en caso de fallo. |
