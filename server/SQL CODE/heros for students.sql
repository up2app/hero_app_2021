
--create the table
create table Heros (
	hero_id int identity(1,1) not null primary key, 
	full_name nvarchar(150) not null,
	hero_name nvarchar(150) not null, 
	photo_url text null,
	isActive bit default 1
)
go

