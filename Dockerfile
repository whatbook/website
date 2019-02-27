FROM node:10.15.1-stretch-slim
RUN apt-get update \    
  && apt-get install -y nginx
WORKDIR /app
COPY . /app/
EXPOSE 80
RUN  yarn \
  && yarn run build \     
  && cp -r build/* /var/www/html \     
  && rm -rf /app
CMD ["nginx","-g","daemon off;"]