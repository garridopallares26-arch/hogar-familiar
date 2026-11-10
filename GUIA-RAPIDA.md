# Instala tu propio Hogar

La app permite organizar dinero, gastos, seguros, ITV, citas y gestiones familiares. Empieza **vacía** y puedes compartirla con tu pareja. La instalación se hace mejor desde un ordenador; después la usaréis desde el móvil.

## 1. Prepara tus cuentas

Crea una cuenta personal en [Cloudflare](https://dash.cloudflare.com/sign-up) y otra en [GitHub](https://github.com/signup), si no las tienes. Usa tus propias cuentas y verifica el correo si te lo solicitan. No compartas sus contraseñas ni des acceso a quien te envía esta guía.

## 2. Abre el instalador

**[INSTALAR MI PROPIO HOGAR](https://deploy.workers.cloudflare.com/?url=https%3A%2F%2Fgithub.com%2FMueblesToledo%2Fhogar-familiar)**

Entra en Cloudflare con tu cuenta personal. Cuando lo pida, conecta tu cuenta de GitHub: Cloudflare copiará la plantilla y preparará tu app y una base de datos privada. No necesitas copiar código ni utilizar IA.

## 3. Completa la configuración

- Conserva los nombres propuestos, o elige otros si ya los estás usando.
- En **INSTALL_KEY**, escribe una frase privada de **al menos 24 caracteres** y guárdala. La usarás una sola vez para activar tu hogar. Elige tu propia frase: no copies la de otra persona ni uses tu contraseña de Cloudflare.
- Mantén las opciones de instalación propuestas. Pulsa **Deploy / Desplegar** y espera a que indique que ha terminado.
- Si te pide una dirección **workers.dev**, elige un nombre personal que esté disponible. No necesitas comprar un dominio.

## 4. Activa tu hogar

Abre el enlace que Cloudflare te entregue, terminado en **workers.dev**. Verás **«Activa tu hogar»**. Introduce la clave de instalación anterior y crea tu nombre, usuario y contraseña para Hogar. Esta contraseña debe tener al menos 12 caracteres.

Son cosas distintas: la cuenta de Cloudflare administra la instalación; el usuario de Hogar sirve para entrar en la app. Guarda ambos accesos.

La app comienza sin cuentas bancarias, gastos, seguros, vehículos ni actividades. Los datos que introduzcas estarán en **tu Cloudflare**, no en el de quien te ha pasado la app.

## 5. Invita a tu pareja

Dentro de Hogar, abre **Mi cuenta → Invitar a mi pareja**. También puedes invitar a otro familiar. Copia el enlace y pásaselo de forma privada. La invitación dura **48 horas** y permite una segunda persona.

Tu pareja debe abrir esa invitación y crear su usuario. **No debe pulsar el registro normal del enlace general:** ese registro crea una cuenta local independiente, que no comparte vuestro hogar.

## 6. Pon el icono en el móvil

Abre **vuestro nuevo enlace** en cada móvil e inicia sesión con vuestro usuario:

- **Android, en Chrome:** menú **⋮ → Añadir a pantalla de inicio / Instalar**.
- **iPhone, en Safari:** **Compartir → Añadir a pantalla de inicio**.

Después abre Hogar desde su icono.

## 7. Empieza y conserva una copia

Introduce primero un registro sencillo y comprueba que aparece también en el móvil de tu pareja. Después podéis añadir el resto de la información.

El propietario puede descargar copias desde **Mi cuenta**; además hay copias diarias en Cloudflare, conservadas ocho días. Conviene guardar una exportación fuera de la app.

## Antes de utilizarla

- Es una versión piloto: los avisos con la app cerrada y la recuperación automática de contraseña por correo todavía no están disponibles.
- Límite actual: **1 MB por archivo y 1,8 MB por hogar compartido**. Evita cargar muchos documentos pesados.
- El coste y los límites dependen de tu cuenta y de tu uso de Cloudflare. No aceptes contratar servicios que no quieras.
- No repitas la instalación para actualizar: podrías crear otro hogar vacío. Conserva tu enlace y tu base de datos; las actualizaciones se preparan por separado.
- No envíes a nadie tus contraseñas, la clave de instalación ni los permisos de administrador de Cloudflare.
