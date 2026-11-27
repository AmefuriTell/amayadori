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

## S16 Update CloudFormation stacks using change sets — Change set overview
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-changesets.html#using-cfn-updating-stacks-changesets
fetched: 2026-11-25
> When you need to update a stack, understanding how your changes will affect running resources before you implement them can help you update stacks with confidence. Change sets allow you to preview how proposed changes to a stack might impact your running resources, including the impact on resource properties and attributes. Whether your changes will delete or replace any critical resources, CloudFormation makes the changes to your stack only when you decide to execute the change set, allowing you to decide whether to proceed with your proposed changes or explore other changes by creating another change set.
> View the change set to see which stack settings and resources will change. For example, you can see which resources CloudFormation will add, modify, or delete.
> After you execute a change, CloudFormation removes all change sets that are associated with the stack because they aren't applicable to the updated stack.

## S17 DeletionPolicy attribute — DeletionPolicy attribute
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-attribute-deletionpolicy.html#aws-attribute-deletionpolicy
fetched: 2026-11-25
> With the DeletionPolicy attribute you can preserve, and in some cases, backup a resource when its stack is deleted. You specify a DeletionPolicy attribute for each resource that you want to control. If a resource has no DeletionPolicy attribute, CloudFormation deletes the resource by default.
> This capability also applies to stack update operations that lead to resources being deleted from stacks.
> Exception: The default policy is Snapshot for AWS::RDS::DBCluster resources and for AWS::RDS::DBInstance resources that don't specify the DBClusterIdentifier property.
> To keep a resource when its stack is deleted, specify Retain for that resource. You can use Retain for any resource.
> For resources that support snapshots, such as AWS::EC2::Volume, specify Snapshot to have CloudFormation create a snapshot before deleting the resource.

## S18 Get exported outputs from a deployed CloudFormation stack — Considerations
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-exports.html#using-cfn-stack-exports-considerations
fetched: 2026-11-25
> The following restrictions apply to cross-stack references:
> For each AWS account, Export names must be unique within a Region.
> When using Export and Fn::ImportValue, cross-stack references are limited to the same account and Region. To reference stack outputs across accounts or Regions, use Fn::GetStackOutput.
> After another stack imports an output value, you can't delete the stack that is exporting the output value or modify the exported output value. All the imports must be removed before you can delete the exporting stack or modify the output value.

## S19 CloudFormation resources generated when AWS::Serverless::Function is specified — AutoPublishAlias and DeploymentPreference
url: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-specification-generated-resources-function.html#sam-specification-generated-resources-function-autopublishalias
fetched: 2026-11-25
> When the AutoPublishAlias property of an AWS::Serverless::Function is specified, AWS SAM generates the following CloudFormation resources: AWS::Lambda::Alias and AWS::Lambda::Version.
> When the DeploymentPreference property of an AWS::Serverless::Function is specified, AWS SAM generates the following resources CloudFormation resources: AWS::CodeDeploy::Application and AWS::CodeDeploy::DeploymentGroup. In addition, if the Role property of the DeploymentPreference object is not specified, AWS SAM also generates an AWS::IAM::Role CloudFormation resource.

## S20 cdk bootstrap — Arguments and description
url: https://docs.aws.amazon.com/cdk/v2/guide/ref-cli-cmd-bootstrap.html#ref-cli-cmd-bootstrap
fetched: 2026-11-25
> Prepare an AWS environment for CDK deployments by deploying the CDK bootstrap stack, named CDKToolkit, into the AWS environment.
> The bootstrap stack is a CloudFormation stack that provisions an Amazon S3 bucket and Amazon ECR repository in the AWS environment.
> The AWS CDK CLI uses these resources to store synthesized templates and related assets during deployment.
> This argument can be provided multiple times in a single command to deploy the bootstrap stack to multiple environments.

## S21 cdk deploy — Description
url: https://docs.aws.amazon.com/cdk/v2/guide/ref-cli-cmd-deploy.html#ref-cli-cmd-deploy
fetched: 2026-11-25
> Deploy one or more AWS CDK stacks into your AWS environment.
> If the AWS environment is not bootstrapped, only stacks without assets and with synthesized templates under 51,200 bytes will successfully deploy.
> Deploy all stacks in your CDK app.

