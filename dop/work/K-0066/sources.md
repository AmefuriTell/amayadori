# 講義の根拠: task 3.2（Implement solutions that are scalable to meet business requirements）

## S1 Target tracking scaling policies for Amazon EC2 Auto Scaling — Target tracking scaling policies for Amazon EC2 Auto Scaling
url: https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-target-tracking.html#as-scaling-target-tracking
fetched: 2026-11-27
> A target tracking scaling policy automatically scales the capacity of your Auto Scaling group based on a target metric value. It automatically adapts to the unique usage patterns of your individual applications.

## S2 Target tracking scaling policies for Amazon EC2 Auto Scaling — Choose metrics
url: https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-target-tracking.html#target-tracking-choose-metrics
fetched: 2026-11-27
> We recommend that you only use metrics that are available at one-minute or lower intervals to help you scale faster in response to utilization changes.
> Not all custom metrics work for target tracking. The metric must be a valid utilization metric and describe how busy an instance is.
> The metric value must increase or decrease proportionally to the number of instances in the Auto Scaling group.
> The number of requests received by the load balancer fronting the Auto Scaling group (that is, the Elastic Load Balancing metric RequestCount). The number of requests received by the load balancer doesn't change based on the utilization of the Auto Scaling group.

## S3 Automatically scale your Amazon ECS service — Considerations
url: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-auto-scaling.html#auto-scaling-concepts
fetched: 2026-11-27
> Amazon ECS sends metrics in 1-minute intervals to CloudWatch. Metrics are not available until the clusters and services send the metrics to CloudWatch, and you cannot create CloudWatch alarms for metrics that do not exist.

## S4 Automatically scale your Amazon ECS service — Considerations
url: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-auto-scaling.html#auto-scaling-concepts
fetched: 2026-11-27
> During scaling activities, the actual running task count in a service is the value that Service Auto Scaling uses as its starting point, as opposed to the desired count. This prevents excessive (runaway) scaling that might not be satisfied, for example, if there aren't enough container instance resources to place the additional tasks.

## S5 Automatically manage Amazon ECS capacity with cluster auto scaling — Automatically manage Amazon ECS capacity with cluster auto scaling
url: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/cluster-auto-scaling.html#cluster-auto-scaling
fetched: 2026-11-27
> Amazon ECS can manage the scaling of Amazon EC2 instances that are registered to your cluster. Then, you set a target percentage (the targetCapacity) for the instance utilization in this Auto Scaling group.

## S6 Automatically manage Amazon ECS capacity with cluster auto scaling — Automatically manage Amazon ECS capacity with cluster auto scaling
url: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/cluster-auto-scaling.html#cluster-auto-scaling
fetched: 2026-11-27
> When the targetCapacity is the default value of 100 %, the new tasks are in the PENDING state during the scale-out because there is no available capacity on the instances to run the tasks.

## S7 Amazon ECS clusters for Fargate — Amazon ECS clusters for Fargate
url: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/fargate-capacity-providers.html#fargate-capacity-providers
fetched: 2026-11-27
> With Amazon ECS on AWS Fargate capacity providers, you can use both Fargate and Fargate Spot capacity with your Amazon ECS tasks.
> A cluster can contain a mix of Fargate and Auto Scaling group capacity providers. However, a capacity provider strategy can only contain either Fargate or Auto Scaling group capacity providers, but not both.

## S8 Amazon ECS clusters for Fargate — Amazon ECS clusters for Fargate
url: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/fargate-capacity-providers.html#fargate-capacity-providers
fetched: 2026-11-27
> With Fargate Spot, you can run interruption tolerant Amazon ECS tasks at a rate that's discounted compared to the Fargate price. When AWS needs the capacity back, your tasks are interrupted with a two-minute warning.

## S9 Scale pod deployments with Horizontal Pod Autoscaler — Scale pod deployments with Horizontal Pod Autoscaler
url: https://docs.aws.amazon.com/eks/latest/userguide/horizontal-pod-autoscaler.html#horizontal-pod-autoscaler
fetched: 2026-11-27
> The Kubernetes Horizontal Pod Autoscaler automatically scales the number of Pods in a deployment, replication controller, or replica set based on that resource’s CPU utilization.
> The Horizontal Pod Autoscaler is a standard API resource in Kubernetes that simply requires that a metrics source (such as the Kubernetes metrics server) is installed on your Amazon EKS cluster to work.

