# Script en JS para crear colecciones y datos a una BD Mongo

### Para poder ejecutar el script tener una cuenta en MongoAtlas o local, luego conectarse con permisos necesarios para poder crear colecciones y read and write de documentos, ejemplo:

``` mongosh "mongodb+srv://<usuario>:<password>@tucluster.rqsvs.mongodb.net/ecommerce"  ```

### si queres una conexion local usar:

``` mongosh "mongodb://localhost:27017/ecommerce" ```

### dentro de la consola de mongosh ejecutar, es importante que este en la carpeta donde esta el .js:

``` load("miscripts.js") ``` o desde la consola usar ``` mongosh --file miscripts.js ```