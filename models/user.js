const pool = require("../db");

const createUser = async ({ firstName, lastName, username, hashedPassword }) => {
  const result = await pool.query(
    `INSERT INTO users (first_name, last_name, username, password)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [firstName, lastName, username, hashedPassword]
  );
  return result.rows[0];
};

const findUserByUsername = async (username) => {
  const result = await pool.query(
    `SELECT * FROM users WHERE username = $1`,
    [username]
  );
  return result.rows[0];
};

const findUserById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM users WHERE id = $1`,
    [id]
  );
  return result.rows[0];
};

const updateMembershipStatus = async (id) => {
  await pool.query(
    `UPDATE users SET is_member = true WHERE id = $1`,
    [id]
  );
};

const updateAdminStatus = async (id) => {
  await pool.query(
    `UPDATE users SET is_admin = true WHERE id = $1`,
    [id]
  );
};

module.exports = {
  createUser,
  findUserByUsername,
  findUserById,
  updateMembershipStatus,
  updateAdminStatus,
};
