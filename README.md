To create a new user on MongoDB, use the following command:

```bash
docker exec -it ew-multi-db-mongo-1 \
  mongo --host localhost -u admin -p admin --authenticationDatabase admin \
  --eval "db.getSiblingDB('heroes').createUser({user: 'normaluser', pwd: 'normaluser', roles: [{ role: 'readWrite', db: 'heroes' }]})"
```
