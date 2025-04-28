
# Install NestJS
npm install -g @nestjs/cli

# Install packages
npm install

# Database MYSQL
## Please check and import SQL.sql file
## Create evn file
```bash
$ cp .env.example .env
```

# Khởi chạy
npm run start:dev


# Backend port: 8888
# Frontend port: 4000

# API Main:
POST    /item
GET     /item?search=name&sortBy=price&sortOrder=DESC
PATCH   /item/:id
DELETE  /item/:id

# Upload:
POST    /upload/:id/image    (field: file)
POST    /upload/:id/document (field: file)