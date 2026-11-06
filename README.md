# 🐝 Colmena Coworking

Sistema de reservas para Colmena, un coworking en Chía (Cundinamarca).
Backend en Spring Boot y frontend en Angular, con roles y permisos.

## Qué es

Mariana Gómez administraba las reservas de su coworking en un Excel compartido.
Dos miembros llegaron a la misma sala a la misma hora, un miembro vio la facturación
y nadie sabía cuánto se había facturado en el mes.

Con Colmena, cada miembro reserva desde el celular y el sistema nunca cruza dos reservas.
Mariana ve la agenda del día, lo facturado del mes y qué espacio se usa más.

## Tecnologías

| Capa | Tecnología |
|---|---|
| Backend | Java 17+, Spring Boot 4, Spring Security, Spring Data JPA |
| Autenticación | JWT con los permisos dentro del token |
| Base de datos | PostgreSQL (H2 en memoria para las pruebas) |
| Frontend | Angular 22 con signals y rutas `loadComponent` |
| Documentación | Swagger (springdoc-openapi) |

## Cómo levantarlo

1. En pgAdmin, crea una base de datos vacía llamada `colmena_db`.
2. Backend, desde `colmena-api/` (queda en http://localhost:8080):

```bash
./mvnw spring-boot:run        # Git Bash, macOS o Linux
mvnw.cmd spring-boot:run      # CMD o PowerShell
```

3. Frontend, desde `colmena-web/` (queda en http://localhost:4200):

```bash
npm install
ng serve
```

La documentación de la API queda en http://localhost:8080/swagger-ui.html