## S1 What is AWS X-Ray? — What is AWS X-Ray?
url: https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html#aws-xray
fetched: 2026-11-27
> AWS X-Ray is a service that collects data about requests that your application serves, and provides tools that you can use to view, filter, and gain insights into that data to identify issues and opportunities for optimization.
> X-Ray uses trace data from the AWS resources that power your cloud applications to generate a detailed trace map.

## S2 Debugging CloudWatch synthetics canaries using X-Ray — Determine the root cause of ongoing failures in upstream and downstream services
url: https://docs.aws.amazon.com/xray/latest/devguide/xray-services-cloudwatch-synthetics.html#xray-services-cloudwatch-synthetics-workflows-root-cause
fetched: 2026-11-27
> CloudWatch Synthetics is a fully managed service that enables you to monitor your endpoints and APIs using scripted canaries that run 24 hours per day, once per minute.
> Once you receive a CloudWatch alarm for failures in a Synthetics canary, use the statistical modeling on trace data in X-Ray to determine the probable root cause of the issue within the X-Ray Analytics console.

## S3 Troubleshooting CloudFormation — Troubleshooting guide
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/troubleshooting.html#basic-ts-guide
fetched: 2026-11-27
> For Amazon EC2 issues, view the cloud-init and cfn logs.
> You can also configure your CloudFormation template so that the logs are published to Amazon CloudWatch, which displays logs in the AWS Management Console so you don't have to connect to your Amazon EC2 instance.

## S4 What is AWS Health? — What is AWS Health?
url: https://docs.aws.amazon.com/health/latest/ug/what-is-aws-health.html#what-is-aws-health
fetched: 2026-11-27
> AWS Health provides ongoing visibility into your resource performance and the availability of your AWS services and accounts.
> The service delivers alerts and notifications triggered by changes in the health of AWS resources, so that you get near-instant event visibility and guidance to help accelerate troubleshooting.
> All AWS customers can receive AWS Health events through Amazon EventBridge at no additional cost.

## S5 AWS Systems Manager OpsCenter — AWS Systems Manager OpsCenter
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/OpsCenter.html#OpsCenter
fetched: 2026-11-27
> OpsCenter is integrated with Amazon EventBridge and Amazon CloudWatch.
> This means you can configure these services to automatically create an OpsItem in OpsCenter when a CloudWatch alarm enters the ALARM state or when EventBridge processes an event from any AWS service that publishes events.
> For the AWS resource, OpsCenter aggregates information from AWS Config, AWS CloudTrail logs, and Amazon CloudWatch Events, so you don't have to navigate across multiple console pages during your investigation.

## S6 Determine the cause of a stack failure — Determine the cause of a stack failure
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/determine-root-cause-for-stack-failures.html#determine-root-cause-for-stack-failures
fetched: 2026-11-27
> If your stack creation fails, CloudFormation can help you to determine the event that is likely the root cause for the stack failure.
> If the provided reason in Status reason isn't clear, and the root cause displays a link to the CloudTrail console, open the link to view the event to find a detailed root cause.

## S7 Troubleshooting CloudFormation — Troubleshooting guide
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/troubleshooting.html#basic-ts-guide
fetched: 2026-11-27
> Use operation IDs and failure filtering for targeted troubleshooting.
> CloudFormation assigns unique operation IDs to deployment events, making it easier to track and correlate related events.

## S8 Configuring stage retry for a failed stage or failed actions — Configuring stage retry for a failed stage or failed actions
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/stage-retry.html#stage-retry
fetched: 2026-11-27
> You can retry a stage that has failed without having to run a pipeline again from the beginning.
> Retrying a failed stage retries all actions in the stage from the first action in the stage, and retrying failed actions retries all failed actions in the stage.

## S9 Configure a stage for automatic rollback — Configure a stage for automatic rollback
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/stage-rollback-auto.html#stage-rollback-auto
fetched: 2026-11-27
> You can configure stages in a pipeline to roll back automatically on failure.
> When the stage fails, the stage is rolled back to the most recent successful execution.

## S10 AWS CodeBuild build and test action reference — AWS CodeBuild build and test action reference
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-CodeBuild.html#action-reference-CodeBuild
fetched: 2026-11-27
> Allows you to run builds and tests as part of your pipeline.
> When you run a CodeBuild build or test action, commands specified in the buildspec are run inside of a CodeBuild container.

## S11 Redeploy and roll back a deployment with CodeDeploy — Redeploy and roll back a deployment with CodeDeploy
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployments-rollback-and-redeploy.html#deployments-rollback-and-redeploy
fetched: 2026-11-27
> CodeDeploy rolls back deployments by redeploying a previously deployed revision of an application as a new deployment.
> You can configure a deployment group or deployment to automatically roll back when a deployment fails or when a monitoring threshold you specify is met.

