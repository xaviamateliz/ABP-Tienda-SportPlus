/*
Created: 18/05/2026
Modified: 28/05/2026
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
  `estado_pagado` Bool NOT NULL,
  `estado_pedido` Char(20) NOT NULL
)
;

CREATE INDEX `IX_Relationship5` ON `pedidos` (`usuario_id`)
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
  `categoria_id` Smallint,
  `id_tipo_producto` Int
)
;

CREATE INDEX `IX_Relationship6` ON `productos` (`categoria_id`)
;

CREATE INDEX `IX_Relationship10` ON `productos` (`id_tipo_producto`)
;

ALTER TABLE `productos` ADD PRIMARY KEY (`producto_id`)
;

-- Table deportes

CREATE TABLE `deportes`
(
  `categoria_id` Smallint NOT NULL,
  `nombre` Varchar(50) NOT NULL
)
;

ALTER TABLE `deportes` ADD PRIMARY KEY (`categoria_id`)
;

-- Table tipos_producto

CREATE TABLE `tipos_producto`
(
  `id_tipo_producto` Int NOT NULL AUTO_INCREMENT,
  `nombre` Varchar(100) NOT NULL,
  PRIMARY KEY (`id_tipo_producto`)
)
;

-- Create foreign keys (relationships) section -------------------------------------------------

ALTER TABLE `usuarios` ADD CONSTRAINT `1:N` FOREIGN KEY (`rol_id`) REFERENCES `Roles` (`rol_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE `pedidos` ADD CONSTRAINT `1:N` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE `lineas_pedido` ADD CONSTRAINT `N:1` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`pedido_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE `productos` ADD CONSTRAINT `1:N` FOREIGN KEY (`categoria_id`) REFERENCES `deportes` (`categoria_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE `lineas_pedido` ADD CONSTRAINT `1:N` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`producto_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE `productos` ADD CONSTRAINT `1:N` FOREIGN KEY (`id_tipo_producto`) REFERENCES `tipos_producto` (`id_tipo_producto`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

