import * as core from "@actions/core";

function parseEnvVars(envVars: NodeJS.ProcessEnv): Array<[string, unknown]> {
  return Object.entries(envVars)
    .filter(
      ([name]) => name.startsWith("INPUT_")
    )
    .map(([name, value]) => {
      const transformedName = name.replace("INPUT_", "");
      return [transformedName, value?.trim()];
    });
}

try {
  const vars = parseEnvVars(process.env).forEach(
    ([name, value]) => {
      if (!value) {
          core.exportVariable(name, "");
          core.debug(`Exporting ${name} with an empty value`);
      } else {
        core.exportVariable(name, value);
        core.debug(`Exporting ${name} with value ${value}`);
      }
    }
  );
} catch (e) {
  core.setFailed(`Failed to parse environment variables: ${e}}`);
}
