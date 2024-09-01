import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';

export interface UserInfo {
  firstName: string;
  lastName: string;
  contactNumber: string;
}

export const enableDBPromise = () => {
  enablePromise(true);
};

export const connectToDatabase = async () => {
  return openDatabase(
    {name: 'task.db', location: 'default'},
    () => {
      console.log('db connection is done');
    },
    error => {
      console.error(error);
      throw Error('Could not connect to database');
    },
  );
};

export const createTable = async (db: SQLiteDatabase) => {
  const createUserTableQuery = `CREATE TABLE IF NOT EXISTS User (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT,
        lastName TEXT,
        contactNumber TEXT
     )`;

  try {
    await db.executeSql(createUserTableQuery);
    console.log('table created successfully');
  } catch (err) {
    console.error(err);
    throw Error('Failed to create tables');
  }
};

export const insertUsers = async (db: SQLiteDatabase, user: UserInfo) => {
  const insertQuery = `
     INSERT INTO User (firstName, lastName, contactNumber)
     VALUES (?, ?, ?)
   `;
  const values = [user.firstName, user.lastName, user.contactNumber];
  try {
    return db.executeSql(insertQuery, values);
  } catch (error) {
    console.error(error);
    throw Error('Failed to add user');
  }
};

export const getUsers = async (db: SQLiteDatabase): Promise<UserInfo[]> => {
  try {
    const contacts: UserInfo[] = [];
    const results = await db.executeSql('SELECT * FROM User');
    results?.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        contacts.push(result.rows.item(index));
      }
    });
    return contacts;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get Users from database');
  }
};

export const updateUser = async (
  db: SQLiteDatabase,
  updatedUserInfo: UserInfo,
  id: number,
) => {
  const updateQuery = `
      UPDATE User
      SET firstName = ?, lastName = ?, contactNumber = ?
      WHERE id = ?
    `;
  const values = [
    updatedUserInfo.firstName,
    updatedUserInfo.lastName,
    updatedUserInfo.contactNumber,
    id,
  ];
  try {
    return db.executeSql(updateQuery, values);
  } catch (error) {
    console.error(error);
    throw Error('Failed to update user');
  }
};

export const deleteUser = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `
      DELETE FROM User
      WHERE id = ?
    `;
  const values = [id];
  try {
    return db.executeSql(deleteQuery, values);
  } catch (error) {
    console.error(error);
    throw Error('Failed to delete user');
  }
};
