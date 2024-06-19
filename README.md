## Codefresh release life cycle

### Instructions
1. make sure to manually bump the version in package.json of all the packages that we are using otherwise it will fail to publish it during cd pipeline 

### CI
CI part will take place from github actions. and not from codefresh pipeline once a PR has been created

### CD
CD part will take place from codefresh pipeline and will only publish specific packages that were defined in the codefresh.yml

### how to add another new package in case we need(ordered)
1. make change in the package.json of the specific required new package and rename the original name. take a look on how we did it for cubejs-bigquery-driver
2. add another step in the codefresh.yml so that the new package will be pushed to our npm

### What packages are we publishing atm
1. [cubejs-backend-shared](https://github.com/codefresh-io/cube.js/tree/master/packages/cubejs-backend-shared), [@codefresh-io/cubejs-backend-shared](https://www.npmjs.com/package/@codefresh-io/cubejs-backend-shared)  
**files were changed:**  
packages/cubejs-backend-shared/src/env.ts
2. [cubejs-backend-base-driver](https://github.com/codefresh-io/cube.js/tree/master/packages/cubejs-base-driver), [@codefresh-io/cubejs-backend-base-driver](https://www.npmjs.com/package/@codefresh-io/cubejs-backend-base-driver)
3. [cbuejs-bigquery-driver](https://github.com/codefresh-io/cube.js/tree/master/packages/cubejs-bigquery-driver), [@codefresh-io/cubejs-backend-bigquery-driver](https://www.npmjs.com/package/@codefresh-io/cubejs-backend-bigquery-driver)
4. [cubejs-postgres-driver](https://github.com/codefresh-io/cube.js/tree/master/packages/cubejs-postgres-driver), [@codefresh-io/cubejs-backend-postgres-driver](https://www.npmjs.com/package/@codefresh-io/cubejs-backend-postgres-driver)  
**files were changed:**  
packages/cubejs-postgres-driver/src/PostgresDriver.ts
5. [cubejs-backend-query-orchestrator](https://github.com/codefresh-io/cube.js/tree/master/packages/cubejs-query-orchestrator), [@codefresh-io/cubejs-backend-query-orchestrator](https://www.npmjs.com/package/@codefresh-io/cubejs-backend-query-orchestrator)   
**files were changed:**  
 packages/cubejs-query-orchestrator/src/orchestrator/IORedisFactory.ts
 packages/cubejs-query-orchestrator/src/orchestrator/RedisFactory.ts
6. [server-core](https://github.com/codefresh-io/cube.js/blob/master/packages/cubejs-server-core/package.json), [@codefresh-io/cubejs-backend-server-core](https://www.npmjs.com/package/@codefresh-io/cubejs-backend-server-core)

### How to use packages 
1. We need to keep real names of packages when using the published packages, so since we are publishing with different name, other places in cube js code aren't aware of this name and this causing issues on runtime.
2. a workaround for that will be to add the dependency in the service which consume it(For example platform-analytics) - with this syntax:
`"@cubejs-backend/bigquery-driver": "npm:@codefresh-io/cubejs-backend-bigquery-driver@0.30.81"
`3. this will resolve in platform analytics from our fork but will resolve it correctly in cube-js code.
see examples in platform-analytics package.json file

<p align="center">
  <a href="https://cube.dev?ref=github-readme"><img src="https://raw.githubusercontent.com/cube-js/cube/master/docs/content/cube-logo-with-bg.png" alt="Cube — Semantic Layer for Data Applications" width="300px"></a>
</p>

[Website](https://cube.dev?ref=github-readme) • [Getting Started](https://cube.dev/docs/getting-started?ref=github-readme) • [Docs](https://cube.dev/docs?ref=github-readme) • [Examples](https://cube.dev/docs/examples?ref=github-readme) • [Blog](https://cube.dev/blog?ref=github-readme) • [Slack](https://slack.cube.dev?ref=github-readme) • [Twitter](https://twitter.com/the_cube_dev)

[![npm version](https://badge.fury.io/js/%40cubejs-backend%2Fserver.svg)](https://badge.fury.io/js/%40cubejs-backend%2Fserver)
[![GitHub Actions](https://github.com/cube-js/cube/workflows/Build/badge.svg)](https://github.com/cube-js/cube/actions?query=workflow%3ABuild+branch%3Amaster)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fcube-js%2Fcube.js.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fcube-js%2Fcube.js?ref=badge_shield)

__Cube is the semantic layer for building data applications.__ It helps data engineers and application developers access data from modern data stores, organize it into consistent definitions, and deliver it to every application.

<img
  src="https://ucarecdn.com/8d945f29-e9eb-4e7f-9e9e-29ae7074e195/"
  style="border: none"
  width="100%"
/>

<p align="center">
  <i>Learn more about connecting Cube to <a href="https://cube.dev/docs/config/databases?ref=github-readme" target="_blank">data sources</a> and <a href="https://cube.dev/docs/config/downstream?ref=github-readme" target="_blank">analytics & visualization tools</a>.</i>
</p>

Cube was designed to work with all SQL-enabled data sources, including cloud data warehouses like Snowflake or Google BigQuery, query engines like Presto or Amazon Athena, and application databases like Postgres. Cube has a built-in relational caching engine to provide sub-second latency and high concurrency for API requests.

For more details, see the [introduction](https://cube.dev/docs/cubejs-introduction?ref=github-readme) page in our documentation.

## Why Cube?

If you are building a data application—such as a business intelligence tool or a customer-facing analytics feature—you’ll probably face the following problems:

1. __SQL code organization.__ Sooner or later, modeling even a dozen metrics with a dozen dimensions using pure SQL queries becomes a maintenance nightmare, which leads to building a modeling framework.
2. __Performance.__ Most of the time and effort in modern analytics software development is spent providing adequate time to insight. In a world where every company’s data is big data, writing just SQL queries to get insight isn’t enough anymore.
3. __Access Control.__ It is important to secure and govern access to data for all downstream data consuming applications.

Cube has the necessary infrastructure and features to implement efficient data modeling, access control, and performance optimizations so that every application—like embedded analytics, dashboarding and reporting tools, data notebooks, and other tools—can access consistent data via REST, SQL, and GraphQL APIs.

![](https://raw.githubusercontent.com/cube-js/cube.js/master/docs/content/old-was-vs-cubejs-way.png)

## Getting Started 🚀

### Cube Cloud

[Cube Cloud](https://cube.dev/cloud?ref=github-readme) is the fastest way to get started with Cube. It provides managed infrastructure as well as an instant and free access for development projects and proofs of concept.

<a href="https://cubecloud.dev/auth/signup?ref=github-readme"><img src="https://cubedev-blog-images.s3.us-east-2.amazonaws.com/f1f1eac0-0b44-4c47-936e-33b5c06eedf0.png" alt="Get started now" width="200px"></a>

For a step-by-step guide on Cube Cloud, [see the docs](https://cube.dev/docs/getting-started/cloud/overview?ref=github-readme).

### Docker

Alternatively, you can get started with Cube locally or self-host it with [Docker](https://www.docker.com/).

Once Docker is installed, in a new folder for your project, run the following command:

```bash
docker run -p 4000:4000 \
  -p 15432:15432 \
  -v ${PWD}:/cube/conf \
  -e CUBEJS_DEV_MODE=true \
  cubejs/cube
```

Then, open http://localhost:4000 in your browser to continue setup.

For a step-by-step guide on Docker, [see the docs](https://cube.dev/docs/getting-started-docker?ref=github-readme).

## Resources

- [Documentation](https://cube.dev/docs?ref=github-readme)
- [Getting Started](https://cube.dev/docs/getting-started?ref=github-readme)
- [Examples & Tutorials](https://cube.dev/docs/examples?ref=github-readme)
- [Architecture](https://cube.dev/docs/product/introduction#four-layers-of-semantic-layer)

## Contributing

There are many ways you can contribute to Cube! Here are a few possibilities:

* Star this repo and follow us on [Twitter](https://twitter.com/the_cube_dev).
* Add Cube to your stack on [Stackshare](https://stackshare.io/cube-js).
* Upvote issues with 👍 reaction so we know what's the demand for particular issue to prioritize it within road map.
* Create issues every time you feel something is missing or goes wrong.
* Ask questions on [Stack Overflow with cube.js tag](https://stackoverflow.com/questions/tagged/cube.js) if others can have these questions as well.
* Provide pull requests for all open issues and especially for those with [help wanted](https://github.com/cube-js/cube/issues?q=is%3Aissue+is%3Aopen+label%3A"help+wanted") and [good first issue](https://github.com/cube-js/cube/issues?q=is%3Aissue+is%3Aopen+label%3A"good+first+issue") labels.

All sort of contributions are **welcome and extremely helpful** 🙌 Please refer to [the contribution guide](https://github.com/cube-js/cube/blob/master/CONTRIBUTING.md) for more information.

## License

Cube Client is [MIT licensed](./packages/cubejs-client-core/LICENSE).

Cube Backend is [Apache 2.0 licensed](./packages/cubejs-server/LICENSE).


[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fcube-js%2Fcube.js.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fcube-js%2Fcube.js?ref=badge_large)
