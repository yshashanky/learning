const constants = {}

constants.DATA_DIR = "../data";
constants.RAW_DIR = constants.DATA_DIR+"/raw";
constants.DATASET_DIR = constants.DATA_DIR+"/dataset";
constants.JSON_DIR = constants.DATASET_DIR+"/json";
constants.IMG_DIR = constants.DATASET_DIR+"/img";
constants.SMPLES = constants.DATASET_DIR+"/samples.json";

const fs = require('fs');

const filenames = fs.readdirSync(constants.RAW_DIR);
const samples = [];
let id = 1;
filenames.forEach(fn =>{
    const content = fs.readFileSync(
        constants.RAW_DIR+"/"+fn
    );
    
})