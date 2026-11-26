## S1 What is AWS CodeBuild? — AWS CodeBuild
url: https://docs.aws.amazon.com/codebuild/latest/userguide/welcome.html#welcome
fetched: 2026-11-26
> AWS CodeBuild is a fully managed build service in the cloud. CodeBuild compiles your source code, runs unit tests, and produces artifacts that are ready to deploy. CodeBuild eliminates the need to provision, manage, and scale your own build servers. It provides prepackaged build environments for popular programming languages and build tools such as Apache Maven, Gradle, and more. You can also customize build environments in CodeBuild to use your own build tools. CodeBuild scales automatically to meet peak build requests.

## S2 How to run CodeBuild — AWS CodeBuild
url: https://docs.aws.amazon.com/codebuild/latest/userguide/welcome.html#welcome-quick-look
fetched: 2026-11-26
> You can use the AWS CodeBuild or AWS CodePipeline console to run CodeBuild. You can also automate the running of CodeBuild by using the AWS Command Line Interface (AWS CLI) or the AWS SDKs. As the following diagram shows, you can add CodeBuild as a build or test action to the build or test stage of a pipeline in AWS CodePipeline.

## S3 Test reports in AWS CodeBuild — AWS CodeBuild
url: https://docs.aws.amazon.com/codebuild/latest/userguide/test-reporting.html#test-reporting
fetched: 2026-11-26
> You can create reports in CodeBuild that contain details about tests that are run during builds. You can create tests such as unit tests, configuration tests, and functional tests. To create a test report, you add a report group name to the buildspec file of a build project with information about your test cases. When you run the build project, the test cases are run and a test report is created. A new test report is created in the report group each time the test cases run.

## S4 What Is Amazon EventBridge? — Amazon EventBridge
url: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html#eb-what-is
fetched: 2026-11-26
> Amazon EventBridge is a serverless service that uses events to connect application components together, making it easier for you to build scalable event-driven applications. Event-driven architecture is a style of building loosely-coupled software systems that work together by emitting and responding to events. EventBridge provides simple and consistent ways to ingest, filter, transform, and deliver events so you can build applications quickly.

## S5 Amazon EventBridge event bus (default and Classic) — Amazon EventBridge
url: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-event-bus.html#eb-event-bus
fetched: 2026-11-26
> A Classic event bus is a router that receives events and delivers them to zero or more destinations, or targets. Classic event buses are well-suited for routing events from many sources to many targets, with optional transformation of events prior to delivery to a target. Rules associated with the event bus evaluate events as they arrive. Each rule checks whether an event matches the rule's pattern.

## S6 How event buses work in EventBridge — Amazon EventBridge
url: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-event-bus.html#eb-what-is-how-it-works
fetched: 2026-11-26
> An event source, which can be an AWS service, your own custom application, or a SaaS provider, sends an event to an event bus. EventBridge then evaluates the event against each rule defined for that event bus. For each event that matches a rule, EventBridge then sends the event to the targets specified for that rule. Optionally, as part of the rule, you can also specify how EventBridge should transform the event prior to sending it to the target(s). An event might match multiple rules, and each rule can specify up to five targets.

## S7 What is Amazon CloudWatch Logs? — Amazon CloudWatch Logs
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/WhatIsCloudWatchLogs.html#WhatIsCloudWatchLogs
fetched: 2026-11-26
> You can use Amazon CloudWatch Logs to monitor, store, and access your log files from Amazon Elastic Compute Cloud (Amazon EC2) instances, AWS CloudTrail, Route 53, and other sources. CloudWatch Logs enables you to centralize the logs from all of your systems, applications, and AWS services that you use, in a single, highly scalable service. CloudWatch Logs also supports querying your logs with a powerful query language, auditing and masking sensitive data in logs, and generating metrics from logs using filters or an embedded log format.

## S8 Features of Amazon CloudWatch Logs (Log retention) — Amazon CloudWatch Logs
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/WhatIsCloudWatchLogs.html#cloudwatch-logs-features
fetched: 2026-11-26
> Log retention – By default, logs are kept indefinitely and never expire. You can adjust the retention policy for each log group, keeping the indefinite retention, or choosing a retention period between 10 years and one day. You can also use account-level retention policies to set the retention period for all log groups in the account, or for log groups whose names start with a prefix that you specify.

## S9 Features of Amazon CloudWatch Logs (Monitor logs from Amazon EC2 instances) — Amazon CloudWatch Logs
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/WhatIsCloudWatchLogs.html#cloudwatch-logs-features
fetched: 2026-11-26
> For example, CloudWatch Logs can track the number of errors that occur in your application logs and send you a notification whenever the rate of errors exceeds a threshold you specify. When the term you are searching for is found, CloudWatch Logs reports the data to a CloudWatch metric that you specify.

## S10 What is Amazon EC2 Auto Scaling? — Amazon EC2 Auto Scaling
url: https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html#what-is-amazon-ec2-auto-scaling
fetched: 2026-11-26
> Amazon EC2 Auto Scaling helps you ensure that you have the correct number of Amazon EC2 instances available to handle the load for your application. You create collections of EC2 instances, called Auto Scaling groups. You can specify the minimum number of instances in each Auto Scaling group, and Amazon EC2 Auto Scaling ensures that your group never goes below this size. You can specify the maximum number of instances in each Auto Scaling group, and Amazon EC2 Auto Scaling ensures that your group never goes above this size. If you specify scaling policies, then Amazon EC2 Auto Scaling can launch or terminate instances as demand on your application increases or decreases.

## S11 Features of Amazon EC2 Auto Scaling (Monitoring the health of running instances, Custom health checks) — Amazon EC2 Auto Scaling
url: https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html#ec2-auto-scaling-features
fetched: 2026-11-26
> Amazon EC2 Auto Scaling automatically monitors the health and availability of your instances using EC2 health checks and replaces terminated or impaired instances to maintain your desired capacity. In addition to the built-in health checks, you can define custom health checks that are specific to your application to verify that it's responding as expected. If an instance fails your custom health check, it's automatically replaced to maintain your desired capacity.

## S12 Features of Amazon EC2 Auto Scaling (Lifecycle hooks, Instance refresh) — Amazon EC2 Auto Scaling
url: https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html#ec2-auto-scaling-features
fetched: 2026-11-26
> The instance refresh feature provides a mechanism to update instances in a rolling fashion when you update your AMI or launch template. Lifecycle hooks are useful for defining custom actions that are invoked as new instances launch or before instances are terminated. This feature is particularly useful for building event-driven architectures, but it also helps you manage instances through their lifecycle.

## S13 What is AWS CodePipeline? — AWS CodePipeline
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/welcome.html#welcome
fetched: 2026-11-26
> AWS CodePipeline is a continuous delivery service you can use to model, visualize, and automate the steps required to release your software. You can quickly model and configure the different stages of a software release process. CodePipeline automates the steps required to release your software changes continuously.

## S14 CodePipeline concepts (Stages, Actions) — AWS CodePipeline
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/concepts.html#concepts-stages
fetched: 2026-11-26
> A stage is a logical unit you can use to isolate an environment and to limit the number of concurrent changes in that environment. Each stage contains actions that are performed on the application artifacts. Your source code is an example of an artifact. Valid CodePipeline action types are source, build, test, deploy, approval, and invoke. Actions can run in series or in parallel.