## S10 Configuring provisioned concurrency for an Event Function — Configuring provisioned concurrency for an Event Function
url: https://docs.aws.amazon.com/lambda/latest/dg/provisioned-concurrency.html#provisioned-concurrency
fetched: 2026-11-27
> Reserved concurrency acts as both a lower and upper bound - it reserves the specified capacity exclusively for your function while also preventing it from scaling beyond that limit.
> Provisioned concurrency is useful for reducing cold start latencies for functions and designed to make functions available with double-digit millisecond response times.
> Configuring provisioned concurrency incurs additional charges to your AWS account.
> Asynchronous workloads, such as data processing pipelines, are often less latency sensitive and so do not usually need provisioned concurrency.

## S11 Using Lambda with Amazon SQS — Using Lambda with Amazon SQS
url: https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html#with-sqs
fetched: 2026-11-27
> You can use a Lambda Event Function to process messages in an Amazon Simple Queue Service (Amazon SQS) queue.
> When processing Amazon SQS messages, you need to implement partial batch response logic to prevent successfully processed messages from being retried when some messages in a batch fail.

## S12 Using Lambda with Amazon SQS — Using provisioned mode with Amazon SQS event source mappings
url: https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html#sqs-provisioned-mode
fetched: 2026-11-27
> Each event poller in provisioned mode can handle up to 1 MB/s of throughput, up to 10 concurrent invokes, or up to 10 Amazon SQS polling API calls per second. The range of accepted values for the minimum number of event pollers (MinimumPollers) is between 2 and 200, with default of 2.

## S13 Throttle requests to your REST APIs for better throughput in API Gateway — Throttle requests to your REST APIs for better throughput in API Gateway
url: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-request-throttling.html#api-gateway-request-throttling
fetched: 2026-11-27
> API Gateway throttles requests to your API using the token bucket algorithm, where a token counts for a request. When request submissions exceed the steady-state request rate and burst limits, API Gateway begins to throttle requests. Clients may receive 429 Too Many Requests error responses at this point.

## S14 How Elastic Load Balancing works — How Elastic Load Balancing works
url: https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/how-elastic-load-balancing-works.html#how-elastic-load-balancing-works
fetched: 2026-11-27
> A load balancer accepts incoming traffic from clients and routes requests to its registered targets (such as EC2 instances) in one or more Availability Zones. The load balancer also monitors the health of its registered targets and ensures that it routes traffic only to healthy targets.

## S15 How Elastic Load Balancing works — Cross-zone load balancing
url: https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/how-elastic-load-balancing-works.html#cross-zone-load-balancing
fetched: 2026-11-27
> With Application Load Balancers, cross-zone load balancing is always enabled at the load balancer level. At the target group level, cross-zone load balancing can be disabled.

## S16 Caching strategies for Memcached — Lazy loading
url: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Strategies.html#Strategies.LazyLoading
fetched: 2026-11-27
> Whenever your application requests data, it first makes the request to the ElastiCache cache. If the data doesn't exist in the cache or has expired, your application requests the data from your data store.

## S17 Latency-based routing — Latency-based routing
url: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-latency.html#routing-policy-latency
fetched: 2026-11-27
> If your application is hosted in multiple AWS Regions, you can improve performance for your users by serving their requests from the AWS Region with the lowest latency.
> Route 53 responds with the value from the chosen record, such as the IP address for a web server.

## S18 What is AWS Global Accelerator? — What is AWS Global Accelerator?
url: https://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html#what-is-global-accelerator
fetched: 2026-11-27
> Global Accelerator is a global service that supports endpoints in multiple AWS Regions. With a standard accelerator, Global Accelerator directs traffic over the AWS global network to endpoints in the nearest Region to the client.

