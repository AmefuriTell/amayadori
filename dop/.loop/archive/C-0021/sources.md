# sources C-0021 (IaC のテンプレートにガバナンス・セキュリティ標準を組み込む)

## S1 What Is Service Catalog? — What Is Service Catalog?
url: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/introduction.html#introduction
fetched: 2026-11-26
> Service Catalog enables organizations to create and manage catalogs of IT services that are approved for AWS. Service Catalog allows organizations to centrally manage commonly deployed IT services, and helps organizations achieve consistent governance and meet compliance requirements. End users can quickly deploy only the approved IT services they need, following the constraints set by your organization.
> Administer and manage approved assets by restricting where the product can be launched, the type of instance that can be used, and many other configuration options.
> Administrators assemble portfolios of products from their catalog, add constraints and resource tags to be used at provisioning, and then grant access to the portfolio through AWS Identity and Access Management (IAM) users and groups.

## S2 AWS Service Catalog Launch Constraints — AWS Service Catalog Launch Constraints
url: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/constraints-launch.html#constraints-launch
fetched: 2026-11-26
> A launch constraint specifies the AWS Identity and Access Management (IAM) role that AWS Service Catalog assumes when an end user launches, updates, or terminates a product. Launch constraints apply to products in the portfolio (product-portfolio association). Launch constraints do not apply at the portfolio level or to a product across all portfolios.
> Without a launch constraint, end users must launch and manage products using their own IAM credentials. To do so, they must have permissions for CloudFormation, AWS services that the products use, and AWS Service Catalog. By using a launch role, you can instead limit the end users' permissions to the minimum they require for that product.

## S3 AWS Service Catalog Launch Constraints — Configuring a Launch Role
url: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/constraints-launch.html#constraints-launch-role
fetched: 2026-11-26
> The IAM role's trust policy must allow AWS Service Catalog to assume the role.
> The servicecatalog:ProvisionProduct, servicecatalog:TerminateProvisionedProduct, and servicecatalog:UpdateProvisionedProduct permissions cannot be assigned in a launch role.

## S4 AWS Service Catalog Launch Constraints — Applying a Launch Constraint
url: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/constraints-launch.html#constraints-launch-constraint
fetched: 2026-11-26
> After you configure the launch role, assign the role to the product as a launch constraint. This action tells AWS Service Catalog to assume the role when an end user launches the product.

## S5 AWS Service Catalog Launch Constraints — Adding Confused Deputy to Launch Constraint
url: https://docs.aws.amazon.com/servicecatalog/latest/adminguide/constraints-launch.html#constraint-confused-deputy
fetched: 2026-11-26
> AWS Service Catalog supports Confused Deputy protection for the APIs that run with an Assume Role request. When you add a launch constraint, you can restrict the launch role access by using sourceAccount and sourceArn conditions in the launch role trust policy. It ensures that the launch role is called by a trusted source.
> A user who provisions a product with the LaunchConstraint must have the same AccountId (111111111111). If not, the operation fails with an AccessDenied error, preventing launch role misuse.

## S6 AWS CloudFormation Modules — Create reusable resource configurations that can be included across templates with CloudFormation modules
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/modules.html#modules
fetched: 2026-11-26
> Modules are a way for you to package resource configurations for inclusion across stack templates, in a transparent, manageable, and repeatable way. Modules can encapsulate common service configurations and best practices as modular, customizable building blocks for you to include in your stack templates.
> Modules enable you to include resource configurations that incorporate best practices, expert domain knowledge, and accepted guidelines (for areas such as security, compliance, governance, and industry regulations) in your templates, without having to acquire deep knowledge of the intricacies of the resource implementation.
> A module must adhere to the schema it registers in the CloudFormation registry, so you know what resources it can resolve to once you include it in your template.
> And because modules are versioned, if security guidelines change over time, the module author can create a new version of the module that incorporates those changes.

## S7 AWS CloudFormation Modules — Considerations when using modules
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/modules.html#module-considerations
fetched: 2026-11-26
> Tags you specify at the stack level are assigned to the individual resources derived from the module.
> Helper scripts specified at the module level don't propagate to the individual resources contained in the module when CloudFormation processes the template.
> Parameters specified in the module aren't propagated to parameters at the template level. However, you can create template-level parameters that reference module-level parameters.

