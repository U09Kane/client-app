# STAGE 1: Install npm dependencies build static files
FROM node:13.8 as build-stage

# -------- ENV Variables-------
# backend api url (where the app looks for data)
ENV REACT_APP_API_BASE_URL=http://localhost:5000/v1
# URL the app will be served from
# (essentially the directory from which)
ENV PUBLIC_URL=/
# -----------------------------

# install depencencies
WORKDIR /app
COPY package*.json /app/
RUN npm install --no-optional && npm cache clean --force

# copy source code & assets
COPY ./ /app/

# build static files
RUN npm run build

# STAGE 2: Copy file first containier into nginx container
FROM nginx:1.17
# copy staic file from node container
COPY --from=build-stage /app/build/ /usr/share/nginx/html
# copy nginx config file
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf
