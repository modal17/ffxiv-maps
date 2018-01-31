sudo nohup gunicorn --workers 3 --bind 127.0.0.1:5000 wsgi:app </dev/null >/var/www/ffxiv-maps/ffxiv-maps-flask/logs 2>&1
