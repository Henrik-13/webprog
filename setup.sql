CREATE DATABASE IF NOT EXISTS VonatTarsasag;

USE VonatTarsasag;

CREATE USER 'bhim2208'@'localhost' IDENTIFIED BY 'Hcddh3ds%43HG5&';
GRANT ALL PRIVILEGES ON *.* TO 'bhim2208'@'localhost';

/*GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%' IDENTIFIED BY 'Hcddh3ds%43HG5&';*/
/*
DROP TABLE Foglalasok;
DROP TABLE Felhasznalok;
DROP TABLE Jaratok;
*/
CREATE TABLE IF NOT EXISTS Jaratok (
	JaratID VARCHAR(20) NOT NULL,
	Honnan VARCHAR(30),
	Hova VARCHAR(30),
	Nap VARCHAR(15),
	Ora TIME,
	JegyAr INT,
	VonatTipus VARCHAR(30),
    CONSTRAINT PK_Jaratok PRIMARY KEY (JaratID)
);

CREATE TABLE IF NOT EXISTS Felhasznalok (
	FelhasznaloID INT NOT NULL AUTO_INCREMENT,
    Nev VARCHAR(30) UNIQUE,
    Jelszo VARCHAR(100),
    JogID INT,
    CONSTRAINT PK_Felhasznalok PRIMARY KEY (FelhasznaloID)
);

CREATE TABLE IF NOT EXISTS Foglalasok (
	FoglalasID INT NOT NULL AUTO_INCREMENT,
    FelhasznaloID INT,
    JaratID VARCHAR(20),
    Datum DATE,
    CONSTRAINT PK_Foglalasok PRIMARY KEY (FoglalasID),
    CONSTRAINT FK_Foglalasok_Felhasznalok FOREIGN KEY (FelhasznaloID) REFERENCES Felhasznalok(FelhasznaloID),
    CONSTRAINT FK_Foglalasok_Jaratok FOREIGN KEY (JaratID) REFERENCES Jaratok(JaratID)
);

INSERT INTO Jaratok VALUES
('adsvdgb', 'Bukarest', 'Nagyvarad', 'Hetfo', '12:50', 150, 'Expressz'),
('bfdvsvg','Kolozsvar', 'Marosvasarhely', 'Pentek', '07:30', 25, 'Regionalis'),
('lwcas358', 'Bukarest', 'Iasi', 'Szerda', '12:00', 300, 'Gyors'),
('lwcawfq6', 'Csikszereda', 'Marosvasarhely', 'Csutortok', '16:10', 120, 'Expressz');

INSERT INTO Felhasznalok(Nev) VALUES
('Bálint Henrik'),
('Nagy Jozsef'),
('Kiss Miklos'),
('Kovacs Bela'),
('Nagy Anna');	

INSERT INTO Foglalasok(FelhasznaloID, JaratID, Datum) VALUES
(1, 'bfdvsvg', '2024-05-17'),
(2, 'lwcawfq6', '2024-05-23');