## S19 Understanding Lambda Event Function scaling — Understanding Lambda Event Function scaling
url: https://docs.aws.amazon.com/lambda/latest/dg/lambda-concurrency.html#lambda-concurrency
fetched: 2026-11-25
> Concurrency is the number of in-flight requests that your AWS Lambda Event Function is handling at the same time.
> By default, Lambda provides your account with a total concurrency limit of 1,000 concurrent executions across all Event Functions in an AWS Region.
> To support your specific account needs, you can request a quota increase and configure function-level concurrency controls so that your critical Event Functions don't experience throttling.

## S20 Understanding Lambda Event Function scaling — Reserved concurrency
url: https://docs.aws.amazon.com/lambda/latest/dg/lambda-concurrency.html#reserved-concurrency-concept
fetched: 2026-11-25
> Reserved concurrency sets the maximum and minimum number of concurrent instances that you want to allocate to your Event Function.
> When you dedicate reserved concurrency to an Event Function, no other Event Function can use that concurrency.
> At t3, function-orange hits the max concurrency of 400.
> Although there is unused concurrency elsewhere in your account, function-orange cannot access it.

## S21 Understanding Lambda Event Function scaling — Provisioned concurrency
url: https://docs.aws.amazon.com/lambda/latest/dg/lambda-concurrency.html#provisioned-concurrency-concept
fetched: 2026-11-25
> You use reserved concurrency to define the maximum number of execution environments reserved for a Lambda Event Function.
> However, none of these environments come pre-initialized.
> To mitigate cold starts, you can use provisioned concurrency.
> Provisioned concurrency is the number of pre-initialized execution environments that you want to allocate to your Event Function.
> If you set provisioned concurrency on an Event Function, Lambda initializes that number of execution environments so that they are prepared to respond immediately to Event Function requests.
> Using provisioned concurrency incurs additional charges to your account.

## S22 Decrease latency for applications with long boot times using warm pools — Amazon EC2 Auto Scaling warm pools
url: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-warm-pools.html#ec2-auto-scaling-warm-pools
fetched: 2026-11-25
> A warm pool gives you the ability to decrease latency for your applications that have exceptionally long boot times, for example, because instances need to write massive amounts of data to disk.
> With warm pools, you no longer have to over-provision your Auto Scaling groups to manage latency in order to improve application performance.
> Creating a warm pool when it's not required can lead to unnecessary costs.

## S23 Target tracking scaling policies for Amazon EC2 Auto Scaling — Define instance warmup time
url: https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-target-tracking.html#as-target-tracking-scaling-warmup
fetched: 2026-11-25
> You can optionally specify the number of seconds that it takes for a newly launched instance to warm up.
> Until its specified warmup time has expired, an instance is not counted toward the aggregated EC2 instance metrics of the Auto Scaling group.
> While instances are in the warmup period, your scaling policies only scale out if the metric value from instances that are not warming up is greater than the policy's target utilization.

## S24 How predictive scaling works — How it works
url: https://docs.aws.amazon.com/autoscaling/ec2/userguide/predictive-scaling-policy-overview.html#how-predictive-scaling-works
fetched: 2026-11-26
> To use predictive scaling, create a predictive scaling policy that specifies the CloudWatch metric to monitor and analyze.
> For predictive scaling to start forecasting future values, this metric must have at least 24 hours of data.
> After you create the policy, predictive scaling starts analyzing metric data from up to the past 14 days to identify patterns.
> It uses this analysis to generate an hourly forecast of capacity requirements for the next 48 hours.
> The forecast is updated every 6 hours using the latest CloudWatch data.
> When you first enable predictive scaling, it runs in forecast only mode.
> In this mode, it generates capacity forecasts but does not actually scale your Auto Scaling group based on those forecasts.
> If the forecast expects an increase in load, Amazon EC2 Auto Scaling will increase capacity by scaling out.
> If the forecast expects a decrease in load, it will not scale in to remove capacity.
> By default, Amazon EC2 Auto Scaling scales your Auto Scaling group at the start of each hour based on the forecast for that hour.
> You can optionally specify an earlier start time by using the SchedulingBufferTime property in the PutScalingPolicy API operation or the Pre-launch instances setting in the AWS Management Console.
> This causes Amazon EC2 Auto Scaling to launch new instances ahead of the forecasted demand, giving them time to boot and become ready to handle traffic.

