PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS users(id TEXT PRIMARY KEY,username TEXT NOT NULL UNIQUE,name TEXT NOT NULL,password_hash TEXT NOT NULL,mode TEXT NOT NULL CHECK(mode IN ('local','cloud')),role TEXT NOT NULL CHECK(role IN ('owner','member','local')),created_at INTEGER NOT NULL);
CREATE UNIQUE INDEX IF NOT EXISTS unique_owner ON users(role) WHERE role='owner';
CREATE UNIQUE INDEX IF NOT EXISTS unique_member ON users(role) WHERE role='member';
CREATE TABLE IF NOT EXISTS sessions(token_hash TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,expires_at INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS app_state(id INTEGER PRIMARY KEY CHECK(id=1),version INTEGER NOT NULL DEFAULT 0,data TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS invitations(token_hash TEXT PRIMARY KEY,created_at INTEGER NOT NULL,expires_at INTEGER NOT NULL,used_by TEXT REFERENCES users(id));
CREATE TABLE IF NOT EXISTS auth_limits(key TEXT PRIMARY KEY,count INTEGER NOT NULL,expires_at INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS backups(id TEXT PRIMARY KEY,created_at INTEGER NOT NULL,version INTEGER NOT NULL,data TEXT NOT NULL);

INSERT OR IGNORE INTO app_state(id,version,data) VALUES(1,0,'{"capital":[],"fixed":[],"extra":[],"insurance":[],"vehicles":[],"activities":[],"history":[],"trash":[]}');
