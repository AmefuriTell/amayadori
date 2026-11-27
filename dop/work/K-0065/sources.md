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

## S21 Disaster Recovery of Workloads on AWS: Recovery in the Cloud — Disaster Recovery of Workloads on AWS: Recovery in the Cloud
url: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-workloads-on-aws.html#disaster-recovery-workloads-on-aws
fetched: 2026-11-25
> Disaster recovery is the process of preparing for and recovering from a disaster. An event that prevents a workload or system from fulfilling its business objectives in its primary deployed location is considered a disaster. This paper outlines the best practices for planning and testing disaster recovery for any workload deployed to AWS, and offers different approaches to mitigate risks and meet the Recovery Time Objective (RTO) and Recovery Point Objective (RPO) for that workload.

## S22 AWS Resilience Hub concepts — Recovery point objective (RPO)
url: https://docs.aws.amazon.com/resilience-hub/latest/userguide/concepts-terms.html#RPO
fetched: 2026-11-25
> The maximum acceptable amount of time since the last data recovery point. This determines what is considered an acceptable loss of data between the last recovery point and the interruption of service.

## S23 AWS Resilience Hub concepts — Recovery time objective (RTO)
url: https://docs.aws.amazon.com/resilience-hub/latest/userguide/concepts-terms.html#RTO
fetched: 2026-11-25
> The maximum acceptable delay between the interruption of service and restoration of service. This determines what is considered an acceptable time window when service is unavailable.

## S24 AWS Resilience Hub concepts — Disruption type
url: https://docs.aws.amazon.com/resilience-hub/latest/userguide/concepts-terms.html#disruption
fetched: 2026-11-25
> AWS Resilience Hub helps you assess resiliency against the following types of outages:
> One or more Availability Zones are unavailable. This type of outage can be resolved by switching to a different Availability Zone.
> One or more Regions are unavailable. This type of incident can be resolved by switching to a different AWS Region.

## S25 AWS Resilience Hub – Resilience management — How AWS Resilience Hub works
url: https://docs.aws.amazon.com/resilience-hub/latest/userguide/arh-mgmt.html#how-it-works
fetched: 2026-11-25
> Define the resilience policies for your applications. These policies include RTO and RPO targets for applications, infrastructure, Availability Zone, and Region disruptions. These targets are used to estimate whether the application meets the resiliency policy.

## S26 Disaster recovery options in the cloud — Disaster recovery options in the cloud
url: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html#disaster-recovery-options-in-the-cloud
fetched: 2026-11-25
> Disaster recovery strategies available to you within AWS can be broadly categorized into four approaches, ranging from the low cost and low complexity of making backups to more complex strategies using multiple active Regions.
> Active/passive strategies use an active site (such as an AWS Region) to host the workload and serve traffic.
> The passive site (such as a different AWS Region) is used for recovery.
> The passive site does not actively serve traffic until a failover event is triggered.

## S27 Disaster recovery options in the cloud — Backup and restore
url: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html#backup-and-restore
fetched: 2026-11-25
> Backup and restore is a suitable approach for mitigating against data loss or corruption.
> This approach can also be used to mitigate against a regional disaster by replicating data to other AWS Regions, or to mitigate lack of redundancy for workloads deployed to a single Availability Zone.
> In addition to data, you must redeploy the infrastructure, configuration, and application code in the recovery Region.
> Without IaC, it may be complex to restore workloads in the recovery Region, which will lead to increased recovery times and possibly exceed your RTO.

## S28 Disaster recovery options in the cloud — AWS services (Backup and restore)
url: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html#aws-services
fetched: 2026-11-25
> How often you run your backup will determine your achievable recovery point (which should align to meet your RPO).
> Any data stored in the disaster recovery Region as backups must be restored at time of failover.

