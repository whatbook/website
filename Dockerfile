FROM ako520/whatbook-website:v3

WORKDIR /app

COPY . /app/

EXPOSE 80

RUN yarn \
  && yarn build \
  && cp -r build/* /var/www/html \
  && rm -rf /app

CMD ["nginx", "-g", "daemon off;"]
