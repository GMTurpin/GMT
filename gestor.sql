-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 05-06-2023 a las 15:29:27
-- Versión del servidor: 8.0.32
-- Versión de PHP: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gestor`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `applys`
--

DROP TABLE IF EXISTS `applys`;
CREATE TABLE IF NOT EXISTS `applys` (
  `idapply` int NOT NULL AUTO_INCREMENT,
  `cod_deleg` int DEFAULT NULL,
  `ref_emp` int DEFAULT NULL,
  `especialidad` varchar(30) DEFAULT NULL,
  `requist` tinytext,
  PRIMARY KEY (`idapply`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `applys`
--

INSERT INTO `applys` (`idapply`, `cod_deleg`, `ref_emp`, `especialidad`, `requist`) VALUES
(1, 6, 24, 'EXPERTO EN CONTROL CALIDAD', 'Experiencia en sistemas de control de calidad ISO y gestión de software avanzado para los tipos de control de retroalimentación, concurrente y predictivo              '),
(7, 12, 16, 'VISITADOR MEDICO', 'Experiencia en visitas a instituciones y personal médico. Capacidad para organizar visitas y demostraciones en grupo de funcionamiento de equipo médico. Habilidad para diseñar  o retocar catálogos de productos con imágenes de calidad              '),
(8, 13, 16, 'SECRETARIO DE DIRECCIÓN', 'Experiencia con software de gestión de citas Nuna y Docplanner. Capacidad para planificación de multiagendas para varios miembros del personal directivo y trato telefónico con directivos de hospitales          '),
(9, 14, 16, 'RECEPCIONISTA', 'Experiencia en atender central telefónica y visitas de proveedores. Canalizar llamadas de primer nivel y ocasionalmente apoyar a los guías de visitas organizadas a las instalaciones              '),
(10, 27, 18, 'AGENTE DE SEGURIDAD', 'Experiencia mínima dos años como agente de seguridad en grandes empresas. Capacidad en manejo de sistemas avanzados de alarmas con cámaras inalámbricas y sensores de movimiento              '),
(11, 28, 24, 'GESTOR DE RECURSOS HUMANOS', 'Experiencia en uso de los sistemas de reclutamiento ATS de Teamtailor y en el uso del software de recursos humanos Bizneo, Factorial o Personio. Capacidad para diseñar encuestas para candidatos con software tipo SurveyMonkey              '),
(12, 21, 37, 'PROGRAMADOR ANALISTA', 'Experiencia en uso de software de análisis de datos y en ciberseguridad de hardware, de software y de redes. Manejo de software preventivo contra malware y experiencia en implantación de módulos de choque contra espionaje industrial             '),
(13, 24, 37, 'ASISTENTE DE COMPRAS', 'Ayudante para jefe de compras, familiarizado con el campo de la seguridad informática. Trato con proveedores del gremio y conocedor de los sistemas de negociación por subasta y por asignación de lotes.              '),
(16, 18, 27, 'RESPONSABLE LOGÍSTICA', 'Experiencia con software TMS tipo Urbantz o Cargoson. Conocimiento en preparación de documentación del Conocimiento de Embarque Multimodal FBL, de embarque marítimo (Bill of Lading) y cartas de porte por carretera (CMR) y porte ferroviario (CIM)       '),
(17, 25, 18, 'DISEÑO GRAFICO', 'Experiencia en manejo de software de diseño gráfico con InDesign, Illustrator y otro software de diseño vectorial y por capas. Experiencia en diseño de pancartas de gran tamaño así como logos distintivos para empresas             '),
(18, 18, 27, 'AGENTE DE SEGURIDAD', 'Experiencia mínima dos años como agente de seguridad en grandes empresas. Capacidad en manejo de sistemas avanzados de alarmas con cámaras inalámbricas y sensores de movimiento. Aportar referencias comprobables                  '),
(19, 16, 27, 'CONDUCTOR PROFESIONAL', 'Conductor de grandes camiones con remolque. Capacidad para reparaciones básicas de motor. Experiencia en sistemas de comunicaciones en ruta              '),
(20, 32, 32, 'RESPONSABLE MANTENIMIENTO', 'Experiencia en mantenimiento de maquinaria industrial relacionada con producción textil. Conocimiento de productos usados en mantenimiento y experiencia en trato con proveedores              '),
(21, 32, 32, 'CONTROL DE CALIDAD', 'Profesional autorizado a emitir certificados de control de calidad ISO para la producción textil de la fábrica. Capacitado para revisar y controlar procesos de producción para que se ajusten a los requisitos de la norma ISO             ');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `delegs`
--

DROP TABLE IF EXISTS `delegs`;
CREATE TABLE IF NOT EXISTS `delegs` (
  `cod` int NOT NULL AUTO_INCREMENT,
  `ref` int DEFAULT NULL,
  `poblacion` varchar(45) DEFAULT NULL,
  `direccion` varchar(45) DEFAULT NULL,
  `email` varchar(35) DEFAULT NULL,
  `telefono` int DEFAULT NULL,
  `contacto` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`cod`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `delegs`
--

INSERT INTO `delegs` (`cod`, `ref`, `poblacion`, `direccion`, `email`, `telefono`, `contacto`) VALUES
(6, 24, 'VALENCIA', 'Polígono Almanzor, parcela 127H', 'poltekvalencia@poltek.com', 964625644, 'Sonia Abengoa'),
(7, 24, 'MALAGA', 'Polígono Ind. Las Palmeras, Nave 47J', 'poltekmalaga@poltek.com', 956524832, 'Alicia Lojambio'),
(12, 16, 'MADRID', 'Poligono S Sebastian de los Reyes, Nave 45', 'tekmadrid@tekmedical.com', 914824436, 'Mariano Ledesma'),
(13, 16, 'BARCELONA', 'Zona Franca Poble Nou, sector 268', 'tekbarc@tekmedical.com', 936423869, 'Gerard Masnou'),
(14, 16, 'BILBAO', 'Avenida Lehendakari Aguirre, 123-Bajos', 'tekbilbao@tekmedical.com', 944626109, 'Aitor Mendizábal'),
(15, 27, 'MADRID', 'Poligono San Sebastian de los Reyes, Nave 165', 'trhmadrid@transholding.com', 910023623, 'Jose Luis Llamazares'),
(16, 27, 'MALAGA', 'Polígono Ind. Las Palmeras, Nave 52G', 'trhmalaga@transholding.com', 956524891, 'Secundino Latorre'),
(18, 27, 'VALENCIA', 'Poligono Ind. Sagunto, Nave 23', 'trhvalencia@transholding.com', 964627982, 'Lucas Postigo'),
(21, 37, 'BILBAO', 'Alameda San Mamés, 40- bajos', 'ciberbilbao@ciberworks.com', 944697855, 'Aitana Mendieta'),
(24, 37, 'MALAGA', 'Avenida Las Américas, 36-ático', 'cibermalaga@ciberworks.com', 952364696, 'Zulema Montero'),
(25, 18, 'SEVILLA', 'Polígono Ind. La Taconera, nave 112', 'fabersevilla@faberglass.com', 954632655, 'Guadalupe Mestalla'),
(26, 18, 'MALAGA', 'Polígono Ind. Alhaurín de la Torre, C3', 'fabermalaga@faberglass.com', 952461850, 'Mariana Losada'),
(27, 18, 'CASTELLÓN', 'Polígono Ind. Sant Llorenç nave 48C', 'fabercastellon@faberglass.com', 964225639, 'Arturo Rosens'),
(28, 24, 'IRUN', 'Polígono Industrial Mendibil, calle G nave 27', 'poltekirun@poltek.com', 943201326, 'Joseba Mendieta'),
(29, 48, 'BARCELONA', 'Zona Industrial Rambla Norte, nave 231', 'databarc@datacorp.com', 934858300, 'Joan Mascarell'),
(30, 48, 'SAN SEBASTIAN', 'Askatasuna hiribidea, 113-bajos', 'datasseb@datacorp.com', 943608974, 'Iker Garmendia'),
(31, 32, 'BILBAO', 'Polígono Erausketa, calle F, nave 36', 'polarbilbao@polartex.com', 944626325, 'Daniel Irureta'),
(32, 32, 'BARCELONA', 'Polígono Poble Nou, nave 43H', 'polarbarc@polartex.com', 934685532, 'Joan Manuel Miró');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `deptos`
--

DROP TABLE IF EXISTS `deptos`;
CREATE TABLE IF NOT EXISTS `deptos` (
  `cod` int NOT NULL AUTO_INCREMENT,
  `Ref` int NOT NULL,
  `depto` varchar(30) DEFAULT NULL,
  `Responsable` varchar(40) DEFAULT NULL,
  `Telefono` int DEFAULT NULL,
  PRIMARY KEY (`cod`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `deptos`
--

INSERT INTO `deptos` (`cod`, `Ref`, `depto`, `Responsable`, `Telefono`) VALUES
(14, 24, 'COMPRAS', 'Julián Gómez', 934625647),
(15, 48, 'COMPRAS', 'Luciano Menéndez', 944623871),
(16, 48, 'AT CLIENTE', 'Alvaro Meneses', 936528993),
(17, 48, 'SEGURIDAD', 'Sara Mayoral', 936524872),
(18, 48, 'SOFTWARE', 'Ian McGregor', 936520484),
(19, 48, 'RECURSOS HUMANOS', 'Alec Trevanian', 936524725),
(20, 24, 'AT CLIENTE', 'Alberto Mendiola', 936524875),
(21, 24, 'SEGURIDAD', 'Aitana Lekumberri', 944623839),
(22, 24, 'LABORATORIO', 'Rosa María Zugastieta', 934624480),
(23, 24, 'RECURSOS HUMANOS', 'Roberto Magallán', 935624891),
(24, 24, 'INVESTIGACION Y DESARROLLO', 'Norbert Sorensen', 934425517),
(25, 16, 'CONTROL CALIDAD', 'Julio Lafuentes', 956423866),
(26, 16, 'SEGURIDAD', 'Mirna Costelo', 956423869),
(27, 16, 'INVESTIGACION Y DESARROLLO', 'Lucas Menendez', 956423871),
(28, 16, 'PROVEEDORES', 'Mario Solaguren', 644685975),
(29, 27, 'RUTAS', 'Jorge Salazar', 654023487),
(30, 27, 'MECANICA', 'Juan Antonio Tesina', 640023623),
(31, 27, 'COMBUSTIBLES', 'Joaquín Camaleño', 640023528),
(32, 27, 'MENSAJERIA', 'Almudena Suárez', 640023635),
(33, 27, 'AT CLIENTE', 'Martin Solozábal', 640232439),
(34, 27, 'RECURSOS HUMANOS', 'Mario Cambises', 934443266),
(35, 37, 'SEGURIDAD', 'Daniel Montesinos', 943456689),
(36, 37, 'COMPRAS', 'Ainhoa Zurimendi', 943456692),
(37, 37, 'SOFTWARE', 'Donald Stephenson', 943456698),
(38, 37, 'RECURSOS HUMANOS', 'Jorge Mitxelena', 943456602),
(39, 37, 'PROVEEDORES', 'Marta Maldonado', 943456604),
(40, 32, 'MATERIAS PRIMAS', 'Juan Angel Elorriaga', 944626105),
(41, 32, 'ALMACEN Y DEPOSITO', 'Félix Lopetegui', 944626108),
(42, 32, 'SEGURIDAD', 'José Luis Mendizábal', 944626106),
(43, 32, 'AT CLIENTE', 'Ainara Lekumberri', 944626110),
(44, 32, 'CONTROL E CALIDAD', 'Maialen Goenaga', 944626123),
(45, 18, 'AT CLIENTE', 'Jorge Sandoval', 914423589),
(46, 18, 'INVESTIGACION Y DESARROLLO', 'Silvia Solozábal', 914423566),
(47, 18, 'RECURSOS HUMANOS', 'José Ramón Mascarell', 914423580),
(48, 18, 'SEGURIDAD', 'Gonzalo Santana', 914423581),
(49, 18, 'SOFTWARE', 'Aitor Olamendieta', 914423588);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresas`
--

