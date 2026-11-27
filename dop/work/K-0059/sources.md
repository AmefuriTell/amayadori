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

## S17 GitHub webhook events - AWS CodeBuild — GitHub webhook events
url: https://docs.aws.amazon.com/codebuild/latest/userguide/github-webhook.html#github-webhook
fetched: 2026-11-25
> You can use webhook filter groups to specify which GitHub webhook events trigger a build.
> You can create one or more webhook filter groups to specify which webhook events trigger a build.
> A build is triggered if any filter group evaluates to true, which occurs when all the filters in the group evaluate to true.
> For GitHub, you can choose one or more of the following events:
> PUSH, PULL_REQUEST_CREATED, PULL_REQUEST_UPDATED, PULL_REQUEST_REOPENED, PULL_REQUEST_MERGED, PULL_REQUEST_CLOSED, RELEASED, PRERELEASED, and WORKFLOW_JOB_QUEUED.
> A BASE_REF filter can be used with pull request events only.
> A webhook triggers a build when the path of a changed file matches the regular expressions pattern.
> A webhook triggers a build when the head commit message matches the regular expression pattern.

## S18 Build specification reference for CodeBuild - AWS CodeBuild — reports
url: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.reports
fetched: 2026-11-25
> Optional sequence. Specifies the report group that the reports are sent to. A project can have a maximum of five report groups.
> Required sequence. Represents the locations that contain the raw data of test results generated by the report.
> Contains a sequence of scalars, with each scalar representing a separate location where CodeBuild can find test files, relative to the original build location or, if set, the base-directory.
> Optional mapping. Represents the report file format. If not specified, JUNITXML is used. This value is not case sensitive.
> Test reports CUCUMBERJSON Cucumber JSON JUNITXML JUnit XML NUNITXML NUnit XML NUNIT3XML NUnit 3 XML TESTNGXML TestNG XML VISUALSTUDIOTRX Visual Studio TRX

## S19 Automate starting pipelines using triggers and filtering - AWS CodePipeline — Pull request events for triggers by provider
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/pipelines-triggers.html#pipelines-filter-pullrequest-events
fetched: 2026-11-25
> Open - This option triggers the pipeline when a pull request is created for the branch/file path.
> Update - This option triggers the pipeline when a pull request revision is published for the branch/file path.
> Closed - This option triggers the pipeline when a pull request is closed for the branch/file path.

## S20 Pipeline declaration - AWS CodePipeline — triggers
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/pipeline-requirements.html#pipeline.triggers
fetched: 2026-11-25
> Triggers allow you to configure your pipeline to start on a particular event type or filtered event type, such as when a change on a particular branch or pull request is detected.
> The Git configuration for the trigger, including the event types and any parameters for filtering by branches, file paths, tags, or pull request events.
> push: Push events with filtering. These events use an OR operation between different push filters and an AND operation inside filters.
> pullRequest: Pull request events with filtering on pull request events and pull request filters.

## S21 Start a pipeline in CodePipeline — Webhook events for third-party sources
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/pipelines-about-starting.html#pipelines-about-starting
fetched: 2026-11-25
> When a change is detected by a webhook event, your pipeline starts.
> This trigger type uses automated change detection.
> The source action providers that use this trigger type are connections configured for code push (Bitbucket Cloud, GitHub, GitHub Enterprise Server, GitLab.com, and GitLab self-managed).

## S22 Automate the testing of your software applications at scale - Distributed Load Testing on AWS — Automate the testing of your software applications at scale
url: https://docs.aws.amazon.com/solutions/latest/distributed-load-testing-on-aws/solution-overview.html#solution-overview
fetched: 2026-11-25
> Distributed Load Testing on AWS helps you automate performance testing of your software applications at scale to identify bottlenecks before you release your application.
> This solution simulates thousands of connected users generating HTTP requests at a sustained rate without the need to provision servers.
> Customize your application tests using JMeter, k6, Locust test scripts, or simple HTTP endpoint configuration.
> Schedule load tests to run immediately, at a future date and time, or on a recurring schedule.
> Run multiple load tests concurrently across different scenarios and Regions.

## S23 Use cases - Distributed Load Testing on AWS — Use cases
url: https://docs.aws.amazon.com/solutions/latest/distributed-load-testing-on-aws/use-cases.html#use-cases
fetched: 2026-11-25
> Regression Testing
> Schedule recurring load tests to detect performance regressions introduced by new code deployments or infrastructure changes.
> CI/CD Pipeline Integration
> Integrate automated performance testing into continuous integration and deployment pipelines to catch performance issues early in the development cycle.

