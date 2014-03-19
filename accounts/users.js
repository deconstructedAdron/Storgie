/**
 * Created by adron on 3/19/14.
 * Description: User model and management.
 * License: Apache 2.0 => License: Apache 2.0 https://github.com/Deconstructed/Storgie/blob/master/LICENSE
 */

var users = exports;

users.getUsers = function getUsers() {
    var users = [
        { id: 3, username: 'adron', token: '123', email: 'adron@deconstructed.io' },
        { id: 4, username: 'aaron', token: 'abcdefghi', email: 'aaron@deconstructed.io' },
        { id: 5, username: 'consociation', token: '0d1b02f9-c7e9-42c3-8518-7d744b827274', email: 'consociation@deconstructed.io'},
        { id: 5, username: 'consociation', token: '0d1b02f9-c7e9-42c3-8518-7d744b827274', email: 'consociation@deconstructed.io'},
        { id: 5, username: 'consociation', token: '0d1b02f9-c7e9-42c3-8518-7d744b827274', email: 'consociation@deconstructed.io'},
        { id: 5, username: 'consociation', token: '0d1b02f9-c7e9-42c3-8518-7d744b827274', email: 'consociation@deconstructed.io'}
    ];

    return users;
}