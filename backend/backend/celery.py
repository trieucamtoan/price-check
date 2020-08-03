from __future__ import absolute_import, unicode_literals
import os

from celery import Celery
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

app = Celery('scraper',
                # broker='amqp://guest:guest@localhost:5672/',
                # backend='amqp://guest:guest@localhost:5672/',
                # include=['api.tasks']
            )

# Optional configuration, see the application user guide.
app.conf.update(
    result_expires=3600,
    worker_max_tasks_per_child=1,
    broker_pool_limit=None
)

app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()

# app.conf.beat_schedule = {
#     'every-second': {
#         'task': 'scraper.tasks.test', 
#         'schedule': 10, # run task every 10 seconds
#     },
# }

# if __name__ == '__main__':
#     app.start()

# Rabbit docker command
# docker run -d --hostname my-rabbit --name some-rabbit -e RABBITMQ_DEFAULT_USER=testuser -e RABBITMQ_DEFAULT_PASS=123 -e RABBITMQ_DEFAULT_VHOST=my_vhost rabbitmq