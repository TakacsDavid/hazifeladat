# Homework

This README file contains the answers and explanations for the assigned homework.

## Task 1: Manual Testing cases

- **Test Case 1: Successfully Add a Product to Shopping List (positive)**

  **Title:** Add a product to the shopping list successfully

  **Preconditions:** 
    - User is on the homepage of ALDI.US
    - User has an empty shopping list
  
  **Test Steps:**
    - Search for a product (e.g., /products/dairy-eggs/milk-milk-substitutes/).
    - Click on the product to view details.
    - Click on the "Add to shopping list" button.
    - Navigate to the "Shopping List" section.

  **Expected Result:**
    - The selected product should be visible in the shopping list.
    - The correct product name, and other details should be displayed.

- **Test Case 2: Verify That Duplicate Items Cannot Be Added to the Shopping List (negative)**

  **Title:** Verify adding duplicate products is not possible to the shopping list

  **Preconditions:**
    - User is on the homepage of ALDI.US
    - User has already added a product (e.g., /products/dairy-eggs/milk-milk-substitutes/ "Milk") to the shopping list.

  **Test Steps:**
    - Search for the same product already added (e.g., /products/dairy-eggs/milk-milk-substitutes/ "Milk").
    - Click on the product to view details.

  **Expected Result:**
    - The system should prevent adding duplicate entries of the same product.
    - A checkmark should appear on the "Add to Shopping List" button, indicating the item is already added and preventing further clicks.

- **Test Case 3: Verify Shopping List Persistence After Page Refresh (positive)**

  **Title:** Ensure the shopping list is retained after refreshing the page

  **Preconditions:**
    - User is on the homepage of ALDI.US
    - User has added at least one item to the shopping list.

  **Test Steps:**
    - Refresh the page
    - Navigate to the "Shopping List" section.

  **Expected Result:**
    - The shopping list should persist and display all previously added items

## Bug Reporting 
  **Title:** Shopping list does not merge after login and items are lost

  **Environment: PROD**

  **Browser: Chrome 121.0**

  **Version: 2.0** (indicates the Shopping List microservice version)

  **Description:**
  This issue could frustrate users, leading to abandoned shopping sessions. A possible fix would be to store the guest user's shopping list in local storage and merge it upon login.

  **Preconditions:**
  - User is on the homepage of ALDI.US
  - User is not **logged in**

  **Steps to Reproduce:**
  - Browse for any product (e.g., "Milk").
  - Click on "Add to Shopping List." (or Add multiple products to the shopping list)
  - Click on "Login" and sign in to an existing account.
  - Navigate to the "Shopping List" section.

  **Expected Result:**
  - The shopping list should merge with the user’s existing saved list.
  - Items added while logged out should persist after login.

  **Actual Result:**
  - The shopping list resets, and all items added while logged out are lost.

  I usually attach screenshots, or screen record evidence of the issue, where the issue is present. Also mentioning the screenshot's link in the description e.g:
  
  **Attached screenshots:** img2025-02-06-19-20.png, img2025-02-06-19-21.png

## Task 2: Frontend Testing

  **Introduction**

  **Testing Framework:** I chose Cypress for this homework because it's an easy-to-use testing tool that runs directly in the browser. It’s great for checking user actions like logging in, catching bugs, and making sure everything runs smoothly.

  **Setup steps for the testing framework:**
  - Install Nodejs from https://nodejs.org/
  - Run the following commands in the commandline:
  ```
  npm init -y
  npm install cypress --save-dev
  npx cypress open
  ```

