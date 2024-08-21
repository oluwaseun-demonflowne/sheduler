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
exports.sendTheEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const emailTemplate_1 = require("../emailTemplate");
const sendTheEmail = () => __awaiter(void 0, void 0, void 0, function* () {
    const transport = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD,
        },
    });
    try {
        yield transport.sendMail((0, emailTemplate_1.createMailOptions)("khanroberts3@gmail.com"));
        console.log("did it go? Yes");
        return new Response(JSON.stringify("success"), {
            status: 200,
        });
    }
    catch (error) {
        console.log(error);
        return new Response(JSON.stringify("error"), {
            status: 500,
        });
    }
});
exports.sendTheEmail = sendTheEmail;
