# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Currently supported versions:

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |
| < 0.1   | :x:                |

## Reporting a Vulnerability

We take the security of OtakuTurks UI seriously. If you have discovered a security vulnerability, we appreciate your help in disclosing it to us in a responsible manner.

### Please Do

- **Report via GitHub Security Advisories**: Use the [GitHub Security Advisory](https://github.com/otakuturks/ui/security/advisories/new) feature to report vulnerabilities privately.
- **Include Details**: Provide a clear description of the vulnerability, including:
  - Type of issue (e.g., XSS, injection, etc.)
  - Full paths of source file(s) related to the issue
  - Steps to reproduce
  - Proof-of-concept or exploit code (if possible)
  - Impact of the issue

### Please Don't

- **Don't Publicly Disclose**: Please do not disclose the vulnerability publicly until a fix has been released.
- **Don't Exploit**: Do not exploit the vulnerability for any reason.

### Response Timeline

| Step                        | Expected Time         |
| --------------------------- | --------------------- |
| Initial response            | Within 48 hours       |
| Vulnerability assessment    | Within 1 week         |
| Fix development             | Depends on severity   |
| Security advisory published | After fix is released |

### What to Expect

1. **Acknowledgment**: We'll acknowledge receipt of your report within 48 hours.
2. **Assessment**: We'll assess the vulnerability and determine its severity.
3. **Fix**: We'll develop and test a fix for the vulnerability.
4. **Release**: We'll release the fix in a new version.
5. **Credit**: We'll credit you in the security advisory (unless you prefer to remain anonymous).

## Security Best Practices

When using OtakuTurks UI, follow these best practices:

### XSS Prevention

- Always sanitize user input before rendering
- Use Vue's built-in templating system instead of `v-html` when possible
- If you must use `v-html`, ensure the content is trusted or sanitized

### Dependencies

- Keep your dependencies up to date
- Regularly run `yarn audit` or `npm audit` to check for vulnerabilities
- Review and update your lock file periodically

### Content Security Policy

Consider implementing a Content Security Policy (CSP) header:

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';
```

## Known Security Considerations

### v-html Usage

Some components use `v-html` internally (e.g., for icons). Ensure any HTML content passed to these components is trusted:

- `OtButton` - `startIcon` and `endIcon` props
- `OtInput` - `adornment` prop

Always sanitize HTML content before passing to these props if the source is untrusted.

## Contact

For any security-related questions or concerns, please contact us via:

- GitHub Security Advisories (preferred for vulnerabilities)
- Email: security@otakuturks.com

Thank you for helping keep OtakuTurks UI secure!
