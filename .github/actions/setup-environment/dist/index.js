"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
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
            (0, core_1.exportVariable)(name, "");
            (0, core_1.debug)(`Exporting ${name} with an empty value`);
        }
        else {
            (0, core_1.exportVariable)(name, value);
            (0, core_1.debug)(`Exporting ${name} with value ${value}`);
        }
    });
}
catch (e) {
    (0, core_1.setFailed)(`Failed to parse environment variables: ${e}}`);
}