## S24 Features - Distributed Load Testing on AWS — Features
url: https://docs.aws.amazon.com/solutions/latest/distributed-load-testing-on-aws/features.html#features
fetched: 2026-11-25
> Flexible Test Scheduling
> Schedules tests to run immediately, at a specific future date and time, or on a recurring schedule using cron expressions for automated regression testing.

## S25 Run builds in batches - AWS CodeBuild — Build matrix
url: https://docs.aws.amazon.com/codebuild/latest/userguide/batch-build.html#batch_build_matrix
fetched: 2026-11-25
> A build matrix defines tasks with different configurations that run in parallel.
> CodeBuild creates a separate build for each possible configuration combination.
> These builds run in parallel.

## S26 Run builds in batches - AWS CodeBuild — Build fanout
url: https://docs.aws.amazon.com/codebuild/latest/userguide/batch-build.html#batch_build_fanout
fetched: 2026-11-25
> A build fanout defines a task that will be split into multiple builds in the batch. This can be used for running tests in parallel.
> CodeBuild creates a separate build for each shard of test cases based on the value set in the parallelism field.

## S27 Amazon ECS task definition parameters — Health check

url: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#container_definition_healthcheck
fetched: 2026-11-26

> A string array that represents the command that the container runs to determine if it's healthy.
> An exit code of 0, with no stderr output, indicates success, and a non-zero exit code indicates failure.
> The period of time (in seconds) between each health check. You can specify between 5 and 300 seconds. The default value is 30 seconds.
> The period of time (in seconds) to wait for a health check to succeed before it's considered a failure. You can specify between 2 and 60 seconds. The default value is 5 seconds.
> The number of times to retry a failed health check before the container is considered unhealthy. You can specify between 1 and 10 retries. The default value is three retries.
> The optional grace period to provide containers time to bootstrap in before failed health checks count towards the maximum number of retries. You can specify a value between 0 and 300 seconds. By default, startPeriod is disabled.
> If a health check succeeds within the startPeriod, then the container is considered healthy and any subsequent failures count toward the maximum number of retries.

## S28 Amazon ECS task definition parameters — Container definitions — essential

url: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#container_definitions
fetched: 2026-11-26

> Suppose that the essential parameter of a container is marked as true, and that container fails or stops for any reason. Then, all other containers that are part of the task are stopped.
> If the essential parameter of a container is marked as false, then its failure doesn't affect the rest of the containers in a task. If this parameter is omitted, a container is assumed to be essential.
> All tasks must have at least one essential container.

## S29 Determine Amazon ECS task health using container health checks — How Amazon ECS determines task health

url: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/healthcheck.html#task-determination
fetched: 2026-11-26

> Containers that are essential and have health check command in the task definition are the only ones considered to determine the task health.
> If the status of one essential container is UNHEALTHY, then the task status is UNHEALTHY.
> If the status of one essential container is UNKNOWN, then the task status is UNKNOWN.
> If the status of all essential containers are HEALTHY, then the task status is HEALTHY.

## S30 AppSpec 'hooks' section — Structure of 'hooks' section

url: https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-hooks.html#reference-appspec-file-structure-hooks-section-structure
fetched: 2026-11-26

> Optional. The number of seconds to allow the script to execute before it is considered to have failed. The default is 3600 seconds (1 hour).
> 3600 seconds (1 hour) is the maximum amount of time allowed for script execution for each deployment lifecycle event. If scripts exceed this limit, the deployment stops and the deployment to the instance fails.

## S31 AppSpec 'hooks' section — List of lifecycle event hooks — ValidateService

url: https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-hooks.html#reference-appspec-file-structure-hooks-list
fetched: 2026-11-26

> ValidateService – This is the last deployment lifecycle event. It is used to verify the deployment was completed successfully.

## S32 Troubleshoot EC2/On-Premises deployment issues — Long-running processes can cause deployments to fail

url: https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-deployments.html#troubleshooting-long-running-processes
fetched: 2026-11-26

> For deployments to Amazon Linux, Ubuntu Server, and RHEL instances, if you have a deployment script that starts a long-running process, CodeDeploy might spend a long time waiting in the deployment lifecycle event and then fail the deployment.
> After the timeout of one minute (60 seconds), CodeDeploy stops and fails the deployment at the AfterInstall application lifecycle event, even though sleep.sh continues to run as expected.
> Script at specified location: after-install.sh failed to complete in 60 seconds.

