# G-0012 サービス事典: AWS SAM、AWS Secrets Manager、AWS Service Catalog、AWS WAF、Distributed Load Testing on AWS

## S1 AWS SAM — What is the AWS Serverless Application Model (AWS SAM)?
url: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html#what-is-sam
fetched: 2026-11-26
> AWS Serverless Application Model (AWS SAM) is an open-source framework for building serverless applications using infrastructure as code (IaC). With AWS SAM's shorthand syntax, developers declare CloudFormation resources and specialized serverless resources that are transformed to infrastructure during deployment.

## S2 AWS SAM — What is the AWS Serverless Application Model (AWS SAM)?
url: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html#what-is-sam
fetched: 2026-11-26
> AWS SAM CLI - A command-line tool that helps you develop, locally test, and deploy your serverless applications.
> AWS SAM Template - An extension of CloudFormation that provides simplified syntax for defining serverless resources.

## S3 AWS SAM — Key features
url: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html#what-is-sam-feature
fetched: 2026-11-26
> Use the AWS SAM CLI sam sync command to automatically sync local changes to the cloud, speeding up your development and cloud testing workflows.
> Use AWS SAM connectors in your AWS SAM templates to define permissions between your AWS resources.

## S4 AWS Secrets Manager — What is AWS Secrets Manager?
url: https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html#intro
fetched: 2026-11-26
> AWS Secrets Manager helps you manage, retrieve, and rotate database credentials, application credentials, OAuth tokens, API keys, and other secrets throughout their lifecycles. Many AWS services store and use secrets in Secrets Manager.
> You replace hard-coded credentials with a runtime call to the Secrets Manager service to retrieve credentials dynamically when you need them.

## S5 AWS Secrets Manager — What is AWS Secrets Manager?
url: https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html#intro
fetched: 2026-11-26
> With Secrets Manager, you can configure an automatic rotation schedule for your secrets. This enables you to replace long-term secrets with short-term ones, significantly reducing the risk of compromise. Since the credentials are no longer stored with the application, rotating credentials no longer requires updating your applications and deploying changes to application clients.

## S6 AWS Service Catalog — What Is Service Catalog?
url: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/introduction.html#introduction
fetched: 2026-11-26
> Service Catalog enables organizations to create and manage catalogs of IT services that are approved for AWS. These IT services can include everything from virtual machine images, servers, software, databases, and more to complete multi-tier application architectures.
> Service Catalog allows organizations to centrally manage commonly deployed IT services, and helps organizations achieve consistent governance and meet compliance requirements.

## S7 AWS Service Catalog — What Is Service Catalog?
url: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/introduction.html#introduction
fetched: 2026-11-26
> Administrators assemble portfolios of products from their catalog, add constraints and resource tags to be used at provisioning, and then grant access to the portfolio through AWS Identity and Access Management (IAM) users and groups.
> Updating the product to a new version propagates the update to all products in every portfolio that references it.

## S8 AWS WAF — What is AWS WAF?
url: https://docs.aws.amazon.com/waf/latest/developerguide/what-is-aws-waf.html#waf-intro
fetched: 2026-11-26
> AWS WAF is a web application firewall that lets you monitor the HTTP and HTTPS requests that are forwarded to your protected web application resources.
> AWS WAF lets you control access to your content. Based on conditions that you specify, such as the IP addresses that requests originate from or the values of query strings, your protected resource responds to requests either with the requested content, with an HTTP 403 status code (Forbidden), or with a custom response.

## S9 AWS WAF — What is AWS WAF?
url: https://docs.aws.amazon.com/waf/latest/developerguide/what-is-aws-waf.html#waf-intro
fetched: 2026-11-26
> Rules that can allow, block, or count web requests that meet the specified criteria. Alternatively, rules can block or count web requests that not only meet the specified criteria, but also exceed a specified number of requests in a minute or in five minutes.
> Rules that you can reuse for multiple web applications.

## S10 Distributed Load Testing on AWS — Automate the testing of your software applications at scale
url: https://docs.aws.amazon.com/solutions/latest/distributed-load-testing-on-aws/solution-overview.html#solution-overview
fetched: 2026-11-26
> Distributed Load Testing on AWS helps you automate performance testing of your software applications at scale to identify bottlenecks before you release your application.
> This solution simulates thousands of connected users generating HTTP requests at a sustained rate without the need to provision servers.

## S11 Distributed Load Testing on AWS — Automate the testing of your software applications at scale
url: https://docs.aws.amazon.com/solutions/latest/distributed-load-testing-on-aws/solution-overview.html#solution-overview
fetched: 2026-11-26
> This solution leverages Amazon Elastic Container Service (Amazon ECS) on AWS Fargate to deploy containers that run your load test simulations and offers the following capabilities:
> Customize your application tests using JMeter, k6, Locust test scripts, or simple HTTP endpoint configuration.
