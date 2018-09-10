#!/bin/sh

assert-version-bump
status=$?

assert-changelog-update --quiet
status=$(( $status + $? ))

nsp check --threshold 5
status=$(( $status + $? ))

if [ $status -eq 0 ]
then
  exit 0
else
  exit 1
fi