## S22 Managing stacks across accounts and Regions with StackSets - AWS CloudFormation — Managing stacks across accounts and Regions with StackSets
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/what-is-cfnstacksets.html#what-is-cfnstacksets
fetched: 2026-11-26
> CloudFormation StackSets extends the capability of stacks by allowing you to create, update, or delete stacks across multiple accounts and AWS Regions with a single operation. Using an administrator account, you define and manage a CloudFormation template, and use the template as the basis for provisioning stacks into selected target accounts across specified AWS Regions.

## S23 Add stacks to CloudFormation StackSets - AWS CloudFormation — Add stacks to a StackSet (console)
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stackinstances-create.html#stackinstances-create-console
fetched: 2026-11-26
> By default, CloudFormation will deploy stacks in the specified accounts within the first Region, then moves on to the next, and so on, as long as a Region's deployment failures don't exceed a specified failure tolerance. For Maximum concurrent accounts, specify how many accounts are processed concurrently. For Failure tolerance, specify the maximum number of account failures allowed per Region. The operation will stop and won't proceed to other Regions once this limit is reached. For Region concurrency, choose how to process Regions: Sequential (one Region at a time) or Parallel (multiple Regions concurrently). For Concurrency mode, choose how concurrency behaves during operation execution.

## S24 Choose the Concurrency Mode for CloudFormation StackSets - AWS CloudFormation — Choose the Concurrency Mode for CloudFormation StackSets
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/concurrency-mode.html#concurrency-mode
fetched: 2026-11-26
> Concurrency Mode is a parameter for StackSetOperationPreferences that allows you to choose how the concurrency level behaves during StackSet operations. Strict Failure Tolerance: This option dynamically lowers the concurrency level to ensure the number of failed accounts never exceeds the value of Failure tolerance +1. The initial actual concurrency is set to the lower of either the value of the Maximum concurrent accounts, or the value of Failure tolerance +1. This is the default behavior. Soft Failure Tolerance: This option decouples Failure tolerance from the actual concurrency. This allows StackSet operations to run at the concurrency level set by the Maximum concurrent accounts value, regardless of the number of failures.

## S25 Choose the Concurrency Mode for CloudFormation StackSets - AWS CloudFormation — Choosing your Concurrency Mode (AWS CLI)
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/concurrency-mode.html#concurrency-mode-cli
fetched: 2026-11-26
> You can use the ConcurrencyMode parameter with the following StackSets commands: create-stack-instances delete-stack-instances detect-stack-set-drift import-stacks-to-stack-set update-stack-instances update-stack-set These commands have an existing parameter called --operation-preferences that can use the ConcurrencyMode setting. ConcurrencyMode can be set to one of the following values: STRICT_FAILURE_TOLERANCE SOFT_FAILURE_TOLERANCE

## S26 Override parameter values on stacks within your CloudFormation StackSet - AWS CloudFormation — Override parameter values on stacks within your CloudFormation StackSet
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stackinstances-override.html#stackinstances-override
fetched: 2026-11-26
> In certain cases, you might want stacks in certain Regions or accounts to have different property values than those specified in the StackSet itself. You can override template parameter values when you first create the stacks, and you can override parameter values for existing stacks. You can only set parameters you've previously overridden in stacks back to the values specified in the StackSet. Parameter value overrides apply to stacks in the accounts and Regions you select. During StackSet updates, any parameter values overridden for a stack aren't updated, but retain their overridden value. You can only override parameter values that are specified in the StackSet; to add or delete a parameter itself, you need to update the StackSet template.

## S27 Performing drift detection on CloudFormation StackSets - AWS CloudFormation — How CloudFormation performs drift detection on a StackSet
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-drift.html#stacksets-drift-how
fetched: 2026-11-26
> If one or more stack instances in a StackSet have drifted, the StackSet itself is considered to have drifted. Drift detection identifies unmanaged changes; that is, changes made to stacks outside of CloudFormation. Changes made through CloudFormation to a stack directly, rather than at the StackSet level, aren't considered drift. Because CloudFormation performs drift detection on each stack individually, it takes any overridden parameter values into account when determining whether a stack has drifted. You can only run a single drift detection operation on a given StackSet at one time.

