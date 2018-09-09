#!/bin/sh

assert-release-note
status=$?

nsp check
status=$(( $status + $? ))

if [ $status -eq 0 ]
then
  exit 0
else
  exit 1
fi