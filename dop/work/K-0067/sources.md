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

## S21 Failing over a Multi-AZ DB instance for Amazon RDS — Failing over a Multi-AZ DB instance for Amazon RDS
url: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.Failover.html#Concepts.MultiAZ.Failover
fetched: 2026-11-25
> If a planned or unplanned outage of your Multi-AZ DB instance results from an infrastructure defect, Amazon RDS automatically switches to a standby replica in another Availability Zone. The time that it takes for the failover to complete depends on the database activity and other conditions at the time the primary DB instance became unavailable. Failover times are typically 60–120 seconds.

## S22 Failing over a Multi-AZ DB instance for Amazon RDS — Failover reason (Reboot with failover)
url: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.Failover.html#Concepts.MultiAZ.Failover
fetched: 2026-11-25
> The user requested a failover of the DB instance. You rebooted the DB instance and chose Reboot with failover.

## S23 Using switchover or failover in Amazon Aurora Global Database — Planning for business continuity and disaster recovery (Switchover)
url: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html#aurora-global-database-bcdr-planning
fetched: 2026-11-25
> Switchover – This operation was previously called "managed planned failover". Use this approach for controlled scenarios, such as operational maintenance and other planned operational procedures where all the Aurora clusters and other services they interact with are in a healthy state. Because this feature synchronizes secondary DB clusters with the primary before making any other changes, RPO is 0 (no data loss).

## S24 Using switchover or failover in Amazon Aurora Global Database — Planning for business continuity and disaster recovery (Failover)
url: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html#aurora-global-database-bcdr-planning
fetched: 2026-11-25
> Failover – Use this approach to recover from an unplanned outage. With this approach, you perform a cross-Region failover to one of the secondary DB clusters in your Aurora global database. The RPO for this approach is typically a non-zero value measured in seconds.

## S25 Creating Amazon Route 53 health checks — Configuring DNS failover
url: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover.html#dns-failover
fetched: 2026-11-25
> If you have multiple resources that perform the same function, you can configure DNS failover so that Route 53 routes your traffic from an unhealthy resource to a healthy resource. For example, if you have two web servers and one web server becomes unhealthy, Route 53 can route traffic to the other web server.

## S26 Optimize high availability with CloudFront origin failover — Create an origin group
url: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/high_availability_origin_failover.html#concept_origin_groups.creating
fetched: 2026-11-25
> Choose the HTTP status codes to use as failover criteria. You can choose any combination of the following status codes: 400, 403, 404, 416, 429, 500, 502, 503, or 504. When CloudFront receives a response with one of the status codes that you specify, it fails over to the secondary origin. CloudFront fails over to the secondary origin only when the HTTP method of the viewer request is GET, HEAD, or OPTIONS. CloudFront does not fail over when the viewer sends a different HTTP method (for example POST, PUT, and so on).

## S27 What is AWS Fault Injection Service? — What is AWS Fault Injection Service?
url: https://docs.aws.amazon.com/fis/latest/userguide/what-is.html#what-is
fetched: 2026-11-25
> AWS FIS carries out real actions on real AWS resources in your system. Therefore, before you use AWS FIS to run experiments in production, we strongly recommend that you complete a planning phase and run the experiments in a pre-production environment.

## S28 Creating backup copies across AWS Regions — Scheduling cross-Region backup
url: https://docs.aws.amazon.com/aws-backup/latest/devguide/cross-region-backup.html#scheduled-crb
fetched: 2026-11-26
> You can use a scheduled backup plan to copy backups across AWS Regions.
> In the Backup rule configuration section, add a backup rule that defines a backup schedule, backup window, and lifecycle rules.
> For Backup frequency, choose how often you want to take backups.
> For Copy to destination, Choose the destination AWS Region for your backup copy.
> Your backup will be copied to this Region.

## S29 Creating backup copies across AWS Regions — Performing on-demand cross-Region backup
url: https://docs.aws.amazon.com/aws-backup/latest/devguide/cross-region-backup.html#on-demand-crb
fetched: 2026-11-26
> Transition to cold storage
> Choose when to transition the backup copy to cold storage.
> Backups transitioned to cold storage must be stored there for a minimum of 90 days.
> Retention period
> Choose specifies the number of days after creation that the copy is deleted.
> This value must be greater than 90 days beyond the Transition to cold storage value.

