var collection = 'idents';
api = require('./storgie'),
    orchestrator = require('orchestrate')("1fce6199-5bfa-4750-80fb-0404bc457803");

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

var jsonData = [
    { "ident1": {value: data_iOS}},
    { "anon1": {value: data_browser_anon}},
    { "ident2": {value: data_browser_ident2}}
];

var jsonData = data_iOS;

for (var i = 0; i < jsonData.length; i++) {
    console.log(i);
}

//api.put(collection, 'ident2', jsonData);


console.log("finished");
