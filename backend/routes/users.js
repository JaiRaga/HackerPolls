const express = require("express");
const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// Login User
router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send("Unable to Login!");
  }
});

// Get my profile
router.get("/user/me", auth, async (req, res) => {
  res.send(req.user);
});

// Get User Profile
router.get("/user/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("No User Found!");
    res.send(user);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// Update User Profile
router.patch("/user", auth, async (req, res) => {
  try {
    const { username, handle, email, avatar } = req.body;

    const user = await req.user.updateUser(username, handle, email, avatar);
    console.log(user);
    res.send(user);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// Logout user
router.post("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();
    res.send();
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/users", (req, res) => {
  res.send("Hello");
});

module.exports = router;
