\c postgres;

DROP DATABASE IF EXISTS GameStart;
CREATE DATABASE GameStart;

\c GameStart;

CREATE TABLE users (
  id PRIMARY KEY INT NOT NULL AUTO INT,
  username varchar (14) NOT NULL UNIQUE,
  password varchar(14) NOT NULL,
  email varchar(40) NOT NULL UNIQUE,
  address varchar(100),
  games TEXT[]
)

CREATE TYPE trade_status AS ENUM ('pending', 'accepted', 'rejected')
CREATE TABLE trades (
  id PRIMARY KEY INT NOT NULL AUTO INT,
  games_sent TEXT[],
  games_recieved TEXT[],
  sender varchar(14) NOT NULL,
  receiever varchar(14) NOT NULL,
  sent_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status trade_status,
  meet_up TEXT,
  conv_id INT
)

CREATE TABLE messages (
  id PRIMARY KEY INT NOT NULL AUTO INT,
  conversationID INT NOT NULL,
  body TEXT NOT NULL,
  user varchar(14) NOT NULL,
  time_sent TIMESTAMP WITH TIME ZONE DEFAULT NOW()
)

CREATE TABLE conversations (
  id PRIMARY KEY NOT NULL AUTO INT,
  messages INT[]
)


