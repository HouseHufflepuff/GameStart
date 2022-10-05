\c postgres;


DROP DATABASE IF EXISTS gamestart;
CREATE DATABASE gamestart;

\c gamestart;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name varchar(50) NOT NULL,
  last_name varchar(50) NOT NULL,
  username varchar(14) NOT NULL,
  password varchar(14) NOT NULL,
  address TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE games (
  id SERIAL PRIMARY KEY NOT NULL,
  ownerId INT NOT NULL,
  gameId INT NOT NULL,
  gameTitle VARCHAR(50),
  photoURL VARCHAR(50),
  gameCondition VARCHAR(50),
  caseStatus VARCHAR(50),
  listing VARCHAR(10)
);

CREATE TABLE consoles (
  id SERIAL PRIMARY KEY NOT NULL,
  ownerId INT NOT NULL references users(id),
  console VARCHAR(50)
);

CREATE TABLE favorites (
  id SERIAL PRIMARY KEY NOT NULL,
  userId INT NOT NULL references users(id),
  gameId INT NOT NULL references games(id),
)

CREATE TABLE trades (
  id SERIAL PRIMARY KEY NOT NULL,
  partyId INT NOT NULL,
  partyGameId INT NOT NULL,
  counterPartyId INT NOT NULL,
  counterPartyGameId INT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  trade_status VARCHAR(15)
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
  body TEXT,
  username varchar(14),
  conversationID INT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE conversations (
  id SERIAL PRIMARY KEY NOT NULL,
  messagesID INT[]
);
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


