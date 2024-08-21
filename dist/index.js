"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_cron_1 = __importDefault(require("node-cron"));
const sendmail_1 = __importDefault(require("./routes/sendmail"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 5000;
app.use("/sendemail", sendmail_1.default);
// cron.schedule("0 8 * * *", async () => {
node_cron_1.default.schedule("* * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("function running at 8:00 AM", new Date().toString());
    try {
        // Make a GET request to the /sendemail route
        const response = yield axios_1.default.get(`http://localhost:${PORT}/sendemail`);
        console.log("Email sent:", response.data);
    }
    catch (error) {
        console.error("Error calling /sendemail route:", error);
    }
}));
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});
