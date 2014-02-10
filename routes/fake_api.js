var fake_api = exports;

var Chance = require('chance'),
    chance = new Chance();

fake_api.storgie_stat = function () {

    // This is here until the AWS (or whatever ecosystem) environment SDK
    // is applied and used to derive these and other statistics from the
    // actual ecosystem.
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
    return stat_response;
}

fake_api.data_core_fake = function (getby) {
    var theGoods = generating_idents();
    var result = theGoods[getby];
    return result;
}

function generating_idents() {
    var data_iOS = {
        "AdId": "B5A877B1-5D67-5101-9B71-FF573539BBCD",
        "VendorId": "F15DE2B3-17E0-5129-B37F-1B126E3FA8AA",
        "UUID": "F9D8ABB6-1B50-59F4-8312-EADA5EDA3DFF",
        "DevId": "AA632158-E04A-511C-90A9-77B11850FA4C",
        "IP": "101.10.1.123",
        "WebId": "4E33A7FA-8C78-5455-871F-C75C52AE5E4E",
        "Cookie": "6E84E2B2-7796-5D3B-BBA0-162358A79742",
        "AppId": "394287E9-9ACC-5C5B-82D4-0EF06B827DB8",
        "AppName": "Charlie's Factory",
        "Segment": "",
        "HashEmail": "AC5F7FB4-3C3F-54EE-815C-E44461046038",
        "HashIdent": "ident1"
    };

    var data_browser_anon = {
        "IP": "101.82.1.13",
        "WebId": "4E33A7FA-8CD8-5455-871F-C75C52AE9E4E",
        "Cookie": "6E84E2B2-7796-5D3B-BBA0-162358239742",
        "Segment": "",
        "HashIdent": ""
    };

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
        "AppName": "Charlie's Factory",
        "Segment": "",
        "HashEmail": "DE5F7FB4-3C3F-54EE-815C-E44461046038",
        "HashIdent": "ident2"
    };

    var data_browser_ident3 = {
        "IP": "93.52.11.12",
        "WebId": "4E33A7FA-8CD8-5455-871F-C75C52AE9E4E",
        "Cookie": "6E84E2B2-7796-5D3B-BBA0-162358239742",
        "AdId": "B5A877B1-5D67-5101-9B71-FF573539BBCD",
        "VendorId": "F15DE2B3-17E0-5129-B37F-1B126E3FA8AA",
        "UUID": "F4D8ABB6-1B50-H203-8312-EADA5EDA3DFF",
        "DevId": "FF632158-E04A-511C-90A9-77B11850FA4C",
        "IP": "101.10.1.123",
        "WebId": "C511EB21-E3AE-40A4-9EE4-8A240111F4C1",
        "Cookie": "0A33FC4B-144E-40E8-B030-E65DF15BC7EF",
        "AppId": "62FE06AC-7363-4D1D-BFC8-56974C61BD74",
        "AppName": "Vicki's Paper Store",
        "Segment": "",
        "HashEmail": "DE5F7FB4-3C3F-54EE-815C-E44461046038",
        "HashIdent": "ident3"
    };

    var data_android = {
        "WebId": chance.guid(),
        "AppId": chance.guid(),
        "Cookie": chance.guid(),
        "HashedItem1": chance.guid(),
        "HashedItem2": chance.guid(),
        "HashedItem3": chance.guid(),
        "HashEmail": chance.hash(),
        "HashIdent": "andy0"

    };

    var theGoods = JSON.stringify([
        { "0": {value: data_iOS}},
        { "1": {value: data_browser_anon}},
        { "2": {value: data_browser_ident2}},
        { "3": {value: data_browser_ident3}},
        { "4": {value: data_android}}
    ]);
    return theGoods;
}