# Hogar · instalación independiente

App para una familia de hasta dos personas. Cada instalación usa la cuenta de Cloudflare y la base de datos de sus propietarios. No contacta con la instalación del autor.

[![Instalar Hogar en mi Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https%3A%2F%2Fgithub.com%2FMueblesToledo%2Fhogar-familiar)

**[Instalar mi propio Hogar](https://deploy.workers.cloudflare.com/?url=https%3A%2F%2Fgithub.com%2FMueblesToledo%2Fhogar-familiar)** · [Guía rápida](GUIA-RAPIDA.md)

## Instalación sin código

1. Crea una cuenta personal en https://dash.cloudflare.com/sign-up y otra en https://github.com/signup si no las tienes.
2. Abre [Instalar mi propio Hogar](https://deploy.workers.cloudflare.com/?url=https%3A%2F%2Fgithub.com%2FMueblesToledo%2Fhogar-familiar).
3. Entra en Cloudflare y conecta TU cuenta de GitHub. Cloudflare copiará la plantilla y creará tu app y tu base de datos. No des acceso a terceros.
4. Conserva el nombre propuesto o elige otro. En INSTALL_KEY, escribe una frase privada de al menos 24 caracteres y guárdala. No uses la contraseña de Cloudflare.
5. Pulsa Deploy / Desplegar y espera a que termine. Si te pide una dirección workers.dev, elige un nombre propio disponible.
6. Abre el enlace que te dé Cloudflare. En Activa tu hogar, introduce la clave anterior y crea tu usuario propietario y tu contraseña.
7. La aplicación empieza vacía. Desde Mi cuenta, genera una invitación para tu pareja; dura 48 horas y admite una segunda persona.
8. Añade la app a la pantalla de inicio desde el navegador del móvil.

Tu pareja debe usar la invitación, no el registro normal, que crea una cuenta local independiente.

## Privacidad

No contiene usuarios, registros, documentos, identificadores de cuentas ni claves del autor. No incorpora analítica ni envía datos familiares a otra instalación. Tú controlas la cuenta de Cloudflare y el repositorio de código. No concedas al autor permisos sobre tus cuentas.

## Copias y límites del piloto

Copias automáticas diarias, conservadas ocho días. El propietario puede crear y descargar copias desde Mi cuenta. Límite por archivo: 1 MB. Límite del hogar compartido: 1,8 MB en este piloto. No hay notificaciones externas ni recuperación automática por correo; puedes cambiar tu contraseña conociendo la actual. El alojamiento puede tener límites gratuitos o costes según tu plan y uso; no se activa un plan de pago automáticamente mediante esta plantilla.

## Actualizaciones

La instalación es independiente. No recibe cambios del autor sin una actualización del código de tu copia. Antes de actualizar, exporta una copia; conserva la base de datos DB existente. No repitas el botón de instalación esperando actualizar tu hogar: puede crear otra instalación y otra base. Las migraciones están separadas y no borran datos al repetirse.

## Verificación

El paquete ha superado las pruebas de estado inicial vacío, activación protegida, aislamiento de instalaciones y conservación de datos al repetir migraciones. También se ha validado la compilación con Cloudflare Wrangler en modo de comprobación, sin publicar. El recorrido completo del botón en una cuenta nueva no se presenta como verificado hasta realizar esa instalación. Cloudflare puede pedirte que confirmes permisos, correo o una dirección propia durante el proceso.