## S28 Register a delegated administrator member account - AWS CloudFormation — Register a delegated administrator member account
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-delegated-admin.html#stacksets-orgs-delegated-admin
fetched: 2026-11-26
> In addition to your organization's management account, member accounts with delegated administrator permissions can create and manage StackSets with service-managed permissions for the organization. StackSets with service-managed permissions are created in the management account, including StackSets created by delegated administrators. Your organization can have up to five registered delegated administrators at one time. Delegated administrators have full permissions to deploy to accounts in your organization. The management account can't limit delegated administrator permissions to deploy to specific OUs or to perform specific StackSet operations. You can register and deregister delegated administrators using the CloudFormation console, AWS CLI, or AWS SDKs.

## S29 What is AWS AppConfig? — What is AWS AppConfig?
url: https://docs.aws.amazon.com/appconfig/latest/userguide/what-is-appconfig.html#what-is-appconfig
fetched: 2026-11-26
> AWS AppConfig helps you safely change application behavior in production without redeploying code. Using feature flags, dynamic free-form configurations, and AI configurations, you can control how your application runs in real time. This approach reduces risk, accelerates releases, and enables faster responses to issues. You can gradually roll out new features to specific users, monitor their impact, and expand availability with confidence.

## S30 What is AWS AppConfig? — AWS AppConfig use cases
url: https://docs.aws.amazon.com/appconfig/latest/userguide/what-is-appconfig.html#what-is-appconfig-when-to-use
fetched: 2026-11-26
> Feature flags and toggles – Gradually release new capabilities to targeted users, monitor impact, and instantly roll back changes if issues occur.
> Centralized configuration storage – Manage configuration data consistently across workloads. AWS AppConfig can deploy configuration from the AWS AppConfig hosted configuration store, AWS Secrets Manager, Systems Manager Parameter Store, or Amazon S3.

## S31 What is AWS AppConfig? — Benefits overview
url: https://docs.aws.amazon.com/appconfig/latest/userguide/what-is-appconfig.html#what-is-benefits-overview
fetched: 2026-11-26
> AWS AppConfig includes safety features that help prevent configuration changes from causing application failures:
> Validators: Ensure that configuration data is syntactically and semantically correct before deployment.
> Deployment strategies: Gradually roll out changes over a defined period of time to reduce risk.
> Monitoring and automatic rollback: AWS AppConfig integrates with Amazon CloudWatch, Datadog, New Relic, and other observability solutions to monitor application health. If a configuration change triggers an alarm, AWS AppConfig automatically rolls back the change to minimize impact.

## S32 What is AWS AppConfig? — How AWS AppConfig works
url: https://docs.aws.amazon.com/appconfig/latest/userguide/what-is-appconfig.html#what-is-appconfig-how-it-works
fetched: 2026-11-26
> If your configuration data already exists in cloud services such as SSM Parameter Store or Amazon S3, you can use AWS AppConfig to validate, deploy, and manage that data more effectively.
> You can also add optional validators to ensure that configuration data is syntactically and semantically correct. During deployment, AWS AppConfig evaluates these validators and automatically rolls back changes if validation fails.
> When you start a deployment, AWS AppConfig:
> Retrieves configuration data from the source defined in the configuration profile
> Validates the data using the configured validators
> Delivers the validated configuration to AWS AppConfig Agent

## S33 Understanding validators — Understanding validators
url: https://docs.aws.amazon.com/appconfig/latest/userguide/appconfig-creating-configuration-and-profile-validators.html#appconfig-creating-configuration-and-profile-validators
fetched: 2026-11-26
> When you create a configuration profile, you have the option to specify up to two validators. A validator ensures that your configuration data is syntactically and semantically correct. If you plan to use a validator, you must create it before you create the configuration profile.
> AWS Lambda functions: Supported for feature flags and free form configurations.
> AWS AppConfig verifies that the Lambda X-Amz-Function-Error header is set in the response.
> AWS AppConfig calls your validation Lambda when calling the StartDeployment and ValidateConfigurationActivity API operations.
> AWS AppConfig limits the validation Lambda run time to 15 seconds, including start-up latency.
> Configuration data stored in SSM documents must validate against an associated JSON Schema before you can add the configuration to the system. SSM parameters do not require a validation method, but we recommend that you create a validation check for new or updated SSM parameter configurations by using AWS Lambda.
> AWS AppConfig supports JSON Schema version 4.X for inline schema. If your application configuration requires a different version of JSON Schema, then you must create a Lambda validator.

