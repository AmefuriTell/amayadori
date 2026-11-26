# 出典: サービス事典 G-0009（AWS STS、IAM Access Analyzer、Amazon CloudFront、Amazon CloudWatch Synthetics、Amazon Data Firehose）

## S1 AWS STS（Welcome - AWS Security Token Service） — 役割
url: https://docs.aws.amazon.com/STS/latest/APIReference/Welcome.html
fetched: 2026-11-26
> AWS provides AWS Security Token Service (AWS STS) as a web service that enables you to request temporary, limited-privilege credentials for users. This guide describes the AWS STS API. For more information, see Temporary Security Credentials in the IAM User Guide.

## S2 AWS STS（Temporary security credentials in IAM） — 一時的な認証情報
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp.html#id_credentials_temp
fetched: 2026-11-26
> You can use the AWS Security Token Service (AWS STS) to create and provide trusted users with temporary security credentials that can control access to your AWS resources. Temporary security credentials work almost identically to long-term access key credentials, with the following differences: Temporary security credentials are short-term, as the name implies. They can be configured to last for anywhere from a few minutes to several hours. After the credentials expire, AWS no longer recognizes them or allows any kind of access from API requests made with them.

## S3 AWS STS（Temporary security credentials in IAM） — クロスアカウントのロール
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp.html#role_cross-account
fetched: 2026-11-26
> Many organizations maintain more than one AWS account. Using roles and cross-account access, you can define user identities in one account, and use those identities to access AWS resources in other accounts that belong to your organization. This is known as the delegation approach to temporary access.

## S4 IAM Access Analyzer（Using AWS Identity and Access Management Access Analyzer） — 外部エンティティと共有されたリソースの検出
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html#what-is-access-analyzer-resource-identification
fetched: 2026-11-26
> IAM Access Analyzer helps you identify the resources in your organization and accounts, such as Amazon S3 buckets or IAM roles, shared with an external entity. This lets you identify unintended access to your resources and data, which is a security risk. IAM Access Analyzer identifies resources shared with external principals by using logic-based reasoning to analyze the resource-based policies in your AWS environment. For each instance of a resource shared outside of your account, IAM Access Analyzer generates a finding.

## S5 IAM Access Analyzer（Using AWS Identity and Access Management Access Analyzer） — 信頼ゾーン
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html#what-is-access-analyzer-resource-identification
fetched: 2026-11-26
> When you enable IAM Access Analyzer, you create an analyzer for your entire organization or your account. The organization or account you choose is known as the zone of trust for the analyzer. The analyzer monitors all of the supported resources within your zone of trust. Any access to resources by principals within your zone of trust is considered trusted.

## S6 IAM Access Analyzer（Using AWS Identity and Access Management Access Analyzer） — ポリシーの生成
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html#what-is-access-analyzer-policy-generation
fetched: 2026-11-26
> IAM Access Analyzer analyzes your AWS CloudTrail logs to identify actions and services that have been used by an IAM entity (user or role) within your specified date range. It then generates an IAM policy that is based on that access activity. You can use the generated policy to refine an entity's permissions by attaching it to an IAM user or role.

## S7 Amazon CloudFront（What is Amazon CloudFront?） — 役割
url: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html#Introduction
fetched: 2026-11-26
> Amazon CloudFront is a web service that speeds up distribution of your static and dynamic web content, such as .html, .css, .js, and image files, to your users. CloudFront delivers your content through a worldwide network of data centers called edge locations.

## S8 Amazon CloudFront（What is Amazon CloudFront?） — オリジン
url: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html#HowCloudFrontWorksOverview
fetched: 2026-11-26
> You specify origin servers, like an Amazon S3 bucket or your own HTTP server, from which CloudFront gets your files which will then be distributed from CloudFront edge locations all over the world. An origin server stores the original, definitive version of your objects.

## S9 Amazon CloudFront（Request and response behavior for origin groups） — オリジングループのフェイルオーバー
url: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/RequestAndResponseBehaviorOriginGroups.html#RequestAndResponseBehaviorOriginGroups
fetched: 2026-11-26
> CloudFront fails over to the secondary origin only when the HTTP method of the viewer request is GET, HEAD, or OPTIONS. CloudFront does not fail over when the viewer sends a different HTTP method (for example POST, PUT, and so on).

## S10 Amazon CloudWatch Synthetics（Synthetic monitoring (canaries) - Amazon CloudWatch） — カナリアの役割
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Canaries.html#CloudWatch_Synthetics_Canaries
fetched: 2026-11-26
> You can use Amazon CloudWatch Synthetics to create canaries, configurable scripts that run on a schedule, to monitor your endpoints and APIs. Canaries follow the same routes and perform the same actions as a customer, which makes it possible for you to continually verify your customer experience even when you don't have any customer traffic on your applications. By using canaries, you can discover issues before your customers do.

## S11 Amazon CloudWatch Synthetics（Synthetic monitoring (canaries) - Amazon CloudWatch） — カナリアの言語と HTTP
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Canaries.html#CloudWatch_Synthetics_Canaries
fetched: 2026-11-26
> Canaries are scripts written in Node.js, Python, or Java. They create Lambda functions in your account that use Node.js, Python, or Java as the runtime. Canaries work over both HTTP and HTTPS protocols.

## S12 Amazon CloudWatch Synthetics（Synthetic monitoring (canaries) - Amazon CloudWatch） — 実行の頻度
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Canaries.html#CloudWatch_Synthetics_Canaries
fetched: 2026-11-26
> You can run a canary once or on a regular schedule. Canaries can run as often as once per minute.

## S13 Amazon Data Firehose（What is Amazon Data Firehose?） — 役割と配信先
url: https://docs.aws.amazon.com/firehose/latest/dev/what-is-this-service.html#what-is-this-service
fetched: 2026-11-26
> Amazon Data Firehose is a fully managed service for delivering real-time streaming data to destinations such as Amazon Simple Storage Service (Amazon S3), Amazon Redshift, Amazon OpenSearch Service, Amazon OpenSearch Serverless, Splunk, Apache Iceberg Tables, and any custom HTTP endpoint or HTTP endpoints owned by supported third-party service providers, including Datadog, Dynatrace, LogicMonitor, MongoDB, New Relic, Coralogix, and Elastic. With Amazon Data Firehose, you don't need to write applications or manage resources. You configure your data producers to send data to Amazon Data Firehose, and it automatically delivers the data to the destination that you specified. You can also configure Amazon Data Firehose to transform your data before delivering it.

## S14 Amazon Data Firehose（What is Amazon Data Firehose?） — Firehose stream
url: https://docs.aws.amazon.com/firehose/latest/dev/what-is-this-service.html#key-concepts
fetched: 2026-11-26
> The underlying entity of Amazon Data Firehose. You use Amazon Data Firehose by creating a Firehose stream and then sending data to it.

## S15 Amazon Data Firehose（Transform source data in Amazon Data Firehose） — データの変換（Lambda）
url: https://docs.aws.amazon.com/firehose/latest/dev/data-transformation.html#data-transformation
fetched: 2026-11-26
> Amazon Data Firehose can invoke your Lambda function to transform incoming source data and deliver the transformed data to destinations. You can enable Amazon Data Firehose data transformation when you create your Firehose stream.
