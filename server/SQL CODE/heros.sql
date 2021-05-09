
--create the table
create table Heros (
	hero_id int identity(1,1) not null primary key, 
	full_name nvarchar(150) not null,
	hero_name nvarchar(150) not null, 
	photo_url text null,
	isActive bit default 1
)
go

--proc for select
create proc select_heros
as
	select * from [dbo].[Heros] where [isActive] = 1
go

--run select proc
exec select_heros
go

--proc for specific hero by id
create proc select_hero_by_id
	@hero_id int
as
	select * from [dbo].[Heros] where [hero_id] = @hero_id
go

--run proc for specific hero
exec select_hero_by_id 1
go

--proc for insert details
create proc add_hero
	@full_name nvarchar(150),
	@hero_name nvarchar(150),
	@photo_url text,
	@hero_id int output
as
	insert into [dbo].[Heros]([full_name], [hero_name], [photo_url])
		values(@full_name, @hero_name, @photo_url)
	set @hero_id = @@IDENTITY
go

--run insert proc
exec add_hero 'Peter Parker','Spiderman',null
go

--proc for update details
create proc update_hero
	@hero_id int, 
	@full_name nvarchar(150),
	@hero_name nvarchar(150),
	@photo_url text
as
	update [dbo].[Heros]
		set [full_name] = @full_name,
			[photo_url] = @photo_url,
			[hero_name] = @hero_name
		where [hero_id] = @hero_id
go

--run update proc
exec update_hero 1 ,'Miles Morales','Spiderman','https://www.cnet.com/a/img/9RVDt21UtF5fV_NoPRijcbIWXFc=/940x0/2020/06/11/03fe8492-a134-4702-af78-ca2d2ad61f3a/spider-man-miles-morales-01.jpg'
go

--proc for delete details
create proc delete_hero
	@hero_id int
as 
	update [dbo].[Heros]
		set [isActive] = 0
		where [hero_id] = @hero_id
go

--run delete proc
exec delete_hero 1
go

--proc fro reactivate the hero
create proc reactivate_hero
	@hero_id int
as
	update [dbo].[Heros]
		set [isActive] = 1
		where [hero_id] = @hero_id
go

--run reactivate proc 
exec reactivate_hero 1
go
