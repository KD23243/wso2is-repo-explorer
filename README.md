# WSO2 Identity Server Repository Explorer (rEx)

WSO2 Identity Server is a fully open-source platform. Its vast codebase spans hundreds of repositories across the `wso2` and `wso2-extensions` GitHub organizations. While this modular architecture is powerful, it can make it challenging to figure out which repository a particular JAR file or component comes from.

rEx was created to solve exactly this problem—making it easy to explore the WSO2 ecosystem. It’s especially helpful for external developers, newcomers, and anyone who wants to understand the project’s structure without having to piece everything together manually.

## ✨ What’s New?

Earlier versions of rEx were command-line tools that required more technical setup and familiarity with CLI workflows.

The latest release introduces a modern web-based frontend, dramatically simplifying the experience.

✅ No more CLI commands.  
✅ Search directly in your browser.  
✅ Get instant visibility into the repositories.

## 🌱 Who Should Use This?

✅ External developers integrating with WSO2 Identity Server  
✅ New contributors and engineers exploring the codebase  
✅ Maintainers who want a faster way to locate specific modules

Whether you’re building integrations or learning how everything fits together, the intuitive web interface makes discovery effortless.

## 🚀 Getting Started

The tool uses Docker for backend services and Node.js for the frontend.

1️⃣ **Install and start Docker on your machine.**

2️⃣ **Install frontend dependencies:**

```bash
npm install
````

3️⃣ **Start the application:**

```bash
npm start
```

Once running, the web interface will be available at:  
👉 http://localhost:5173/

## 🔍 How to Search

You can locate repositories and components in multiple ways:

🔹 **Search by Component or JAR File** Provide the component name or JAR file name (without the version):

```pgsql
org.wso2.carbon.identity.event.handler.notification
```

🔹 **Search by Class Name** Enter the exact class name to find its location:

```java
JWTBasicAuthenticator.java
```

🔹 **Search by Keyword or Phrase** Use any keyword, and rEx will look for matches across repositories:

```nginx
smsotp
```

## 🎥 Demo


https://github.com/user-attachments/assets/dcb7d95d-1af2-4b5b-8eb1-418afc3011b5



## 🙌 Contributing

This project is open source, released under the Apache 2.0 License. Contributions of all kinds are welcome\!

This version is a fork of the original project by Prabath Siriwardena.

**Original Source Code:** [https://github.com/prabath/wso2is-repo-explorer](https://github.com/prabath/wso2is-repo-explorer)

**Report Issues:** [https://github.com/prabath/wso2is-repo-explorer/issues](https://github.com/prabath/wso2is-repo-explorer/issues)

We encourage you to report bugs, suggest improvements, or submit pull requests to help make rEx even better\!

```
```
