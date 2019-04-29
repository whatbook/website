FROM node:8.10.0
RUN ls
# RUN yarn \
#   && yarn build
FROM nginx
RUN node -v
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY build /usr/share/nginx/html
RUN chown -R nginx /usr/share/nginx/html/ # grant to user nginx
# ENTRYPOINT ["docker-entrypoint.sh"]
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
