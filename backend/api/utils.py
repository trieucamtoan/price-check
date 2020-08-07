def custom_error_message(errors):
    error = ""
    for key in errors:
        a = str(errors.get(key)[0])
        error = error.join(a) + " "
    error = error.strip()
    message = {'messages': error}
    return message