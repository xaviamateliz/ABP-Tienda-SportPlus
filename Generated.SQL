/*
Created: 18/05/2026
Modified: 18/05/2026
Model: MySQL 8.0
Database: MySQL 8.0
*/

-- Create tables section -------------------------------------------------

-- Table Roles

CREATE TABLE `Roles`
(
  `rol_id` Smallint NOT NULL,
  `nombre_rol` Varchar(50) NOT NULL
)
;

ALTER TABLE `Roles` ADD PRIMARY KEY (`rol_id`)
;

-- Table pedidos

CREATE TABLE `pedidos`
(
  `pedido_id` Smallint NOT NULL,
  `usuario_id` Smallint NOT NULL,
  `fecha_pedido` Datetime(9) NOT NULL,
  `total` Decimal(18,2) NOT NULL,
  `direccion_envio` Varchar(255) NOT NULL,
  `poblacion_envio` Varchar(20) NOT NULL,
  `provincia_envio` Varchar(20) NOT NULL,
  `codigo_postal_envio` Varchar(10) NOT NULL
)
;

CREATE INDEX `IX_Relationship9` ON `pedidos` (`usuario_id`)
;

ALTER TABLE `pedidos` ADD PRIMARY KEY (`pedido_id`)
;

-- Table usuarios

CREATE TABLE `usuarios`
(
  `usuario_id` Smallint NOT NULL,
  `login` Varchar(50) NOT NULL,
  `password` Text NOT NULL,
  `fecha_alta` Datetime(9),
  `nombre` Varchar(50) NOT NULL,
  `apellido` Varchar(50) NOT NULL,
  `dni` Varchar(15) NOT NULL,
  `direccion` Text NOT NULL,
  `telefono` Varchar(20) NOT NULL,
  `poblacion` Varchar(50) NOT NULL,
  `provincia` Varchar(50) NOT NULL,
  `codigo_postal` Smallint NOT NULL,
  `rol_id` Smallint
)
;

CREATE INDEX `IX_Relationship8` ON `usuarios` (`rol_id`)
;

ALTER TABLE `usuarios` ADD PRIMARY KEY (`usuario_id`)
;

ALTER TABLE `usuarios` ADD UNIQUE `Attribute2` (`login`)
;

-- Table lineas_pedido

CREATE TABLE `lineas_pedido`
(
  `producto_id` Smallint NOT NULL,
  `pedido_id` Smallint NOT NULL,
  `cantidad` Smallint NOT NULL,
  `lineas_pedido_id` Smallint NOT NULL,
  `precio_unitario` Decimal(18,2) NOT NULL
)
;

ALTER TABLE `lineas_pedido` ADD PRIMARY KEY (`producto_id`, `pedido_id`)
;

-- Table productos

CREATE TABLE `productos`
(
  `producto_id` Smallint NOT NULL,
  `nombre` Varchar(50) NOT NULL,
  `descripcion` Text,
  `precio` Decimal(18,2) NOT NULL,
  `stock` Smallint NOT NULL,
  `categoria_id` Smallint
)
;

CREATE INDEX `IX_Relationship6` ON `productos` (`categoria_id`)
;

ALTER TABLE `productos` ADD PRIMARY KEY (`producto_id`)
;

-- Table categorias

CREATE TABLE `categorias`
(
  `categoria_id` Smallint NOT NULL,
  `nombre` Varchar(50) NOT NULL
)
;

ALTER TABLE `categorias` ADD PRIMARY KEY (`categoria_id`)
;

-- Create foreign keys (relationships) section -------------------------------------------------

ALTER TABLE `usuarios` ADD CONSTRAINT `1:N` FOREIGN KEY (`rol_id`) REFERENCES `Roles` (`rol_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE `lineas_pedido` ADD CONSTRAINT `1:N` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`pedido_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE `productos` ADD CONSTRAINT `N:1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`categoria_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE `lineas_pedido` ADD CONSTRAINT `1:N` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`producto_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE `pedidos` ADD CONSTRAINT `1:N` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

