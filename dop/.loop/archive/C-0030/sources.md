## S1 Disaster Recovery of Workloads on AWS: Recovery in the Cloud — Disaster Recovery of Workloads on AWS: Recovery in the Cloud
url: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-workloads-on-aws.html#disaster-recovery-workloads-on-aws
fetched: 2026-11-25
> Disaster recovery is the process of preparing for and recovering from a disaster. An event that prevents a workload or system from fulfilling its business objectives in its primary deployed location is considered a disaster. This paper outlines the best practices for planning and testing disaster recovery for any workload deployed to AWS, and offers different approaches to mitigate risks and meet the Recovery Time Objective (RTO) and Recovery Point Objective (RPO) for that workload.

## S2 AWS Resilience Hub concepts — Recovery point objective (RPO)
url: https://docs.aws.amazon.com/resilience-hub/latest/userguide/concepts-terms.html#RPO
fetched: 2026-11-25
> The maximum acceptable amount of time since the last data recovery point. This determines what is considered an acceptable loss of data between the last recovery point and the interruption of service.

## S3 AWS Resilience Hub concepts — Recovery time objective (RTO)
url: https://docs.aws.amazon.com/resilience-hub/latest/userguide/concepts-terms.html#RTO
fetched: 2026-11-25
> The maximum acceptable delay between the interruption of service and restoration of service. This determines what is considered an acceptable time window when service is unavailable.

## S4 AWS Resilience Hub concepts — Disruption type
url: https://docs.aws.amazon.com/resilience-hub/latest/userguide/concepts-terms.html#disruption
fetched: 2026-11-25
> AWS Resilience Hub helps you assess resiliency against the following types of outages:
> One or more Availability Zones are unavailable. This type of outage can be resolved by switching to a different Availability Zone.
> One or more Regions are unavailable. This type of incident can be resolved by switching to a different AWS Region.

## S5 AWS Resilience Hub – Resilience management — How AWS Resilience Hub works
url: https://docs.aws.amazon.com/resilience-hub/latest/userguide/arh-mgmt.html#how-it-works
fetched: 2026-11-25
> Define the resilience policies for your applications. These policies include RTO and RPO targets for applications, infrastructure, Availability Zone, and Region disruptions. These targets are used to estimate whether the application meets the resiliency policy.

## S6 Disaster recovery options in the cloud — Disaster recovery options in the cloud
url: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html#disaster-recovery-options-in-the-cloud
fetched: 2026-11-25
> Disaster recovery strategies available to you within AWS can be broadly categorized into four approaches, ranging from the low cost and low complexity of making backups to more complex strategies using multiple active Regions.
> Active/passive strategies use an active site (such as an AWS Region) to host the workload and serve traffic.
> The passive site (such as a different AWS Region) is used for recovery.
> The passive site does not actively serve traffic until a failover event is triggered.

## S7 Disaster recovery options in the cloud — Backup and restore
url: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html#backup-and-restore
fetched: 2026-11-25
> Backup and restore is a suitable approach for mitigating against data loss or corruption.
> This approach can also be used to mitigate against a regional disaster by replicating data to other AWS Regions, or to mitigate lack of redundancy for workloads deployed to a single Availability Zone.
> In addition to data, you must redeploy the infrastructure, configuration, and application code in the recovery Region.
> Without IaC, it may be complex to restore workloads in the recovery Region, which will lead to increased recovery times and possibly exceed your RTO.

## S8 Disaster recovery options in the cloud — AWS services (Backup and restore)
url: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html#aws-services
fetched: 2026-11-25
> How often you run your backup will determine your achievable recovery point (which should align to meet your RPO).
> Any data stored in the disaster recovery Region as backups must be restored at time of failover.

## S9 Disaster recovery options in the cloud — Pilot light
url: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html#pilot-light
fetched: 2026-11-25
> With the pilot light approach, you replicate your data from one Region to another and provision a copy of your core workload infrastructure.
> Resources required to support data replication and backup, such as databases and object storage, are always on.
> Other elements, such as application servers, are loaded with application code and configurations, but are "switched off" and are only used during testing or when disaster recovery failover is invoked.
> A pilot light approach minimizes the ongoing cost of disaster recovery by minimizing the active resources, and simplifies recovery at the time of a disaster because the core infrastructure requirements are all in place.
> Unlike the backup and restore approach, your core infrastructure is always available and you always have the option to quickly provision a full scale production environment by switching on and scaling out your application servers.

## S10 Disaster recovery options in the cloud — AWS services (Pilot light)
url: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html#aws-services-1
fetched: 2026-11-25
> For pilot light, continuous data replication to live databases and data stores in the DR region is the best approach for low RPO (when used in addition to the point-in-time backups discussed previously).
> A scaled down version of your core workload infrastructure with fewer or smaller resources must be deployed in your DR Region.
> For an active/passive configuration such as pilot light, all traffic initially goes to the primary Region and switches to the disaster recovery Region if the primary Region is no longer available.

## S11 Disaster recovery options in the cloud — Warm standby
url: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html#warm-standby
fetched: 2026-11-25
> The warm standby approach involves ensuring that there is a scaled down, but fully functional, copy of your production environment in another Region.
> This approach extends the pilot light concept and decreases the time to recovery because your workload is always-on in another Region.

## S12 Disaster recovery options in the cloud — Warm standby (pilot light と warm standby の違い)
url: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html#warm-standby
fetched: 2026-11-25
> Note: The difference between pilot light and warm standby can sometimes be difficult to understand.
> Both include an environment in your DR Region with copies of your primary Region assets.
> The distinction is that pilot light cannot process requests without additional action taken first, whereas warm standby can handle traffic (at reduced capacity levels) immediately.
> The pilot light approach requires you to “turn on” servers, possibly deploy additional (non-core) infrastructure, and scale up, whereas warm standby only requires you to scale up (everything is already deployed and running).
> Use your RTO and RPO needs to help you choose between these approaches.

## S13 Disaster recovery options in the cloud — Multi-site active/active
url: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html#multi-site-activeactive
fetched: 2026-11-25
> Multi-site active/active serves traffic from all regions to which it is deployed, whereas hot standby serves traffic only from a single region, and the other Region(s) are only used for disaster recovery.
> With a multi-site active/active approach, users are able to access your workload in any of the Regions in which it is deployed.
> This approach is the most complex and costly approach to disaster recovery, but it can reduce your recovery time to near zero for most disasters with the correct technology choices and implementation (however data corruption may need to rely on backups, which usually results in a non-zero recovery point).
> Most customers find that if they are going to stand up a full environment in the second Region, it makes sense to use it active/active.
> Alternatively, if you do not want to use both Regions to handle user traffic, then Warm Standby offers a more economical and operationally less complex approach.

## S14 Disaster recovery options in the cloud — AWS services (Multi-site active/active)
url: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html#aws-services-3
fetched: 2026-11-25
> Asynchronous data replication with this strategy enables near-zero RPO.
