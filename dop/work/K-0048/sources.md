# 講義の根拠: task 3.3（RTO と RPO の要件を満たす自動の復旧の処理）

## S1 Using switchover or failover in Amazon Aurora Global Database — Planning for business continuity and disaster recovery
url: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html#aurora-global-database-bcdr-planning
fetched: 2026-11-27
> Recovery time objective (RTO) – The time it takes a system to return to a working state after a disaster or service outage. In other words, RTO measures downtime. For Aurora Global Database, RTO can be in the order of minutes.

## S2 Using switchover or failover in Amazon Aurora Global Database — Planning for business continuity and disaster recovery
url: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html#aurora-global-database-bcdr-planning
fetched: 2026-11-27
> Recovery point objective (RPO) – The amount of data that can be lost (measured in time) after a disaster or service outage. This data loss is usually due to asynchronous replication lag. For an Aurora global database, RPO is typically measured in seconds.

## S3 Disaster recovery options in the cloud — Backup and restore
url: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html#backup-and-restore
fetched: 2026-11-27
> Backup and restore is a suitable approach for mitigating against data loss or corruption.
> In addition to data, you must redeploy the infrastructure, configuration, and application code in the recovery Region.

## S4 Disaster recovery options in the cloud — Pilot light
url: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html#pilot-light
fetched: 2026-11-27
> Resources required to support data replication and backup, such as databases and object storage, are always on. Other elements, such as application servers, are loaded with application code and configurations, but are "switched off" and are only used during testing or when disaster recovery failover is invoked.

## S5 Disaster recovery options in the cloud — Warm standby
url: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html#warm-standby
fetched: 2026-11-27
> The distinction is that pilot light cannot process requests without additional action taken first, whereas warm standby can handle traffic (at reduced capacity levels) immediately.

## S6 Using switchover or failover in Amazon Aurora Global Database — Recovering an Amazon Aurora global database from an unplanned outage
url: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html#aurora-global-database-failover
fetched: 2026-11-27
> Failover – Use this approach to recover from an unplanned outage.
> With this approach, you perform a cross-Region failover to one of the secondary DB clusters in your Aurora global database.

## S7 Using switchover or failover in Amazon Aurora Global Database — Performing manual failovers for Aurora global databases
url: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html#aurora-global-database-failover.manual-unplanned
fetched: 2026-11-27
> Stop issuing DML statements and other write operations to the primary Aurora DB cluster in the AWS Region with the outage.
> Make sure to test your plan to check that your procedures are complete and accurate, and that staff are trained to perform a disaster recovery failover before it really happens.

## S8 Health checks for instances in an Auto Scaling group — Health checks for instances in an Auto Scaling group
url: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-health-checks.html#ec2-auto-scaling-health-checks
fetched: 2026-11-27
> When Amazon EC2 Auto Scaling determines that an InService instance is unhealthy, it replaces it with a new instance to maintain the desired capacity of the group.

## S9 Failing over a Multi-AZ DB instance for Amazon RDS — Failing over a Multi-AZ DB instance for Amazon RDS
url: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.Failover.html#Concepts.MultiAZ.Failover
fetched: 2026-11-27
> If a planned or unplanned outage of your Multi-AZ DB instance results from an infrastructure defect, Amazon RDS automatically switches to a standby replica in another Availability Zone.
> Failover times are typically 60–120 seconds.

## S10 How health checks work in complex Amazon Route 53 configurations — How health checks work in complex Amazon Route 53 configurations
url: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-complex-configs.html#dns-failover-complex-configs
fetched: 2026-11-27
> For both latency alias records, you set the value of Evaluate Target Health to Yes.
> This causes Route 53 to determine whether there are any healthy resources in a Region before trying to route traffic there.

## S11 Creating Amazon Route 53 health checks — Creating Amazon Route 53 health checks
url: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover.html#dns-failover
fetched: 2026-11-27
> Amazon Route 53 health checks monitor the health and performance of your web applications, web servers, and other resources.

## S12 Optimize high availability with CloudFront origin failover — Optimize high availability with CloudFront origin failover
url: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/high_availability_origin_failover.html#high_availability_origin_failover
fetched: 2026-11-27
> To get started, you create an origin group with two origins: a primary and a secondary.
> If the primary origin is unavailable, or returns specific HTTP response status codes that indicate a failure, CloudFront automatically switches to the secondary origin.

## S13 What is AWS Fault Injection Service? — What is AWS Fault Injection Service?
url: https://docs.aws.amazon.com/fis/latest/userguide/what-is.html#what-is
fetched: 2026-11-27
> AWS FIS carries out real actions on real AWS resources in your system.
> Therefore, before you use AWS FIS to run experiments in production, we strongly recommend that you complete a planning phase and run the experiments in a pre-production environment.

## S14 Using switchover or failover in Amazon Aurora Global Database — Performing switchovers for Amazon Aurora global databases
url: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html#aurora-global-database-disaster-recovery.managed-failover
fetched: 2026-11-27
> Switchover – This operation was previously called "managed planned failover". Use this approach for controlled scenarios, such as operational maintenance and other planned operational procedures where all the Aurora clusters and other services they interact with are in a healthy state.
> Because this feature synchronizes secondary DB clusters with the primary before making any other changes, RPO is 0 (no data loss).

## S15 Creating backup copies across AWS Regions — Creating backup copies across AWS Regions
url: https://docs.aws.amazon.com/aws-backup/latest/devguide/cross-region-backup.html#cross-region-backup
fetched: 2026-11-27
> Using AWS Backup, you can copy backups to multiple AWS Regions on demand or automatically as part of a scheduled backup plan.
> Cross-Region replication is particularly valuable if you have business continuity or compliance requirements to store backups a minimum distance away from your production data.

## S16 Disaster recovery options in the cloud — Backup and restore (S3 の継続的な複製)
url: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html#aws-services
fetched: 2026-11-27
> For Amazon Simple Storage Service (Amazon S3), you can use Amazon S3 Cross-Region Replication (CRR) to asynchronously copy objects to an S3 bucket in the DR region continuously, while providing versioning for the stored objects so that you can choose your restoration point.

## S17 Replicating existing objects with Batch Replication — Replicating existing objects with Batch Replication
url: https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-batch-replication-batch.html#s3-batch-replication-batch
fetched: 2026-11-27
> S3 Batch Replication differs from live replication, which continuously and automatically replicates new objects across Amazon S3 buckets.
> Instead, S3 Batch Replication occurs on demand on existing objects.

## S18 Replicating objects within and across Regions — Replicating objects within and across Regions
url: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html#replication
fetched: 2026-11-27
> S3 RTC replicates 99.99 percent of new objects stored in Amazon S3 within 15 minutes (backed by a service-level agreement).

## S19 Health checks for Application Load Balancer target groups — Health checks for Application Load Balancer target groups
url: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html#target-group-health-checks
fetched: 2026-11-27
> Each load balancer node routes requests only to the healthy targets in the enabled Availability Zones for the load balancer.
> If a target group contains only unhealthy registered targets, the load balancer routes requests to all those targets, regardless of their health status.

## S20 Health checks for Application Load Balancer target groups — Health checks for Application Load Balancer target groups
url: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html#target-group-health-checks
fetched: 2026-11-27
> This means that if all targets fail health checks at the same time in all enabled Availability Zones, the load balancer fails open.

### 覆えなかった行

- Identifying and implementing appropriate cross-Region AWS Backup and recovery strategies（の AWS Systems Manager の部分）: AWS Systems Manager の公式ページを取らなかった（AWS Backup と Amazon S3 は S15〜S18 で覆った）。
