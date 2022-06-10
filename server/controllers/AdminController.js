class AdminController {
  static GetAdmin(_, res) {
    res.status(200).json({
      title: "Admin Page",
      message: "Only for admin !",
    });
  }
}

module.exports = AdminController;
