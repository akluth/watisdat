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
var colors = require('colors');
var config = require('./config');

if (config.colors == true) {
    colors.setTheme({
        glitzer: 'rainbow',
        input: 'grey',
        verbose: 'cyan',
        prompt: 'grey',
        success: 'green',
        data: 'white',
        help: 'cyan',
        warn: 'yellow',
        debug: 'yellow',
        error: 'red',
        message: 'white'
    });
} else {
    colors.setTheme({
        glitzer: 'grey',
        input: 'grey',
        verbose: 'grey',
        prompt: 'grey',
        success: 'grey',
        data: 'grey',
        help: 'grey',
        warn: 'grey',
        debug: 'grey',
        error: 'grey',
        message: 'grey'
    });
}

function success(str) {
    console.log(str.toString().success);
}

function failure(str) {
    console.log(str.toString().error);
}

function debug(str) {
    if (config.debug) { 
        console.log(str.toString().debug);
    }
}

function warn(str) {
    console.log(str.toString().warn);
}

function message(str) {
    console.log(str.toString().message);
}

function data(str) {
    console.log(str.toString().bold.data);
}

function glitzer(str) {
    console.log(str.toString().glitzer);
}

exports.success = success;
exports.failure = failure;
exports.debug = debug;
exports.message = message;
exports.glitzer = glitzer;
exports.data = data;
exports.warn = warn;

