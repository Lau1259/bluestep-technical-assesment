/* *******************************************************
User class
******************************************************* */
class User {
  constructor() {
    this.firstName = null;
    this.lastName = null;
    this.email = null;
    this.address = null;
    this.address2 = null;
    this.city = null;
    this.state = null;
    this.zip = null;
  }

  // Setters
  isValidString(string) {
    return string != null && string !== "";
  }
  setFirstName(value) {
    // Check that the first name is not empy since it is required
    if (isValidString(value)) {
      this.firstName = value;
    } else {
      throw new Error("First name is required");
    }
  }
  setLastName(value) {
    // Check that the last name is not empty since it is required
    if (isValidString(value)) {
      this.lastName = value;
    } else {
      throw new Error("Last name is required");
    }
  }
  setEmail(value) {
    // Check that the email is not empty since it is required
    if (isValidString(value)) {
      this.email = value;
    } else {
      throw new Error("Email is required");
    }
  }
  setAddress(value) {
    if (isValidString(value)) {
      this.address = value;
      return true;
    } else {
      return false;
    }
  }
  setAddress2(value) {
    if (isValidString(value)) {
      this.address2 = value;
      return true;
    } else {
      return false;
    }
  }
  setCity(value) {
    if (isValidString(value)) {
      this.city = value;
      return true;
    } else {
      return false;
    }
  }
  setState(value) {
    if (isValidString(value)) {
      this.state = value;
      return true;
    } else {
      return false;
    }
  }
  setZip(value) {
    if (isValidString(value)) {
      this.zip = value;
      return true;
    } else {
      return false;
    }
  }
}

/* *******************************************************
UserHelper "library"
******************************************************* */
const UserHelper = {
  create: () => new User(),
  // For a real implementation you may want to take an array of users
  save: () => {
    // Probably would need to connect to some database and add the user.
    // Could also send a post request and hit some API that handles this

    // Using a random number to throw false for testing purposes
    let success = Math.random() < 0.5;

    return success;
  },
};

/* *******************************************************
Main JS Functions:
******************************************************* */
// This function checks for empty or null values
const isValidString = (string) => string != null && string !== "";

// This funciton is responsible for storing the form data as a JS object
const getFormData = () => {
  const formData = {};
  const formInputs = document.querySelectorAll("#userDataForm01 input");

  // We will now loop through the inputs and add them to the formData if it isn't empty
  formInputs.forEach((input) => {
    let value = input.value.trim();

    // Check that the value is non null or an empty string
    if (isValidString(value)) {
      // Add the value to the form data
      formData[input.name] = value;
    }
  });

  // Return the form object
  return formData;
};

// This function makes a POST request to an echo API and will return the form data
const fakePost = async () => {
  // Set the endpoint for the reequest
  const endpoint = "https://echo.zuplo.io/"; // An echo API that echos your request
  // const endpoint = "myfunapi.fake/user/signup"

  // Get the form data object and make it a JSON string
  const formData = JSON.stringify(getFormData());

  // send the request using the POST method
  const data = await fetch(endpoint, {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      // Extract the JSON from the response
      return res.json();
    })
    // Extract the data
    .then((data) => data)
    // Catch any errors
    .catch((e) => console.error("Error fetching data:", e));

  // Parse the JSON body to get the form data object
  return JSON.parse(data.body);
};

const mockAPI = (formData) => {
  // extract variables from the form data object
  let { firstName, lastName, email, address, address2, city, state, zip } =
    formData;
  // create  the default output
  let output = {
    message: "The form has a valid first name, last name, and email.",
    result: "success",
  };
  if (!isValidString(firstName)) {
    (output.message = "Error: The first name is required"),
      (output.result = "failure");
  }
  if (!isValidString(lastName)) {
    (output.message = "Error: The last name is required"),
      (output.result = "failure");
  }
  if (!isValidString(email)) {
    (output.message = "Error: The email is required"),
      (output.result = "failure");
  }

  try {
    const newUser = UserHelper.create();
    newUser.setFirstName(firstName);
    newUser.setLastName(lastName);
    newUser.setEmail(email);
    newUser.setAddress(address);
    newUser.setAddress2(address2);
    newUser.setCity(city);
    newUser.setState(state);
    newUser.setZip(zip);
    console.log(newUser);

    if (!UserHelper.save()) {
      output.message = "Error: Failed to save user.";
      output.result = "failure";
    }
  } catch (error) {
    output.message = "Error: Failed to create a user.";
    output.result = "failure";
  }

  return output;
};

const resultHandler = (results) => {
  let { result, message } = results;
  let msgElement = document.getElementById("errormsg");
  switch (result) {
    case "failure":
      msgElement.innerText = message;
      msgElement.classList.remove("hidden");
      break;
    case "success":
      msgElement.classList.add("hidden");
      msgElement.innerText = "";
      // Note that the alert will pause the hidden class from being added until it is closed.
      alert(message);
      break;
  }
};

window.onload = () => {
  // It was unclear if the form should submit somewhere so I am preventing the actual submission.
  document.querySelector("#userDataForm01").addEventListener("submit", (e) => {
    // Stop the default submisison and handle the fetch call in JS
    e.preventDefault();
    let msgElement = document.getElementById("errormsg");
    msgElement.classList.add("hidden");
    //  This makes a POST request to an API that will echo the data sent
    // fakePost()
    // Wait for the promise to resolve then print the response body
    // .then((response) => console.log(response))
    // Log an error if it fails
    // .catch((e) => console.error("Error:", e));

    let formData = getFormData(); // Only necessary as it wasa requirement in the instructions
    let results = mockAPI(formData);
    resultHandler(results);
  });
};
