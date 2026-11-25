# C-0007 sources

## S1 Automate the testing of your software applications at scale - Distributed Load Testing on AWS — Automate the testing of your software applications at scale
url: https://docs.aws.amazon.com/solutions/latest/distributed-load-testing-on-aws/solution-overview.html#solution-overview
fetched: 2026-11-25
> Distributed Load Testing on AWS helps you automate performance testing of your software applications at scale to identify bottlenecks before you release your application.
> This solution simulates thousands of connected users generating HTTP requests at a sustained rate without the need to provision servers.
> Customize your application tests using JMeter, k6, Locust test scripts, or simple HTTP endpoint configuration.
> Schedule load tests to run immediately, at a future date and time, or on a recurring schedule.
> Run multiple load tests concurrently across different scenarios and Regions.

## S2 Use cases - Distributed Load Testing on AWS — Use cases
url: https://docs.aws.amazon.com/solutions/latest/distributed-load-testing-on-aws/use-cases.html#use-cases
fetched: 2026-11-25
> Regression Testing
> Schedule recurring load tests to detect performance regressions introduced by new code deployments or infrastructure changes.
> CI/CD Pipeline Integration
> Integrate automated performance testing into continuous integration and deployment pipelines to catch performance issues early in the development cycle.

## S3 Features - Distributed Load Testing on AWS — Features
url: https://docs.aws.amazon.com/solutions/latest/distributed-load-testing-on-aws/features.html#features
fetched: 2026-11-25
> Flexible Test Scheduling
> Schedules tests to run immediately, at a specific future date and time, or on a recurring schedule using cron expressions for automated regression testing.

## S4 Run builds in batches - AWS CodeBuild — Build matrix
url: https://docs.aws.amazon.com/codebuild/latest/userguide/batch-build.html#batch_build_matrix
fetched: 2026-11-25
> A build matrix defines tasks with different configurations that run in parallel.
> CodeBuild creates a separate build for each possible configuration combination.
> These builds run in parallel.

## S5 Run builds in batches - AWS CodeBuild — Build fanout
url: https://docs.aws.amazon.com/codebuild/latest/userguide/batch-build.html#batch_build_fanout
fetched: 2026-11-25
> A build fanout defines a task that will be split into multiple builds in the batch. This can be used for running tests in parallel.
> CodeBuild creates a separate build for each shard of test cases based on the value set in the parallelism field.
