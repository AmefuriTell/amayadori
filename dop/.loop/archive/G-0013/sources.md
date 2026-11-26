# サービス事典 G-0013（EC2 Image Builder、AWS Systems Manager Parameter Store、AWS Systems Manager State Manager）

## S1 What is Image Builder? - EC2 Image Builder — EC2 Image Builder（役割）
url: https://docs.aws.amazon.com/imagebuilder/latest/userguide/what-is-image-builder.html#what-is-image-builder
fetched: 2026-11-26
> EC2 Image Builder is a fully managed AWS service that helps you to automate the creation, management, and deployment of customized, secure, and up-to-date server images. You can use the AWS Management Console, AWS Command Line Interface, or APIs to create custom images in your AWS account. You own the customized images that Image Builder creates in your account. You can configure pipelines to automate updates and system patching for the images that you own.

## S2 What is Image Builder? - EC2 Image Builder — EC2 Image Builder（パイプライン・配布）
url: https://docs.aws.amazon.com/imagebuilder/latest/userguide/what-is-image-builder.html#image-builder-concepts
fetched: 2026-11-26
> An image pipeline provides an automation framework for building secure AMIs and container images on AWS. The Image Builder image pipeline is associated with an image recipe or container recipe that defines the build, validation, and test phases for an image build lifecycle. An image pipeline can be associated with an infrastructure configuration that defines where your image is built. You can define attributes, such as instance type, subnets, security groups, logging, and other infrastructure-related configurations. You can also associate your image pipeline with a distribution configuration to define how you would like to deploy your image.

## S3 What is Image Builder? - EC2 Image Builder — EC2 Image Builder（コンポーネント・テスト）
url: https://docs.aws.amazon.com/imagebuilder/latest/userguide/what-is-image-builder.html#image-builder-concepts
fetched: 2026-11-26
> A component defines the sequence of steps required to either customize an instance prior to image creation (a build component), or to test an instance that was launched from the created image (a test component). A component is created from a declarative, plain-text YAML or JSON document that describes the runtime configuration for building and validating, or testing an instance that is produced by your pipeline. Components run on the instance using a component management application. The component management application parses the documents and runs the desired steps. After they are created, one or more components are grouped together using an image recipe or container recipe to define the plan for building and testing a virtual machine or container image.

## S4 AWS Systems Manager Parameter Store — AWS Systems Manager Parameter Store（役割・SecureString・KMS）
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html#systems-manager-parameter-store
fetched: 2026-11-26
> Parameter Store is a centralized configuration data store for named values called parameters. A parameter is any piece of data stored in Parameter Store, such as a block of text, a list of names, an AMI ID, a license key, and so on. With Parameter Store, you can securely store, organize, and retrieve configuration data at scale.
> Use SecureString for configuration values that require encryption, such as service endpoints and account identifiers. For secrets such as database credentials, API keys, or tokens, we recommend AWS Secrets Manager, which provides purpose built security controls including automatic rotation and cross-region replication. Parameter Store encrypts the values using AWS Key Management Service.

## S5 AWS Systems Manager Parameter Store — Parameter Store features（階層・バージョン・IAM）
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html#parameter-store-features
fetched: 2026-11-26
> Use parameter hierarchies to group related parameters, making it easier to discover, manage, and filter them across environments and applications. For example, you can create the naming convention /env/computer-type/app/data, and then create application-specific parameters such as /dev/webserver/linux/approved-ami and /dev/webserver/windows/approved-ami. You can retrieve the path /dev/webserver to find all web server parameters for development environments, or /dev/webserver/linux to find only Linux image parameters.
> Parameter Store retains the 100 most recent versions of each parameter. When you investigate operational issues, you can review and reconstruct previous values.
> Use IAM policies to determine whether an application can read, write, list, or delete parameters. For example, you could write an application role that can read parameters prefixed with /myapp/prod/* but not /myapp/dev/*. You could also grant a role permission to decrypt an encrypted parameter.

## S6 AWS Systems Manager Parameter Store — Parameter tiers in Parameter Store（Standard・Advanced）
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html#parameter-store-tiers-introduction
fetched: 2026-11-26
> Parameter Store offers different parameter tiers that control storage limits: the maximum number and size of your parameters in an AWS account and Region. Configure each parameter individually to use either the standard tier or advanced tier. You can mix standard and advanced parameters. For example, you can have up to 100,000 advanced parameters and 10,000 standard parameters in the same AWS account and Region.

## S7 AWS Systems Manager State Manager — AWS Systems Manager State Manager（役割）
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-state.html#systems-manager-state
fetched: 2026-11-26
> State Manager is a secure and scalable configuration management service that automates the process of keeping your managed nodes and other AWS resources in a state that you define.

## S8 AWS Systems Manager State Manager — State Manager associations（関連付け・スケジュール）
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-state.html#state-manager-features
fetched: 2026-11-26
> A State Manager association is a configuration that you assign to your AWS resources. The configuration defines the state that you want to maintain on your resources. For example, an association can specify that antivirus software must be installed and running on a managed node, or that certain ports must be closed. An association specifies a schedule for when to apply the configuration and the targets for the association. For example, an association for antivirus software might run once a day on all managed nodes in an AWS account.

## S9 AWS Systems Manager State Manager — Multiple targeting options（対象の指定）
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-state.html#state-manager-features
fetched: 2026-11-26
> An association also specifies the targets for the association. State Manager supports targeting AWS resources by using tags, AWS Resource Groups, individual node IDs, or all managed nodes in the current AWS Region and AWS account.
