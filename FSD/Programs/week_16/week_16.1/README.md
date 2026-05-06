Monorepo is managed by devtool enginner. He manages all the tools used by the developers so developers can focus on core logic.

Monorepo -> a single repository (on github lets say) that holds all your frontend, backend, devops code.

Why Monorepos ?
When there is any commit to the github it should reach to ec2 server it can be done fastly using remote caching.
Optimized Builds and CI/CD: Tools like TurboRepo offer smart caching and task execution strategies that can significantly reduce
build and testing times by remote caching.

If we are using TurboRepo as the framework for doing Monorepos under the hood TurboRepo uses npm workspaces which is a Monorepo
framework then why we need TurboRepo ? It has someother benefits
To understand the difference between TurboRepo and Monorepos (such as Lerna, nx, npm workspaces) we need to understand the differences
between Build System, Build System Orchestrator and Monorepo framework.

Build System
A build system automates the process of transforming source code written by developers into binary code that can be executed by a
computer. For JavaScript and TypeScript projects, this process can include transpilation (converting TS to JS), bundling (combining
multiple files into fewer files), minification (reducing file size), and more. A build system might also handle running tests,
linting, and deploying applications.

Monorepo Framework
A monorepo framework provides tools and conventions for managing projects that contain multiple packages or applications within a
single repository (monorepo). This includes dependency management between packages, workspace configuration.

TurboRepo are becomes so famous because those are
Build System Orchestrators.
TurboRepo acts more like a build system orchestrator rather than a direct build system itself. It doesn't directly perform tasks like
transpilation, bundling, minification, or running tests. Instead, TurboRepo allows you to define tasks in your monorepo that call
other tools (which are the actual build systems) to perform these actions.
These tools can include anything from tsc, vite etc

There is a common module in the project where frontend is depends on common and backend is also depends on common.
TurboRepo say that i will give a build command turbo build. It make sures that first common runs because both frontend and backend
depends on common. then backend runs and then frontend.
TurboRepo helps to schedule these builds in certain way and also helps to parallelize the builds like backend and frontend both
builds parallally.

This makes the Dependency management during Builds
caching during builds. (When there is any big project caching becomes very important it will not touch those files which are not
changed.)
