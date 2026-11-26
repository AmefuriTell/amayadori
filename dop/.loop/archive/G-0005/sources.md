## S1 Amazon SQS — What is Amazon Simple Queue Service? — welcome
url: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html
fetched: 2026-11-26
> Amazon Simple Queue Service (Amazon SQS) offers a secure, durable, and available hosted queue that lets you integrate and decouple distributed software systems and components. Amazon SQS offers common constructs such as dead-letter queues and cost allocation tags.

## S2 Amazon SQS — Benefits of using Amazon SQS — Durability（standard queues と FIFO queues）
url: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html#sqs-benefits
fetched: 2026-11-26
> Durability – For the safety of your messages, Amazon SQS stores them on multiple servers. Standard queues support at-least-once message delivery, and FIFO queues support exactly-once message processing and high-throughput mode.

## S3 Amazon SQS — Amazon SQS visibility timeout
url: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html
fetched: 2026-11-26
> When you receive a message from an Amazon SQS queue, it remains in the queue but becomes temporarily invisible to other consumers. This invisibility is controlled by the visibility timeout, which ensures that other consumers cannot process the same message while you are working on it.

## S4 Amazon VPC — What is Amazon VPC? — What is Amazon VPC?
url: https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html
fetched: 2026-11-26
> With Amazon Virtual Private Cloud (Amazon VPC), you can launch AWS resources in a logically isolated virtual network that you've defined. This virtual network closely resembles a traditional network that you'd operate in your own data center, with the benefits of using the scalable infrastructure of AWS.

## S5 Amazon VPC — What is Amazon VPC? — Features（サブネット・ルート・ゲートウェイ・フローログ）
url: https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html#amazon-vpc-features
fetched: 2026-11-26
> A subnet is a range of IP addresses in your VPC. A subnet must reside in a single Availability Zone. Use route tables to determine where network traffic from your subnet or gateway is directed. A gateway connects your VPC to another network. For example, use an internet gateway to connect your VPC to the internet. Use a VPC endpoint to connect to AWS services privately, without the use of an internet gateway or NAT device. A flow log captures information about the IP traffic going to and from network interfaces in your VPC.

## S6 AWS CodeArtifact — What is AWS CodeArtifact? — welcome
url: https://docs.aws.amazon.com/codeartifact/latest/ug/welcome.html
fetched: 2026-11-26
> AWS CodeArtifact is a secure, highly scalable, managed artifact repository service that helps organizations to store and share software packages for application development. You can create a connection between your private CodeArtifact repository and an external, public repository, such as npmjs.com or Maven Central. CodeArtifact will then fetch and store packages on demand from the public repository when they're requested by a package manager.

## S7 AWS CodeArtifact — How does CodeArtifact work? — ドメイン・リポジトリ・アップストリーム
url: https://docs.aws.amazon.com/codeartifact/latest/ug/welcome.html#codeartifact-how-does-it-work
fetched: 2026-11-26
> CodeArtifact stores software packages in repositories. Every CodeArtifact repository is a member of a single CodeArtifact domain. You can make packages in one repository available to another repository in the same domain. To do this, configure one repository as an upstream of the other. All package versions available to the upstream repository are also available to the downstream repository. CodeArtifact requires users to authenticate with the service in order to publish or consume package versions.

## S8 AWS Control Tower — What Is AWS Control Tower? — What Is AWS Control Tower?
url: https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html
fetched: 2026-11-26
> AWS Control Tower offers a straightforward way to set up and govern an AWS multi-account environment, following prescriptive best practices. AWS Control Tower orchestrates the capabilities of several other AWS services, including AWS Organizations, AWS Service Catalog, and AWS IAM Identity Center, to build a landing zone in less than an hour. Resources are set up and managed on your behalf.

## S9 AWS Control Tower — What Is AWS Control Tower? — Features（ランディングゾーン・コントロール・Account Factory）
url: https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html#features
fetched: 2026-11-26
> Landing zone – A landing zone is a well-architected, multi-account environment that's based on security and compliance best practices. Controls – A control (sometimes called a guardrail) is a high-level rule that provides ongoing governance for your overall AWS environment. Account Factory – An Account Factory is a configurable account template that helps to standardize the provisioning of new accounts with pre-approved account configurations.

## S10 Amazon Macie — What is Amazon Macie? — What is Amazon Macie?
url: https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html
fetched: 2026-11-26
> Amazon Macie is a data security service that discovers sensitive data by using machine learning and pattern matching, provides visibility into data security risks, and enables automated protection against those risks. Macie also automates discovery and reporting of sensitive data to provide you with a better understanding of the data that your organization stores in Amazon S3. If Macie detects sensitive data in an S3 object, Macie generates a finding to notify you of the sensitive data that it found.

## S11 Amazon Macie — What is Amazon Macie? — Features of Macie（機密データの自動検出とジョブ）
url: https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html#macie-features
fetched: 2026-11-26
> With Macie, you can automate discovery and reporting of sensitive data in two ways: by configuring Macie to perform automated sensitive data discovery, and by creating and running sensitive data discovery jobs. Automated sensitive data discovery provides broad visibility into where sensitive data might reside in your Amazon S3 data estate. Sensitive data discovery jobs provide deeper, more targeted analysis.
