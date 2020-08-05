def custom_error_message(errors):
    error = []
    for key in errors:
        a = str(key+': '+ errors.get(key)[0])
        error.append(a)
    message = {'messages': error}
    return message