## S1 Managing capacity automatically with Amazon RDS storage autoscaling — 自動拡張が起きる条件
url: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PIOPS.Autoscaling.html
fetched: 2026-11-25
> With storage autoscaling enabled, when Amazon RDS detects that you are running out of free database space it automatically scales up your storage.
> Amazon RDS starts a storage modification for an autoscaling-enabled DB instance when these factors apply:
> - Free available space is less than or equal to 10 percent of the allocated storage.
> - The low-storage condition lasts at least five minutes.
> - Storage optimization has completed on the instance for the previous storage modification, and fewer than four storage modifications have occurred in the past 24 hours.
> The additional storage is in increments of whichever of the following is greater:
> - 10 GiB
> - 10 percent of currently allocated storage
> - Predicted storage growth exceeding the current allocated storage size in the next 7 hours based on the FreeStorageSpace metrics from the past hour.

## S2 Managing capacity automatically with Amazon RDS storage autoscaling — 最大のしきい値と制限
url: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PIOPS.Autoscaling.html#autoscaling-limitations
fetched: 2026-11-25
> The maximum storage threshold is the limit that you set for autoscaling the DB instance.
> You must set the maximum storage threshold to at least 10% more than the current allocated storage.
> We recommend setting it to at least 26% more to avoid receiving an event notification that the storage size is approaching the maximum storage threshold.
> You can't set the maximum storage threshold for autoscaling-enabled instances to a value greater than the maximum allocated storage for the database engine and DB instance class.
> Autoscaling doesn't occur if the maximum storage threshold would be exceeded by the storage increment.
> Autoscaling can't decrease the allocated storage.
> Autoscaling can't completely prevent storage-full situations for large data loads.

## S3 Automatically manage Amazon ECS capacity with cluster auto scaling — クラスターの EC2 の増減
url: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/cluster-auto-scaling.html#cluster-auto-scaling
fetched: 2026-11-25
> Amazon ECS can manage the scaling of Amazon EC2 instances that are registered to your cluster.
> You turn on managed scaling when you create the Amazon ECS Auto Scaling group capacity provider.
> Then, you set a target percentage (the targetCapacity) for the instance utilization in this Auto Scaling group.
> Amazon ECS creates two custom CloudWatch metrics and a target tracking scaling policy for your Auto Scaling group.
> Amazon ECS then manages the scale-in and scale-out actions based on the resource utilization that your tasks use.
> Don't change or manage the desired capacity for the Auto Scaling group that's associated with a capacity provider with any scaling policies other than the one Amazon ECS manages.
> When Amazon ECS scales out from 0 instances, it automatically launches 2 instances.
> Cluster auto scaling doesn't modify the MinimumCapacity or MaximumCapacity for the group.
> For the group to scale out, the value for MaximumCapacity must be greater than zero.

## S4 Managing throughput capacity automatically with DynamoDB auto scaling — 目標の使用率による調整
url: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/AutoScaling.html#AutoScaling
fetched: 2026-11-25
> Amazon DynamoDB auto scaling uses the AWS Application Auto Scaling service to dynamically adjust provisioned throughput capacity on your behalf, in response to actual traffic patterns.
> This enables a table or a global secondary index (GSI) to increase its provisioned read and write capacity to handle sudden increases in traffic, without throttling.
> When the workload decreases, Application Auto Scaling decreases the throughput so that you don't pay for unused provisioned capacity.
> With Application Auto Scaling, you create a scaling policy for a table or a global secondary index.
> The scaling policy also contains a target utilization—the percentage of consumed provisioned throughput at a point in time.
> Application Auto Scaling uses a target tracking algorithm to adjust the provisioned throughput of the table (or index) upward or downward in response to actual workloads, so that the actual capacity utilization remains at or near your target utilization.
> DynamoDB outputs consumed provisioned throughput for one-minute periods.
> Auto scaling triggers when your consumed capacity breaches the configured target utilization for two consecutive minutes.
> You can set the auto scaling target utilization values between 20 and 90 percent for your read and write capacity.
> If you use the AWS Management Console to create a table or a global secondary index, DynamoDB auto scaling is enabled by default.
> DynamoDB auto scaling doesn't prevent you from manually modifying provisioned throughput settings.
