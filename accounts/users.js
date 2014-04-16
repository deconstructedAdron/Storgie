/**
 * Created by adron on 3/19/14.
 * Description: User model and management.
 * License: Apache 2.0 => License: Apache 2.0 https://github.com/Deconstructed/Storgie/blob/master/LICENSE
 */

var users = exports;

users.getUsers = function getUsers() {
    var users = [
        { id: 2, username: 'adron', name: 'Adron Hall', token: 'zrack123!', email: 'adron@deconstructed.io'},
        { id: 3, username: 'public', token: '123456789', email: 'public@deconstructed.io' },
        { id: 4, username: 'aaron', name: 'Aaron Gray', token: 'abcdefghi', email: 'aaron@deconstructed.io' },
        { id: 6, username: 'consociation', token: '0d1b02f9-c7e9-42c3-8518-7d744b827274', email: 'consociation@deconstructed.io'},
        { id: 7, username: 'erskine', name: 'Erskine', token: 'd52de5ff-2cc4-4054-83d0-5bdf04311992', email: 'erskine_williams@mac.com'},
        { id: 8, username: 'peat', name: 'Peat Bakke', token: 'f97dbc35-dacc-4135-a335-dc1d3029b44d', email: 'peat@peat.org'},
        { id: 9, username: 'darin', name: 'Darin Glatt', token: '6dd85319-3e00-4ee8-b648-fcc7a2e1b56f', email: 'dglatt@gmail.com'},
        { id: 10, username: 'aswath', name: 'Aswath P', token: 'DF11FE19-2A83-4FF2-9A99-5E06A6C5D1B5', email: 'apremaradj@altimetrik.com'},
        { id: 11, username: 'brandon', name: 'Brandon Wagner', token: '3BA9522B-76C8-4D04-8D21-80FDC2412618', email: 'bmwagner10@gmail.com'}
    ];

    return users;
}