## S8 What are CloudFormation Hooks? — What are CloudFormation Hooks?
url: https://docs.aws.amazon.com/cloudformation-cli/latest/hooks-userguide/what-is-cloudformation-hooks.html#what-is-cloudformation-hooks
fetched: 2026-11-26
> CloudFormation Hooks is a feature that helps ensure that your CloudFormation resources, stacks, and change sets comply with your organization's security, operational, and cost optimization best practices. With CloudFormation Hooks, you can provide code that proactively inspects the configuration of your AWS resources before provisioning. If non-compliant resources are found, CloudFormation either fails the operation and prevents the resources from being provisioned or emits a warning and allows the provisioning operation to continue.

## S9 What are CloudFormation Hooks? — Guard rules
url: https://docs.aws.amazon.com/cloudformation-cli/latest/hooks-userguide/what-is-cloudformation-hooks.html#hook-guard-hooks
fetched: 2026-11-26
> AWS CloudFormation Guard is a policy-as-code evaluation tool that provides a domain-specific language for writing custom evaluation logic for Hooks.

## S10 What are CloudFormation Hooks? — AWS Control Tower proactive controls
url: https://docs.aws.amazon.com/cloudformation-cli/latest/hooks-userguide/what-is-cloudformation-hooks.html#hook-control-tower-proactive-controls
fetched: 2026-11-26
> The AWS Control Tower Control Catalog offers standardized proactive controls that you can implement as Hooks. This approach saves setup time and helps you validate resource configurations against AWS best practices across your organization without writing code.

## S11 AWS CDK Constructs — Construct levels
url: https://docs.aws.amazon.com/cdk/v2/guide/constructs.html#constructs-lib-levels
fetched: 2026-11-26
> Constructs from the AWS Construct Library are categorized into three levels. Each level offers an increasing level of abstraction. The higher the abstraction, the easier to configure, requiring less expertise. The lower the abstraction, the more customization available, requiring more expertise.
> L1 constructs, also known as CFN resources, are the lowest-level construct and offer no abstraction. Each L1 construct maps directly to a single AWS CloudFormation resource.
> L2 constructs, also known as curated constructs, are thoughtfully developed by the CDK team and are usually the most widely used construct type. L2 constructs include sensible default property configurations, best practice security policies, and generate a lot of the boilerplate code and glue logic for you.
> L3 constructs, also known as patterns, are the highest-level of abstraction. Each L3 construct can contain a collection of resources that are configured to work together to accomplish a specific task or service within your application. L3 constructs offer opinionated default property configurations.

## S12 AWS CDK Constructs — Composition
url: https://docs.aws.amazon.com/cdk/v2/guide/constructs.html#constructs-composition
fetched: 2026-11-26
> Composition is the key pattern for defining higher-level abstractions through constructs. With composition, you define reusable components and share them like any other code.
> For example, a team can define a construct that implements the company's best practice for an Amazon DynamoDB table, including backup, global replication, automatic scaling, and monitoring.

## S13 AWS CDK Constructs — Add features with Mixins
url: https://docs.aws.amazon.com/cdk/v2/guide/constructs.html#constructs-mixins
fetched: 2026-11-26
> Many of these features are also available as independent building blocks called Mixins, which can be applied to both L1 and L2 constructs using the .with() method.

## S14 Aspects and the AWS CDK — Aspects and the AWS CDK
url: https://docs.aws.amazon.com/cdk/v2/guide/aspects.html#aspects
fetched: 2026-11-26
> Aspects are a way to apply an operation to all constructs in a given scope. The aspect could modify the constructs, such as by adding tags. Or it could verify something about the state of the constructs, such as making sure that all buckets are encrypted.
> The AWS CDK uses aspects to tag resources, but the framework can also be used for other purposes. For example, you can use it to validate or change the AWS CloudFormation resources that are defined for you by higher-level constructs.

## S15 Aspects and the AWS CDK — Aspects vs. Mixins
url: https://docs.aws.amazon.com/cdk/v2/guide/aspects.html#aspects-vs-mixins
fetched: 2026-11-26
> Use Aspects when you want to enforce rules across your entire application or validate that constructs meet certain criteria. Use Mixins when you want to add a specific feature to a specific construct.
> Aspects and Mixins can be used together. For example, you might use Mixins to configure individual resources and Aspects to validate that all resources in a stack meet your organization's security requirements.

## S16 Aspects and the AWS CDK — Aspects in detail
url: https://docs.aws.amazon.com/cdk/v2/guide/aspects.html#aspects-detail
fetched: 2026-11-26
> During the prepare phase, the AWS CDK calls the visit method of the object for the construct and each of its children in top-down order. The visit method is free to change anything in the construct.
> Aspects don't propagate across Stage construct boundaries, because Stages are self-contained and immutable after definition.
