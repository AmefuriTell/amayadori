## S1 Troubleshoot EC2/On-Premises deployment issues — Troubleshooting a failed ApplicationStop, BeforeBlockTraffic, or AfterBlockTraffic deployment lifecycle event
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-deployments.html#troubleshooting-deployments-lifecycle-event-failures
fetched: 2026-11-26
> During a deployment, the CodeDeploy agent runs the scripts specified for ApplicationStop, BeforeBlockTraffic, and AfterBlockTraffic in the AppSpec file from the previous successful deployment. (All other scripts are run from the AppSpec file in the current deployment.) If one of these scripts contains an error and does not run successfully, the deployment can fail.
> Use the CodeDeploy console to investigate why a deployment might have failed during any of these events. On the details page for the deployment, choose View events. On the details page for the instance, in the ApplicationStop, BeforeBlockTraffic, or AfterBlockTraffic row, choose View logs. Or use the AWS CLI to call the get-deployment-instance command.
> If the cause of the failure is a script from the last successful deployment that never runs successfully, create a deployment and specify that the ApplicationStop, BeforeBlockTraffic, and AfterBlockTraffic failures should be ignored.
> Use the AWS CLI to call the create-deployment command and include the --ignore-application-stop-failures option.

## S2 Redeploy and roll back a deployment with CodeDeploy — Automatic rollbacks
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployments-rollback-and-redeploy.html#deployments-rollback-and-redeploy-automatic-rollbacks
fetched: 2026-11-26
> You can configure a deployment group or deployment to automatically roll back when a deployment fails or when a monitoring threshold you specify is met. In this case, the last known good version of an application revision is deployed. You configure automatic rollbacks when you create an application or create or update a deployment group.

## S3 Troubleshooting CloudFormation — Update rollback failed
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/troubleshooting.html#troubleshooting-errors-update-rollback-failed
fetched: 2026-11-25
> A dependent resource can't return to its original state, causing the rollback to fail (UPDATE_ROLLBACK_FAILED state).
> Depending on the cause of the failure, you can manually fix the error and continue the rollback.
> By continuing the rollback, you can return your stack to a working state (the UPDATE_ROLLBACK_COMPLETE state), and then try to update the stack again.
> To continue rolling back an update, you can use the CloudFormation console or AWS command line interface (AWS CLI).
> If none of these solutions work, you can skip the resources that CloudFormation can't successfully roll back.
> CloudFormation sets the status of the skipped resources to UPDATE_COMPLETE and continues to roll back the stack.

## S4 Troubleshooting CloudFormation — Troubleshooting guide
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/troubleshooting.html#basic-ts-guide
fetched: 2026-11-25
> Use the CloudFormation console to view the status of your stack. In the console, you can view a list of stack events while your stack is being created, updated, or deleted.
> From the operation event list, find the failure event and then view the status reason for that event.
> The status reason might contain an error message from CloudFormation or from a particular service that can help you troubleshoot your problem.

## S5 Configuring stage retry for a failed stage or failed actions — Configuring stage retry for a failed stage or failed actions
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/stage-retry.html#stage-retry
fetched: 2026-11-26
> You can retry a stage that has failed without having to run a pipeline again from the beginning.
> When you retry the failed actions in a stage, all actions that are still in progress continue working, and failed actions are triggered again.
> Before a stage can be retried, it must either have all actions failed or some actions failed and some succeeded.
> Retrying a failed stage retries all actions in the stage from the first action in the stage, and retrying failed actions retries all failed actions in the stage.
> This overrides output artifacts of previously successful actions in the same execution.
> Although artifacts may be overridden, the execution history of previously successful actions is still retained.
> You can only configure automatic retry on stage failure for one retry attempt.

## S6 Configure a stage for automatic rollback — Configure a stage for automatic rollback
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/stage-rollback-auto.html#stage-rollback-auto
fetched: 2026-11-26
> When the stage fails, the stage is rolled back to the most recent successful execution.
> The pipeline can only roll back to a previous execution if the previous execution was started in the current pipeline structure version.
> Since automatic rollback configuration is part of the pipeline definition, your pipeline stage will auto-rollback only after there is a successful pipeline execution in the pipeline stage.

## S7 Troubleshooting a failed canary — Troubleshooting a failed canary
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Canaries_Troubleshoot.html#CloudWatch_Synthetics_Canaries_Troubleshoot
fetched: 2026-11-26
> If your canary fails, check the following for troubleshooting.
> Use the canary details page to find more information.
> In the Availability tab, check the SuccessPercent metric to see whether the problem is constant or intermittent.
> While still in the Availability tab, choose a failed data point to see screenshots, logs, and step reports (if available) for that failed run.
> Finally, you can compare these artifacts with the artifacts from a successful canary run to pinpoint the issue.
> If you had a recent deployment to your application, roll it back and then debug later.
