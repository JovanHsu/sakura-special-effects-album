#!/bin/bash
i=1
for x in *.PNG; do
  echo "$x",$i
  mv "$x" $i.png
  # shellcheck disable=SC2219
  let "i=i+1"
done
