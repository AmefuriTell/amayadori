## S1 Health checks for Application Load Balancer target groups — Health checks for Application Load Balancer target groups
url: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html#target-group-health-checks
fetched: 2026-11-26
> Each load balancer node routes requests only to the healthy targets in the enabled Availability Zones for the load balancer.
> If a target group contains only unhealthy registered targets, the load balancer routes requests to all those targets, regardless of their health status.
> This means that if all targets fail health checks at the same time in all enabled Availability Zones, the load balancer fails open.
> The effect of the fail-open is to allow traffic to all targets in all enabled Availability Zones, regardless of their health status, based on the load balancing algorithm.

## S2 Health checks for Application Load Balancer target groups — Health check settings
url: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html#health-check-settings
fetched: 2026-11-26
> The destination for health checks on the targets.
> If the protocol version is HTTP/1.1 or HTTP/2, specify a valid URI (/path?query).
> The codes to use when checking for a successful response from a target.
> If the protocol version is HTTP/1.1 or HTTP/2, the possible values are from 200 to 499.
> You can specify multiple values (for example, "200,202") or a range of values (for example, "200-299").

## S3 Health checks for Application Load Balancer target groups — Target health status
url: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html#target-health-states
fetched: 2026-11-26
> After a target passes the initial health checks, its status is Healthy.
> The target did not respond to a health check or failed the health check.
> The target is deregistering and connection draining is in process.

## S4 Edit target group attributes for your Application Load Balancer — Deregistration delay
url: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/edit-target-group-attributes.html#deregistration-delay
fetched: 2026-11-26
> Elastic Load Balancing stops sending requests to targets that are deregistering.
> By default, Elastic Load Balancing waits 300 seconds before completing the deregistration process, which can help in-flight requests to the target to complete.
> The initial state of a deregistering target is draining.
> After the deregistration delay elapses, the deregistration process completes and the state of the target is unused.
> If the target is part of an Auto Scaling group, it can be terminated and replaced.
> If a deregistering target terminates the connection before the deregistration delay elapses, the client receives a 500-level error response.

## S5 Edit target group attributes for your Application Load Balancer — Slow start mode
url: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/edit-target-group-attributes.html#slow-start-mode
fetched: 2026-11-26
> By default, a target starts to receive its full share of requests as soon as it is registered with a target group and passes an initial health check.
> A target in slow start mode exits slow start mode when the configured slow start duration period elapses or the target becomes unhealthy.
> If a target in slow start mode becomes unhealthy, the target exits slow start mode.

## S6 Edit target group attributes for your Application Load Balancer — Health settings
url: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/edit-target-group-attributes.html#modify-target-group-health-settings
fetched: 2026-11-26
> By default, Application Load Balancers monitor the health of targets and route requests to healthy targets.
> However, if the load balancer doesn't have enough healthy targets, it automatically sends traffic to all registered targets (fail open).
> You can modify the target group health settings for your target group to define the thresholds for DNS failover and routing failover.
> For Configuration type, we recommend that you choose Unified configuration, which sets the same threshold for both actions.
> Choose Minimum healthy target percentage, and then enter a number from 1 to 100.

## S7 Attach an Elastic Load Balancing load balancer to your Auto Scaling group — Attach a target group or Classic Load Balancer
url: https://docs.aws.amazon.com/autoscaling/ec2/userguide/attach-load-balancer-asg.html#attach-load-balancer-asg
fetched: 2026-11-26
> By default, Amazon EC2 Auto Scaling only replaces instances that are unhealthy or unreachable based on Amazon EC2 health checks.
> If you turn on Elastic Load Balancing health checks, Amazon EC2 Auto Scaling can replace a running instance if any of the Elastic Load Balancing load balancers you attach to the Auto Scaling group report it as unhealthy.
> When you attach an Application Load Balancer, Network Load Balancer, or Gateway Load Balancer, you attach a target group rather than the load balancer itself.
> This is how long Amazon EC2 Auto Scaling needs to wait before checking the health status of an instance after it enters the InService state.

## S8 Health checks for instances in an Auto Scaling group — Health checks for instances in an Auto Scaling group
url: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-health-checks.html#ec2-auto-scaling-health-checks
fetched: 2026-11-26
> Instances are assumed to be healthy unless Amazon EC2 Auto Scaling receives notification that they are unhealthy.
> When Amazon EC2 Auto Scaling determines that an InService instance is unhealthy, it replaces it with a new instance to maintain the desired capacity of the group.

## S9 How health checks work in complex Amazon Route 53 configurations — How health checks work in complex Amazon Route 53 configurations
url: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-complex-configs.html#dns-failover-complex-configs
fetched: 2026-11-26
> For both latency alias records, you set the value of Evaluate Target Health to Yes.
> This causes Route 53 to determine whether there are any healthy resources in a Region before trying to route traffic there.
> If not, Route 53 chooses a healthy resource in the other Region.

## S10 How health checks work in complex Amazon Route 53 configurations — What happens when you set evaluate target health to No?
url: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-complex-configs.html#dns-failover-complex-configs-eth-no
fetched: 2026-11-26
> In general, you should set Evaluate Target Health to Yes for all the alias records in a tree.
> If you set Evaluate Target Health to No, Route 53 continues to route traffic to the records that an alias record refers to even if health checks for those records are failing.

## S11 Health checks for Network Load Balancer target groups — Health checks for Network Load Balancer target groups
url: https://docs.aws.amazon.com/elasticloadbalancing/latest/network/target-group-health-checks.html#target-group-health-checks
fetched: 2026-11-26
> If a target becomes unhealthy, the load balancer sends a TCP RST for packets received on the client connections associated with the target, unless the unhealthy target triggers the load balancer to fail open.
> If target groups don't have a healthy target in an enabled Availability Zone, we remove the IP address for the corresponding subnet from DNS so that requests cannot be routed to targets in that Availability Zone.
> If all targets fail health checks at the same time in all enabled Availability Zones, the load balancer fails open.
> Network Load Balancers will also fail open when you have an empty target group.
