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
  **Testing an Angular app, there's a way to provide base url for the tests, therefore in tests we can just simply refer to it and add e.g /login**

  ```
  const { defineConfig } = require("cypress");

  module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:4200', // Angular app route
    supportFile: false
  },
});

  ```

  **Login Sample - can be found at /cypress/e2e/login.cy.js**

  ```
  describe('Login Feature', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should login successfully with valid credentials', () => {
    cy.get('input[name="email"]').type('testuser@example.com');
    cy.get('input[name="password"]').type('Password123!');
    cy.get('button[type="submit"]').click();

    // Verify successful login
    cy.url().should('include', '/dashboard'); 
    cy.contains('Welcome, Test User').should('be.visible');
  });

  it('should show an error message for an invalid password', () => {
    cy.get('input[name="email"]').type('testuser@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    cy.contains('Invalid email or password').should('be.visible');
    });
  });
  ```

  **Disclaimer for using selectors:**

  Prioritize to use css selectors, such as IDs, Classes and other css elements e.g:

  **ID:** #email, #password, #submit-btn

  **Class:** .email, .password, .submit-btn

## Task 3: API Testing

  **Introduction**

  **Testing Framework:** Even though REST-assured is a Java-specific library, it just felt more straightforward to use Cypress for this homework since I already started with it. After implementing the Cypress requests, I'll add a few notes about the Java REST-assured library.
  Just a quick note - no matter what language you use, it really depends on what the task needs to achieve. That’s what makes it logical to choose the right framework and language for the job.

  **API test sample: /cypress/e2e/api_tests.cy.js**

  ```
  describe('Task Management API Tests', () => {
  const apiUrl = 'https://automationexercise.com/api_list';
  let taskId; // Store task ID for later tests

  // Create a new task
  it('should create a new task', () => {
      cy.request({
          method: 'POST',
          url: apiUrl,
          body: {
              title: 'New Task',
              description: 'Task description',
              completed: false
          }
      }).then(response => {
          expect(response.status).to.eq(201);
          expect(response.body).to.have.property('id');
          taskId = response.body.id; // Save task ID
      });
  });

  // Retrieve a task by ID
  it('should retrieve a task by ID', () => {
      cy.request({
          method: 'GET',
          url: `${apiUrl}/${taskId}`
      }).then(response => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('id', taskId);
          expect(response.body).to.have.property('title', 'New Task');
      });
  });

  // Update a task by ID
  it('should update a task by ID', () => {
      cy.request({
          method: 'PUT',
          url: `${apiUrl}/${taskId}`,
          body: {
              title: 'Updated Task',
              description: 'Updated description',
              completed: true
          }
      }).then(response => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('title', 'Updated Task');
          expect(response.body).to.have.property('completed', true);
      });
  });

  // Delete a task by ID
  it('should delete a task by ID', () => {
      cy.request({
          method: 'DELETE',
          url: `${apiUrl}/${taskId}`
      }).then(response => {
          expect(response.status).to.eq(204);
      });
  });

  // Ensure the deleted task does not exist
  it('should return 404 for deleted task', () => {
      cy.request({
          method: 'GET',
          url: `${apiUrl}/${taskId}`,
          failOnStatusCode: false
      }).then(response => {
          expect(response.status).to.eq(404);
      });
    });
  });
  ```

  **REST-assured - Java**

  Using **Maven** or **Gradle**, ensure that the dependencies are added correctly.
  ```
  <dependencies>
    <dependency>
        <groupId>io.rest-assured</groupId>
        <artifactId>rest-assured</artifactId>
        <version>5.4.0</version>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter-api</artifactId>
        <version>5.9.2</version>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter-engine</artifactId>
        <version>5.9.2</version>
        <scope>test</scope>
    </dependency>
  </dependencies>
  ```
  
  **Java sample code for API testing**

  ```
  import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import org.junit.jupiter.api.*;

import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class TaskApiTest {

    private static String BASE_URL = "https://api.random.exmaple.com/tasks";
    private static int taskId;  // Store task ID

    @BeforeAll
    public static void setup() {
        RestAssured.baseURI = BASE_URL;
    }

    @Test
    @Order(1)
    public void testCreateTask() {
        Response response = given()
                .contentType(ContentType.JSON)
                .body("{ \"title\": \"New Task\", \"description\": \"Task description\", \"completed\": false }")
                .when()
                .post()
                .then()
                .statusCode(201)
                .body("title", equalTo("New Task"))
                .body("completed", equalTo(false))
                .extract()
                .response();

        taskId = response.jsonPath().getInt("id"); // Store task ID for later use
        Assertions.assertNotEquals(0, taskId);
    }

    @Test
    @Order(2)
    public void testGetTaskById() {
        given()
                .pathParam("id", taskId)
                .when()
                .get("/{id}")
                .then()
                .statusCode(200)
                .body("id", equalTo(taskId))
                .body("title", equalTo("New Task"))
                .body("completed", equalTo(false));
    }

    @Test
    @Order(3)
    public void testUpdateTask() {
        given()
                .contentType(ContentType.JSON)
                .pathParam("id", taskId)
                .body("{ \"title\": \"Updated Task\", \"description\": \"Updated description\", \"completed\": true }")
                .when()
                .put("/{id}")
                .then()
                .statusCode(200)
                .body("title", equalTo("Updated Task"))
                .body("completed", equalTo(true));
    }

    @Test
    @Order(4)
    public void testDeleteTask() {
        given()
                .pathParam("id", taskId)
                .when()
                .delete("/{id}")
                .then()
                .statusCode(204);
    }

    @Test
    @Order(5)
    public void testGetDeletedTask() {
        given()
                .pathParam("id", taskId)
                .when()
                .get("/{id}")
                .then()
                .statusCode(404);
    }
}
  ```

