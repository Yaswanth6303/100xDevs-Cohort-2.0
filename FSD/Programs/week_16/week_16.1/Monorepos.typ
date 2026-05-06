#set document(
  title: "Monorepos and TurboRepo",
  author: "Yaswanth Gudivada",
)

#set page(
  paper: "a4",
  margin: (x: 2.5cm, y: 2.5cm),
  numbering: "1",
)

#set text(
  font: "New Computer Modern",
  size: 11pt,
  lang: "en",
)

#set par(
  justify: true,
  leading: 0.75em,
)

#set heading(numbering: "1.")

#show heading.where(level: 1): it => [
  #set text(size: 18pt, weight: "bold")
  #block(above: 1.5em, below: 1em)[#it]
]

#show heading.where(level: 2): it => [
  #set text(size: 14pt, weight: "bold")
  #block(above: 1.2em, below: 0.8em)[#it]
]

#align(center)[
  #text(size: 22pt, weight: "bold")[Monorepos and TurboRepo]
  #v(0.5em)
  #text(size: 12pt, style: "italic")[A Complete Guide to Build System Orchestration]
  #v(2em)
]

#outline(indent: auto)
#pagebreak()

= Introduction to Monorepos

In modern software development teams, a Monorepo is typically managed by a Developer Tooling Engineer (commonly referred to as a DevTool Engineer). The responsibility of this engineer is to maintain and manage all of the tools that the developers in the organization use on a daily basis. By taking ownership of the tooling layer, the DevTool Engineer enables the application developers to focus exclusively on writing the core business logic of the product, rather than spending time configuring build pipelines, dependency systems, or repository structures.

== What is a Monorepo?

A Monorepo, short for "monolithic repository", is a single source code repository (for example, a single repository hosted on GitHub) that contains all of the code for an organization or product. This includes the frontend code, the backend code, and the DevOps configuration code, all stored together in one unified location, instead of being scattered across many independent repositories.

= Why Use a Monorepo?

There are several important reasons why an organization may choose to adopt a Monorepo strategy. The two most significant reasons are explained below.

== Faster Deployment Through Remote Caching

Whenever a developer pushes a commit to GitHub, that change eventually needs to reach the production environment, such as an EC2 server on AWS. With a Monorepo strategy combined with remote caching, this process can be made significantly faster. Instead of rebuilding everything from scratch, the system can reuse previously computed build artifacts that are stored in a remote cache, dramatically reducing the time it takes for a commit to be deployed to the server.

== Optimized Builds and CI/CD Pipelines

Tools such as TurboRepo provide intelligent caching mechanisms and sophisticated task execution strategies. These features can significantly reduce the time required for both building and testing the codebase. The use of remote caching plays a central role here, because once a build or test result has been computed, it can be shared across the entire team and across CI/CD environments, avoiding redundant work.

= Understanding the Need for TurboRepo

A common and important question that arises is the following: if TurboRepo internally uses npm workspaces (which is itself a Monorepo framework) to manage packages, then why do we still need TurboRepo at all? The answer is that TurboRepo provides several additional benefits beyond what npm workspaces alone can offer.

To fully understand the difference between TurboRepo and other Monorepo solutions (such as Lerna, Nx, and npm workspaces), it is necessary to first clearly understand the distinction between three important concepts:

+ A Build System
+ A Build System Orchestrator
+ A Monorepo Framework

Each of these concepts is described in detail in the sections that follow.

= Build System

A Build System is a tool that automates the process of transforming the source code written by developers into the binary or executable form that can actually be run on a computer.

For projects written in JavaScript or TypeScript, the build process typically involves several distinct steps:

- *Transpilation*: Converting TypeScript code into JavaScript code so that it can run in environments that do not natively understand TypeScript.
- *Bundling*: Combining many separate source files into a smaller number of output files, which improves load performance.
- *Minification*: Reducing the file size of the output by removing unnecessary characters such as whitespace and shortening variable names.

In addition to these core transformations, a Build System may also be responsible for other developer workflows, such as running automated tests, performing linting checks on the code, and deploying the final application to its target environment.

= Monorepo Framework

A Monorepo Framework provides the tools and the conventions required to manage a project that contains multiple packages or multiple applications inside a single repository. The responsibilities of a Monorepo Framework include:

- *Dependency management between packages*: Ensuring that when one package depends on another package within the same repository, the dependency is correctly resolved and shared.
- *Workspace configuration*: Defining how the various packages and applications inside the repository are organized and linked together.

Examples of Monorepo Frameworks include npm workspaces, Yarn workspaces, and pnpm workspaces.

= Build System Orchestrator

TurboRepo has become extremely popular in the JavaScript and TypeScript ecosystem because it belongs to a specific category of tools known as *Build System Orchestrators*.

A Build System Orchestrator behaves differently from a direct Build System. It does not, by itself, perform tasks such as transpilation, bundling, minification, or running tests. Instead, it allows you to define tasks within your Monorepo that delegate the actual work to other tools, which are the real Build Systems performing those operations.

These underlying tools that TurboRepo orchestrates can include a wide range of utilities, such as the TypeScript compiler (`tsc`), bundlers like Vite, and many others.

= How TurboRepo Works in Practice

To make the role of TurboRepo concrete, consider the following common scenario in a real Monorepo project.

Suppose there is a `common` module in the project that contains shared utility code. Both the frontend application and the backend application depend on this `common` module. This creates a dependency relationship that must be respected during the build process.

When the developer runs the command `turbo build`, TurboRepo performs the following work on their behalf:

+ It first identifies that both the frontend and the backend depend on the `common` module.
+ It then ensures that the `common` module is built first, because the other two applications cannot be correctly built until `common` is ready.
+ Once `common` has been built, TurboRepo proceeds to build the backend and the frontend.

In addition to scheduling builds in the correct order, TurboRepo is also capable of parallelizing builds whenever it is safe to do so. For example, after the `common` module has finished building, the backend and the frontend can both be built at the same time, in parallel, because they do not depend on each other. This parallelization further reduces the total time required for the build process.

= Key Benefits of TurboRepo

Based on the behavior described above, TurboRepo provides two major benefits during the build process.

== Dependency Management During Builds

TurboRepo automatically understands the dependency graph between the packages in the Monorepo. This means it always builds packages in the correct topological order, ensuring that any package which is depended upon by another is built first. Developers do not have to manually orchestrate this ordering.

== Caching During Builds

Caching is one of the most powerful features of TurboRepo, and it becomes especially valuable as the project grows larger. When TurboRepo builds the project, it remembers the results of previous builds. On subsequent builds, it does not re-process files that have not changed. Instead, it reuses the cached results from the previous run.

This caching behavior dramatically reduces build times in large projects, because typically only a small fraction of the codebase changes between builds. By avoiding the redundant work of rebuilding unchanged files, TurboRepo allows developers and CI/CD systems to operate much more efficiently.

= Summary

In summary, a Monorepo is a single repository that holds the entire codebase of an organization, including frontend, backend, and DevOps code. While Monorepo Frameworks such as npm workspaces, Lerna, and Nx provide the foundational tools for managing multiple packages in a single repository, a Build System Orchestrator such as TurboRepo adds significant value on top of these frameworks. It does so by intelligently managing the dependency order of builds, enabling parallel execution of independent builds, and providing both local and remote caching to avoid redundant work. The combination of these capabilities makes TurboRepo an essential tool for teams that want fast, reliable, and scalable builds in a Monorepo environment.
