# 講義の根拠: task 3.1（高可用性のソリューション）

## S1 Using Amazon Aurora Global Database — Overview of Amazon Aurora Global Database
url: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html#aurora-global-database-overview
fetched: 2026-11-27
> By using the Amazon Aurora Global Database feature, you can run your globally distributed applications using a single Aurora database that spans multiple AWS Regions.
> An Aurora global database consists of one primary AWS Region where your data is written, and up to 10 read-only secondary AWS Regions.
> After any write operation, Aurora replicates data to the secondary AWS Regions using dedicated infrastructure, with latency typically under a second.

## S2 Using Amazon Aurora Global Database — Overview of Amazon Aurora Global Database
url: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html#aurora-global-database-overview
fetched: 2026-11-27
> For planned operational procedures such as Regional rotation, use the switchover mechanism (previously called "managed planned failover").
> With this feature, you can relocate the primary cluster of a healthy Aurora Global Database to one of its secondary Regions with no data loss.
> To recover your Aurora Global Database after an outage in the primary Region, use the failover mechanism.

## S3 Configuring and managing a Multi-AZ deployment for Amazon RDS — Configuring and managing a Multi-AZ deployment for Amazon RDS
url: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html#Concepts.MultiAZ
fetched: 2026-11-27
> A Multi-AZ DB instance deployment has one standby DB instance that provides failover support, but doesn't serve read traffic.
> A Multi-AZ DB cluster deployment has standby DB instances that provide failover support and can also serve read traffic.

## S4 Multi-AZ DB cluster deployments for Amazon RDS — Multi-AZ DB cluster deployments for Amazon RDS
url: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/multi-az-db-clusters-concepts.html#multi-az-db-clusters-concepts
fetched: 2026-11-27
> A Multi-AZ DB cluster deployment is a semisynchronous, high availability deployment mode of Amazon RDS with two readable replica DB instances.
> A Multi-AZ DB cluster has a writer DB instance and two reader DB instances in three separate Availability Zones in the same AWS Region.
> Multi-AZ DB cluster deployments use semisynchronous replication, which requires acknowledgment from at least one reader DB instance in order for a change to be committed.
> Reader DB instances act as automatic failover targets and also serve read traffic to increase application read throughput.
> If an outage occurs on your writer DB instance, RDS manages failover to one of the reader DB instances.
> For RDS for MySQL Multi-AZ DB clusters, failover time depends on replica lag of both remaining reader DB instances.

## S5 Creating a read replica in a different AWS Region — Creating a read replica in a different AWS Region
url: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.XRgn.html#USER_ReadRepl.XRgn
fetched: 2026-11-27
> With Amazon RDS, you can create a read replica in a different AWS Region from the source DB instance.
> To create an encrypted read replica in a different AWS Region from the source DB instance, the source DB instance must be encrypted.

## S6 Replicating objects within and across Regions — Replicating objects within and across Regions
url: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html#replication
fetched: 2026-11-27
> You can use replication to enable automatic, asynchronous copying of objects across Amazon S3 buckets.
> Live replication – To automatically replicate new and updated objects as they are written to the source bucket, use live replication.
> Cross-Region Replication (CRR) – You can use CRR to replicate objects across Amazon S3 buckets in different AWS Regions.

## S7 Replicating objects within and across Regions — Workload requirements and live replication (SLA)
url: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html#replication-workload-requirements
fetched: 2026-11-27
> S3 RTC replicates 99.99 percent of new objects stored in Amazon S3 within 15 minutes (backed by a service-level agreement, or SLA).

## S8 Global tables - multi-active, multi-Region replication — Global tables - multi-active, multi-Region replication
url: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GlobalTables.html#GlobalTables
fetched: 2026-11-27
> Global tables automatically replicate your DynamoDB table data across AWS Regions and optionally across AWS accounts without requiring you to build and maintain your own replication solution.
> Any global table replica can serve reads and writes.
> Applications can achieve high resilience with a low or zero Recovery Point Objective (RPO) by shifting traffic to a different Region if application processing is interrupted in a Region.

## S9 Global tables - multi-active, multi-Region replication — Consistency modes
url: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GlobalTables.html#GlobalTables.consistency-modes
fetched: 2026-11-27
> Global tables support two consistency modes: multi-Region eventual consistency (MREC) and multi-Region strong consistency (MRSC).
> If you do not specify a consistency mode when creating a global table, the global table defaults to multi-Region eventual consistency (MREC).
> You cannot change a global table's consistency mode after creation.