## S25 Scheduled scaling for Amazon EC2 Auto Scaling — How scheduled scaling works
url: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-scheduled-scaling.html#scheduled-scaling-how-it-works
fetched: 2026-11-26
> To use scheduled scaling, create scheduled actions, which tell Amazon EC2 Auto Scaling to perform scaling activities at specific times.
> You can create scheduled actions that scale one time only or that scale on a recurring schedule.
> At the specified time, Amazon EC2 Auto Scaling scales based on the new capacity values, by comparing current capacity to the specified desired capacity.
> To create a recurring schedule using the AWS CLI or an SDK, specify a cron expression and a time zone to describe when that scheduled action is to recur.
> For example, the cron expression 30 6 * * 2 configures a scheduled action that recurs every Tuesday at 6:30 AM.

## S26 Elastic Load Balancing: How Elastic Load Balancing works — Request routing
url: https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/how-elastic-load-balancing-works.html#request-routing
fetched: 2026-11-26
> With Network Load Balancers, Elastic Load Balancing creates a network interface for each Availability Zone that you enable, and uses it to get a static IP address.
> You can optionally associate one Elastic IP address with each network interface when you create the Network Load Balancer.
> The DNS entry also specifies the time-to-live (TTL) of 60 seconds.

## S27 Elastic Load Balancing: How Elastic Load Balancing works — Routing algorithm
url: https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/how-elastic-load-balancing-works.html#routing-algorithm
fetched: 2026-11-26
> With Application Load Balancers, the load balancer node that receives the request uses the following process:
> Evaluates the listener rules in priority order to determine which rule to apply.
> Selects a target from the target group for the rule action, using the routing algorithm configured for the target group.
> With Network Load Balancers, the load balancer node that receives the connection uses the following process:
> Selects a target from the target group for the default rule using a flow hash algorithm.
> Routes each individual TCP connection to a single target for the life of the connection.

## S28 Caching strategies for Memcached — Advantages and disadvantages of lazy loading
url: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Strategies.html#Strategies.LazyLoading.Evaluation
fetched: 2026-11-26
> The advantages of lazy loading are as follows:
> Only requested data is cached.
> Because most data is never requested, lazy loading avoids filling up the cache with data that isn't requested.
> Node failures aren't fatal for your application.
> The disadvantages of lazy loading are as follows:
> There is a cache miss penalty.
> If data is written to the cache only when there is a cache miss, data in the cache can become stale.
> This result occurs because there are no updates to the cache when data is changed in the database.

## S29 Caching strategies for Memcached — Advantages and disadvantages of write-through
url: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Strategies.html#Strategies.WriteThrough.Evaluation
fetched: 2026-11-26
> Data in the cache is never stale.
> Because the data in the cache is updated every time it's written to the database, the data in the cache is always current.
> If you spin up a new node, whether due to a node failure or scaling out, there is missing data.
> This data continues to be missing until it's added or updated on the database.
> You can minimize this by implementing lazy loading with write-through.
> Most data is never read, which is a waste of resources.
> By adding a time to live (TTL) value, you can minimize wasted space.

## S30 Automatically scale your Amazon ECS service — Considerations
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

## S31 Automatically manage Amazon ECS capacity with cluster auto scaling — Cluster auto scaling
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

## S32 Amazon ECS clusters for Fargate — Fargate Spot termination notices
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

## S33 How the Amazon ECS deployment circuit breaker detects failures — Failure counting
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

## S34 How the Amazon ECS deployment circuit breaker detects failures — Threshold configuration
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

## S35 Scale cluster compute with Karpenter and Cluster Autoscaler — Additional Solutions
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

## S36 Scale pod deployments with Horizontal Pod Autoscaler — Scale pod deployments
url: https://docs.aws.amazon.com/eks/latest/userguide/horizontal-pod-autoscaler.html#horizontal-pod-autoscaler
fetched: 2026-11-26

