## S1 Amazon EC2 Auto Scaling lifecycle hooks — Amazon EC2 Auto Scaling lifecycle hooks
url: https://docs.aws.amazon.com/autoscaling/ec2/userguide/lifecycle-hooks.html#lifecycle-hooks
fetched: 2026-11-26
> Amazon EC2 Auto Scaling offers the ability to add lifecycle hooks to your Auto Scaling groups. These hooks let you create solutions that are aware of events in the Auto Scaling instance lifecycle, and then perform a custom action on instances when the corresponding lifecycle event occurs. A lifecycle hook provides a specified amount of time (one hour by default) to wait for the action to complete before the instance transitions to the next state.
> When a scale-in event occurs, a lifecycle hook pauses the instance before it is terminated and sends you a notification using Amazon EventBridge. While the instance is in the wait state, you can invoke an AWS Lambda function or connect to the instance to download logs or other data before the instance is fully terminated.

## S2 How lifecycle hooks work in Auto Scaling groups — Wait state and heartbeat
url: https://docs.aws.amazon.com/autoscaling/ec2/userguide/lifecycle-hooks-overview.html#lifecycle-hooks-overview
fetched: 2026-11-26
> The lifecycle hook puts the instance into a wait state (Pending:Wait) and then performs a custom action. The instance remains in a wait state until you either complete the lifecycle action, or the timeout period ends. By default, the instance remains in a wait state for one hour, and then the Auto Scaling group continues the launch process (Pending:Proceed). If you need more time, you can restart the timeout period by recording a heartbeat.
> The lifecycle hook puts the instance into a wait state (Terminating:Wait) and then performs a custom action.
> The instance remains in a wait state either until you complete the lifecycle action, or until the timeout period ends (one hour by default). After you complete the lifecycle hook or the timeout period expires, the instance transitions to the next state (Terminating:Proceed).

## S3 Considerations and limitations for lifecycle hooks — Termination, timeouts, and EventBridge
url: https://docs.aws.amazon.com/autoscaling/ec2/userguide/lifecycle-hooks.html#lifecycle-hook-considerations
fetched: 2026-11-26
> By default, termination lifecycle hooks operate on a best-effort basis. If a termination lifecycle hook times out, or is abandoned, Amazon EC2 Auto Scaling proceeds with terminating the instance immediately.
> Instances can remain in a wait state for a finite period of time. The default timeout for a lifecycle hook is one hour (heartbeat timeout). There is also a global timeout that specifies the maximum amount of time that you can keep an instance in a wait state. The global timeout is 48 hours or 100 times the heartbeat timeout, whichever is smaller.
> The result of the lifecycle hook can be either abandon or continue.
> Creating and updating lifecycle hooks using the AWS CLI, CloudFormation, or an SDK provides options not available when creating a lifecycle hook from the AWS Management Console. For example, the field to specify the ARN of an SNS topic or SQS queue doesn't appear in the console, because Amazon EC2 Auto Scaling already sends events to Amazon EventBridge. These events can be filtered and redirected to AWS services such as Lambda, Amazon SNS, and Amazon SQS as needed.

## S4 Use an instance refresh to update instances in an Auto Scaling group — Core concepts (minimum and maximum healthy percentage)
url: https://docs.aws.amazon.com/autoscaling/ec2/userguide/instance-refresh-overview.html#instance-refresh-core-concepts
fetched: 2026-11-26
> The minimum healthy percentage is the percentage of the desired capacity to keep in service, healthy, and ready to use during an instance refresh so that the refresh can continue.
> For example, if the minimum healthy percentage is 90 percent and the maximum healthy percentage is 100 percent, then 10 percent of capacity will be replaced at a time.
> If the new instances don't pass their health checks, Amazon EC2 Auto Scaling terminates and replaces them.
> To replace one instance at a time, set both the minimum and maximum healthy percentage to 100 percent.
> To replace all instances at once, set a minimum healthy percentage of 0 percent.

## S5 Add checkpoints to an instance refresh — How it works
url: https://docs.aws.amazon.com/autoscaling/ec2/userguide/asg-adding-checkpoints-instance-refresh.html#instance-refresh-checkpoints-how-it-works
fetched: 2026-11-26
> When starting an instance refresh, you specify checkpoints as percentages of the total number of instances in the Auto Scaling group.
> These checkpoints indicate the minimum percentage of instances in the Auto Scaling group that must be new instances before the checkpoint is considered reached.
> Amazon EC2 Auto Scaling emits events for each checkpoint except for the 100 percent complete checkpoint.
> You can add an EventBridge rule to send the events to a target such as Amazon SNS.
> Canceling the operation stops any further replacements from being made.
> If you cancel the operation or it fails before reaching the last checkpoint, any instances that were already replaced are not rolled back to their previous configuration.
> If multiple checkpoints are enabled, the instance refresh checkpoint must be set to 100% to ensure complete replacement of all instances.

## S6 Undo changes with a manual or auto rollback — Rollback of an instance refresh
url: https://docs.aws.amazon.com/autoscaling/ec2/userguide/instance-refresh-rollback.html#instance-refresh-rollback
fetched: 2026-11-26
> You can roll back an instance refresh that is still in progress.
> You can't roll it back after it's finished.
> When rolling back, Amazon EC2 Auto Scaling replaces the instances that have been deployed so far.
> The new instances match the configuration that you last saved on the Auto Scaling group before starting the instance refresh.
> Auto rollback: Amazon EC2 Auto Scaling automatically reverses what was deployed if the instance refresh fails for some reason or if any CloudWatch alarms you specify go into the ALARM state.
> If you enable auto rollback, and there are errors while replacing instances, the instance refresh attempts to complete all replacements for one hour before it fails and rolls back.

## S7 Detect unmanaged configuration changes to stacks and resources with drift detection — What is drift?
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-drift.html#using-cfn-stack-drift
fetched: 2026-11-26
> Even as you manage your resources through CloudFormation, users can change those resources outside of CloudFormation.
> Some changes may be accidental, and some may be made intentionally to respond to time-sensitive operational events.
> You can use drift detection to identify stack resources to which configuration changes have been made outside of CloudFormation management.
> Drift detection enables you to detect whether a stack's actual configuration differs, or has drifted, from its expected configuration.
> A resource is considered to have drifted if one or more of its properties have been deleted, or had their value changed.
> A stack is considered to have drifted if one or more of its resources have drifted.
