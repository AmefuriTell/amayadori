## S1 Troubleshoot EC2/On-Premises deployment issues — Troubleshooting a failed ApplicationStop, BeforeBlockTraffic, or AfterBlockTraffic deployment lifecycle event
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-deployments.html#troubleshooting-deployments-lifecycle-event-failures
fetched: 2026-11-26
> During a deployment, the CodeDeploy agent runs the scripts specified for ApplicationStop,
> BeforeBlockTraffic, and AfterBlockTraffic in the AppSpec file from the previous successful
> deployment. (All other scripts are run from the AppSpec file in the current deployment.) If
> one of these scripts contains an error and does not run successfully, the deployment can
> fail.
> Use the CodeDeploy console to investigate why a deployment might have failed during any of
> these events. On the details page for the deployment, choose View
> events. On the details page for the instance, in the
> ApplicationStop, BeforeBlockTraffic, or
> AfterBlockTraffic row, choose View logs. Or use
> the AWS CLI to call the get-deployment-instance command.

## S2 Troubleshoot EC2/On-Premises deployment issues — Troubleshooting a failed ApplicationStop, BeforeBlockTraffic, or AfterBlockTraffic deployment lifecycle event
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-deployments.html#troubleshooting-deployments-lifecycle-event-failures
fetched: 2026-11-26
> If the cause of the failure is a script from the last successful deployment that never
> runs successfully, create a deployment and specify that the ApplicationStop,
> BeforeBlockTraffic, and AfterBlockTraffic failures should be ignored. There are two ways to
> do this:
> Use the CodeDeploy console to create a deployment. On the Create
> deployment page, under ApplicationStop lifecycle event
> failure, choose Don't fail the deployment to an instance if this
> lifecycle event on the instance fails.
> Use the AWS CLI to call the create-deployment
> command and include the --ignore-application-stop-failures option.
> When you deploy the application revision again, the deployment continues even if any of
> these three lifecycle events fail. If the new revision includes fixed scripts for those
> lifecycle events, future deployments can succeed without applying this fix.

## S3 Troubleshoot EC2/On-Premises deployment issues — Troubleshooting a failed AllowTraffic lifecycle event with no error reported in the deployment logs
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-deployments.html#troubleshooting-deployments-allowtraffic-no-logs
fetched: 2026-11-26
> In some cases, a blue/green deployment fails during the AllowTraffic lifecycle event,
> but the deployment logs do not indicate the cause for the failure.
> This failure is typically due to incorrectly configured health checks in Elastic Load Balancing for the
> Classic Load Balancer, Application Load Balancer, or Network Load Balancer used to manage traffic for the deployment group.
> To resolve the issue, review and correct any errors in the health check configuration
> for the load balancer.

## S4 Troubleshoot EC2/On-Premises deployment issues — Troubleshooting all lifecycle events skipped errors
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-deployments.html#troubleshooting-skipped-lifecycle-events
fetched: 2026-11-26
> If all lifecycle events of an EC2 or on-premises deployment are skipped, you
> might receive an error similar to The overall deployment failed because too many
> individual instances failed deployment, too few healthy instances are available for
> deployment, or some instances in your deployment group are experiencing problems. (Error
> code: HEALTH_CONSTRAINTS). Here are some possible causes and solutions:
> The CodeDeploy agent might not be installed or running on the instance.
> The CodeDeploy agent might stop running because an instance is running low on memory or
> hard disk space.
> The service role for CodeDeploy might not have required permissions.

## S5 Troubleshoot Amazon EC2 Auto Scaling issues — EC2 instances in an Amazon EC2 Auto Scaling group fail to launch and receive the error "Heartbeat Timeout"
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-auto-scaling.html#troubleshooting-auto-scaling-heartbeat
fetched: 2026-11-26
> An Amazon EC2 Auto Scaling group might fail to launch new EC2 instances, generating a message
> similar to the following:
> Launching a new EC2 instance
> <instance-Id>. Status Reason: Instance failed to
> complete user's Lifecycle Action: Lifecycle Action with
> token<token-Id> was abandoned: Heartbeat
> Timeout.
> This message usually indicates one of the following:
> The maximum number of concurrent deployments associated with an AWS account was
> reached.
> The Auto Scaling group tried to launch too many EC2 instances too quickly. The API
> calls to RecordLifecycleActionHeartbeat or CompleteLifecycleAction for each new instance were throttled.
> An application in CodeDeploy was deleted before its associated deployment groups were
> updated or deleted.

