fetch('http://localhost:8000')
    .then(response => {
        console.log('Response:', response);
        return response.text();  // Extract the response body as text
    })
    .then(data => console.log('Data:', data)) // This will now log "Hello"
    .catch(error => console.error('Error:', error));
