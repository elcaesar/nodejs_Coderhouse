class Usuario{
    constructor(nombre,apellido, libros, mascotas){
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }
    getFullName(){
        //retorna en String el nombre completo del usuario
        let nombre =`El nombre de usuario es ${this.nombre} y apellido ${this.apellido}.`
        return nombre
    }

    addMascota(mascota){
        //recibe un nombre de mascota y lo agrega al array
        this.mascotas.push(mascota)
    }

    countMascotas(){
        //retorna cant de mascotas que tiene el usuario
        return this.mascotas.length
    }

    addBook(nombre, autorLibro){
        //recibe nombre y autor de libro y lo agrega al array de libro
        this.libros.push({nombreLibro : nombre , autorLibro : autorLibro})

    }

    getBookNames(){
        //retorna array con solo los nombres de los libros
        let nombresLibros = []
        nombresLibros = this.libros.map(function (elem) {
            let soloNombre = {nombreLibro : elem.nombreLibro}
            return soloNombre
        })
        return nombresLibros
    }
}

let user1 = new Usuario("Cesar", "Romero", [{nombreLibro : "La comunidad del anillo", autorLibro : "JRR Tolkien"},{nombreLibro : "Yo Robot", autorLibro : "Isaac Asimov"},{nombreLibro : "Clean Code", autorLibro: "Robert Martin"}],["Firulais","Michi"])
let user2 = new Usuario("Fulano", "Gomez", [{nombreLibro : "Redes de computadoras", autorLibro : "William Stallings"},{nombreLibro : "Sistemas Operativos",  autorLibro : "Andrew Tanembaum"},{nombreLibro : "Clean Code", autorLibro : "Robert Martin"}],["perrito","michifus"])
let user3 = new Usuario("Sultano", "Gonzalez", [{nombreLibro : "UML y Patrones", autorLibro : "Craig Larman"},{nombreLibro : "UML", autorLibro : "Ivar Jacobson"},{nombreLibro : "UML Distilled", autorLibro : "Martin Fowler"}],["tweety","Silvestre","pececito"])

console.log(user1)
console.log(user1.getFullName())

user1.addMascota("troncos")
console.log(user1.mascotas)
console.log(`El usuario ${user1.nombre}, ${user1.apellido} tiene ${user1.countMascotas()} mascotas.`)
console.log(`El usuario ${user2.nombre}, ${user2.apellido} tiene ${user2.countMascotas()} mascotas.`)

//se agrega un objeto libro al array de objetos JSON del objeto user1
user1.addBook("Un paseo por el cosmos" , "varios autores")
console.log(user1.libros)
//se muestra en consola el array de objetos JSON 
console.log(user1.getBookNames())