## S10 Minimizing downtime in ElastiCache by using Multi-AZ with Valkey and Redis OSS — Automatic failover and Multi-AZ
url: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/AutoFailover.html#AutoFailover.Understanding
fetched: 2026-11-27
> When you enable Multi-AZ, ElastiCache distributes your replicas across different Availability Zones and enables automatic failover.
> If the primary node fails, ElastiCache automatically promotes the replica with the least replication lag to primary.
> Multi-AZ requires at least one replica in a different Availability Zone from the primary.
> If Multi-AZ is not enabled and a primary node fails, ElastiCache takes the primary offline and provisions a new primary node.

## S11 Optimize high availability with CloudFront origin failover — Optimize high availability with CloudFront origin failover
url: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/high_availability_origin_failover.html#high_availability_origin_failover
fetched: 2026-11-27
> To get started, you create an origin group with two origins: a primary and a secondary.
> If the primary origin is unavailable, or returns specific HTTP response status codes that indicate a failure, CloudFront automatically switches to the secondary origin.

## S12 Active-active and active-passive failover — Active-active and active-passive failover
url: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-types.html#dns-failover-types
fetched: 2026-11-27
> You can use Route 53 health checking to configure active-active and active-passive failover configurations.
> In active-active failover, all the records that have the same name, the same type (such as A or AAAA), and the same routing policy (such as weighted or latency) are active unless Route 53 considers them unhealthy.
> When the primary resource is healthy, Route 53 responds to DNS queries using the primary record.
> When the primary resource is unhealthy, Route 53 responds to DNS queries using the secondary record.

## S13 AWS Resilience Hub concepts — Resiliency
url: https://docs.aws.amazon.com/resilience-hub/latest/userguide/concepts-terms.html#resiliency
fetched: 2026-11-27
> The ability to maintain availability and to recover from software and operational disruption in a designated time frame.

## S14 AWS Resilience Hub concepts — Recovery point objective (RPO) / Recovery time objective (RTO)
url: https://docs.aws.amazon.com/resilience-hub/latest/userguide/concepts-terms.html#RPO
fetched: 2026-11-27
> The maximum acceptable amount of time since the last data recovery point.
> The maximum acceptable delay between the interruption of service and restoration of service.

## S15 Disaster recovery options in the cloud — Warm standby
url: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html#warm-standby
fetched: 2026-11-27
> The warm standby approach involves ensuring that there is a scaled down, but fully functional, copy of your production environment in another Region.
> This approach extends the pilot light concept and decreases the time to recovery because your workload is always-on in another Region.

## S16 Auto Scaling group Availability Zone distribution — Auto Scaling group Availability Zone distribution
url: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-availability-zone-balanced.html#ec2-auto-scaling-availability-zone-balanced
fetched: 2026-11-27
> Auto Scaling maintains an equal number of instances across enabled Availability Zones.
> If launch attempts fail in an Availability Zone, Auto Scaling attempts to launch instances in another healthy Availability Zone.

## S17 Edit target group attributes for your Application Load Balancer — Cross-zone load balancing
url: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/edit-target-group-attributes.html#modify-cross-zone
fetched: 2026-11-27
> When cross-zone load balancing is on, each load balancer node distributes traffic across the registered targets in all registered Availability Zones.
> When cross-zone load balancing is off, each load balancer node distributes traffic only across the registered targets in its Availability Zone.
> With Application Load Balancers, cross-zone load balancing is always turned on at the load balancer level, and cannot be turned off.

## S18 NAT gateway basics — NAT gateway basics
url: https://docs.aws.amazon.com/vpc/latest/userguide/nat-gateway-basics.html#nat-gateway-basics
fetched: 2026-11-27
> Each NAT gateway is created in a specific Availability Zone and implemented with redundancy in that zone.
> If you have resources in multiple Availability Zones and they share one NAT gateway, and if the NAT gateway's Availability Zone is down, resources in the other Availability Zones lose internet access.
> To improve resiliency, create a NAT gateway in each Availability Zone, and configure your routing to ensure that resources use the NAT gateway in the same Availability Zone.

## S19 Zonal shift in ARC — Zonal shift in ARC
url: https://docs.aws.amazon.com/r53recovery/latest/dg/arc-zonal-shift.html#arc-zonal-shift
fetched: 2026-11-27
> Shifting your resource's traffic away from an impaired AZ reduces the duration and severity of impact caused by power outages, or hardware or software issues in an AZ, and helps to mitigate issues and quickly recover your application.
> Before you start a zonal shift, you must prescale your application and ensure that you have sufficient capacity to shift traffic away from an Availability Zone.

## S20 Resilience in Elastic Load Balancing — Resilience in Elastic Load Balancing
url: https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/disaster-recovery-resiliency.html#disaster-recovery-resiliency
fetched: 2026-11-27
> With Availability Zones, you can design and operate applications and databases that automatically fail over between zones without interruption.
