/******************************************************************************
 * Copyright (c) 2013 Alexander Kluth <derhartmut@niwohlos.org>               *
 *                                                                            *
 * Permission is hereby granted,  free of charge,  to any  person obtaining a *
 * copy of this software and associated documentation files (the "Software"), *
 * to deal in the Software without restriction,  including without limitation *
 * the rights to use,  copy, modify, merge, publish,  distribute, sublicense, *
 * and/or sell copies  of the  Software,  and to permit  persons to whom  the *
 * Software is furnished to do so, subject to the following conditions:       *
 *                                                                            *
 * The above copyright notice and this permission notice shall be included in *
 * all copies or substantial portions of the Software.                        *
 *                                                                            *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR *
 * IMPLIED, INCLUDING  BUT NOT  LIMITED TO THE WARRANTIES OF MERCHANTABILITY, *
 * FITNESS FOR A PARTICULAR  PURPOSE AND  NONINFRINGEMENT.  IN NO EVENT SHALL *
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER *
 * LIABILITY,  WHETHER IN AN ACTION OF CONTRACT,  TORT OR OTHERWISE,  ARISING *
 * FROM,  OUT OF  OR IN CONNECTION  WITH THE  SOFTWARE  OR THE  USE OR  OTHER *
 * DEALINGS IN THE SOFTWARE.                                                  *
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
            this._raw[i] === ',') {
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

    return this._raw;
};

module.exports = Parser;