## S33 Test reports in AWS CodeBuild — Test reports in AWS CodeBuild
url: https://docs.aws.amazon.com/codebuild/latest/userguide/test-reporting.html#test-reporting
fetched: 2026-11-26
> You can create reports in CodeBuild that contain details about tests that are run during builds. You can create tests such as unit tests, configuration tests, and functional tests.
> To create a test report, you add a report group name to the buildspec file of a build project with information about your test cases. When you run the build project, the test cases are run and a test report is created. A new test report is created in the report group each time the test cases run.
> You can use a test report to help troubleshoot a problem during a build run.
> A report expires 30 days after it was created. You cannot view an expired test report.

## S34 Create code coverage reports — Create code coverage reports
url: https://docs.aws.amazon.com/codebuild/latest/userguide/code-coverage-report.html#code-coverage-report
fetched: 2026-11-26
> CodeBuild allows you to generate code coverage reports for your tests.
> Line coverage measures how many statements your tests cover. A statement is a single instruction, not including comments or conditionals.
> line coverage = (total lines covered)/(total number of lines)
> Branch coverage measures how many branches your tests cover out of every possible branch of a control structure, such as an if or case statement.
> branch coverage = (total branches covered)/(total number of branches)
> The following code coverage report file formats are supported:
> JaCoCo XML
> Clover XML
> Cobertura XML
> LCOV INFO

## S35 Create a code coverage report — Create a code coverage report
url: https://docs.aws.amazon.com/codebuild/latest/userguide/code-coverage-report.html#code-coverage-report-create
fetched: 2026-11-26
> To create a code coverage report, you run a build project that is configured with at least one code coverage report group in its buildspec file.
> CodeBuild will interpret the code coverage results and provide a code coverage report for the run.
> A new test report is generated for each subsequent build that uses the same buildspec file.
> In the commands section of the build or post_build sequence, specify the commands that run the code coverage analysis.

## S36 Create a report group — Create a report group
url: https://docs.aws.amazon.com/codebuild/latest/userguide/report-group-create.html#report-group-create
fetched: 2026-11-26
> You can use the CodeBuild console, the AWS CLI, or a buildspec file to create a report group.

## S37 Create a report group (buildspec) — Create a report group (buildspec)
url: https://docs.aws.amazon.com/codebuild/latest/userguide/report-group-create.html#test-report-group-create-buildspec
fetched: 2026-11-26
> A report group created using the buildspec does not export raw test result files.
> Configure the reports section of the buildspec file with this name.
> In the commands section, specify the command to run your tests.
> Run the build. When the build is complete, a new report group is created with a name that uses the format project-name-report-group-name.

## S38 Build specification reference — reports
url: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec.reports
fetched: 2026-11-26
> Optional sequence. Specifies the report group that the reports are sent to. A project can have a maximum of five report groups.
> Specify the ARN of an existing report group, or the name of a new report group.
> Required sequence. Represents the locations that contain the raw data of test results generated by the report.
> Optional mapping. Represents the report file format. If not specified, JUNITXML is used. This value is not case sensitive.
> Optional. Specifies if the report file directories are flattened in the output.
> CodeBuild accepts JSON code coverage reports generated by simplecov, not simplecov-json.

## S39 AWS CodeBuild build and test action reference — AWS CodePipeline
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-CodeBuild.html#action-reference-CodeBuild
fetched: 2026-11-26
> Allows you to run builds and tests as part of your pipeline. When you run a CodeBuild build or test action, commands specified in the buildspec are run inside of a CodeBuild container.
> CodeBuild can provide either a build or test action.
> Category: Build or Test

## S40 AWS CodeBuild build and test action reference — Configuration parameters (CodePipeline)
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-CodeBuild.html#action-reference-CodeBuild-config
fetched: 2026-11-26
> ProjectName is the name of the build project in CodeBuild.
> The value of the PrimarySource parameter must be the name of one of the input artifacts to the action.
> This parameter is required if multiple input artifacts are specified for a CodeBuild action.
> The Boolean value of the BatchEnabled parameter allows the action to run multiple builds in the same build execution.

## S41 AWS CodeBuild build and test action reference — Output variables (CodePipeline)
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-CodeBuild.html#action-reference-CodeBuild-variables
fetched: 2026-11-26
> This action will produce as variables all environment variables that were exported as part of the build.

