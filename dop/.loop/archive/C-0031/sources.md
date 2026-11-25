# 出典: C-0031 Identifying and remediating single points of failure in existing workloads

## S1 NAT gateway basics — NAT gateway basics
url: https://docs.aws.amazon.com/vpc/latest/userguide/nat-gateway-basics.html#nat-gateway-basics
fetched: 2026-11-26
> Each NAT gateway is created in a specific Availability Zone and implemented with redundancy in that zone. If you have resources in multiple Availability Zones and they share one NAT gateway, and if the NAT gateway's Availability Zone is down, resources in the other Availability Zones lose internet access. To improve resiliency, create a NAT gateway in each Availability Zone, and configure your routing to ensure that resources use the NAT gateway in the same Availability Zone.

## S2 Regional NAT gateways for automatic multi-AZ expansion — Regional NAT gateways for automatic multi-AZ expansion
url: https://docs.aws.amazon.com/vpc/latest/userguide/nat-gateways-regional.html#nat-gateways-regional
fetched: 2026-11-26
> Unlike standard NAT gateways (referred to as zonal NAT gateways), which operate in a single Availability Zone, regional NAT gateways follow your workloads to provide automatic high availability.

## S3 Elastic Load Balancing: How it works — Availability Zones and load balancer nodes
url: https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/how-elastic-load-balancing-works.html#availability-zones
fetched: 2026-11-26
> When you enable an Availability Zone for your load balancer, Elastic Load Balancing creates a load balancer node in the Availability Zone. We recommend enabling multiple Availability Zones for all load balancers. With an Application Load Balancer however, it is a requirement that you enable at least two or more Availability Zones. This configuration helps ensure that the load balancer can continue to route traffic. If one Availability Zone becomes unavailable or has no healthy targets, the load balancer can route traffic to the healthy targets in another Availability Zone.

## S4 Elastic Load Balancing: How it works — Cross-zone load balancing
url: https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/how-elastic-load-balancing-works.html#cross-zone-load-balancing
fetched: 2026-11-26
> The nodes for your load balancer distribute requests from clients to registered targets. When cross-zone load balancing is enabled, each load balancer node distributes traffic across the registered targets in all enabled Availability Zones. When cross-zone load balancing is disabled, each load balancer node distributes traffic only across the registered targets in its Availability Zone.

## S5 Resilience in Elastic Load Balancing — Resilience in Elastic Load Balancing
url: https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/disaster-recovery-resiliency.html#disaster-recovery-resiliency
fetched: 2026-11-26
> Distributes incoming traffic across multiple instances in a single Availability Zone or multiple Availability Zones.

## S6 Auto Scaling group Availability Zone distribution — Balanced best effort
url: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-availability-zone-balanced.html#ec2-auto-scaling-availability-zone-balanced
fetched: 2026-11-26
> Auto Scaling maintains an equal number of instances across enabled Availability Zones. If launch attempts fail in an Availability Zone, Auto Scaling attempts to launch instances in another healthy Availability Zone. This strategy is important for applications that need Availability Zone redundancy and are not impacted by imbalanced groups.

## S7 Minimizing downtime in ElastiCache by using Multi-AZ with Valkey and Redis OSS — Automatic failover and Multi-AZ
url: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/AutoFailover.html#AutoFailover.Understanding
fetched: 2026-11-26
> Multi-AZ is the recommended configuration for high availability in ElastiCache. When you enable Multi-AZ, ElastiCache distributes your replicas across different Availability Zones and enables automatic failover. If the primary node fails, ElastiCache automatically promotes the replica with the least replication lag to primary. Multi-AZ requires at least one replica in a different Availability Zone from the primary. If Multi-AZ is not enabled and a primary node fails, ElastiCache takes the primary offline and provisions a new primary node. While it is possible to have automatic failover enabled without Multi-AZ, replicas are not guaranteed to be in different Availability Zones in this configuration.
