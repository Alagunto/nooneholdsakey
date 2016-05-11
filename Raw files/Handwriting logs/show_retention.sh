#!/bin/bash
for f in *
do
  echo $f
  echo `nhak \"$f\" --extract second-pass`
done