## S30 Select AWS services to backup — Backup plan resource assignment
url: https://docs.aws.amazon.com/aws-backup/latest/devguide/assigning-resources.html#backup-resource-assignment
fetched: 2026-11-26
> Through the AWS Backup console or through AWS CLI, the resource assignment in your backup plan specifies which resources AWS Backup will include.
> You can assign resources in the following ways:
> Explicitly assign resource types to the backup plan
> Include all resources (AWS Backup will then scan for all supported resource types)
> Use tags to include or exclude resources
> If you only use tags for resource assignment, then the service opt-in settings will still apply.
> You can further refine the resource assignment using conditions and tags.

## S31 AWS Backup Vault Lock — Vault lock modes
url: https://docs.aws.amazon.com/aws-backup/latest/devguide/vault-lock.html#backup-vault-lock-modes
fetched: 2026-11-26
> When you create a vault lock, you have a choice of two modes: Governance mode or Compliance mode.
> Governance mode is intended to allow a vault to be managed only by users with sufficient IAM privileges.
> Compliance mode is intended for backup vaults in which the vault (and by extension, its contents) is expected to never be deleted or altered until the data retention period is complete.
> Once a vault in compliance mode is locked, it is immutable, meaning the lock cannot be removed (the vault itself can be deleted if it is empty and does not contain any recovery points).
> A vault locked in Governance mode can be managed or deleted by users who have the appropriate IAM permissions.
> A vault lock in Compliance mode cannot be altered or deleted by any user or by AWS.
> A vault lock in compliance mode has a grace time period you set before it locks and the contents and vault lock become immutable.

## S32 Replicating objects within and across Regions — When to use Cross-Region Replication
url: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html#crr-scenario
fetched: 2026-11-26
> S3 Cross-Region Replication (CRR) is used to copy objects across Amazon S3 buckets in different AWS Regions.
> CRR can help you do the following:
> Meet compliance requirements – Although Amazon S3 stores your data across multiple geographically distant Availability Zones by default, compliance requirements might dictate that you store data at even greater distances.

## S33 Replicating existing objects with Batch Replication — Replicating existing objects with Batch Replication
url: https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-batch-replication-batch.html#s3-batch-replication-batch
fetched: 2026-11-26
> S3 Batch Replication differs from live replication, which continuously and automatically replicates new objects across Amazon S3 buckets.
> Instead, S3 Batch Replication occurs on demand on existing objects.
> You can use S3 Batch Replication to replicate the following types of objects:
> Objects that existed before a replication configuration was in place
> Objects that have previously been replicated
> Objects that have failed replication
> You can replicate these objects on demand by using a Batch Operations job.

## S34 Meeting compliance requirements with S3 Replication Time Control — Meeting compliance requirements with S3 Replication Time Control
url: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication-time-control.html#replication-time-control
fetched: 2026-11-26
> S3 Replication Time Control (S3 RTC) helps you meet compliance or business requirements for data replication and provides visibility into Amazon S3 replication times.
> S3 RTC replicates most objects that you upload to Amazon S3 in seconds, and 99.9 percent of those objects within 15 minutes.

## S35 Health checks for Application Load Balancer target groups — Health checks for Application Load Balancer target groups
url: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html#target-group-health-checks
fetched: 2026-11-26
> Each load balancer node routes requests only to the healthy targets in the enabled Availability Zones for the load balancer.
> If a target group contains only unhealthy registered targets, the load balancer routes requests to all those targets, regardless of their health status.
> This means that if all targets fail health checks at the same time in all enabled Availability Zones, the load balancer fails open.
> The effect of the fail-open is to allow traffic to all targets in all enabled Availability Zones, regardless of their health status, based on the load balancing algorithm.

## S36 Health checks for Application Load Balancer target groups — Health check settings
url: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html#health-check-settings
fetched: 2026-11-26
> The destination for health checks on the targets.
> If the protocol version is HTTP/1.1 or HTTP/2, specify a valid URI (/path?query).
> The codes to use when checking for a successful response from a target.
> If the protocol version is HTTP/1.1 or HTTP/2, the possible values are from 200 to 499.
> You can specify multiple values (for example, "200,202") or a range of values (for example, "200-299").

## S37 Health checks for Application Load Balancer target groups — Target health status
url: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html#target-health-states
fetched: 2026-11-26
> After a target passes the initial health checks, its status is Healthy.
> The target did not respond to a health check or failed the health check.
> The target is deregistering and connection draining is in process.

## S38 Edit target group attributes for your Application Load Balancer — Deregistration delay
url: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/edit-target-group-attributes.html#deregistration-delay
fetched: 2026-11-26
> Elastic Load Balancing stops sending requests to targets that are deregistering.
> By default, Elastic Load Balancing waits 300 seconds before completing the deregistration process, which can help in-flight requests to the target to complete.
> The initial state of a deregistering target is draining.
> After the deregistration delay elapses, the deregistration process completes and the state of the target is unused.
> If the target is part of an Auto Scaling group, it can be terminated and replaced.
> If a deregistering target terminates the connection before the deregistration delay elapses, the client receives a 500-level error response.

