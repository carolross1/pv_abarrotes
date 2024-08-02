

DROP DATABASE ng_punto_de_venta;


CREATE DATABASE ng_punto_de_venta;
USE ng_punto_de_venta; 


-- Crea la tabla Categoria //YA ESTA CORRECTA
CREATE TABLE categoria (
    id_Categoria INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
ALTER TABLE categoria
ADD CONSTRAINT unique_nombre UNIQUE (nombre);


-- Crea la tabla Producto //YA ESTA CORRECTA
CREATE TABLE producto (
    id_Producto INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    id_Categoria INT NOT NULL,
    precio_Compra DECIMAL(10, 2) NOT NULL,
    precio_Venta DECIMAL(10, 2) NOT NULL,
    utilidad DECIMAL(10, 2) AS (precio_Venta - precio_Compra) STORED,
    cantidad_Stock INT NOT NULL,
    cant_Minima INT NOT NULL,
    codigo_barras INT NOT NULL UNIQUE,
     CONSTRAINT fk_categoria FOREIGN KEY (id_Categoria) REFERENCES Categoria(id_Categoria)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Estructura de tabla para la tabla `usuario`

CREATE TABLE `usuario` (
  `id_Usuario` varchar(10) NOT NULL PRIMARY KEY ,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `telefono` varchar(13) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contrasena` varchar(13) NOT NULL,
  `tipo_Usuario` varchar(50) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Estructura de tabla para la tabla `corte_caja`
--YA ESTA CORRECTA
CREATE TABLE `corte_caja` (
      `id_Corte_Caja` int(11) NOT NULL PRIMARY KEY,
     `id_Usuario` varchar(10) NOT NULL,
    `fecha_Inicio` datetime NOT NULL,
    `monto_Inicio` int  NOT NULL,
   CONSTRAINT fk_Usuario FOREIGN KEY (id_Usuario) REFERENCES Usuario(id_Usuario)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- Estructura de tabla para la tabla `venta`
CREATE TABLE `venta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_Venta` varchar(8) NOT NULL,
  `id_Usuario` varchar(10) NOT NULL,
  `fecha` datetime NOT NULL,
  `metodo_Pago` varchar(50) NOT NULL,
  `caja` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_Venta` (`id_Venta`),
  KEY `id_Usuario` (`id_Usuario`),
  CONSTRAINT `venta_ibfk_1` FOREIGN KEY (`id_Usuario`) REFERENCES `usuario` (`id_Usuario`)      
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Estructura de tabla para la tabla `detalle_venta`

CREATE TABLE `detalle_venta` (
  `id_Detalle` int(11) NOT NULL AUTO_INCREMENT ,
  `id_Venta` varchar(8) NOT NULL,
  `id_Producto` int(11) NOT NULL,
  `descuento` decimal(10,2) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_Detalle`),
  KEY `id_Producto` (`id_Producto`),
  KEY `detalle_venta_ibfk_1` (`id_Venta`),
  CONSTRAINT `detalle_venta_ibfk_1` FOREIGN KEY (`id_Venta`) REFERENCES `venta` (`id_Venta`),   
  CONSTRAINT `detalle_venta_ibfk_2` FOREIGN KEY (`id_Producto`) REFERENCES `producto` (`id_Producto`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Estructura de tabla para la tabla `factura`
--

CREATE TABLE `factura` (
  `id_Factura` int(11) NOT NULL AUTO_INCREMENT ,
  `id_Venta` varchar(8) NOT NULL,
  `RFC` varchar(13) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `estado` varchar(50) NOT NULL,
  `municipio` varchar(50) NOT NULL,
  `codigo_Postal` varchar(5) NOT NULL,
  `direccion` text NOT NULL,
  `fecha_Factura` datetime NOT NULL,
  `total` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id_Factura`),
  FOREIGN KEY (`id_Venta`) REFERENCES `venta`(`id_Venta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `factura`
ADD CONSTRAINT `unique_id_Venta`
UNIQUE (`id_Venta`);


-- Crear la tabla `Inventario`
CREATE TABLE `inventario` (
  `id_Inventario` INT AUTO_INCREMENT NOT NULL ,
  `id_Usuario` VARCHAR(10) NOT NULL,
  `Fecha_Inicio` DATETIME NOT NULL,
  `Fecha_Termino` DATETIME NOT NULL,
  PRIMARY KEY (`id_Inventario`),
  FOREIGN KEY (`id_Usuario`) REFERENCES `usuario`(`id_Usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Crear la tabla `Detalle_Inventario`
CREATE TABLE `detalle_inventario` (
  `id_Inventario` INT NOT NULL,
  `id_Producto` INT NOT NULL,
  `cantidad_Fisica` INT NOT NULL,
  FOREIGN KEY (`id_Inventario`) REFERENCES `Inventario`(`id_Inventario`),
  FOREIGN KEY (`id_Producto`) REFERENCES `producto`(`id_Producto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `cliente_frecuente` (
  `id_Cliente` INT AUTO_INCREMENT NOT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `apellidos` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) UNIQUE,
  `telefono` VARCHAR(13) NOT NULL UNIQUE,
  PRIMARY KEY (`id_Cliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `venta_cliente_frecuente` (
  `id_Cliente` INT NOT NULL,
  `id_Venta` VARCHAR(8) NOT NULL,
  PRIMARY KEY (`id_Cliente`, `id_Venta`),
  FOREIGN KEY (`id_Cliente`) REFERENCES `cliente_frecuente`(`id_Cliente`),
  FOREIGN KEY (`id_Venta`) REFERENCES `venta`(`id_Venta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `proveedor` (
  `id_Proveedor` INT AUTO_INCREMENT NOT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `apellidos` VARCHAR(100) NOT NULL,
  `telefono` VARCHAR(13) NOT NULL UNIQUE,
  `empresa` VARCHAR(100),
  PRIMARY KEY (`id_Proveedor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--Producto
USE ng_punto_de_venta;

INSERT INTO producto (nombre, id_Categoria, precio_Compra, precio_Venta, cantidad_Stock, cant_Minima, codigo_barras)
VALUES ('Producto Ejemplo', 1, 100.00, 150.00, 50, 5, 123456789);

























































-----no se aun 
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
