--
-- PostgreSQL database dump
--

-- Dumped from database version 10.14 (Ubuntu 10.14-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.14 (Ubuntu 10.14-0ubuntu0.18.04.1)

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

ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
ALTER TABLE ONLY public.profiledata DROP CONSTRAINT profiledata_pkey;
ALTER TABLE ONLY public.followers DROP CONSTRAINT followers_user_id_1_user_id_2_key;
ALTER TABLE public.users ALTER COLUMN user_id DROP DEFAULT;
ALTER TABLE public."userPosts" ALTER COLUMN "postId" DROP DEFAULT;
ALTER TABLE public.comments ALTER COLUMN "commentId" DROP DEFAULT;
DROP SEQUENCE public.users_user_id_seq;
DROP TABLE public.users;
DROP SEQUENCE public."userPosts_postId_seq";
DROP TABLE public."userPosts";
DROP TABLE public.profiledata;
DROP TABLE public.followers;
DROP SEQUENCE public."comments_commentId_seq";
DROP TABLE public.comments;
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.comments (
    "commentId" integer NOT NULL,
    "postId" integer,
    user_id integer NOT NULL,
    "commentPicUrl" text,
    "commentEditString" text,
    created_on timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: comments_commentId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."comments_commentId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: comments_commentId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."comments_commentId_seq" OWNED BY public.comments."commentId";


--
-- Name: followers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.followers (
    user_id_1 integer NOT NULL,
    user_id_2 integer NOT NULL
);


--
-- Name: profiledata; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.profiledata (
    user_id integer NOT NULL,
    "postTotal" integer NOT NULL,
    homies integer NOT NULL,
    description character varying(255) NOT NULL,
    profilepicurl text,
    "commentTotal" integer DEFAULT 0 NOT NULL
);


--
-- Name: userPosts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."userPosts" (
    "userId" integer,
    "postId" integer NOT NULL,
    "pictureUrl" text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: userPosts_postId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."userPosts_postId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: userPosts_postId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."userPosts_postId_seq" OWNED BY public."userPosts"."postId";


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "Name" character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: comments commentId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments ALTER COLUMN "commentId" SET DEFAULT nextval('public."comments_commentId_seq"'::regclass);


--
-- Name: userPosts postId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."userPosts" ALTER COLUMN "postId" SET DEFAULT nextval('public."userPosts_postId_seq"'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.comments ("commentId", "postId", user_id, "commentPicUrl", "commentEditString", created_on) FROM stdin;
\.


--
-- Data for Name: followers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.followers (user_id_1, user_id_2) FROM stdin;
\.


--
-- Data for Name: profiledata; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.profiledata (user_id, "postTotal", homies, description, profilepicurl, "commentTotal") FROM stdin;
\.


--
-- Data for Name: userPosts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."userPosts" ("userId", "postId", "pictureUrl", "createdAt") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (user_id, username, password, "Name", email, created_at) FROM stdin;
\.


--
-- Name: comments_commentId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."comments_commentId_seq"', 37, true);


--
-- Name: userPosts_postId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."userPosts_postId_seq"', 56, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_user_id_seq', 116, true);


--
-- Name: followers followers_user_id_1_user_id_2_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT followers_user_id_1_user_id_2_key UNIQUE (user_id_1, user_id_2);


--
-- Name: profiledata profiledata_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiledata
    ADD CONSTRAINT profiledata_pkey PRIMARY KEY (user_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

