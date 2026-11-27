## S1 Test reports in AWS CodeBuild — Test reports in AWS CodeBuild
url: https://docs.aws.amazon.com/codebuild/latest/userguide/test-reporting.html#test-reporting
fetched: 2026-11-26
> You can create tests such as unit tests, configuration tests, and functional tests.
> Create your test cases with any test framework that can create report files in one of these formats (for example, Surefire JUnit plugin, TestNG, or Cucumber).

## S2 What is AWS Device Farm? — Automated app testing
url: https://docs.aws.amazon.com/devicefarm/latest/developerguide/welcome.html#automated-test-intro
fetched: 2026-11-26
> Device Farm allows you to run automated tests on multiple devices in parallel by uploading your app and tests.
> Device Farm supports testing of native and hybrid Android and iOS apps.

## S3 Test reports in AWS CodeBuild — Create code coverage reports
url: https://docs.aws.amazon.com/codebuild/latest/userguide/code-coverage-report.html#code-coverage-report
fetched: 2026-11-26
> CodeBuild allows you to generate code coverage reports for your tests.
> Line coverage measures how many statements your tests cover.
> Branch coverage measures how many branches your tests cover out of every possible branch of a control structure, such as an if or case statement.

## S4 Run builds in batches — Build fanout
url: https://docs.aws.amazon.com/codebuild/latest/userguide/batch-build.html#batch_build_fanout
fetched: 2026-11-26
> A build fanout defines a task that will be split into multiple builds in the batch. This can be used for running tests in parallel.

## S5 AppSpec 'hooks' section — Sample Lambda 'hooks' function
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-hooks.html#reference-appspec-file-structure-hooks-section-structure-ecs-sample-function
fetched: 2026-11-26
> Following completion of the validation tests, the Lambda AfterAllowTraffic function calls back CodeDeploy and delivers a result of Succeeded or Failed.
> The deployment is considered to have failed if CodeDeploy is not notified by the Lambda validation function within one hour.

## S6 Filter GitHub webhook events (console) — Filter GitHub webhook events (console)
url: https://docs.aws.amazon.com/codebuild/latest/userguide/github-webhook-events-console.html#github-webhook-events-console
fetched: 2026-11-26
> Select Rebuild every time a code change is pushed to this repository when you create your project.
> In this example, a webhook filter group triggers a build for pull requests only:
> The first filter group specifies pull requests that are created, updated, or reopened on branches with Git reference names that match the regular expression ^refs/heads/main$ and head references that match ^refs/heads/branch1$.

## S7 Create test reports — Create test reports
url: https://docs.aws.amazon.com/codebuild/latest/userguide/report-create.html#report-create
fetched: 2026-11-26
> To create a test report, you run a build project that is configured with one to five report groups in its buildspec file.
> A test report is created during the run.

## S8 Build specification reference for CodeBuild — phases/*/finally
url: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.phases
fetched: 2026-11-26
> The commands in a finally block are run even if a command in the commands block fails.
> If any command in a phase fails, the phase fails.

## S9 Test report statuses — Test report statuses
url: https://docs.aws.amazon.com/codebuild/latest/userguide/test-report.html#test-report
fetched: 2026-11-26
> SUCCEEDED: All test cases were successful.
> FAILED: Some of the test cases were not successful.

## S10 Automatically merge individual build reports — How it works
url: https://docs.aws.amazon.com/codebuild/latest/userguide/parallel-test-auto-merge.html#parallel-test-auto-merge.how
fetched: 2026-11-26
> When executing fanout batch builds, each individual build generates test reports.
> CodeBuild then automatically consolidates identical reports from different builds into a unified report, which is attached to the batch build.

## S11 AWS CodeBuild build and test action reference — AWS CodeBuild build and test action reference
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-CodeBuild.html#action-reference-CodeBuild
fetched: 2026-11-26
> Allows you to run builds and tests as part of your pipeline.
> When you run a CodeBuild build or test action, commands specified in the buildspec are run inside of a CodeBuild container.

## S12 AWS Device Farm test action reference — AWS Device Farm test action reference
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-DeviceFarm.html#action-reference-DeviceFarm
fetched: 2026-11-26
> In your pipeline, you can configure a test action that uses AWS Device Farm to run and test your application on devices.
> Device Farm uses test pools of devices and testing frameworks to test applications on specific devices.

## S13 Invoke an AWS Lambda function in a pipeline in CodePipeline — Invoke an AWS Lambda function in a pipeline
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-invoke-lambda-function.html#actions-invoke-lambda-function
fetched: 2026-11-26
> You can create Lambda functions and add them as actions in your pipelines.
> Because Lambda allows you to write functions to perform almost any task, you can customize the way your pipeline works.

## S14 Automate the testing of your software applications at scale — Automate the testing of your software applications at scale
url: https://docs.aws.amazon.com/solutions/latest/distributed-load-testing-on-aws/solution-overview.html#solution-overview
fetched: 2026-11-26
> Distributed Load Testing on AWS helps you automate performance testing of your software applications at scale to identify bottlenecks before you release your application.
> This solution simulates thousands of connected users generating HTTP requests at a sustained rate without the need to provision servers.

## S15 Features — Multiple Test Framework Support / High User Load Simulation
url: https://docs.aws.amazon.com/solutions/latest/distributed-load-testing-on-aws/features.html#features
fetched: 2026-11-26
> Supports JMeter, k6, and Locust test scripts, as well as simple HTTP endpoint testing without requiring custom scripts.
> Simulates tens of thousands of concurrent virtual users to stress test your application under realistic load conditions.

## S16 Features — Flexible Test Scheduling
url: https://docs.aws.amazon.com/solutions/latest/distributed-load-testing-on-aws/features.html#features
fetched: 2026-11-26
> Schedules tests to run immediately, at a specific future date and time, or on a recurring schedule using cron expressions for automated regression testing.

### 覆えなかった行
- knowledge: 「security scans」（セキュリティスキャン）の種類と段階の使い分け。取れた公式ページに無かった（Inspector 系のページは未取得）。
- knowledge: 「acceptance tests」「user interface tests」の使い分け。S2・S12 は Device Farm の種類と用途の説明にとどまり、受け入れ試験と UI 試験をどの段階で使い分けるかは取れなかった（CloudWatch Synthetics は 404）。
- skills: 「Invoking AWS services in a pipeline for testing」のうち、CodePipeline の Invoke アクションのページ（action-reference-Invoke）は 404 のまま。S13 の Lambda の呼び出しで代えた。
- skills: 「Measuring application health based on application exit codes」（終了コードで健全さを測る）。取れた公式ページに exit code の記述が無かった。S8 は「フェーズの中のコマンドが失敗するとフェーズが失敗する」までで、終了コードには触れていない（K-0002 の C3 の指摘で記録）。
