"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
function parseEnvVars(envVars) {
    return Object.entries(envVars)
        .filter(([name]) => name.startsWith("INPUT_"))
        .map(([name, value]) => {
        const transformedName = name.replace("INPUT_", "");
        return [transformedName, value === null || value === void 0 ? void 0 : value.trim()];
    });
}
try {
    const vars = parseEnvVars(process.env).forEach(([name, value]) => {
        if (!value) {
            core.exportVariable(name, "");
            core.debug(`Exporting ${name} with an empty value`);
        }
        else {
            core.exportVariable(name, value);
            core.debug(`Exporting ${name} with value ${value}`);
        }
    });
}
catch (e) {
    core.setFailed(`Failed to parse environment variables: ${e}}`);
}
