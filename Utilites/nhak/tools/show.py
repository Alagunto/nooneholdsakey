import bootstrap
from HandwritingExemplar import *
import sys
import argparse
import numpy as np
import matplotlib.pyplot as plt

parser = argparse.ArgumentParser(prog="loader from help-me form", description='Processes raw base64-ed json data from help-me form (nhak.js style)')
parser.add_argument('infile', nargs='?', type=argparse.FileType('r'), default=sys.stdin)
parser.add_argument('outfile', nargs='?', type=argparse.FileType('w'), default=sys.stdout)
parser.add_argument('--human', '--show', '-s', action="store_true", help='show data human-readable instead of chaining')

options = parser.parse_args(sys.argv[1:])
while 1:
  row = options.infile.readline().strip()
  if not row:
    break
  if len(row) == 0:
    break
  y = map(int, row.split(','))
  x = range(1, len(y) + 1) 
  plt.plot(x, y)
  plt.xlabel("Key number")
  plt.ylabel("Milliseconds")
  plt.grid(True)
  plt.show()
