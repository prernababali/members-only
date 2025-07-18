const {
  createMessage,
  getAllMessages,
  deleteMessageById,
} = require("../models/message");

const getHomePage = async (req, res) => {
  const messages = await getAllMessages();
  res.render("index", { messages, currentUser: req.user });
};

const getNewMessage = (req, res) => {
  if (!req.user || !req.user.is_member) {
    return res.redirect("/join");
  }
  res.render("new_message");
};

const postNewMessage = async (req, res) => {
  const { title, text } = req.body;
  await createMessage({ title, text, userId: req.user.id });
  res.redirect("/");
};

const deleteMessage = async (req, res) => {
  try {
    console.log("🗑️ DELETE triggered for ID:", req.params.id);
    await deleteMessageById(req.params.id);
    res.redirect("/");
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).send("Failed to delete message");
  }
};


module.exports = {
  getHomePage,
  getNewMessage,
  postNewMessage,
  deleteMessage,
};
