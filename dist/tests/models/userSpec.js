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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../../models/user");
var store = new user_1.UserStore();
var users = [
    {
        user_name: 'Admin',
        first_name: 'Marwan',
        last_name: 'Ashour',
    },
    {
        user_name: 'Boss',
        first_name: 'Hassan',
        last_name: 'Ali',
    },
];
describe('User Model', function () {
    var user = {
        user_name: users[1].user_name,
        first_name: users[1].first_name,
        last_name: users[1].last_name,
        user_password: 'boss_password'
    };
    it('should contain create method', function () {
        expect(store.create).toBeDefined();
    });
    it('should add user through create method ', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.create(user)];
                case 1:
                    result = _a.sent();
                    expect(result).toBeTruthy;
                    return [2 /*return*/];
            }
        });
    }); });
    it('should contain index method', function () {
        expect(store.index).toBeDefined();
    });
    it('index method should return the entire list of users', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, uzr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.index()];
                case 1:
                    result = _a.sent();
                    uzr = jasmine.objectContaining(users[1]);
                    expect(result).toContain(uzr);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should contain show method', function () {
        expect(store.show).toBeDefined();
    });
    it('show method should return the selected user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, uzr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.show(3)];
                case 1:
                    result = _a.sent();
                    uzr = jasmine.objectContaining(users[1]);
                    expect(result).toEqual(uzr);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should contain authenticate method', function () {
        expect(store.authenticate).toBeDefined();
    });
    it('authenticate method should confirm the user existence', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.authenticate(user.user_name, user.user_password)];
                case 1:
                    result = _a.sent();
                    expect(result).not.toBeNull;
                    return [2 /*return*/];
            }
        });
    }); });
});
