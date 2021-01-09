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
var protractor_1 = require("protractor");
var ResultPage = /** @class */ (function () {
    function ResultPage() {
        this.EC = protractor_1.protractor.ExpectedConditions;
        this.resultHeadings = protractor_1.by.css("li>h2,li>div>div>h2");
        this.resultPageButtons = protractor_1.by.css(".ent-dtab-content a");
    }
    ResultPage.prototype.clickAndGetResult = function () {
        return __awaiter(this, void 0, void 0, function () {
            var btns;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        btns = protractor_1.element.all(this.resultPageButtons);
                        return [4 /*yield*/, btns.count().then(function (count) {
                                count -= 1;
                                var allResultPromise = [];
                                for (var i = 0; i < count; i++) {
                                    // browser.wait(EC.elementToBeClickable(btns.get(i)), 5000);
                                    allResultPromise.push(btns.get(i).getText());
                                    btns.get(i).click();
                                    allResultPromise.push(_this.getResult());
                                }
                                return Promise.all(allResultPromise);
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ResultPage.prototype.getResult = function () {
        return __awaiter(this, void 0, void 0, function () {
            var resItems;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resItems = protractor_1.element.all(this.resultHeadings);
                        return [4 /*yield*/, resItems.map(function (el) { return el.getText(); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ResultPage.prototype.failedBtnResult = function (failedRows, keyword) {
        var btns = protractor_1.element.all(this.resultPageButtons);
        var allRetestResultPromise = [];
        for (var _i = 0, failedRows_1 = failedRows; _i < failedRows_1.length; _i++) {
            var fi = failedRows_1[_i];
            btns.get(fi.failedInfo.failedBtnNo - 1).click();
            allRetestResultPromise.push(Promise.resolve({ rowNo: fi.failedInfo.rowNo, keyword: keyword }));
            allRetestResultPromise.push(this.getResult());
        }
        return Promise.all(allRetestResultPromise);
    };
    return ResultPage;
}());
exports.default = ResultPage;
