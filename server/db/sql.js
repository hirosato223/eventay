const db = require('./db.js');
const config = require('../config.js');

const dropDatabase = async () => {
  try {
    await db.queryAsync(`DROP DATABASE IF EXISTS ${config.relationalDbName}`);
    console.log('Successfully dropped database', config.relationalDbName);
  } catch (err) {
    console.log('Error dropping database', config.relationalDbName);
  }
};

const createDatabase = async () => {
  try {
    await db.queryAsync(`CREATE DATABASE ${config.relationalDbName}`);
    console.log('Successfully created database', config.relationalDbName);
  } catch (err) {
    console.log('Error creating database', config.relationalDbName);
  }
};

const useDatabase = async () => {
  try {
    await db.queryAsync(`USE IF EXISTS ${config.relationalDbName}`);
    console.log('Successfully using database', config.relationalDbName);
  } catch (err) {
    console.log('Error using database', config.relationalDbName);
  }
};

const dropUsersTable = async () => {
  try {
    await db.queryAsync('DROP TABLE IF EXISTS users');
    console.log('Successfully dropped users table.');
  } catch (err) {
    console.log('Error dropping users table.');
  }
};

const createUsersTable = async () => {
  try {
    await db.queryAsync(`
      CREATE TABLE IF NOT EXISTS users
      (
        id SERIAL,
        username VARCHAR(255) UNIQUE NOT NULL,
        profile_picture VARCHAR(255),
        bio TEXT,
        likes_count INT NOT NULL DEFAULT 0,
        CONSTRAINT users_pk
          PRIMARY KEY(id)
      )
    `);
    console.log('Successfully created users table.');
  } catch (err) {
    console.log('Error creating users table.');
  }
};

export const dropFriendsTable = async () => {
  try {
    await db.queryAsync('DROP TABLE IF EXISTS friends');
    console.log('Successfully dropped friends table.');
  } catch (err) {
    console.log('Error dropping friends table.');
  }
};

export const createFriendsTable = async () => {
  try {
    await db.queryAsync(`
      CREATE TYPE FRIEND_STATUS AS ENUM (
        'pending',
        'accepted',
        'blocked'
      )
    `);
    await db.queryAsync(`
      CREATE TABLE IF NOT EXISTS friends
      (
        id SERIAL,
        status FRIEND_STATUS NOT NULL DEFAULT 'pending',
        user_id INT NOT NULL,
        target_id INT NOT NULL,
        CONSTRAINT friends_id
          PRIMARY KEY(id),
        CONSTRAINT fk_friends_user_id
          FOREIGN KEY(user_id) REFERENCES users(id)
          ON DELETE CASCADE,
        CONSTRAINT fk_friends_target_id
          FOREIGN KEY(target_id) REFERENCES users(id)
          ON DELETE CASCADE
      )
    `);
    console.log('Successfully created friends table.');
  } catch (err) {
    console.log('Error creating friends table.');
  }
};

export const dropEventsTable = async () => {
  try {
    await db.queryAsync('DROP TABLE IF EXISTS events');
    console.log('Successfully dropped events table.');
  } catch (err) {
    console.log('Error dropping events table.');
  }
};

export const createEventsTable = async () => {
  try {
    await db.queryAsync(`
      CREATE TABLE IF NOT EXISTS events
      (
        id SERIAL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        thumbnail VARCHAR(255),
        location VARCHAR(255),
        likes_count INT NOT NULL DEFAULT 0,
        start_time TIMESTAMP,
        end_time TIMESTAMP,
        publicity BOOLEAN NOT NULL DEFAULT false,
        host_id INT NOT NULL,
        CONSTRAINT events_pk
          PRIMARY KEY(id),
        CONSTRAINT fk_events_host_id
          FOREIGN KEY(host_id) REFERENCES users(id)
          ON DELETE CASCADE
      )
    `);
    console.log('Successfully created events table.');
  } catch (err) {
    console.log('Error creating events table.');
  }
};

export const dropAttendantsTable = async () => {
  try {
    await db.queryAsync('DROP TABLE IF EXISTS attendants');
    console.log('Successfully dropped attendants table.');
  } catch (err) {
    console.log('Error dropping attendants table.');
  }
};

