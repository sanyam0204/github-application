export async function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    console.log("Authenticated");
    return next();
  }
  console.log("Not Authenticated");
  res.redirect(process.env.CLIENT_BASE_URL + "/login");
}
