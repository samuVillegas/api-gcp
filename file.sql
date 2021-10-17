CREATE SEQUENCE note_seq
	START WITH 1
	INCREMENT BY 1
	MAXVALUE 2147483647
	MINVALUE 1;
	
	
CREATE TABLE note(
	id_note integer DEFAULT nextval('note_seq'::regclass) NOT NULL,
	name varchar(100) NOT NULL,
	description text NOT NULL,
	register_date timestamp(0) without time zone DEFAULT (now() at time zone 'America/Bogota')
);

ALTER TABLE note ADD CONSTRAINT note_pkey PRIMARY KEY (id_note);