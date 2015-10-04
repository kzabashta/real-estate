import logging

from bs4 import BeautifulSoup

class Scraper:
	def __init__(self):
		self.logger = logging.getLogger(__name__)

	def get_mls_list(self, html_doc):
		tables = self.soup.find_all("table", class_="data-list")
		if len(tables) == 0:
			return []
		
		table = tables[0]

		for row in table.find_all('tr'):
			print row

	def scrape(self, html_doc):
		self.soup = BeautifulSoup(html_doc, 'html.parser')
		mls_list = self.get_mls_list(html_doc)