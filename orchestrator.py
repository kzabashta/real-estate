import logging
import os
from logging.config import fileConfig

from pymongo import MongoClient
from parser.scraper import Scraper
from email_utils.email_extractor import EmailExtractor

SCOPES = 'https://www.googleapis.com/auth/gmail.readonly'
CLIENT_SECRET_FILE = 'client_secret.json'
APPLICATION_NAME = 'Real Estate'
DEST_DIR_NAME = 'raw'

def main():
	fileConfig('logging_config.ini')
	client = MongoClient()
	db = client.real_estate
	collection = db.processed
	logger = logging.getLogger()
	extractor = EmailExtractor(SCOPES, CLIENT_SECRET_FILE, APPLICATION_NAME, DEST_DIR_NAME)
	extractor.run()
	
	scraper = Scraper()

	for dirName, subdirList, fileList in os.walk(DEST_DIR_NAME):
	    for fName in fileList:
	    	if not fName.endswith('.html'):
	    		continue
	    	fullPath = os.path.join(dirName, fName)
	    	if collection.find_one({'path': fullPath}) == None:
	    		collection.insert_one({'path': fullPath})    		
		    	with open(fullPath, 'r') as fHandle:
		    		logger.info('Procesing %s', fullPath)
		    		html_doc = fHandle.read().replace('\n', '')
		    		scraper.scrape(html_doc)

if __name__ == '__main__':
	main()