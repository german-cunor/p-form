-- Crear la base de datos
CREATE DATABASE "FormData";
\connect "FormData";

-- Crear la tabla Sections
CREATE TABLE Sections (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    section TEXT NOT NULL UNIQUE
);

CREATE TABLE SectionH (
    id SERIAL PRIMARY KEY,
    section INT NOT NULL UNIQUE
);

CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE Data (
   id SERIAL PRIMARY KEY,
   current INT NOT NULL UNIQUE
);

INSERT INTO Data (current) VALUES (0);

-- Insertar datos
INSERT INTO Sections (title, section) VALUES
('Auditoría a la planificación estratégica en la empresa y en el área de sistemas', '1_1'),
('Auditoría a la estructura de organización del área de sistemas', '1_2'),
('Auditoría al cumplimiento de las funciones, tareas y operaciones de la actividad informática en la empresa y en el área de sistemas', '1_3'),
('Auditoría a la dirección del área de sistemas', '1_4'),
('Auditoría a la administración del factor humano en el área de sistemas', '1_5'),
('Auditoría a la administración de los recursos informáticos no humanos del área de sistemas', '1_6'),
('Auditoría a los controles informáticos de área de sistemas', '1_7'),
('Evaluación de la existencia, establecimiento y uso de los estándares de sistemas', '1_8'),
('Auditoria en la documentación de los sistemas en el área de informática y a la documentación de las demás áreas de la empresa que cuenten con servicios informáticos.', '1_9'),
('Gestión administrativa de la red', '2_1'),
('Evaluación del análisis de la red de cómputo.', '2_2'),
('Análisis de la delimitación de los proyectos de red, a fin de evaluar la manera en que se cumplen:', '2_3'),
('Análisis de la escalabilidad y el aprovechamiento de los recursos informáticos de la empresa para instalar una red de cómputo', '2_4'),
('Evaluación del diseño e implementación de la red según el ámbito de cobertura', '2_5'),
('Análisis de las redes inalámbricas', '2_6'),
('Análisis del diseño e implementación de la topología de cobertura de la red, en cuanto a:', '2_7'),
('Análisis de los estándares adoptados para el funcionamiento de las redes.', '2_8'),
('Evaluación del diseño e implementación de las características de la red', '2_9'),
('Análisis de las técnicas de transmisión que determinan cómo se utilizan los medios físicos para la comunicación entre las computadoras de la red', '2_10'),
('Análisis del funcionamiento y la confiabilidad de los dispositivos para conectar las redes', '2_11'),
('Análisis del funcionamiento de las técnicas de transferencia de datos', '2_12'),
('Análisis de los tipos de topologías utilizados en el diseño de la red', '2_13'),
('Análisis del diseño e implementación de las estaciones de trabajo', '2_14'),
('Análisis del funcionamiento y la confiabilidad de los elementos de enlace físico de la red', '2_15'),
('Análisis de la confiabilidad y el funcionamiento correcto de los elementos establecidos para la expansión de la red', '2_16'),
('Análisis de la adopción de jerarquías de protocolos en la red de la empresa', '2_17'),
('Análisis del funcionamiento del modelo OIS para la red, estudiando el comportamiento de los siguientes niveles.', '2_18'),
('Análisis del funcionamiento adecuado de los protocolos x.25 para la red.', '2_19'),
('Análisis del funcionamiento adecuado de los protocolos TCP-IP (protocolo de control de transmisión – protocolo internet)', '2_20'),
('Análisis del funcionamiento de los protocolos kernel', '2_21'),
('Evaluación de la instalación física de una red', '2_22'),
('Evaluación de los elementos de expansión de la red', '2_23'),
('Evaluación de la administración y el control de la red de cómputo', '2_24'),
('Auditoria en sistemas computacionales', '2_25'),
('Análisis de la atención y solución de algunas diferencias en la operación entre redes', '2_26'),
('Apéndice C', '2_27'),
('Evaluación del uso y funcionamiento adecuado del software de la red', '2_28'),
('Levantamiento de inventarios a fin de hacer un recuento de los bienes informativos destinados al funcionamiento de la red y del área de sistemas.', '2_29'),
('Tarjeta madre del sistema', '2_30'),
('Procesador', '2_31'),
('Unidades adicionales, características, interfaz y capacidad.', '2_32'),
('Tarjetas adicionales al sistema', '2_33'),
('Periféricos externos asociados al sistema', '2_34'),
('Aprovechamiento y utilidad de cada uno de los componentes internos y periféricos del sistema', '2_35'),
('Aprovechamiento y utilidad del sistema computacional', '2_36'),
('Mantenimiento básico para los sistemas', '2_37'),
('Evaluación al sistema operativo', '3_1'),
('Evaluación de los lenguajes de desarrollo', '3_2'),
('Evaluación de los programas de desarrollo', '3_3'),
('Evaluación de los programas y paquetería de aplicación y explotación', '3_4'),
('Evaluación de la administración del software para aplicaciones', '3_5'),
('Evaluación de las utilerías para el funcionamiento del sistema', '3_6'),
('Evaluación del diseño lógico del sistema', '4_1'),
('Infraestructura y Componentes Físicos', '5_1'),
('Evaluación de Periféricos', '5_2'),
('Estandarización y Procesos', '6_1'),
('Administración y Seguridad del Almacenamiento', '6_2'),
('Verificación para la administración de los controles de seguridad del sistema computacional', '7_1'),
('Evaluación de la administración del software de la empresa', '8_1'),
('Evaluación de la configuración física del área de sistemas de la empresa', '8_2'),
('Evaluación de los aspectos técnicos del sistema', '8_3'),
('Evaluación de la administración del sistema', '8_4'),
('El levantamiento de inventarios a fin de hacer un recuento de los bienes informáticos del área de sistemas', '8_5'),
('Evaluación de los métodos de acceso, seguridad y salvaguarda de los activos informáticos del área de sistemas', '8_6'),
('Evaluación de la estructura de organización del sistema.', '8_7');
