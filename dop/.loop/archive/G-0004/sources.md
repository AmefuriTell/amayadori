## S1 Amazon ECR — What is Amazon Elastic Container Registry?
url: https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html#what-is-ecr
fetched: 2026-11-26
> Amazon Elastic Container Registry (Amazon ECR) is an AWS managed container image registry service that is secure, scalable, and reliable. Amazon ECR supports private repositories with resource-based permissions using AWS IAM. This is so that specified users or Amazon EC2 instances can access your container repositories and images.

## S2 Amazon ECR — Features of Amazon ECR
url: https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html#ecr-features
fetched: 2026-11-26
> Lifecycle policies help with managing the lifecycle of the images in your repositories. You define rules that result in the cleaning up of unused images. You can test rules before applying them to your repository.
> Image scanning helps in identifying software vulnerabilities in your container images. Each repository can be configured to scan on push. This ensures that each new image pushed to the repository is scanned. You can then retrieve the results of the image scan.
> Cross-Region and cross-account replication makes it easier for you to have your images where you need them. This is configured as a registry setting and is on a per-Region basis.

## S3 Amazon RDS — What is Amazon Relational Database Service (Amazon RDS)?
url: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html#Welcome
fetched: 2026-11-26
> Amazon Relational Database Service (Amazon RDS) is a web service that makes it easier to set up, operate, and scale a relational database in the AWS Cloud. It provides cost-efficient, resizable capacity for an industry-standard relational database and manages common database administration tasks.

## S4 Amazon RDS — Advantages of Amazon RDS
url: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html#Welcome.Concepts.on-prem
fetched: 2026-11-26
> Amazon RDS manages backups, software patching, automatic failure detection, and recovery.
> You can turn on automated backups, or manually create your own backup snapshots. You can use these backups to restore a database. The Amazon RDS restore process works reliably and efficiently.
> You can get high availability with a primary DB instance and a synchronous secondary DB instance that you can fail over to when problems occur. You can also use read replicas to increase read scaling.

## S5 Amazon RDS — Amazon RDS application architecture: example
url: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html#Welcome.Concepts.DBInstance.architecture
fetched: 2026-11-26
> The primary DB instance replicates to another DB instance, called a read replica. Both DB instances are in private subnets within the VPC, which means that internet users can't access them directly.

## S6 AWS CloudFormation StackSets — Managing stacks across accounts and Regions with StackSets
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/what-is-cfnstacksets.html#what-is-cfnstacksets
fetched: 2026-11-26
> CloudFormation StackSets extends the capability of stacks by allowing you to create, update, or delete stacks across multiple accounts and AWS Regions with a single operation. Using an administrator account, you define and manage a CloudFormation template, and use the template as the basis for provisioning stacks into selected target accounts across specified AWS Regions.

## S7 AWS CloudFormation StackSets — StackSets concepts: CloudFormation StackSets and stack instances
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-concepts.html#stacksets-concepts-stackset
fetched: 2026-11-26
> A StackSet serves as a container for multiple stacks that are deployed across specified AWS accounts and Regions. Each stack is based on the same CloudFormation template, but you can customize individual stacks using parameters.
> A stack instance is a reference to a stack in a target account within a Region. A stack instance can exist without a stack. For example, if the stack couldn't be created for some reason, the stack instance shows the reason for stack creation failure. A stack instance associates with only one StackSet.

## S8 AWS CloudFormation StackSets — StackSets concepts: Permission models for StackSets
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-concepts.html#stacksets-concepts-stackset-permission-models
fetched: 2026-11-26
> You can create StackSets using either self-managed permissions or service-managed permissions. With self-managed permissions, you create the IAM roles required by StackSets to deploy across accounts and Regions. These roles are necessary to establish a trusted relationship between the account you're administering the StackSet from and the account you're deploying stack instances to. Using this permissions model, StackSets can deploy to any AWS account in which you have permissions to create an IAM role.
> With service-managed permissions, you can deploy stack instances to accounts managed by AWS Organizations. Using this permissions model, you don't have to create the necessary IAM roles; StackSets creates the IAM roles on your behalf. With this model, you can also turn on automatic deployments to accounts that you add to your organization in the future.

## S9 Elastic Load Balancing — What is Elastic Load Balancing?
url: https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/what-is-load-balancing.html#what-is-load-balancing
fetched: 2026-11-26
> Elastic Load Balancing automatically distributes your incoming traffic across multiple targets, such as EC2 instances, containers, and IP addresses, in one or more Availability Zones. It monitors the health of its registered targets, and routes traffic only to the healthy targets. Elastic Load Balancing scales your load balancer capacity automatically in response to changes in incoming traffic.

## S10 Elastic Load Balancing — Load balancer benefits
url: https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/what-is-load-balancing.html#load-balancer-benefits
fetched: 2026-11-26
> A load balancer distributes workloads across multiple compute resources, such as virtual servers. Using a load balancer increases the availability and fault tolerance of your applications.
> You can configure health checks, which monitor the health of the compute resources, so that the load balancer sends requests only to the healthy ones.

## S11 Elastic Load Balancing — Features of Elastic Load Balancing
url: https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/what-is-load-balancing.html#elb-features
fetched: 2026-11-26
> Elastic Load Balancing supports multiple load balancer types. You can select the type of load balancer that best suits your needs.

## S12 Amazon ECS — What is Amazon Elastic Container Service?
url: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html#Welcome
fetched: 2026-11-26
> Amazon Elastic Container Service (Amazon ECS) is a fully managed container orchestration service that helps you easily deploy, manage, and scale containerized applications. As a fully managed service, Amazon ECS comes with AWS configuration and operational best practices built-in. It's integrated with both AWS tools, such as Amazon Elastic Container Registry, and third-party tools, such as Docker.

## S13 Amazon ECS — Terminology and components: capacity
url: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html#welcome-terminology
fetched: 2026-11-26
> Fargate is a serverless, pay-as-you-go compute engine. With Fargate you don't need to manage servers, handle capacity planning, or isolate container workloads for security.
> The Amazon ECS scheduler is the software that manages your applications.

## S14 Amazon ECS — Features
url: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html#ecs-features
fetched: 2026-11-26
> Task definition The blueprint for the application. Cluster The infrastructure your application runs on. Task An application such as a batch job that performs work, and then stops. Service A long running stateless application.