> The Kubernetes Horizontal Pod Autoscaler automatically scales the number of Pods in a deployment, replication controller, or replica set based on that resource’s CPU utilization.
> This can help your applications scale out to meet increased demand or scale in when resources are not needed, thus freeing up your nodes for other applications.
> The Horizontal Pod Autoscaler is a standard API resource in Kubernetes that simply requires that a metrics source (such as the Kubernetes metrics server) is installed on your Amazon EKS cluster to work.
> When you set a target CPU utilization percentage, the Horizontal Pod Autoscaler scales your application in or out to try to meet that target.
> When the average CPU load is lower than 50 percent, the autoscaler tries to reduce the number of Pods in the deployment, to a minimum of one.
> When the load is greater than 50 percent, the autoscaler tries to increase the number of Pods in the deployment, up to a maximum of ten.
> It may take over a minute for the replica count to increase.

## S37 Managing stacks across accounts and Regions with StackSets — Managing stacks across accounts and Regions with StackSets
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/what-is-cfnstacksets.html#what-is-cfnstacksets
fetched: 2026-11-26
> CloudFormation StackSets extends the capability of stacks by allowing you to create, update, or delete stacks across multiple accounts and AWS Regions with a single operation. Using an administrator account, you define and manage a CloudFormation template, and use the template as the basis for provisioning stacks into selected target accounts across specified AWS Regions.

## S38 StackSets concepts — StackSet operations
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-concepts.html#stacksets-concepts-ops
fetched: 2026-11-26
> A StackSet ensures consistent deployment of the same stack resources, with the same settings, to all specified target accounts within the Regions you choose.

## S39 StackSet operation options — Failure tolerance
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-concepts.html#stackset-ops-options
fetched: 2026-11-26
> This setting, available in create, update, and delete workflows, lets you specify the maximum number or percentage of stack operation failures that can occur, per Region, beyond which CloudFormation stops an operation automatically. A lower number or percentage means that the operation performs on fewer stacks, but you are able to start troubleshooting failed operations faster.

## S40 StackSet operation options — Maximum concurrent accounts
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-concepts.html#stackset-ops-options
fetched: 2026-11-26
> Operations perform in one Region at a time, in the order specified in the Deployment order box. Maximum concurrent accounts can depend on the value of Failure tolerance depending on your Concurrency Mode. If your Concurrency Mode is set to Strict Failure Tolerance then Maximum concurrent accounts can be at most one more than the Failure tolerance setting.

## S41 StackSet operation options — Region concurrency
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-concepts.html#stackset-ops-options
fetched: 2026-11-26
> This setting, available in create, update, and delete workflows, lets you choose how StackSets deploy into Regions. Sequential – Deploy StackSets operation into one Region at a time as specified by Region Deployment order box as long as a Region's deployment failures don't exceed a specified failure tolerance. Sequential deployment is the default selection. Parallel – Deploy StackSets operations into all specified Regions simultaneously as long as a Region's deployment failures don't exceed a specified failure tolerance.

## S42 Latency-based routing — Latency-based routing
url: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-latency.html#routing-policy-latency
fetched: 2026-11-26
> If your application is hosted in multiple AWS Regions, you can improve performance for your users by serving their requests from the AWS Region with the lowest latency. To use latency-based routing, you create latency records for your resources in multiple AWS Regions. When Route 53 gets a DNS query for your domain or subdomain (example.com or acme.example.com), it checks which AWS Regions you've created latency records for, finds which Region gives the user the lowest latency, and then picks a latency record for that Region. Route 53 responds with the value from the chosen record, such as the IP address for a web server.

## S43 Latency-based routing — Latency-based routing
url: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-latency.html#routing-policy-latency
fetched: 2026-11-26
> For example, suppose you have Elastic Load Balancing load balancers in the US West (Oregon) Region and in the Asia Pacific (Singapore) Region. You create a latency record for each load balancer. Latency-based routing uses latency data taken over a period of time, and the data reflects these changes. A request routed to the Oregon Region this week might go to the Singapore Region next week.

## S44 What is AWS Global Accelerator? — What is AWS Global Accelerator?
url: https://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html#what-is-global-accelerator
fetched: 2026-11-26
> AWS Global Accelerator is a service in which you create accelerators to improve the performance of your applications for local and global users. With a standard accelerator, you can improve availability of your internet applications that are used by a global audience. With a standard accelerator, Global Accelerator directs traffic over the AWS global network to endpoints in the nearest Region to the client. Global Accelerator is a global service that supports endpoints in multiple AWS Regions.

