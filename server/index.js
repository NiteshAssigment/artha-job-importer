import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";


console.log("process.env.PORT",process.env.PORT);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
