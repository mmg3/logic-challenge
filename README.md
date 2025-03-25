# Proyecto de Gestión de Productos y Transacciones

Este challenge, enviado por logicStudio, permite la gestión de productos y transacciones a través de un sistema que incluye un backend en C# y un frontend en Next.js. Utiliza una base de datos MSSQL Server ejecutada en Docker.

## Requisitos

Antes de ejecutar el proyecto en su entorno local, asegúrese de tener los siguientes requisitos:

- **Docker**: Para ejecutar la base de datos MSSQL Server en un contenedor.
- **.NET 8 o superior**: Para ejecutar el backend en C#. Como IDE se puede utilizar Visual Studio en su version más actual que soporte .NET 8.
- **Node.js**: Para ejecutar el frontend en Next.js.
- **npm o yarn**: Para gestionar las dependencias del frontend.

## Antes de comenzar:

Es necesario clonar este repositorio, aquí se encuentran todos los proyectos necesarios:
```bash
git clone https://github.com/mmg3/logic-challenge.git
```

## Ejecución de la Base de Datos (Docker)

Para ejecutar MSSQL Server en Docker, siga estos pasos:

1. **Levantar el contenedor de MSSQL Server**:
   Ingresar a la carpeta donde fue clonado el git.
   Asegúrese de tener Docker instalado y ejecute el siguiente comando:
    ```bash
    docker-compose up -d
    ```

   Esto descargará la imagen de MSSQL Server y levantará el contenedor en segundo plano. La base de datos estará disponible en el puerto `1433`.

3. **Acceda a la base de datos**:  
   Si necesitas conectarte a la base de datos de manera manual, puedes usar herramientas como [Azure Data Studio](https://aka.ms/azuredatastudio) o [SQL Server Management Studio (SSMS)](https://aka.ms/ssms).

   Las credenciales por defecto para conectarse a la base de datos son:
   ```bash
   usuario: "sa"
   password: "#password1"
    ```

   La password puede ser editada en el archivo docker-compose.yml.

4. **Ejecución de scripts**:

   Dentro de la carpeta raiz encontrará el archivo: "scriptBDD.sql".
   Abra una ventana de consultas y ejecutar el contenido del archivo "scriptBDD.sql".
   Al final, tendrá dos bases de datos, Inventory: donde se registrarán los movimientos; y, Products: donde se guardarán los productos y categorias. En esta última existen datos de pruebas.

   
## Ejecución del Backend

Siga estos pasos para ejecutar el backend:

1. **Abrir proyectos**:

    Abrir los proyectos contenidos en las carpetas GrpcProduct, GrpcInventory, ApiGateway; los tres son necesarios para la correcta ejecución del backend.

2. **Configura el archivo `appsettings.json`**:  
   Asegúrese de que el archivo `appsettings.json` tenga los valores correctos para la conexión a la base de datos. Si estás usando Docker y no ha modificado la contraseña de la bdd, la cadena de conexión podría ser algo como:
   GrpcProduct
    ```json
    "ConnectionStrings": {
      "DefaultConnection": "server=localhost;Database=Product;Persist Security Info=False;User ID=sa;Password=#password1;TrustServerCertificate=true;MultipleActiveResultSets=true"
    }
    ```
    
   GrpcInventory
    ```json
    "ConnectionStrings": {
      "DefaultConnection": "server=localhost;Database=Inventory;Persist Security Info=False;User ID=sa;Password=#password1;TrustServerCertificate=true;MultipleActiveResultSets=true"
    }
    ```

   Asegúrese que el proyecto GrpcProduct se está ejecutando en la direccion "https://localhost:7099/", caso contrario ajustar en el archivo `appsettings.json` del proyecto `GrpcInventory`, de tal manera que tenga la url correcta en:
   
    ```json
    "ProductServiceUrl": "https://localhost:7099/"
    ```

   El apigateway se comunica mediante gRPC a los otros dos proyecto, por tanto debe asegurarse que las url's sean las correctas en el archivo `appsettings.json` de este proyecto, de tal manera que debe ser similar a:

    ```json
    "ProductServiceUrl": "https://localhost:7099",
    "InventoryServiceUrl": "https://localhost:7056"
    ```
    
   El apigateway se ejecutará en `http://localhost:7231`.

## Ejecución del Frontend

Siga estos pasos para ejecutar el frontend, teniendo en cuenta que en la carpeta raiz existe otra llamada `inventory-control` la cual contiene el poryecto NextJs del frontend:

1. **Instala las dependencias**:
    ```bash
    npm install
    ó
    yarn add
    ```

2. **Configurar las url del backend**:  
   Crear un archivo .env.local en la raíz del proyecto y agregar las variables de entorno necesarias. Asegúrate de que la URL del backend sea correcta:
    ```env
    NEXT_PUBLIC_API_URL=https://localhost:7231/api/Gateway'
    ```

4. **Ejecuta el frontend**:
    ```bash
    npm run dev
    ó
    yarn run dev
    ```

   El frontend se ejecutará en `http://localhost:3000`.


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

Si deseas contribuir a este proyecto, por favor siga estos pasos:

1. Realiza un fork de este repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Añadir nueva funcionalidad'`).
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un pull request.

---

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](./LICENSE) para más detalles.
