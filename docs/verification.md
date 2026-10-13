# Verificación del portfolio — 12 de octubre de 2026

**Historia:** una persona explora los proyectos, encuentra herramientas y prepara un mensaje dirigido a Jose David mediante el correo `josebarriosetc@gmail.com`; también puede copiar la dirección o descargar su contacto.

Se aplicó la skill `vercel:verification` para seguir las acciones de la interfaz hasta su resultado. La aplicación es estática y se publica en GitHub Pages: los mensajes se preparan mediante `mailto:`, sin una API ni servidor de envío.

## Evidencia

| Flujo | Resultado | Evidencia |
| --- | --- | --- |
| Información personal → interfaz | Aprobado | Se conserva el contenido de los seis proyectos y los cuatro casos del portfolio original. |
| Correo → enlace y metadatos | Aprobado | La dirección visible, `mailto:` y JSON-LD contienen `josebarriosetc@gmail.com`. No quedan referencias al correo anterior en el código, documentación ni archivos compilados. |
| Copiar correo → portapapeles | Aprobado | Chromium devuelve la dirección nueva desde el portapapeles después de pulsar «Copiar correo electrónico». |
| Contacto → archivo vCard | Aprobado | Se descargó el archivo y se comprobó su nombre, ubicación y correo nuevo. |
| Formulario → borrador | Aprobado | Destinatario, asunto y cuerpo se comprueban decodificando la URL `mailto:`, incluidos acentos y caracteres `&` y `+`. |
| Editar formulario → borrador actualizado | Aprobado | El borrador anterior se invalida al editar un campo; el nuevo contiene únicamente la propuesta actualizada. Los campos compuestos solo por espacios se rechazan. |
| Búsqueda → proyecto o herramientas | Aprobado | Coincidencias por varias palabras, sin distinguir orden, mayúsculas o acentos; búsqueda por especialidad y herramientas; selección por teclado. |
| Tema del dispositivo → interfaz | Aprobado | El tema sigue los cambios del dispositivo hasta una elección manual. La elección manual se conserva al recargar. También se actualiza `theme-color`. |
| Escena → dibujo real de WebGL | Aprobado | Se cuentan llamadas reales de dibujo: animación, pausa sin reconstrucción del canvas, reanudación, suspensión fuera de pantalla, movimiento reducido y recuperación del contexto gráfico. |
| Descarga 3D fallida → interfaz navegable | Aprobado | Se aborta la petición del módulo 3D; permanece una ilustración estática y se pueden seguir abriendo fichas y usando el buscador. |
| Interfaz → accesibilidad | Aprobado | Axe comprueba WCAG A/AA en ambos temas, secciones y diálogos. Se comprueba navegación por teclado y retorno del foco. |
| Tamaño de pantalla → distribución | Aprobado | Sin desbordamiento ni superposición de cabecera a 320, 390, 768 y 1440 px. La dirección larga se adapta al ancho disponible. |

## Ejecución

- `npm run lint`: aprobado.
- `npm run test:e2e`: compilación aprobada y 24 pruebas previas aprobadas.
- `npx playwright test tests/improvements.spec.js`: 10 pruebas nuevas aprobadas.
- Total: **34 pruebas de navegador**, en escritorio y móvil, sobre los mismos archivos compilados.
- `git diff --check`: aprobado.

## Correcciones

Se actualizó el correo en todas sus salidas. Se separó el formulario en un componente dedicado para validar los campos y evitar borradores obsoletos. El buscador ahora incluye áreas de trabajo y herramientas. El tema respeta el dispositivo antes de una preferencia manual y se aplica antes de cargar React. Se aisló el fallo de la carga 3D para que el resto del portfolio siga disponible.

## Alcance

La verificación del correo comprueba el destinatario y el borrador; no envía mensajes ni acredita su entrega. Las pruebas de interfaz se ejecutan en Chromium sobre el paquete de producción. La publicación se comprueba mediante el despliegue de GitHub Pages y la igualdad de los archivos publicados con los probados; este entorno restringe el acceso directo al dominio público.
