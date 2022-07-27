#!/bin/bash
i=1
for x in *.jpeg; do
  echo "$x",$i
  mv "$x" $i.jpeg
  # shellcheck disable=SC2219
  let "i=i+1"
done