## S45 Add a cross-region action in CodePipeline — Add a cross-region action in CodePipeline
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-create-cross-region.html#actions-create-cross-region
fetched: 2026-11-26
> You can add actions to your pipeline that are in an AWS Region different from your pipeline. When an AWS service is the provider for an action, and this action type/provider type are in a different AWS Region from your pipeline, this is a cross-region action. Cross-region actions are supported and can only be created in those AWS Regions where CodePipeline is supported.

## S46 Add a cross-region action in CodePipeline — Add a cross-region action in CodePipeline
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-create-cross-region.html#actions-create-cross-region
fetched: 2026-11-26
> When you create or edit a pipeline, you must have an artifact bucket in the pipeline Region and then you must have one artifact bucket per Region where you plan to execute an action. CodePipeline handles the copying of artifacts from one AWS Region to the other Regions when performing cross-region actions.

## S47 Understanding Lambda Event Function scaling — Understanding reserved concurrency and provisioned concurrency
url: https://docs.aws.amazon.com/lambda/latest/dg/lambda-concurrency.html#reserved-and-provisioned
fetched: 2026-11-26
> By default, your account has a concurrency limit of 1,000 concurrent executions across all Event Functions in a Region.
> Your Event Functions experience throttling (that is, they start to drop requests) if you run out of available concurrency.
> Use reserved concurrency to set both the maximum and minimum number of concurrent instances to reserve a portion of your account's concurrency for an Event Function.
> Use provisioned concurrency to pre-initialize a number of environment instances for an Event Function.
> This is useful for reducing cold start latencies.

## S48 Understanding Lambda Event Function scaling — Reserved concurrency
url: https://docs.aws.amazon.com/lambda/latest/dg/lambda-concurrency.html#reserved-concurrency-concept
fetched: 2026-11-26
> Reserved concurrency sets the maximum and minimum number of concurrent instances that you want to allocate to your Event Function.
> Event Functions that don't have reserved concurrency share the remaining pool of unreserved concurrency.
> Configuring reserved concurrency counts towards your overall account concurrency limit.
> There is no charge for configuring reserved concurrency for an Event Function.

## S49 Understanding Lambda Event Function scaling — Provisioned concurrency
url: https://docs.aws.amazon.com/lambda/latest/dg/lambda-concurrency.html#provisioned-concurrency-concept
fetched: 2026-11-26
> You use reserved concurrency to define the maximum number of execution environments reserved for a Lambda Event Function.
> However, none of these environments come pre-initialized.
> When Lambda has to initialize a new environment to carry out an invocation, this is known as a cold start.
> To mitigate cold starts, you can use provisioned concurrency.
> Provisioned concurrency is the number of pre-initialized execution environments that you want to allocate to your Event Function.
> Using provisioned concurrency incurs additional charges to your account.

## S50 Understanding Lambda Event Function scaling — How Lambda allocates provisioned concurrency
url: https://docs.aws.amazon.com/lambda/latest/dg/lambda-concurrency.html#allocating-provisioned-concurrency
fetched: 2026-11-26
> Provisioned concurrency doesn't come online immediately after you configure it.
> Lambda starts allocating provisioned concurrency after a minute or two of preparation.
> For each Event Function, Lambda can provision up to 6,000 execution environments every minute, regardless of AWS Region.
> When you submit a request to allocate provisioned concurrency, you can't access any of those environments until Lambda completely finishes allocating them.

## S51 Understanding Lambda Event Function scaling — Concurrency quotas
url: https://docs.aws.amazon.com/lambda/latest/dg/lambda-concurrency.html#concurrency-quotas
fetched: 2026-11-26
> At the account level, your Event Functions can have up to 1,000 units of concurrency by default.
> At the function level, you can reserve up to 900 units of concurrency across all your Event Functions by default.
> Regardless of your total account concurrency limit, Lambda always reserves 100 units of concurrency for your Event Functions that don't explicitly reserve concurrency.

