## S1 How predictive scaling works — How it works
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

## S2 Scheduled scaling for Amazon EC2 Auto Scaling — How scheduled scaling works
url: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-scheduled-scaling.html#scheduled-scaling-how-it-works
fetched: 2026-11-26
> To use scheduled scaling, create scheduled actions, which tell Amazon EC2 Auto Scaling to perform scaling activities at specific times.
> You can create scheduled actions that scale one time only or that scale on a recurring schedule.
> At the specified time, Amazon EC2 Auto Scaling scales based on the new capacity values, by comparing current capacity to the specified desired capacity.
> To create a recurring schedule using the AWS CLI or an SDK, specify a cron expression and a time zone to describe when that scheduled action is to recur.
> For example, the cron expression 30 6 * * 2 configures a scheduled action that recurs every Tuesday at 6:30 AM.

## S3 Elastic Load Balancing: How Elastic Load Balancing works — Request routing
url: https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/how-elastic-load-balancing-works.html#request-routing
fetched: 2026-11-26
> With Network Load Balancers, Elastic Load Balancing creates a network interface for each Availability Zone that you enable, and uses it to get a static IP address.
> You can optionally associate one Elastic IP address with each network interface when you create the Network Load Balancer.
> The DNS entry also specifies the time-to-live (TTL) of 60 seconds.

## S4 Elastic Load Balancing: How Elastic Load Balancing works — Routing algorithm
url: https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/how-elastic-load-balancing-works.html#routing-algorithm
fetched: 2026-11-26
> With Application Load Balancers, the load balancer node that receives the request uses the following process:
> Evaluates the listener rules in priority order to determine which rule to apply.
> Selects a target from the target group for the rule action, using the routing algorithm configured for the target group.
> With Network Load Balancers, the load balancer node that receives the connection uses the following process:
> Selects a target from the target group for the default rule using a flow hash algorithm.
> Routes each individual TCP connection to a single target for the life of the connection.

## S5 Caching strategies for Memcached — Advantages and disadvantages of lazy loading
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

## S6 Caching strategies for Memcached — Advantages and disadvantages of write-through
url: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Strategies.html#Strategies.WriteThrough.Evaluation
fetched: 2026-11-26
> Data in the cache is never stale.
> Because the data in the cache is updated every time it's written to the database, the data in the cache is always current.
> If you spin up a new node, whether due to a node failure or scaling out, there is missing data.
> This data continues to be missing until it's added or updated on the database.
> You can minimize this by implementing lazy loading with write-through.
> Most data is never read, which is a waste of resources.
> By adding a time to live (TTL) value, you can minimize wasted space.
