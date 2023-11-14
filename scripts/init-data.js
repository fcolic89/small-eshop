db.createUser(
{
    user: "admin",
    pwd: "admin",
    roles: [
      { role: "readWrite", db: "products" }
    ]
});
db.grantRolesToUser('admin',[{ role: 'root', db: 'admin'}]);