## S34 Monitoring deployments for automatic rollback — Monitoring deployments for automatic rollback
url: https://docs.aws.amazon.com/appconfig/latest/userguide/monitoring-deployments.html#monitoring-deployments
fetched: 2026-11-26
> During a deployment, you can mitigate situations where malformed or incorrect configuration data causes errors in your application by using a combination of AWS AppConfig deployment strategies and automatic rollbacks based on Amazon CloudWatch alarms. Once configured, if one or more CloudWatch alarms go into the ALARM or INSUFFICIENT_DATAstate during a deployment, AWS AppConfig automatically rolls back your configuration data to the previous version, thereby preventing application outages or errors.
> A deployment doesn't automatically roll back if actions have been disabled in an associated CloudWatch alarm.
> To configure automatic rollbacks, you specify the Amazon Resource Name (ARN) of one or more CloudWatch metrics in the CloudWatch alarms field when you create (or edit) an AWS AppConfig environment.
> You can also roll back a configuration by calling the StopDeployment API operation while a deployment is still in progress.

## S35 AWS Systems Manager State Manager — AWS Systems Manager State Manager
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-state.html#systems-manager-state
fetched: 2026-11-26
> State Manager is a secure and scalable configuration management service that automates the process of keeping your managed nodes and other AWS resources in a state that you define.
> Which one you choose depends on whether you need to automate system compliance or perform high-priority, time-sensitive tasks during periods you specify.
> A State Manager association is a configuration that you assign to your AWS resources. The configuration defines the state that you want to maintain on your resources.
> An association specifies a schedule for when to apply the configuration and the targets for the association.
> State Manager supports targeting AWS resources by using tags, AWS Resource Groups, individual node IDs, or all managed nodes in the current AWS Region and AWS account.
> State Manager is appropriate for any AWS customer that wants to improve the management and governance of their AWS resources and reduce configuration drift.
> State Manager is available at no additional charge.

## S36 What Is AWS Config? — What Is AWS Config? / Resource Administration / Features
url: https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html#WhatIsConfig
fetched: 2026-11-26
> AWS Config provides a detailed view of the configuration of AWS resources in your AWS account.
> To exercise better governance over your resource configurations and to detect resource misconfigurations, you need fine-grained visibility into what resources exist and how these resources are configured at any time.
> You can use AWS Config rules to evaluate the configuration settings of your AWS resources.
> When AWS Config detects that a resource violates the conditions in one of your rules, AWS Config flags the resource as noncompliant and sends a notification.
> Specify the rules that you want AWS Config to use to evaluate compliance information for the recorded resource types.
> Use conformance packs, or a collection of rules that can be deployed and monitored as a single entity in your AWS account.
> Remediate noncompliant resources that are evaluated by AWS Config Rules.

## S37 What Is Service Catalog? — What Is Service Catalog?
url: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/introduction.html#introduction
fetched: 2026-11-26
> Service Catalog enables organizations to create and manage catalogs of IT services that are approved for AWS. Service Catalog allows organizations to centrally manage commonly deployed IT services, and helps organizations achieve consistent governance and meet compliance requirements. End users can quickly deploy only the approved IT services they need, following the constraints set by your organization.
> Administer and manage approved assets by restricting where the product can be launched, the type of instance that can be used, and many other configuration options.
> Administrators assemble portfolios of products from their catalog, add constraints and resource tags to be used at provisioning, and then grant access to the portfolio through AWS Identity and Access Management (IAM) users and groups.