## S52 Configuring provisioned concurrency for an Event Function — Using Application Auto Scaling to automate provisioned concurrency management
url: https://docs.aws.amazon.com/lambda/latest/dg/provisioned-concurrency.html#managing-provisioned-concurency
fetched: 2026-11-26
> You can use Application Auto Scaling to manage provisioned concurrency on a schedule or based on utilization.
> If you use Application Auto Scaling to manage your Event Function's provisioned concurrency, ensure that you configure an initial provisioned concurrency value first.
> If your Event Function doesn't have an initial provisioned concurrency value, Application Auto Scaling might not handle Event Function scaling properly.

## S53 Configuring provisioned concurrency for an Event Function — Scheduled scaling and target tracking
url: https://docs.aws.amazon.com/lambda/latest/dg/provisioned-concurrency.html#managing-provisioned-concurrency-targeting
fetched: 2026-11-26
> With Application Auto Scaling, you can set your own scaling schedule according to predictable load changes.
> When these alarms activate, Application Auto Scaling automatically adjusts the amount of environments allocated using provisioned concurrency.
> Use target tracking for applications that don't have predictable traffic patterns.

## S54 Configuring provisioned concurrency for an Event Function — Understanding logging and billing behavior with provisioned concurrency
url: https://docs.aws.amazon.com/lambda/latest/dg/provisioned-concurrency.html#pc-logging-behavior
fetched: 2026-11-26
> Lambda bills you for initialization even if the environment instance never processes a request.
> Provisioned concurrency runs continually and incurs separate billing from initialization and invocation costs.

## S55 Using Lambda with Amazon SQS — Configuring provisioned mode for Amazon SQS event source mapping
url: https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html#sqs-configuring-provisioned-mode
fetched: 2026-11-26
> Provisioned mode cannot be used in conjunction with the maximum concurrency setting.
> When using provisioned mode, you control maximum concurrency through the maximum number of event pollers.

## S56 Throttle requests to your REST APIs for better throughput in API Gateway — Overview
url: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-request-throttling.html#api-gateway-request-throttling
fetched: 2026-11-26
> Both throttles and quotas are applied on a best-effort basis and should be thought of as targets rather than guaranteed request ceilings.
> API Gateway throttles requests to your API using the token bucket algorithm, where a token counts for a request.
> When request submissions exceed the steady-state request rate and burst limits, API Gateway begins to throttle requests.
> Clients may receive 429 Too Many Requests error responses at this point.
> Alternatively, you can enable usage plans to set throttles on client request submissions based on specified requests rates and quotas.

## S57 Throttle requests to your REST APIs for better throughput in API Gateway — Account-level throttling per Region
url: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-request-throttling.html#apig-request-throttling-account-level-limits
fetched: 2026-11-26
> By default, API Gateway limits the steady-state requests per second (RPS) across all APIs within an AWS account, per Region.
> In API Gateway, the burst limit represents the target maximum number of concurrent request submissions that API Gateway will fulfill before returning 429 Too Many Requests error responses.

## S58 Throttle requests to your REST APIs for better throughput in API Gateway — Configuring API-level and stage-level throttling targets in a usage plan
url: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-request-throttling.html#apigateway-api-level-throttling-in-usage-plan
fetched: 2026-11-26
> In a usage plan, you can set a per-method throttling target for all methods at the API or stage level.
> You can specify a throttling rate, which is the rate, in requests per second, that tokens are added to the token bucket.
> You can also specify a throttling burst, which is the capacity of the token bucket.

## S59 Cache settings for REST APIs in API Gateway — Overview
url: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-caching.html#api-gateway-caching
fetched: 2026-11-26
> When you enable caching for a stage, API Gateway caches responses from your endpoint for a specified time-to-live (TTL) period, in seconds.
> The default TTL value for API caching is 300 seconds.
> The maximum TTL value is 3600 seconds.
> TTL=0 means caching is disabled.
> When you enable caching for a stage, only GET methods have caching enabled by default.
> You can enable caching for other methods by overriding method settings.

## S60 Cache settings for REST APIs in API Gateway — Enable Amazon API Gateway caching
url: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-caching.html#enable-api-gateway-caching
fetched: 2026-11-26
> In general, a larger capacity gives a better performance, but also costs more.
> API Gateway enables caching by creating a dedicated cache instance.
> This process can take up to 4 minutes.
> API Gateway changes caching capacity by removing the existing cache instance and creating a new one with a modified capacity.
> All existing cached data is deleted.
