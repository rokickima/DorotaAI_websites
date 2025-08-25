# Use the official nginx image as base
FROM nginx:alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy the opentales folder to serve as main site
COPY opentales/ /usr/share/nginx/html/

# Copy landingpages to a separate directory for subdomain routing
COPY landingpages/ /usr/share/nginx/landingpages/

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