## S6 Troubleshoot Amazon EC2 Auto Scaling issues — Instances in an Amazon EC2 Auto Scaling group are continuously provisioned and terminated before a revision can be deployed
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-auto-scaling.html#troubleshooting-auto-scaling-provision-termination-loop
fetched: 2026-11-26
> In some cases, an error can prevent a successful deployment to newly provisioned
> instances in an Amazon EC2 Auto Scaling group. The results are no healthy instances and no successful
> deployments. Because the deployment can't run or be completed successfully, the instances
> are terminated soon after being created. The Amazon EC2 Auto Scaling group configuration then causes
> another batch of instances to be provisioned to try to meet the minimum healthy hosts
> requirement. This batch is also terminated, and the cycle continues.
> Possible causes include:
> Failed Amazon EC2 Auto Scaling group health checks.
> An error in the application revision.

## S7 Troubleshoot Amazon EC2 Auto Scaling issues — Terminating or rebooting an Amazon EC2 Auto Scaling instance might cause deployments to fail
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-auto-scaling.html#troubleshooting-auto-scaling-reboot
fetched: 2026-11-26
> If an EC2 instance is launched through Amazon EC2 Auto Scaling, and the instance is then
> terminated or rebooted, deployments to that instance might fail for the following
> reasons:
> During an in-progress deployment, a scale-in event or any other termination event
> causes the instance to detach from the Amazon EC2 Auto Scaling group and then terminate. Because the
> deployment cannot be completed, it fails.
> The instance is rebooted, but it takes more than five minutes for the instance to
> start. CodeDeploy treats this as a timeout. The service fails all current and future
> deployments to the instance.

## S8 Troubleshoot Amazon EC2 Auto Scaling issues — Mismatched Amazon EC2 Auto Scaling lifecycle hooks might cause automatic deployments to Amazon EC2 Auto Scaling groups to stop or fail
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-auto-scaling.html#troubleshooting-auto-scaling-hooks
fetched: 2026-11-26
> Amazon EC2 Auto Scaling and CodeDeploy use lifecycle hooks to determine which application revisions should
> be deployed to which EC2 instances after they are launched in Amazon EC2 Auto Scaling groups.
> Automatic deployments can stop or fail if lifecycle hooks and information about these hooks
> do not match exactly in Amazon EC2 Auto Scaling and CodeDeploy.
> If deployments to an Amazon EC2 Auto Scaling group are failing, see if the lifecycle hook names in
> Amazon EC2 Auto Scaling and CodeDeploy match. If not, use these AWS CLI command calls.

## S9 Troubleshoot Amazon EC2 Auto Scaling issues — "The deployment failed because no instances were found for your deployment group" error
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-auto-scaling.html#troubleshooting-deployment-failed-because-no-instances-found
fetched: 2026-11-26
> Read this section if you see the following CodeDeploy error:
> The deployment failed because no instances were found for your deployment group.
> Check your deployment group settings to make sure the tags for your EC2 instances
> or Auto Scaling groups correctly identify the instances you want to deploy to, and then try
> again.
> Your deployment group settings include tags for EC2 instances, on-premises
> instances, or Auto Scaling groups that are not correct. To fix this problem, check that your
> tags are correct, and then redeploy your application.

