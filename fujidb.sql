--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: profiledata; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public.profiledata (
    user_id integer NOT NULL,
    numberofposts integer NOT NULL,
    saved integer NOT NULL,
    description character varying(255) NOT NULL,
    profilepicurl character varying(255) NOT NULL
);


ALTER TABLE public.profiledata OWNER TO dev;

--
-- Name: userPosts; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public."userPosts" (
    "userId" integer,
    "postId" integer NOT NULL,
    "pictureUrl" text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."userPosts" OWNER TO dev;

--
-- Name: userPosts_postId_seq; Type: SEQUENCE; Schema: public; Owner: dev
--

CREATE SEQUENCE public."userPosts_postId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."userPosts_postId_seq" OWNER TO dev;

--
-- Name: userPosts_postId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dev
--

ALTER SEQUENCE public."userPosts_postId_seq" OWNED BY public."userPosts"."postId";


--
-- Name: users; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "Name" character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO dev;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: dev
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO dev;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dev
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: userPosts postId; Type: DEFAULT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public."userPosts" ALTER COLUMN "postId" SET DEFAULT nextval('public."userPosts_postId_seq"'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: profiledata; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.profiledata (user_id, numberofposts, saved, description, profilepicurl) FROM stdin;
93	0	0	YO DUH	160610-zimmerman-bueller-tease_c2of7p.webp
94	0	0	BOOOOAAAATS	whoseop_circular.png
95	0	0	BEEP BOP	ca8.png
\.


--
-- Data for Name: userPosts; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public."userPosts" ("userId", "postId", "pictureUrl", "createdAt") FROM stdin;
93	10	45924bdcba66dedfd78278c6231e7cf6.jpg	2020-08-17 11:19:36.856938-07
93	11	296591c6a4b6e22cc2d6c4c1b3a8d4fc.jpg	2020-08-17 11:22:02.874141-07
93	12	9a17b7603a3270f9c54d379168b9f75f.jpg	2020-08-17 11:22:46.373238-07
94	13	images.jpg	2020-08-17 11:26:48.663829-07
94	14	whoseop_circular.png	2020-08-17 11:34:13.047061-07
94	15	Space-news-human-colony-on-Moon-lunar-colonies-lava-tubes-Asgardia-Lembit-Opik-1211678.jpg	2020-08-17 11:40:36.003501-07
94	16	_109648231_ohmy.png	2020-08-17 17:51:44.813755-07
94	17	115232-002.jpg	2020-08-17 17:51:59.303213-07
93	18	original.jpg	2020-08-17 17:52:46.689049-07
93	19	NGNP-GRANDPRIZE-1stPlace-Wildlife-1-800x534.jpg	2020-08-17 17:52:56.104463-07
93	20	960x0.jpg	2020-08-25 14:16:06.485815-07
93	21	296591c6a4b6e22cc2d6c4c1b3a8d4fc.jpg	2020-08-26 12:32:58.33416-07
95	22	ca_1116NID_Dome_Tent_online_CC_cropped.jpg	2020-08-26 12:37:52.211889-07
95	23	Apple_Shot-on-iPhone-Challenge-2020_Eric-Zhang_01082020_big.jpg.large_2x.jpg	2020-08-26 12:38:12.971823-07
95	24	glamis.jpg	2020-08-26 12:39:04.79898-07
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.users (user_id, username, password, "Name", email, created_at) FROM stdin;
93	Modzzz	$2b$10$YY4xpZvqmh4UHhLoIC1eVOCTkLX4Jh0Aa2E3Zua0FFwzfK6xSb8fu	Keaton	bajabuggy313@yahoo.com	2020-08-17 11:18:44.501489
94	Tobey	$2b$10$xgyczaSFGu3rGLo9BE/RRO57Z0G12PXJqCQ2TKVjL14gLjitIZRd.	Ty Tobey	tobey@tobey.com	2020-08-17 11:26:09.184679
95	bot1	$2b$10$Pt84EOGjO0QozZ8MOVy3q.ZwzbPvUYlntJ/XlcQLYs58MpZ48l1Sm	bot bot	bot@bot.bot	2020-08-25 14:16:55.63277
\.


--
-- Name: userPosts_postId_seq; Type: SEQUENCE SET; Schema: public; Owner: dev
--

SELECT pg_catalog.setval('public."userPosts_postId_seq"', 24, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dev
--

SELECT pg_catalog.setval('public.users_user_id_seq', 95, true);


--
-- Name: profiledata profiledata_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.profiledata
    ADD CONSTRAINT profiledata_pkey PRIMARY KEY (user_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- PostgreSQL database dump complete
--

