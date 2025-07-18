const pool = require("../db");

const createMessage = async ({ title, text, userId }) => {
  const result = await pool.query(
    `INSERT INTO messages (title, text, user_id)
     VALUES ($1, $2, $3) RETURNING *`,
    [title, text, userId]
  );
  return result.rows[0];
};

const getAllMessages = async () => {
  const result = await pool.query(
    `SELECT messages.*, users.first_name, users.last_name, users.is_member
     FROM messages
     JOIN users ON messages.user_id = users.id
     ORDER BY messages.timestamp DESC`
  );
  return result.rows;
};

const deleteMessageById = async (id) => {
  await pool.query(`DELETE FROM messages WHERE id = $1`, [id]);
};

module.exports = {
  createMessage,
  getAllMessages,
  deleteMessageById,
};
