USE [master]
GO
/****** Object:  Database [Inventory]    Script Date: 24/3/2025 21:02:22 ******/
CREATE DATABASE [Inventory]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Inventory', FILENAME = N'/var/opt/mssql/data/Inventory.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Inventory_log', FILENAME = N'/var/opt/mssql/data/Inventory_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [Inventory] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Inventory].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Inventory] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Inventory] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Inventory] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Inventory] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Inventory] SET ARITHABORT OFF 
GO
ALTER DATABASE [Inventory] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Inventory] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Inventory] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Inventory] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Inventory] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Inventory] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Inventory] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Inventory] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Inventory] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Inventory] SET  DISABLE_BROKER 
GO
ALTER DATABASE [Inventory] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Inventory] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Inventory] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Inventory] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Inventory] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Inventory] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Inventory] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Inventory] SET RECOVERY FULL 
GO
ALTER DATABASE [Inventory] SET  MULTI_USER 
GO
ALTER DATABASE [Inventory] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Inventory] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Inventory] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Inventory] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Inventory] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [Inventory] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [Inventory] SET QUERY_STORE = ON
GO
ALTER DATABASE [Inventory] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [Inventory]
GO
/****** Object:  Table [dbo].[Movements]    Script Date: 24/3/2025 21:02:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Movements](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Date] [datetime] NOT NULL,
	[Type] [int] NOT NULL,
	[ItemId] [int] NOT NULL,
	[Quantity] [int] NOT NULL,
	[UnitPrice] [decimal](18, 2) NOT NULL,
	[TotalPrice] [decimal](18, 2) NOT NULL,
	[Detail] [nvarchar](100) NULL,
 CONSTRAINT [PK_Movements] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
USE [master]
GO
ALTER DATABASE [Inventory] SET  READ_WRITE 
GO


USE [master]
GO
/****** Object:  Database [Product]    Script Date: 24/3/2025 21:04:42 ******/
CREATE DATABASE [Product]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Products', FILENAME = N'/var/opt/mssql/data/Products.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Products_log', FILENAME = N'/var/opt/mssql/data/Products_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [Product] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Product].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Product] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Product] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Product] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Product] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Product] SET ARITHABORT OFF 
GO
ALTER DATABASE [Product] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Product] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Product] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Product] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Product] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Product] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Product] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Product] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Product] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Product] SET  DISABLE_BROKER 
GO
ALTER DATABASE [Product] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Product] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Product] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Product] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Product] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Product] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Product] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Product] SET RECOVERY FULL 
GO
ALTER DATABASE [Product] SET  MULTI_USER 
GO
ALTER DATABASE [Product] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Product] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Product] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Product] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Product] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [Product] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [Product] SET QUERY_STORE = ON
GO
ALTER DATABASE [Product] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [Product]
GO
/****** Object:  Table [dbo].[Category]    Script Date: 24/3/2025 21:04:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Category](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Category] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Item]    Script Date: 24/3/2025 21:04:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Item](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](50) NOT NULL,
	[CategoryId] [int] NOT NULL,
	[Image] [nvarchar](1024) NOT NULL,
	[Price] [decimal](18, 2) NOT NULL,
	[Stock] [int] NOT NULL,
	[IsActive] [bit] NOT NULL,
 CONSTRAINT [PK_Item] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Category] ON 

INSERT [dbo].[Category] ([Id], [Name]) VALUES (1, N'Electrónica')
INSERT [dbo].[Category] ([Id], [Name]) VALUES (2, N'Hogar')
INSERT [dbo].[Category] ([Id], [Name]) VALUES (3, N'Accesorios')
INSERT [dbo].[Category] ([Id], [Name]) VALUES (4, N'Muebles')
INSERT [dbo].[Category] ([Id], [Name]) VALUES (5, N'Oficina')
INSERT [dbo].[Category] ([Id], [Name]) VALUES (6, N'Audio')
INSERT [dbo].[Category] ([Id], [Name]) VALUES (7, N'Almacenamiento')
INSERT [dbo].[Category] ([Id], [Name]) VALUES (8, N'Componentes')
SET IDENTITY_INSERT [dbo].[Category] OFF
GO
SET IDENTITY_INSERT [dbo].[Item] ON 

INSERT [dbo].[Item] ([Id], [Name], [Description], [CategoryId], [Image], [Price], [Stock], [IsActive]) VALUES (2, N'Laptop X1S', N'Laptop potente X3', 1, N'/images/headphones.jpg', CAST(1200.00 AS Decimal(18, 2)), 10, 1)
INSERT [dbo].[Item] ([Id], [Name], [Description], [CategoryId], [Image], [Price], [Stock], [IsActive]) VALUES (3, N'Smartphone Pro', N'Alta gama', 1, N'/images/phone.jpg', CAST(900.00 AS Decimal(18, 2)), 10, 1)
INSERT [dbo].[Item] ([Id], [Name], [Description], [CategoryId], [Image], [Price], [Stock], [IsActive]) VALUES (4, N'Teclado Mecánico', N'Retroiluminado', 3, N'/images/keyboard.jpg', CAST(80.00 AS Decimal(18, 2)), 25, 1)
INSERT [dbo].[Item] ([Id], [Name], [Description], [CategoryId], [Image], [Price], [Stock], [IsActive]) VALUES (5, N'Mouse Gamer', N'Ergonómico', 3, N'/images/mouse.jpg', CAST(45.00 AS Decimal(18, 2)), 30, 1)
INSERT [dbo].[Item] ([Id], [Name], [Description], [CategoryId], [Image], [Price], [Stock], [IsActive]) VALUES (6, N'Monitor 4K', N'Alta resolución', 1, N'/images/monitor.jpg', CAST(500.00 AS Decimal(18, 2)), 12, 1)
INSERT [dbo].[Item] ([Id], [Name], [Description], [CategoryId], [Image], [Price], [Stock], [IsActive]) VALUES (7, N'Silla Gamer', N'Cómoda y ergonómica', 4, N'/images/chair.jpg', CAST(250.00 AS Decimal(18, 2)), 8, 1)
INSERT [dbo].[Item] ([Id], [Name], [Description], [CategoryId], [Image], [Price], [Stock], [IsActive]) VALUES (8, N'Tablet X10', N'Pantalla grande', 1, N'/images/tablet.jpg', CAST(600.00 AS Decimal(18, 2)), 20, 1)
INSERT [dbo].[Item] ([Id], [Name], [Description], [CategoryId], [Image], [Price], [Stock], [IsActive]) VALUES (9, N'Impresora Láser', N'Alta velocidad', 5, N'/images/printer.jpg', CAST(300.00 AS Decimal(18, 2)), 10, 1)
INSERT [dbo].[Item] ([Id], [Name], [Description], [CategoryId], [Image], [Price], [Stock], [IsActive]) VALUES (10, N'Auriculares Bluetooth', N'Sonido envolvente', 6, N'/images/headphones.jpg', CAST(100.00 AS Decimal(18, 2)), 40, 1)
INSERT [dbo].[Item] ([Id], [Name], [Description], [CategoryId], [Image], [Price], [Stock], [IsActive]) VALUES (11, N'Cámara Web HD', N'1080p', 3, N'/images/webcam.jpg', CAST(70.00 AS Decimal(18, 2)), 18, 1)
INSERT [dbo].[Item] ([Id], [Name], [Description], [CategoryId], [Image], [Price], [Stock], [IsActive]) VALUES (12, N'Disco Duro 1TB', N'Almacenamiento rápido', 7, N'/images/hdd.jpg', CAST(120.00 AS Decimal(18, 2)), 22, 1)
INSERT [dbo].[Item] ([Id], [Name], [Description], [CategoryId], [Image], [Price], [Stock], [IsActive]) VALUES (13, N'SSD 500GB', N'Ultra rápido', 7, N'/images/ssd.jpg', CAST(150.00 AS Decimal(18, 2)), 14, 1)
INSERT [dbo].[Item] ([Id], [Name], [Description], [CategoryId], [Image], [Price], [Stock], [IsActive]) VALUES (14, N'Fuente 750W', N'Eficiencia 80 Plus', 8, N'/images/psu.jpg', CAST(110.00 AS Decimal(18, 2)), 16, 1)
INSERT [dbo].[Item] ([Id], [Name], [Description], [CategoryId], [Image], [Price], [Stock], [IsActive]) VALUES (15, N'Tarjeta Gráfica RTX', N'4K Gaming', 8, N'/images/gpu.jpg', CAST(800.00 AS Decimal(18, 2)), 6, 1)
INSERT [dbo].[Item] ([Id], [Name], [Description], [CategoryId], [Image], [Price], [Stock], [IsActive]) VALUES (16, N'Microprocesador i9', N'Última generación', 8, N'/images/cpu.jpg', CAST(500.00 AS Decimal(18, 2)), 9, 1)
INSERT [dbo].[Item] ([Id], [Name], [Description], [CategoryId], [Image], [Price], [Stock], [IsActive]) VALUES (17, N'TV Android 8k', N'TV de última generación', 2, N'/images/tv.jpg', CAST(500.00 AS Decimal(18, 2)), 3, 0)
INSERT [dbo].[Item] ([Id], [Name], [Description], [CategoryId], [Image], [Price], [Stock], [IsActive]) VALUES (19, N'Fan', N'Fanrgb', 8, N'/images/ssd.jpg', CAST(190.00 AS Decimal(18, 2)), 2, 1)
INSERT [dbo].[Item] ([Id], [Name], [Description], [CategoryId], [Image], [Price], [Stock], [IsActive]) VALUES (21, N'Liquid', N'enfriamiento liquido', 1, N'/images/ssd.jpg', CAST(35.00 AS Decimal(18, 2)), 2, 1)
INSERT [dbo].[Item] ([Id], [Name], [Description], [CategoryId], [Image], [Price], [Stock], [IsActive]) VALUES (22, N'teter', N'test', 1, N'/images/phone.jpg', CAST(47.00 AS Decimal(18, 2)), 3, 1)
INSERT [dbo].[Item] ([Id], [Name], [Description], [CategoryId], [Image], [Price], [Stock], [IsActive]) VALUES (23, N'qweqrty', N'qweqrty', 1, N'/images/webcam.jpg', CAST(2342.00 AS Decimal(18, 2)), 3, 1)
INSERT [dbo].[Item] ([Id], [Name], [Description], [CategoryId], [Image], [Price], [Stock], [IsActive]) VALUES (24, N'po', N'po', 1, N'/images/headphones.jpg', CAST(2.00 AS Decimal(18, 2)), 1, 1)
INSERT [dbo].[Item] ([Id], [Name], [Description], [CategoryId], [Image], [Price], [Stock], [IsActive]) VALUES (25, N'rty', N'rty', 1, N'/images/printer.jpg', CAST(55.00 AS Decimal(18, 2)), 2, 0)
INSERT [dbo].[Item] ([Id], [Name], [Description], [CategoryId], [Image], [Price], [Stock], [IsActive]) VALUES (26, N'asd', N'asd', 1, N'/images/tablet.jpg', CAST(333.00 AS Decimal(18, 2)), 3, 0)
SET IDENTITY_INSERT [dbo].[Item] OFF
GO
ALTER TABLE [dbo].[Item]  WITH CHECK ADD  CONSTRAINT [FK_Item_Category] FOREIGN KEY([CategoryId])
REFERENCES [dbo].[Category] ([Id])
GO
ALTER TABLE [dbo].[Item] CHECK CONSTRAINT [FK_Item_Category]
GO
USE [master]
GO
ALTER DATABASE [Product] SET  READ_WRITE 
GO
