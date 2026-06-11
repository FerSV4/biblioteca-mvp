# reporte ec2-proyectos

# -----------------------------------------
# Proyecto Biblioteca
## 1. Contexto del Proyecto
El sistema desarrollado es una plataforma de gestión para la biblioteca, diseñada para centralizar el control de préstamos y devoluciones. Esto soluciona los problemas actuales como la falta de control de inventario (donde entradas y salidas no están sincronizadas) y la morosidad de usuarios externos que retienen los ejemplares.

El MVP contempla los alcances mínimos funcionales:
* Catálogo de libros con buscador básico.
* Registro de usuarios externos con validación de identidad.
* Módulo de préstamos con fechas de salida y devolución.
* Registro de devoluciones que actualiza el stock al instante.

## 2. Implementación de Pruebas Unitarias
Para las pruebas unitarias se usaron **Jasmine** y **Karma** debido a que el proyecto fue realizado en Angular. 

### Coverage base
Se inició generando un reporte base (baseline) con 0% de cobertura (segun la reporteria de Jasmine se considera unknown en el valor de coverage pero es valido porque no hubo stages para probar)

Como se usó supabase para las pruebas, se tuvieron que crear funciones mockeadas de retorno de datos, es decir las respuestas fueron simuladas.

### Casos de Prueba Implementados (UsuariosService)
Se cubre las rutas de success y de error del servicio, se dio cobertura a los siguientes escenarios:
1. **Instanciación:** Verificación de que el servicio y sus dependencias son inyectados...
2. **Lectura de datos ("recibidos"):** Se simula que se obtiene la lista de usuarios...
3. **Inserción de datos (register):** Se verifica el flujo de guardado "exitoso de los users...
4. **Validación de datos duplicados** Se probo el sistema cuando Supabase retorna un error de duplicidad (intento de registro de un documento de identidad ya existente).
5. **Errores adicionales:** se simulo caida de supabase en operaciones `select` ... para fines de prueba que el sistema sigue funcionando.

## 3. Detección y Refactorización de Code Smells
Se integró **ESLint** junto con `@angular-eslint` para analizar el codigo esto permite que se detecte code smells o algun error de sintaxis que va en contra de las buenas practicas de angular.

### Principales correcciones aplicadas:

* **Inyección deprecada:**
  * *primer error:* Los componentes (`libros.component.ts`, `prestamos.component.ts`) inyectaban servicios a través del constructor, lo cual es deprecado y redundante...
  * *refactor:* Se migró al uso de la función `inject()` de `@angular/core`, usando las buenas practicas en versiones mas nuevas de angular

* **Mezcla de responsabilidad:   (Mixed Resp.)**
  * *segundo error:* La funcion de registro de libros hacia muchas cosas, desde validaciones de campos, conversiones de datos, etc...
  * *refactor:* Se extrajeron algunas validaciones de los datos y metodos adicionales, y fueron separados en fragmentos para que tenga cada responsabilidad...

* **Numeros... (Magic Numbers).**
  * *error:* Validaciones con números quemados sin contexto, como `cantNum < 1 || cantNum > 2`.
  * *refactor:* se reemplazan estos valores por algo mas descriptivo como Min_ejemplares , Max_ ejemplares  ... para cumplir con esta deteccion.

* **Muchos parametros    (Long Parameter List)**
  * *error:* Métodos en los servicios que recibían una lista extensa de argumentos sueltos (título, autor, año, categoría, etc.).
  * *refactor:* se define un (dto) para la recepcion de datos

* **Problema de tipado**
  * *error:* Alertas de ESLint sobre interfaces importadas que no se usaban imports y se usa any, lo cual esta mal
  * *Refactorización:* Limpieza de importaciones y declaracion de los errores (`const err = e as Error`) para respetar el tipado y asi no usar any.