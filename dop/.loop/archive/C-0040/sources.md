## S1 Failing over a Multi-AZ DB instance for Amazon RDS — Failing over a Multi-AZ DB instance for Amazon RDS
url: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.Failover.html#Concepts.MultiAZ.Failover
fetched: 2026-11-25
> If a planned or unplanned outage of your Multi-AZ DB instance results from an infrastructure defect, Amazon RDS automatically switches to a standby replica in another Availability Zone. The time that it takes for the failover to complete depends on the database activity and other conditions at the time the primary DB instance became unavailable. Failover times are typically 60–120 seconds.

## S2 Failing over a Multi-AZ DB instance for Amazon RDS — Failover reason (Reboot with failover)
url: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.Failover.html#Concepts.MultiAZ.Failover
fetched: 2026-11-25
> The user requested a failover of the DB instance. You rebooted the DB instance and chose Reboot with failover.

## S3 Using switchover or failover in Amazon Aurora Global Database — Planning for business continuity and disaster recovery (Switchover)
url: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html#aurora-global-database-bcdr-planning
fetched: 2026-11-25
> Switchover – This operation was previously called "managed planned failover". Use this approach for controlled scenarios, such as operational maintenance and other planned operational procedures where all the Aurora clusters and other services they interact with are in a healthy state. Because this feature synchronizes secondary DB clusters with the primary before making any other changes, RPO is 0 (no data loss).

## S4 Using switchover or failover in Amazon Aurora Global Database — Planning for business continuity and disaster recovery (Failover)
url: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html#aurora-global-database-bcdr-planning
fetched: 2026-11-25
> Failover – Use this approach to recover from an unplanned outage. With this approach, you perform a cross-Region failover to one of the secondary DB clusters in your Aurora global database. The RPO for this approach is typically a non-zero value measured in seconds.

## S5 Creating Amazon Route 53 health checks — Configuring DNS failover
url: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover.html#dns-failover
fetched: 2026-11-25
> If you have multiple resources that perform the same function, you can configure DNS failover so that Route 53 routes your traffic from an unhealthy resource to a healthy resource. For example, if you have two web servers and one web server becomes unhealthy, Route 53 can route traffic to the other web server.

## S6 Optimize high availability with CloudFront origin failover — Create an origin group
url: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/high_availability_origin_failover.html#concept_origin_groups.creating
fetched: 2026-11-25
> Choose the HTTP status codes to use as failover criteria. You can choose any combination of the following status codes: 400, 403, 404, 416, 429, 500, 502, 503, or 504. When CloudFront receives a response with one of the status codes that you specify, it fails over to the secondary origin. CloudFront fails over to the secondary origin only when the HTTP method of the viewer request is GET, HEAD, or OPTIONS. CloudFront does not fail over when the viewer sends a different HTTP method (for example POST, PUT, and so on).

## S7 What is AWS Fault Injection Service? — What is AWS Fault Injection Service?
url: https://docs.aws.amazon.com/fis/latest/userguide/what-is.html#what-is
fetched: 2026-11-25
> AWS FIS carries out real actions on real AWS resources in your system. Therefore, before you use AWS FIS to run experiments in production, we strongly recommend that you complete a planning phase and run the experiments in a pre-production environment.
