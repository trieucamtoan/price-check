FROM python:3.7
SHELL [ "/bin/bash", "-c" ]

# To enable logging
ENV PYTHONUNBUFFERED=1

# Create server directory
RUN mkdir /scraper
WORKDIR /scraper

# Bundle the source
COPY . ./

EXPOSE 6800

# install dependencies
RUN pip install --upgrade pip
RUN pip install -r ./requirements.txt

CMD set -m; scrapyd && scrapyd-deploy && fg scrapyd
