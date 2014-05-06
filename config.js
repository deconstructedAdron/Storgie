/**
 * Created by adron on 3/14/14.
 * Description: Adding configuration for the project.
 * License: Apache 2.0 => License: Apache 2.0 https://github.com/Deconstructed/Storgie/blob/master/LICENSE
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
        default: 1337,
        env: "PORT"
    },
    data_api_key: {
        doc: "The API key for the data service.",
        default: "key_here"
    },
    consociation_api_token: {
        doc: "The API key for the consociation service.",
        default: "key_here"
    },
    consociation_api: {
        doc: "The URI Path to the consociation service.",
        default: "localhost:7003"
    }
});

// load environment dependent configuration
var env = conf.get('env');
conf.loadFile('./config/production_secrets.json');

// perform validation
conf.validate();

module.exports = conf;