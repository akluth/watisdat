/******************************************************************************
 * Copyright (c) 2013 Alexander Kluth <derhartmut@niwohlos.org>               *
 *                                                                            *
 * This file is part of watisdat.                                             *
 *                                                                            *
 * watisdat is free software: you can redistribute it and/or modify           *
 * it under the terms of the GNU General Public License as published by       *
 * the Free Software Foundation, either version 3 of the License, or          *
 * (at your option) any later version.                                        *
 *                                                                            * 
 * watisdat is distributed in the hope that it will be useful,                *
 * but WITHOUT ANY WARRANTY; without even the implied warranty of             *
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the              *
 * GNU General Public License for more details.                               *
 *                                                                            *
 * You should have received a copy of the GNU General Public License          *
 * along with watisdat.  If not, see <http://www.gnu.org/licenses/>.          *
 ******************************************************************************/
log = require('./log');
config = require('./config');


function PreProcessor() {
}


PreProcessor.prototype.process = function(data) {
    data = data.split('\n');
    data.forEach(function(line) {
        if (line.indexOf('$heap') !== -1) {
            var temp = line.split(' ');
            config.vm.heap = parseInt(temp[1]);
            log.debug('pragma $heap detected, using heap size of ' + temp[1] + ' cells');
        }

    });
};


module.exports = PreProcessor;
