CREATE DATABASE IF NOT EXISTS VonatTarsasag;

USE VonatTarsasag;

/*GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%' IDENTIFIED BY 'Hcddh3ds%43HG5&';*/

CREATE TABLE Jaratok (
	JaratID VARCHAR(20) NOT NULL,
	Honnan VARCHAR(30),
	Hova VARCHAR(30),
	Nap VARCHAR(15),
	Ora TIME,
	JegyAr INT,
	VonatTipus VARCHAR(30),
    CONSTRAINT PK_Jaratok PRIMARY KEY (JaratID)
);

CREATE TABLE Felhasznalok (
	FelhasznaloID INT NOT NULL AUTO_INCREMENT,
    Nev VARCHAR(30),
    CONSTRAINT PK_Felhasznalok PRIMARY KEY (FelhasznaloID)
);

CREATE TABLE Foglalasok (
	FoglalasID INT NOT NULL AUTO_INCREMENT,
    FelhasznaloID INT,
    JaratID VARCHAR(20),
    Datum DATE,
    /*Ora TIME,*/
    CONSTRAINT PK_Foglalasok PRIMARY KEY (FoglalasID),
    CONSTRAINT FK_Foglalasok_Felhasznalok FOREIGN KEY (FelhasznaloID) REFERENCES Felhasznalok(FelhasznaloID),
    CONSTRAINT FK_Foglalasok_Jaratok FOREIGN KEY (JaratID) REFERENCES Jaratok(JaratID)
);

