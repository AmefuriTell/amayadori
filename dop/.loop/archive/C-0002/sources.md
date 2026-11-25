# C-0002 sources

## S1 What are connections? - Developer Tools console — What are connections?
url: https://docs.aws.amazon.com/dtconsole/latest/userguide/welcome-connections.html#welcome-connections
fetched: 2026-11-25
> You can use the connections feature in the Developer Tools console to connect AWS resources such as AWS CodePipeline to external code repositories.
> Each connection is a resource that you can give to AWS services to connect to a third-party repository, such as Bitbucket.
> The service name AWS CodeStar Connections has been renamed.
> Resources created with the previous namespace codestar-connections will still be supported.

## S2 Connections concepts - Developer Tools console — Connections concepts
url: https://docs.aws.amazon.com/dtconsole/latest/userguide/concepts-connections.html#concepts-connections
fetched: 2026-11-25
> connection An AWS resource used to connect third-party source repositories to other AWS services.
> Setting up and using the connections feature is easier if you understand the concepts and terms.

## S3 GitHub connections - AWS CodePipeline — Create a connection to GitHub (CLI)
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/connections-github.html#connections-github-cli
fetched: 2026-11-25
> A connection created through the AWS CLI or AWS CloudFormation is in PENDING status by default.
> After you create a connection with the CLI or CloudFormation, use the console to edit the connection to make its status AVAILABLE.
> The pipeline defaults to detect changes on code push to the connection source repository.

## S4 CodeStarSourceConnection for Bitbucket Cloud, GitHub, GitHub Enterprise Server, GitLab.com, and GitLab self-managed actions — Output artifacts
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-CodestarConnectionSource.html#action-reference-CodestarConnectionSource-output
fetched: 2026-11-25
> Default: Like other existing CodePipeline source actions, CodeStarSourceConnection can output a ZIP file with a shallow copy of your commit.
> Full clone: CodeStarSourceConnection can also be configured to output a URL reference to the repo for subsequent actions.
> Currently, the Git URL reference can only be used by downstream CodeBuild actions to clone the repo and associated Git metadata.
> A ZIP file that contains the contents of the configured repository and branch at the commit specified as the source revision for the pipeline execution.
> A JSON file that contains a URL reference to the repository so that downstream actions can perform Git commands directly.
> This option can only be used by CodeBuild downstream actions.

## S5 Tutorial: Use Git tags to start your pipeline - AWS CodePipeline — Step 2: Create a pipeline to trigger on Git tags
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/tutorials-github-tags.html#tutorials-github-tags-pipeline
fetched: 2026-11-25
> When a Git tag is created on a commit, your pipeline starts.
> This example shows you how to create a pipeline that allows filtering for tags based on the syntax of the tag name.
> Under Webhook events, in Filter type, choose Tags.
> In the Tags or patterns field, enter release*.
> Pipelines that start with a trigger type of Git tags will be configured for WebhookV2 events and will not use the Webhook event (change detection on all push events) to start the pipeline.
