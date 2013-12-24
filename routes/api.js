var Chance = require('chance'),
    chance = new Chance(),
    error400 = 'Error 400: Post syntax incorrect.';

exports.storgie_stat = function (req, res) {
    var stamp = new Date();

    var sys_stat = new Object();
    sys_stat.Compute = '0 at Peak of 70% utilization.';
    sys_stat.Memory = 'None beyond threshold of 80% Memory utilization.';
    sys_stat.Stamp = stamp.getTime();

    var stat_response = new Object();
    stat_response.Servers = 2;
    stat_response.Compute = (chance.d8() * chance.d4()) + '% Average Across Servers.';
    stat_response.Memory = (chance.d8() * chance.d4()) + '% Average Memory Consumption.';
    stat_response.Stat = sys_stat;
    stat_response.Stamp = stamp.getTime();

    res.send(JSON.stringify(stat_response));
};

exports.ident_by_id = function (req, res) {

    var getby = req.params.id;
    var result = extraction_fake(getby);

    console.log("Retrieved by " + getby + ".");
    return res.send(result);
};

exports.convergence = function (req, res) {
    console.log('convergence status');
    return res.send(req);
};

exports.ident_create = function (req, res) {
    if (!req.body.hasOwnProperty('key') || !req.body.hasOwnProperty('value')) {
        res.statusCode = 400;
        return res.send(error400);
    }

    console.log(req.body.value);
    res.send('Record created ' + req.body.value);
};

exports.scenario_create = function (req, res) {
    if (!req.body.hasOwnProperty('rowgen')) {
        res.statusCode = 400;
        return res.send(error400);
    }

    var answer = new Object();
    answer.response = 'Data generated.';

    res.send(JSON.stringify(answer));
};

function extraction_fake() {
    var result = new Array();

    var data_iOS = {
        "AdId": "B5A877B1-5D67-5101-9B71-FF573539BBCD",
        "VendorId": "F15DE2B3-17E0-5129-B37F-1B126E3FA8AA",
        "UUID": "F9D8ABB6-1B50-59F4-8312-EADA5EDA3DFF",
        "DevId": "AA632158-E04A-511C-90A9-77B11850FA4C",
        "IP": "101.10.1.123",
        "WebId": "4E33A7FA-8C78-5455-871F-C75C52AE5E4E",
        "Cookie": "6E84E2B2-7796-5D3B-BBA0-162358A79742",
        "AppId": "394287E9-9ACC-5C5B-82D4-0EF06B827DB8",
        "HashEmail": "AC5F7FB4-3C3F-54EE-815C-E44461046038",
        "HashIdent": "ident1"};

    var data_browser_anon = {
        "IP": "101.82.1.13",
        "WebId": "4E33A7FA-8CD8-5455-871F-C75C52AE9E4E",
        "Cookie": "6E84E2B2-7796-5D3B-BBA0-162358239742",
        "HashIdent": ""};

    var data_browser_ident2 = {
        "IP": "93.52.11.12",
        "WebId": "4E33A7FA-8CD8-5455-871F-C75C52AE9E4E",
        "Cookie": "6E84E2B2-7796-5D3B-BBA0-162358239742",
        "AdId": "B5A877B1-5D67-5101-9B71-FF573539BBCD",
        "VendorId": "F15DE2B3-17E0-5129-B37F-1B126E3FA8AA",
        "UUID": "F4D8ABB6-1B50-H203-8312-EADA5EDA3DFF",
        "DevId": "FF632158-E04A-511C-90A9-77B11850FA4C",
        "IP": "101.10.1.123",
        "WebId": "5C33A7FA-8C78-5455-871F-C75C52AE5E4E",
        "Cookie": "6E84E2B2-7796-5D3B-BBA0-162358A79742",
        "AppId": "624287E9-9ACC-5C5B-82D4-0EF06B827DB8",
        "HashEmail": "DE5F7FB4-3C3F-54EE-815C-E44461046038",
        "HashIdent": "ident2"};

    result = [
        { key: 'ident1', value: data_iOS},
        { key: 'anon1', value: data_browser_anon},
        { key: 'ident2', value: data_browser_ident2}
    ];

    return JSON.stringify(result);
}