## S29 Disaster recovery options in the cloud — Pilot light
url: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html#pilot-light
fetched: 2026-11-25
> With the pilot light approach, you replicate your data from one Region to another and provision a copy of your core workload infrastructure.
> Resources required to support data replication and backup, such as databases and object storage, are always on.
> Other elements, such as application servers, are loaded with application code and configurations, but are "switched off" and are only used during testing or when disaster recovery failover is invoked.
> A pilot light approach minimizes the ongoing cost of disaster recovery by minimizing the active resources, and simplifies recovery at the time of a disaster because the core infrastructure requirements are all in place.
> Unlike the backup and restore approach, your core infrastructure is always available and you always have the option to quickly provision a full scale production environment by switching on and scaling out your application servers.

## S30 Disaster recovery options in the cloud — AWS services (Pilot light)
url: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html#aws-services-1
fetched: 2026-11-25
> For pilot light, continuous data replication to live databases and data stores in the DR region is the best approach for low RPO (when used in addition to the point-in-time backups discussed previously).
> A scaled down version of your core workload infrastructure with fewer or smaller resources must be deployed in your DR Region.
> For an active/passive configuration such as pilot light, all traffic initially goes to the primary Region and switches to the disaster recovery Region if the primary Region is no longer available.

## S31 Disaster recovery options in the cloud — Warm standby
url: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html#warm-standby
fetched: 2026-11-25
> The warm standby approach involves ensuring that there is a scaled down, but fully functional, copy of your production environment in another Region.
> This approach extends the pilot light concept and decreases the time to recovery because your workload is always-on in another Region.

## S32 Disaster recovery options in the cloud — Warm standby (pilot light と warm standby の違い)
url: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html#warm-standby
fetched: 2026-11-25
> Note: The difference between pilot light and warm standby can sometimes be difficult to understand.
> Both include an environment in your DR Region with copies of your primary Region assets.
> The distinction is that pilot light cannot process requests without additional action taken first, whereas warm standby can handle traffic (at reduced capacity levels) immediately.
> The pilot light approach requires you to “turn on” servers, possibly deploy additional (non-core) infrastructure, and scale up, whereas warm standby only requires you to scale up (everything is already deployed and running).
> Use your RTO and RPO needs to help you choose between these approaches.

## S33 Disaster recovery options in the cloud — Multi-site active/active
url: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html#multi-site-activeactive
fetched: 2026-11-25
> Multi-site active/active serves traffic from all regions to which it is deployed, whereas hot standby serves traffic only from a single region, and the other Region(s) are only used for disaster recovery.
> With a multi-site active/active approach, users are able to access your workload in any of the Regions in which it is deployed.
> This approach is the most complex and costly approach to disaster recovery, but it can reduce your recovery time to near zero for most disasters with the correct technology choices and implementation (however data corruption may need to rely on backups, which usually results in a non-zero recovery point).
> Most customers find that if they are going to stand up a full environment in the second Region, it makes sense to use it active/active.
> Alternatively, if you do not want to use both Regions to handle user traffic, then Warm Standby offers a more economical and operationally less complex approach.

## S34 Disaster recovery options in the cloud — AWS services (Multi-site active/active)
url: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html#aws-services-3
fetched: 2026-11-25
> Asynchronous data replication with this strategy enables near-zero RPO.

## S35 NAT gateway basics — NAT gateway basics
url: https://docs.aws.amazon.com/vpc/latest/userguide/nat-gateway-basics.html#nat-gateway-basics
fetched: 2026-11-26
> Each NAT gateway is created in a specific Availability Zone and implemented with redundancy in that zone. If you have resources in multiple Availability Zones and they share one NAT gateway, and if the NAT gateway's Availability Zone is down, resources in the other Availability Zones lose internet access. To improve resiliency, create a NAT gateway in each Availability Zone, and configure your routing to ensure that resources use the NAT gateway in the same Availability Zone.

## S36 Regional NAT gateways for automatic multi-AZ expansion — Regional NAT gateways for automatic multi-AZ expansion
url: https://docs.aws.amazon.com/vpc/latest/userguide/nat-gateways-regional.html#nat-gateways-regional
fetched: 2026-11-26
> Unlike standard NAT gateways (referred to as zonal NAT gateways), which operate in a single Availability Zone, regional NAT gateways follow your workloads to provide automatic high availability.

