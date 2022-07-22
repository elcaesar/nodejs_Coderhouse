const mongoose = require('mongoose');
const { Schema, model} = mongoose;

const ProcessSchema = Schema({
    argumentos: { type: String },
    plataforma: { type: String },
    versionNode: { type: String },
    memoriaSistema: { type: String },
    pathRun: { type: String },
    pid: { type: String },
    projectPath: { type: String },
})

module.exports = model('Process', ProcessSchema)
