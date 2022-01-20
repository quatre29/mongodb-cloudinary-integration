const express = require("express");
const { cloudinary } = require("./utils/cloudinary");
const User = require("./models/user.model");

const app = express();

// app.use(express.urlencoded({ limit: '50mb', extended: true })); //cloudinary
app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.post("/users", async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const userFields = { ...req.body };

    if (avatar) {
      console.log("before upload");
      const uploadedRes = await cloudinary.uploader.upload(avatar, {
        upload_preset: "help-desk-avatar",
      });

      console.log(uploadedRes, "cloudinary upload res");

      userFields.avatar = uploadedRes.public_id;
    }

    console.log(userFields);

    const newUser = await User.create(userFields);

    res.status(201).send({ user: newUser });
  } catch (error) {
    console.log(error);
  }
});

app.get("/users/:user_id", async (req, res, next) => {
  const user = await User.findById(req.params.user_id);
  res.status(200).send({ user });
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    res.status(200).send({ users });
  } catch (error) {
    console.log(error);
  }
});

module.exports = app;
