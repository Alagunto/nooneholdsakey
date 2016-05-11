import bootstrap
import json
import os
import sys
import argparse
import base64
import re
from HandwritingExemplar import *

parser = argparse.ArgumentParser(prog="loader from help-me form", description='Processes raw base64-ed json data from help-me form (nhak.js style)')
parser.add_argument('infile', nargs='?', type=argparse.FileType('r'), default=sys.stdin)
parser.add_argument('outfile', nargs='?', type=argparse.FileType('w'), default=sys.stdout)
parser.add_argument('--human', '--show', '-s', action="store_true", help='show data human-readable instead of chaining')

options = parser.parse_args(sys.argv[1:])

rows = options.infile.readlines()

# Checking if from help-me form 
def check_help_me(rows):
  rows = [row[:] if row[-1] != "\n" else row[:-1] for row in rows]
  string = "".join(rows)
  try: 
    data = base64.b64decode(string)
    data = json.loads(data)
    if options.human:
      print "Looks like a data from help-me form (base64 + json)"
    else:
      print "help-me-form"
  except Exception as inst:
    if options.human:
      print "Not help-me:", inst
    pass

def check_raw(rows):
  try:
    for row in rows:
      x = HandwritingExemplar.fromString(row[:] if row[-1] != "\n" else row[:-1])
    if options.human:
      print "Looks like a raw HandwritingExemplar data"
    else:
      print "raw"
  except Exception as inst:
    if options.human:
      print "Not raw:", inst
    pass

check_help_me(rows)
check_raw(rows)
