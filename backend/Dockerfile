FROM python:3.7

# To enable logging
ENV PYTHONUNBUFFERED=1

# Create server directory
RUN mkdir /backend
WORKDIR /backend

# Bundle the source
COPY . ./
USER root
RUN chmod +x ./wait.sh

# # install psycopg2 dependencies
# RUN apk update \
#     && apk add postgresql-dev gcc python3-dev musl-dev

# install dependencies
COPY requirements.txt /backend
RUN pip install --upgrade pip
RUN pip install -r ./requirements.txt
RUN apt-get update && apt-get install -y uwsgi-plugin-python


# Expose port 8000 in the container
EXPOSE 8000

CMD ./wait.sh db 5432 \
  && python ./manage.py collectstatic --noinput \
  && python ./manage.py migrate \
  && python ./manage.py loaddata data.json\
  && /usr/local/bin/uwsgi --ini ./uwsgi.ini 