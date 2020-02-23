--
-- PostgreSQL database dump
--

-- Dumped from database version 12.1
-- Dumped by pg_dump version 12.1

-- Started on 2020-02-04 12:19:18 UTC

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 202 (class 1259 OID 16385)
-- Name: actor; Type: TABLE; Schema: public; Owner: movieservice
--

CREATE TABLE public.actor (
    id uuid NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.actor OWNER TO movieservice;

--
-- TOC entry 204 (class 1259 OID 16401)
-- Name: actor_in_movie; Type: TABLE; Schema: public; Owner: movieservice
--

CREATE TABLE public.actor_in_movie (
    movie_id uuid NOT NULL,
    actor_id uuid NOT NULL
);


ALTER TABLE public.actor_in_movie OWNER TO movieservice;

--
-- TOC entry 203 (class 1259 OID 16393)
-- Name: movie; Type: TABLE; Schema: public; Owner: movieservice
--

CREATE TABLE public.movie (
    id uuid NOT NULL,
    title text NOT NULL,
    year integer NOT NULL
);


ALTER TABLE public.movie OWNER TO movieservice;

--
-- TOC entry 2801 (class 2606 OID 16392)
-- Name: actor actor_pkey; Type: CONSTRAINT; Schema: public; Owner: movieservice
--

ALTER TABLE ONLY public.actor
    ADD CONSTRAINT actor_pkey PRIMARY KEY (id);


--
-- TOC entry 2805 (class 2606 OID 16405)
-- Name: actor_in_movie actorinmovie_movieid_actorid_key; Type: CONSTRAINT; Schema: public; Owner: movieservice
--

ALTER TABLE ONLY public.actor_in_movie
    ADD CONSTRAINT actorinmovie_movieid_actorid_key UNIQUE (movie_id, actor_id);


--
-- TOC entry 2803 (class 2606 OID 16400)
-- Name: movie movie_pkey; Type: CONSTRAINT; Schema: public; Owner: movieservice
--

ALTER TABLE ONLY public.movie
    ADD CONSTRAINT movie_pkey PRIMARY KEY (id);


--
-- TOC entry 2807 (class 2606 OID 16411)
-- Name: actor_in_movie actorinmovie_actorid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: movieservice
--

ALTER TABLE ONLY public.actor_in_movie
    ADD CONSTRAINT actorinmovie_actorid_fkey FOREIGN KEY (actor_id) REFERENCES public.actor(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 2806 (class 2606 OID 16406)
-- Name: actor_in_movie actorinmovie_movieid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: movieservice
--

ALTER TABLE ONLY public.actor_in_movie
    ADD CONSTRAINT actorinmovie_movieid_fkey FOREIGN KEY (movie_id) REFERENCES public.movie(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


-- Completed on 2020-02-04 12:19:18 UTC

--
-- PostgreSQL database dump complete
--

