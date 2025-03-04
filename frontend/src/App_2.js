function App() {
    fetch('/api/questions/1_1')
        .then(response => {
            console.log('Response:', response);
            return response.text();
        })
        .then(data => console.log('Data:', data))
        .catch(error => console.error('Error:', error));

    return(<div>Smile</div>);
}

export default App;
