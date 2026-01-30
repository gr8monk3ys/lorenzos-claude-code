---
name: python-refactoring
description: |
  WHEN to auto-invoke: Working with Python files (*.py), refactoring Python code, detecting dead code in Python, finding code duplication, analyzing complexity metrics, improving code quality in Python projects, working with requirements.txt, pyproject.toml, setup.py, or Pipfile.
  WHEN NOT to invoke: JavaScript/TypeScript refactoring, non-Python projects, documentation-only tasks, deployment without Python code changes.
---

# Python Refactoring Skill

You are an expert in Python code quality, refactoring, and static analysis tooling - the Python equivalent of jscpd/knip for JavaScript.

## When to Use

This skill activates for:

- Refactoring Python codebases
- Detecting and removing dead code
- Finding duplicate code patterns
- Analyzing code complexity
- Improving Python code quality
- Working with Python project files (\*.py, requirements.txt, pyproject.toml)

## Core Tools

### 1. Vulture - Dead Code Detection

Finds unused code (dead code) in Python projects.

```bash
# Install
pip install vulture

# Basic usage - scan project
vulture .

# Scan specific paths
vulture src/ tests/

# Set minimum confidence (0-100, default 60)
vulture --min-confidence 80 .

# Generate whitelist for false positives
vulture --make-whitelist . > whitelist.py

# Use whitelist to suppress false positives
vulture . whitelist.py

# Sort by confidence
vulture --sort-by-size .
```

**Interpreting Output:**

```
src/utils.py:42: unused function 'old_helper' (60% confidence)
src/models.py:15: unused variable 'temp_data' (100% confidence)
src/api.py:88: unused import 'typing.Optional' (90% confidence)
```

- **100% confidence**: Definitely unused, safe to remove
- **60-90% confidence**: Likely unused, verify before removing
- **< 60% confidence**: May be used dynamically, investigate

### 2. Pylint Duplicate Code Detection

Finds copy-pasted and similar code blocks.

```bash
# Install
pip install pylint

# Check for duplicates only
pylint --disable=all --enable=duplicate-code .

# Set minimum lines for duplicate detection (default 4)
pylint --disable=all --enable=duplicate-code --min-similarity-lines=6 .

# Ignore imports in duplicate detection
pylint --disable=all --enable=duplicate-code --ignore-imports=yes .

# Full duplicate report
pylint --disable=all --enable=duplicate-code --reports=yes .
```

**Interpreting Output:**

```
************* Module src.handlers
src/handlers.py:1:0: R0801: Similar lines in 2 files
==src.utils:[15:30]
==src.handlers:[42:57]
    def process_data(self, data):
        validated = self.validate(data)
        transformed = self.transform(validated)
        return self.save(transformed)
```

**Action Items:**

- Extract duplicated logic into shared functions/classes
- Consider creating base classes for similar patterns
- Use composition or mixins for shared behavior

### 3. Radon - Complexity Metrics

Analyzes cyclomatic complexity, maintainability index, and raw metrics.

```bash
# Install
pip install radon

# Cyclomatic Complexity (CC)
radon cc . -a -s          # All files, average, sorted
radon cc . -nc            # Only show complex functions (C+ grade)
radon cc . --min B        # Show B grade and worse
radon cc . -j             # JSON output

# Maintainability Index (MI)
radon mi . -s             # Sorted by index
radon mi . -nc            # Only show non-maintainable (C+ grade)

# Raw metrics (LOC, LLOC, SLOC, comments, etc.)
radon raw . -s

# Halstead metrics (effort, difficulty, bugs estimate)
radon hal .
```

**Complexity Grades:**
| Grade | CC Score | Risk Level |
|-------|----------|------------|
| A | 1-5 | Low - simple, well-tested |
| B | 6-10 | Low - straightforward |
| C | 11-20 | Moderate - needs attention |
| D | 21-30 | High - error prone |
| E | 31-40 | Very High - hard to test |
| F | 41+ | Critical - untestable |

**Interpreting Output:**

```
src/processor.py
    F 142:0 process_all - C (15)
    M 89:4 DataProcessor.validate - B (8)
    M 45:4 DataProcessor.__init__ - A (3)
```

**Refactoring Triggers:**

- CC > 10: Consider breaking into smaller functions
- CC > 20: Mandatory refactoring needed
- MI < 20: File is hard to maintain

### 4. Rope - Refactoring Operations

Python refactoring library for safe code transformations.

