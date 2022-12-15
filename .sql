-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema northwind
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema northwind
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `northwind` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ;
USE `northwind` ;

-- -----------------------------------------------------
-- Table `northwind`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `northwind`.`category` (
  `categoryId` INT NOT NULL AUTO_INCREMENT,
  `categoryName` VARCHAR(15) NOT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `picture` BLOB NULL DEFAULT NULL,
  PRIMARY KEY (`categoryId`))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;


-- -----------------------------------------------------
-- Table `northwind`.`customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `northwind`.`customer` (
  `custId` INT NOT NULL AUTO_INCREMENT,
  `companyName` VARCHAR(40) NOT NULL,
  `contactName` VARCHAR(30) NULL DEFAULT NULL,
  `contactTitle` VARCHAR(30) NULL DEFAULT NULL,
  `address` VARCHAR(60) NULL DEFAULT NULL,
  `city` VARCHAR(15) NULL DEFAULT NULL,
  `region` VARCHAR(15) NULL DEFAULT NULL,
  `postalCode` VARCHAR(10) NULL DEFAULT NULL,
  `country` VARCHAR(15) NULL DEFAULT NULL,
  `phone` VARCHAR(24) NULL DEFAULT NULL,
  `mobile` VARCHAR(24) NULL DEFAULT NULL,
  `email` VARCHAR(225) NULL DEFAULT NULL,
  `fax` VARCHAR(24) NULL DEFAULT NULL,
  PRIMARY KEY (`custId`))
ENGINE = InnoDB
AUTO_INCREMENT = 92
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;


-- -----------------------------------------------------
-- Table `northwind`.`customerdemographics`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `northwind`.`customerdemographics` (
  `customerTypeId` INT NOT NULL AUTO_INCREMENT,
  `customerDesc` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`customerTypeId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;


