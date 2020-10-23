# Validate Koyeb yaml action

This action will look for all possible `koyeb.yaml` and will validate them against the api validator.
This is mainly meant to be used as a check when changing your `koyeb.yaml`.

If you are new to the easiest, fastest serverless platform checkout: [koyeb.com](koyeb.com).

## Example usage

Add this in `.github/workflows/prb.yaml` to add a Pull Request check:
```yaml
name: PR Check
on: [pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/validate-koyeb-yaml@v1
```

__Advanced__: : With a specific set of files:
```yaml
uses: actions/koyeb-validate-yaml-action
with:
  patterns: '**/koyeb.yaml,**/koyeb.yml'
```