## S12 Troubleshoot EC2/On-Premises deployment issues — Troubleshoot EC2/On-Premises deployment issues
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-deployments.html#troubleshooting-deployments
fetched: 2026-11-27
> The causes of many deployment failures can be identified by reviewing the log files created during the deployment process.
> For simplicity, we recommend using Amazon CloudWatch Logs to centrally monitor log files instead of viewing them instance by instance.

## S13 Troubleshooting CloudFormation — Update rollback failed
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/troubleshooting.html#troubleshooting-errors-update-rollback-failed
fetched: 2026-11-27
> A dependent resource can't return to its original state, causing the rollback to fail (UPDATE_ROLLBACK_FAILED state).
> Depending on the cause of the failure, you can manually fix the error and continue the rollback.

## S14 Health checks for instances in an Auto Scaling group — Health checks for instances in an Auto Scaling group
url: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-health-checks.html#ec2-auto-scaling-health-checks
fetched: 2026-11-27
> Amazon EC2 Auto Scaling continuously monitors the health status of instances in an Auto Scaling group to maintain the desired capacity.
> When Amazon EC2 Auto Scaling determines that an InService instance is unhealthy, it replaces it with a new instance to maintain the desired capacity of the group.

## S15 Troubleshoot Amazon EC2 Auto Scaling: EC2 instance launch failures — Troubleshoot Amazon EC2 Auto Scaling: EC2 instance launch failures
url: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ts-as-instancelaunchfailure.html#ts-as-instancelaunchfailure
fetched: 2026-11-27
> This page provides information about your EC2 instances that fail to launch, potential causes, and the steps you can take to resolve the issues.
> When your EC2 instances fail to launch, you might get one or more of the following error messages:

## S16 Amazon EC2 Auto Scaling lifecycle hooks — Amazon EC2 Auto Scaling lifecycle hooks
url: https://docs.aws.amazon.com/autoscaling/ec2/userguide/lifecycle-hooks.html#lifecycle-hooks
fetched: 2026-11-27
> A lifecycle hook provides a specified amount of time (one hour by default) to wait for the action to complete before the instance transitions to the next state.
> When a scale-in event occurs, a lifecycle hook pauses the instance before it is terminated and sends you a notification using Amazon EventBridge.

## S17 Viewing Amazon ECS stopped task errors — Viewing Amazon ECS stopped task errors
url: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/stopped-task-errors.html#stopped-task-errors
fetched: 2026-11-27
> If your task was created by an Amazon ECS service, the actions that Amazon ECS takes to maintain the service are published in the service events.
> Stopped tasks only appear in the console for 1 hour.

## S18 CannotPullContainer task errors in Amazon ECS — CannotPullContainer task errors in Amazon ECS
url: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_cannot_pull_image.html#task_cannot_pull_image
fetched: 2026-11-27
> The following errors indicate that the task failed to start because Amazon ECS can't retrieve the specified container image.
> This error indicates that the task can't pull the image specified in the task definition because of permission issues.

## S19 Troubleshoot problems with Amazon EKS clusters and nodes — Managed node group error codes
url: https://docs.aws.amazon.com/eks/latest/userguide/troubleshooting.html#troubleshoot-managed-node-groups
fetched: 2026-11-27
> If your managed node group encounters a hardware health issue, Amazon EKS returns an error code to help you to diagnose the issue.
> These health checks don't detect software issues because they are based on Amazon EC2 health checks.

## S20 Troubleshoot EC2/On-Premises deployment issues — Troubleshooting a failed ApplicationStop, BeforeBlockTraffic, or AfterBlockTraffic deployment lifecycle event
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-deployments.html#troubleshooting-deployments-lifecycle-event-failures
fetched: 2026-11-26
> During a deployment, the CodeDeploy agent runs the scripts specified for ApplicationStop, BeforeBlockTraffic, and AfterBlockTraffic in the AppSpec file from the previous successful deployment. (All other scripts are run from the AppSpec file in the current deployment.) If one of these scripts contains an error and does not run successfully, the deployment can fail.
> Use the CodeDeploy console to investigate why a deployment might have failed during any of these events. On the details page for the deployment, choose View events. On the details page for the instance, in the ApplicationStop, BeforeBlockTraffic, or AfterBlockTraffic row, choose View logs. Or use the AWS CLI to call the get-deployment-instance command.
> If the cause of the failure is a script from the last successful deployment that never runs successfully, create a deployment and specify that the ApplicationStop, BeforeBlockTraffic, and AfterBlockTraffic failures should be ignored.
> Use the AWS CLI to call the create-deployment command and include the --ignore-application-stop-failures option.

