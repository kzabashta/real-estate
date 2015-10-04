import logging
import os
from logging.config import fileConfig

from parser.scraper import Scraper
from email_utils.email_extractor import EmailExtractor

SCOPES = 'https://www.googleapis.com/auth/gmail.readonly'
CLIENT_SECRET_FILE = 'client_secret.json'
APPLICATION_NAME = 'Real Estate'
DEST_DIR_NAME = 'test'

def main():
	fileConfig('logging_config.ini')
	logger = logging.getLogger()
	extractor = EmailExtractor(SCOPES, CLIENT_SECRET_FILE, APPLICATION_NAME, DEST_DIR_NAME)
	
	scraper = Scraper()

	for dirName, subdirList, fileList in os.walk(DEST_DIR_NAME):
	    for fName in fileList:
	    	if not fName.endswith('.html'):
	    		continue
	    	fullPath = os.path.join(dirName, fName)
	    	with open(fullPath, 'r') as fHandle:
	    		logger.debug('Procesing %s', fullPath)
	    		html_doc = fHandle.read().replace('\n', '')
	    		scraper.scrape(html_doc)

if __name__ == '__main__':
	main()