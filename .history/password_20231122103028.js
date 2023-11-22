import bcrypt from "bcrypt"

const password = "unicorn26";
const saltRounds = 10;  // You can adjust the number of salt rounds as needed

bcrypt.hash(password, saltRounds, function(err, hash) {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Hashed password:", hash);
  // Use this hash to insert into the database
});
