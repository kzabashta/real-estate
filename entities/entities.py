class Listing:

	def __init__(self):
		self.mls_id = ''
		self.long = None
		self.lat = None
		self.status = ''
		self.type = ''
		self.address = ''
		self.apt_num = ''
		self.municipality = ''
		self.zip = ''
		self.bedrooms = None
		self.contract_date = None
		self.sold_date = None
		self.bathrooms = None
		self.style = ''
		self.value = 0.0
		self.listed = 0.0

	def __str__(self):
		to_return = 'MLS ID: {}\nLONG: {}\nLAT: {}\nSTATUS: {}\nTYPE: {}\nSTYLE: {}\n'
		to_return += 'ADDRESS: {}\nAPT_NUM: {}\nMUNICIPALITY {}\n'
		to_return += 'ZIP: {}\nBEDROOMS: {}\nBATHROOMS: {}\nCONTRACT_DATE: {}\nSOLD_DATE: {}\n'
		to_return += 'VALUE: {}'
		return to_return.format(self.mls_id, self.long, self.lat, self.status,
			self.type, self.style, self.address, self.apt_num, self.municipality, self.zip,
			self.bedrooms, self.bathrooms, self.contract_date, self.sold_date, self.value)