# Security Policy

## 🔐 How to Contribute to the CELi App system's Security

You can help improve the security of the front-end of **CELi App** project by analyzing the code during the design phase, running a local instance on your computer, or using the public test server.

🚨Please do not submit vulnerabilities through other means like VulnDB plataform. Our vulnerability disclosure policy is fully centered on GitHub Advisory.🚨

---

### 🧠 Design-Time Analysis

To test CELi App’s code during the design phase, clone the repository and use static analysis tools. Here are some suggestions:

- **Installation procedure**

- To be written
  
---

### 🖥️ Runtime Testing (Local Instance)

You can use a virtual machine with WeGIA pre-installed to run your security tests.

- **VirtualBox**
  - Prerequisite: Install [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
  - Download the [WeGIA Virtual Machine](https://www.wegia.org/vm/)
    - **Username**: `wegia`  
    - **Password**: `wegia`

- **Local Installation**

  To be written

---

### 🌐 Runtime Testing (Public Server)

You can use a public server with WeGIA pre-installed to run your security tests.

- [Security Testing Server](https://celi.cefet-rj.br/eventos-testes/)

## 📦 Supported Versions

The following table indicates which versions of WeGIA receive security updates:

| Version | Supported |
|---------|-----------|
| ≥ 1.0.0 | ✅ Yes    |

---

## 🛡️ Reporting a Vulnerability

If you discover a security vulnerability in CELi events, we encourage responsible disclosure.

- **Preferred method:** Submit a private advisory via GitHub.
- **GitHub Security Advisory:** [https://github.com/cefetfriburgo/celi_front/security/advisories](https://github.com/cefetfriburgo/celi_front/security/advisories)
- **Alternative contact:** Send an email to `labredes@grupo.cefet-rj.br`

Please include the following details if possible:

- Description of the issue
- Steps to reproduce
- Affected version(s)
- Potential impact.

---

**Thank you for helping to keep the software secure.**
