import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/questions")
            .then(response => setQuestions(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Survey Form</h1>
            {questions.map(q => (
                <div key={q.id}>
                    <p>{q.text}</p>
                    {q.choices.map(c => (
                        <label key={c.id}>
                            <input type="radio" name={q.id} value={c.text} />
                            {c.text}
                        </label>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default App;
