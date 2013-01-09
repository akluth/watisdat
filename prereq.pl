#!/usr/bin/perl
##############################################################################
# Copyright (c) 2013 Alexander Kluth <derhartmut@niwohlos.org>               #
#                                                                            #
# Permission is hereby granted,  free of charge,  to any  person obtaining a #
# copy of this software and associated documentation files (the "Software"), #
# to deal in the Software without restriction,  including without limitation #
# the rights to use,  copy, modify, merge, publish,  distribute, sublicense, #
# and/or sell copies  of the  Software,  and to permit  persons to whom  the #
# Software is furnished to do so, subject to the following conditions:       #
#                                                                            #
# The above copyright notice and this permission notice shall be included in #
# all copies or substantial portions of the Software.                        #
#                                                                            #
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR #
# IMPLIED, INCLUDING  BUT NOT  LIMITED TO THE WARRANTIES OF MERCHANTABILITY, #
# FITNESS FOR A PARTICULAR  PURPOSE AND  NONINFRINGEMENT.  IN NO EVENT SHALL #
# THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER #
# LIABILITY,  WHETHER IN AN ACTION OF CONTRACT,  TORT OR OTHERWISE,  ARISING #
# FROM,  OUT OF  OR IN CONNECTION  WITH THE  SOFTWARE  OR THE  USE OR  OTHER #
# DEALINGS IN THE SOFTWARE.                                                  #
##############################################################################

# This is a simple yet nice script which checks if several prerequisites are
# installed and which download and install them if not
use strict;
use warnings;

use Term::ANSIColor qw(:constants);
$Term::ANSIColor::AUTORESET = 1;

$| = 1;

my %PREREQ;
my %MOD_PREREQ;
my $result;
my $error;

#------------------------EDIT HERE-------------------------#
$PREREQ{'node.js'} = 'node';
$PREREQ{'npm'} = 'npm';
$MOD_PREREQ{'commander'} = 'commander';
$MOD_PREREQ{'colors'} = 'colors';
$MOD_PREREQ{'optimist'} = 'optimist';
#------------------------STOP HERE-------------------------#

if (!&check_prereq(\%PREREQ)) {
    print BOLD YELLOW "\n  At least one prerequisite was not met. Please check your setup.\n";
    exit;
}

if (!&check_mod_prereq(\%MOD_PREREQ)) {
    print BOLD YELLOW "\n  At least one module could not be installed. Please check the file npm.install\n";
} else {
    print BOLD GREEN "\n All requirements are met! You can now run bin/nyssrad.\n";
}

sub check_prereq
{
    my $prereq = shift;

    foreach (keys %{$prereq}) {
        print BOLD WHITE " :: " . $_ . "...";
        $result = `$prereq->{$_} --version &> /dev/null`;

        if (${^CHILD_ERROR_NATIVE} ne 0) {
            print BOLD RED "not found!\n";
            $error = 1;
        } else {
            print BOLD GREEN "found!\n";
        }
    }

    if ($error) {
        return undef;
        print BOLD YELLOW "  At least one prerequisite was not met. Please check your setup.\n";
    } else {
        return 1;
    }
}


sub check_mod_prereq
{
    my $mod_prereq = shift;

    foreach (keys %{$mod_prereq}) {
        print BOLD WHITE " :: node.js module '" . $_ . "'...";

        open(HANDLE, ">test.js");
        print HANDLE "require('" . $mod_prereq->{$_} . "');";
        close(HANDLE);

        $result = `node test.js 2> /dev/null`;

        if (${^CHILD_ERROR_NATIVE} ne 0) {
            print BOLD RED "not found!\n";
            print BOLD CYAN " :: Downloading and installing " . $mod_prereq->{$_}. "...";

            $result = `npm install $mod_prereq->{$_} 2> npm.install`;

            if (${^CHILD_ERROR_NATIVE} ne 0) {
                print BOLD RED "failed!\n";
                `rm test.js`;
                return undef;
            } else {
                print BOLD GREEN "succeeded!\n";
                `rm npm.install &> /dev/null`;
            }
        } else {
            `rm test.js`;
            print BOLD GREEN "found!\n";
        }
    }

    return 1;
}

