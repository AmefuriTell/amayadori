## S1 Automatically scale your Amazon ECS service — Considerations
url: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-auto-scaling.html#auto-scaling-concepts
fetched: 2026-11-26

> Automatic scaling is the ability to increase or decrease the desired number of tasks in your Amazon ECS service automatically.
> Amazon ECS leverages the Application Auto Scaling service to provide this functionality.
> Use a target metric to scale Amazon ECS services— Increase or decrease the number of tasks that your service runs based on a target value for a specific metric.
> For scale-out events, the intention is to continuously (but not excessively) scale out.
> For scale-in events, the intention is to scale in conservatively to protect your application's availability, so scale-in activities are blocked until the cooldown period has expired.
> During scaling activities, the actual running task count in a service is the value that Service Auto Scaling uses as its starting point, as opposed to the desired count.
> This prevents excessive (runaway) scaling that might not be satisfied, for example, if there aren't enough container instance resources to place the additional tasks.
> If a service's desired count is set below its minimum capacity value, and an alarm initiates a scale-out activity, Service Auto Scaling scales the desired count up to the minimum capacity value and then continues to scale out as required, based on the scaling policy associated with the alarm.
> If you want your task count to scale to zero when there's no work to be done, set a minimum capacity of 0.
> Application Auto Scaling turns off scale-in processes while Amazon ECS deployments are in progress.
> However, scale-out processes continue to occur, unless suspended, during a deployment.
> Target tracking is the easiest mode to use.
> With it, all you need to do is set a target value for a metric, such as CPU average utilization.

## S2 Automatically manage Amazon ECS capacity with cluster auto scaling — Cluster auto scaling
url: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/cluster-auto-scaling.html#cluster-auto-scaling
fetched: 2026-11-26

> Amazon ECS can manage the scaling of Amazon EC2 instances that are registered to your cluster.
> You turn on managed scaling when you create the Amazon ECS Auto Scaling group capacity provider.
> Then, you set a target percentage (the targetCapacity) for the instance utilization in this Auto Scaling group.
> Amazon ECS then manages the scale-in and scale-out actions based on the resource utilization that your tasks use.
> When the targetCapacity is the default value of 100 %, the new tasks are in the PENDING state during the scale-out because there is no available capacity on the instances to run the tasks.
> The Auto Scaling group follows the group termination policy to determine which instances it terminates first during scale-in events.
> Cluster auto scaling can manage which instances have the instance scale-in protection setting if you turn on managed termination protection.
> Cluster auto scaling doesn't modify the MinimumCapacity or MaximumCapacity for the group.
> For the group to scale out, the value for MaximumCapacity must be greater than zero.
> When Amazon ECS scales out from 0 instances, it automatically launches 2 instances.
> When Auto Scaling (managed scaling) is turned on, a capacity provider can only be connected to one cluster at the same time.
> The binpack strategy is the most efficient strategy in terms of capacity.

## S3 Amazon ECS clusters for Fargate — Fargate Spot termination notices
url: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/fargate-capacity-providers.html#fargate-capacity-providers-termination
fetched: 2026-11-26

> With Fargate Spot, you can run interruption tolerant Amazon ECS tasks at a rate that's discounted compared to the Fargate price.
> Fargate Spot runs tasks on spare compute capacity.
> When AWS needs the capacity back, your tasks are interrupted with a two-minute warning.
> During periods of extremely high demand, Fargate Spot capacity might be unavailable.
> This can cause Fargate Spot tasks to be delayed.
> When this happens, Amazon ECS services retry launching tasks until the required capacity becomes available.
> Fargate doesn't replace Spot capacity with on-demand capacity.
> If you use Fargate Spot as part of a service, then in this scenario the service scheduler receives the interruption signal and attempts to launch additional tasks on Fargate Spot if there's capacity available.
> A service with only one task is interrupted until capacity is available.
> The SIGTERM signal must be received from within the container to perform any cleanup actions.
> The default stopTimeout value is 30 seconds.
> A cluster can contain a mix of Fargate and Auto Scaling group capacity providers.
> However, a capacity provider strategy can only contain either Fargate or Auto Scaling group capacity providers, but not both.