## S21 Redeploy and roll back a deployment with CodeDeploy — Automatic rollbacks
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployments-rollback-and-redeploy.html#deployments-rollback-and-redeploy-automatic-rollbacks
fetched: 2026-11-26
> You can configure a deployment group or deployment to automatically roll back when a deployment fails or when a monitoring threshold you specify is met. In this case, the last known good version of an application revision is deployed. You configure automatic rollbacks when you create an application or create or update a deployment group.

## S22 Troubleshooting CloudFormation — Update rollback failed
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/troubleshooting.html#troubleshooting-errors-update-rollback-failed
fetched: 2026-11-25
> A dependent resource can't return to its original state, causing the rollback to fail (UPDATE_ROLLBACK_FAILED state).
> Depending on the cause of the failure, you can manually fix the error and continue the rollback.
> By continuing the rollback, you can return your stack to a working state (the UPDATE_ROLLBACK_COMPLETE state), and then try to update the stack again.
> To continue rolling back an update, you can use the CloudFormation console or AWS command line interface (AWS CLI).
> If none of these solutions work, you can skip the resources that CloudFormation can't successfully roll back.
> CloudFormation sets the status of the skipped resources to UPDATE_COMPLETE and continues to roll back the stack.

## S23 Troubleshooting CloudFormation — Troubleshooting guide
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/troubleshooting.html#basic-ts-guide
fetched: 2026-11-25
> Use the CloudFormation console to view the status of your stack. In the console, you can view a list of stack events while your stack is being created, updated, or deleted.
> From the operation event list, find the failure event and then view the status reason for that event.
> The status reason might contain an error message from CloudFormation or from a particular service that can help you troubleshoot your problem.

## S24 Configuring stage retry for a failed stage or failed actions — Configuring stage retry for a failed stage or failed actions
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/stage-retry.html#stage-retry
fetched: 2026-11-26
> You can retry a stage that has failed without having to run a pipeline again from the beginning.
> When you retry the failed actions in a stage, all actions that are still in progress continue working, and failed actions are triggered again.
> Before a stage can be retried, it must either have all actions failed or some actions failed and some succeeded.
> Retrying a failed stage retries all actions in the stage from the first action in the stage, and retrying failed actions retries all failed actions in the stage.
> This overrides output artifacts of previously successful actions in the same execution.
> Although artifacts may be overridden, the execution history of previously successful actions is still retained.
> You can only configure automatic retry on stage failure for one retry attempt.

## S25 Configure a stage for automatic rollback — Configure a stage for automatic rollback
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/stage-rollback-auto.html#stage-rollback-auto
fetched: 2026-11-26
> When the stage fails, the stage is rolled back to the most recent successful execution.
> The pipeline can only roll back to a previous execution if the previous execution was started in the current pipeline structure version.
> Since automatic rollback configuration is part of the pipeline definition, your pipeline stage will auto-rollback only after there is a successful pipeline execution in the pipeline stage.

## S26 Troubleshooting a failed canary — Troubleshooting a failed canary
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Canaries_Troubleshoot.html#CloudWatch_Synthetics_Canaries_Troubleshoot
fetched: 2026-11-26
> If your canary fails, check the following for troubleshooting.
> Use the canary details page to find more information.
> In the Availability tab, check the SuccessPercent metric to see whether the problem is constant or intermittent.
> While still in the Availability tab, choose a failed data point to see screenshots, logs, and step reports (if available) for that failed run.
> Finally, you can compare these artifacts with the artifacts from a successful canary run to pinpoint the issue.
> If you had a recent deployment to your application, roll it back and then debug later.

## S27 Troubleshoot Amazon EC2 Auto Scaling: EC2 instance launch failures — Launch issues と Cause
url: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ts-as-instancelaunchfailure.html
fetched: 2026-11-26
> This page provides information about your EC2 instances that fail to launch, potential causes, and the steps you can take to resolve the issues.
> To retrieve an error message, see Retrieve an error message from scaling activities.
> When your EC2 instances fail to launch, you might get one or more of the following error messages:
> The requested configuration is currently not supported.
> Cause: Some options in your launch template or launch configuration might not be compatible with the instance type, or the instance configuration might not be supported in your requested AWS Region or Availability Zones.