## S37 Elastic Load Balancing: How it works — Availability Zones and load balancer nodes
url: https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/how-elastic-load-balancing-works.html#availability-zones
fetched: 2026-11-26
> When you enable an Availability Zone for your load balancer, Elastic Load Balancing creates a load balancer node in the Availability Zone. We recommend enabling multiple Availability Zones for all load balancers. With an Application Load Balancer however, it is a requirement that you enable at least two or more Availability Zones. This configuration helps ensure that the load balancer can continue to route traffic. If one Availability Zone becomes unavailable or has no healthy targets, the load balancer can route traffic to the healthy targets in another Availability Zone.

## S38 Elastic Load Balancing: How it works — Cross-zone load balancing
url: https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/how-elastic-load-balancing-works.html#cross-zone-load-balancing
fetched: 2026-11-26
> The nodes for your load balancer distribute requests from clients to registered targets. When cross-zone load balancing is enabled, each load balancer node distributes traffic across the registered targets in all enabled Availability Zones. When cross-zone load balancing is disabled, each load balancer node distributes traffic only across the registered targets in its Availability Zone.

## S39 Resilience in Elastic Load Balancing — Resilience in Elastic Load Balancing
url: https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/disaster-recovery-resiliency.html#disaster-recovery-resiliency
fetched: 2026-11-26
> Distributes incoming traffic across multiple instances in a single Availability Zone or multiple Availability Zones.

## S40 Auto Scaling group Availability Zone distribution — Balanced best effort
url: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-availability-zone-balanced.html#ec2-auto-scaling-availability-zone-balanced
fetched: 2026-11-26
> Auto Scaling maintains an equal number of instances across enabled Availability Zones. If launch attempts fail in an Availability Zone, Auto Scaling attempts to launch instances in another healthy Availability Zone. This strategy is important for applications that need Availability Zone redundancy and are not impacted by imbalanced groups.

## S41 Minimizing downtime in ElastiCache by using Multi-AZ with Valkey and Redis OSS — Automatic failover and Multi-AZ
url: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/AutoFailover.html#AutoFailover.Understanding
fetched: 2026-11-26
> Multi-AZ is the recommended configuration for high availability in ElastiCache. When you enable Multi-AZ, ElastiCache distributes your replicas across different Availability Zones and enables automatic failover. If the primary node fails, ElastiCache automatically promotes the replica with the least replication lag to primary. Multi-AZ requires at least one replica in a different Availability Zone from the primary. If Multi-AZ is not enabled and a primary node fails, ElastiCache takes the primary offline and provisions a new primary node. While it is possible to have automatic failover enabled without Multi-AZ, replicas are not guaranteed to be in different Availability Zones in this configuration.

## S42 Global tables - multi-active, multi-Region replication — Global tables
url: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GlobalTables.html#GlobalTables
fetched: 2026-11-26
> Amazon DynamoDB global tables is a fully managed, multi-Region, and multi-active database feature that provides easy to use data replication and fast local read and write performance for globally scaled applications. Global tables automatically replicate your DynamoDB table data across AWS Regions and optionally across AWS accounts without requiring you to build and maintain your own replication solution. Global tables are ideal for applications requiring business continuity and high availability through multi-Region deployment. Any global table replica can serve reads and writes. Applications can achieve high resilience with a low or zero Recovery Point Objective (RPO) by shifting traffic to a different Region if application processing is interrupted in a Region. Global tables are available in all Regions where DynamoDB is available.

## S43 Global tables - multi-active, multi-Region replication — Consistency modes
url: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GlobalTables.html#GlobalTables.consistency-modes
fetched: 2026-11-26
> When you create a global table, you can configure its consistency mode. Global tables support two consistency modes: multi-Region eventual consistency (MREC) and multi-Region strong consistency (MRSC). If you do not specify a consistency mode when creating a global table, the global table defaults to multi-Region eventual consistency (MREC). A global table cannot contain replicas configured with different consistency modes. You cannot change a global table's consistency mode after creation.

