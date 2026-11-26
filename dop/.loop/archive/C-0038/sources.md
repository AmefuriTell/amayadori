## S1 Managing stacks across accounts and Regions with StackSets — Managing stacks across accounts and Regions with StackSets
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/what-is-cfnstacksets.html#what-is-cfnstacksets
fetched: 2026-11-26
> CloudFormation StackSets extends the capability of stacks by allowing you to create, update, or delete stacks across multiple accounts and AWS Regions with a single operation. Using an administrator account, you define and manage a CloudFormation template, and use the template as the basis for provisioning stacks into selected target accounts across specified AWS Regions.

## S2 StackSets concepts — StackSet operations
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-concepts.html#stacksets-concepts-ops
fetched: 2026-11-26
> A StackSet ensures consistent deployment of the same stack resources, with the same settings, to all specified target accounts within the Regions you choose.

## S3 StackSet operation options — Failure tolerance
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-concepts.html#stackset-ops-options
fetched: 2026-11-26
> This setting, available in create, update, and delete workflows, lets you specify the maximum number or percentage of stack operation failures that can occur, per Region, beyond which CloudFormation stops an operation automatically. A lower number or percentage means that the operation performs on fewer stacks, but you are able to start troubleshooting failed operations faster.

## S4 StackSet operation options — Maximum concurrent accounts
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-concepts.html#stackset-ops-options
fetched: 2026-11-26
> Operations perform in one Region at a time, in the order specified in the Deployment order box. Maximum concurrent accounts can depend on the value of Failure tolerance depending on your Concurrency Mode. If your Concurrency Mode is set to Strict Failure Tolerance then Maximum concurrent accounts can be at most one more than the Failure tolerance setting.

## S5 StackSet operation options — Region concurrency
url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-concepts.html#stackset-ops-options
fetched: 2026-11-26
> This setting, available in create, update, and delete workflows, lets you choose how StackSets deploy into Regions. Sequential – Deploy StackSets operation into one Region at a time as specified by Region Deployment order box as long as a Region's deployment failures don't exceed a specified failure tolerance. Sequential deployment is the default selection. Parallel – Deploy StackSets operations into all specified Regions simultaneously as long as a Region's deployment failures don't exceed a specified failure tolerance.

## S6 Latency-based routing — Latency-based routing
url: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-latency.html#routing-policy-latency
fetched: 2026-11-26
> If your application is hosted in multiple AWS Regions, you can improve performance for your users by serving their requests from the AWS Region with the lowest latency. To use latency-based routing, you create latency records for your resources in multiple AWS Regions. When Route 53 gets a DNS query for your domain or subdomain (example.com or acme.example.com), it checks which AWS Regions you've created latency records for, finds which Region gives the user the lowest latency, and then picks a latency record for that Region. Route 53 responds with the value from the chosen record, such as the IP address for a web server.

## S7 Latency-based routing — Latency-based routing
url: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-latency.html#routing-policy-latency
fetched: 2026-11-26
> For example, suppose you have Elastic Load Balancing load balancers in the US West (Oregon) Region and in the Asia Pacific (Singapore) Region. You create a latency record for each load balancer. Latency-based routing uses latency data taken over a period of time, and the data reflects these changes. A request routed to the Oregon Region this week might go to the Singapore Region next week.

## S8 What is AWS Global Accelerator? — What is AWS Global Accelerator?
url: https://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html#what-is-global-accelerator
fetched: 2026-11-26
> AWS Global Accelerator is a service in which you create accelerators to improve the performance of your applications for local and global users. With a standard accelerator, you can improve availability of your internet applications that are used by a global audience. With a standard accelerator, Global Accelerator directs traffic over the AWS global network to endpoints in the nearest Region to the client. Global Accelerator is a global service that supports endpoints in multiple AWS Regions.

## S9 Add a cross-region action in CodePipeline — Add a cross-region action in CodePipeline
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-create-cross-region.html#actions-create-cross-region
fetched: 2026-11-26
> You can add actions to your pipeline that are in an AWS Region different from your pipeline. When an AWS service is the provider for an action, and this action type/provider type are in a different AWS Region from your pipeline, this is a cross-region action. Cross-region actions are supported and can only be created in those AWS Regions where CodePipeline is supported.

## S10 Add a cross-region action in CodePipeline — Add a cross-region action in CodePipeline
url: https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-create-cross-region.html#actions-create-cross-region
fetched: 2026-11-26
> When you create or edit a pipeline, you must have an artifact bucket in the pipeline Region and then you must have one artifact bucket per Region where you plan to execute an action. CodePipeline handles the copying of artifacts from one AWS Region to the other Regions when performing cross-region actions.
