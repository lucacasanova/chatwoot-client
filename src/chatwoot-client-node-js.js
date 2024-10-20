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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var axios_1 = require("axios");
var ChatwootClient = /** @class */ (function () {
    function ChatwootClient(config) {
        this.version = "1";
        if (!config.host) {
            throw new Error("Host is required");
        }
        if (!config.userToken || !config.platformToken) {
            throw new Error("userToken or platformToken is required");
        }
        if (config.version) {
            this.version = config.version;
        }
        this.config = config;
        var options = {
            baseURL: config.host,
            headers: {},
        };
        this.axiosInstance = axios_1.default.create(options);
    }
    ChatwootClient.prototype.requestWithRetry = function (requestFn_1) {
        return __awaiter(this, arguments, void 0, function (requestFn, retries) {
            var attempt, response, error_1, _a, status_1, data;
            var _b;
            if (retries === void 0) { retries = 3; }
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        attempt = 1;
                        _c.label = 1;
                    case 1:
                        if (!(attempt <= retries)) return [3 /*break*/, 6];
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, requestFn()];
                    case 3:
                        response = _c.sent();
                        return [2 /*return*/, { success: true, data: response.data }];
                    case 4:
                        error_1 = _c.sent();
                        if (error_1.response) {
                            _a = error_1.response, status_1 = _a.status, data = _a.data;
                            if (status_1 === 401) {
                                return [2 /*return*/, { success: false, error: "Unauthorized", errorCode: status_1 }];
                            }
                            else if (status_1 === 404) {
                                return [2 /*return*/, { success: false, error: "Not Found", errorCode: status_1 }];
                            }
                            else if (status_1 === 403) {
                                return [2 /*return*/, {
                                        success: false,
                                        error: "Access Denied",
                                        errorCode: status_1,
                                    }];
                            }
                            else if (status_1 === 400) {
                                return [2 /*return*/, {
                                        success: false,
                                        error: data.description,
                                        errorCode: status_1,
                                        errors: data.errors,
                                    }];
                            }
                        }
                        if (attempt === retries) {
                            return [2 /*return*/, {
                                    success: false,
                                    error: error_1.message,
                                    errorCode: (_b = error_1.response) === null || _b === void 0 ? void 0 : _b.status,
                                }];
                        }
                        return [3 /*break*/, 5];
                    case 5:
                        attempt++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/, { success: false, error: "Max retries reached" }];
                }
            });
        });
    };
    /*
     * Platform - Accounts
     */
    ChatwootClient.prototype.createAccount = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var name = _b.name;
            return __generator(this, function (_c) {
                if (!this.config.platformToken) {
                    return [2 /*return*/, { success: false, error: "platformToken is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.post("/platform/api/v".concat(_this.version, "/accounts"), {
                            name: name,
                        }, {
                            headers: {
                                api_access_token: _this.config.platformToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.getAccount = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId;
            return __generator(this, function (_c) {
                if (!this.config.platformToken) {
                    return [2 /*return*/, { success: false, error: "platformToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.get("/platform/api/v".concat(_this.version, "/accounts/").concat(accountId), {
                            headers: {
                                api_access_token: _this.config.platformToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.updateAccount = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, name = _b.name;
            return __generator(this, function (_c) {
                if (!this.config.platformToken) {
                    return [2 /*return*/, { success: false, error: "platformToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.patch("/platform/api/v".concat(_this.version, "/accounts/").concat(accountId), { name: name }, {
                            headers: {
                                api_access_token: _this.config.platformToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.deleteAccount = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId;
            return __generator(this, function (_c) {
                if (!this.config.platformToken) {
                    return [2 /*return*/, { success: false, error: "platformToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.delete("/platform/api/v".concat(_this.version, "/accounts/").concat(accountId), {
                            headers: {
                                api_access_token: _this.config.platformToken,
                            },
                        });
                    })];
            });
        });
    };
    /*
     * Platform - Account Users
     */
    ChatwootClient.prototype.listAccountUsers = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId;
            return __generator(this, function (_c) {
                if (!this.config.platformToken) {
                    return [2 /*return*/, { success: false, error: "platformToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.get("/platform/api/v".concat(_this.version, "/accounts/").concat(accountId, "/account_users"), {
                            headers: {
                                api_access_token: _this.config.platformToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.createAccountUser = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, userId = _b.userId, role = _b.role;
            return __generator(this, function (_c) {
                if (!this.config.platformToken) {
                    return [2 /*return*/, { success: false, error: "platformToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!userId) {
                    return [2 /*return*/, { success: false, error: "userId is required" }];
                }
                if (!role) {
                    return [2 /*return*/, { success: false, error: "role is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.post("/platform/api/v".concat(_this.version, "/accounts/").concat(accountId, "/account_users"), { user_id: userId, role: role }, {
                            headers: {
                                api_access_token: _this.config.platformToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.deleteAccountUser = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, userId = _b.userId;
            return __generator(this, function (_c) {
                if (!this.config.platformToken) {
                    return [2 /*return*/, { success: false, error: "platformToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!userId) {
                    return [2 /*return*/, { success: false, error: "userId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.delete("/platform/api/v".concat(_this.version, "/accounts/").concat(accountId, "/account_users"), {
                            data: { user_id: userId },
                            headers: {
                                api_access_token: _this.config.platformToken,
                            },
                        });
                    })];
            });
        });
    };
    /*
     * Platform - Agent Bots
     */
    ChatwootClient.prototype.listAgentBots = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!this.config.platformToken) {
                    return [2 /*return*/, { success: false, error: "platformToken is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.get("/platform/api/v".concat(_this.version, "/agent_bots"), {
                            headers: {
                                api_access_token: _this.config.platformToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.createAgentBot = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var name = _b.name, description = _b.description, outgoingUrl = _b.outgoingUrl;
            return __generator(this, function (_c) {
                if (!this.config.platformToken) {
                    return [2 /*return*/, { success: false, error: "platformToken is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.post("/platform/api/v".concat(_this.version, "/agent_bots"), {
                            name: name,
                            description: description,
                            outgoing_url: outgoingUrl,
                        }, {
                            headers: {
                                api_access_token: _this.config.platformToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.getAgentBotDetails = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var id = _b.id;
            return __generator(this, function (_c) {
                if (!this.config.platformToken) {
                    return [2 /*return*/, { success: false, error: "platformToken is required" }];
                }
                if (!id) {
                    return [2 /*return*/, { success: false, error: "id is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.get("/platform/api/v".concat(_this.version, "/agent_bots/").concat(id), {
                            headers: {
                                api_access_token: _this.config.platformToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.updateAgentBot = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var id = _b.id, name = _b.name, description = _b.description, outgoingUrl = _b.outgoingUrl;
            return __generator(this, function (_c) {
                if (!this.config.platformToken) {
                    return [2 /*return*/, { success: false, error: "platformToken is required" }];
                }
                if (!id) {
                    return [2 /*return*/, { success: false, error: "id is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.patch("/platform/api/v".concat(_this.version, "/agent_bots/").concat(id), {
                            name: name,
                            description: description,
                            outgoing_url: outgoingUrl,
                        }, {
                            headers: {
                                api_access_token: _this.config.platformToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.deleteAgentBot = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var id = _b.id;
            return __generator(this, function (_c) {
                if (!this.config.platformToken) {
                    return [2 /*return*/, { success: false, error: "platformToken is required" }];
                }
                if (!id) {
                    return [2 /*return*/, { success: false, error: "id is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.delete("/platform/api/v".concat(_this.version, "/agent_bots/").concat(id), {
                            headers: {
                                api_access_token: _this.config.platformToken,
                            },
                        });
                    })];
            });
        });
    };
    /*
     * Platform - Users
     */
    ChatwootClient.prototype.createUser = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var name = _b.name, email = _b.email, password = _b.password, customAttributes = _b.customAttributes;
            return __generator(this, function (_c) {
                if (!this.config.platformToken) {
                    return [2 /*return*/, { success: false, error: "platformToken is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.post("/platform/api/v".concat(_this.version, "/users"), {
                            name: name,
                            email: email,
                            password: password,
                            custom_attributes: customAttributes,
                        }, {
                            headers: {
                                api_access_token: _this.config.platformToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.getUserDetails = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var id = _b.id;
            return __generator(this, function (_c) {
                if (!this.config.platformToken) {
                    return [2 /*return*/, { success: false, error: "platformToken is required" }];
                }
                if (!id) {
                    return [2 /*return*/, { success: false, error: "id is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.get("/platform/api/v".concat(_this.version, "/users/").concat(id), {
                            headers: {
                                api_access_token: _this.config.platformToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.updateUser = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var id = _b.id, name = _b.name, email = _b.email, password = _b.password, customAttributes = _b.customAttributes;
            return __generator(this, function (_c) {
                if (!this.config.platformToken) {
                    return [2 /*return*/, { success: false, error: "platformToken is required" }];
                }
                if (!id) {
                    return [2 /*return*/, { success: false, error: "id is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.patch("/platform/api/v".concat(_this.version, "/users/").concat(id), {
                            name: name,
                            email: email,
                            password: password,
                            custom_attributes: customAttributes,
                        }, {
                            headers: {
                                api_access_token: _this.config.platformToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.deleteUser = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var id = _b.id;
            return __generator(this, function (_c) {
                if (!this.config.platformToken) {
                    return [2 /*return*/, { success: false, error: "platformToken is required" }];
                }
                if (!id) {
                    return [2 /*return*/, { success: false, error: "id is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.delete("/platform/api/v".concat(_this.version, "/users/").concat(id), {
                            headers: {
                                api_access_token: _this.config.platformToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.getUserSSOLink = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var id = _b.id;
            return __generator(this, function (_c) {
                if (!this.config.platformToken) {
                    return [2 /*return*/, { success: false, error: "platformToken is required" }];
                }
                if (!id) {
                    return [2 /*return*/, { success: false, error: "id is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.get("/platform/api/v".concat(_this.version, "/users/").concat(id, "/login"), {
                            headers: {
                                api_access_token: _this.config.platformToken,
                            },
                        });
                    })];
            });
        });
    };
    /*
     * Application - Account Agent Bots
     */
    ChatwootClient.prototype.listAccountAgentBots = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.get("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/agent_bots"), {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.createAccountAgentBot = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, name = _b.name, description = _b.description, outgoingUrl = _b.outgoingUrl;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.post("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/agent_bots"), {
                            name: name,
                            description: description,
                            outgoing_url: outgoingUrl,
                        }, {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.getAccountAgentBotDetails = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, id = _b.id;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!id) {
                    return [2 /*return*/, { success: false, error: "id is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.get("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/agent_bots/").concat(id), {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.updateAccountAgentBot = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, id = _b.id, name = _b.name, description = _b.description, outgoingUrl = _b.outgoingUrl;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!id) {
                    return [2 /*return*/, { success: false, error: "id is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.patch("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/agent_bots/").concat(id), {
                            name: name,
                            description: description,
                            outgoing_url: outgoingUrl,
                        }, {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.deleteAccountAgentBot = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, id = _b.id;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!id) {
                    return [2 /*return*/, { success: false, error: "id is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.delete("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/agent_bots/").concat(id), {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    /*
     * Application - Agents
     */
    ChatwootClient.prototype.listAgents = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.get("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/agents"), {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.addAgent = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, name = _b.name, email = _b.email, role = _b.role, availabilityStatus = _b.availabilityStatus, autoOffline = _b.autoOffline;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!name) {
                    return [2 /*return*/, { success: false, error: "name is required" }];
                }
                if (!email) {
                    return [2 /*return*/, { success: false, error: "email is required" }];
                }
                if (!role) {
                    return [2 /*return*/, { success: false, error: "role is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.post("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/agents"), {
                            name: name,
                            email: email,
                            role: role,
                            availability_status: availabilityStatus,
                            auto_offline: autoOffline,
                        }, {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.updateAgent = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, id = _b.id, role = _b.role, availability = _b.availability, autoOffline = _b.autoOffline;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!id) {
                    return [2 /*return*/, { success: false, error: "id is required" }];
                }
                if (!role) {
                    return [2 /*return*/, { success: false, error: "role is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.patch("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/agents/").concat(id), {
                            role: role,
                            availability: availability,
                            auto_offline: autoOffline,
                        }, {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.removeAgent = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, id = _b.id;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!id) {
                    return [2 /*return*/, { success: false, error: "id is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.delete("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/agents/").concat(id), {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    /*
     * Application - Canned Responses
     */
    ChatwootClient.prototype.listCannedResponses = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.get("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/canned_responses"), {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.addCannedResponse = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, content = _b.content, shortCode = _b.shortCode;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.post("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/canned_responses"), {
                            content: content,
                            short_code: shortCode,
                        }, {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.deleteCannedResponse = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, id = _b.id;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!id) {
                    return [2 /*return*/, { success: false, error: "id is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.delete("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/canned_responses/").concat(id), {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    /*
     * Application - Contacts
     */
    ChatwootClient.prototype.listContacts = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, sort = _b.sort, page = _b.page;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.get("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/contacts"), {
                            params: { sort: sort, page: page },
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.createContact = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, inboxId = _b.inboxId, name = _b.name, email = _b.email, phoneNumber = _b.phoneNumber, avatar = _b.avatar, avatarUrl = _b.avatarUrl, identifier = _b.identifier, customAttributes = _b.customAttributes;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!inboxId) {
                    return [2 /*return*/, { success: false, error: "inboxId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.post("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/contacts"), {
                            inbox_id: inboxId,
                            name: name,
                            email: email,
                            phone_number: phoneNumber,
                            avatar: avatar,
                            avatar_url: avatarUrl,
                            identifier: identifier,
                            custom_attributes: customAttributes,
                        }, {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.getContact = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, id = _b.id;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!id) {
                    return [2 /*return*/, { success: false, error: "id is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.get("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/contacts/").concat(id), {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.updateContact = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, id = _b.id, name = _b.name, email = _b.email, phoneNumber = _b.phoneNumber, avatar = _b.avatar, avatarUrl = _b.avatarUrl, identifier = _b.identifier, customAttributes = _b.customAttributes;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!id) {
                    return [2 /*return*/, { success: false, error: "id is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.put("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/contacts/").concat(id), {
                            name: name,
                            email: email,
                            phone_number: phoneNumber,
                            avatar: avatar,
                            avatar_url: avatarUrl,
                            identifier: identifier,
                            custom_attributes: customAttributes,
                        }, {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.deleteContact = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, id = _b.id;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!id) {
                    return [2 /*return*/, { success: false, error: "id is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.delete("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/contacts/").concat(id), {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.getContactConversations = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, id = _b.id;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!id) {
                    return [2 /*return*/, { success: false, error: "id is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.get("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/contacts/").concat(id, "/conversations"), {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.searchContacts = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, q = _b.q, sort = _b.sort, page = _b.page;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!q) {
                    return [2 /*return*/, { success: false, error: "search query (q) is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.get("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/contacts/search"), {
                            params: { q: q, sort: sort, page: page },
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.filterContacts = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, page = _b.page, payload = _b.payload;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.post("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/contacts/filter"), { payload: payload }, {
                            params: { page: page },
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    /*
     * Application - Conversation Assignments
     */
    ChatwootClient.prototype.assignConversation = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, conversationId = _b.conversationId, assigneeId = _b.assigneeId, teamId = _b.teamId;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!conversationId) {
                    return [2 /*return*/, { success: false, error: "conversationId is required" }];
                }
                if (!assigneeId && !teamId) {
                    return [2 /*return*/, {
                            success: false,
                            error: "Either assigneeId or teamId is required",
                        }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.post("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/conversations/").concat(conversationId, "/assignments"), {
                            assignee_id: assigneeId,
                            team_id: teamId,
                        }, {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.listConversationLabels = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, conversationId = _b.conversationId;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!conversationId) {
                    return [2 /*return*/, { success: false, error: "conversationId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.get("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/conversations/").concat(conversationId, "/labels"), {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.addConversationLabels = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, conversationId = _b.conversationId, labels = _b.labels;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!conversationId) {
                    return [2 /*return*/, { success: false, error: "conversationId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.post("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/conversations/").concat(conversationId, "/labels"), {
                            labels: labels,
                        }, {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.getConversationCounts = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, status = _b.status, q = _b.q, inboxId = _b.inboxId, teamId = _b.teamId, labels = _b.labels;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.get("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/conversations/meta"), {
                            params: { status: status, q: q, inbox_id: inboxId, team_id: teamId, labels: labels },
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.listConversations = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, assigneeType = _b.assigneeType, status = _b.status, q = _b.q, inboxId = _b.inboxId, teamId = _b.teamId, labels = _b.labels, page = _b.page;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.get("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/conversations"), {
                            params: {
                                assignee_type: assigneeType,
                                status: status,
                                q: q,
                                inbox_id: inboxId,
                                team_id: teamId,
                                labels: labels,
                                page: page,
                            },
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    /*
     * Application - Create New Conversation
     */
    ChatwootClient.prototype.createConversation = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, sourceId = _b.sourceId, inboxId = _b.inboxId, contactId = _b.contactId, additionalAttributes = _b.additionalAttributes, customAttributes = _b.customAttributes, status = _b.status, assigneeId = _b.assigneeId, teamId = _b.teamId, message = _b.message;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!sourceId) {
                    return [2 /*return*/, { success: false, error: "sourceId is required" }];
                }
                if (!inboxId) {
                    return [2 /*return*/, { success: false, error: "inboxId is required" }];
                }
                if (!message || !message.content) {
                    return [2 /*return*/, { success: false, error: "message content is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.post("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/conversations"), {
                            source_id: sourceId,
                            inbox_id: inboxId,
                            contact_id: contactId,
                            additional_attributes: additionalAttributes,
                            custom_attributes: customAttributes,
                            status: status,
                            assignee_id: assigneeId,
                            team_id: teamId,
                            message: message,
                        }, {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    /*
     * Application - Conversations Filter
     */
    ChatwootClient.prototype.filterConversations = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, page = _b.page, payload = _b.payload;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.post("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/conversations/filter"), {
                            payload: payload,
                        }, {
                            params: { page: page },
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    /*
     * Application - Conversation Details
     */
    ChatwootClient.prototype.getConversationDetails = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, conversationId = _b.conversationId;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!conversationId) {
                    return [2 /*return*/, { success: false, error: "conversationId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.get("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/conversations/").concat(conversationId), {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    /*
     * Application - Toggle Conversation Status
     */
    ChatwootClient.prototype.toggleConversationStatus = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, conversationId = _b.conversationId, status = _b.status;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!conversationId) {
                    return [2 /*return*/, { success: false, error: "conversationId is required" }];
                }
                if (!status) {
                    return [2 /*return*/, { success: false, error: "status is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.post("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/conversations/").concat(conversationId, "/toggle_status"), {
                            status: status,
                        }, {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    /*
     * Application - Toggle Conversation Priority
     */
    ChatwootClient.prototype.toggleConversationPriority = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, conversationId = _b.conversationId, priority = _b.priority;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!conversationId) {
                    return [2 /*return*/, { success: false, error: "conversationId is required" }];
                }
                if (!priority) {
                    return [2 /*return*/, { success: false, error: "priority is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.post("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/conversations/").concat(conversationId, "/toggle_priority"), {
                            priority: priority,
                        }, {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    /*
     * Application - Custom Attributes
     */
    ChatwootClient.prototype.listCustomAttributes = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, attributeModel = _b.attributeModel;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!attributeModel) {
                    return [2 /*return*/, { success: false, error: "attributeModel is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.get("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/custom_attribute_definitions"), {
                            params: { attribute_model: attributeModel },
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.addCustomAttribute = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, attributeDisplayName = _b.attributeDisplayName, attributeDisplayType = _b.attributeDisplayType, attributeDescription = _b.attributeDescription, attributeKey = _b.attributeKey, attributeValues = _b.attributeValues, attributeModel = _b.attributeModel;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.post("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/custom_attribute_definitions"), {
                            attribute_display_name: attributeDisplayName,
                            attribute_display_type: attributeDisplayType,
                            attribute_description: attributeDescription,
                            attribute_key: attributeKey,
                            attribute_values: attributeValues,
                            attribute_model: attributeModel,
                        }, {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.getCustomAttributeDetails = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, id = _b.id;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!id) {
                    return [2 /*return*/, { success: false, error: "id is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.get("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/custom_attribute_definitions/").concat(id), {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.updateCustomAttribute = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, id = _b.id, attributeDisplayName = _b.attributeDisplayName, attributeDisplayType = _b.attributeDisplayType, attributeDescription = _b.attributeDescription, attributeKey = _b.attributeKey, attributeValues = _b.attributeValues, attributeModel = _b.attributeModel;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!id) {
                    return [2 /*return*/, { success: false, error: "id is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.patch("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/custom_attribute_definitions/").concat(id), {
                            attribute_display_name: attributeDisplayName,
                            attribute_display_type: attributeDisplayType,
                            attribute_description: attributeDescription,
                            attribute_key: attributeKey,
                            attribute_values: attributeValues,
                            attribute_model: attributeModel,
                        }, {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.deleteCustomAttribute = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, id = _b.id;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!id) {
                    return [2 /*return*/, { success: false, error: "id is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.delete("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/custom_attribute_definitions/").concat(id), {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    /*
     * Application - Custom Filters
     */
    ChatwootClient.prototype.listCustomFilters = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, filterType = _b.filterType;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.get("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/custom_filters"), {
                            params: { filter_type: filterType },
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.addCustomFilter = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, filterType = _b.filterType, name = _b.name, type = _b.type, query = _b.query;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.post("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/custom_filters"), {
                            name: name,
                            type: type,
                            query: query,
                        }, {
                            params: { filter_type: filterType },
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.getCustomFilterDetails = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, customFilterId = _b.customFilterId;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!customFilterId) {
                    return [2 /*return*/, { success: false, error: "customFilterId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.get("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/custom_filters/").concat(customFilterId), {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.updateCustomFilter = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, customFilterId = _b.customFilterId, name = _b.name, type = _b.type, query = _b.query;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!customFilterId) {
                    return [2 /*return*/, { success: false, error: "customFilterId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.patch("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/custom_filters/").concat(customFilterId), {
                            name: name,
                            type: type,
                            query: query,
                        }, {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.deleteCustomFilter = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, customFilterId = _b.customFilterId;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!customFilterId) {
                    return [2 /*return*/, { success: false, error: "customFilterId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.delete("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/custom_filters/").concat(customFilterId), {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    /*
     * Application - Inboxes
     */
    ChatwootClient.prototype.listInboxes = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.get("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/inboxes"), {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.getInboxDetails = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, id = _b.id;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!id) {
                    return [2 /*return*/, { success: false, error: "id is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.get("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/inboxes/").concat(id), {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.createInbox = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, name = _b.name, avatar = _b.avatar, channel = _b.channel;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.post("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/inboxes"), {
                            name: name,
                            avatar: avatar,
                            channel: channel,
                        }, {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.updateInbox = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, id = _b.id, name = _b.name, enableAutoAssignment = _b.enableAutoAssignment, avatar = _b.avatar, channel = _b.channel;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!id) {
                    return [2 /*return*/, { success: false, error: "id is required" }];
                }
                if (!enableAutoAssignment) {
                    return [2 /*return*/, { success: false, error: "enableAutoAssignment is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.patch("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/inboxes/").concat(id), {
                            name: name,
                            enable_auto_assignment: enableAutoAssignment,
                            avatar: avatar,
                            channel: channel,
                        }, {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.listInboxAgents = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, inboxId = _b.inboxId;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!inboxId) {
                    return [2 /*return*/, { success: false, error: "inboxId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.get("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/inbox_members/").concat(inboxId), {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.addInboxAgent = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, inboxId = _b.inboxId, userIds = _b.userIds;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!inboxId) {
                    return [2 /*return*/, { success: false, error: "inboxId is required" }];
                }
                if (!userIds) {
                    return [2 /*return*/, { success: false, error: "userIds is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.post("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/inbox_members"), {
                            inbox_id: inboxId,
                            user_ids: userIds,
                        }, {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.updateInboxAgents = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, inboxId = _b.inboxId, userIds = _b.userIds;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!inboxId) {
                    return [2 /*return*/, { success: false, error: "inboxId is required" }];
                }
                if (!userIds) {
                    return [2 /*return*/, { success: false, error: "userIds is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.patch("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/inbox_members"), {
                            inbox_id: inboxId,
                            user_ids: userIds,
                        }, {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.removeInboxAgent = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, inboxId = _b.inboxId, userIds = _b.userIds;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!inboxId) {
                    return [2 /*return*/, { success: false, error: "inboxId is required" }];
                }
                if (!userIds) {
                    return [2 /*return*/, { success: false, error: "userIds is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.delete("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/inbox_members"), {
                            data: {
                                inbox_id: inboxId,
                                user_ids: userIds,
                            },
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    /*
     * Application - Integrations
     */
    ChatwootClient.prototype.listIntegrations = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.get("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/integrations/apps"), {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.createIntegrationHook = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, appId = _b.appId, inboxId = _b.inboxId, settings = _b.settings;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.post("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/integrations/hooks"), {
                            app_id: appId,
                            inbox_id: inboxId,
                            settings: settings,
                        }, {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.updateIntegrationHook = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, hookId = _b.hookId, settings = _b.settings;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!hookId) {
                    return [2 /*return*/, { success: false, error: "hookId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.patch("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/integrations/hooks/").concat(hookId), {
                            settings: settings,
                        }, {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.deleteIntegrationHook = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, hookId = _b.hookId;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!hookId) {
                    return [2 /*return*/, { success: false, error: "hookId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.delete("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/integrations/hooks/").concat(hookId), {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    /*
     * Application - Messages
     */
    ChatwootClient.prototype.getMessages = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, conversationId = _b.conversationId;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!conversationId) {
                    return [2 /*return*/, { success: false, error: "conversationId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.get("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/conversations/").concat(conversationId, "/messages"), {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.createMessage = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, conversationId = _b.conversationId, content = _b.content, messageType = _b.messageType, isPrivate = _b.private, contentType = _b.contentType, contentAttributes = _b.contentAttributes, templateParams = _b.templateParams;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!conversationId) {
                    return [2 /*return*/, { success: false, error: "conversationId is required" }];
                }
                if (!content) {
                    return [2 /*return*/, { success: false, error: "content is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.post("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/conversations/").concat(conversationId, "/messages"), {
                            content: content,
                            message_type: messageType,
                            private: isPrivate,
                            content_type: contentType,
                            content_attributes: contentAttributes,
                            template_params: templateParams,
                        }, {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.deleteMessage = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, conversationId = _b.conversationId, messageId = _b.messageId;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!conversationId) {
                    return [2 /*return*/, { success: false, error: "conversationId is required" }];
                }
                if (!messageId) {
                    return [2 /*return*/, { success: false, error: "messageId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.delete("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/conversations/").concat(conversationId, "/messages/").concat(messageId), {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    /*
     * Application - Reports
     */
    ChatwootClient.prototype.getAccountReports = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, metric = _b.metric, type = _b.type, id = _b.id, since = _b.since, until = _b.until;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!metric) {
                    return [2 /*return*/, { success: false, error: "metric is required" }];
                }
                if (!type) {
                    return [2 /*return*/, { success: false, error: "type is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.get("/api/v2/accounts/".concat(accountId, "/reports"), {
                            params: { metric: metric, type: type, id: id, since: since, until: until },
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.getAccountReportsSummary = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, type = _b.type, id = _b.id, since = _b.since, until = _b.until;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!type) {
                    return [2 /*return*/, { success: false, error: "type is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.get("/api/v2/accounts/".concat(accountId, "/reports/summary"), {
                            params: { type: type, id: id, since: since, until: until },
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.getAccountConversationMetrics = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, type = _b.type;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!type) {
                    return [2 /*return*/, { success: false, error: "type is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.get("/api/v2/accounts/".concat(accountId, "/reports/conversations"), {
                            params: { type: type },
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.getAgentConversationMetrics = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, type = _b.type, userId = _b.userId;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!type) {
                    return [2 /*return*/, { success: false, error: "type is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.get("/api/v2/accounts/".concat(accountId, "/reports/conversations"), {
                            params: { type: type, user_id: userId },
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    /*
     * Application - Teams
     */
    ChatwootClient.prototype.listTeams = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.get("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/teams"), {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.createTeam = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, name = _b.name, description = _b.description, allowAutoAssign = _b.allowAutoAssign;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.post("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/teams"), {
                            name: name,
                            description: description,
                            allow_auto_assign: allowAutoAssign,
                        }, {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.getTeamDetails = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, teamId = _b.teamId;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!teamId) {
                    return [2 /*return*/, { success: false, error: "teamId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.get("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/teams/").concat(teamId), {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.updateTeam = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, teamId = _b.teamId, name = _b.name, description = _b.description, allowAutoAssign = _b.allowAutoAssign;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!teamId) {
                    return [2 /*return*/, { success: false, error: "teamId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.patch("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/teams/").concat(teamId), {
                            name: name,
                            description: description,
                            allow_auto_assign: allowAutoAssign,
                        }, {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.deleteTeam = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, teamId = _b.teamId;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!teamId) {
                    return [2 /*return*/, { success: false, error: "teamId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.delete("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/teams/").concat(teamId), {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.listTeamAgents = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, teamId = _b.teamId;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!teamId) {
                    return [2 /*return*/, { success: false, error: "teamId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.get("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/teams/").concat(teamId, "/team_members"), {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.addTeamAgent = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, teamId = _b.teamId, userIds = _b.userIds;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!teamId) {
                    return [2 /*return*/, { success: false, error: "teamId is required" }];
                }
                if (!userIds) {
                    return [2 /*return*/, { success: false, error: "userIds is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.post("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/teams/").concat(teamId, "/team_members"), {
                            user_ids: userIds,
                        }, {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.updateTeamAgents = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, teamId = _b.teamId, userIds = _b.userIds;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!teamId) {
                    return [2 /*return*/, { success: false, error: "teamId is required" }];
                }
                if (!userIds) {
                    return [2 /*return*/, { success: false, error: "userIds is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.patch("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/teams/").concat(teamId, "/team_members"), {
                            user_ids: userIds,
                        }, {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.removeTeamAgent = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, teamId = _b.teamId, userIds = _b.userIds;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!teamId) {
                    return [2 /*return*/, { success: false, error: "teamId is required" }];
                }
                if (!userIds) {
                    return [2 /*return*/, { success: false, error: "userIds is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.delete("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/teams/").concat(teamId, "/team_members"), {
                            data: {
                                user_ids: userIds,
                            },
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    /*
     * Application - Webhooks
     */
    ChatwootClient.prototype.listWebhooks = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.get("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/webhooks"), {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.addWebhook = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, url = _b.url, subscriptions = _b.subscriptions;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.post("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/webhooks"), {
                            url: url,
                            subscriptions: subscriptions,
                        }, {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.updateWebhook = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, webhookId = _b.webhookId, url = _b.url, subscriptions = _b.subscriptions;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!webhookId) {
                    return [2 /*return*/, { success: false, error: "webhookId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.patch("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/webhooks/").concat(webhookId), {
                            url: url,
                            subscriptions: subscriptions,
                        }, {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.deleteWebhook = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, webhookId = _b.webhookId;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!webhookId) {
                    return [2 /*return*/, { success: false, error: "webhookId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.delete("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/webhooks/").concat(webhookId), {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    /*
     * Application - Automation Rules
     */
    ChatwootClient.prototype.listAutomationRules = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, page = _b.page;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.get("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/automation_rules"), {
                            params: { page: page },
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.addAutomationRule = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, name = _b.name, description = _b.description, eventName = _b.eventName, active = _b.active, actions = _b.actions, conditions = _b.conditions;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.post("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/automation_rules"), {
                            name: name,
                            description: description,
                            event_name: eventName,
                            active: active,
                            actions: actions,
                            conditions: conditions,
                        }, {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.getAutomationRuleDetails = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, id = _b.id;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!id) {
                    return [2 /*return*/, { success: false, error: "id is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.get("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/automation_rules/").concat(id), {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.updateAutomationRule = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, id = _b.id, name = _b.name, description = _b.description, eventName = _b.eventName, active = _b.active, actions = _b.actions, conditions = _b.conditions;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!id) {
                    return [2 /*return*/, { success: false, error: "id is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.patch("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/automation_rules/").concat(id), {
                            name: name,
                            description: description,
                            event_name: eventName,
                            active: active,
                            actions: actions,
                            conditions: conditions,
                        }, {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.deleteAutomationRule = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, id = _b.id;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!id) {
                    return [2 /*return*/, { success: false, error: "id is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.delete("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/automation_rules/").concat(id), {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    /*
     * Application - Help Center
     */
    ChatwootClient.prototype.addPortal = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, archived = _b.archived, color = _b.color, config = _b.config, customDomain = _b.customDomain, headerText = _b.headerText, homepageLink = _b.homepageLink, name = _b.name, slug = _b.slug, pageTitle = _b.pageTitle;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.post("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/portals"), {
                            archived: archived,
                            color: color,
                            config: config,
                            custom_domain: customDomain,
                            header_text: headerText,
                            homepage_link: homepageLink,
                            name: name,
                            slug: slug,
                            page_title: pageTitle,
                            account_id: accountId,
                        }, {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.listPortals = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.get("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/portals"), {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.updatePortal = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, archived = _b.archived, color = _b.color, config = _b.config, customDomain = _b.customDomain, headerText = _b.headerText, homepageLink = _b.homepageLink, name = _b.name, slug = _b.slug, pageTitle = _b.pageTitle;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.patch("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/portals"), {
                            archived: archived,
                            color: color,
                            config: config,
                            custom_domain: customDomain,
                            header_text: headerText,
                            homepage_link: homepageLink,
                            name: name,
                            slug: slug,
                            page_title: pageTitle,
                            account_id: accountId,
                        }, {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.addCategory = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, portalId = _b.portalId, description = _b.description, locale = _b.locale, name = _b.name, slug = _b.slug, position = _b.position, associatedCategoryId = _b.associatedCategoryId, parentCategoryId = _b.parentCategoryId;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!portalId) {
                    return [2 /*return*/, { success: false, error: "portalId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.post("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/portals/").concat(portalId, "/categories"), {
                            description: description,
                            locale: locale,
                            name: name,
                            slug: slug,
                            position: position,
                            associated_category_id: associatedCategoryId,
                            parent_category_id: parentCategoryId,
                        }, {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    ChatwootClient.prototype.addArticle = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var _this = this;
            var accountId = _b.accountId, portalId = _b.portalId, content = _b.content, meta = _b.meta, position = _b.position, status = _b.status, title = _b.title, slug = _b.slug, views = _b.views, authorId = _b.authorId, categoryId = _b.categoryId, folderId = _b.folderId, associatedArticleId = _b.associatedArticleId;
            return __generator(this, function (_c) {
                if (!this.config.userToken) {
                    return [2 /*return*/, { success: false, error: "userToken is required" }];
                }
                if (!accountId) {
                    return [2 /*return*/, { success: false, error: "accountId is required" }];
                }
                if (!portalId) {
                    return [2 /*return*/, { success: false, error: "portalId is required" }];
                }
                return [2 /*return*/, this.requestWithRetry(function () {
                        return _this.axiosInstance.post("/api/v".concat(_this.version, "/accounts/").concat(accountId, "/portals/").concat(portalId, "/articles"), {
                            content: content,
                            meta: meta,
                            position: position,
                            status: status,
                            title: title,
                            slug: slug,
                            views: views,
                            author_id: authorId,
                            category_id: categoryId,
                            folder_id: folderId,
                            associated_article_id: associatedArticleId,
                        }, {
                            headers: {
                                api_access_token: _this.config.userToken,
                            },
                        });
                    })];
            });
        });
    };
    return ChatwootClient;
}());
exports.default = ChatwootClient;
