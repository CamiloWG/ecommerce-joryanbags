USE [master]
GO
/****** Object:  Database [joryan_db]    Script Date: 15/04/2025 7:36:47 p. m. ******/
CREATE DATABASE [joryan_db]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'joryan_db', FILENAME = N'D:\rdsdbdata\DATA\joryan_db.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'joryan_db_log', FILENAME = N'D:\rdsdbdata\DATA\joryan_db_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [joryan_db] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [joryan_db].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [joryan_db] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [joryan_db] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [joryan_db] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [joryan_db] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [joryan_db] SET ARITHABORT OFF 
GO
ALTER DATABASE [joryan_db] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [joryan_db] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [joryan_db] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [joryan_db] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [joryan_db] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [joryan_db] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [joryan_db] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [joryan_db] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [joryan_db] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [joryan_db] SET  ENABLE_BROKER 
GO
ALTER DATABASE [joryan_db] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [joryan_db] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [joryan_db] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [joryan_db] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [joryan_db] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [joryan_db] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [joryan_db] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [joryan_db] SET RECOVERY FULL 
GO
ALTER DATABASE [joryan_db] SET  MULTI_USER 
GO
ALTER DATABASE [joryan_db] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [joryan_db] SET DB_CHAINING OFF 
GO
ALTER DATABASE [joryan_db] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [joryan_db] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [joryan_db] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [joryan_db] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [joryan_db] SET QUERY_STORE = OFF
GO
USE [joryan_db]
GO
/****** Object:  User [admin]    Script Date: 15/04/2025 7:36:49 p. m. ******/
CREATE USER [admin] FOR LOGIN [admin] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [admin]
GO
/****** Object:  Table [dbo].[products]    Script Date: 15/04/2025 7:36:49 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[products](
	[product_id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](100) NOT NULL,
	[brand] [varchar](50) NULL,
	[price] [decimal](10, 2) NULL,
	[stock] [int] NULL,
	[category_id] [int] NULL,
	[code] [varchar](50) NULL,
	[date_creation] [datetime] NULL,
	[image_url] [varchar](100) NULL,
	[is_disabled] [bit] NULL,
	[description] [varchar](1000) NULL,
PRIMARY KEY CLUSTERED 
(
	[product_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[ActiveAvailableProducts]    Script Date: 15/04/2025 7:36:50 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[ActiveAvailableProducts]
AS
	SELECT product_id, name, stock
	FROM products
	WHERE is_disabled = 0 AND stock > 0
GO
/****** Object:  Table [dbo].[order_products]    Script Date: 15/04/2025 7:36:50 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[order_products](
	[order_details_id] [int] IDENTITY(1,1) NOT NULL,
	[order_id] [int] NULL,
	[product_id] [int] NULL,
	[quantity] [int] NULL,
	[subtotal] [decimal](38, 0) NULL,
PRIMARY KEY CLUSTERED 
(
	[order_details_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[TopTenProducts]    Script Date: 15/04/2025 7:36:50 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[TopTenProducts]
AS
	SELECT TOP 10 p.product_id, p.name, SUM(op.quantity) as total_quantity
	FROM products p
	INNER JOIN order_products op
	ON p.product_id = op.product_id
	GROUP BY p.product_id, p.name
	ORDER BY total_quantity DESC
GO
/****** Object:  Table [dbo].[orders]    Script Date: 15/04/2025 7:36:50 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[orders](
	[order_id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NULL,
	[date_creation] [datetime] NULL,
	[status_id] [int] NULL,
	[total_price] [decimal](38, 0) NULL,
	[address] [varchar](250) NULL,
	[client_name] [varchar](50) NULL,
	[client_phone] [varchar](8) NULL,
	[details] [varchar](200) NULL,
	[order_payment_id] [varchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[order_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[users]    Script Date: 15/04/2025 7:36:50 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[users](
	[user_id] [int] IDENTITY(1,1) NOT NULL,
	[email] [varchar](100) NOT NULL,
	[password] [varchar](255) NOT NULL,
	[full_name] [varchar](50) NULL,
	[phone] [varchar](8) NULL,
	[date_creation] [datetime] NULL,
	[address] [varchar](500) NULL,
	[rol_id] [int] NULL,
	[is_disabled] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[user_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[TopTenClients]    Script Date: 15/04/2025 7:36:50 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[TopTenClients]
AS
	SELECT TOP 10 u.user_id, u.email, u.full_name, SUM(o.total_price) as total_spend
	FROM users u
	INNER JOIN orders o
	ON u.user_id = o.user_id
	GROUP BY u.user_id, u.email, u.full_name
	ORDER BY total_spend DESC
GO
/****** Object:  Table [dbo].[categories]    Script Date: 15/04/2025 7:36:50 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[categories](
	[category_id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NULL,
	[is_disabled] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[category_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[roles]    Script Date: 15/04/2025 7:36:50 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[roles](
	[rol_id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NULL,
	[permissions] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[rol_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[status]    Script Date: 15/04/2025 7:36:50 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[status](
	[status_id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](30) NULL,
 CONSTRAINT [status_types_pk] PRIMARY KEY CLUSTERED 
(
	[status_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[categories] ON 

INSERT [dbo].[categories] ([category_id], [name], [is_disabled]) VALUES (1, N'Bolsos Normalitos', 0)
INSERT [dbo].[categories] ([category_id], [name], [is_disabled]) VALUES (2, N'Bolsos Clásicos', NULL)
INSERT [dbo].[categories] ([category_id], [name], [is_disabled]) VALUES (3, N'Maletines', 0)
INSERT [dbo].[categories] ([category_id], [name], [is_disabled]) VALUES (4, N'Bolsitos', 0)
INSERT [dbo].[categories] ([category_id], [name], [is_disabled]) VALUES (5, N'Maletas', NULL)
SET IDENTITY_INSERT [dbo].[categories] OFF
GO
SET IDENTITY_INSERT [dbo].[order_products] ON 

INSERT [dbo].[order_products] ([order_details_id], [order_id], [product_id], [quantity], [subtotal]) VALUES (16, 11, 1008, 1, CAST(67000 AS Decimal(38, 0)))
INSERT [dbo].[order_products] ([order_details_id], [order_id], [product_id], [quantity], [subtotal]) VALUES (17, 11, 1006, 1, CAST(36000 AS Decimal(38, 0)))
INSERT [dbo].[order_products] ([order_details_id], [order_id], [product_id], [quantity], [subtotal]) VALUES (18, 11, 1004, 1, CAST(50000 AS Decimal(38, 0)))
INSERT [dbo].[order_products] ([order_details_id], [order_id], [product_id], [quantity], [subtotal]) VALUES (19, 12, 1005, 1, CAST(43000 AS Decimal(38, 0)))
INSERT [dbo].[order_products] ([order_details_id], [order_id], [product_id], [quantity], [subtotal]) VALUES (20, 12, 1002, 1, CAST(20000 AS Decimal(38, 0)))
INSERT [dbo].[order_products] ([order_details_id], [order_id], [product_id], [quantity], [subtotal]) VALUES (21, 13, 1006, 1, CAST(36000 AS Decimal(38, 0)))
INSERT [dbo].[order_products] ([order_details_id], [order_id], [product_id], [quantity], [subtotal]) VALUES (22, 14, 1009, 1, CAST(32000 AS Decimal(38, 0)))
INSERT [dbo].[order_products] ([order_details_id], [order_id], [product_id], [quantity], [subtotal]) VALUES (23, 14, 1004, 1, CAST(50000 AS Decimal(38, 0)))
INSERT [dbo].[order_products] ([order_details_id], [order_id], [product_id], [quantity], [subtotal]) VALUES (24, 15, 1005, 1, CAST(43000 AS Decimal(38, 0)))
INSERT [dbo].[order_products] ([order_details_id], [order_id], [product_id], [quantity], [subtotal]) VALUES (25, 16, 2, 1, CAST(25000 AS Decimal(38, 0)))
SET IDENTITY_INSERT [dbo].[order_products] OFF
GO
SET IDENTITY_INSERT [dbo].[orders] ON 

INSERT [dbo].[orders] ([order_id], [user_id], [date_creation], [status_id], [total_price], [address], [client_name], [client_phone], [details], [order_payment_id]) VALUES (11, 1011, CAST(N'2025-04-14T22:14:52.850' AS DateTime), 5, CAST(153000 AS Decimal(38, 0)), N'CL 58 A SUR 48 F 10 Barrio Madelena Bogotá, Cundinamarca | Casa', N'Camilo Madero', N'31257964', N'CC 1023362536', N'ORD-20250414-200A4')
INSERT [dbo].[orders] ([order_id], [user_id], [date_creation], [status_id], [total_price], [address], [client_name], [client_phone], [details], [order_payment_id]) VALUES (12, 1012, CAST(N'2025-04-14T23:06:44.210' AS DateTime), 5, CAST(63000 AS Decimal(38, 0)), N'Avenida Perdida 46 Barrio La balacera Florencia, Caquetá | Apartamento 12', N'Pepito Perez', N'31253142', N'CC 412312312', N'ORD-20250414-7FA81')
INSERT [dbo].[orders] ([order_id], [user_id], [date_creation], [status_id], [total_price], [address], [client_name], [client_phone], [details], [order_payment_id]) VALUES (13, 1, CAST(N'2025-04-14T23:19:10.893' AS DateTime), 6, CAST(36000 AS Decimal(38, 0)), N'Cll 123A 48 50 Barrio El paraiso El Atrato, Chocó | Casa de carton', N'Administrador', N'41619127', N'CC 23123121', N'ORD-20250414-0C24E')
INSERT [dbo].[orders] ([order_id], [user_id], [date_creation], [status_id], [total_price], [address], [client_name], [client_phone], [details], [order_payment_id]) VALUES (14, 1, CAST(N'2025-04-14T23:22:26.130' AS DateTime), 6, CAST(82000 AS Decimal(38, 0)), N'KR 25 #23A-14 Barrio Soledad Barranco de Loba, Bolívar | Torre 4 Apto 402', N'Administrador', N'41619127', N'CC 12312302', N'ORD-20250414-2B177')
INSERT [dbo].[orders] ([order_id], [user_id], [date_creation], [status_id], [total_price], [address], [client_name], [client_phone], [details], [order_payment_id]) VALUES (15, 1, CAST(N'2025-04-15T16:47:16.853' AS DateTime), 6, CAST(61000 AS Decimal(38, 0)), N'Kr 45 Sur #23a-10 Barrio San Mateo Soacha, Cundinamarca | Ninguna', N'Administrador', N'41619127', N'CC 102354254', N'ORD-20250415-D0866')
INSERT [dbo].[orders] ([order_id], [user_id], [date_creation], [status_id], [total_price], [address], [client_name], [client_phone], [details], [order_payment_id]) VALUES (16, 1, CAST(N'2025-04-15T22:10:48.390' AS DateTime), 2, CAST(43000 AS Decimal(38, 0)), N'Carrera 45C 27-12 Barrio Falso Belén de los Andaquíes, Caquetá | Casa Verde', N'Administrador', N'41619127', N'CC 102371832', N'ORD-20250415-B787C')
SET IDENTITY_INSERT [dbo].[orders] OFF
GO
SET IDENTITY_INSERT [dbo].[products] ON 

INSERT [dbo].[products] ([product_id], [name], [brand], [price], [stock], [category_id], [code], [date_creation], [image_url], [is_disabled], [description]) VALUES (1, N'Bolso Rojo', N'Joryan', CAST(30000.00 AS Decimal(10, 2)), 6, 1, NULL, CAST(N'2025-03-30T23:33:09.757' AS DateTime), N'/public/product_1.png', 0, NULL)
INSERT [dbo].[products] ([product_id], [name], [brand], [price], [stock], [category_id], [code], [date_creation], [image_url], [is_disabled], [description]) VALUES (2, N'Bolso Morado', N'Joryan', CAST(25000.00 AS Decimal(10, 2)), 1, 1, NULL, CAST(N'2025-03-31T00:10:21.987' AS DateTime), N'/public/product_2.png', 0, NULL)
INSERT [dbo].[products] ([product_id], [name], [brand], [price], [stock], [category_id], [code], [date_creation], [image_url], [is_disabled], [description]) VALUES (1002, N'Bolso Rojo', N'Joryan', CAST(20000.00 AS Decimal(10, 2)), 4, 1, NULL, CAST(N'2025-03-28T20:40:32.560' AS DateTime), N'/public/product_14.png', 0, NULL)
INSERT [dbo].[products] ([product_id], [name], [brand], [price], [stock], [category_id], [code], [date_creation], [image_url], [is_disabled], [description]) VALUES (1003, N'Bolso Morado', N'Joryan', CAST(30000.00 AS Decimal(10, 2)), 5, 1, NULL, CAST(N'2025-03-28T21:21:24.867' AS DateTime), N'/public/product_15.png', 0, NULL)
INSERT [dbo].[products] ([product_id], [name], [brand], [price], [stock], [category_id], [code], [date_creation], [image_url], [is_disabled], [description]) VALUES (1004, N'Bolso Negro', N'Joryan', CAST(50000.00 AS Decimal(10, 2)), 6, 1, NULL, CAST(N'2025-03-28T21:22:11.523' AS DateTime), N'/public/product_16.png', 0, NULL)
INSERT [dbo].[products] ([product_id], [name], [brand], [price], [stock], [category_id], [code], [date_creation], [image_url], [is_disabled], [description]) VALUES (1005, N'Bolso Cafe', N'Joryan', CAST(43000.00 AS Decimal(10, 2)), 9, 1, NULL, CAST(N'2025-04-02T16:26:16.833' AS DateTime), N'/public/product_1002.png', 0, NULL)
INSERT [dbo].[products] ([product_id], [name], [brand], [price], [stock], [category_id], [code], [date_creation], [image_url], [is_disabled], [description]) VALUES (1006, N'Bolso Purpura', N'Joryan', CAST(36000.00 AS Decimal(10, 2)), 9, 1, NULL, CAST(N'2025-04-02T16:27:05.690' AS DateTime), N'/public/product_1003.png', 0, NULL)
INSERT [dbo].[products] ([product_id], [name], [brand], [price], [stock], [category_id], [code], [date_creation], [image_url], [is_disabled], [description]) VALUES (1008, N'Maletica Cafe', N'Joryan', CAST(67000.00 AS Decimal(10, 2)), 10, 1, NULL, CAST(N'2025-04-14T21:17:54.107' AS DateTime), N'/public/product_1008.png', NULL, N'Esta es la descripcion de una Maletica Cafe')
INSERT [dbo].[products] ([product_id], [name], [brand], [price], [stock], [category_id], [code], [date_creation], [image_url], [is_disabled], [description]) VALUES (1009, N'Mini Bolso Rojo', N'Joryan', CAST(32000.00 AS Decimal(10, 2)), 7, 1, NULL, CAST(N'2025-04-14T22:03:21.513' AS DateTime), N'/public/product_1009.png', NULL, N'Esta es la descripcion de un mini bolso rojo')
SET IDENTITY_INSERT [dbo].[products] OFF
GO
SET IDENTITY_INSERT [dbo].[roles] ON 

INSERT [dbo].[roles] ([rol_id], [name], [permissions]) VALUES (1, N'Cliente', 0)
INSERT [dbo].[roles] ([rol_id], [name], [permissions]) VALUES (2, N'Operador', 0)
INSERT [dbo].[roles] ([rol_id], [name], [permissions]) VALUES (3, N'Administrador', 0)
SET IDENTITY_INSERT [dbo].[roles] OFF
GO
SET IDENTITY_INSERT [dbo].[status] ON 

INSERT [dbo].[status] ([status_id], [name]) VALUES (1, N'Pendiente')
INSERT [dbo].[status] ([status_id], [name]) VALUES (2, N'Aprobado')
INSERT [dbo].[status] ([status_id], [name]) VALUES (3, N'Rechazado')
INSERT [dbo].[status] ([status_id], [name]) VALUES (4, N'Enviado')
INSERT [dbo].[status] ([status_id], [name]) VALUES (5, N'Entregado')
INSERT [dbo].[status] ([status_id], [name]) VALUES (6, N'Cancelado')
SET IDENTITY_INSERT [dbo].[status] OFF
GO
SET IDENTITY_INSERT [dbo].[users] ON 

INSERT [dbo].[users] ([user_id], [email], [password], [full_name], [phone], [date_creation], [address], [rol_id], [is_disabled]) VALUES (1, N'admin@admin.com', N'$2b$10$ImHCY/ZWQa2C0gqiyyEAX.XH3eDJF4ghPREH.r/oWxJajKhV1Ne7m', N'Administrador', N'41619127', CAST(N'2025-01-06T23:19:38.487' AS DateTime), N'Carrera 45C 27-12 Barrio Falso Belén de los Andaquíes, Caquetá | Casa Verde', 3, 0)
INSERT [dbo].[users] ([user_id], [email], [password], [full_name], [phone], [date_creation], [address], [rol_id], [is_disabled]) VALUES (1007, N'asdas@asdasd.com', N'$2b$10$natwYasgwMBtyslr8NomxeUADGjzzdjrT8P/HVvUEv1.sBwxsOTkm', N'sadasda dasasdas', N'31257964', CAST(N'2025-04-05T21:46:45.193' AS DateTime), N'Sin dirección', 1, 0)
INSERT [dbo].[users] ([user_id], [email], [password], [full_name], [phone], [date_creation], [address], [rol_id], [is_disabled]) VALUES (1008, N'asdasdas@asdasd.com', N'$2b$10$Pji1bXK43HJplJ7kkb5Due9lHZNk0Ki2s/TkwfSnhPhpZc/NjaLP6', N'asdasd asdasdas', N'31257964', CAST(N'2025-04-05T21:48:31.077' AS DateTime), N'Sin dirección', 1, 0)
INSERT [dbo].[users] ([user_id], [email], [password], [full_name], [phone], [date_creation], [address], [rol_id], [is_disabled]) VALUES (1009, N'fasdd@aac.com', N'$2b$10$y4ufNYEVAIvmKBvvvAhe4e79Vh3zJZ4/hZullViymUp3GFw2nlyTy', N'dfasdfasd fsadfasd', N'31257964', CAST(N'2025-04-05T21:48:53.617' AS DateTime), N'Sin dirección', 1, 0)
INSERT [dbo].[users] ([user_id], [email], [password], [full_name], [phone], [date_creation], [address], [rol_id], [is_disabled]) VALUES (1010, N'fasdd@aac.awsd', N'$2b$10$CsihYo26OdoJLJ.u32UWceRwZX6BYFWJTjn0auIAuzn3PjOhrujiG', N'asdasd asdsad', N'31257964', CAST(N'2025-04-05T22:23:15.217' AS DateTime), N'Sin dirección', 1, 0)
INSERT [dbo].[users] ([user_id], [email], [password], [full_name], [phone], [date_creation], [address], [rol_id], [is_disabled]) VALUES (1011, N'sergio.madero2423@gmail.com', N'$2b$10$mAKKYS7ZowVisVsYmq5/QOHT9V/CSFNlB71uDLSI8BXm/fUP.MdP.', N'Camilo Madero', N'31257964', CAST(N'2025-04-09T04:27:58.560' AS DateTime), N'CL 58 A SUR 48 F 10 Barrio Madelena Bogotá, Cundinamarca | Casa', 1, 0)
INSERT [dbo].[users] ([user_id], [email], [password], [full_name], [phone], [date_creation], [address], [rol_id], [is_disabled]) VALUES (1012, N'pepito@gmail.com', N'$2b$10$Iv0dR1p.St24v1YMj2Gkh.IGPyjv4BrpBOPgnIanfwG65nQ4s0cJu', N'Pepito Perez', N'31253142', CAST(N'2025-04-09T17:07:19.547' AS DateTime), N'Avenida Perdida 46 Barrio La balacera Florencia, Caquetá | Apartamento 12', 1, 0)
SET IDENTITY_INSERT [dbo].[users] OFF
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [order_pay_unique]    Script Date: 15/04/2025 7:36:51 p. m. ******/
ALTER TABLE [dbo].[orders] ADD  CONSTRAINT [order_pay_unique] UNIQUE NONCLUSTERED 
(
	[order_payment_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__users__AB6E6164CA763684]    Script Date: 15/04/2025 7:36:51 p. m. ******/
ALTER TABLE [dbo].[users] ADD UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[orders] ADD  DEFAULT ('now()') FOR [date_creation]
GO
ALTER TABLE [dbo].[orders] ADD  DEFAULT ((1)) FOR [status_id]
GO
ALTER TABLE [dbo].[orders] ADD  DEFAULT ((0.0)) FOR [total_price]
GO
ALTER TABLE [dbo].[products] ADD  DEFAULT ('Producto sin descripcion') FOR [description]
GO
ALTER TABLE [dbo].[roles] ADD  DEFAULT ((0)) FOR [permissions]
GO
ALTER TABLE [dbo].[users] ADD  DEFAULT ((1)) FOR [rol_id]
GO
ALTER TABLE [dbo].[users] ADD  DEFAULT ((0)) FOR [is_disabled]
GO
ALTER TABLE [dbo].[order_products]  WITH NOCHECK ADD FOREIGN KEY([order_id])
REFERENCES [dbo].[orders] ([order_id])
GO
ALTER TABLE [dbo].[order_products]  WITH NOCHECK ADD FOREIGN KEY([order_id])
REFERENCES [dbo].[orders] ([order_id])
GO
ALTER TABLE [dbo].[order_products]  WITH NOCHECK ADD FOREIGN KEY([order_id])
REFERENCES [dbo].[orders] ([order_id])
GO
ALTER TABLE [dbo].[order_products]  WITH NOCHECK ADD FOREIGN KEY([order_id])
REFERENCES [dbo].[orders] ([order_id])
GO
ALTER TABLE [dbo].[order_products]  WITH NOCHECK ADD FOREIGN KEY([order_id])
REFERENCES [dbo].[orders] ([order_id])
GO
ALTER TABLE [dbo].[order_products]  WITH NOCHECK ADD FOREIGN KEY([order_id])
REFERENCES [dbo].[orders] ([order_id])
GO
ALTER TABLE [dbo].[orders]  WITH NOCHECK ADD FOREIGN KEY([status_id])
REFERENCES [dbo].[status] ([status_id])
GO
ALTER TABLE [dbo].[orders]  WITH NOCHECK ADD FOREIGN KEY([status_id])
REFERENCES [dbo].[status] ([status_id])
GO
ALTER TABLE [dbo].[orders]  WITH NOCHECK ADD FOREIGN KEY([status_id])
REFERENCES [dbo].[status] ([status_id])
GO
ALTER TABLE [dbo].[orders]  WITH NOCHECK ADD FOREIGN KEY([status_id])
REFERENCES [dbo].[status] ([status_id])
GO
ALTER TABLE [dbo].[orders]  WITH NOCHECK ADD FOREIGN KEY([status_id])
REFERENCES [dbo].[status] ([status_id])
GO
ALTER TABLE [dbo].[orders]  WITH NOCHECK ADD FOREIGN KEY([status_id])
REFERENCES [dbo].[status] ([status_id])
GO
ALTER TABLE [dbo].[orders]  WITH NOCHECK ADD FOREIGN KEY([status_id])
REFERENCES [dbo].[status] ([status_id])
GO
ALTER TABLE [dbo].[orders]  WITH NOCHECK ADD FOREIGN KEY([status_id])
REFERENCES [dbo].[status] ([status_id])
GO
ALTER TABLE [dbo].[orders]  WITH NOCHECK ADD FOREIGN KEY([status_id])
REFERENCES [dbo].[status] ([status_id])
GO
ALTER TABLE [dbo].[orders]  WITH NOCHECK ADD FOREIGN KEY([status_id])
REFERENCES [dbo].[status] ([status_id])
GO
ALTER TABLE [dbo].[orders]  WITH NOCHECK ADD FOREIGN KEY([status_id])
REFERENCES [dbo].[status] ([status_id])
GO
ALTER TABLE [dbo].[orders]  WITH NOCHECK ADD FOREIGN KEY([status_id])
REFERENCES [dbo].[status] ([status_id])
GO
ALTER TABLE [dbo].[orders]  WITH NOCHECK ADD FOREIGN KEY([status_id])
REFERENCES [dbo].[status] ([status_id])
GO
ALTER TABLE [dbo].[orders]  WITH NOCHECK ADD FOREIGN KEY([status_id])
REFERENCES [dbo].[status] ([status_id])
GO
ALTER TABLE [dbo].[orders]  WITH NOCHECK ADD FOREIGN KEY([status_id])
REFERENCES [dbo].[status] ([status_id])
GO
ALTER TABLE [dbo].[orders]  WITH NOCHECK ADD FOREIGN KEY([status_id])
REFERENCES [dbo].[status] ([status_id])
GO
ALTER TABLE [dbo].[orders]  WITH NOCHECK ADD FOREIGN KEY([status_id])
REFERENCES [dbo].[status] ([status_id])
GO
ALTER TABLE [dbo].[orders]  WITH NOCHECK ADD FOREIGN KEY([status_id])
REFERENCES [dbo].[status] ([status_id])
GO
ALTER TABLE [dbo].[orders]  WITH NOCHECK ADD FOREIGN KEY([user_id])
REFERENCES [dbo].[users] ([user_id])
GO
ALTER TABLE [dbo].[orders]  WITH NOCHECK ADD FOREIGN KEY([user_id])
REFERENCES [dbo].[users] ([user_id])
GO
ALTER TABLE [dbo].[orders]  WITH NOCHECK ADD FOREIGN KEY([user_id])
REFERENCES [dbo].[users] ([user_id])
GO
ALTER TABLE [dbo].[orders]  WITH NOCHECK ADD FOREIGN KEY([user_id])
REFERENCES [dbo].[users] ([user_id])
GO
ALTER TABLE [dbo].[orders]  WITH NOCHECK ADD FOREIGN KEY([user_id])
REFERENCES [dbo].[users] ([user_id])
GO
ALTER TABLE [dbo].[orders]  WITH NOCHECK ADD FOREIGN KEY([user_id])
REFERENCES [dbo].[users] ([user_id])
GO
ALTER TABLE [dbo].[users]  WITH NOCHECK ADD FOREIGN KEY([rol_id])
REFERENCES [dbo].[roles] ([rol_id])
GO
ALTER TABLE [dbo].[users]  WITH NOCHECK ADD FOREIGN KEY([rol_id])
REFERENCES [dbo].[roles] ([rol_id])
GO
ALTER TABLE [dbo].[users]  WITH NOCHECK ADD FOREIGN KEY([rol_id])
REFERENCES [dbo].[roles] ([rol_id])
GO
ALTER TABLE [dbo].[users]  WITH NOCHECK ADD FOREIGN KEY([rol_id])
REFERENCES [dbo].[roles] ([rol_id])
GO
ALTER TABLE [dbo].[users]  WITH NOCHECK ADD FOREIGN KEY([rol_id])
REFERENCES [dbo].[roles] ([rol_id])
GO
ALTER TABLE [dbo].[users]  WITH NOCHECK ADD FOREIGN KEY([rol_id])
REFERENCES [dbo].[roles] ([rol_id])
GO
/****** Object:  StoredProcedure [dbo].[CheckProductStock]    Script Date: 15/04/2025 7:36:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CheckProductStock]
/*
 * PROCEDIMIENTO PARA CHECAR SI EXISTE SUFICIENTE STOCK
 *
 * Parámetros:
 * @product_id
 * @quantity
 *
 * De existir suficiente stock, se devuelve IsStockAvailable = 1
*/
	@product_id INT,
	@quantity INT
AS
	BEGIN
		DECLARE @stock INT

		SELECT @stock = stock FROM products WHERE product_id = @product_id

		IF @Stock >= @quantity
			SELECT 1 AS IsStockAvailable
		ELSE
			SELECT 0 AS IsStockAvailable
	END
GO
/****** Object:  StoredProcedure [dbo].[CreateOrder]    Script Date: 15/04/2025 7:36:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[CreateOrder]
	@user_id int,
	@payment_id varchar(100),
	@price decimal,
	@detalles varchar(200)
AS
	BEGIN
		DECLARE @order_id int
		DECLARE @address varchar(255)
		DECLARE @client_name varchar(50)
		DECLARE @client_phone varchar(8)

		SET @address = (SELECT address FROM users WHERE user_id = @user_id)
		SET @client_name = (SELECT full_name FROM users WHERE user_id = @user_id)
		SET @client_phone = (SELECT phone FROM users WHERE user_id = @user_id)

		INSERT INTO orders (
			user_id,
			date_creation,
			address,
			total_price,
			client_name,
			client_phone,
			details,
			order_payment_id
		)
		VALUES (
			@user_id,
			GETDATE(),
			@address,
			@price,
			@client_name,
			@client_phone,
			@detalles,
			@payment_id
		)

		SET @order_id = SCOPE_IDENTITY()

		SELECT * FROM orders WHERE order_id = @order_id

	END
GO
/****** Object:  StoredProcedure [dbo].[CreateOrderProducts]    Script Date: 15/04/2025 7:36:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CreateOrderProducts]

/*
 * PROCEDIMIENTO PARA CREAR CADA PRODUCTO INDIVIDUAL DE UNA ORDEN
 *
 * Parámetros:
 * @order_id - ID de la orden donde se agregará el producto
 * @product_id - ID del producto a agregar
 * @quantity - Cantidad del producto
 * @subtotal - Cantidad de productos * Precio individual
 *
 *
*/
	@order_id int,
	@product_id int,
	@quantity int

AS
	BEGIN

		DECLARE @subtotal decimal(10,2)
		DECLARE @price decimal(10,2)
		SET @price = (SELECT price FROM products WHERE product_id = @product_id)
		SET @subtotal = @price * @quantity

		INSERT INTO order_products
		(
			order_id,
			product_id,
			quantity,
			subtotal
		)
		VALUES (
			@order_id,
			@product_id,
			@quantity,
			@subtotal
		)

		DECLARE @order_product_id int = SCOPE_IDENTITY()
		SELECT * FROM order_products WHERE order_details_id = @order_product_id

		UPDATE products SET stock = stock - @quantity WHERE product_id = @product_id
		SELECT * FROM orders WHERE order_id = @order_id

	END
GO
/****** Object:  StoredProcedure [dbo].[CreateProduct]    Script Date: 15/04/2025 7:36:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CreateProduct]

/*
 * PROCEDIMIENTO PARA CREAR PRODUCTO
 *
 * Parámetros:
 * @name - Nombre
 * @brand - Marca
 * @price - Precio
 * @stock - Stock existente
 * @category_id - Categoria
 * @code - Codigo de barras
 *
 *
*/
	@name varchar(100),
	@brand varchar(50),
	@price decimal(9),
	@description varchar(1000),
	@stock int,
	@category_id int,
	@code varchar(50)

AS
	BEGIN
		DECLARE @product_id int;
		INSERT INTO products (
			name,
			brand,
			price,
			description,
			stock,
			category_id,
			code,
			date_creation
		)
		VALUES (
			@name,
			@brand,
			@price,
			@description,
			@stock,
			@category_id,
			@code,
			GETDATE()
		)

		SET @product_id = SCOPE_IDENTITY()

		SELECT * FROM products WHERE product_id = @product_id
	END
GO
/****** Object:  StoredProcedure [dbo].[CreateProductCategory]    Script Date: 15/04/2025 7:36:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CreateProductCategory]
	@name varchar(50)
AS
	BEGIN
		INSERT INTO categories (
			name
		)
		VALUES (
			@name
		)

		DECLARE @category_id int
		SET @category_id = SCOPE_IDENTITY()

		SELECT * FROM categories WHERE category_id = @category_id
	END
GO
/****** Object:  StoredProcedure [dbo].[CreateUser]    Script Date: 15/04/2025 7:36:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[CreateUser]
	@email varchar(50),
	@password varchar(255),
	@full_name varchar(50),
	@phone varchar(8),
	@rol_id int,
	@address varchar(250)
AS
	BEGIN
		DECLARE @user_id int;
		INSERT INTO users (
			email,
			password,
			full_name,
			phone,
			date_creation,
			rol_id,
			address
		)
		VALUES (
			@email,
			@password,
			@full_name,
			@phone,
			GETDATE(),
			@rol_id,
			@address
		)

		SET @user_id = SCOPE_IDENTITY()

		SELECT * FROM users WHERE user_id = @user_id
	END
RETURN 0
GO
/****** Object:  StoredProcedure [dbo].[LoadAllProducts]    Script Date: 15/04/2025 7:36:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[LoadAllProducts]
/*
 * PROCEDIMIENTO PARA CARGAR PRODUCTOs
 *
 *
 *
*/

AS
	BEGIN
		SELECT
		p.product_id,
		p.name,
		p.brand,
		p.price,
		p.stock,
		p.category_id,
		p.description,
		c.name AS category_name,
		p.image_url,
		p.is_disabled
		FROM products p
		INNER JOIN categories c ON p.category_id = c.category_id
	END
GO
/****** Object:  StoredProcedure [dbo].[LoadOrder]    Script Date: 15/04/2025 7:36:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[LoadOrder]

/*
 * PROCEDIMIENTO PARA CARGAR UNA ORDEN
 *
 * Parametros
 * @order_id
 *
*/
	@order_id int

AS
	BEGIN
		SELECT o.order_id, o.user_id, o.client_name, o.client_phone,o.date_creation, o.address, o.total_price, o.details, o.status_id, s.name
		FROM orders o
		INNER JOIN status s
		ON o.status_id = s.status_id

		WHERE o.order_id = @order_id
	END
GO
/****** Object:  StoredProcedure [dbo].[LoadOrderDetailsByMaster]    Script Date: 15/04/2025 7:36:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[LoadOrderDetailsByMaster]

/*
 * PROCEDIMIENTO PARA CARGAR LOS PRODUCTOS DE UNA ORDEN
 *
 * Parametros
 * @order_id
 *
*/
	@order_id int

AS
	BEGIN
		SELECT op.order_details_id, p.name, op.quantity, op.subtotal
		FROM order_products op
		INNER JOIN products p
		ON op.product_id = p.product_id
		WHERE op.order_id = @order_id
	END
GO
/****** Object:  StoredProcedure [dbo].[LoadOrders]    Script Date: 15/04/2025 7:36:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[LoadOrders]

/*
 * PROCEDIMIENTO PARA CARGAR TODAS LAS ORDENES Y EL NOMBRE DEL CLIENTE
 *

 *
 *
*/

AS
	BEGIN

		SELECT o.order_id, o.user_id, o.client_name, o.client_phone,o.date_creation, o.address, o.total_price, o.details, o.status_id, s.name
		FROM orders o
		INNER JOIN users u
		ON o.user_id = u.user_id
		INNER JOIN status s
		ON o.status_id = s.status_id
	END
GO
/****** Object:  StoredProcedure [dbo].[LoadOrdersByUser]    Script Date: 15/04/2025 7:36:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[LoadOrdersByUser]

/*
 * PROCEDIMIENTO PARA CARGAR TODAS LAS ORDENES DEL CLIENTE
 *
 * Parametros
 * @user_id
*/
@user_id int
AS
	BEGIN
		SELECT o.order_id, o.user_id, o.client_name, o.client_phone,o.date_creation, o.address, o.total_price, o.details, o.status_id, s.name
		FROM orders o
		INNER JOIN status s
		ON o.status_id = s.status_id
		WHERE user_id = @user_id
	END
GO
/****** Object:  StoredProcedure [dbo].[LoadProductByCode]    Script Date: 15/04/2025 7:36:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[LoadProductByCode]
/*
 * PROCEDIMIENTO PARA CARGAR PRODUCTO SEGUN EL CODIGO
 *
 * Parámetros:
 * @code
 *
*/
	@code varchar(50)
AS
	BEGIN
		SELECT * FROM products
		WHERE
			code = @code
	END
GO
/****** Object:  StoredProcedure [dbo].[LoadProducts]    Script Date: 15/04/2025 7:36:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[LoadProducts]
/*
 * PROCEDIMIENTO PARA CARGAR PRODUCTOS SEGUN CRITERIOS
 *
 * Parámetros:
 * @name
 * @brand
 * @price_min
 * @price_max
 * @category_id
 *
 *
*/
	@name varchar(100),
	@brand varchar(50),
	@price_min int,
	@price_max int,
	@category_id int
AS
	BEGIN
		SELECT p.product_id, p.name, p.brand, p.price, p.category_id, c.name as category_name, p.image_url, p.stock  FROM products p
		INNER JOIN categories c
		ON p.category_id = c.category_id

		WHERE
			(p.price >= COALESCE(@price_min, 0)  AND
			p.price <= COALESCE(@price_max, 10000)) AND

			(@name IS NULL OR p.name LIKE '%' + @name + '%') AND
			(@brand IS NULL OR p.brand LIKE '%' + @brand + '%') AND
			(@category_id IS NULL OR p.category_id = @category_id) AND
			p.is_disabled = 0
	END
GO
/****** Object:  StoredProcedure [dbo].[LoadTopProducts]    Script Date: 15/04/2025 7:36:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[LoadTopProducts]
/*
 * PROCEDIMIENTO PARA CARGAR PRODUCTOS MAS COMPRADOS
 *
 *
 *
*/
AS
	BEGIN
		SELECT TOP 4
			p.product_id,
			p.name,
			p.brand,
			p.price,
			p.stock,
			p.category_id,
			c.name AS category_name,
			p.image_url,
			p.is_disabled,
            COUNT(op.product_id) AS total_purchases
			FROM products p
			JOIN order_products op ON p.product_id = op.product_id
			JOIN categories c ON p.category_id = c.category_id
			WHERE p.is_disabled = 0
			GROUP BY p.product_id, p.name, p.brand, p.price, p.stock, p.category_id, c.name, p.image_url, p.is_disabled
			ORDER BY total_purchases DESC;
	END
GO
/****** Object:  StoredProcedure [dbo].[LoadUserData]    Script Date: 15/04/2025 7:36:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[LoadUserData]
/*
 * PROCEDIMIENTO PARA CARGAR DATOS DEL USUARIO
 *
 * Parámetros:
 * @user_id
 *
 *
*/
	@user_id INT
AS
	BEGIN
		SELECT * FROM users WHERE user_id = @user_id
	END
GO
/****** Object:  StoredProcedure [dbo].[LoadUserPassword]    Script Date: 15/04/2025 7:36:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[LoadUserPassword]
/*
 * PROCEDIMIENTO PARA CARGAR LA CONTRASEÑA DEL USUARIO SEGÚN EL CORREO INGRESADO
 *
 * Parámetros:
 * @email - Email a cargar
 *
 *
*/
	@email varchar(100)
AS
	BEGIN
		SELECT user_id, password FROM users WHERE email = @email
	END
GO
/****** Object:  StoredProcedure [dbo].[LoadUsersData]    Script Date: 15/04/2025 7:36:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[LoadUsersData]
/*
 * PROCEDIMIENTO PARA CARGAR TODOS LOS USUARIOS
 *
 *
*/
AS
	BEGIN
		SELECT user_id, email, full_name, rol_id, phone, address, date_creation, is_disabled FROM users
	END
GO
/****** Object:  StoredProcedure [dbo].[UpdateCategory]    Script Date: 15/04/2025 7:36:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateCategory]

/*
 * PROCEDIMIENTO PARA ACTUALIZAR UNA CATEGORIA
 *
 * Parámetros:
 * @category_id
 * @is_disabled
 * @name
 *
*/
	@category_id int,
	@name VARCHAR(50),
	@is_disabled bit
AS
	BEGIN

		UPDATE categories SET is_disabled = @is_disabled, name = @name WHERE category_id = @category_id

		SELECT * FROM categories WHERE category_id = @category_id
	END
GO
/****** Object:  StoredProcedure [dbo].[UpdateCategoryStatus]    Script Date: 15/04/2025 7:36:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateCategoryStatus]

/*
 * PROCEDIMIENTO PARA CAMBIAR EL ESTADO DE UNA CATEGORIA
 *
 * Parámetros:
 * @category_id
 *
*/
	@category_id int
AS
	BEGIN

		UPDATE products
		SET is_disabled = 1
		WHERE category_id = @category_id

		UPDATE categories SET is_disabled = is_disabled ^ 1 WHERE category_id = @category_id

		SELECT * FROM categories WHERE category_id = @category_id
	END
GO
/****** Object:  StoredProcedure [dbo].[UpdateOrderProducts]    Script Date: 15/04/2025 7:36:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateOrderProducts]

/*
 * PROCEDIMIENTO PARA ACTUALIZAR PRODUCTO DE UNA ORDEN
 *
 * Parámetros:
 * @order_product_id - ID de la orden del producto a modificar
 * @product_id - ID del producto a agregar
 * @quantity - Cantidad del producto
 * @subtotal - Cantidad de productos * Precio individual
 *
 *
*/
	@order_details_id int,
	@product_id int,
	@quantity int

AS
	BEGIN
		DECLARE @subtotal decimal(10,2)
		DECLARE @price decimal(10,2)

		/* Variables de valores antiguos */
		DECLARE @pre_quantity int
		DECLARE @pre_total decimal(10,2)
		DECLARE @order_id int

		/* Obtenemos el precio individual y lo convertimos a nuestro subtotal */
		SELECT @price = price FROM products WHERE product_id = @product_id
		SET @subtotal = @price * @quantity

		/* Obtenemos el ID de la orden */
		SELECT @order_id = order_id FROM order_products WHERE order_details_id = @order_details_id

		/* Valores antiguos */
		SELECT @pre_quantity = quantity FROM order_products WHERE order_details_id = @order_details_id
		SELECT @pre_total = total_price FROM orders WHERE order_id = @order_id

		/* Actualizamos orden del producto */
		UPDATE order_products SET
			product_id = @product_id,
			quantity = @quantity,
			subtotal = @subtotal
		WHERE order_details_id = @order_details_id

		/* Actualizamos nuevo stock */
		UPDATE products SET stock = stock + @pre_quantity - @quantity WHERE product_id = @product_id
		/* Actualizamos nuevo total */
		UPDATE orders SET total_price = total_price - @pre_total + @subtotal WHERE order_id = @order_id

		SELECT * FROM order_products WHERE order_details_id = @order_details_id
		SELECT * FROM orders WHERE order_id = @order_id
	END
GO
/****** Object:  StoredProcedure [dbo].[UpdateOrderStatus]    Script Date: 15/04/2025 7:36:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateOrderStatus]

/*
 * PROCEDIMIENTO PARA ACTUALIZAR EL ESTADO DE UNA ORDEN
 *
 * Parámetros:
 * @order_id - ID de la orden
 * @status - Nuevo estado
 *
 * Posibles estados:
 * 1. No procesado (Espera de un operador)
 * 2. Aceptado por el operador
 * 3. Rechazado por el operador
 * 4. Cancelado por el usuario
 * 5. Entregado
 *
 *
*/
	@order_id int,
	@status int

AS
	BEGIN
		UPDATE orders SET status_id = @status WHERE order_id = @order_id

		IF @status = 3 or @status = 4
		BEGIN
			UPDATE products
			SET stock = stock + op.quantity
			FROM products p
			INNER JOIN order_products op ON p.product_id = op.product_id
			WHERE op.order_id = @order_id
		END

		EXEC LoadOrder @order_id = @order_id
	END
GO
/****** Object:  StoredProcedure [dbo].[UpdateProduct]    Script Date: 15/04/2025 7:36:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateProduct]

/*
 * PROCEDIMIENTO PARA ACTUALIZAR UN PRODUCTO
 *
 * Parámetros:
 * @name - Nombre
 * @brand - Marca
 * @price - Precio
 * @stock - Stock existente
 * @category_id - Categoria
 * @code - Codigo de barras
 *
 *
*/
	@product_id int,
	@name varchar(100) = NULL,
	@brand varchar(50) = NULL,
	@price decimal(9) = NULL,
	@stock int = NULL,
	@category_id int = NULL,
	@code varchar(50) = NULL

AS
	BEGIN
		UPDATE products

		SET

		name = COALESCE(@name, name),
		brand = COALESCE(@brand, brand),
		price = COALESCE(@price, price),
		stock = COALESCE(@stock, stock),
		category_id = COALESCE(@category_id, category_id),
		code = COALESCE(@code, code)
		WHERE product_id = @product_id

		SELECT * FROM products WHERE product_id = @product_id
	END
GO
/****** Object:  StoredProcedure [dbo].[UpdateProductStatus]    Script Date: 15/04/2025 7:36:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateProductStatus]

/*
 * PROCEDIMIENTO PARA ACTUALIZAR EL ESTADO DEL PRODUCTO
 *
 * Parámetros:
 * @product_id

 *
*/
	@product_id int
AS
	BEGIN
		UPDATE products

		SET
		is_disabled = is_disabled ^ 1
		WHERE product_id = @product_id

		SELECT * FROM products WHERE product_id = @product_id
	END
GO
/****** Object:  StoredProcedure [dbo].[UpdateUser]    Script Date: 15/04/2025 7:36:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[UpdateUser]

/*
 * PROCEDIMIENTO PARA ACTUALIZAR UN USUARIO
 *
 * Parámetros:
 * @user_id - ID de usuario
 * @email - Correo
 * @full_name - Nombre completo
 * @phone - Telefono
 * @birthday - Fecha de nacimiento
 * @address - Direccion de entrega
 *
 *
*/
	@user_id INT,

	@email VARCHAR(100) = NULL,
	@full_name VARCHAR(50) = NULL,
	@phone VARCHAR(8) = NULL,
	@address VARCHAR(250) = NULL,
	@is_disabled BIT = NULL,
	@rol_id INT = NULL

AS
	BEGIN
		UPDATE users

		SET
			email = COALESCE(@email, email),
			full_name = COALESCE(@full_name, full_name),
			phone = COALESCE(@phone, phone),
			address = COALESCE(@address, address),
			is_disabled = COALESCE(@is_disabled, is_disabled),
			rol_id = COALESCE(@rol_id, rol_id)
		WHERE user_id = @user_id

		SELECT * FROM users WHERE user_id = @user_id
	END
GO
USE [master]
GO
ALTER DATABASE [joryan_db] SET  READ_WRITE 
GO
