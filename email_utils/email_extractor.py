from __future__ import print_function
import httplib2
import os
import email
import base64
import urllib2

from apiclient import discovery
import oauth2client
from oauth2client import client
from oauth2client import tools
from bs4 import BeautifulSoup

import logging

try:
    import argparse
    flags = argparse.ArgumentParser(parents=[tools.argparser]).parse_args()
except ImportError:
    flags = None

class EmailExtractor:
    def __init__(self, scopes, client_secret_file, application_name, dest_dir_name):
        self.scopes = scopes
        self.client_secret_file = client_secret_file
        self.application_name = application_name
        self.dest_dir_name = dest_dir_name
        self.logger = logging.getLogger(__name__)

    def get_credentials(self):
        self.logger.debug('Getting gmail credentials from secure store')
        home_dir = os.path.expanduser('~')
        credential_dir = os.path.join(home_dir, '.credentials')
        if not os.path.exists(credential_dir):
            os.makedirs(credential_dir)
        credential_path = os.path.join(credential_dir,
                                       'gmail-python-quickstart.json')

        store = oauth2client.file.Storage(credential_path)
        credentials = store.get()
        if not credentials or credentials.invalid:
            flow = client.flow_from_clientsecrets(self.client_secret_file, self.scopes)
            flow.user_agent = self.application_name
            if flags:
                credentials = tools.run_flow(flow, store, flags)
            else: # Needed only for compatability with Python 2.6
                credentials = tools.run(flow, store)
            self.logger.info('Storing credentials to %s', credential_path)
        return credentials

    def get_label_id(self, service):
        results = service.users().labels().list(userId='me').execute()
        labels = results.get('labels', [])

        for label in labels:
            if label['name'] == self.application_name:
                return label['id']

    def get_message_ids(self, service, labelId):
        self.logger.debug('Getting messages from labelId %s', labelId)
        results = service.users().messages().list(userId='me', labelIds=labelId).execute()
        messages = results.get('messages', [])
        self.logger.debug('Found %d messages', len(messages))
        return messages

    def get_message(self, service, messageId):
        self.logger.debug('Getting messageId %s', messageId)
        message = service.users().messages().get(userId='me', id=messageId, format='raw').execute()

        msg_str = base64.urlsafe_b64decode(message['raw'].encode('ASCII'))

        return email.message_from_string(msg_str)

    def get_message_date(self, message):
        date_time = email.utils.parsedate(message['Date'])
        return "{year:04d}{month:02d}{day:02d}".format(year=date_time[0], month=date_time[1], day=date_time[2])

    def get_message_body(self, message):
        for part in message.walk():
            if part.get_content_type() == 'text/html':
                return part.get_payload(decode=True)

    def process_messages(self, service, messages):
        for message in messages:
            msg_full = self.get_message(service, message['id'])
            date = self.get_message_date(msg_full)
            html_doc = self.get_message_body(msg_full)
            soup = BeautifulSoup(html_doc, 'html.parser')
            
            dest_dir = os.path.join(os.getcwd(), self.dest_dir_name, date)
            
            try:
                os.makedirs(dest_dir)
            except OSError:
                self.logger.warn('Skipping %s as it exists', date)
                continue # already exists

            self.logger.info('Processing date %s', date)

            links = soup.find_all('a')
            for link in links:
                try:
                    part_path = os.path.join(dest_dir, link.contents[0])
                    try:
                        os.makedirs(part_path)
                        self.logger.debug('Created direcotry %s', part_path)
                    except OSError as e:
                        self.logger.error('Directory %s already exists: %s', part_path, e.strerror)
                    link_path = link['href']
                    self.logger.debug('Downloading HTML page from %s', link_path)
                    try:
                        response = urllib2.urlopen(link_path)
                        html = response.read()

                        with open(os.path.join(part_path, 'index.html'), 'w') as text_file:
                            text_file.write(html)
                    except urllib2.HTTPError as e:
                        self.logger.error('Encountered an error while downloading %s', e.strerror)
                    except urllib2.URLError as e:
                        self.logger.error('Encountered an error while downloading %s', e.strerror)
                except TypeError as e:
                    continue


    def run(self):
        credentials = self.get_credentials()
        http = credentials.authorize(httplib2.Http())
        service = discovery.build('gmail', 'v1', http=http)
        labelId = self.get_label_id(service)
        messages = self.get_message_ids(service, labelId)
        self.process_messages(service, messages)

        

