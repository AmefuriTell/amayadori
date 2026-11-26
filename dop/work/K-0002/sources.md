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

### 覆えなかった行
- knowledge: 「security scans」（セキュリティスキャン）の種類と段階の使い分け。取れた公式ページに無かった（Inspector 系のページは未取得）。
- skills: 「Running load/stress tests, performance benchmarking, and application testing at scale」。負荷・性能試験のサービス（Distributed Load Testing 等）の公式ページは未取得。
- skills: 「Invoking AWS services in a pipeline for testing」のうち、CodePipeline の Invoke アクションのページは取れなかった（URL が 404）。S5 は CodeDeploy の検証用 Lambda の呼び出しで代えた。
- knowledge: 「acceptance tests」「user interface tests」の使い分けの説明は取れず、S2 の Device Farm の文は種類の説明にとどまる（CloudWatch Synthetics のページは取れなかった）。
