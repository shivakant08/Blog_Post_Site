#Use Node.js LTS
FROM node:20-alpine

#Set working directory
WORKDIR /app

#Copy packages and install dependencies
COPY package*.json ./
RUN npm install 

#Copy rest of the source code
COPY . .

#Expose backend port
EXPOSE 5000

#Start the server
CMD ["npm","start"]