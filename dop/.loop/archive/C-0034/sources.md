# 資料: C-0034（task 3.1）

## S1 Configuring and managing a Multi-AZ deployment for Amazon RDS — Multi-AZ DB instance と Multi-AZ DB cluster
url: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html#Concepts.MultiAZ
fetched: 2026-11-26
> Multi-AZ deployments can have one standby or two standby DB instances.
> A Multi-AZ DB instance deployment has one standby DB instance that provides failover support, but doesn't serve read traffic.
> A Multi-AZ DB cluster deployment has standby DB instances that provide failover support and can also serve read traffic.

## S2 Multi-AZ DB cluster deployments for Amazon RDS — Multi-AZ DB cluster architecture
url: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/multi-az-db-clusters-concepts.html#multi-az-db-clusters-concepts-overview
fetched: 2026-11-26
> Multi-AZ DB cluster deployments use semisynchronous replication, which requires acknowledgment from at least one reader DB instance in order for a change to be committed.
> Reader DB instances act as automatic failover targets and also serve read traffic to increase application read throughput.
> If an outage occurs on your writer DB instance, RDS manages failover to one of the reader DB instances.
> RDS does this based on which reader DB instance has the most recent change record.

## S3 Multi-AZ DB cluster deployments for Amazon RDS — Replica lag and Multi-AZ DB clusters
url: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/multi-az-db-clusters-concepts.html#multi-az-db-clusters-concepts-replica-lag
fetched: 2026-11-26
> Because any failover must first resolve the replica lag before it promotes a new writer DB instance, monitoring and managing this replica lag is a consideration.
> For RDS for MySQL Multi-AZ DB clusters, failover time depends on replica lag of both remaining reader DB instances.

## S4 Multi-AZ DB cluster deployments for Amazon RDS — RDS Proxy with Multi-AZ DB clusters
url: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/multi-az-db-clusters-concepts.html#multi-az-db-clusters-proxy
fetched: 2026-11-26
> RDS Proxy can also reduce the downtime for a minor version upgrade of a Multi-AZ DB cluster to one second or less.

## S5 Minimizing downtime in ElastiCache by using Multi-AZ with Valkey and Redis OSS — Automatic failover and Multi-AZ
url: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/AutoFailover.html#AutoFailover.Understanding
fetched: 2026-11-26
> Multi-AZ is the recommended configuration for high availability in ElastiCache.
> When you enable Multi-AZ, ElastiCache distributes your replicas across different Availability Zones and enables automatic failover.
> If the primary node fails, ElastiCache automatically promotes the replica with the least replication lag to primary.
> Multi-AZ requires at least one replica in a different Availability Zone from the primary.

## S6 Minimizing downtime in ElastiCache by using Multi-AZ with Valkey and Redis OSS — Minimizing downtime（DNS 名とエンドポイント）
url: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/AutoFailover.html#AutoFailover
fetched: 2026-11-26
> The role of primary node will automatically fail over to one of the read replicas.
> ElastiCache also propagates the Domain Name Service (DNS) name of the promoted replica.
> If you are reading from individual endpoints, make sure that you change the read endpoint of the replica promoted to primary to the new replica's endpoint.
> Multi-AZ is only supported on Valkey and Redis OSS clusters with more than one node in each shard.

## S7 Zonal shift in ARC — Zonal shift in ARC
url: https://docs.aws.amazon.com/r53recovery/latest/dg/arc-zonal-shift.html#arc-zonal-shift
fetched: 2026-11-26
> Amazon Application Recovery Controller (ARC) zonal shift allows you to shift traffic for a supported resource away from an impaired Availability Zone (AZ) in an AWS Region to healthy AZs in the same Region.
> You must opt-in resources in order to use zonal shift.
> Before you start a zonal shift, you must prescale your application and ensure that you have sufficient capacity to shift traffic away from an Availability Zone.
> All zonal shifts are temporary mitigations.
> You set an initial expiration when you start a zonal shift, from one minute up to three days (72 hours), which you can extend, if you need to continue the traffic shift.

## S8 Active-active and active-passive failover — Active-active failover と Active-passive failover
url: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-types.html#dns-failover-types
fetched: 2026-11-26
> You can use Route 53 health checking to configure active-active and active-passive failover configurations.
> Use this failover configuration when you want all of your resources to be available the majority of the time.
> Use an active-passive failover configuration when you want a primary resource or group of resources to be available the majority of the time and you want a secondary resource or group of resources to be on standby in case all the primary resources become unavailable.
> When responding to queries, Route 53 includes only the healthy primary resources.
> If all the primary resources are unhealthy, Route 53 begins to include only the healthy secondary resources in response to DNS queries.