## S10 Troubleshooting CloudFormation — Update rollback failed
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/troubleshooting.html#troubleshooting-errors-update-rollback-failed
fetched: 2026-11-26
> A dependent resource can't return to its original state, causing the rollback to
> fail (UPDATE_ROLLBACK_FAILED state). For example, you might have a
> stack that's rolling back to an old database instance that was deleted outside of
> CloudFormation. Because CloudFormation doesn't know the database was deleted, it assumes
> that the database instance still exists and attempts to roll back to it, causing the
> update rollback to fail.
> Depending on the cause of the failure, you can manually fix the error and continue
> the rollback. By continuing the rollback, you can return your stack to a working
> state (the UPDATE_ROLLBACK_COMPLETE state), and then try to update the
> stack again.
> Failed to receive the required number of signals
> Use the signal-resource command to manually send the
> required number of successful signals to the resource that's
> waiting for them, and then continue rolling back the update.
> Insufficient permissions
> Check that you have sufficient IAM permissions to modify
> resources, and then continue the update rollback.
> To continue rolling back an update, you can use the CloudFormation console or AWS
> command line interface (AWS CLI). For more information, see Continue rolling back an update.
> If none of these solutions work, you can skip the resources that CloudFormation can't
> successfully roll back. You can skip them in one of the following ways:
> Force the rollback to complete. CloudFormation skips each resource that
> fails to roll back, including resources in nested stacks.
> Skip a specific set of resources.
> CloudFormation sets the status of the skipped resources to UPDATE_COMPLETE
> and continues to roll back the stack. After the rollback is complete, the state of
> the skipped resources will be inconsistent with the state of the resources in the
> stack template.

## S11 Troubleshooting CloudFormation — Delete stack fails
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/troubleshooting.html#troubleshooting-errors-delete-stack-fails
fetched: 2026-11-26
> Some resources must be empty before they can be deleted. For example, you
> must delete all objects in an Amazon S3 bucket or remove all instances in an
> Amazon EC2 security group before you can delete the bucket or security
> group.
> When stacks are in the DELETE_FAILED state because CloudFormation
> couldn't delete a resource, rerun the deletion with the
> RetainResources parameter and specify the resource that
> CloudFormation can't delete. CloudFormation deletes the stack without deleting the
> retained resource.
> Alternatively, you may consider using the FORCE_DELETE_STACK
> option with the DeletionMode parameter.
> You can't delete stacks that have termination protection enabled. If you
> attempt to delete a stack with termination protection enabled, the deletion
> fails and the stack--including its status--remains unchanged. Disable
> termination protection on the stack, then perform the delete operation
> again.

## S12 Troubleshooting CodePipeline — EC2 Deploy action fails with an error message No such file
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/troubleshooting.html#troubleshooting-ec2-deploy
fetched: 2026-11-26
> Description: After the EC2 deploy action unzips the
> artifacts in the target directory on the instances, the action runs the script. If the script
> is in the target directory but the action is unable to run the script, the action fails on
> that instance, and the remaining instances fail deployment.

## S13 Troubleshooting CodePipeline — Pipeline error: A Jenkins build or test action runs for a long time and then fails due to lack of credentials or permissions
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/troubleshooting.html#troubleshooting-jen1
fetched: 2026-11-26
> Problem: If the Jenkins server is installed on an Amazon EC2
> instance, the instance might not have been created with an instance role that has the
> permissions required for CodePipeline.
> Possible fixes: Make sure that Amazon EC2 instance role or
> IAM user is configured with the AWSCodePipelineCustomActionAccess managed
> policy or with the equivalent permissions.

## S14 Troubleshooting CodePipeline — Pipeline error: A deployment with the CodeDeployToECS action returns an error message "Exception while trying to read the task definition artifact file from: <source artifact name>"
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/troubleshooting.html#troubleshooting-ecstocodedeploy-size
fetched: 2026-11-26
> The task definition file is a required artifact for the CodePipeline deploy action to Amazon ECS
> through CodeDeploy (the CodeDeployToECS action). The maximum artifact ZIP size in the
> CodeDeployToECS deploy action is 3 MB. The following error message is returned
> when the file is not found or the artifact size exceeds 3 MB:
> Exception while trying to read the task definition artifact file from: <source
> artifact name>
> Possible fixes: Make sure the task definition file is
> included as an artifact. If the file already exists, make sure the compressed size is less
> than 3 MB.
