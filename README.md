# Validate Koyeb yaml action

This action will look for all possible `koyeb.yaml` and will validate them against the api validator.
This is mainly meant to be used as a pull request validator.

## Example usage

```yaml
uses: actions/koyeb-validate-yaml-action
with:
  patterns: '**/koyeb.yaml,**/koyeb.yml'
```