DROP TABLE IF EXISTS `empresas`;
CREATE TABLE IF NOT EXISTS `empresas` (
  `Ref` int NOT NULL,
  `Empresa` varchar(40) DEFAULT NULL,
  `NIF` varchar(9) DEFAULT NULL,
  `Director` varchar(40) DEFAULT NULL,
  `Telefono` int DEFAULT NULL,
  `email` varchar(40) DEFAULT NULL,
  `Actividad` tinytext,
  `password` tinyblob,
  PRIMARY KEY (`Ref`),
  UNIQUE KEY `Ref_UNIQUE` (`Ref`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `empresas`
--

INSERT INTO `empresas` (`Ref`, `Empresa`, `NIF`, `Director`, `Telefono`, `email`, `Actividad`, `password`) VALUES
(16, 'TEKMEDICAL', 'A95462890', 'Guillaume Dubois', 956423897, 'tekmed@tekmedical.eu', 'Fabricación y comercialización de equipo médico especializado. Equipamiento para hospitales y uniformes para profesionales de la medicina', 0x54454b3236304c),
(18, 'FABERGLASS', 'G96758236', 'Gunter Friedman', 914423587, 'faber@faberglass.de', 'Fabricación de envases de metacrilato con diferentes especificaciones y calidad ISO homologada. Laboratorio de personalización por colores y tramas mediante las técnicas más avanzadas de selección y combinación de plantillas digitales', 0x4641424552383735),
(24, 'POLTEK', 'A98150623', 'Roberto Mendoza', 934625641, 'poltek@poltekgroup.com', 'Producción de envases para uso en laboratorios y para transporte de material biológico. Fabricación de accesorios para equipos de pruebas analíticas', 0x50544b3633315843),
(27, 'TRANSHOLDING', 'B53467225', 'Alonso Cardenas', 964528794, 'trans@trholding.uk', 'Control de logística y transporte internacional. Contratación de mensajería y material para envíos y paqueteria', 0x5452414e5338373548),
(32, 'POLARTEX', 'A41722896', 'Juan Angel Celimendi', 954632638, 'polartex@grouppolar.com', 'Producción de prendas de trabajo aptas para trabajar en condiciones extremas. Equipo industrial adaptado para labores en entornos agresivos', 0x504f4c3336355458),
(37, 'CIBERWORKS S A', 'B93497201', 'Alan Reynolds', 679428032, 'ciberworks@groupciber.com', 'Empresa de seguridad informática y desarrollo de aplicaciones de protección industrial y prevención de espionaje industrial y empresarial', 0x4349424552323536),
(48, 'DATACORP', 'A93250169', 'Mark Kaufer', 936524877, 'datacorp@dataempress.com', 'Análisis de datos y programación de sistemas de IA personalizados. Personalización de software y desarrollo de aplicaciones móviles', 0x4441543235364350),
(49, 'IRONSTEEL SA', 'B78963450', 'Donald Carpenter', 945652318, 'iron@groupsteel.de', 'Producción de planchas de acero y piezas metálicas para ensamblajes en navegación marítima y aérea. Diseño y fabricación de moldes de cerámica, estructuras de titanio y contenedores estancos de metales ligeros', 0x49524f4e533439);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entrevistas`
--

DROP TABLE IF EXISTS `entrevistas`;
CREATE TABLE IF NOT EXISTS `entrevistas` (
  `ident` int NOT NULL AUTO_INCREMENT,
  `idmarca` int DEFAULT NULL,
  `codprof` int DEFAULT NULL,
  `cod_deleg` int DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `hora` varchar(5) DEFAULT NULL,
  `estado` enum('WAIT','ACEPTO','RECHAZO') DEFAULT NULL,
  PRIMARY KEY (`ident`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `entrevistas`
--

INSERT INTO `entrevistas` (`ident`, `idmarca`, `codprof`, `cod_deleg`, `fecha`, `hora`, `estado`) VALUES
(1, 11, 8, 24, '2023-05-15', '10:30', 'ACEPTO'),
(2, 5, 3, 13, '2023-05-16', '17:00', 'WAIT'),
(3, 12, 8, 14, '2023-05-16', '17:00', 'RECHAZO'),
(4, 3, 5, 27, '2023-05-29', '10:00', 'WAIT'),
(5, 9, 6, 27, '2023-05-29', '10:30', 'WAIT'),
(6, 7, 6, 28, '2023-05-25', '17:00', 'WAIT'),
(7, 2, 2, 6, '2023-05-24', '10:30', 'WAIT'),
(8, 1, 4, 18, '2023-05-24', '16:30', 'WAIT'),
(9, 14, 2, 32, '2023-05-26', '11:30', 'WAIT');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marcas`
--

DROP TABLE IF EXISTS `marcas`;
CREATE TABLE IF NOT EXISTS `marcas` (
  `idmarca` int NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `codprof` int DEFAULT NULL,
  `codapply` int DEFAULT NULL,
  `cod_deleg` int DEFAULT NULL,
  `codemp` int DEFAULT NULL,
  `estado` enum('WAIT','SI','NO') DEFAULT NULL,
  PRIMARY KEY (`idmarca`),
  UNIQUE KEY `idmarca_UNIQUE` (`idmarca`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `marcas`
--

INSERT INTO `marcas` (`idmarca`, `fecha`, `codprof`, `codapply`, `cod_deleg`, `codemp`, `estado`) VALUES
(1, '2023-04-13', 4, 16, 18, 27, 'SI'),
(2, '2023-04-13', 2, 1, 6, 24, 'SI'),
(3, '2023-04-15', 5, 10, 27, 18, 'SI'),
(4, '2023-04-15', 1, 17, 25, 18, 'WAIT'),
(5, '2023-04-15', 3, 8, 13, 16, 'SI'),
(6, '2023-04-15', 3, 9, 14, 16, 'NO'),
(7, '2023-04-15', 6, 11, 28, 24, 'SI'),
(8, '2023-05-02', 7, 12, 21, 37, 'NO'),
(9, '2023-05-11', 6, 10, 27, 18, 'SI'),
(10, '2023-05-11', 8, 8, 13, 16, 'NO'),
(11, '2023-05-11', 8, 13, 24, 37, 'SI'),
(12, '2023-05-11', 8, 9, 14, 16, 'SI'),
(13, '2023-05-22', 4, 19, 16, 27, 'NO'),
(14, '2023-05-23', 2, 21, 32, 32, 'SI'),
(15, '2023-05-23', 9, 10, 27, 18, 'WAIT'),
(16, '2023-05-23', 9, 16, 18, 27, 'WAIT'),
(17, '2023-05-23', 9, 18, 18, 27, 'WAIT'),
(18, '2023-05-23', 9, 20, 32, 32, 'WAIT');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesionales`
--

DROP TABLE IF EXISTS `profesionales`;
CREATE TABLE IF NOT EXISTS `profesionales` (
  `cod_prof` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) DEFAULT NULL,
  `email_prof` varchar(40) DEFAULT NULL,
  `telefono` int DEFAULT NULL,
  `poblacion` varchar(45) DEFAULT NULL,
  `nif_prof` varchar(9) DEFAULT NULL,
  `password` tinyblob,
  `experiencia` mediumtext,
  PRIMARY KEY (`cod_prof`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='	';

--
-- Volcado de datos para la tabla `profesionales`
--

INSERT INTO `profesionales` (`cod_prof`, `nombre`, `email_prof`, `telefono`, `poblacion`, `nif_prof`, `password`, `experiencia`) VALUES
(1, 'Lucas Maldonado', 'lucmaldo@gmail.com', 622465027, 'MADRID', '16578025G', 0x4c554330323547, 'Formado en curso plataforma MOOC en Diseño Gráfico con manejo de software Illustrator y diseño vectorial.\nTrabajo 3 años en equipo de desarrollo de logos empresariales y marcas comerciales con patente.'),
(2, 'Mario Guardiola', 'mgdiola@uldeco.com', 649523788, 'VALENCIA', '18570369L', 0x4d415236394c, '- 4 años en departamento de Control de Calidad de empresa productora de envases para alimentación\n- Certificado como inspector de calidad ISO\n- Formado en tipos de control de retroalimentación y predictivo'),
(3, 'Alberto Marichalar', 'marichalarbm@gmail.com', 627852970, 'BARCELONA', '14840252C', 0x4d4c4152353243, '- 4 años como secretario de dirección en empresa farmaceutica\n- Experiencia con software de gestión de citas Docplanner\n- Planificación de multiagendas de diferentes miembros de la directiva\n- Trato directo con personal de hospitales y clínicas para organizar eventos y seminarios                  '),
(4, 'Armando Legutiano', 'arlegutiano@gmail.com', 639528471, 'BILBAO', '25618743H', 0x41524c343348, '- 3 años como responsable de logística en empresa de transporte internacional\n- Organización de rutas y gestión de la documentación CMR para distintos países de destino\n- Autorización especial para transporte mercancías ligeras (MDL) y de mercancías pesadas (MDP)\n                  '),
(5, 'Eduardo Falcones', 'edfalcon@jazztel.com', 659423110, 'CASTELLÓN', '13560482J', 0x46414c4338324a, 'Activo 4 años en empresa de seguridad como agente de puesto y 3 años como responsable de equipo.\nConfiguración de cámaras inalámbricas con sistemas de grabación y sensores de movimiento perimetral.\nTitulación por curso Euroinnova en seguridad privada '),
(6, 'Javier Laguardia', 'jlguardiamer@worklab.com', 642910322, 'SAN SEBASTIAN', '12600582M', 0x4a4c4138324d, 'Formado en academia presencial con titulación en sistema ATS de Teamtailor y trabajo en equipo 3 años con software Bizneo y Personio.\nDiseño de encuestas de perfil psicológico para candidatos a puestos directivos y de responsables de proyecto.'),
(7, 'Santiago Carmona', 'santcarmona@jazztel.es', 658432444, 'BILBAO', '14762590K', 0x53414e5439304b, 'Experiencia de 8 años en programación con diferentes lenguajes de alto nivel y tester de aplicaciones. Trabajo en equipo en instalación de redes para grandes empresas y entidades bancarias, incluyendo configuración de firewall y diversas medidas de seguridad preventiva contra espionaje industrial'),
(8, 'Laura Soldevilla', 'soldemar@gmail.com', 654442338, 'BILBAO', '13255870H', 0x4c4155373048, '- Experiencia de 5 años en atender central telefónica en empresa de fabricación de productos médicos.\n- Atención a proveedores y gestión de cobros y financiación de bancos\n- Trabajo 3 años en Departamento de Compras como secretaria del director del departamento.'),
(9, 'Esteban Casasola', 'estcasola@jazztel.com', 648432591, 'LLEIDA', '12369810Q', 0x455354313051, '- Experiencia de 5 años como agente en empresa de seguridad\n- Experiencia de 3 años como responsable de mantenimiento en empresa de transporte y 2 años más en dicha empresa como auxiliar adjunto al responsable de logística');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
