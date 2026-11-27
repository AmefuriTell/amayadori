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
