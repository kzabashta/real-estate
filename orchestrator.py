import logging
from logging.config import fileConfig

from parser.scraper import Scraper
from email_utils.email_extractor import EmailExtractor

SCOPES = 'https://www.googleapis.com/auth/gmail.readonly'
CLIENT_SECRET_FILE = 'client_secret.json'
APPLICATION_NAME = 'Real Estate'
DEST_DIR_NAME = 'raw'

def main():
	fileConfig('logging_config.ini')
	logger = logging.getLogger()

	extractor = EmailExtractor(SCOPES, CLIENT_SECRET_FILE, APPLICATION_NAME, DEST_DIR_NAME)
	#extractor.run()

	with open ("index.html", "r") as myfile:
	    html_doc = myfile.read().replace('\n', '')

	scraper = Scraper(html_doc)	

if __name__ == '__main__':
	main()