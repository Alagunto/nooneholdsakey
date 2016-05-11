import bootstrap
import sys
reload(sys)  # Reload does the trick!
sys.setdefaultencoding('UTF8')
import json
import os
import argparse
import base64
from HandwritingExemplar import *

parser = argparse.ArgumentParser(prog="loader from help-me form", description='Processes raw base64-ed json data from help-me form (nhak.js style)')
parser.add_argument('infile', nargs='?', type=argparse.FileType('r'), default=sys.stdin)
parser.add_argument('outfile', nargs='?', type=argparse.FileType('w'), default=sys.stdout)
parser.add_argument('--human', '--show', '-s', action="store_true", help='show data human-readable instead of chaining')
parser.add_argument('--extract', '-e', help="concrete handwritings to extract. e.g --extract=first-pass", default="all")

options = parser.parse_args(sys.argv[1:])

base64_data = options.infile.readline()
json_data = base64.b64decode(base64_data)
data = json.loads(json_data)

writings = []
for name in data:
  obj = data[name]
  if obj is None:
    continue

  comment = u""

  phrase = ""
  if "phrase" in obj:
    phrase = obj["phrase"]
  if "text" in obj:
    phrase = obj["text"]

  if "name" in obj:
    phrase = obj["name"]
    comment += u"fio: {};".format(obj["name"])
  if "gender" in obj:
    comment += u"gender: {};".format(obj["gender"])
  
  events = []
  if "events" in obj:
    events = obj["events"]
  if "writing" in obj:
    events = obj["writing"]
  if "phrase_writing" in obj:
    events = obj["phrase_writing"]
  if "name_writing" in obj:
    events = obj["name_writing"]
  events = json.loads(str(events))
  comment += u"loaded from help-me form;"

  writing = HandwritingExemplar(name=name, phrase=phrase, events=events, comment=comment)
  writings.append(writing)

if options.human:
  for wr in writings:
    if not (options.extract == "all" or wr.name in options.extract.split(',')):
      continue
    print wr.name + ':'
    print "text: '", wr.phrase, "'"
    print "amount of events:", len(wr.events)
    print "comment:", wr.comment
    print
else:
  for wr in writings:
    if not (options.extract == "all" or wr.name in options.extract.split(',')):
      continue
    print wr
