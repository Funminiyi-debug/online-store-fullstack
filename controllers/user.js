const User = require("../models/User");

exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findOne({ token: req.body.token });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ msg: "user not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(503).json({ msg: "there is something wrong with the server" });
  }
};

exports.updateCartItems = async (req, res) => {
  try {
    const { userToken, cartItems } = req.body;
    let user = await User.findOne({ token: userToken });
    if (user) {
      user = await User.findOneAndUpdate(
        { token: userToken },
        { cartItems: cartItems },
        { new: true }
      );

      res
        .status(200)
        .json({ msg: "cart items updated", cartItems: user.cartItems });
    } else {
      res.status(404).json({ msg: "user not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(503).json({ msg: "server error" });
  }
};

exports.getCartItems = async (req, res) => {
  try {
    const { token } = req.body;
    let user = await User.find({ token: token })
      .select({ cartItems: true })
      .exec()
      .then(items => {
        return res.status(200).json(items);
      });

    // if (!user) {
    //   res.status(404).json({ msg: "items not available" });
    // }
  } catch (error) {
    res.status(500).json({ msg: "server error" });
  }
};
