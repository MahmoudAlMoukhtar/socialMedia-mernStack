const jwt = require("jsonwebtoken");

const authMW = async (req, res, nxt) => {
  try {
    //console.log(req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "132jwtsecretkey123");
      req.userId = decodedData?.id;
      //console.log("dexodedDatae from authMW fow customAuth", decodedData?.id);
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
      //console.log("dexodedDatae from authMW", decodedData?.sub);
    }
    nxt();
  } catch (err) {
    console.log(err);
  }
};

module.exports = authMW;
