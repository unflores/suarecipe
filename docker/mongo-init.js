db.createUser(
  {
      user: "dev",
      pwd: "dev",
      roles: [
          {
              role: "dbOwner",
              db: "suarecipe_development"
          }
      ]
  }
);
