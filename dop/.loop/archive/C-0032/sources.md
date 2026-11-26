## S1 Global tables - multi-active, multi-Region replication — Global tables
url: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GlobalTables.html#GlobalTables
fetched: 2026-11-26
> Amazon DynamoDB global tables is a fully managed, multi-Region, and multi-active database feature that provides easy to use data replication and fast local read and write performance for globally scaled applications. Global tables automatically replicate your DynamoDB table data across AWS Regions and optionally across AWS accounts without requiring you to build and maintain your own replication solution. Global tables are ideal for applications requiring business continuity and high availability through multi-Region deployment. Any global table replica can serve reads and writes. Applications can achieve high resilience with a low or zero Recovery Point Objective (RPO) by shifting traffic to a different Region if application processing is interrupted in a Region. Global tables are available in all Regions where DynamoDB is available.

## S2 Global tables - multi-active, multi-Region replication — Consistency modes
url: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GlobalTables.html#GlobalTables.consistency-modes
fetched: 2026-11-26
> When you create a global table, you can configure its consistency mode. Global tables support two consistency modes: multi-Region eventual consistency (MREC) and multi-Region strong consistency (MRSC). If you do not specify a consistency mode when creating a global table, the global table defaults to multi-Region eventual consistency (MREC). A global table cannot contain replicas configured with different consistency modes. You cannot change a global table's consistency mode after creation.

## S3 Using Amazon Aurora Global Database — Introduction
url: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html#aurora-global-database
fetched: 2026-11-26
> With the Amazon Aurora Global Database feature, you set up multiple Aurora DB clusters that span multiple AWS Regions. Aurora automatically synchronizes all changes made in the primary DB cluster to one or more secondary clusters. An Aurora global database has a primary DB cluster in one Region, and up to 10 secondary DB clusters in different Regions. This multi-Region configuration provides fast recovery from the rare outage that might affect an entire AWS Region.

## S4 Using Amazon Aurora Global Database — Overview of Amazon Aurora Global Database
url: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html#aurora-global-database-overview
fetched: 2026-11-26
> By using the Amazon Aurora Global Database feature, you can run your globally distributed applications using a single Aurora database that spans multiple AWS Regions. An Aurora global database consists of one primary AWS Region where your data is written, and up to 10 read-only secondary AWS Regions. You issue write operations to the primary DB cluster in the primary AWS Region. The most convenient way to do so is to connect to the Aurora Global Database writer endpoint, which always points to the primary DB cluster, even after a switchover or failover to a different AWS Region. After any write operation, Aurora replicates data to the secondary AWS Regions using dedicated infrastructure, with latency typically under a second.

## S5 Using Amazon Aurora Global Database — Using switchover or failover
url: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html#aurora-global-database-overview
fetched: 2026-11-26
> Aurora Global Database supports two different operations for changing the Region of your primary DB cluster, depending on the scenario: Aurora Global Database switchover and Aurora Global Database failover. For planned operational procedures such as Regional rotation, use the switchover mechanism (previously called "managed planned failover"). With this feature, you can relocate the primary cluster of a healthy Aurora Global Database to one of its secondary Regions with no data loss. To learn more, see Performing switchovers for Amazon Aurora global databases. To recover your Aurora Global Database after an outage in the primary Region, use the failover mechanism. With this feature, you perform a failover from your primary DB cluster to another Region (cross-Region failover). To learn more, see Performing managed failovers for Aurora global databases.

## S6 Replicating objects within and across Regions — Replicating objects within and across Regions
url: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html#replication
fetched: 2026-11-26
> You can use replication to enable automatic, asynchronous copying of objects across Amazon S3 buckets. Buckets that are configured for object replication can be owned by the same AWS account or by different accounts. You can replicate objects to a single destination bucket or to multiple destination buckets. The destination buckets can be in different AWS Regions or within the same Region as the source bucket.

