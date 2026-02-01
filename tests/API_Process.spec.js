const { test, expect, request } = require('@playwright/test');

// Placeholders - replace with actual MSI API endpoints and credentials
const MSI_BASE_URL = 'https://e1-poc-sandbox.a99d04.metricstream.com'; // Example base URL
const MSI_AUTH_PATH = '/metricstream/auth/login'; // Placeholder auth endpoint
const MSI_CREATE_PROCESS_PATH = '/metricstream/api/process/create'; // Placeholder create process endpoint

const loginPayLoad = { username: "ORM_Program_Manager", password: "welcome*12" }; // Adjust payload structure
const processPayLoad = {
    name: "API Process",
    description: "Description entered",
    businessCriticality: "High",
    ownerOrg: "ACME Corp",
    owner: "ERM Admin"
    // Add other required fields based on API docs
};

let response;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    // Authenticate and get token
    const loginResponse = await apiContext.post(`${MSI_BASE_URL}${MSI_AUTH_PATH}`, {
        data: loginPayLoad
    });
    const loginJson = await loginResponse.json();
    const token = loginJson.token; // Adjust based on response structure

    // Create Process
    const processResponse = await apiContext.post(`${MSI_BASE_URL}${MSI_CREATE_PROCESS_PATH}`, {
        data: processPayLoad,
        headers: {
            'Authorization': `Bearer ${token}`, // Adjust auth header
            'Content-Type': 'application/json'
        }
    });
    response = await processResponse.json();
    console.log('Process creation response:', response);
});

test('API Create MSI Process', async () => {
    // Assertions based on response
    expect(response).toHaveProperty('id'); // Adjust based on API response
    expect(response.name).toBe('API Process');
    // Add more assertions as needed
});