## S44 Using Amazon Aurora Global Database — Introduction
url: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html#aurora-global-database
fetched: 2026-11-26
> With the Amazon Aurora Global Database feature, you set up multiple Aurora DB clusters that span multiple AWS Regions. Aurora automatically synchronizes all changes made in the primary DB cluster to one or more secondary clusters. An Aurora global database has a primary DB cluster in one Region, and up to 10 secondary DB clusters in different Regions. This multi-Region configuration provides fast recovery from the rare outage that might affect an entire AWS Region.

## S45 Using Amazon Aurora Global Database — Overview of Amazon Aurora Global Database
url: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html#aurora-global-database-overview
fetched: 2026-11-26
> By using the Amazon Aurora Global Database feature, you can run your globally distributed applications using a single Aurora database that spans multiple AWS Regions. An Aurora global database consists of one primary AWS Region where your data is written, and up to 10 read-only secondary AWS Regions. You issue write operations to the primary DB cluster in the primary AWS Region. The most convenient way to do so is to connect to the Aurora Global Database writer endpoint, which always points to the primary DB cluster, even after a switchover or failover to a different AWS Region. After any write operation, Aurora replicates data to the secondary AWS Regions using dedicated infrastructure, with latency typically under a second.

## S46 Using Amazon Aurora Global Database — Using switchover or failover
url: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html#aurora-global-database-overview
fetched: 2026-11-26
> Aurora Global Database supports two different operations for changing the Region of your primary DB cluster, depending on the scenario: Aurora Global Database switchover and Aurora Global Database failover. For planned operational procedures such as Regional rotation, use the switchover mechanism (previously called "managed planned failover"). With this feature, you can relocate the primary cluster of a healthy Aurora Global Database to one of its secondary Regions with no data loss. To learn more, see Performing switchovers for Amazon Aurora global databases. To recover your Aurora Global Database after an outage in the primary Region, use the failover mechanism. With this feature, you perform a failover from your primary DB cluster to another Region (cross-Region failover). To learn more, see Performing managed failovers for Aurora global databases.

## S47 Replicating objects within and across Regions — Replicating objects within and across Regions
url: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html#replication
fetched: 2026-11-26
> You can use replication to enable automatic, asynchronous copying of objects across Amazon S3 buckets. Buckets that are configured for object replication can be owned by the same AWS account or by different accounts. You can replicate objects to a single destination bucket or to multiple destination buckets. The destination buckets can be in different AWS Regions or within the same Region as the source bucket.

## S48 Replicating objects within and across Regions — Why use replication?
url: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html#replication-scenario
fetched: 2026-11-26
> Replicate objects and fail over to a bucket in another AWS Region – To keep all metadata and objects in sync across buckets during data replication, use two-way replication (also known as bi-directional replication) rules before configuring Amazon S3 Multi-Region Access Point failover controls. Two-way replication rules help ensure that when data is written to the S3 bucket that traffic fails over to, that data is then replicated back to the source bucket.

## S49 Replicating objects within and across Regions — When to use Cross-Region Replication
url: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html#crr-scenario
fetched: 2026-11-26
> S3 Cross-Region Replication (CRR) is used to copy objects across Amazon S3 buckets in different AWS Regions. CRR can help you do the following: Meet compliance requirements – Although Amazon S3 stores your data across multiple geographically distant Availability Zones by default, compliance requirements might dictate that you store data at even greater distances. To satisfy these requirements, use Cross-Region Replication to replicate data between distant AWS Regions.

## S50 Configuring DNS failover — Configuring DNS failover (intro)
url: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-configuring.html#dns-failover-configuring
fetched: 2026-11-26
> When you have more than one resource performing the same function—for example, more than one HTTP server or mail server—you can configure Amazon Route 53 to check the health of your resources and respond to DNS queries using only the healthy resources. For example, suppose your website, example.com, is hosted on six servers, two each in three data centers around the world. You can configure Route 53 to check the health of those servers and to respond to DNS queries for example.com using only the servers that are currently healthy.