## S38 AWS Service Catalog Launch Constraints — AWS Service Catalog Launch Constraints
url: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/constraints-launch.html#constraints-launch
fetched: 2026-11-26
> A launch constraint specifies the AWS Identity and Access Management (IAM) role that AWS Service Catalog assumes when an end user launches, updates, or terminates a product. Launch constraints apply to products in the portfolio (product-portfolio association). Launch constraints do not apply at the portfolio level or to a product across all portfolios.
> Without a launch constraint, end users must launch and manage products using their own IAM credentials. To do so, they must have permissions for CloudFormation, AWS services that the products use, and AWS Service Catalog. By using a launch role, you can instead limit the end users' permissions to the minimum they require for that product.

## S39 AWS Service Catalog Launch Constraints — Configuring a Launch Role
url: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/constraints-launch.html#constraints-launch-role
fetched: 2026-11-26
> The IAM role's trust policy must allow AWS Service Catalog to assume the role.
> The servicecatalog:ProvisionProduct, servicecatalog:TerminateProvisionedProduct, and servicecatalog:UpdateProvisionedProduct permissions cannot be assigned in a launch role.

## S40 AWS Service Catalog Launch Constraints — Applying a Launch Constraint
url: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/constraints-launch.html#constraints-launch-constraint
fetched: 2026-11-26
> After you configure the launch role, assign the role to the product as a launch constraint. This action tells AWS Service Catalog to assume the role when an end user launches the product.

## S41 AWS Service Catalog Launch Constraints — Adding Confused Deputy to Launch Constraint
url: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/constraints-launch.html#constraint-confused-deputy
fetched: 2026-11-26
> AWS Service Catalog supports Confused Deputy protection for the APIs that run with an Assume Role request. When you add a launch constraint, you can restrict the launch role access by using sourceAccount and sourceArn conditions in the launch role trust policy. It ensures that the launch role is called by a trusted source.
> A user who provisions a product with the LaunchConstraint must have the same AccountId (111111111111). If not, the operation fails with an AccessDenied error, preventing launch role misuse.

## S42 AWS CloudFormation Modules — Create reusable resource configurations that can be included across templates with CloudFormation modules
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/modules.html#modules
fetched: 2026-11-26
> Modules are a way for you to package resource configurations for inclusion across stack templates, in a transparent, manageable, and repeatable way. Modules can encapsulate common service configurations and best practices as modular, customizable building blocks for you to include in your stack templates.
> Modules enable you to include resource configurations that incorporate best practices, expert domain knowledge, and accepted guidelines (for areas such as security, compliance, governance, and industry regulations) in your templates, without having to acquire deep knowledge of the intricacies of the resource implementation.
> A module must adhere to the schema it registers in the CloudFormation registry, so you know what resources it can resolve to once you include it in your template.
> And because modules are versioned, if security guidelines change over time, the module author can create a new version of the module that incorporates those changes.

## S43 AWS CloudFormation Modules — Considerations when using modules
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/modules.html#module-considerations
fetched: 2026-11-26
> Tags you specify at the stack level are assigned to the individual resources derived from the module.
> Helper scripts specified at the module level don't propagate to the individual resources contained in the module when CloudFormation processes the template.
> Parameters specified in the module aren't propagated to parameters at the template level. However, you can create template-level parameters that reference module-level parameters.

## S44 What are CloudFormation Hooks? — What are CloudFormation Hooks?
url: https://docs.aws.amazon.com/cloudformation-cli/latest/hooks-userguide/what-is-cloudformation-hooks.html#what-is-cloudformation-hooks
fetched: 2026-11-26
> CloudFormation Hooks is a feature that helps ensure that your CloudFormation resources, stacks, and change sets comply with your organization's security, operational, and cost optimization best practices. With CloudFormation Hooks, you can provide code that proactively inspects the configuration of your AWS resources before provisioning. If non-compliant resources are found, CloudFormation either fails the operation and prevents the resources from being provisioned or emits a warning and allows the provisioning operation to continue.

## S45 What are CloudFormation Hooks? — Guard rules
url: https://docs.aws.amazon.com/cloudformation-cli/latest/hooks-userguide/what-is-cloudformation-hooks.html#hook-guard-hooks
fetched: 2026-11-26
> AWS CloudFormation Guard is a policy-as-code evaluation tool that provides a domain-specific language for writing custom evaluation logic for Hooks.

