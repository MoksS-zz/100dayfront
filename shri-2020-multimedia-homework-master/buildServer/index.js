"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const os_1 = __importDefault(require("os"));
const dns_1 = __importDefault(require("dns"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
console.log(process.env.PORT);
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.static(path_1.default.resolve(__dirname, "../static")));
// костыли чтобы работало на мобилке, в вашем примере с murphy, на мобилках ничего не работало
app.use("/getAdd", (req, res) => res.send(`${process.env.locIp}:${process.env.PORT}`));
const port = process.env.PORT;
app.listen(port, "0.0.0.0", (err) => {
    if (err)
        console.log(err);
    const name = os_1.default.hostname();
    dns_1.default.lookup(name, function (err, add, fam) {
        if (err)
            console.log(err);
        process.env.locIp = add;
        console.log("Server listen: \n", chalk_1.default.green(`http://localhost:${process.env.PORT}\n`, chalk_1.default.green(`http://${add}:${process.env.PORT}\n`)));
    });
});
