# Stage 1: Use a standard Nginx image
FROM nginx:alpine

# Remove the default Nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy your website's files into the Nginx public directory
COPY . /usr/share/nginx/html

# Tell Docker that the container will listen on port 80
EXPOSE 80

# The command to start the Nginx server when the container runs
CMD ["nginx", "-g", "daemon off;"]