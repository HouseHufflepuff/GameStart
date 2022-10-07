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
  email varchar(50),
  fiyabase_authkey varchar(50),
  profilepic varchar(150),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE games (
  id SERIAL PRIMARY KEY NOT NULL,
  ownerId INT NOT NULL references users(id),
  gameId INT NOT NULL,
  gameTitle VARCHAR(50),
  photoURL VARCHAR(50),
  gameCondition VARCHAR(50),
  caseStatus VARCHAR(50),
  listingStatus VARCHAR(10)
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
  partyId INT NOT NULL references users(id),
  partyGameId INT NOT NULL references games(id),
  counterPartyId INT NOT NULL references users(id),
  counterPartyGameId INT NOT NULL references games(id),
  created_at TIMESTAMP DEFAULT NOW(),
  trade_status VARCHAR(15)
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
  body TEXT,
  userId INT references users(id),
  username varchar(14),
  conversationID INT references conversations(id),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE conversations (
  id SERIAL PRIMARY KEY NOT NULL,
  tradeId INT references trades(id)
);


