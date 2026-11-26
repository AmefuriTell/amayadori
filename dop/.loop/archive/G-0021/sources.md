## S0 Amazon Application Recovery Controller — readiness check の新規受付の停止
url: https://docs.aws.amazon.com/r53recovery/latest/dg/arc-readiness-availability-change.html#arc-readiness-availability-change
fetched: 2026-11-26
> The readiness check feature in Amazon Application Recovery Controller (ARC) is no longer open to new customers. Existing customers can continue to use the service as normal.
> ARC and ARC Region switch continue to be fully supported. Only the readiness check feature is affected by this change.

## S1 Amazon Application Recovery Controller — What is ARC?
url: https://docs.aws.amazon.com/r53recovery/latest/dg/what-is-route53-recovery.html#what-is-route53-recovery
fetched: 2026-11-26
> Amazon Application Recovery Controller (ARC) helps you prepare for and complete faster recovery for applications running on the AWS Global Cloud Infrastructure. ARC provides the following capabilities:
> Multi-Availability Zone (AZ) recovery, including zonal shift and zonal autoshift, which enable you to recover from single AZ impairments by temporarily shifting traffic from an impaired AZ to a healthy AZ.
> Multi-Region recovery, which includes routing control and Region switch for Regional application recovery, and readiness check for application monitoring.

## S2 Amazon Application Recovery Controller — Multi-Region recovery
url: https://docs.aws.amazon.com/r53recovery/latest/dg/what-is-route53-recovery.html#what-is-route53-recovery.region
fetched: 2026-11-26
> Region switch in ARC provides a centralized, automated, and observable solution for multi-Region application recovery. Region switch helps you to plan and coordinate recovery for your applications across AWS Regions, to help ensure business continuity and reduce operational overhead.
> Routing control enables you to failover traffic from an impaired AWS Region to a healthy AWS Region, so that you can ensure that your application maintains availability.

## S3 AWS Glue — What is AWS Glue?
url: https://docs.aws.amazon.com/glue/latest/dg/what-is-glue.html#what-is-glue
fetched: 2026-11-26
> AWS Glue is a serverless data integration service that makes it easy for analytics users to discover, prepare, move, and integrate data from multiple sources. You can use it for analytics, machine learning, and application development. It also includes additional productivity and data ops tooling for authoring, running jobs, and implementing business workflows.
> With AWS Glue, you can discover and connect to more than 70 diverse data sources and manage your data in a centralized data catalog. You can visually create, run, and monitor extract, transform, and load (ETL) pipelines to load data into your data lakes.
> It's also serverless, which means there's no infrastructure to manage.

## S4 AWS Glue — AWS Glue features
url: https://docs.aws.amazon.com/glue/latest/dg/what-is-glue.html#glue-features-summary
fetched: 2026-11-26
> Automatically discover data – Use AWS Glue crawlers to automatically infer schema information and integrate it into your AWS Glue Data Catalog.
> Automate jobs with event-based triggers – Start crawlers or AWS Glue jobs with event-based triggers, and design a chain of dependent jobs and crawlers.
> Run and monitor jobs – Run AWS Glue jobs with your choice of engine, Spark or Ray. Monitor them with automated monitoring tools, AWS Glue job run insights, and AWS CloudTrail.

## S5 AWS Identity and Access Management Roles Anywhere — What is IAM Roles Anywhere?
url: https://docs.aws.amazon.com/rolesanywhere/latest/userguide/introduction.html#introduction
fetched: 2026-11-26
> You can use AWS Identity and Access Management Roles Anywhere to obtain temporary security credentials in IAM for workloads such as servers, containers, and applications that run outside of AWS. Your workloads can use the same IAM policies and IAM roles that you use with AWS applications to access AWS resources. Using IAM Roles Anywhere means you don't need to manage long-term AWS credentials for workloads running outside of AWS.
> To use IAM Roles Anywhere, your workloads must use X.509 certificates issued by your certificate authority (CA). You register the CA with IAM Roles Anywhere as a trust anchor to establish trust between your public-key infrastructure (PKI) and IAM Roles Anywhere.

## S6 AWS Identity and Access Management Roles Anywhere — Profiles
url: https://docs.aws.amazon.com/rolesanywhere/latest/userguide/introduction.html#first-time-user
fetched: 2026-11-26
> To specify which roles IAM Roles Anywhere assumes and what your workloads can do with the temporary credentials, you create a profile. In a profile, you can define IAM session policies, which can be managed or inline, to limit the permissions created for a session. A profile can have many IAM roles, but only one session policy. Any session returned by a CreateSession call that references the profile will have its permissions limited by the session policy.
