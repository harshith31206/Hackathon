# Engineering Guidelines & Coding Standards

### 1. Architecture & File Structure
- Reusable utility and business logic functions must reside under `src/utils/`.
- UI components must reside under `src/components/`.
- Pure functions should be thoroughly testable in isolation without DOM dependencies.

### 2. JavaScript / ES Modules Conventions
- Use ES6+ `export function` syntax (avoid CommonJS `module.exports` inside client code).
- Function names should be descriptive in camelCase (e.g. `validatePasswordStrength`, `validateRegistration`).
- Keep validation functions pure: given inputs, return `{ isValid: boolean, errors: object }` or `string | null`.

### 3. Testing Requirements
- Every new validation helper must have corresponding unit test assertions in `test/`.
- Tests are executed via standard `node --test` runner.
- All test assertions must pass 100% cleanly before raising Pull Requests.
