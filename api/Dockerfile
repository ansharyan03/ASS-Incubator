# syntax=docker/dockerfile:1
FROM --platform=linux/amd64 python:3.7-alpine
WORKDIR /code
# RUN apk add --no-cache gcc musl-dev linux-headers
COPY requirements.txt requirements.txt
ADD ./*.py ./
RUN pip install -r requirements.txt
EXPOSE 8000
CMD ["gunicorn", "--capture-output", "--bind", "0.0.0.0:8000", "wsgi:app"]
# gunicorn --capture-output --bind 0.0.0.0:8000 wsgi:app