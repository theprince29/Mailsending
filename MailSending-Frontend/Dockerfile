FROM node:18 AS builder

WORKDIR /app

COPY package.json package-lock.json ./

ARG VITE_REACT_APP_BACKEND_BASEURL
ENV VITE_REACT_APP_BACKEND_BASEURL=$VITE_REACT_APP_BACKEND_BASEURL


RUN npm install

COPY . .
RUN npm run build

# Use Nginx to serve the frontend
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 82
CMD ["nginx", "-g", "daemon off;"]