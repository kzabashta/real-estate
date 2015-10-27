import logging
import json

from re import sub
from pymongo import MongoClient
from bs4 import BeautifulSoup

from entities.entities import Listing

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

			listing = self.enrich_listing(listing)

			listings.append(listing)

		return listings

	def enrich_listing(self, listing):
		listing_detail = self.soup.find_all('div', id=listing.mls_id)[0] # there is only one
		photos = listing_detail.find_all('img') # there is only one
		listing.photos = []
		for photo in photos:
			listing.photos.append(photo['src'])
			if 'data-multi-photos' in photo.attrs:
				multi_photos = json.loads(photo['data-multi-photos'])['multi-photos']
				for multi_photo in multi_photos:
					listing.photos.append(multi_photo['url'])

		spans = listing_detail.find_all('span', class_='value')
		for span in spans:
			if span.previous_sibling == None or len(span.contents) == 0:
				continue
			key = span.previous_sibling.contents[0]
			val = span.contents[0]

			if key == 'Contract Date:':
				listing.contract_date = val
			elif key == 'Sold Date:':
				listing.sold_date = val
			elif key == 'List:':
				listing.listed = int(sub(r'[^\d.]', '', val))
			elif key == 'Sold:':
				listing.value = int(sub(r'[^\d.]', '', val))
			else:
				key = key.replace(':', '')
				key = key.replace(' ', '_')
				key = key.lower()
				setattr(listing, key, val)

		return listing

	def update_records(self, listings, full_path):
		client = MongoClient()
		db = client.real_estate
		collection = db.raws

		for listing in listings:
			key = listing.mls_id
			listing.source = full_path
			print(listing.__dict__)
			collection.update_one({'mls_id': key}, {"$set": listing.__dict__}, True)

		self.logger.info('Updated %i records', len(listings))

	def scrape(self, html_doc, full_path):
		self.soup = BeautifulSoup(html_doc, 'html.parser')
		listings = self.get_listings(html_doc)
		self.update_records(listings, full_path)