## S39 Edit target group attributes for your Application Load Balancer — Slow start mode
url: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/edit-target-group-attributes.html#slow-start-mode
fetched: 2026-11-26
> By default, a target starts to receive its full share of requests as soon as it is registered with a target group and passes an initial health check.
> A target in slow start mode exits slow start mode when the configured slow start duration period elapses or the target becomes unhealthy.
> If a target in slow start mode becomes unhealthy, the target exits slow start mode.

## S40 Edit target group attributes for your Application Load Balancer — Health settings
url: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/edit-target-group-attributes.html#modify-target-group-health-settings
fetched: 2026-11-26
> By default, Application Load Balancers monitor the health of targets and route requests to healthy targets.
> However, if the load balancer doesn't have enough healthy targets, it automatically sends traffic to all registered targets (fail open).
> You can modify the target group health settings for your target group to define the thresholds for DNS failover and routing failover.
> For Configuration type, we recommend that you choose Unified configuration, which sets the same threshold for both actions.
> Choose Minimum healthy target percentage, and then enter a number from 1 to 100.

## S41 Attach an Elastic Load Balancing load balancer to your Auto Scaling group — Attach a target group or Classic Load Balancer
url: https://docs.aws.amazon.com/autoscaling/ec2/userguide/attach-load-balancer-asg.html#attach-load-balancer-asg
fetched: 2026-11-26
> By default, Amazon EC2 Auto Scaling only replaces instances that are unhealthy or unreachable based on Amazon EC2 health checks.
> If you turn on Elastic Load Balancing health checks, Amazon EC2 Auto Scaling can replace a running instance if any of the Elastic Load Balancing load balancers you attach to the Auto Scaling group report it as unhealthy.
> When you attach an Application Load Balancer, Network Load Balancer, or Gateway Load Balancer, you attach a target group rather than the load balancer itself.
> This is how long Amazon EC2 Auto Scaling needs to wait before checking the health status of an instance after it enters the InService state.

## S42 Health checks for instances in an Auto Scaling group — Health checks for instances in an Auto Scaling group
url: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-health-checks.html#ec2-auto-scaling-health-checks
fetched: 2026-11-26
> Instances are assumed to be healthy unless Amazon EC2 Auto Scaling receives notification that they are unhealthy.
> When Amazon EC2 Auto Scaling determines that an InService instance is unhealthy, it replaces it with a new instance to maintain the desired capacity of the group.

## S43 How health checks work in complex Amazon Route 53 configurations — How health checks work in complex Amazon Route 53 configurations
url: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-complex-configs.html#dns-failover-complex-configs
fetched: 2026-11-26
> For both latency alias records, you set the value of Evaluate Target Health to Yes.
> This causes Route 53 to determine whether there are any healthy resources in a Region before trying to route traffic there.
> If not, Route 53 chooses a healthy resource in the other Region.

## S44 How health checks work in complex Amazon Route 53 configurations — What happens when you set evaluate target health to No?
url: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-complex-configs.html#dns-failover-complex-configs-eth-no
fetched: 2026-11-26
> In general, you should set Evaluate Target Health to Yes for all the alias records in a tree.
> If you set Evaluate Target Health to No, Route 53 continues to route traffic to the records that an alias record refers to even if health checks for those records are failing.

## S45 Health checks for Network Load Balancer target groups — Health checks for Network Load Balancer target groups
url: https://docs.aws.amazon.com/elasticloadbalancing/latest/network/target-group-health-checks.html#target-group-health-checks
fetched: 2026-11-26
> If a target becomes unhealthy, the load balancer sends a TCP RST for packets received on the client connections associated with the target, unless the unhealthy target triggers the load balancer to fail open.
> If target groups don't have a healthy target in an enabled Availability Zone, we remove the IP address for the corresponding subnet from DNS so that requests cannot be routed to targets in that Availability Zone.
> If all targets fail health checks at the same time in all enabled Availability Zones, the load balancer fails open.
> Network Load Balancers will also fail open when you have an empty target group.

### 覆えなかった行

- Identifying and implementing appropriate cross-Region AWS Backup and recovery strategies（の AWS Systems Manager の部分）: AWS Systems Manager の公式ページを取らなかった（AWS Backup と Amazon S3 は S15〜S18 で覆った）。