## Bonus Questions

**Docker**
I haven’t used Docker for test automation yet, but I do have some knowledge of it and understand its benefits since I run Portainer on my home server. I’m really eager to apply it in a testing environment!

**JUnit + Selenium**
  There are multiple solutions for this example task:
- Adding **implicit timeout** after "Delete Task"
```
// Wait for the task to disappear
        wait.until(ExpectedConditions.invisibilityOfElementLocated(taskLocator));
```
- Adding **implicit timeout with retries** after "Delete Task"
```
// Retry logic: MAX_RETRIES
boolean isTaskDeleted = false;
  for (int attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
            wait.until(ExpectedConditions.invisibilityOfElementLocated(taskLocator));
            isTaskDeleted = true;
            break; // Exit loop if task is successfully deleted
          } catch (TimeoutException e) {
            System.out.println("Attempt " + attempt + ": Task still visible, retrying...");
          }
   }

  // Final check - Fail the test if the task was not deleted after retries
  assertTrue(isTaskDeleted, "Task should be removed after deletion attempts");
```
- If none of above works consistently, adding an **explicit timeout** after "Delete Task" being called, for e.g 2000ms
```
 // Wait for deletion to complete
        try { Thread.sleep(2000); } catch (InterruptedException e) { e.printStackTrace(); }
  // Verify the task is no longer in the list
  boolean isTaskPresent = driver.findElements(By.cssSelector(".sample-task"));
  assertFalse(isTaskPresent, "Task should be removed after deletion");
```

**CI Integration**
I’d set up a Jenkins job to trigger automated tests nightly at a specific time when no one is actively working on the project. Besides, running tests on each code commit or pull request depends on the project’s needs...both approaches can work.

How would I set it up?
- Connect Jenkins to the repo (GitHub, GitLab, Bitbucket, etc.).
- Set up build triggers and define the execution stage.
- Store and analyze test results using JUnit, Allure, or TestNG.
- Notify the team of test results via Slack or email.