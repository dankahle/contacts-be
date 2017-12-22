#!/usr/bin/env bash

mongo --eval "var env = '$1'" database/createdb.js
