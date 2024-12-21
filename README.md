# BlueStep Technical Assessment - Sign Up Form
## Overview
This project is a sign-up form created as part of the BlueStep Technical Assessment. The form allows users to submit their personal details such as first name, last name, email, address, city, state, and zip code. The form includes client-side validation, and once submitted, the data is processed and sent to a mock API. The project demonstrates basic form handling, validation, and API interaction in HTML and JavaScript.

## Features
User input validation for required fields (first name, last name, email).
A form that captures user details and sends them via a POST request.
A mock API simulation to demonstrate form submission.
Error handling and success messages.

## Files
- index.html: The main HTML file that contains the form and layout.
- main.js: JavaScript file that handles form data, validation, and mock API submission.

## Usage
1. Open index.html in your browser.
2. Fill in the form fields (first name, last name, email, etc.).
3. Press the "Sign Up" button to simulate form submission.
4. If all required fields are filled, the form data will be processed, and a success message will appear.
5. If any required fields are missing, an error message will be displayed.

## JavaScript Functions
- getFormData(): Collects and returns the form data as a JavaScript object.
- fakePost(): Simulates a POST request to an echo API and returns the form data you send in a POST request.
- mockAPI(formData): Validates the form data and simulates the saving process, returning success or failure.
- resultHandler(results): Displays success or error messages based on the result of the form submission.

## Form Data Flow
1. The user submits the form.
2. The getFormData() function collects the form data.
3. The mockAPI() function validates the data and simulates saving it.
4. The result is handled by resultHandler(), which displays an appropriate message to the user.

