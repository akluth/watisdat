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


var _content;
var _raw;

function Parser(content) {
    this._content = content;
}


Parser.prototype.lexer = function() {
    // Delete all kinds of newlines from the input + all spaces
    this._content = this._content.replace(/(\r\n|\n|\r)/gm, '');
    this._content = this._content.replace(/\s+/g, '');
    this._raw = this._content.split('');

    var temp = '';

    // Extract all non-brainfuck commands
    for (var i = 0; i < this._raw.length; i++) {
        if (this._raw[i] === '>' || 
            this._raw[i] === '<' ||
            this._raw[i] === '+' ||
            this._raw[i] === '-' ||
            this._raw[i] === '.' ||
            this._raw[i] === ',' ||
            this._raw[i] === '[' ||
            this._raw[i] === ']') {
            temp += this._raw[i];
        }
    }

    this._raw = temp.split('');

    log.debug('Preprocessed content: ' + this._raw);
};


Parser.prototype.parse = function() {
    var num_opened_brackets = 0, num_closed_brackets = 0;

    this._raw.forEach(function(index) {
        switch (index) {
            case '[':
                num_opened_brackets++;
                break;
            case ']':
                num_closed_brackets++;
                break;
            default:
                break;
        }
    });

    if (num_opened_brackets !== num_closed_brackets) {
        log.failure("Parsing error: Unclosed loop ([])");
        return false;
    }

    return this._raw.join('');
};

module.exports = Parser;
