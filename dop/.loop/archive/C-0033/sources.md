## S1 How Elastic Load Balancing works — Availability Zones and load balancer nodes
url: https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/how-elastic-load-balancing-works.html#availability-zones
fetched: 2026-11-26
> When you enable an Availability Zone for your load balancer, Elastic Load Balancing creates a load balancer node in the Availability Zone. If you register targets in an Availability Zone but do not enable the Availability Zone, these registered targets do not receive traffic.
> We recommend enabling multiple Availability Zones for all load balancers. With an Application Load Balancer however, it is a requirement that you enable at least two or more Availability Zones.
> If one Availability Zone becomes unavailable or has no healthy targets, the load balancer can route traffic to the healthy targets in another Availability Zone.

## S2 How Elastic Load Balancing works — Cross-zone load balancing
url: https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/how-elastic-load-balancing-works.html#cross-zone-load-balancing
fetched: 2026-11-26
> The nodes for your load balancer distribute requests from clients to registered targets. When cross-zone load balancing is enabled, each load balancer node distributes traffic across the registered targets in all enabled Availability Zones. When cross-zone load balancing is disabled, each load balancer node distributes traffic only across the registered targets in its Availability Zone.
> With Application Load Balancers, cross-zone load balancing is always enabled at the load balancer level.
> At the target group level, cross-zone load balancing can be disabled.
> With Network Load Balancers and Gateway Load Balancers, cross-zone load balancing is disabled by default.
> After you create the load balancer, you can enable or disable cross-zone load balancing at any time.

## S3 Network Load Balancers — Cross-zone load balancing
url: https://docs.aws.amazon.com/elasticloadbalancing/latest/network/network-load-balancers.html#cross-zone-load-balancing
fetched: 2026-11-26
> By default, each Network Load Balancer node distributes traffic across the registered targets in its Availability Zone only. If you turn on cross-zone load balancing, each Network Load Balancer node distributes traffic across the registered targets in all enabled Availability Zones.
> You can also turn on cross-zone load balancing at the target group level.

## S4 Network Load Balancers — Load balancer zonal health
url: https://docs.aws.amazon.com/elasticloadbalancing/latest/network/network-load-balancers.html#load-balancer-zonal-health
fetched: 2026-11-26
> Network Load Balancers have zonal DNS records and IP addresses in Route 53 for each enabled availability zone. When a Network Load Balancer fails a zonal health check for a particular availability zone, its DNS record is removed from Route 53.

## S5 Edit target group attributes for your Application Load Balancer — Cross-zone load balancing
url: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/edit-target-group-attributes.html#modify-cross-zone
fetched: 2026-11-26
> When cross-zone load balancing is on, each load balancer node distributes traffic across the registered targets in all registered Availability Zones. When cross-zone load balancing is off, each load balancer node distributes traffic only across the registered targets in its Availability Zone.
> With Application Load Balancers, cross-zone load balancing is always turned on at the load balancer level, and cannot be turned off. For target groups, the default is to use the load balancer setting, but you can override the default by explicitly turning cross-zone load balancing off at the target group level.
> Target stickiness is not supported when cross-zone load balancing is off.

## S6 Edit target group attributes for your Application Load Balancer — Best practices for cross-zone load balancing off
url: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/edit-target-group-attributes.html#modify-cross-zone
fetched: 2026-11-26
> When configuring your Application Load Balancer with multiple target groups, ensure all target groups are participating in the same Availability Zones, within the configured Region. This is to avoid an Availability Zone being empty while cross-zone load balancing is off, as this triggers a 503 error for all HTTP requests that enter the empty Availability Zone.

## S7 Auto Scaling group Availability Zone distribution — Balanced best effort and Balanced only
url: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-availability-zone-balanced.html#ec2-auto-scaling-availability-zone-balanced
fetched: 2026-11-26
> Auto Scaling maintains an equal number of instances across enabled Availability Zones. If launch attempts fail in an Availability Zone, Auto Scaling attempts to launch instances in another healthy Availability Zone.
> Auto Scaling maintains an equal number of instances across enabled Availability Zones. If launch attempts fail in an Availability Zone, Auto Scaling will continue to attempt to launch instances in the Availability Zone.

## S8 Health checks for Application Load Balancer target groups — Health check settings
url: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html#health-check-settings
fetched: 2026-11-26
> The load balancer sends a health check request to each registered target every HealthCheckIntervalSeconds seconds, using the specified port, protocol, and health check path.
> If the health checks exceed UnhealthyThresholdCount consecutive failures, the load balancer takes the target out of service. When the health checks exceed HealthyThresholdCount consecutive successes, the load balancer puts the target back in service.