```bash
# Install
pip install rope

# Or use via editor plugins:
# - VSCode: Python extension includes rope
# - PyCharm: Built-in refactoring (similar capabilities)
# - Vim: python-mode or ropevim
```

**Common Refactoring Operations:**

```python
# Using rope programmatically
from rope.base.project import Project
from rope.refactor.rename import Rename
from rope.refactor.extract import ExtractMethod, ExtractVariable

# Initialize project
project = Project('.')

# Rename a symbol
resource = project.get_resource('src/utils.py')
rename = Rename(project, resource, offset=150)  # offset is cursor position
changes = rename.get_changes('new_name')
project.do(changes)

# Extract method
extract = ExtractMethod(project, resource, start=100, end=200)
changes = extract.get_changes('extracted_function')
project.do(changes)

# Extract variable
extract_var = ExtractVariable(project, resource, start=50, end=80)
changes = extract_var.get_changes('meaningful_name')
project.do(changes)
```

**Supported Refactorings:**

- Rename (variables, functions, classes, modules)
- Extract method/function
- Extract variable
- Inline variable/function
- Move module/class
- Change signature
- Convert local to field

## Integration Patterns

### Pre-commit Hook

```yaml
# .pre-commit-config.yaml
repos:
  - repo: local
    hooks:
      - id: vulture
        name: vulture
        entry: vulture
        language: system
        types: [python]
        args: ["--min-confidence", "80"]

      - id: radon-cc
        name: radon complexity check
        entry: bash -c 'radon cc "$@" --min C -nc && exit 1 || exit 0' --
        language: system
        types: [python]
```

### CI/CD Integration (GitHub Actions)

```yaml
# .github/workflows/code-quality.yml
name: Python Code Quality

on: [push, pull_request]

jobs:
  code-quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"

      - name: Install tools
        run: pip install vulture radon pylint

      - name: Dead code check
        run: vulture . --min-confidence 80

      - name: Complexity check
        run: |
          radon cc . -nc --min D && echo "High complexity detected!" && exit 1 || exit 0

      - name: Duplicate code check
        run: pylint --disable=all --enable=duplicate-code --fail-under=9 .
```

### pyproject.toml Configuration

```toml
[tool.vulture]
min_confidence = 80
paths = ["src", "tests"]
exclude = ["**/migrations/*", "**/conftest.py"]

[tool.pylint.similarities]
min-similarity-lines = 6
ignore-imports = true
ignore-docstrings = true

[tool.radon]
cc_min = "C"
mi_min = "B"
```

### Makefile Integration

```makefile
.PHONY: quality dead-code duplicates complexity refactor-check

quality: dead-code duplicates complexity

dead-code:
	@echo "Checking for dead code..."
	vulture . --min-confidence 80

duplicates:
	@echo "Checking for duplicate code..."
	pylint --disable=all --enable=duplicate-code .

complexity:
	@echo "Checking complexity..."
	radon cc . -nc --min C
	radon mi . -nc

refactor-check: quality
	@echo "All refactoring checks passed!"
```

## When to Suggest Running These Tools

### Suggest vulture when:

- Completing a large refactoring task
- Removing a feature or deprecating code
- Before major releases
- Code review finds potentially unused code
- Import statements seem excessive

### Suggest pylint duplicate check when:

- Similar patterns appear across files
- Copy-paste is suspected
- Creating shared utilities
- Code review notes repetition
- Consolidating related modules

### Suggest radon when:

- Functions become hard to understand
- Test coverage is difficult to achieve
- Bug density increases in specific areas
- Code review notes complexity
- Before refactoring complex code

### Suggest rope when:

- Renaming symbols across codebase
- Extracting reusable functions
- Restructuring module organization
- Converting between patterns
- Safe automated refactoring needed

## Best Practices

1. **Run tools incrementally**: Don't try to fix everything at once
2. **Create whitelists**: For intentionally unused code (APIs, plugins)
3. **Set CI thresholds**: Prevent complexity creep over time
4. **Combine with type checking**: Use with mypy for comprehensive quality
5. **Document exceptions**: When ignoring warnings, explain why

## Common Pitfalls

- **False positives in vulture**: Dynamic code (getattr, **all**) may be flagged
- **Duplicate detection noise**: Boilerplate patterns may be intentional
- **Over-optimizing complexity**: Sometimes explicit is better than clever
- **Breaking changes with rope**: Always verify changes with tests

## Integration Points

- **mypy** for static type checking
- **black/ruff** for formatting
- **pytest** for test coverage
- **tox** for multi-environment testing
- **pre-commit** for automated checks