export const createAttendantsTable = async () => {
  try {
    await db.queryAsync(`
      CREATE TYPE ATTENDANTS_STATUS AS ENUM (
        'pending', 
        'going', 
        'declined',
        'maybe'
      )
    `);
    await db.queryAsync(`
      CREATE TABLE IF NOT EXISTS attendants
      (
        id SERIAL,
        access INT NOT NULL DEFAULT 0,
        status ATTENDANTS_STATUS NOT NULL DEFAULT 'pending',
        user_id INT NOT NULL,
        event_id INT NOT NULL,
        invitor_id INT,
        CONSTRAINT attendants_id
          PRIMARY KEY(id),
        CONSTRAINT fk_attendants_user_id
          FOREIGN KEY(user_id) REFERENCES users(id)
          ON DELETE CASCADE,
        CONSTRAINT fk_attendants_event_id
          FOREIGN KEY(event_id) REFERENCES events(id)
          ON DELETE CASCADE,
        CONSTRAINT fk_attendants_invitor_id
          FOREIGN KEY(invitor_id) REFERENCES users(id)
          ON DELETE CASCADE
      )
    `);
    console.log('Successfully created attendants table.');
  } catch (err) {
    console.log('Error creating attendants table.');
  }
};

export const dropPostsTable = async () => {
  try {
    await db.queryAsync('DROP TABLE IF EXISTS posts');
    console.log('Successfully dropped posts table.');
  } catch (err) {
    console.log('Error dropping posts table.');
  }
};

export const createPostsTable = async () => {
  try {
    await db.queryAsync(`
      CREATE TABLE IF NOT EXISTS posts
      (
        id SERIAL,
        body TEXT,
        user_id INT NOT NULL,
        event_id INT NOT NULL,
        parent_id INT,
        CONSTRAINT post_id
          PRIMARY KEY(id),
        CONSTRAINT fk_posts_user_id
          FOREIGN KEY(user_id) REFERENCES users(id)
          ON DELETE CASCADE,
        CONSTRAINT fk_posts_event_id
          FOREIGN KEY(event_id) REFERENCES events(id)
          ON DELETE CASCADE,
        CONSTRAINT fk_posts_parent_id
          FOREIGN KEY(parent_id) REFERENCES posts(id)
          ON DELETE CASCADE
      )
    `);
    console.log('Successfully created posts table.');
  } catch (err) {
    console.log('Error creating posts table.');
  }
};

export const dropLikesTable = async () => {
  try {
    await db.queryAsync('DROP TABLE IF EXISTS likes');
    console.log('Successfully dropped likes table.');
  } catch (err) {
    console.log('Error dropping likes table.');
  }
};

export const createLikesTable = async () => {
  try {
    await db.queryAsync(`
      CREATE TABLE IF NOT EXISTS likes
      (
        id SERIAL,
        user_id INT NOT NULL,
        event_id iNT NOT NULL,
        CONSTRAINT likes_id
          PRIMARY KEY(id),
        CONSTRAINT fk_likes_user_id
          FOREIGN KEY(user_id) REFERENCES users(id)
          ON DELETE CASCADE,
        CONSTRAINT fk_likes_event_id
          FOREIGN KEY(event_id) REFERENCES events(id)
          ON DELETE CASCADE
      )
    `);
    console.log('Successfully created likes table.');
  } catch (err) {
    console.log('Error creating likes table.');
  }
};

export const dropEmojisTable = async () => {
  try {
    await db.queryAsync('DROP TABLE IF EXISTS emojis');
    console.log('Successfully dropped emojis table.');
  } catch (err) {
    console.log('Error dropping emojis table.');
  }
};

export const createEmojisTable = async () => {
  try {
    await db.queryAsync(`
      CREATE TABLE IF NOT EXISTS emojis
      (
        id SERIAL,
        body VARCHAR(255) NOT NULL,
        user_id INT NOT NULL,
        event_id INT NOT NULL,
        CONSTRAINT emoji_id
          PRIMARY KEY(id),
        CONSTRAINT fk_emojis_user_id
          FOREIGN KEY(user_id) REFERENCES users(id)
          ON DELETE CASCADE,
        CONSTRAINT fk_emojis_event_id
          FOREIGN KEY(event_id) REFERENCES events(id)
          ON DELETE CASCADE
      )
    `);
    console.log('Successfully created emojis table.');
  } catch (err) {
    console.log('Error creating emojis table.');
  }
};