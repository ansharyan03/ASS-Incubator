FROM alpine/curl

WORKDIR /code
ADD ./wait-for-it.sh ./wait-for-it.sh
RUN apk add --no-cache bash
RUN chmod +x wait-for-it.sh

ENTRYPOINT ["/bin/bash", "-c"]
CMD ["./wait-for-it.sh -h sql -p 3306 --strict --timeout=300 -- curl http://api:8000/init"]