## S7 Replicating objects within and across Regions — Why use replication?
url: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html#replication-scenario
fetched: 2026-11-26
> Replicate objects and fail over to a bucket in another AWS Region – To keep all metadata and objects in sync across buckets during data replication, use two-way replication (also known as bi-directional replication) rules before configuring Amazon S3 Multi-Region Access Point failover controls. Two-way replication rules help ensure that when data is written to the S3 bucket that traffic fails over to, that data is then replicated back to the source bucket.

## S8 Replicating objects within and across Regions — When to use Cross-Region Replication
url: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html#crr-scenario
fetched: 2026-11-26
> S3 Cross-Region Replication (CRR) is used to copy objects across Amazon S3 buckets in different AWS Regions. CRR can help you do the following: Meet compliance requirements – Although Amazon S3 stores your data across multiple geographically distant Availability Zones by default, compliance requirements might dictate that you store data at even greater distances. To satisfy these requirements, use Cross-Region Replication to replicate data between distant AWS Regions.

## S9 Configuring DNS failover — Configuring DNS failover (intro)
url: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-configuring.html#dns-failover-configuring
fetched: 2026-11-26
> When you have more than one resource performing the same function—for example, more than one HTTP server or mail server—you can configure Amazon Route 53 to check the health of your resources and respond to DNS queries using only the healthy resources. For example, suppose your website, example.com, is hosted on six servers, two each in three data centers around the world. You can configure Route 53 to check the health of those servers and to respond to DNS queries for example.com using only the servers that are currently healthy.

## S10 Configuring DNS failover — Configuring DNS failover (health checks)
url: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-configuring.html#dns-failover-configuring
fetched: 2026-11-26
> Route 53 can check the health of your resources in both simple and complex configurations: In simple configurations, you create a group of records that all have the same name and type, such as a group of weighted records with a type of A for example.com. You then configure Route 53 to check the health of the corresponding resources. Route 53 responds to DNS queries based on the health of your resources.

## S11 Optimize high availability with CloudFront origin failover — Introduction
url: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/high_availability_origin_failover.html#high_availability_origin_failover
fetched: 2026-11-26
> You can set up CloudFront with origin failover for scenarios that require high availability. To get started, you create an origin group with two origins: a primary and a secondary. If the primary origin is unavailable, or returns specific HTTP response status codes that indicate a failure, CloudFront automatically switches to the secondary origin.

## S12 Optimize high availability with CloudFront origin failover — Failover behavior
url: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/high_availability_origin_failover.html#high_availability_origin_failover
fetched: 2026-11-26
> CloudFront routes all incoming requests to the primary origin, even when a previous request failed over to the secondary origin. CloudFront only sends requests to the secondary origin after a request to the primary origin fails. CloudFront fails over to the secondary origin only when the HTTP method of the viewer request is GET, HEAD, or OPTIONS. CloudFront does not fail over when the viewer sends a different HTTP method (for example POST, PUT, and so on).

## S13 Creating a read replica in a different AWS Region — Introduction
url: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.XRgn.html#USER_ReadRepl.XRgn
fetched: 2026-11-26
> With Amazon RDS, you can create a read replica in a different AWS Region from the source DB instance. You create a read replica in a different AWS Region to do the following: Improve your disaster recovery capabilities. Scale read operations into an AWS Region closer to your users. Make it easier to migrate from a data center in one AWS Region to a data center in another AWS Region.

## S14 Creating a read replica in a different AWS Region — How Amazon RDS does cross-Region replication
url: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.XRgn.html#USER_ReadRepl.XRgn.Process
fetched: 2026-11-26
> Amazon RDS uses the following process to create a cross-Region read replica. Depending on the AWS Regions involved and the amount of data in the databases, this process can take hours to complete. You can use this information to determine how far the process has proceeded when you create a cross-Region read replica:

## S15 Creating a read replica in a different AWS Region — How Amazon RDS does cross-Region replication
url: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.XRgn.html#USER_ReadRepl.XRgn.Process
fetched: 2026-11-26
> When the read replica reaches the available status, Amazon RDS starts by replicating the changes made to the source instance since the start of the create read replica operation. During this phase, the replication lag time for the read replica is greater than 0.
