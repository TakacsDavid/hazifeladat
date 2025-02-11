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
