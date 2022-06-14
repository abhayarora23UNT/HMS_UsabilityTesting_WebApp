/*
create database hospitalmgmt;
CREATE USER 'db_user'@'%' IDENTIFIED BY 'admin@12345';
GRANT ALL PRIVILEGES ON hospitalmgmt . * TO 'db_user'@'%';
FLUSH PRIVILEGES;
SHOW GRANTS FOR 'db_user'@'%';
select * from mysql.user;
use hospitalmgmt;
UPDATE mysql.user SET Super_Priv='Y' WHERE user='hmsdba' AND host='%';
desc mysql.user; InsertData
*/

use hospitalmgmt;
select * from users;
select * from doctors;
insert into medicines values(1,'123','Crocin','ranbaxy','250mg','2','2022/12/02',1,'fever medicine',200,200);

insert into medicines values(2,'183','Dcold','cipla','500mg','2','2022/12/02',1,'cold medicine',500,1000);

select * from medicines;