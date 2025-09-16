#!/bin/bash

get_package_changes () {
  local CURRENT_BRANCH

  CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

  git diff HEAD~1..HEAD~0 -- "origin/$CURRENT_BRANCH" package.json
}

has_package_changes () {
  [ ! -z "$(get_package_changes)" ]
}

has_working_tree_changes () {
  [ ! -z "$(git status pub -s)" ] || [ ! -z "$(git status src/sass -s)" ] # [ -n "$(git status pub -s)" ]
}
