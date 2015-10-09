import logging
import json
import pymongo

from entities.entities import Listing

from bs4 import BeautifulSoup

class Scraper:
	def __init__(self):
		self.logger = logging.getLogger(__name__)

	def get_listings(self, html_doc):
		tables = self.soup.find_all("table", class_="data-list")

		listings = []

		if len(tables) == 0:
			return []
		
		table = tables[0] # there should be only one table

		for row in table.find_all('tr'):
			if not row.attrs:
				continue
			listing = Listing()

			sub_parts = json.loads(row['data-pop-up'])
			listing.mls_id = row['data-identifier']
			listing.long = row['data-ln']
			listing.lat = row['data-lt']
			listing.status = sub_parts['lsc']
			listing.type = sub_parts['type_own1_out']
			listing.address = sub_parts['addr']
			listing.apt_num = sub_parts['apt_num']
			listing.municipality = sub_parts['municipality']
			listing.zip = sub_parts['zip']
			listing.bedrooms = sub_parts['br']
			listing.bathrooms = sub_parts['bath_tot']
			listing.style = sub_parts['style']
			listing.value = sub_parts['lp_dol']


			listing.contract_date = None
			listing.sold_date = None

		return listings

	def update_records(listings):
		for listing in listings:


	def scrape(self, html_doc):
		self.soup = BeautifulSoup(html_doc, 'html.parser')
		listings = self.get_listings(html_doc)