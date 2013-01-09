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

var _code;
var _heap;
var _pointer;
var _level;

function VirtualMachine() {
    this._pointer = 0;
    this._level = 0;
}


VirtualMachine.prototype.create = function(heap) {
    this._heap = new Array(heap);
   
    for (var i = 0; i < this._heap.length; i++) {
        this._heap[i] = 0;
    }

    log.debug('Created virtual machine with heap size ' + this._heap.length);
};


VirtualMachine.prototype.run = function(code) {
    this._code = code.join('');
    var ip;
    var self = this;

    log.debug('Executing code, size ' + this._code.length);

    for (ip = 0; ip < self._code.length; ip++) {
        switch (self._code.charAt(ip)) {
            case '>':
                self._pointer++;
                break;
            case '<':
                self._pointer--;
                break;
            case '+':
                self._heap[self._pointer]++;
                break;
            case '-':
                self._heap[self._pointer]--;
                break;
            case '.':
                log.data(String.fromCharCode(self._heap[self._pointer]));
                break;
            case '[':
                if (self._heap[self._pointer] === 0) {
                    for (ip++; self._level > 0 || self._code.charAt(ip) != ']'; ip++) {
                        if (self._code.charAt(ip) == '[') {
                            self._level++;
                        }

                        if (self._code.charAt(ip) == ']') {
                            self._level--;
                        }
                    }
                }
                break;
            case ']':
                for (ip--; self._level > 0 || self._code.charAt(ip) != '['; ip--) {
                    if (self._code.charAt(ip) == ']') {
                        self._level++;
                    }

                    if (self._code.charAt(ip) == '[') {
                        self._level--;
                    }
                }
                ip--;
                break;
            default:
                break;
        }
    }

    log.debug('Done.');
};

module.exports = VirtualMachine;
