const { customers } = require("./data/promo");
const { stock } = require("./data/promo");

//FIRST : Check for email already in database
const emailExists = (info) => {
  //Extract the right data of "body"
  const { email } = info;

  // Loop for that checks if email from body equals customers.email
  for (customer of customers) {
    if (email === customer.email) {
      console.log("email already registred");
      return false;
    } else {
      return true;
    }
  }
};

// SECOND : Check for given name , surname to be already in database
const namesExists = (info) => {
  // Extract the right data of "body"
  const { givenName, surname } = info;

  // Loop for that  checks if names from body are equals to customers.surname and customers.givenName
  for (customer of customers) {
    if (
      givenName.toLowerCase() === customer.givenName.toLowerCase() &&
      surname.toLowerCase() === customer.surname.toLowerCase()
    ) {
      console.log("Names already registred");
      return false;
    } else {
      return true;
    }
  }
};

//THIRD : Let's check for the address

const addressExists = (info) => {
  // Extract the right data of "body"
  const { address } = info;

  // Loop for that checks if address from body exists in database
  for (customer of customers) {
    if (address.toLowerCase() === customer.address.toLowerCase()) {
      console.log("Address already registred");
      return false;
    } else {
      return true;
    }
  }
};

// AND last (for the customer valiations !!) : Let's check body.country === canada

const countryIsCanada = (info) => {
  // Extract the right data of "body"
  const { country } = info;

  // Loop for that checks if country from body is canada
  for (customer of customers) {
    if (country.toLowerCase() === "canada") {
      return true;
    } else {
      return false;
    }
  }
};

// Function to check if Consumer is returning

const exists = (info) => {
  const checkEmail = emailExists(info);
  const checkNames = namesExists(info);
  const checkAddress = addressExists(info);
  return checkEmail && checkNames && checkAddress;
};

// And yet another function to check if our products are in stock

const inStock = (info) => {
  // Extract the right data from the body
  const { order, size } = info;

  // For loop to check if our info is in stock
  return true;
};

// Function exists to check all of our parameters

const validate = (info) => {
  const checkCustomer = exists(info);
  const checkCountry = countryIsCanada(info);
  const checkStock = inStock(info);
  return checkCountry && checkCustomer && checkStock;
};

// Export functions

module.exports = { validate, exists, countryIsCanada };
