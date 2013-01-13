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
cmd = require('commander');
log = require('./log');
config = require('./config');

VirtualMachine = require('./vm');

var _code;
var _heap;
var vm;


function Cli() {
}


Cli.prototype.run = function() {
    this.vm = new VirtualMachine();
    this.vm.create(config.vm.heap);

    this.prompt();
};


Cli.prototype.prompt = function() {
    var self = this;
    cmd.prompt('[' + this.vm.getCellPointer() + '] > ', function(data) {
        self.parse(data);

        //TODO: Recursion, recursion, recursion...not the best solution.
        self.prompt();
    });
};


Cli.prototype.parse = function(data) {
    this.vm.run(data);
    log.data('\n');
};


module.exports = Cli;

