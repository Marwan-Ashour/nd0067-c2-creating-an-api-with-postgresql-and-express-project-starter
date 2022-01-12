"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
// jwt validation to endpoint
// protect private routes by requiring jwt validation in a replicable behavior
var verifyAuthToken = function (req, res, next) {
    try {
        // passing the JWTs as a special header
        // locate the authHeader sent with the req
        var authorizationHeader = req.headers.authorization;
        if (typeof authorizationHeader !== 'undefined') {
            // parsing the header to get the token out of the authHeader by adding space and getting the 2nd item(the token)
            var token = authorizationHeader.split(' ')[1];
            if (process.env.TOKEN_SECRET) {
                jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
                next();
            }
        }
    }
    catch (err) {
        res.status(401);
        res.json('Access failed, invalid token');
    }
};
exports.default = verifyAuthToken;
