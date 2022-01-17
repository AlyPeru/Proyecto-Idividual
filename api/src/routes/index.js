const { Router } = require('express');
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const axios = require('axios');

const { Type, Pokemon } = require('../db');
const { get } = require('superagent');

const router = Router();

//hacer una Funcion controladora pero debo llegar a otra url que contiene todos los campos que quiero renderizar 
// ********ESTE ES EL PRIMER INTENTO PERO TARDA MUCHO]
// const apiUrl = await axios.get('https://pokeapi.co/api/v2/pokemon');
// const apiType = await axios.get('https://pokeapi.co/api/v2/type');
// console.log(apiType)
// //creo un arreglo que solo me traiga las url para ahora hacerles un axios interno luego de pasar por otro for y renderizar todo en una nueva variable
// const onlyUrl = []
// for (let i = 0; i < apiUrl.results.length; i++) {
//     onlyUrl.push(apiUrl.results[i].url)
// }
// for (let x = 0; x < onlyUrl.length; x++) {
//     //promisAll  o axios.All reduccion de tiempo // probar el postmant
//     const info = await axios.get(onlyUrl[x]);
// }

// const apiInfo = await info.data.map(el => {
//     return {
//         id: el.id,
//         name: el.name,
//         hp: el.stats[0].base_stat,
//         attack: el.stats[1].base_stat,
//         defense:el.stats[2].base_stat,
//         speed:el.stats[5].base_stat,
//         sprites: el.sprites.front_default,
//         height: el.height,
//         weight: el.weight,
//     }
// })
// return apiInfo

let getApiUrl = async () => {
    //quiero general un arrglo de promesas pendientes  con todas las url `https://pokeapi.co/api/v2/pokemon/${i}`

    let infoTotalApi = [];
    let arrProm = [];
    for (let i = 1; i <= 40; i++) {
        arrProm = [...arrProm, axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)];
    }
    //ahora axios all para poder reducir el tiempo de la solicitud
    await axios.all(arrProm).then(
        axios.spread((...responses) => {
            responses.forEach((elem) => {
                var el = elem.data
                var poken = {
                    id: el.id,
                    name: el.name,
                    hp: el.stats[0].base_stat,
                    attack: el.stats[1].base_stat,
                    defense: el.stats[2].base_stat,
                    speed: el.stats[5].base_stat,
                    sprites: el.sprites.other.dream_world.front_default,
                    height: el.height,
                    weight: el.weight,
                    types: el.types.map(elm => elm.type.name)//el '' arreglar con  css space beetween

                };

                infoTotalApi = [...infoTotalApi , poken]
            })
        })
    )
    // console.log(infoTotalApi);
    return infoTotalApi;
};
// [
//     {
//         "id": "68877892-0268-454d-ad12-442e7e06371f",
//         "name": "David",
//         "hp": 60,
//         "attack": 45,
//         "defense": 50,
//         "speed": 70,
//         "sprites": " https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png",
//         "height": 11,
//         "weight": 320,
//         "createdInDb": true,
//         "createdAt": "2022-01-15T17:30:22.861Z",
//         "updatedAt": "2022-01-15T17:30:22.861Z",
//         "types": [
//             {
//                 "name": "flying"
//             },
//             {
//                 "name": "bug"
//             }
//         ]
//     }
// ]
// type: [' sdsd', 'sddsd'] cambiar el nombre de la api

let getDbInfo = async () => {
    // del modelo ocupacion traeme el nombre y el through: es una comprobacion obligatoria  que se hace para que traiga mediante los atributos.
    let todo = await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ['name'],
            through:{
                attributes: []
            }
        }
    });

    // let todos = todo.map(elm=>({...elm, types: elm.types.map(el=>el.name)}))
    // console.log(todos)
    return todo
};


let getAllPokemons = async () => {
    let apiInfo = await getApiUrl()
    let dbInfo = await getDbInfo()
    let infoTotal = apiInfo.concat(dbInfo)
    // console.log(infoTotal)
    return infoTotal
}
//CREACION DE RUTAS

router.get("/pokemons", async (req, res) => {
    const name = req.query.name;
    let allPokens = await getAllPokemons()///.catch(err => console.log('ERROR', err));
//buscar por endpoint name 1 nombre
//buscar por squeeliza findOne Pokemon.findOne({ where: { name }) 
    if (name) {
        const namePoken = await allPokens.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
        
        namePoken.length ?
            res.status(200).send(namePoken) :
            res.status(404).send('Pokemos no encontrado')
    } else {
        res.status(200).send(allPokens)
    }
})

router.get("/pokemons/:id", async (req, res) => {
    let id = req.params.id;

    const allInfo = await getAllPokemons()

    if (id) {
        const pokenId = await allInfo.filter(el => el.id == id)
        pokenId.length ?
            res.status(200).json(pokenId) :
            res.status(404).send("No se encontró el Pokemon")
    }
})

router.post("/pokemons", async (req, res) => {
    let { name, hp, attack, defense, speed, sprites, height, weight, createdInDb, types } = req.body

    let createPoken = await Pokemon.create({
        name, hp, attack, defense, speed, sprites, height, weight, createdInDb
    })
    let dbTypes = await Type.findAll({ where: { name: types } })
    createPoken.addType(dbTypes)
    ///OJO AGREGE SSSSS ADDTYPES
    //tengo que encontrar del modelo Types todas los que coincidan con lo que recibo en body

    res.send("Pokemon Creado con exito!!!!!")
   
});

router.get("/types", async (req, res) => {
    const types = await axios.get("https://pokeapi.co/api/v2/type");
    const eachType = types.data.results.map(el => el.name)

    eachType.forEach(el => {
        Type.findOrCreate({
            where: { name: el }
        })
    })
    try {
        const allTypes = await Type.findAll()
        res.send(allTypes)
    } catch (err) {
        return res.status(500).send('Error: ', err)
    }
})

module.exports = router;
