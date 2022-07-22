const Process = require('../models/process.model')
const process = require('process');

const { fork } = require('child_process')

const homeGet = (req,res) => {
    res.render('process/home')
}

const infoGet = async (req,res) => {
    const info = {
        arguments:process.argv.slice(2),
        platform:process.platform,
        nodeVersion:process.version,
        memoryTotalReserved:process.memoryUsage().rss,
        execPath:process.execPath,
        pid:process.pid,
        proyectPath:process.cwd()
    }
    //se guarda en la BD en mongo la info de proceso del sistema
    const {argumentos, plataforma, versionNode, memoriaSistema, pathRun, pid, projectPath } = info
    const newProcess = new Process({ argumentos, plataforma, versionNode, memoriaSistema, pathRun, pid, projectPath })
    await newProcess.save()
    res.render('process/info', info)
}

const randomsGet = (req,res) => {
    //Cantidad de iteraciones
    const cantidadIteraciones = req.query.cant || 100000000;

    const randomFork = fork('helpers/random.js')
    
    randomFork.on('message', (result) => {
        //Aca se obtiene la respuesta del proceso secundario
        //return res.status(200).json(result);
        return res.render('process/randoms', result)
    })
    
    //Aca se envia el pedido al proceso secundario
    randomFork.send(cantidadIteraciones);

    //res.render('process/randoms')
}

module.exports = {
    homeGet,
    infoGet,
    randomsGet
}