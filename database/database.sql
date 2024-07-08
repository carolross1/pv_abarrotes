
CREATE DATABASE ng_punto_de_venta;
USE ng_punto_de_venta; 

-- Estructura de tabla para la tabla `cliente_frecuente`
--
CREATE TABLE `cliente_frecuente` (
  `id_Cliente` varchar(10) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telefono` varchar(13) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Disparadores `cliente_frecuente`
--
DELIMITER $$
CREATE TRIGGER `trg_valida_email_cliente` BEFORE INSERT ON `cliente_frecuente` FOR EACH ROW BEGIN
    DECLARE msg VARCHAR(255);
    IF NEW.email REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$' THEN
        SET msg = 'Correo electrónico válido';
    ELSE
        SET msg = 'Formato de correo electrónico inválido';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `trg_valida_telefono_cliente` BEFORE INSERT ON `cliente_frecuente` FOR EACH ROW BEGIN
    DECLARE msg VARCHAR(255);
    IF NEW.telefono REGEXP '^[0-9]{3}-[0-9]{3}-[0-9]{4}$' THEN
        SET msg = 'Teléfono válido';
    ELSE
        SET msg = 'Formato de teléfono inválido';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `corte_caja`
--

CREATE TABLE `corte_caja` (
  `id_Corte_Caja` int(11) NOT NULL,
  `id_Usuario` varchar(10) NOT NULL,
  `id_Venta_Primero` varchar(8) NOT NULL,
  `fecha_Inicio` datetime NOT NULL,
  `fecha_Termino` datetime NOT NULL,
  `total_Ventas` int(11) NOT NULL,
  `monto_Entregar` decimal(10,2) NOT NULL,
  `fecha_Corte` datetime NOT NULL,
  `id_Venta_Ultimo` varchar(8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_pedido`
--

CREATE TABLE `detalle_pedido` (
  `id_Detalle` int(11) NOT NULL,
  `id_Pedido` varchar(10) NOT NULL,
  `id_Producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_Unitario` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_reporte`
--

CREATE TABLE `detalle_reporte` (
  `id_Detalle` int(11) NOT NULL,
  `id_Producto` int(11) NOT NULL,
  `id_Reporte` int(11) NOT NULL,
  `precio_Unitario` decimal(10,2) NOT NULL,
  `pzas_Producto` int(11) NOT NULL,
  `precio_Total` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_venta`
--

CREATE TABLE `detalle_venta` (
  `id_Detalle` int(11) NOT NULL,
  `id_Venta` varchar(8) NOT NULL,
  `id_Producto` int(11) NOT NULL,
  `cant_Productos` int(11) NOT NULL,
  `precio_Unitario` decimal(10,2) NOT NULL,
  `descuento` decimal(10,2) DEFAULT NULL,
  `importe_Total` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entrega_producto`
--

CREATE TABLE `entrega_producto` (
  `id_Entrega` int(11) NOT NULL,
  `id_Usuario` varchar(10) NOT NULL,
  `id_Proveedor` int(11) NOT NULL,
  `fecha_Entrega` datetime NOT NULL,
  `id_Producto` int(11) NOT NULL,
  `cantidad_Producto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

CREATE TABLE `factura` (
  `id_Factura` int(11) NOT NULL,
  `id_Venta` varchar(8) NOT NULL,
  `RFC` varchar(13) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `estado` varchar(50) NOT NULL,
  `municipio` varchar(50) NOT NULL,
  `codigo_Postal` varchar(5) NOT NULL,
  `direccion` text NOT NULL,
  `fecha_Factura` datetime NOT NULL,
  `total` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventario`
--

CREATE TABLE `inventario` (
  `id_Inventario` int(11) NOT NULL,
  `id_Producto` int(11) NOT NULL,
  `id_Categoria` int(11) NOT NULL,
  `cantidad_Fisica` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `faltante` int(11) DEFAULT NULL,
  `sobrante` int(11) DEFAULT NULL,
  `valor_Sobrante` decimal(10,2) DEFAULT NULL,
  `valor_Faltante` decimal(10,2) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventario_categoria`
--

CREATE TABLE `inventario_categoria` (
  `id_Categoria` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido_digital`
--

CREATE TABLE `pedido_digital` (
  `id_Pedido` varchar(10) NOT NULL,
  `id_Proveedor` int(11) NOT NULL,
  `fecha_Pedido` datetime NOT NULL,
  `fecha_Entrega` datetime DEFAULT NULL,
  `total` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id_Producto` int(11) NOT NULL,
  `id_Categoria` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio_Compra` decimal(10,2) NOT NULL,
  `precio_Venta` decimal(10,2) NOT NULL,
  `utilidad` decimal(10,2) NOT NULL,
  `cantidad_Stock` int(11) NOT NULL,
  `cant_Minima` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor`
--

CREATE TABLE `proveedor` (
  `id_Proveedor` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `telefono` varchar(13) NOT NULL,
  `empresa` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Disparadores `proveedor`
--
DELIMITER $$
CREATE TRIGGER `trg_valida_telefono_proveedor` BEFORE INSERT ON `proveedor` FOR EACH ROW BEGIN
    DECLARE msg VARCHAR(255);
    IF NEW.telefono REGEXP '^[0-9]{3}-[0-9]{3}-[0-9]{4}$' THEN
        SET msg = 'Número de teléfono válido';
    ELSE
        SET msg = 'Formato de número de teléfono inválido. El formato debe ser ###-###-####';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reporte`
--

CREATE TABLE `reporte` (
  `id_Reporte` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `hora` time NOT NULL,
  `tipo_Reporte` varchar(50) NOT NULL,
  `total_Ventas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_Usuario` varchar(10) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `telefono` varchar(13) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contrasena` varchar(13) NOT NULL,
  `tipo_Usuario` varchar(50) NOT NULL,
  `intento_Fallido` int(11) DEFAULT 0,
  `ultimo_Intento` datetime DEFAULT NULL,
  `ultimo_Acceso` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Disparadores `usuario`
--
DELIMITER $$
CREATE TRIGGER `trg_valida_email_usuario` BEFORE INSERT ON `usuario` FOR EACH ROW BEGIN
    DECLARE msg VARCHAR(255);
    IF NEW.email REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$' THEN
        SET msg = 'Correo electrónico válido';
    ELSE
        SET msg = 'Formato de correo electrónico inválido';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `trg_valida_telefono_usuario` BEFORE INSERT ON `usuario` FOR EACH ROW BEGIN
    DECLARE msg VARCHAR(255);
    IF NEW.telefono REGEXP '^[0-9]{3}-[0-9]{3}-[0-9]{4}$' THEN
        SET msg = 'Teléfono válido';
    ELSE
        SET msg = 'Formato de teléfono inválido';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `venta`
--

CREATE TABLE `venta` (
  `id_Venta` varchar(18) NOT NULL,
  `id_Usuario` varchar(10) DEFAULT NULL,
  `id_Cliente` varchar(10) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `metodo_Pago` varchar(20) DEFAULT NULL,
  `total` decimal(10,2) NOT NULL,
  `caja` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cliente_frecuente`
--
ALTER TABLE `cliente_frecuente`
  ADD PRIMARY KEY (`id_Cliente`);

--
-- Indices de la tabla `corte_caja`
--
ALTER TABLE `corte_caja`
  ADD PRIMARY KEY (`id_Corte_Caja`),
  ADD KEY `id_Usuario` (`id_Usuario`),
  ADD KEY `id_Venta` (`id_Venta_Primero`),
  ADD KEY `fk_id_Venta_Ultimo` (`id_Venta_Ultimo`);

--
-- Indices de la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD PRIMARY KEY (`id_Detalle`),
  ADD KEY `id_Pedido` (`id_Pedido`),
  ADD KEY `id_Producto` (`id_Producto`);

--
-- Indices de la tabla `detalle_reporte`
--
ALTER TABLE `detalle_reporte`
  ADD PRIMARY KEY (`id_Detalle`),
  ADD KEY `id_Producto` (`id_Producto`),
  ADD KEY `id_Reporte` (`id_Reporte`);

--
-- Indices de la tabla `detalle_venta`
--
ALTER TABLE `detalle_venta`
  ADD PRIMARY KEY (`id_Detalle`),
  ADD KEY `id_Venta` (`id_Venta`),
  ADD KEY `id_Producto` (`id_Producto`);

--
-- Indices de la tabla `entrega_producto`
--
ALTER TABLE `entrega_producto`
  ADD PRIMARY KEY (`id_Entrega`),
  ADD KEY `id_Usuario` (`id_Usuario`),
  ADD KEY `id_Proveedor` (`id_Proveedor`),
  ADD KEY `id_Producto` (`id_Producto`);

--
-- Indices de la tabla `factura`
--
ALTER TABLE `factura`
  ADD PRIMARY KEY (`id_Factura`),
  ADD KEY `id_Venta` (`id_Venta`);

--
-- Indices de la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD PRIMARY KEY (`id_Inventario`),
  ADD KEY `id_Producto` (`id_Producto`),
  ADD KEY `id_Categoria` (`id_Categoria`);

--
-- Indices de la tabla `inventario_categoria`
--
ALTER TABLE `inventario_categoria`
  ADD PRIMARY KEY (`id_Categoria`);

--
-- Indices de la tabla `pedido_digital`
--
ALTER TABLE `pedido_digital`
  ADD PRIMARY KEY (`id_Pedido`),
  ADD KEY `id_Proveedor` (`id_Proveedor`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id_Producto`),
  ADD KEY `id_Categoria` (`id_Categoria`);

--
-- Indices de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  ADD PRIMARY KEY (`id_Proveedor`);

--
-- Indices de la tabla `reporte`
--
ALTER TABLE `reporte`
  ADD PRIMARY KEY (`id_Reporte`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_Usuario`),
  ADD UNIQUE KEY `telefono` (`telefono`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `uk_elementosunicos` (`telefono`,`email`);

--
-- Indices de la tabla `venta`
--
ALTER TABLE `venta`
  ADD PRIMARY KEY (`id_Venta`),
  ADD KEY `id_Usuario` (`id_Usuario`),
  ADD KEY `id_Cliente` (`id_Cliente`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  MODIFY `id_Detalle` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalle_reporte`
--
ALTER TABLE `detalle_reporte`
  MODIFY `id_Detalle` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalle_venta`
--
ALTER TABLE `detalle_venta`
  MODIFY `id_Detalle` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `entrega_producto`
--
ALTER TABLE `entrega_producto`
  MODIFY `id_Entrega` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `factura`
--
ALTER TABLE `factura`
  MODIFY `id_Factura` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `inventario`
--
ALTER TABLE `inventario`
  MODIFY `id_Inventario` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `inventario_categoria`
--
ALTER TABLE `inventario_categoria`
  MODIFY `id_Categoria` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  MODIFY `id_Proveedor` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reporte`
--
ALTER TABLE `reporte`
  MODIFY `id_Reporte` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `corte_caja`
--
ALTER TABLE `corte_caja`
  ADD CONSTRAINT `fk_id_Venta_Ultimo` FOREIGN KEY (`id_Venta_Ultimo`) REFERENCES `venta` (`id_Venta`);

--
-- Filtros para la tabla `pedido_digital`
--
ALTER TABLE `pedido_digital`
  ADD CONSTRAINT `pedido_digital_ibfk_1` FOREIGN KEY (`id_Proveedor`) REFERENCES `proveedor` (`id_Proveedor`);
COMMIT;
DESCRIBE corte_caja; 