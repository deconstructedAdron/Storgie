/**
 * Created by Adron
 * License: Apache 2.0 => License: Apache 2.0 https://github.com/Deconstructed/Storgie/blob/master/LICENSE
 */

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
    stat_response.Compute = (chance.d8() * chance.d4());
    stat_response.Memory = (chance.d8() * chance.d4());
    stat_response.Stat = sys_stat;
    stat_response.Stamp = stamp.getTime();
    return stat_response;
}
