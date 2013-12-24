function gen_browser_ident(matched) {
    var data_browser = new Object();
    data_browser.HashId = matched;
    data_browser.WebId = chance.guid();
    data_browser.AppId = chance.guid();
    data_browser.Cookie = chance.guid();
    data_browser.HashedItem1 = chance.guid();
    data_browser.HashedItem2 = chance.guid();
    data_browser.HashedItem3 = chance.guid();
    return data_browser;
}