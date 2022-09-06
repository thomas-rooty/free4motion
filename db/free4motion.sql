-- MySQL Script generated by MySQL Workbench
-- Mon Sep  5 11:03:42 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema free4motion
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema free4motion
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `free4motion` DEFAULT CHARACTER SET utf8 ;
USE `free4motion` ;

-- -----------------------------------------------------
-- Table `free4motion`.`Vehicule`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `free4motion`.`Vehicule` ;

CREATE TABLE IF NOT EXISTS `free4motion`.`Vehicule` (
  `idVehicule` INT(11) NOT NULL AUTO_INCREMENT,
  `marque` VARCHAR(45) NULL DEFAULT NULL,
  `nSerie` VARCHAR(45) NULL DEFAULT NULL,
  `couleur` VARCHAR(45) NULL DEFAULT NULL,
  `plaque` VARCHAR(45) NULL DEFAULT NULL,
  `totalKm` INT(11) NULL DEFAULT NULL,
  `dateAchat` DATETIME NULL DEFAULT NULL,
  `prixAchat` INT(11) NULL DEFAULT NULL,
  `modele` VARCHAR(45) NULL DEFAULT NULL,
  `type` VARCHAR(45) NULL DEFAULT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `image` VARCHAR(255) NULL DEFAULT NULL,
  `state` INT(11) NULL DEFAULT 0,
  `agence` INT(255) NOT NULL COMMENT '0 = Paris, 1 = Lyon',
  PRIMARY KEY (`idVehicule`),
  UNIQUE INDEX `idVehicle_UNIQUE` (`idVehicule` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `free4motion`.`offreLocation`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `free4motion`.`offreLocation` ;

CREATE TABLE IF NOT EXISTS `free4motion`.`offreLocation` (
  `idOffre` INT(11) NOT NULL AUTO_INCREMENT,
  `state` INT(11) NULL DEFAULT 0,
  `idVehicule` INT(11) NULL DEFAULT NULL,
  `prixParKm` FLOAT NULL DEFAULT NULL,
  `prixParJour` FLOAT NULL DEFAULT NULL,
  PRIMARY KEY (`idOffre`),
  INDEX `idVehicle_idx` (`idVehicule` ASC) VISIBLE,
  CONSTRAINT `idVehicle`
    FOREIGN KEY (`idVehicule`)
    REFERENCES `free4motion`.`Vehicule` (`idVehicule`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `free4motion`.`Personne`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `free4motion`.`Personne` ;

CREATE TABLE IF NOT EXISTS `free4motion`.`Personne` (
  `idPersonne` INT(11) NOT NULL AUTO_INCREMENT,
  `prenom` VARCHAR(45) NULL DEFAULT NULL,
  `nom` VARCHAR(45) NULL DEFAULT NULL,
  `naissance` DATETIME NULL DEFAULT NULL,
  `addresse` VARCHAR(45) NULL DEFAULT NULL,
  `numeroTel` INT(11) NULL DEFAULT NULL,
  `numeroPermis` VARCHAR(45) NULL DEFAULT NULL,
  `numeroCb` INT(11) NULL DEFAULT NULL,
  `addresseFacturation` VARCHAR(255) NULL DEFAULT NULL,
  `pwd` VARCHAR(255) NULL DEFAULT NULL,
  `role` INT(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`idPersonne`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `free4motion`.`Contrat`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `free4motion`.`Contrat` ;

CREATE TABLE IF NOT EXISTS `free4motion`.`Contrat` (
  `idContrat` INT(11) NOT NULL AUTO_INCREMENT,
  `idPersonne` INT(11) NOT NULL,
  `dateDebut` DATETIME NULL DEFAULT NULL,
  `dateFin` DATETIME NULL DEFAULT NULL,
  `numeroCb` INT(11) NULL DEFAULT NULL,
  `prix` FLOAT NULL DEFAULT NULL,
  `kmContrat` INT(11) NULL DEFAULT NULL,
  `state` INT(11) NULL DEFAULT NULL,
  `idOffre` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idContrat`),
  INDEX `personneLouant_idx` (`idPersonne` ASC) VISIBLE,
  INDEX `idOffre_idx` (`idOffre` ASC) VISIBLE,
  CONSTRAINT `idOffre`
    FOREIGN KEY (`idOffre`)
    REFERENCES `free4motion`.`offreLocation` (`idOffre`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `personneLouant`
    FOREIGN KEY (`idPersonne`)
    REFERENCES `free4motion`.`Personne` (`idPersonne`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `free4motion`.`tokens`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `free4motion`.`tokens` ;

CREATE TABLE IF NOT EXISTS `free4motion`.`tokens` (
  `token` VARCHAR(255) NOT NULL,
  `userConcerne` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`token`),
  INDEX `concernedUser_idx` (`userConcerne` ASC) VISIBLE,
  CONSTRAINT `concernedUser`
    FOREIGN KEY (`userConcerne`)
    REFERENCES `free4motion`.`Personne` (`idPersonne`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
