## S1 What is CloudFormation? — What is CloudFormation?
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html#Welcome
fetched: 2026-11-26
> CloudFormation is a service that helps you model and set up your AWS resources so that you can spend less time managing those resources and more time focusing on your applications that run in AWS.

## S2 What is the AWS CDK? — What is the AWS CDK?
url: https://docs.aws.amazon.com/cdk/v2/guide/home.html#home
fetched: 2026-11-26
> The AWS Cloud Development Kit (AWS CDK) is an open-source set of libraries and command-line tools for building and deploying applications on AWS.

## S3 Update CloudFormation stacks using change sets — Update CloudFormation stacks using change sets
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-changesets.html#using-cfn-updating-stacks-changesets
fetched: 2026-11-26
> Change sets allow you to preview how proposed changes to a stack might impact your running resources, including the impact on resource properties and attributes.

## S4 What are CloudFormation Hooks? — What are CloudFormation Hooks?
url: https://docs.aws.amazon.com/cloudformation-cli/latest/hooks-userguide/what-is-cloudformation-hooks.html#what-is-cloudformation-hooks
fetched: 2026-11-26
> CloudFormation Hooks is a feature that helps ensure that your CloudFormation resources, stacks, and change sets comply with your organization's security, operational, and cost optimization best practices.

## S5 What is AWS AppConfig? — What is AWS AppConfig?
url: https://docs.aws.amazon.com/appconfig/latest/userguide/what-is-appconfig.html#what-is-appconfig
fetched: 2026-11-26
> AWS AppConfig helps you safely change application behavior in production without redeploying code.

## S6 AWS Systems Manager State Manager — AWS Systems Manager State Manager
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-state.html#systems-manager-state
fetched: 2026-11-26
> State Manager is a secure and scalable configuration management service that automates the process of keeping your managed nodes and other AWS resources in a state that you define.

## S7 AWS SAM — Define your infrastructure with AWS SAM
url: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-authoring.html#serverless-authoring
fetched: 2026-11-26
> Do this by configuring your AWS SAM template to define your application's resources and properties, which is the template.yaml file in your AWS SAM project.

## S8 AWS CDK cdk deploy — cdk deploy
url: https://docs.aws.amazon.com/cdk/v2/guide/ref-cli-cmd-deploy.html#ref-cli-cmd-deploy
fetched: 2026-11-26
> Deploy one or more AWS CDK stacks into your AWS environment.

## S9 AWS CDK cdk deploy — cdk deploy
url: https://docs.aws.amazon.com/cdk/v2/guide/ref-cli-cmd-deploy.html#ref-cli-cmd-deploy
fetched: 2026-11-26
> If the AWS environment is not bootstrapped, only stacks without assets and with synthesized templates under 51,200 bytes will successfully deploy.

## S10 What is CloudFormation StackSets? — Managing stacks across accounts and Regions with StackSets
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/what-is-cfnstacksets.html#what-is-cfnstacksets
fetched: 2026-11-26
> CloudFormation StackSets extends the capability of stacks by allowing you to create, update, or delete stacks across multiple accounts and AWS Regions with a single operation.

## S11 Choose the Concurrency Mode for CloudFormation StackSets — Choose the Concurrency Mode for CloudFormation StackSets
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/concurrency-mode.html#concurrency-mode
fetched: 2026-11-26
> Strict Failure Tolerance lowers the deployment speed as StackSet operation failures occur because concurrency decreases for each failure.

## S12 What Is AWS Config? — What Is AWS Config?
url: https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html#WhatIsConfig
fetched: 2026-11-26
> AWS Config provides a detailed view of the configuration of AWS resources in your AWS account.

## S13 What is AWS AppConfig? — AWS AppConfig use cases
url: https://docs.aws.amazon.com/appconfig/latest/userguide/what-is-appconfig.html#what-is-appconfig-when-to-use
fetched: 2026-11-26
> Centralized configuration storage – Manage configuration data consistently across workloads. AWS AppConfig can deploy configuration from the AWS AppConfig hosted configuration store, AWS Secrets Manager, Systems Manager Parameter Store, or Amazon S3.

## S14 Create reusable resource configurations that can be included across templates with CloudFormation modules — Create reusable resource configurations that can be included across templates with CloudFormation modules
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/modules.html#modules
fetched: 2026-11-26
> Modules are a way for you to package resource configurations for inclusion across stack templates, in a transparent, manageable, and repeatable way.

## S15 What Is Service Catalog? — What Is Service Catalog?
url: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/introduction.html#introduction
fetched: 2026-11-26
> Administrators assemble portfolios of products from their catalog, add constraints and resource tags to be used at provisioning, and then grant access to the portfolio through AWS Identity and Access Management (IAM) users and groups.

### 覆えなかった行
- 技能「Determining optimal configuration management services (for example, AWS OpsWorks, …)」の OpsWorks: 取れたページに AWS OpsWorks の資料が無かった。廃止の告知も見つけられなかった（aws.amazon.com が、この環境から解決できず What's New を読めなかった）。OpsWorks 以外（AWS Config・AWS AppConfig・AWS Systems Manager）は S5, S6, S12, S13 で覆った。
