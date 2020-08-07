import requests, time

def custom_error_message(errors):
    error = []
    for key in errors:
        a = str(key+': '+ errors.get(key)[0])
        error.append(a)
    message = {'messages': error}
    return message

def check_update_price():
    response = requests.get('http://localhost:6800/daemonstatus.json')
    # response = requests.get('http://scrapy:6800/daemonstatus.json')
    result = eval(response.text)
    while result.get('pending') != 0 or result.get('running') != 0:
        time.sleep(0.1)
        response = requests.get('http://localhost:6800/daemonstatus.json')
        result = eval(response.text)