## S4 How the Amazon ECS deployment circuit breaker detects failures — Failure counting
url: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-circuit-breaker.html#deployment-circuit-breaker
fetched: 2026-11-26

> The deployment circuit breaker is the rolling update mechanism that determines if the tasks reach a steady state.
> The deployment circuit breaker has an option that will automatically roll back a failed deployment to the deployment that is in the COMPLETED state.
> When the deployment circuit breaker does not find a deployment that is in a COMPLETED state, the circuit breaker does not launch new tasks and the deployment is stalled.
> By default, consecutive tasks that do not transition to the RUNNING state count toward the failure threshold (resetOnHealthyTask is true).
> When resetOnHealthyTask is false, all task failures accumulate regardless of whether healthy tasks start between failures.
> A deployment in a FAILED state doesn't launch any new tasks.
> The deployment circuit breaker is only supported for Amazon ECS services that use the rolling update (ECS) deployment controller.
> The failure count resets to 0 each time a task reaches a healthy state.
> Task failures accumulate throughout the deployment.
> The failure count never resets, even when healthy tasks start between failures.

## S5 How the Amazon ECS deployment circuit breaker detects failures — Threshold configuration
url: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-circuit-breaker.html#threshold-configuration
fetched: 2026-11-26

> The thresholdConfiguration setting defines when the circuit breaker triggers.
> Amazon ECS multiplies value by the latest service desired count to calculate the failure threshold.
> The result is clamped to a minimum of 3 and a maximum of 200.
> There is no minimum or maximum bound on the result.
> Use this type for services with large desired counts that need a proportional threshold without the 200 cap.
> Amazon ECS uses value directly as the failure threshold.
> The threshold remains fixed regardless of the service desired count.
> Minimum threshold (3) <= (value/100) * desired task count => Maximum threshold (200)
> When the result of the calculation is less than 3, the threshold is set to 3.
> When the result is greater than 200, the threshold is set to 200.

## S6 Scale cluster compute with Karpenter and Cluster Autoscaler — Additional Solutions
url: https://docs.aws.amazon.com/eks/latest/userguide/autoscaling.html#_additional_solutions
fetched: 2026-11-26

> Autoscaling is a function that automatically scales your resources out and in to meet changing demands.
> Amazon EKS Auto Mode automatically scales cluster compute resources.
> If a pod can’t fit onto existing nodes, EKS Auto Mode creates a new one.
> EKS Auto Mode also consolidates workloads and deletes nodes.
> Karpenter is a flexible, high-performance Kubernetes cluster autoscaler that helps improve application availability and cluster efficiency.
> Karpenter launches right-sized compute resources (for example, Amazon EC2 instances) in response to changing application load in under a minute.
> Karpenter automatically provisions new compute resources based on the specific requirements of cluster workloads.
> There is no AWS Service Level Agreement (SLA) for Karpenter and customers are responsible for ensuring that the EC2 instances launched by Karpenter meet their business requirements.
> The Kubernetes Cluster Autoscaler automatically adjusts the number of nodes in your cluster when pods fail or are rescheduled onto other nodes.
> The Cluster Autoscaler uses Auto Scaling groups.

## S7 Scale pod deployments with Horizontal Pod Autoscaler — Scale pod deployments
url: https://docs.aws.amazon.com/eks/latest/userguide/horizontal-pod-autoscaler.html#horizontal-pod-autoscaler
fetched: 2026-11-26

> The Kubernetes Horizontal Pod Autoscaler automatically scales the number of Pods in a deployment, replication controller, or replica set based on that resource’s CPU utilization.
> This can help your applications scale out to meet increased demand or scale in when resources are not needed, thus freeing up your nodes for other applications.
> The Horizontal Pod Autoscaler is a standard API resource in Kubernetes that simply requires that a metrics source (such as the Kubernetes metrics server) is installed on your Amazon EKS cluster to work.
> When you set a target CPU utilization percentage, the Horizontal Pod Autoscaler scales your application in or out to try to meet that target.
> When the average CPU load is lower than 50 percent, the autoscaler tries to reduce the number of Pods in the deployment, to a minimum of one.
> When the load is greater than 50 percent, the autoscaler tries to increase the number of Pods in the deployment, up to a maximum of ten.
> It may take over a minute for the replica count to increase.