## S28 Health checks for instances in an Auto Scaling group — 導入
url: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-health-checks.html
fetched: 2026-11-26
> All instances in an Auto Scaling group start with a Healthy status. Instances are assumed to be healthy unless Amazon EC2 Auto Scaling receives notification that they are unhealthy. It can receive notifications from various sources when an instance becomes unhealthy and must be replaced. These sources include the following: Amazon EC2, Elastic Load Balancing, VPC Lattice, Amazon EBS, Custom health checks that you define
> When Amazon EC2 Auto Scaling determines that an InService instance is unhealthy, it replaces it with a new instance to maintain the desired capacity of the group. The new instance launches using the current settings of the Auto Scaling group and its associated launch template or launch configuration.
> If the launch succeeds, the instance gets added to the Auto Scaling group. Then, Amazon EC2 Auto Scaling performs health checks on the instance by using the built-in Amazon EC2 status checks, and after a grace period, any optional health checks that you enabled for the group. These health checks continue periodically. If any of the health checks fail, the instance is replaced.
> Unhealthy instances can also occur when an instance terminates unexpectedly, such as from a Spot Instance interruption or manual termination by a user.

## S29 Amazon EC2 Auto Scaling lifecycle hooks — 導入と制限
url: https://docs.aws.amazon.com/autoscaling/ec2/userguide/lifecycle-hooks.html
fetched: 2026-11-26
> A lifecycle hook provides a specified amount of time (one hour by default) to wait for the action to complete before the instance transitions to the next state.
> By default, termination lifecycle hooks operate on a best-effort basis. If a termination lifecycle hook times out, or is abandoned, Amazon EC2 Auto Scaling proceeds with terminating the instance immediately.
> The result of the lifecycle hook can be either abandon or continue. If an instance is launching, continue indicates that your actions were successful, and that Amazon EC2 Auto Scaling can put the instance into service. Otherwise, abandon indicates that your custom actions were unsuccessful, and that we can terminate and replace the instance.
> Amazon EC2 Auto Scaling limits the rate at which it allows instances to launch if the lifecycle hooks are failing consistently, so make sure to test and fix any permanent errors in your lifecycle actions.

## S30 Viewing Amazon ECS stopped task errors — 導入と手順
url: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/stopped-task-errors.html
fetched: 2026-11-26
> If you have trouble starting a task, your task might be stopping because of application or configuration errors. For example, you run the task and the task displays a PENDING status and then disappears.
> If your task was created by an Amazon ECS service, the actions that Amazon ECS takes to maintain the service are published in the service events.
> Amazon ECS stopping and replaces a task because the containers in the task have stopped running, or have failed too many health checks from Elastic Load Balancing.
> Stopped tasks only appear in the console for 1 hour.
> stopCode - The stop code indicates why a task was stopped, for example ResourceInitializationError
> StoppedReason - The reason the task stopped.
> reason (in the containers structure) - The reason provide additional details about the stopped container.

## S31 CannotPullContainer task errors in Amazon ECS — Errors と権限の案内
url: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_cannot_pull_image.html
fetched: 2026-11-26
> The following errors indicate that the task failed to start because Amazon ECS can't retrieve the specified container image.
> The task can’t pull the image. Check that the role has the permissions to pull images from the registry.
> This error indicates that the task can't pull the image specified in the task definition because of permission issues.
> Verify that the role-arn has the correct permissions to pull the image.
> For tasks with the Fargate, this is the task execution role.
> For tasks with EC2, this is the container instance role.
> This error indicates that the task can't connect to Amazon ECR. Check the connection to the repository URI repository.

## S32 Troubleshoot problems with Amazon EKS clusters and nodes — Insufficient capacity と Nodes fail to join cluster
url: https://docs.aws.amazon.com/eks/latest/userguide/troubleshooting.html#ice
fetched: 2026-11-26
> If you receive the following error while attempting to create an Amazon EKS cluster, then one of the Availability Zones you specified doesn’t have sufficient capacity to support a cluster.
> Retry creating your cluster with subnets in your cluster VPC that are hosted in the Availability Zones returned by this error message.
> There are Availability Zones that a cluster can’t reside in. Compare the Availability Zones that your subnets are in with the list of Availability Zones in the Subnet requirements and considerations.
> There are a few common reasons that prevent nodes from joining the cluster:
> The ClusterName in your node AWS CloudFormation template doesn’t exactly match the name of the cluster you want your nodes to join. Passing an incorrect value to this field results in an incorrect configuration of the node’s /var/lib/kubelet/kubeconfig file, and the nodes will not join the cluster.
> The node is not tagged as being owned by the cluster. Your nodes must have the following tag applied to them, where my-cluster is replaced with the name of your cluster.
> The nodes may not be able to access the cluster using a public IP address. Ensure that nodes deployed in public subnets are assigned a public IP address.

### 覆えなかった行

なし。knowledge の 3 行（メトリクスとログ・サービスの健全性・根本原因分析）と skills の 2 行（失敗したデプロイ・失敗したプロセス）は、どれも出典を置いた。サービス廃止などの告知（S0）は見つからなかった。
