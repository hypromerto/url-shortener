from random import randrange;
from locust import HttpUser, TaskSet, task, between

AUTH_URL = 'http://35.187.92.19'
REDIRECT_URL = 'http://34.78.211.85/babafati'
SHORTEN_URL = 'http://34.78.211.85/shorten'

class QuickstartUser(HttpUser):

    wait_time = between(5.0, 9.0)
    username = ''
    password = ''
    token = ''


    @task(15)
    def signup(self):
        self.username = 'LocustUser' + str(randrange(1000000, 9999999))
        self.password = self.username
        payload = {
            'username': self.username,
            'password': self.password,
            'account_type': 'b2c'
        }
        self.client.post(AUTH_URL + "/register", json=payload)
    @task(30)
    def login(self):
        payload = {'username': self.username, 'password': self.password}
        response = self.client.post(AUTH_URL + "/login", json=payload)
        json_response_dict = response.json()
        self.token = json_response_dict['authItem']

    @task(1000)
    def redirect(self):
        self.client.get(REDIRECT_URL)

    @task(20)
    def shorten(self):
        payload = {'token': self.token, 'original_url': 'http://www.example.com'}
        self.client.post(SHORTEN_URL, json=payload)

    def on_start(self):
        self.signup()
        self.login()
        self.redirect()
        self.shorten()
       

    