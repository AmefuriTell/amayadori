## S1 Troubleshoot Amazon EC2 Auto Scaling: EC2 instance launch failures — Launch issues と Cause
url: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ts-as-instancelaunchfailure.html
fetched: 2026-11-26
> This page provides information about your EC2 instances that fail to launch, potential causes, and the steps you can take to resolve the issues.
> To retrieve an error message, see Retrieve an error message from scaling activities.
> When your EC2 instances fail to launch, you might get one or more of the following error messages:
> The requested configuration is currently not supported.
> Cause: Some options in your launch template or launch configuration might not be compatible with the instance type, or the instance configuration might not be supported in your requested AWS Region or Availability Zones.

## S2 Health checks for instances in an Auto Scaling group — 導入
url: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-health-checks.html
fetched: 2026-11-26
> All instances in an Auto Scaling group start with a Healthy status. Instances are assumed to be healthy unless Amazon EC2 Auto Scaling receives notification that they are unhealthy. It can receive notifications from various sources when an instance becomes unhealthy and must be replaced. These sources include the following: Amazon EC2, Elastic Load Balancing, VPC Lattice, Amazon EBS, Custom health checks that you define
> When Amazon EC2 Auto Scaling determines that an InService instance is unhealthy, it replaces it with a new instance to maintain the desired capacity of the group. The new instance launches using the current settings of the Auto Scaling group and its associated launch template or launch configuration.
> If the launch succeeds, the instance gets added to the Auto Scaling group. Then, Amazon EC2 Auto Scaling performs health checks on the instance by using the built-in Amazon EC2 status checks, and after a grace period, any optional health checks that you enabled for the group. These health checks continue periodically. If any of the health checks fail, the instance is replaced.
> Unhealthy instances can also occur when an instance terminates unexpectedly, such as from a Spot Instance interruption or manual termination by a user.

## S3 Amazon EC2 Auto Scaling lifecycle hooks — 導入と制限
url: https://docs.aws.amazon.com/autoscaling/ec2/userguide/lifecycle-hooks.html
fetched: 2026-11-26
> A lifecycle hook provides a specified amount of time (one hour by default) to wait for the action to complete before the instance transitions to the next state.
> By default, termination lifecycle hooks operate on a best-effort basis. If a termination lifecycle hook times out, or is abandoned, Amazon EC2 Auto Scaling proceeds with terminating the instance immediately.
> The result of the lifecycle hook can be either abandon or continue. If an instance is launching, continue indicates that your actions were successful, and that Amazon EC2 Auto Scaling can put the instance into service. Otherwise, abandon indicates that your custom actions were unsuccessful, and that we can terminate and replace the instance.
> Amazon EC2 Auto Scaling limits the rate at which it allows instances to launch if the lifecycle hooks are failing consistently, so make sure to test and fix any permanent errors in your lifecycle actions.

## S4 Viewing Amazon ECS stopped task errors — 導入と手順
url: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/stopped-task-errors.html
fetched: 2026-11-26
> If you have trouble starting a task, your task might be stopping because of application or configuration errors. For example, you run the task and the task displays a PENDING status and then disappears.
> If your task was created by an Amazon ECS service, the actions that Amazon ECS takes to maintain the service are published in the service events.
> Amazon ECS stopping and replaces a task because the containers in the task have stopped running, or have failed too many health checks from Elastic Load Balancing.
> Stopped tasks only appear in the console for 1 hour.
> stopCode - The stop code indicates why a task was stopped, for example ResourceInitializationError
> StoppedReason - The reason the task stopped.
> reason (in the containers structure) - The reason provide additional details about the stopped container.

## S5 CannotPullContainer task errors in Amazon ECS — Errors と権限の案内
url: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_cannot_pull_image.html
fetched: 2026-11-26
> The following errors indicate that the task failed to start because Amazon ECS can't retrieve the specified container image.
> The task can’t pull the image. Check that the role has the permissions to pull images from the registry.
> This error indicates that the task can't pull the image specified in the task definition because of permission issues.
> Verify that the role-arn has the correct permissions to pull the image.
> For tasks with the Fargate, this is the task execution role.
> For tasks with EC2, this is the container instance role.
> This error indicates that the task can't connect to Amazon ECR. Check the connection to the repository URI repository.

## S6 Troubleshoot problems with Amazon EKS clusters and nodes — Insufficient capacity と Nodes fail to join cluster
url: https://docs.aws.amazon.com/eks/latest/userguide/troubleshooting.html#ice
fetched: 2026-11-26
> If you receive the following error while attempting to create an Amazon EKS cluster, then one of the Availability Zones you specified doesn’t have sufficient capacity to support a cluster.
> Retry creating your cluster with subnets in your cluster VPC that are hosted in the Availability Zones returned by this error message.
> There are Availability Zones that a cluster can’t reside in. Compare the Availability Zones that your subnets are in with the list of Availability Zones in the Subnet requirements and considerations.
> There are a few common reasons that prevent nodes from joining the cluster:
> The ClusterName in your node AWS CloudFormation template doesn’t exactly match the name of the cluster you want your nodes to join. Passing an incorrect value to this field results in an incorrect configuration of the node’s /var/lib/kubelet/kubeconfig file, and the nodes will not join the cluster.
> The node is not tagged as being owned by the cluster. Your nodes must have the following tag applied to them, where my-cluster is replaced with the name of your cluster.
> The nodes may not be able to access the cluster using a public IP address. Ensure that nodes deployed in public subnets are assigned a public IP address.
