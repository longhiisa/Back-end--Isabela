-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema bela
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema bela
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bela` DEFAULT CHARACTER SET utf8 ;
USE `bela` ;

-- -----------------------------------------------------
-- Table `bela`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bela`.`usuario` (
  `idusuario` INT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `Senha` VARCHAR(200) NOT NULL,
  `endereço` VARCHAR(45) NOT NULL,
  `cpf` CHAR(14) NOT NULL,
  `telefone` VARCHAR(18) NULL,
  PRIMARY KEY (`idusuario`),
  UNIQUE INDEX `cpf_UNIQUE` (`cpf` ASC) VISIBLE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
