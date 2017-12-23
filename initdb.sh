#!/usr/bin/env bash

mongo --eval "var env='$1', user='$2', pass='$3'" database/createdb.js
