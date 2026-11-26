## S0 AWS CloudTrail Lake — 新規受付の停止の告知
url: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-lake-service-availability-change.html
fetched: 2026-11-26
> AWS CloudTrail Lake will no longer be open to new customers starting on May 31, 2026. For capabilities similar to CloudTrail Lake, explore CloudWatch.

## S1 AWS Systems Manager — What is AWS Systems Manager?
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/what-is-systems-manager.html#what-is-systems-manager
fetched: 2026-11-26
> AWS Systems Manager helps you centrally view, manage, and operate nodes at scale in AWS, on-premises, and multicloud environments. With the launch of a unified console experience, Systems Manager consolidates various tools to help you complete common node tasks across AWS accounts and AWS Regions.

## S2 AWS Systems Manager — What are the main features of Systems Manager?
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/what-is-systems-manager.html#features
fetched: 2026-11-26
> Tools consist of the individual capabilities of Systems Manager and their features such as Run Command, Session Manager, Automation, and Parameter Store. With Systems Manager tools you can do the following:
> Just-in-time access node access
> Patch nodes at scale
> Securely connect to nodes without opening inbound ports
> Run commands remotely on nodes
> Securely store data referenced by applications
> Automate common systems administration tasks

## S3 AWS Systems Manager — How can Systems Manager benefit my operations?
url: https://docs.aws.amazon.com/systems-manager/latest/userguide/what-is-systems-manager.html#benefits
fetched: 2026-11-26
> Systems Manager provides safe and secure remote management of your nodes at scale without logging into your servers. Systems Manager also provides a simple way of automating common administrative tasks across groups of nodes such as registry edits, user management, and software and patch installations. After your nodes are configured as managed nodes, you can execute critical operational tasks such as applying security patches, initiating logged sessions, and running commands remotely.

## S4 Amazon EC2 — What is Amazon EC2?
url: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html#concepts
fetched: 2026-11-26
> Amazon Elastic Compute Cloud (Amazon EC2) provides on-demand, scalable computing capacity in the Amazon Web Services (AWS) Cloud. Using Amazon EC2 reduces hardware costs so you can develop and deploy applications faster. An EC2 instance is a virtual server in the AWS Cloud. When you launch an EC2 instance, the instance type that you specify determines the hardware available to your instance.

## S5 Amazon EC2 — Amazon EC2 instance types
url: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-types.html#instance-types
fetched: 2026-11-26
> When you launch an instance, the instance type that you specify determines the hardware of the host computer used for your instance. Each instance type offers different compute, memory, and storage capabilities, and is grouped in an instance family based on these capabilities. Select an instance type based on the requirements of the application or software that you plan to run on your instance.

## S6 Amazon EC2 — Amazon Machine Images in Amazon EC2
url: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html#AMIs
fetched: 2026-11-26
> An Amazon Machine Image (AMI) is an image that provides the software that is required to set up and boot an Amazon EC2 instance. You must specify an AMI when you launch an instance. The AMI must be compatible with the instance type that you chose for your instance.

## S7 AWS CloudFormation — What is CloudFormation?
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html#Welcome
fetched: 2026-11-26
> CloudFormation is a service that helps you model and set up your AWS resources so that you can spend less time managing those resources and more time focusing on your applications that run in AWS. You create a template that describes all the AWS resources that you want (like Amazon EC2 instances or Amazon RDS DB instances), and CloudFormation takes care of provisioning and configuring those resources for you.

## S8 AWS CloudFormation — Update CloudFormation stacks using change sets
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-changesets.html#using-cfn-updating-stacks-changesets
fetched: 2026-11-26
> Change sets allow you to preview how proposed changes to a stack might impact your running resources, including the impact on resource properties and attributes. Whether your changes will delete or replace any critical resources, CloudFormation makes the changes to your stack only when you decide to execute the change set, allowing you to decide whether to proceed with your proposed changes or explore other changes by creating another change set.

## S9 AWS CloudFormation — What is drift?
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-drift.html#what-is-drift
fetched: 2026-11-26
> Drift detection enables you to detect whether a stack's actual configuration differs, or has drifted, from its expected configuration. A resource is considered to have drifted if one or more of its properties have been deleted, or had their value changed.

## S10 AWS CloudTrail — What Is AWS CloudTrail?
url: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html#cloudtrail-user-guide
fetched: 2026-11-26
> AWS CloudTrail is an AWS service that helps you enable operational and risk auditing, governance, and compliance of your AWS account. Actions taken by a user, role, or an AWS service are recorded as events in CloudTrail. Trails – Trails capture a record of AWS activities, delivering and storing these events in an Amazon S3 bucket, with optional delivery to CloudWatch Logs and Amazon EventBridge.

## S11 AWS CloudTrail — Management events
url: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-concepts.html#cloudtrail-concepts-management-events
fetched: 2026-11-26
> Management events provide information about management operations that are performed on resources in your AWS account. These are also known as control plane operations. By default, CloudTrail trails and CloudTrail Lake event data stores log management events.

## S12 AWS CloudTrail — Data events
url: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-concepts.html#cloudtrail-concepts-data-events
fetched: 2026-11-26
> Data events provide information about the resource operations performed on or in a resource. These are also known as data plane operations. Data events are often high-volume activities.

## S13 AWS CodeDeploy — What is CodeDeploy?
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html#welcome
fetched: 2026-11-26
> CodeDeploy is a deployment service that automates application deployments to Amazon EC2 instances, on-premises instances, serverless Lambda functions, or Amazon ECS services.

## S14 AWS CodeDeploy — Overview of CodeDeploy deployment types
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html#welcome-deployment-overview
fetched: 2026-11-26
> CodeDeploy provides two deployment type options:
> In-place deployment: The application on each instance in the deployment group is stopped, the latest application revision is installed, and the new version of the application is started and validated.
> Only deployments that use the EC2/On-Premises compute platform can use in-place deployments.
> Blue/green on an EC2/On-Premises compute platform: The instances in a deployment group (the original environment) are replaced by a different set of instances (the replacement environment) using these steps:
> Instances in the replacement environment are registered with one or more Elastic Load Balancing load balancers, causing traffic to be rerouted to them.

## S15 AWS CodeDeploy — Overview of an in-place deployment
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html#welcome-deployment-overview-in-place
fetched: 2026-11-26
> First, you create deployable content on your local development machine or similar environment, and then you add an application specification file (AppSpec file). The AppSpec file is unique to CodeDeploy. It defines the deployment actions you want CodeDeploy to execute.