## S51 Configuring DNS failover — Configuring DNS failover (health checks)
url: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-configuring.html#dns-failover-configuring
fetched: 2026-11-26
> Route 53 can check the health of your resources in both simple and complex configurations: In simple configurations, you create a group of records that all have the same name and type, such as a group of weighted records with a type of A for example.com. You then configure Route 53 to check the health of the corresponding resources. Route 53 responds to DNS queries based on the health of your resources.

## S52 Optimize high availability with CloudFront origin failover — Introduction
url: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/high_availability_origin_failover.html#high_availability_origin_failover
fetched: 2026-11-26
> You can set up CloudFront with origin failover for scenarios that require high availability. To get started, you create an origin group with two origins: a primary and a secondary. If the primary origin is unavailable, or returns specific HTTP response status codes that indicate a failure, CloudFront automatically switches to the secondary origin.

## S53 Optimize high availability with CloudFront origin failover — Failover behavior
url: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/high_availability_origin_failover.html#high_availability_origin_failover
fetched: 2026-11-26
> CloudFront routes all incoming requests to the primary origin, even when a previous request failed over to the secondary origin. CloudFront only sends requests to the secondary origin after a request to the primary origin fails. CloudFront fails over to the secondary origin only when the HTTP method of the viewer request is GET, HEAD, or OPTIONS. CloudFront does not fail over when the viewer sends a different HTTP method (for example POST, PUT, and so on).

## S54 Creating a read replica in a different AWS Region — Introduction
url: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.XRgn.html#USER_ReadRepl.XRgn
fetched: 2026-11-26
> With Amazon RDS, you can create a read replica in a different AWS Region from the source DB instance. You create a read replica in a different AWS Region to do the following: Improve your disaster recovery capabilities. Scale read operations into an AWS Region closer to your users. Make it easier to migrate from a data center in one AWS Region to a data center in another AWS Region.

## S55 Creating a read replica in a different AWS Region — How Amazon RDS does cross-Region replication
url: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.XRgn.html#USER_ReadRepl.XRgn.Process
fetched: 2026-11-26
> Amazon RDS uses the following process to create a cross-Region read replica. Depending on the AWS Regions involved and the amount of data in the databases, this process can take hours to complete. You can use this information to determine how far the process has proceeded when you create a cross-Region read replica:

## S56 Creating a read replica in a different AWS Region — How Amazon RDS does cross-Region replication
url: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.XRgn.html#USER_ReadRepl.XRgn.Process
fetched: 2026-11-26
> When the read replica reaches the available status, Amazon RDS starts by replicating the changes made to the source instance since the start of the create read replica operation. During this phase, the replication lag time for the read replica is greater than 0.

## S57 How Elastic Load Balancing works — Availability Zones and load balancer nodes
url: https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/how-elastic-load-balancing-works.html#availability-zones
fetched: 2026-11-26
> When you enable an Availability Zone for your load balancer, Elastic Load Balancing creates a load balancer node in the Availability Zone. If you register targets in an Availability Zone but do not enable the Availability Zone, these registered targets do not receive traffic.
> We recommend enabling multiple Availability Zones for all load balancers. With an Application Load Balancer however, it is a requirement that you enable at least two or more Availability Zones.
> If one Availability Zone becomes unavailable or has no healthy targets, the load balancer can route traffic to the healthy targets in another Availability Zone.

## S58 How Elastic Load Balancing works — Cross-zone load balancing
url: https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/how-elastic-load-balancing-works.html#cross-zone-load-balancing
fetched: 2026-11-26
> The nodes for your load balancer distribute requests from clients to registered targets. When cross-zone load balancing is enabled, each load balancer node distributes traffic across the registered targets in all enabled Availability Zones. When cross-zone load balancing is disabled, each load balancer node distributes traffic only across the registered targets in its Availability Zone.
> With Application Load Balancers, cross-zone load balancing is always enabled at the load balancer level.
> At the target group level, cross-zone load balancing can be disabled.
> With Network Load Balancers and Gateway Load Balancers, cross-zone load balancing is disabled by default.
> After you create the load balancer, you can enable or disable cross-zone load balancing at any time.

