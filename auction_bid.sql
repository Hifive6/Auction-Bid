DROP DATABASE IF EXISTS auction_bidDB;
CREATE DATABASE auction_bidDB;
USE auction_bidDB;
ALTER USER root@localhost IDENTIFIED WITH mysql_native_password BY 'MS@Dc02830786';
CREATE TABLE auction (
	id INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NULL,
	Starting_Bid DECIMAL(10, 2) NULL,
	Updated_Bid DECIMAL NULL,
    PRIMARY KEY (id)
);

SELECT * FROM auction;