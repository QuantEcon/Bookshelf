#!/bin/bash

# Ask for input with type & default hints, echos answer.
# (String) What is the hostname: [localhost]

# Options:
# ./input <type> <message> <default>    e.g. (String) Hostname? [localhost]
# ./input --bool <message> <default>     e.g. [Y/n] Use Github auth? [n]

# input <type> <message> <default.
function __input_string {
    read -p "(${1}) ${2} [${3}] " answer
    if [ "${answer}" = "" ]
    then
        echo "${3}"
    else
        echo "${answer}"
    fi
}

# input_bool <message> <default>
function __input_bool {
    read -p "(Y/n) ${1} [${2}] " answer
    case ${answer} in
        y|Y)
            echo true
            ;;
        *)
            echo false
            ;;
    esac
}

function input {
    case $1 in
        --bool)
            __input_bool "${2}" "${3}"
            ;;
        *)
#            returnNum $1
            __input_string "${1}" "${2}" "${3}"
            ;;
    esac
}