import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles_form.css';

function Form() {
    const navigate = useNavigate();

    const [current, setCurrent] = useState(null);
    const [sections, setSections] = useState([]);

    useEffect(() => {
        fetch('/api/current')
            .then(response => response.text())
            .then(text => {
                try {
                    return JSON.parse(text);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    return null;
                }
            })
            .then(data => {
                if (data && typeof data.current === 'number') {
                    setCurrent(data.current);
                    console.log("current: ", data.current);
                } else {
                    console.error("Invalid data received:", data);
                }
            })
            .catch(error => {
                console.error('Error fetching current:', error);
            });

        fetch('/api/history')
            .then(response => response.text())
            .then(text => {
                try {
                    return JSON.parse(text);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    return null;
                }
            })
            .then(data => setSections(data))
            .catch(error => {
                console.error('Error fetching current:', error);
            });
    }, []);

    const goToSection = (section) => {
        fetch("/api/goto", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ section })
        })
            .then(() => navigate(0))
            .catch(error => console.error("Error going to section:", error));
    };

    useEffect(() => {
        if (current !== null && current === 0) {
            navigate("/");
        }
    }, [current, navigate]);

    const [sectionInfo, setSectionInfo] = useState(null);
    const [questionsText, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        if (current === null) return;
        fetch('/api/section/' + current)
            .then(response => response.text())
            .then(text => {
                try {
                    return JSON.parse(text);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
            })
            .then(data => {
                setSectionInfo(data);
            })
            .catch(error => {
                console.error('Error fetching section:', error);
            });
    }, [current]);

    useEffect(() => {
        if (sectionInfo === null) return;
        fetch('/api/questions/' + sectionInfo.section)
            .then(response => response.text())
            .then(text => {
                try {
                    return JSON.parse(text);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
            })
            .then(data => {
                setQuestions(Object.values(data));
            })
            .catch(error => {
                console.error('Error fetching questions:', error);
            });
    }, [sectionInfo]);

    const radioChange = (questionId, value) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: value,
        }));
    };

    const allAnswered = questionsText.every((_, index) => answers[`q${index + 1}`]);

    const next = async () => {
        if (!allAnswered) {
            alert("Por favor, responde todas las preguntas.");
            return;
        }

        try {
            const response = await fetch('/api/next', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(answers),
            });

            if (!response.ok) {
                throw new Error('Error al incrementar el valor de current');
            }

            console.log('Valor de current incrementado con éxito');
            navigate(0);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const prev = async () => {
        try {
            const response = await fetch('/api/prev', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Error al incrementar el valor de current');
            }

            console.log('Valor de current incrementado con éxito');

            navigate(0);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        if (current === null) return;

        fetch('/api/answers/' + current)
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    const answerMap = data.reduce((acc, { question_id, answer_value }) => {
                        acc[question_id] = answer_value;
                        return acc;
                    }, {});
                    setAnswers(answerMap);
                }
            })
            .catch(error => {
                console.error('Error al cargar la sección:', error);
            });
    }, [current]);

    const questions = questionsText.map((question, index) => (
        <div key={index}>
            <h3>{question}</h3>
            <div className="radio-group">
                {[1, 2, 3, 4, 5].map(value => (
                    <div className="div-g" key={value}>
                        <input
                            type="radio"
                            id={`option${index * 5 + value}`}
                            name={`q${index + 1}`}
                            value={value}
                            checked={answers[`q${index + 1}`] === value}
                            onChange={() => radioChange(`q${index + 1}`, value)}
                        />
                        <label htmlFor={`option${index * 5 + value}`}>{['No cumple', 'Minimo', 'Regular', 'Bueno', 'Excelente'][value - 1]}</label>
                    </div>
                ))}
            </div>
        </div>
    ));

    if (sectionInfo === null) return (<h1>Cargando...</h1>);

    return (
        <div>
            <h2>{sectionInfo.title}</h2>
            <hr />

            <div class="form">
                <table>
                    <tr>
                        <td class="left">
                            {questions}
                        </td>

                        <td class="right">
                            {sections.map(({ section }) => (
                                <p
                                    key={section}
                                    className={section === current ? "section-selected" : "section"}
                                    onClick={() => goToSection(section)}
                                >
                                    Sección {section}
                                </p>
                            ))}
                        </td>
                    </tr>
                </table>
            </div>

            <hr />
            <table class="buttonsContainer">
                <tr>
                    <td width="50%"><button onClick={prev} disabled={current === null || current === 1}>Anterior</button></td>
                    <td width="50%"><button onClick={next}>Siguiente</button></td>
                </tr>
            </table>
            <hr />
            <p class="rr">All Rigth Reserved - 2025</p>
        </div>
    );
}

export default Form;
