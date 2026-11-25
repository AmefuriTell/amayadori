## S1 Understanding Lambda Event Function scaling — Understanding Lambda Event Function scaling
url: https://docs.aws.amazon.com/lambda/latest/dg/lambda-concurrency.html#lambda-concurrency
fetched: 2026-11-25
> Concurrency is the number of in-flight requests that your AWS Lambda Event Function is handling at the same time.
> By default, Lambda provides your account with a total concurrency limit of 1,000 concurrent executions across all Event Functions in an AWS Region.
> To support your specific account needs, you can request a quota increase and configure function-level concurrency controls so that your critical Event Functions don't experience throttling.

## S2 Understanding Lambda Event Function scaling — Reserved concurrency
url: https://docs.aws.amazon.com/lambda/latest/dg/lambda-concurrency.html#reserved-concurrency-concept
fetched: 2026-11-25
> Reserved concurrency sets the maximum and minimum number of concurrent instances that you want to allocate to your Event Function.
> When you dedicate reserved concurrency to an Event Function, no other Event Function can use that concurrency.
> At t3, function-orange hits the max concurrency of 400.
> Although there is unused concurrency elsewhere in your account, function-orange cannot access it.

## S3 Understanding Lambda Event Function scaling — Provisioned concurrency
url: https://docs.aws.amazon.com/lambda/latest/dg/lambda-concurrency.html#provisioned-concurrency-concept
fetched: 2026-11-25
> You use reserved concurrency to define the maximum number of execution environments reserved for a Lambda Event Function.
> However, none of these environments come pre-initialized.
> To mitigate cold starts, you can use provisioned concurrency.
> Provisioned concurrency is the number of pre-initialized execution environments that you want to allocate to your Event Function.
> If you set provisioned concurrency on an Event Function, Lambda initializes that number of execution environments so that they are prepared to respond immediately to Event Function requests.
> Using provisioned concurrency incurs additional charges to your account.

## S4 Decrease latency for applications with long boot times using warm pools — Amazon EC2 Auto Scaling warm pools
url: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-warm-pools.html#ec2-auto-scaling-warm-pools
fetched: 2026-11-25
> A warm pool gives you the ability to decrease latency for your applications that have exceptionally long boot times, for example, because instances need to write massive amounts of data to disk.
> With warm pools, you no longer have to over-provision your Auto Scaling groups to manage latency in order to improve application performance.
> Creating a warm pool when it's not required can lead to unnecessary costs.

## S5 Target tracking scaling policies for Amazon EC2 Auto Scaling — Define instance warmup time
url: https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-target-tracking.html#as-target-tracking-scaling-warmup
fetched: 2026-11-25
> You can optionally specify the number of seconds that it takes for a newly launched instance to warm up.
> Until its specified warmup time has expired, an instance is not counted toward the aggregated EC2 instance metrics of the Auto Scaling group.
> While instances are in the warmup period, your scaling policies only scale out if the metric value from instances that are not warming up is greater than the policy's target utilization.
