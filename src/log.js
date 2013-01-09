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
    process.stdout.write(str.toString().bold.data);
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

