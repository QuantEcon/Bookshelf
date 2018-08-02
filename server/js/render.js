/**
 * Created by tlyon on 5/18/17.
 */

var sprintf = require('sprintf');
var exec = require('child_process').exec;
var tmp = require('tmp');
var fs = require('fs');
var config = require('../_config');

 function renderHTMLFromFile(file, id){
    var outputDir = config.rootDirectory + config.filesDirectory
    var outputName = id;
    var templateLocation = '../assets/nbconvert/templates/notebookHTML.tpl'

    var command = sprintf('jupyter nbconvert %s --output=%s --output-dir=%s --template=%s', file.path, outputName, outputDir, templateLocation);

    exec(command, {
        maxBuffer: 1024*500
    }, (err, stdout, stderr) => {
        if(err){
            return {error: err}
        }
    })
 }

 function renderHTMLFromJSON(json, id){
    var outputDir = config.rootDirectory + config.filesDirectory
    var outputName = id;
    var templateLocation = config.rootDirectory + '/assets/nbconvert/templates/notebookHTML.tpl'

    var tmpObj = tmp.fileSync({
        mode: 0644,
        prefix: 'prefix-',
        postfix: '.json'
    });

    console.log('\ttmpObj: ', tmpObj);
    console.log('\tOutput dir: ', outputDir);

    fs.writeFileSync(tmpObj.name, json);

    var command = sprintf('jupyter nbconvert %s --output=%s --output-dir=%s --template=%s', tmpObj.name, outputName, outputDir, templateLocation);

    console.log('\tExecute command');
    exec(command, {
        maxBuffer: 1024*500
    }, (err, stdout, stderr) => {
        if(err){
            console.log('\tError executing command: ', err);
            return {error: err}
        } else {
            console.log('\tNo error executing command');
        }
    })
 }

 module.exports = {renderHTMLFromFile, renderHTMLFromJSON}
