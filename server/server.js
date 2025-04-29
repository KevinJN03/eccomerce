import app from "./app.js";
import 'dotenv/config';
const {PORT: prod_port} = process.env
let PORT = prod_port
if(process.env.NODE_ENV == 'test'){
  PORT = process.env.TEST_PORT
}
//console.log({PORT})
app.listen(parseInt(PORT), () => {
    console.log(`Server running on port ${PORT}`);
  });


  export default app