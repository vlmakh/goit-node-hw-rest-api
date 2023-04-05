const getCurrent = async (req, res, next) => {
  try {
    const { name, email, subscription, _id } = await req.user;

    res.status(200).json({ name, email, subscription, _id });
  } catch (error) {
    next(error);
  }
};

module.exports = getCurrent;
