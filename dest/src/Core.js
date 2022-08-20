"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 Copyright 2022 Square Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
const react_native_1 = require("react-native"); // eslint-disable-line import/no-unresolved
const Utilities_1 = __importDefault(require("./Utilities"));
const { RNSquareInAppPayments } = react_native_1.NativeModules;
async function setSquareApplicationId(applicationId) {
    Utilities_1.default.verifyStringType(applicationId, 'applicationId should be a valid string');
    await RNSquareInAppPayments.setApplicationId(applicationId);
}
exports.default = {
    setSquareApplicationId,
};
