import argparse
from .api import serve
from .seed import seed

parser = argparse.ArgumentParser()
parser.add_argument('command',choices=['serve','seed'])
parser.add_argument('--db')
parser.add_argument('--port',type=int)
args = parser.parse_args()
if args.command == 'seed':
    seed(args.db or 'data/hsts.sqlite3')
    print('Seeded demo database:', args.db or 'data/hsts.sqlite3')
else: serve(args.db,port=args.port)