## S59 Network Load Balancers — Cross-zone load balancing
url: https://docs.aws.amazon.com/elasticloadbalancing/latest/network/network-load-balancers.html#cross-zone-load-balancing
fetched: 2026-11-26
> By default, each Network Load Balancer node distributes traffic across the registered targets in its Availability Zone only. If you turn on cross-zone load balancing, each Network Load Balancer node distributes traffic across the registered targets in all enabled Availability Zones.
> You can also turn on cross-zone load balancing at the target group level.

## S60 Network Load Balancers — Load balancer zonal health
url: https://docs.aws.amazon.com/elasticloadbalancing/latest/network/network-load-balancers.html#load-balancer-zonal-health
fetched: 2026-11-26
> Network Load Balancers have zonal DNS records and IP addresses in Route 53 for each enabled availability zone. When a Network Load Balancer fails a zonal health check for a particular availability zone, its DNS record is removed from Route 53.

## S61 Edit target group attributes for your Application Load Balancer — Cross-zone load balancing
url: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/edit-target-group-attributes.html#modify-cross-zone
fetched: 2026-11-26
> When cross-zone load balancing is on, each load balancer node distributes traffic across the registered targets in all registered Availability Zones. When cross-zone load balancing is off, each load balancer node distributes traffic only across the registered targets in its Availability Zone.
> With Application Load Balancers, cross-zone load balancing is always turned on at the load balancer level, and cannot be turned off. For target groups, the default is to use the load balancer setting, but you can override the default by explicitly turning cross-zone load balancing off at the target group level.
> Target stickiness is not supported when cross-zone load balancing is off.

## S62 Edit target group attributes for your Application Load Balancer — Best practices for cross-zone load balancing off
url: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/edit-target-group-attributes.html#modify-cross-zone
fetched: 2026-11-26
> When configuring your Application Load Balancer with multiple target groups, ensure all target groups are participating in the same Availability Zones, within the configured Region. This is to avoid an Availability Zone being empty while cross-zone load balancing is off, as this triggers a 503 error for all HTTP requests that enter the empty Availability Zone.

## S63 Auto Scaling group Availability Zone distribution — Balanced best effort and Balanced only
url: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-availability-zone-balanced.html#ec2-auto-scaling-availability-zone-balanced
fetched: 2026-11-26
> Auto Scaling maintains an equal number of instances across enabled Availability Zones. If launch attempts fail in an Availability Zone, Auto Scaling attempts to launch instances in another healthy Availability Zone.
> Auto Scaling maintains an equal number of instances across enabled Availability Zones. If launch attempts fail in an Availability Zone, Auto Scaling will continue to attempt to launch instances in the Availability Zone.

## S64 Health checks for Application Load Balancer target groups — Health check settings
url: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html#health-check-settings
fetched: 2026-11-26
> The load balancer sends a health check request to each registered target every HealthCheckIntervalSeconds seconds, using the specified port, protocol, and health check path.
> If the health checks exceed UnhealthyThresholdCount consecutive failures, the load balancer takes the target out of service. When the health checks exceed HealthyThresholdCount consecutive successes, the load balancer puts the target back in service.

## S65 Configuring and managing a Multi-AZ deployment for Amazon RDS — Multi-AZ DB instance と Multi-AZ DB cluster
url: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html#Concepts.MultiAZ
fetched: 2026-11-26
> Multi-AZ deployments can have one standby or two standby DB instances.
> A Multi-AZ DB instance deployment has one standby DB instance that provides failover support, but doesn't serve read traffic.
> A Multi-AZ DB cluster deployment has standby DB instances that provide failover support and can also serve read traffic.

