import bootstrap
from HandwritingExemplar import *
import sys
import argparse

parser = argparse.ArgumentParser(prog="loader from help-me form", description='Processes raw base64-ed json data from help-me form (nhak.js style)')
parser.add_argument('infile', nargs='?', type=argparse.FileType('r'), default=sys.stdin)
parser.add_argument('outfile', nargs='?', type=argparse.FileType('w'), default=sys.stdout)
parser.add_argument('--human', '--show', '-s', action="store_true", help='show data human-readable instead of chaining')
parser.add_argument('--measure', '-m', help='measuring type. Default is keys/second. Available are ks (keys/second), km (keys/minute)', default="ks")

options = parser.parse_args(sys.argv[1:])
while 1:
  row = options.infile.readline().strip()
  if not row:
    break
  if len(row) == 0:
    break
  try:
    obj = HandwritingExemplar.fromString(row)
    if len(obj.events) == 0:
      print "0"
    else:
      first_moment = obj.events[0]['down_time']
      last_moment = obj.events[-1]['up_time']
      keys = len(obj.events)

      speed = float(keys) / (last_moment - first_moment)
      speed *= 1000 # because timestamps are in milliseconds
      if options.measure == "km":
        speed *= 60
      print speed
  except ValueError:
    print "error: bad data"
  except Exception as inst:
    print type(inst)
    print inst.message
  

