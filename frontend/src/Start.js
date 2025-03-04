import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles_start.css';

function Start() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

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
                } else {
                    console.error("Invalid data received:", data);
                }
            })
            .catch(error => {
                console.error('Error fetching current:', error);
            });
    }, []);

    useEffect(() => {
        if (current > 0) {
            navigate("/form");
        }
    }, [current, navigate]);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
    setNameError(false);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    setDescriptionError(false);
  };

  const handleButtonClick = async () => {
    let hasError = false;

    if (name.trim() === '') {
      setNameError(true);
      hasError = true;
    }
    if (description.trim() === '') {
      setDescriptionError(true);
      hasError = true;
    }

    if (hasError) return;

      try {
        const response = await fetch('/api/startform', {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description })
      });

      if (!response.ok) {
        throw new Error('Error al enviar los datos');
      }

      console.log('Datos enviados con éxito');

      navigate('/form');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Universidad de San Carlos de Guatemala</h1>
      <h1>- CUNOR -</h1>
      <hr/>

      <div className="form">
        <div className="disclaimer">
          <p>La presente encuesta forma parte de un estudio académico realizado en el marco del curso "Práctica Intermedia" de la carrera de Ingeniería de Sistemas. Todos los datos recopilados serán utilizados exclusivamente con fines académicos y de investigación dentro del contexto de este curso.</p>
          <p>Garantizamos que la información proporcionada no será compartida, divulgada, vendida ni utilizada para ningún otro propósito distinto al mencionado. Se mantendrá la confidencialidad y protección de los datos conforme a los principios de privacidad y ética profesional.</p>
          <p>Al completar esta encuesta, usted acepta participar de manera voluntaria y consciente de que su información será manejada con estricta confidencialidad.</p>
          <p>Agradecemos de antemano su valiosa participación y el tiempo dedicado a completar este formulario.</p>
          <hr/>
          <label htmlFor="name-user">Nombre del encuestado:</label>
          <input 
            id="name-user" 
            type="text" 
            value={name} 
            onChange={handleNameChange}
          />
          {/* Mostrar mensaje de error solo si nameError es true */}
          {nameError && <p style={{ color: 'red', fontSize: '14px' }}>Por favor, ingrese su nombre.</p>}

          <hr />
          <p>Breve descripción de las actividades de la empresa:</p>
          <textarea 
            rows="4" 
            cols="50" 
            value={description} 
            onChange={handleDescriptionChange}
          />
          {/* Mostrar mensaje de error solo si descriptionError es true */}
          {descriptionError && <p style={{ color: 'red', fontSize: '14px' }}>Por favor, ingrese una descripción.</p>}
        </div>
      </div>

      <hr />

      <div className="buttonsContainer">
        <button onClick={handleButtonClick}>
          Comenzar
        </button>
      </div>

      <hr />
      <p className="rr">Right Reserved - 2025</p>
    </div>
  );
}

export default Start;
