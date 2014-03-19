/**
 * Created by adron on 3/19/14.
 * Description: User model and management.
 */

var users = exports;

users.getUsers = function getUsers() {
    return [
        { id: 3, username: 'adron', token: '123', email: 'adron@deconstructed.io' },
        { id: 4, username: 'aaron', token: 'abcdefghi', email: 'aaron@deconstructed.io' },
        { id: 5, username: 'consociation', token: '0d1b02f9-c7e9-42c3-8518-7d744b827274', email: 'consociation@deconstructed.io'},
        { id: 5, username: 'consociation', token: '0d1b02f9-c7e9-42c3-8518-7d744b827274', email: 'consociation@deconstructed.io'},
        { id: 5, username: 'consociation', token: '0d1b02f9-c7e9-42c3-8518-7d744b827274', email: 'consociation@deconstructed.io'},
        { id: 5, username: 'consociation', token: '0d1b02f9-c7e9-42c3-8518-7d744b827274', email: 'consociation@deconstructed.io'}
    ];
}