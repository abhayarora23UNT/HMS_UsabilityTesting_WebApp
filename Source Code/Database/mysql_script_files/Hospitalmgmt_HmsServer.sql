-- MySQL Workbench Forward Engineering
-- create database hospitalmgmt;
use hospitalmgmt;

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema hospitalmgmt
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema hospitalmgmt
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `hospitalmgmt` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `hospitalmgmt` ;

-- -----------------------------------------------------
-- Table `hospitalmgmt`.`paymentmodes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hospitalmgmt`.`paymentmodes` (
  `PaymentModeId` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(50) NOT NULL,
  `ApplicableMethods` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`PaymentModeId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hospitalmgmt`.`payments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hospitalmgmt`.`payments` (
  `PaymentId` INT NOT NULL AUTO_INCREMENT,
  `PaymentCode` VARCHAR(20) NOT NULL,
  `PaymentmodeId` INT NOT NULL,
  `PayeeName` VARCHAR(50) NOT NULL,
  `TotalAmount` DECIMAL(12,2) NULL DEFAULT NULL,
  `DiscountAmount` DECIMAL(12,2) NULL DEFAULT NULL,
  `InsuranceAmount` DECIMAL(12,2) NULL DEFAULT NULL,
  `PayableAmount` DECIMAL(12,2) NULL DEFAULT NULL,
  PRIMARY KEY (`PaymentId`),
  UNIQUE INDEX `PaymentCode_UNIQUE` (`PaymentCode` ASC) VISIBLE,
  INDEX `FK_Payments_ModeId` (`PaymentmodeId` ASC) VISIBLE,
  CONSTRAINT `FK_Payments_ModeId`
    FOREIGN KEY (`PaymentmodeId`)
    REFERENCES `hospitalmgmt`.`paymentmodes` (`PaymentModeId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hospitalmgmt`.`doctors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hospitalmgmt`.`doctors` (
  `DoctorId` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(50) NOT NULL,
  `Address1` VARCHAR(100) NULL DEFAULT NULL,
  `Address2` VARCHAR(100) NULL DEFAULT NULL,
  `City` VARCHAR(20) NULL DEFAULT NULL,
  `Phone` VARCHAR(20) NULL DEFAULT NULL,
  `Mobile` VARCHAR(20) NULL DEFAULT NULL,
  `Email` VARCHAR(50) NOT NULL,
  `Salary` DECIMAL(12,2) NULL DEFAULT NULL,
  `Designation` VARCHAR(50) NULL DEFAULT NULL,
  `Gender` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`DoctorId`))
ENGINE = InnoDB
AUTO_INCREMENT = 25
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hospitalmgmt`.`hospitals`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hospitalmgmt`.`hospitals` (
  `HospitalId` INT NOT NULL AUTO_INCREMENT,
  `HospitalCode` VARCHAR(20) NOT NULL,
  `Name` VARCHAR(50) NOT NULL,
  `Address1` VARCHAR(100) NULL DEFAULT NULL,
  `Address2` VARCHAR(100) NULL DEFAULT NULL,
  `City` VARCHAR(20) NULL DEFAULT NULL,
  `Phone1` VARCHAR(20) NULL DEFAULT NULL,
  `Phone2` VARCHAR(20) NULL DEFAULT NULL,
  `Email` VARCHAR(50) NOT NULL,
  `Description` VARCHAR(200) NULL DEFAULT NULL,
  PRIMARY KEY (`HospitalId`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hospitalmgmt`.`roomtypes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hospitalmgmt`.`roomtypes` (
  `RoomTypeId` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(50) NOT NULL,
  `Description` VARCHAR(200) NULL DEFAULT NULL,
  PRIMARY KEY (`RoomTypeId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hospitalmgmt`.`operativerooms`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hospitalmgmt`.`operativerooms` (
  `OperativeRoomId` INT NOT NULL AUTO_INCREMENT,
  `OperativeRoomCode` VARCHAR(20) NOT NULL,
  `RoomTypeId` INT NOT NULL,
  `RoomNo` VARCHAR(10) NOT NULL,
  `BedNo` VARCHAR(10) NULL DEFAULT NULL,
  `StartDate` DATETIME NULL DEFAULT NULL,
  `EndDate` DATETIME NULL DEFAULT NULL,
  `HospitalId` INT NOT NULL,
  PRIMARY KEY (`OperativeRoomId`),
  UNIQUE INDEX `OperativeRoomCode_UNIQUE` (`OperativeRoomCode` ASC) VISIBLE,
  INDEX `FK_OpeRooms_HospitalId` (`HospitalId` ASC) VISIBLE,
  INDEX `FK_OpeRooms_RoomTypeId` (`RoomTypeId` ASC) VISIBLE,
  CONSTRAINT `FK_OpeRooms_HospitalId`
    FOREIGN KEY (`HospitalId`)
    REFERENCES `hospitalmgmt`.`hospitals` (`HospitalId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK_OpeRooms_RoomTypeId`
    FOREIGN KEY (`RoomTypeId`)
    REFERENCES `hospitalmgmt`.`roomtypes` (`RoomTypeId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hospitalmgmt`.`patients`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hospitalmgmt`.`patients` (
  `PatientId` INT NOT NULL AUTO_INCREMENT,
  `PatientCode` VARCHAR(20) NOT NULL,
  `Name` VARCHAR(50) NOT NULL,
  `Address1` VARCHAR(100) NULL DEFAULT NULL,
  `Address2` VARCHAR(100) NULL DEFAULT NULL,
  `City` VARCHAR(50) NULL DEFAULT NULL,
  `Phone` VARCHAR(20) NULL DEFAULT NULL,
  `GuardianPhone` VARCHAR(10) NULL DEFAULT NULL,
  `Email` VARCHAR(50) NULL DEFAULT NULL,
  `Disease` VARCHAR(50) NULL DEFAULT NULL,
  `Gender` VARCHAR(50) NULL DEFAULT NULL,  
  PRIMARY KEY (`PatientId`),
  UNIQUE INDEX `PatientCode_UNIQUE` (`PatientCode` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hospitalmgmt`.`treatments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hospitalmgmt`.`treatments` (
  `TreatmentId` INT NOT NULL AUTO_INCREMENT,
  `TreatmentCode` VARCHAR(20) NOT NULL,
  `Name` VARCHAR(50) NOT NULL,
  `Duration` INT NULL DEFAULT NULL,
  `DoctorId` INT NOT NULL,
  `PatientId` INT NOT NULL,
  `OperativeRoomId` INT NOT NULL,
  PRIMARY KEY (`TreatmentId`),
  UNIQUE INDEX `TreatmentCode_UNIQUE` (`TreatmentCode` ASC) VISIBLE,
  INDEX `FK_Treatments_DoctorId` (`DoctorId` ASC) VISIBLE,
  INDEX `FK_Treatments_OpsRoomId` (`OperativeRoomId` ASC) VISIBLE,
  INDEX `FK_Treatments_PatientId` (`PatientId` ASC) VISIBLE,
  CONSTRAINT `FK_Treatments_DoctorId`
    FOREIGN KEY (`DoctorId`)
    REFERENCES `hospitalmgmt`.`doctors` (`DoctorId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK_Treatments_OpsRoomId`
    FOREIGN KEY (`OperativeRoomId`)
    REFERENCES `hospitalmgmt`.`operativerooms` (`OperativeRoomId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK_Treatments_PatientId`
    FOREIGN KEY (`PatientId`)
    REFERENCES `hospitalmgmt`.`patients` (`PatientId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hospitalmgmt`.`admissions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hospitalmgmt`.`admissions` (
  `AdmissionId` INT NOT NULL AUTO_INCREMENT,
  `AdmissionCode` VARCHAR(20) NOT NULL,
  `TreatmentId` INT NOT NULL,
  `AdmittedDate` DATETIME NULL DEFAULT NULL,
  `IsInsuranceApplicable` TINYINT NULL DEFAULT NULL,
  `InsurancePhotoId` VARCHAR(50) NULL DEFAULT NULL,
  `PaymentId` INT NOT NULL,
  `DischargeDate` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`AdmissionId`),
  UNIQUE INDEX `AdmissionCode_UNIQUE` (`AdmissionCode` ASC) VISIBLE,
  INDEX `FK_Admissions_PaymentId` (`PaymentId` ASC) VISIBLE,
  INDEX `FK_Admissions_TreatmentId` (`TreatmentId` ASC) VISIBLE,
  CONSTRAINT `FK_Admissions_PaymentId`
    FOREIGN KEY (`PaymentId`)
    REFERENCES `hospitalmgmt`.`payments` (`PaymentId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK_Admissions_TreatmentId`
    FOREIGN KEY (`TreatmentId`)
    REFERENCES `hospitalmgmt`.`treatments` (`TreatmentId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hospitalmgmt`.`appointments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hospitalmgmt`.`appointments` (
  `AppointmentId` INT NOT NULL AUTO_INCREMENT,
  `AppointmentCode` VARCHAR(20) NOT NULL,
  `DoctorId` INT NOT NULL,
  `PatientId` INT NOT NULL,
  `HospitalId` INT NOT NULL,
  `Appt_Date` DATETIME NULL DEFAULT NULL,
  `Next_Appt_Date` DATETIME NULL DEFAULT NULL,
  `DiseaseNotes` VARCHAR(50) NULL DEFAULT NULL,
  `Fee` DECIMAL(12,2) NULL DEFAULT NULL,
  PRIMARY KEY (`AppointmentId`),
  UNIQUE INDEX `AppointmentCode_UNIQUE` (`AppointmentCode` ASC) VISIBLE,
  INDEX `FK_Appointment_DoctorId` (`DoctorId` ASC) VISIBLE,
  INDEX `FK_Appointment_HospitalId` (`HospitalId` ASC) VISIBLE,
  INDEX `FK_Appointment_PatientId` (`PatientId` ASC) VISIBLE,
  CONSTRAINT `FK_Appointment_DoctorId`
    FOREIGN KEY (`DoctorId`)
    REFERENCES `hospitalmgmt`.`doctors` (`DoctorId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK_Appointment_HospitalId`
    FOREIGN KEY (`HospitalId`)
    REFERENCES `hospitalmgmt`.`hospitals` (`HospitalId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK_Appointment_PatientId`
    FOREIGN KEY (`PatientId`)
    REFERENCES `hospitalmgmt`.`patients` (`PatientId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hospitalmgmt`.`medicines`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hospitalmgmt`.`medicines` (
  `MedicineId` INT NOT NULL AUTO_INCREMENT,
  `MedicineCode` VARCHAR(20) NOT NULL,
  `Name` VARCHAR(50) NOT NULL,
  `Company` VARCHAR(50) NULL DEFAULT NULL,
  `Composition` VARCHAR(200) NULL DEFAULT NULL,
  `Dosage` VARCHAR(20) NULL DEFAULT NULL,
  `ExpiryDate` DATETIME NULL DEFAULT NULL,
  `Type` TINYINT NULL DEFAULT NULL,
  `Description` VARCHAR(200) NULL DEFAULT NULL,
  `Cost` DECIMAL(12,2) NULL DEFAULT NULL,
  `AvailableQuantity` INT NULL DEFAULT NULL,
  PRIMARY KEY (`MedicineId`),
  UNIQUE INDEX `MedicineCode_UNIQUE` (`MedicineCode` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hospitalmgmt`.`appointmentmedicines`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hospitalmgmt`.`appointmentmedicines` (
  `ApptMedicineId` INT NOT NULL AUTO_INCREMENT,
  `AppointmentId` INT NOT NULL,
  `MedicineId` INT NOT NULL,
  `Limits` INT NULL DEFAULT NULL,
  PRIMARY KEY (`ApptMedicineId`),
  INDEX `FK_ApptMedicines_AppointmentId` (`AppointmentId` ASC) VISIBLE,
  INDEX `FK_ApptMedicines_MedicineId` (`MedicineId` ASC) VISIBLE,
  CONSTRAINT `FK_ApptMedicines_AppointmentId`
    FOREIGN KEY (`AppointmentId`)
    REFERENCES `hospitalmgmt`.`appointments` (`AppointmentId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK_ApptMedicines_MedicineId`
    FOREIGN KEY (`MedicineId`)
    REFERENCES `hospitalmgmt`.`medicines` (`MedicineId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hospitalmgmt`.`specializations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hospitalmgmt`.`specializations` (
  `SpecializationId` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(50) NOT NULL,
  `KeyAres` VARCHAR(100) NULL DEFAULT NULL,
  `Status` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`SpecializationId`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hospitalmgmt`.`doctorspecializations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hospitalmgmt`.`doctorspecializations` (
  `DocSpecId` INT NOT NULL AUTO_INCREMENT,
  `DoctorId` INT NOT NULL,
  `SpecializationId` INT NOT NULL,
  PRIMARY KEY (`DocSpecId`),
  INDEX `FK_DocSpecs_DoctorId` (`DoctorId` ASC) VISIBLE,
  INDEX `FK_DocSpecs_SpecId` (`SpecializationId` ASC) VISIBLE,
  CONSTRAINT `FK_DocSpecs_DoctorId`
    FOREIGN KEY (`DoctorId`)
    REFERENCES `hospitalmgmt`.`doctors` (`DoctorId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK_DocSpecs_SpecId`
    FOREIGN KEY (`SpecializationId`)
    REFERENCES `hospitalmgmt`.`specializations` (`SpecializationId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hospitalmgmt`.`nurses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hospitalmgmt`.`nurses` (
  `NurseId` INT NOT NULL AUTO_INCREMENT,
  `NurseCode` VARCHAR(20) NOT NULL,
  `Name` VARCHAR(50) NOT NULL,
  `Address1` VARCHAR(100) NULL DEFAULT NULL,
  `Address2` VARCHAR(100) NULL DEFAULT NULL,
  `City` VARCHAR(20) NULL DEFAULT NULL,
  `Phone1` VARCHAR(10) NULL DEFAULT NULL,
  `Phone2` VARCHAR(10) NULL DEFAULT NULL,
  `Email` VARCHAR(50) NULL DEFAULT NULL,
  `Salary` DECIMAL(12,2) NULL DEFAULT NULL,
  `Gender` VARCHAR(15) NULL DEFAULT NULL,
  PRIMARY KEY (`NurseId`),
  UNIQUE INDEX `NurseCode_UNIQUE` (`NurseCode` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hospitalmgmt`.`servicerooms`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hospitalmgmt`.`servicerooms` (
  `ServiceRoomId` INT NOT NULL AUTO_INCREMENT,
  `ServiceroomCode` VARCHAR(20) NOT NULL,
  `RoomTypeId` INT NOT NULL,
  `RoomNo` VARCHAR(10) NOT NULL,
  `Results` VARCHAR(200) NULL DEFAULT NULL,
  `Fee` DECIMAL(12,2) NULL DEFAULT NULL,
  `ServiceDate` DATETIME NULL DEFAULT NULL,
  `HospitalId` INT NOT NULL,
  `PatientId` INT NOT NULL,
  `DoctorId` INT NOT NULL,
  PRIMARY KEY (`ServiceRoomId`),
  UNIQUE INDEX `ServiceroomCode_UNIQUE` (`ServiceroomCode` ASC) VISIBLE,
  INDEX `FK_ServiceRooms_DoctorId` (`DoctorId` ASC) VISIBLE,
  INDEX `FK_ServiceRooms_HospitalId` (`HospitalId` ASC) VISIBLE,
  INDEX `FK_ServiceRooms_PatientId` (`PatientId` ASC) VISIBLE,
  INDEX `FK_ServiceRooms_RoomTypeId` (`RoomTypeId` ASC) VISIBLE,
  CONSTRAINT `FK_ServiceRooms_DoctorId`
    FOREIGN KEY (`DoctorId`)
    REFERENCES `hospitalmgmt`.`doctors` (`DoctorId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK_ServiceRooms_HospitalId`
    FOREIGN KEY (`HospitalId`)
    REFERENCES `hospitalmgmt`.`hospitals` (`HospitalId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK_ServiceRooms_PatientId`
    FOREIGN KEY (`PatientId`)
    REFERENCES `hospitalmgmt`.`patients` (`PatientId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK_ServiceRooms_RoomTypeId`
    FOREIGN KEY (`RoomTypeId`)
    REFERENCES `hospitalmgmt`.`roomtypes` (`RoomTypeId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hospitalmgmt`.`treamentmedicines`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hospitalmgmt`.`treamentmedicines` (
  `TreatmentMedicineId` INT NOT NULL AUTO_INCREMENT,
  `TreatmentId` INT NOT NULL,
  `MedicineId` INT NOT NULL,
  `Limits` INT NULL DEFAULT NULL,
  PRIMARY KEY (`TreatmentMedicineId`),
  INDEX `FK_TreamentMedicines_NurseId` (`MedicineId` ASC) VISIBLE,
  INDEX `FK_TreamentMedicines_TreatmentId` (`TreatmentId` ASC) VISIBLE,
  CONSTRAINT `FK_TreamentMedicines_NurseId`
    FOREIGN KEY (`MedicineId`)
    REFERENCES `hospitalmgmt`.`medicines` (`MedicineId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK_TreamentMedicines_TreatmentId`
    FOREIGN KEY (`TreatmentId`)
    REFERENCES `hospitalmgmt`.`treatments` (`TreatmentId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hospitalmgmt`.`treamentnurses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hospitalmgmt`.`treamentnurses` (
  `TreatmentNurseId` INT NOT NULL AUTO_INCREMENT,
  `TreatmentId` INT NOT NULL,
  `NurseId` INT NOT NULL,
  `Tr_InTime` DATETIME NULL DEFAULT NULL,
  `Tr_OutTime` DATETIME NULL DEFAULT NULL,
  `Notes` VARCHAR(200) NULL DEFAULT NULL,
  PRIMARY KEY (`TreatmentNurseId`),
  INDEX `FK_TreamentNurses_NurseId` (`NurseId` ASC) VISIBLE,
  INDEX `FK_TreamentNurses_TreatmentId` (`TreatmentId` ASC) VISIBLE,
  CONSTRAINT `FK_TreamentNurses_NurseId`
    FOREIGN KEY (`NurseId`)
    REFERENCES `hospitalmgmt`.`nurses` (`NurseId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK_TreamentNurses_TreatmentId`
    FOREIGN KEY (`TreatmentId`)
    REFERENCES `hospitalmgmt`.`treatments` (`TreatmentId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `hospitalmgmt`.`Users` (
  `UserId` INT NOT NULL AUTO_INCREMENT,
  `UserName` VARCHAR(50) NOT NULL,
  `FirstName` VARCHAR(50),
  `LastName` VARCHAR(50),
  `Email` VARCHAR(50),
  `UserRole` VARCHAR(50),
  `Password` VARCHAR(50),
  `UserroleId` VARCHAR(50),
  `PhoneNo` VARCHAR(20),
  PRIMARY KEY (`UserId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;