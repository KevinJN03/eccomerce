import app from "./app";
import 'dotenv/config';
const {PORT: prod_port} = process.env
let PORT = prod_port
if(process.env.NODE_ENV == 'test'){
  PORT = process.env.TEST_PORT
}
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });


  export default app