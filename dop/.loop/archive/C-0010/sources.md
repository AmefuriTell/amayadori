## S1 Invoke an AWS Lambda function in a pipeline in CodePipeline — Invoke an AWS Lambda function in a pipeline in CodePipeline
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-invoke-lambda-function.html#actions-invoke-lambda-function
fetched: 2026-11-26
> AWS Lambda is a compute service that lets you run code without provisioning or managing servers.
> You can create Lambda functions and add them as actions in your pipelines.
> Do not log the JSON event that CodePipeline sends to Lambda because this can result in user credentials being logged in CloudWatch Logs.
> The CodePipeline role uses a JSON event to pass temporary credentials to Lambda in the artifactCredentials field.
> When using cross-region Lambda invoke action in CodePipeline, the status of the Lambda execution using the PutJobSuccessResult and PutJobFailureResult should be sent to the AWS Region where the Lambda function is present and not to the Region where CodePipeline exists.
> Using a continuation token to monitor a long-running asynchronous process (continue_job_later).
> This allows the action to continue and the function to succeed even if it exceeds a fifteen-minute runtime (a limit in Lambda).

## S2 Invoke an AWS Lambda function in a pipeline in CodePipeline — Step 2: Create the Lambda function
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-invoke-lambda-function.html#actions-invoke-lambda-function-create-function
fetched: 2026-11-26
> In this step, you create a Lambda function that makes an HTTP request and checks for a line of text on a webpage.
> As part of this step, you must also create an IAM policy and Lambda execution role.

## S3 Invoke an AWS Lambda function in a pipeline in CodePipeline — Lambda function returning success or failure results
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-invoke-lambda-function.html#actions-invoke-lambda-function
fetched: 2026-11-26
> Returning success or failure results to CodePipeline in the Details link for the action.

## S4 AWS Step Functions invoke action reference — Configuration parameters
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-StepFunctions.html#action-reference-StepFunctions-config
fetched: 2026-11-26
> Starts an AWS Step Functions state machine execution from your pipeline.
> Provides an initial state to the state machine through either a property in the action configuration or a file located in a pipeline artifact to be passed as input.
> Supports Standard and Express state machines.
> If provided, the Input field is used directly as the input for the state machine execution.
> Otherwise, the state machine is invoked with an empty JSON object {}.

## S5 AWS Step Functions invoke action reference — Output artifacts and output variables
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-StepFunctions.html#action-reference-StepFunctions-output
fetched: 2026-11-26
> This is obtained from the output property of the Step Functions DescribeExecution API response after the state machine execution completes successfully.
> This action produces output variables that can be referenced by the action configuration of a downstream action in the pipeline.

## S6 Add a manual approval action to a stage — Add a manual approval action to a stage
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/approvals.html#approvals
fetched: 2026-11-26
> In AWS CodePipeline, you can add an approval action to a stage in a pipeline at the point where you want the pipeline execution to stop so that someone with the required AWS Identity and Access Management permissions can approve or reject the action.
> If the action is approved, the pipeline execution resumes.
> If the action is rejected—or if no one approves or rejects the action within seven days of the pipeline reaching the action and stopping—the result is the same as an action failing, and the pipeline execution does not continue.
> You want someone to perform a code review or change management review before a revision is allowed into the next stage of a pipeline.
> You want someone to perform manual quality assurance testing on the latest version of an application, or to confirm the integrity of a build artifact, before it is released.

## S7 Add a manual approval action to a stage — Setup and workflow overview for approval actions in CodePipeline
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/approvals.html#approvals-overview
fetched: 2026-11-26
> You grant the IAM permissions required for approving or rejecting approval actions to one or more IAM roles in your organization.

## S8 AWS Device Farm test action reference — AWS Device Farm test action reference
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-DeviceFarm.html#action-reference-DeviceFarm
fetched: 2026-11-26
> In your pipeline, you can configure a test action that uses AWS Device Farm to run and test your application on devices.
> Device Farm uses test pools of devices and testing frameworks to test applications on specific devices.
