-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-04-2024 a las 03:31:05
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `farmacia`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estados_turnos`
--

CREATE TABLE `estados_turnos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estados_turnos`
--

INSERT INTO `estados_turnos` (`id`, `nombre`) VALUES
(1, 'ESPERA'),
(2, 'ATENDIENDO'),
(3, 'CERRADO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL,
  `baja` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `puesto`
--

CREATE TABLE `puesto` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `estado` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tramites`
--

CREATE TABLE `tramites` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `requisitos` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tramites`
--

INSERT INTO `tramites` (`id`, `nombre`, `descripcion`, `requisitos`) VALUES
(1, 'PREPAGA', 'PREPAGA', 'CREDENCIAL ONLINE \r\nDOBLE RECETA'),
(2, 'PARTICULAR', 'SIN COBERTURA', 'SOLO EFECTIVO'),
(3, 'PAMI', 'DOBLE RECETA', 'CARNET'),
(4, 'PRIORIDAD', 'JUBILADOS SIN COBERTURA', 'ACREDITAR');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `turnos`
--

CREATE TABLE `turnos` (
  `id` int(11) NOT NULL,
  `tramite_id` int(11) NOT NULL,
  `dia_semana` varchar(20) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `estado_id` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `puesto_id` int(30) DEFAULT NULL,
  `comentario` text DEFAULT NULL,
  `horafin` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `turnos`
--

INSERT INTO `turnos` (`id`, `tramite_id`, `dia_semana`, `fecha`, `hora`, `estado_id`, `usuario_id`, `puesto_id`, `comentario`, `horafin`) VALUES
(310, 1, 'martes', '2023-08-23', '23:52:50', 1, 1, 1, ' ', '00:00:00'),
(311, 2, 'lunes', '2023-08-28', '19:08:11', 1, 1, 1, ' ', '00:00:00'),
(312, 1, 'viernes', '2023-09-01', '15:44:54', 1, 1, 1, ' ', '00:00:00'),
(313, 4, 'viernes', '2023-09-01', '15:45:18', 1, 1, 1, ' ', '00:00:00'),
(314, 3, 'viernes', '2023-09-01', '15:45:28', 1, 1, 1, ' ', '00:00:00'),
(315, 1, 'domingo', '2024-04-29', '21:49:48', 1, 1, 1, ' ', '00:00:00'),
(316, 2, 'domingo', '2024-04-29', '21:50:06', 1, 1, 1, ' ', '00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_sistema`
--

CREATE TABLE `usuarios_sistema` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `dni` int(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `baja` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios_sistema`
--

INSERT INTO `usuarios_sistema` (`id`, `nombre`, `apellido`, `dni`, `password`, `baja`) VALUES
(1, 'PUESTO', '1', 1, '1', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `estados_turnos`
--
ALTER TABLE `estados_turnos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `puesto`
--
ALTER TABLE `puesto`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tramites`
--
ALTER TABLE `tramites`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `turnos`
--
ALTER TABLE `turnos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios_sistema`
--
ALTER TABLE `usuarios_sistema`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `estados_turnos`
--
ALTER TABLE `estados_turnos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `puesto`
--
ALTER TABLE `puesto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tramites`
--
ALTER TABLE `tramites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `turnos`
--
ALTER TABLE `turnos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=317;

--
-- AUTO_INCREMENT de la tabla `usuarios_sistema`
--
ALTER TABLE `usuarios_sistema`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
