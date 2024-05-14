--DROP DATABASE IF EXISTS Vonattarsasag

--     mysql -u root -p <setup.sql
CREATE DATABASE IF NOT EXISTS Vonattarsasag

USE Vonattarsasag
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%' IDENTIFIED BY 'abc';