-- -----------------------------------------------------
-- Table `northwind`.`custcustdemographics`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `northwind`.`custcustdemographics` (
  `custId` INT NOT NULL,
  `customerTypeId` INT NOT NULL,
  PRIMARY KEY (`custId`, `customerTypeId`),
  INDEX `customerTypeId` (`customerTypeId` ASC) VISIBLE,
  CONSTRAINT `custcustdemographics_ibfk_1`
    FOREIGN KEY (`custId`)
    REFERENCES `northwind`.`customer` (`custId`),
  CONSTRAINT `custcustdemographics_ibfk_2`
    FOREIGN KEY (`customerTypeId`)
    REFERENCES `northwind`.`customerdemographics` (`customerTypeId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;


-- -----------------------------------------------------
-- Table `northwind`.`employee`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `northwind`.`employee` (
  `employeeId` INT NOT NULL AUTO_INCREMENT,
  `lastname` VARCHAR(20) NOT NULL,
  `firstname` VARCHAR(10) NOT NULL,
  `title` VARCHAR(30) NULL DEFAULT NULL,
  `titleOfCourtesy` VARCHAR(25) NULL DEFAULT NULL,
  `birthDate` DATETIME NULL DEFAULT NULL,
  `hireDate` DATETIME NULL DEFAULT NULL,
  `address` VARCHAR(60) NULL DEFAULT NULL,
  `city` VARCHAR(15) NULL DEFAULT NULL,
  `region` VARCHAR(15) NULL DEFAULT NULL,
  `postalCode` VARCHAR(10) NULL DEFAULT NULL,
  `country` VARCHAR(15) NULL DEFAULT NULL,
  `phone` VARCHAR(24) NULL DEFAULT NULL,
  `extension` VARCHAR(4) NULL DEFAULT NULL,
  `mobile` VARCHAR(24) NULL DEFAULT NULL,
  `email` VARCHAR(225) NULL DEFAULT NULL,
  `photo` BLOB NULL DEFAULT NULL,
  `notes` BLOB NULL DEFAULT NULL,
  `mgrId` INT NULL DEFAULT NULL,
  `photoPath` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`employeeId`))
ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;


-- -----------------------------------------------------
-- Table `northwind`.`region`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `northwind`.`region` (
  `regionId` INT NOT NULL,
  `regiondescription` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`regionId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;


-- -----------------------------------------------------
-- Table `northwind`.`territory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `northwind`.`territory` (
  `territoryId` VARCHAR(20) NOT NULL,
  `territorydescription` VARCHAR(50) NOT NULL,
  `regionId` INT NOT NULL,
  PRIMARY KEY (`territoryId`),
  INDEX `regionId` (`regionId` ASC) VISIBLE,
  CONSTRAINT `territory_ibfk_1`
    FOREIGN KEY (`regionId`)
    REFERENCES `northwind`.`region` (`regionId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;


-- -----------------------------------------------------
-- Table `northwind`.`employeeterritory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `northwind`.`employeeterritory` (
  `employeeId` INT NOT NULL AUTO_INCREMENT,
  `territoryId` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`employeeId`, `territoryId`),
  INDEX `territoryId` (`territoryId` ASC) VISIBLE,
  CONSTRAINT `employeeterritory_ibfk_1`
    FOREIGN KEY (`employeeId`)
    REFERENCES `northwind`.`employee` (`employeeId`),
  CONSTRAINT `employeeterritory_ibfk_2`
    FOREIGN KEY (`territoryId`)
    REFERENCES `northwind`.`territory` (`territoryId`))
ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;


-- -----------------------------------------------------
-- Table `northwind`.`shipper`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `northwind`.`shipper` (
  `shipperId` INT NOT NULL AUTO_INCREMENT,
  `companyName` VARCHAR(40) NOT NULL,
  `phone` VARCHAR(44) NULL DEFAULT NULL,
  PRIMARY KEY (`shipperId`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;


-- -----------------------------------------------------
-- Table `northwind`.`salesorder`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `northwind`.`salesorder` (
  `orderId` INT NOT NULL AUTO_INCREMENT,
  `custId` INT NOT NULL,
  `employeeId` INT NULL DEFAULT NULL,
  `orderDate` DATETIME NULL DEFAULT NULL,
  `requiredDate` DATETIME NULL DEFAULT NULL,
  `shippedDate` DATETIME NULL DEFAULT NULL,
  `shipperid` INT NOT NULL,
  `freight` DECIMAL(10,2) NULL DEFAULT NULL,
  `shipName` VARCHAR(40) NULL DEFAULT NULL,
  `shipAddress` VARCHAR(60) NULL DEFAULT NULL,
  `shipCity` VARCHAR(15) NULL DEFAULT NULL,
  `shipRegion` VARCHAR(15) NULL DEFAULT NULL,
  `shipPostalCode` VARCHAR(10) NULL DEFAULT NULL,
  `shipCountry` VARCHAR(15) NULL DEFAULT NULL,
  PRIMARY KEY (`orderId`, `custId`),
  INDEX `shipperid` (`shipperid` ASC) VISIBLE,
  INDEX `custId` (`custId` ASC) VISIBLE,
  CONSTRAINT `salesorder_ibfk_1`
    FOREIGN KEY (`shipperid`)
    REFERENCES `northwind`.`shipper` (`shipperId`),
  CONSTRAINT `salesorder_ibfk_2`
    FOREIGN KEY (`custId`)
    REFERENCES `northwind`.`customer` (`custId`))
ENGINE = InnoDB
AUTO_INCREMENT = 11078
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;


-- -----------------------------------------------------
-- Table `northwind`.`supplier`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `northwind`.`supplier` (
  `supplierId` INT NOT NULL AUTO_INCREMENT,
  `companyName` VARCHAR(40) NOT NULL,
  `contactName` VARCHAR(30) NULL DEFAULT NULL,
  `contactTitle` VARCHAR(30) NULL DEFAULT NULL,
  `address` VARCHAR(60) NULL DEFAULT NULL,
  `city` VARCHAR(15) NULL DEFAULT NULL,
  `region` VARCHAR(15) NULL DEFAULT NULL,
  `postalCode` VARCHAR(10) NULL DEFAULT NULL,
  `country` VARCHAR(15) NULL DEFAULT NULL,
  `phone` VARCHAR(24) NULL DEFAULT NULL,
  `email` VARCHAR(225) NULL DEFAULT NULL,
  `fax` VARCHAR(24) NULL DEFAULT NULL,
  `HomePage` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`supplierId`))
ENGINE = InnoDB
AUTO_INCREMENT = 30
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;


-- -----------------------------------------------------
-- Table `northwind`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `northwind`.`product` (
  `productId` INT NOT NULL AUTO_INCREMENT,
  `productName` VARCHAR(40) NOT NULL,
  `supplierId` INT NULL DEFAULT NULL,
  `categoryId` INT NULL DEFAULT NULL,
  `quantityPerUnit` VARCHAR(20) NULL DEFAULT NULL,
  `unitPrice` DECIMAL(10,2) NULL DEFAULT NULL,
  `unitsInStock` SMALLINT NULL DEFAULT NULL,
  `unitsOnOrder` SMALLINT NULL DEFAULT NULL,
  `reorderLevel` SMALLINT NULL DEFAULT NULL,
  `discontinued` CHAR(1) NOT NULL,
  PRIMARY KEY (`productId`),
  INDEX `supplierId` (`supplierId` ASC) VISIBLE,
  INDEX `categoryId` (`categoryId` ASC) VISIBLE,
  CONSTRAINT `product_ibfk_1`
    FOREIGN KEY (`supplierId`)
    REFERENCES `northwind`.`supplier` (`supplierId`),
  CONSTRAINT `product_ibfk_2`
    FOREIGN KEY (`categoryId`)
    REFERENCES `northwind`.`category` (`categoryId`))
ENGINE = InnoDB
AUTO_INCREMENT = 78
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;


-- -----------------------------------------------------
-- Table `northwind`.`orderdetail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `northwind`.`orderdetail` (
  `orderDetailId` INT NOT NULL AUTO_INCREMENT,
  `orderId` INT NOT NULL,
  `productId` INT NOT NULL,
  `unitPrice` DECIMAL(10,2) NOT NULL,
  `quantity` SMALLINT NOT NULL,
  `discount` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`orderDetailId`),
  INDEX `orderId` (`orderId` ASC) VISIBLE,
  INDEX `productId` (`productId` ASC) VISIBLE,
  CONSTRAINT `orderdetail_ibfk_1`
    FOREIGN KEY (`orderId`)
    REFERENCES `northwind`.`salesorder` (`orderId`),
  CONSTRAINT `orderdetail_ibfk_2`
    FOREIGN KEY (`productId`)
    REFERENCES `northwind`.`product` (`productId`))
ENGINE = InnoDB
AUTO_INCREMENT = 2156
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
