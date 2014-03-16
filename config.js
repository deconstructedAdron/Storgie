/**
 * Created by adron on 3/14/14.
 * Description: Adding configuration for the project.
 */

var convict = require('convict');

// Schema
var conf = convict({
    env: {
        doc: "The App Environment.",
        format: ["production", "development", "test"],
        default: "development",
        env: "NODE_ENV"
    },
    port: {
        doc: "The port to bind.",
        format: "port",
        default: 3000,
        env: "PORT"
    },
    data_api: {
        doc: "The API key for the data service.",
        default: "key_here"
    },
    consociation_api: {
        doc: "The API key for the consociation service.",
        default: "key_here"
    }
});

// load environment dependent configuration
var env = conf.get('env');
conf.loadFile('./config/development.json');

// perform validation
conf.validate();

module.exports = conf;