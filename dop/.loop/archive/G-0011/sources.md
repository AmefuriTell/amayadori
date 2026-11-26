# サービス事典 G-0011: Amazon Route 53、AWS CDK、AWS Fargate、AWS Fault Injection Service、AWS Resilience Hub

## S1 Amazon Route 53 — What is Amazon Route 53?
url: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html#Welcome
fetched: 2026-11-26
> Amazon Route 53 is a highly available and scalable Domain Name System (DNS) web service. You can use Route 53 to perform three main functions
> in any combination: domain registration, DNS routing, and health checking.

## S2 Amazon Route 53 — Check the health of your resources
url: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html#Welcome
fetched: 2026-11-26
> Route 53 sends automated requests over the internet to a resource, such as a web server, to verify that it's reachable, available,
> and functional. You can receive notifications when a resource becomes unavailable. You can also route internet traffic
> away from unhealthy resources.

## S3 Amazon Route 53 — Choosing a routing policy
url: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html#routing-policy
fetched: 2026-11-26
> When you create a record, you choose a routing policy, which determines how Amazon Route 53 responds to queries:
> - Failover routing policy – Use when you want to
> configure active-passive failover. You can use failover routing to create
> - Weighted routing policy – Use to route traffic to
> multiple resources in proportions that you specify.

## S4 AWS CDK — What is the AWS CDK?
url: https://docs.aws.amazon.com/cdk/v2/guide/home.html#home
fetched: 2026-11-26
> The AWS Cloud Development Kit (AWS CDK) is an open-source set of libraries and command-line tools for building and deploying applications on AWS.
> The AWS CDK consists of three primary parts:
> – A collection of pre-written modular and reusable pieces of code, called constructs, that you can use, modify, and integrate to develop your infrastructure quickly.

## S5 AWS CDK — Deploy infrastructure through AWS CloudFormation
url: https://docs.aws.amazon.com/cdk/v2/guide/home.html#home-benefits
fetched: 2026-11-26
> AWS CDK integrates with AWS CloudFormation to deploy and provision your infrastructure on AWS. AWS CloudFormation is a managed AWS service that offers extensive support of resource and property configurations for provisioning services on AWS. With AWS CloudFormation, you can perform infrastructure deployments predictably and repeatedly, with rollback on error.

## S6 AWS CDK — What is bootstrapping?
url: https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping.html#bootstrapping-what
fetched: 2026-11-26
> Bootstrapping prepares your AWS environment by provisioning specific AWS resources in your environment that are used by the AWS CDK.
> Amazon Simple Storage Service (Amazon S3) bucket – Used to store your CDK project files, such as AWS Lambda function code and assets.
> To bootstrap an environment, you use the AWS CDK Command Line Interface (AWS CDK CLI) cdk bootstrap command.
> AWS environments are independent. Each environment that you want to use with the AWS CDK must first be bootstrapped.

## S7 AWS Fargate — Architect for AWS Fargate for Amazon ECS
url: https://docs.aws.amazon.com/AmazonECS/latest/userguide/what-is-fargate.html#AWS_Fargate
fetched: 2026-11-26
> AWS Fargate is a technology that you can use with Amazon ECS to run containers without having to manage
> servers or clusters of Amazon EC2 instances. With AWS Fargate, you no longer have to
> provision, configure, or scale clusters of virtual machines to run containers. This removes
> the need to choose server types, decide when to scale your clusters, or optimize cluster
> packing.

## S8 AWS Fargate — Architect for AWS Fargate for Amazon ECS (isolation)
url: https://docs.aws.amazon.com/AmazonECS/latest/userguide/what-is-fargate.html#AWS_Fargate
fetched: 2026-11-26
> Each Fargate task has its own isolation boundary and does not share the underlying kernel, CPU resources,
> memory resources, or elastic network interface with another task. You configure your task
> definitions for Fargate by setting the requiresCompatibilities
> task definition parameter to FARGATE.

## S9 AWS Fault Injection Service — What is AWS Fault Injection Service?
url: https://docs.aws.amazon.com/fis/latest/userguide/what-is.html#what-is
fetched: 2026-11-26
> AWS Fault Injection Service (AWS FIS) is a managed service that enables you to perform fault injection
> experiments on your AWS workloads. Fault injection is based on the principles of chaos engineering.
> AWS FIS provides templates that generate disruptions, and the controls and guardrails that
> you need to run experiments in production, such as automatically rolling back or stopping
> the experiment if specific conditions are met.

## S10 AWS Fault Injection Service — Stop conditions
url: https://docs.aws.amazon.com/fis/latest/userguide/what-is.html#what-is-stop-conditions
fetched: 2026-11-26
> AWS FIS provides the controls and guardrails that you need to run experiments
> safely on your AWS workloads. A stop condition is a mechanism
> to stop an experiment if it reaches a threshold that you define as an Amazon CloudWatch alarm.
> If a stop condition is triggered while the experiment is running, AWS FIS stops the
> experiment.

## S11 AWS Fault Injection Service — Actions and Targets
url: https://docs.aws.amazon.com/fis/latest/userguide/what-is.html#what-is-actions
fetched: 2026-11-26
> An action is an activity that AWS FIS performs on an AWS
> resource during an experiment.
> A target is one or more AWS resources on which AWS FIS
> performs an action during an experiment.

## S12 AWS Resilience Hub — What is AWS Resilience Hub?
url: https://docs.aws.amazon.com/resilience-hub/latest/userguide/what-is.html#what-is
fetched: 2026-11-26
> AWS Resilience Hub is a central location for you to manage and improve the resilience posture of your
> applications on AWS. AWS Resilience Hub enables you to define your resilience goals, assess your
> resilience posture against those goals, and implement recommendations for improvement based on the
> AWS Well-Architected Framework. Within AWS Resilience Hub, you can also create and run AWS Fault Injection Service
> experiments, which mimic real-life disruptions to your application to help you better understand

## S13 AWS Resilience Hub — Managing resiliency policies
url: https://docs.aws.amazon.com/resilience-hub/latest/userguide/resiliency-policies.html#resiliency-policies
fetched: 2026-11-26
> When you create a resiliency policy, you define the target objectives: recovery time
> objective (RTO) and recovery point objective (RPO). The objectives determine whether the
> application meets the resiliency policy. Attach the policy to your application and run a
> resiliency assessment.
> The assessment evaluates your application configuration against the attached resiliency policy. At the end of the process, AWS Resilience Hub provides an assessment of how your application
> measures against the recovery targets in your resiliency policy.