## S66 Multi-AZ DB cluster deployments for Amazon RDS — Multi-AZ DB cluster architecture
url: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/multi-az-db-clusters-concepts.html#multi-az-db-clusters-concepts-overview
fetched: 2026-11-26
> Multi-AZ DB cluster deployments use semisynchronous replication, which requires acknowledgment from at least one reader DB instance in order for a change to be committed.
> Reader DB instances act as automatic failover targets and also serve read traffic to increase application read throughput.
> If an outage occurs on your writer DB instance, RDS manages failover to one of the reader DB instances.
> RDS does this based on which reader DB instance has the most recent change record.

## S67 Multi-AZ DB cluster deployments for Amazon RDS — Replica lag and Multi-AZ DB clusters
url: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/multi-az-db-clusters-concepts.html#multi-az-db-clusters-concepts-replica-lag
fetched: 2026-11-26
> Because any failover must first resolve the replica lag before it promotes a new writer DB instance, monitoring and managing this replica lag is a consideration.
> For RDS for MySQL Multi-AZ DB clusters, failover time depends on replica lag of both remaining reader DB instances.

## S68 Multi-AZ DB cluster deployments for Amazon RDS — RDS Proxy with Multi-AZ DB clusters
url: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/multi-az-db-clusters-concepts.html#multi-az-db-clusters-proxy
fetched: 2026-11-26
> RDS Proxy can also reduce the downtime for a minor version upgrade of a Multi-AZ DB cluster to one second or less.

## S69 Minimizing downtime in ElastiCache by using Multi-AZ with Valkey and Redis OSS — Automatic failover and Multi-AZ
url: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/AutoFailover.html#AutoFailover.Understanding
fetched: 2026-11-26
> Multi-AZ is the recommended configuration for high availability in ElastiCache.
> When you enable Multi-AZ, ElastiCache distributes your replicas across different Availability Zones and enables automatic failover.
> If the primary node fails, ElastiCache automatically promotes the replica with the least replication lag to primary.
> Multi-AZ requires at least one replica in a different Availability Zone from the primary.

## S70 Minimizing downtime in ElastiCache by using Multi-AZ with Valkey and Redis OSS — Minimizing downtime（DNS 名とエンドポイント）
url: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/AutoFailover.html#AutoFailover
fetched: 2026-11-26
> The role of primary node will automatically fail over to one of the read replicas.
> ElastiCache also propagates the Domain Name Service (DNS) name of the promoted replica.
> If you are reading from individual endpoints, make sure that you change the read endpoint of the replica promoted to primary to the new replica's endpoint.
> Multi-AZ is only supported on Valkey and Redis OSS clusters with more than one node in each shard.

## S71 Zonal shift in ARC — Zonal shift in ARC
url: https://docs.aws.amazon.com/r53recovery/latest/dg/arc-zonal-shift.html#arc-zonal-shift
fetched: 2026-11-26
> Amazon Application Recovery Controller (ARC) zonal shift allows you to shift traffic for a supported resource away from an impaired Availability Zone (AZ) in an AWS Region to healthy AZs in the same Region.
> You must opt-in resources in order to use zonal shift.
> Before you start a zonal shift, you must prescale your application and ensure that you have sufficient capacity to shift traffic away from an Availability Zone.
> All zonal shifts are temporary mitigations.
> You set an initial expiration when you start a zonal shift, from one minute up to three days (72 hours), which you can extend, if you need to continue the traffic shift.

## S72 Active-active and active-passive failover — Active-active failover と Active-passive failover
url: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-types.html#dns-failover-types
fetched: 2026-11-26
> You can use Route 53 health checking to configure active-active and active-passive failover configurations.
> Use this failover configuration when you want all of your resources to be available the majority of the time.
> Use an active-passive failover configuration when you want a primary resource or group of resources to be available the majority of the time and you want a secondary resource or group of resources to be on standby in case all the primary resources become unavailable.
> When responding to queries, Route 53 includes only the healthy primary resources.
> If all the primary resources are unhealthy, Route 53 begins to include only the healthy secondary resources in response to DNS queries.