## S46 What are CloudFormation Hooks? — AWS Control Tower proactive controls
url: https://docs.aws.amazon.com/cloudformation-cli/latest/hooks-userguide/what-is-cloudformation-hooks.html#hook-control-tower-proactive-controls
fetched: 2026-11-26
> The AWS Control Tower Control Catalog offers standardized proactive controls that you can implement as Hooks. This approach saves setup time and helps you validate resource configurations against AWS best practices across your organization without writing code.

## S47 AWS CDK Constructs — Construct levels
url: https://docs.aws.amazon.com/cdk/v2/guide/constructs.html#constructs-lib-levels
fetched: 2026-11-26
> Constructs from the AWS Construct Library are categorized into three levels. Each level offers an increasing level of abstraction. The higher the abstraction, the easier to configure, requiring less expertise. The lower the abstraction, the more customization available, requiring more expertise.
> L1 constructs, also known as CFN resources, are the lowest-level construct and offer no abstraction. Each L1 construct maps directly to a single AWS CloudFormation resource.
> L2 constructs, also known as curated constructs, are thoughtfully developed by the CDK team and are usually the most widely used construct type. L2 constructs include sensible default property configurations, best practice security policies, and generate a lot of the boilerplate code and glue logic for you.
> L3 constructs, also known as patterns, are the highest-level of abstraction. Each L3 construct can contain a collection of resources that are configured to work together to accomplish a specific task or service within your application. L3 constructs offer opinionated default property configurations.

## S48 AWS CDK Constructs — Composition
url: https://docs.aws.amazon.com/cdk/v2/guide/constructs.html#constructs-composition
fetched: 2026-11-26
> Composition is the key pattern for defining higher-level abstractions through constructs. With composition, you define reusable components and share them like any other code.
> For example, a team can define a construct that implements the company's best practice for an Amazon DynamoDB table, including backup, global replication, automatic scaling, and monitoring.

## S49 AWS CDK Constructs — Add features with Mixins
url: https://docs.aws.amazon.com/cdk/v2/guide/constructs.html#constructs-mixins
fetched: 2026-11-26
> Many of these features are also available as independent building blocks called Mixins, which can be applied to both L1 and L2 constructs using the .with() method.

## S50 Aspects and the AWS CDK — Aspects and the AWS CDK
url: https://docs.aws.amazon.com/cdk/v2/guide/aspects.html#aspects
fetched: 2026-11-26
> Aspects are a way to apply an operation to all constructs in a given scope. The aspect could modify the constructs, such as by adding tags. Or it could verify something about the state of the constructs, such as making sure that all buckets are encrypted.
> The AWS CDK uses aspects to tag resources, but the framework can also be used for other purposes. For example, you can use it to validate or change the AWS CloudFormation resources that are defined for you by higher-level constructs.

## S51 Aspects and the AWS CDK — Aspects vs. Mixins
url: https://docs.aws.amazon.com/cdk/v2/guide/aspects.html#aspects-vs-mixins
fetched: 2026-11-26
> Use Aspects when you want to enforce rules across your entire application or validate that constructs meet certain criteria. Use Mixins when you want to add a specific feature to a specific construct.
> Aspects and Mixins can be used together. For example, you might use Mixins to configure individual resources and Aspects to validate that all resources in a stack meet your organization's security requirements.

## S52 Aspects and the AWS CDK — Aspects in detail
url: https://docs.aws.amazon.com/cdk/v2/guide/aspects.html#aspects-detail
fetched: 2026-11-26
> During the prepare phase, the AWS CDK calls the visit method of the object for the construct and each of its children in top-down order. The visit method is free to change anything in the construct.
> Aspects don't propagate across Stage construct boundaries, because Stages are self-contained and immutable after definition.

### 覆えなかった行
- 技能「Determining optimal configuration management services (for example, AWS OpsWorks, …)」の OpsWorks: 取れたページに AWS OpsWorks の資料が無かった。廃止の告知も見つけられなかった（aws.amazon.com が、この環境から解決できず What's New を読めなかった）。OpsWorks 以外（AWS Config・AWS AppConfig・AWS Systems Manager）は S5, S6, S12, S13 で覆った。
