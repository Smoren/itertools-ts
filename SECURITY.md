# Security Policy

## Supported Versions

Security fixes are released for the latest minor version of the current major line.

| Version | Supported                  |
|---------|----------------------------|
| 2.x     | ✅ Yes (Latest minor only) |
| < 2.0   | ❌ No (archived)           |

## Reporting a Vulnerability

If you discover a security issue in IterTools, **do not open a public issue**.

**Preferred channel:** use GitHub Private vulnerability reporting — open the repository's **Security** tab and click **Report a vulnerability**. This creates a private security advisory that only the repository maintainers can see.

**Alternative:** if you cannot use the advisory form (e.g., you need to attach large or encrypted files), report privately to [ofigate@gmail.com](mailto:ofigate@gmail.com).

Please include in your report:

- IterTools version(s) affected
- Node.js / browser environment and version
- A minimal reproduction (code snippet or test case)
- A description of the impact (what an attacker could achieve)

We ask that you do not exploit the vulnerability, do not disclose it publicly before a fix is released, and do not demand payment — this project is maintained on a best-effort basis.

## What to Expect

- **Acknowledgement** — we will confirm receipt within 3 business days
- **Assessment** — we will investigate and determine severity and impact
- **Fix** — timeline depends on severity: critical issues are prioritized; other issues follow the regular release cadence
- **Disclosure** — after the fix is released, we publish the private advisory (optionally requesting a CVE), credit the reporter (if desired), and add a note to the CHANGELOG. The advisory remains confidential until then.

## Security Notes for This Project

IterTools is a **zero-dependency** library — there are no transitive runtime dependencies, which keeps the supply chain surface minimal. All code runs identically in Node.js and browsers; the library uses only standard ES6 language features (iterators, generators, `Symbol.iterator`/`Symbol.asyncIterator`) and no platform-specific APIs.
