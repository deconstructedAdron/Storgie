/**
 * Created by adron on 3/19/14.
 * Description: User model and management.
 * License: Apache 2.0 => License: Apache 2.0 https://github.com/Deconstructed/Storgie/blob/master/LICENSE
 */

var users = exports;

users.getUsers = function getUsers() {
    var users = [
        { id: 2, username: 'adron', token: 'zrack123!', email: 'adron@deconstructed.io'},
        { id: 3, username: 'public', token: '123456789', email: 'public@deconstructed.io' },
        { id: 4, username: 'aaron', token: 'abcdefghi', email: 'aaron@deconstructed.io' },
        { id: 6, username: 'consociation', token: '0d1b02f9-c7e9-42c3-8518-7d744b827274', email: 'consociation@deconstructed.io'},
        { id: 7, username: 'erskine', token: '0d1b02f9-c7e9-42c3-8518-7d744b827274', email: 'erskine@someplace.com'},
        { id: 8, username: 'pete', token: '0d1b02f9-c7e9-42c3-8518-7d744b827274', email: 'pete@someplace.com'}
    ];

    return users;
}