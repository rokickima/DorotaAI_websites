# Use the official nginx image as base
FROM nginx:alpine

RUN chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy the opentales folder to serve as main site
COPY opentales/ /usr/share/nginx/html/

# Copy landingpages to a separate directory for subdomain routing
COPY landingpages/ /opentales/ /usr/share/nginx/html/

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

RUN chmod -R o+r /usr/share/nginx/html
RUN chmod -R o+r /usr/share/nginx/landingpages

# Expose port 80
EXPOSE 80

# Start nginx
USER nginx