## S42 Invoke an AWS Lambda function in a pipeline in CodePipeline — Invoke an AWS Lambda function in a pipeline in CodePipeline
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-invoke-lambda-function.html#actions-invoke-lambda-function
fetched: 2026-11-26
> AWS Lambda is a compute service that lets you run code without provisioning or managing servers.
> You can create Lambda functions and add them as actions in your pipelines.
> Do not log the JSON event that CodePipeline sends to Lambda because this can result in user credentials being logged in CloudWatch Logs.
> The CodePipeline role uses a JSON event to pass temporary credentials to Lambda in the artifactCredentials field.
> When using cross-region Lambda invoke action in CodePipeline, the status of the Lambda execution using the PutJobSuccessResult and PutJobFailureResult should be sent to the AWS Region where the Lambda function is present and not to the Region where CodePipeline exists.
> Using a continuation token to monitor a long-running asynchronous process (continue_job_later).
> This allows the action to continue and the function to succeed even if it exceeds a fifteen-minute runtime (a limit in Lambda).

## S43 Invoke an AWS Lambda function in a pipeline in CodePipeline — Step 2: Create the Lambda function
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-invoke-lambda-function.html#actions-invoke-lambda-function-create-function
fetched: 2026-11-26
> In this step, you create a Lambda function that makes an HTTP request and checks for a line of text on a webpage.
> As part of this step, you must also create an IAM policy and Lambda execution role.

## S44 Invoke an AWS Lambda function in a pipeline in CodePipeline — Lambda function returning success or failure results
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-invoke-lambda-function.html#actions-invoke-lambda-function
fetched: 2026-11-26
> Returning success or failure results to CodePipeline in the Details link for the action.

## S45 AWS Step Functions invoke action reference — Configuration parameters
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-StepFunctions.html#action-reference-StepFunctions-config
fetched: 2026-11-26
> Starts an AWS Step Functions state machine execution from your pipeline.
> Provides an initial state to the state machine through either a property in the action configuration or a file located in a pipeline artifact to be passed as input.
> Supports Standard and Express state machines.
> If provided, the Input field is used directly as the input for the state machine execution.
> Otherwise, the state machine is invoked with an empty JSON object {}.

## S46 AWS Step Functions invoke action reference — Output artifacts and output variables
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-StepFunctions.html#action-reference-StepFunctions-output
fetched: 2026-11-26
> This is obtained from the output property of the Step Functions DescribeExecution API response after the state machine execution completes successfully.
> This action produces output variables that can be referenced by the action configuration of a downstream action in the pipeline.

## S47 Add a manual approval action to a stage — Add a manual approval action to a stage
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/approvals.html#approvals
fetched: 2026-11-26
> In AWS CodePipeline, you can add an approval action to a stage in a pipeline at the point where you want the pipeline execution to stop so that someone with the required AWS Identity and Access Management permissions can approve or reject the action.
> If the action is approved, the pipeline execution resumes.
> If the action is rejected—or if no one approves or rejects the action within seven days of the pipeline reaching the action and stopping—the result is the same as an action failing, and the pipeline execution does not continue.
> You want someone to perform a code review or change management review before a revision is allowed into the next stage of a pipeline.
> You want someone to perform manual quality assurance testing on the latest version of an application, or to confirm the integrity of a build artifact, before it is released.

## S48 Add a manual approval action to a stage — Setup and workflow overview for approval actions in CodePipeline
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/approvals.html#approvals-overview
fetched: 2026-11-26
> You grant the IAM permissions required for approving or rejecting approval actions to one or more IAM roles in your organization.

### 覆えなかった行
- knowledge: 「security scans」（セキュリティスキャン）の種類と段階の使い分け。取れた公式ページに無かった（Inspector 系のページは未取得）。
- knowledge: 「acceptance tests」「user interface tests」の使い分け。S2・S12 は Device Farm の種類と用途の説明にとどまり、受け入れ試験と UI 試験をどの段階で使い分けるかは取れなかった（CloudWatch Synthetics は 404）。
- skills: 「Invoking AWS services in a pipeline for testing」のうち、CodePipeline の Invoke アクションのページ（action-reference-Invoke）は 404 のまま。S13 の Lambda の呼び出しで代えた。
- skills: 「Measuring application health based on application exit codes」（終了コードで健全さを測る）。取れた公式ページに exit code の記述が無かった。S8 は「フェーズの中のコマンドが失敗するとフェーズが失敗する」までで、終了コードには触れていない（K-0002 の C3 の指摘で記録）。
