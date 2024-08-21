"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sendEmailFunction_1 = require("../controllers/sendEmailFunction");
const router = (0, express_1.Router)();
router.get("/", sendEmailFunction_1.sendTheEmail);
exports.default = router;
