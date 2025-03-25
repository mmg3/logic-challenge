# Proyecto de Gestión de Productos y Transacciones

Este proyecto permite la gestión de productos y transacciones a través de un sistema que incluye un backend en C# y un frontend en Next.js. Utiliza una base de datos MSSQL Server ejecutada en Docker.

## Requisitos

Antes de ejecutar el proyecto en tu entorno local, asegúrate de tener los siguientes requisitos:

- **Docker**: Para ejecutar la base de datos MSSQL Server en un contenedor.
- **.NET 6 o superior**: Para ejecutar el backend en C#.
- **Node.js**: Para ejecutar el frontend en Next.js.
- **npm o yarn**: Para gestionar las dependencias del frontend.

## Ejecución del Backend

Sigue estos pasos para ejecutar el backend:

1. **Clona el repositorio**:
    ```bash
    git clone https://github.com/tu_usuario/tu_repositorio.git
    cd tu_repositorio/backend
    ```

2. **Restaura las dependencias**:
    ```bash
    dotnet restore
    ```

3. **Configura el archivo `appsettings.json`**:  
   Asegúrate de que el archivo `appsettings.json` tenga los valores correctos para la conexión a la base de datos. Si estás usando Docker, la cadena de conexión podría ser algo como:
    ```json
    "ConnectionStrings": {
      "DefaultConnection": "Server=localhost,1433;Database=nombre_base_datos;User Id=sa;Password=#password1;"
    }
    ```

4. **Ejecuta el backend**:
    ```bash
    dotnet run
    ```

   El backend se ejecutará en `http://localhost:5000` o el puerto configurado en tu archivo `appsettings.json`.

## Ejecución del Frontend

Sigue estos pasos para ejecutar el frontend:

1. **Clona el repositorio**:
    ```bash
    git clone https://github.com/tu_usuario/tu_repositorio.git
    cd tu_repositorio/frontend
    ```

2. **Instala las dependencias**:
    ```bash
    npm install
    ```

3. **Configura las variables de entorno**:  
   Crea un archivo `.env.local` en la raíz del proyecto y agrega las variables de entorno necesarias. Asegúrate de que la URL del backend sea correcta:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:5000/api
    ```

4. **Ejecuta el frontend**:
    ```bash
    npm run dev
    ```

   El frontend se ejecutará en `http://localhost:3000`.

## Ejecución de la Base de Datos (Docker)

Para ejecutar MSSQL Server en Docker, sigue estos pasos:

1. **Clona el repositorio**:
    ```bash
    git clone https://github.com/tu_usuario/tu_repositorio.git
    cd tu_repositorio
    ```

2. **Levanta el contenedor de MSSQL Server**:
    Asegúrate de tener Docker instalado y ejecuta el siguiente comando:
    ```bash
    docker-compose up -d
    ```

   Esto descargará la imagen de MSSQL Server y levantará el contenedor en segundo plano. La base de datos estará disponible en el puerto `1433`.

3. **Accede a la base de datos**:  
   Si necesitas conectarte a la base de datos de manera manual, puedes usar herramientas como [Azure Data Studio](https://aka.ms/azuredatastudio) o [SQL Server Management Studio (SSMS)](https://aka.ms/ssms).

## Evidencias

### 1. **Listado Dinámico de Productos y Transacciones con Paginación**
   - Se muestra un listado de productos y transacciones con paginación.
   - Captura de pantalla:

     ![Listado de productos y transacciones](./capturas/listado.png)

### 2. **Pantalla para la Creación de Productos**
   - Permite al usuario crear nuevos productos en el sistema.
   - Captura de pantalla:

     ![Pantalla de creación de productos](./capturas/crear_producto.png)

### 3. **Pantalla para la Edición de Productos**
   - Permite editar los detalles de un producto ya existente.
   - Captura de pantalla:

     ![Pantalla de edición de productos](./capturas/editar_producto.png)

### 4. **Pantalla para la Creación de Transacciones**
   - Permite al usuario crear nuevas transacciones.
   - Captura de pantalla:

     ![Pantalla de creación de transacciones](./capturas/crear_transaccion.png)

### 5. **Pantalla para la Edición de Transacciones**
   - Permite editar las transacciones existentes.
   - Captura de pantalla:

     ![Pantalla de edición de transacciones](./capturas/editar_transaccion.png)

### 6. **Pantalla de Filtros Dinámicos**
   - Permite aplicar filtros dinámicos para productos y transacciones.
   - Captura de pantalla:

     ![Pantalla de filtros](./capturas/filtros.png)

---

## Contribuciones

Si deseas contribuir a este proyecto, por favor sigue estos pasos:

1. Realiza un fork de este repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Añadir nueva funcionalidad'`).
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un pull request.

---

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](./LICENSE) para más detalles.
