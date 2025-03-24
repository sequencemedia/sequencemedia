#!/bin/bash

DEBUG="${DEBUG:-"${DEBUG:sequencemedia*}"}"
node -e 'import("./transform.mjs").then(({ default: transform }) => transform())'
