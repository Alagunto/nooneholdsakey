import bootstrap
from HandwritingExemplar import *
import sys
import argparse

parser = argparse.ArgumentParser(prog="loader from help-me form", description='Processes raw base64-ed json data from help-me form (nhak.js style)')
parser.add_argument('infile', nargs='?', type=argparse.FileType('r'), default=sys.stdin)
parser.add_argument('outfile', nargs='?', type=argparse.FileType('w'), default=sys.stdout)
parser.add_argument('--human', '--show', '-s', action="store_true", help='show data human-readable instead of chaining')
parser.add_argument('--delimeter', '-d', help='string which will be delimiting retentions in a row', default=",")

options = parser.parse_args(sys.argv[1:])
while 1:
  row = options.infile.readline().strip()
  if not row:
    break
  if len(row) == 0:
    break
  try:
    obj = HandwritingExemplar.fromString(row)
    if len(obj.events) != 0:
      events = [str(key["up_time"] - key["down_time"]) for key in obj.events]
      print options.delimeter.join(events) #options.delimeter.join(events)
    else:
      print
  except ValueError:
    print "error: bad data"
  except Exception as inst:
    print type(inst)
    print inst.message
  

