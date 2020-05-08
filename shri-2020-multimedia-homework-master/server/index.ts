import express from "express";
import path from "path";
import chalk from "chalk";
import os from "os";
import dns from "dns";
import env from "dotenv";
import cors from "cors";

declare var process: NodeJS.Process;

env.config();

console.log(process.env.PORT);

const app = express();

app.use(cors());
app.use(express.static(path.resolve(__dirname, "../static")));

// костыли чтобы работало на мобилке, в вашем примере с murphy, на мобилках ничего не работало
app.use("/getAdd", (req, res) => res.send(`${process.env.locIp}:${process.env.PORT}`));

const port = process.env.PORT as unknown as number;

app.listen(port , "0.0.0.0", (err) => {
  if (err) console.log(err);

  const name = os.hostname() as string;
  dns.lookup(name, function (err, add, fam) {
    if (err) console.log(err);
    process.env.locIp = add;
    console.log(
      "Server listen: \n", 
      chalk.green(`http://localhost:${process.env.PORT}\n`, 
      chalk.green(`http://${add}:${process.env.PORT}\n`)
    ));
  });

});