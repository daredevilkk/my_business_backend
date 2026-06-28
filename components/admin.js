app.post("/delete-product", (req, res) => {
  console.log("Delete Route Called");
});
app.post("/modify-product", (req, res) => {
  console.log("Modify Route Called");
});
app.post("/add-product", (req, res) => {
  console.log("Add Route Called");
});
app.post("/login", async (req, res) => {
  const { login, password } = req.body;

  const user = await User.findOne({
    password,
    $or: [
      { userId: login },
      { phone: login }
    ]
  });

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials"
    });
  }

  res.json(user);
});
function del (){
  let promise = new promise (function(resolve,reject)
{   
      resolve ("success");
})
}
