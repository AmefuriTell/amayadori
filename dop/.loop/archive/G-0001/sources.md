## S0 Amazon S3 — SOAP API の廃止（告知）
url: https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html#Welcome
fetched: 2026-11-26
> As announced on May 5, 2025, SOAP API support is discontinued. Requests that use the SOAP API return an HTTP 400 Bad Request error. Use the REST API or the AWS SDKs instead.

## S1 Amazon S3 — What is Amazon S3?
url: https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html#Welcome
fetched: 2026-11-26
> Amazon Simple Storage Service (Amazon S3) is an object storage service that offers industry-leading scalability, data availability, security, and performance. Customers of all sizes and industries can use Amazon S3 to store and protect any amount of data for a range of use cases, such as data lakes, websites, mobile applications, backup and restore, archive, enterprise applications, IoT devices, and big data analytics. Amazon S3 provides management features so that you can optimize, organize, and configure access to your data to meet your specific business, organizational, and compliance requirements.

## S2 Amazon S3 — Storage management（S3 Replication）
url: https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html#features-storage-management
fetched: 2026-11-26
> S3 Replication – Replicate objects and their respective metadata and object tags to one or more destination buckets in the same or different AWS Regions for reduced latency, compliance, security, and other use cases.

## S3 Amazon S3 — Data processing（Event notifications）
url: https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html#features-data-processing
fetched: 2026-11-26
> Event notifications – Trigger workflows that use Amazon Simple Notification Service (Amazon SNS), Amazon Simple Queue Service (Amazon SQS), and AWS Lambda when a change is made to your S3 resources.

## S4 Amazon CloudWatch — What is Amazon CloudWatch?
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html#WhatIsCloudWatch
fetched: 2026-11-26
> Amazon CloudWatch monitors your Amazon Web Services (AWS) resources and the applications you run on AWS in real time, and offers many tools to give you system-wide observability of your application performance, operational health, and resource utilization.

## S5 Amazon CloudWatch — Operational visibility with metrics, alarms, and dashboards（メトリクス）
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html#cloudwatch-monitoring-overview
fetched: 2026-11-26
> Metrics collect and track key performance data at user-defined intervals. CloudWatch provides two types of metrics: OpenTelemetry Metrics (recommended) and CloudWatch Metrics (Classic). Many AWS services automatically report metrics into CloudWatch, and you can also publish your own custom metrics, either with OpenTelemetry (OTLP) or with the PutMetricData API.

## S6 Amazon CloudWatch — Collect, store, and query logs（ログ）
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html#cloudwatch-logs-overview
fetched: 2026-11-26
> CloudWatch Logs offers a suite of powerful features for comprehensive log management and analysis. Logs ingested from AWS services and custom applications are stored in log groups and streams for easy organization. Use CloudWatch Logs Insights to perform interactive, fast queries on your log data, with a choice of three query languages including SQL and PPL. Use log anomaly detection to find unusual patterns in log events in a log group, which can indicate issues. Create metric filters to extract numerical values from logs and generate CloudWatch metrics, which you can use for alerting and dashboards. Set up subscription filters to process and analyze logs in real-time or route them to other services like Amazon S3 or Firehose.

## S7 AWS Organizations — What is AWS Organizations?
url: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html#orgs_introduction
fetched: 2026-11-26
> AWS Organizations helps you centrally manage and govern your environment as you grow and scale your AWS resources. Using Organizations, you can create accounts and allocate resources, group accounts to organize your workflows, apply policies for governance, and simplify billing by using a single payment method for all of your accounts.

## S8 AWS Organizations — Features for AWS Organizations（OU・委任）
url: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html#features
fetched: 2026-11-26
> As you create new accounts, you can group them into organizational units (OUs), or groups of accounts that serve a single application or service. Apply tag policies to classify or track resources in your organization, and provide attribute-based access control for users or applications. In addition, you can delegate responsibility for supported AWS services to accounts so users can manage them on behalf of your organization.

## S9 AWS Organizations — Features for AWS Organizations（SCP）
url: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html#features
fetched: 2026-11-26
> Set up AWS IAM Identity Center to provide access to AWS accounts and resources using your active directory, and customize permissions based on separate job roles. You can also apply organization policies to users, accounts, or OUs. For example, service control policies (SCPs) enable you to control access to AWS resources, services, and Regions within your organization.

## S10 AWS Identity and Access Management (IAM) — What is IAM?
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html#introduction
fetched: 2026-11-26
> AWS Identity and Access Management (IAM) is a web service that helps you securely control access to AWS resources. With IAM, you can manage permissions that control which AWS resources users can access. You use IAM to control who is authenticated (signed in) and authorized (has permissions) to use resources. IAM provides the infrastructure necessary to control authentication and authorization for your AWS accounts.

## S11 AWS Identity and Access Management (IAM) — Access management（認証と認可）
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html#introduction
fetched: 2026-11-26
> After a user is set up in IAM, they use their sign-in credentials to authenticate with AWS. Authentication is provided by matching the sign-in credentials to a principal (an IAM user, AWS STS federated principal, IAM role, or application) trusted by the AWS account. Next, a request is made to grant the principal access to resources. Access is granted in response to an authorization request if the user has been given permission to the resource.

## S12 AWS Identity and Access Management (IAM) — Service availability（結果整合性）
url: https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html#introduction
fetched: 2026-11-26
> IAM, like many other AWS services, is eventually consistent. IAM achieves high availability by replicating data across multiple servers within Amazon's data centers around the world. If a request to change some data is successful, the change is committed and safely stored. However, the change must be replicated across IAM, which can take some time. Such changes include creating or updating users, groups, roles, or policies. We recommend that you do not include such IAM changes in the critical, high-availability code paths of your application.

## S13 AWS Lambda — What is AWS Lambda?
url: https://docs.aws.amazon.com/lambda/latest/dg/welcome.html#welcome
fetched: 2026-11-26
> AWS Lambda is a serverless compute service. With Lambda, you can run code without provisioning or managing servers. Lambda automatically manages the underlying infrastructure – including server maintenance, capacity provisioning, scaling, and patching – so you can focus on your application logic.

## S14 AWS Lambda — What is AWS Lambda?（Event Functions・トリガー）
url: https://docs.aws.amazon.com/lambda/latest/dg/welcome.html#welcome
fetched: 2026-11-26
> Lambda Event Functions – Run code in response to events or API calls without managing servers. You write a handler function, connect it to a trigger (API Gateway, Amazon S3, Amazon SQS, EventBridge, and 200+ other AWS services), and Lambda executes it. Each invocation runs independently with no shared state, scaling horizontally to match demand.

## S15 AWS Lambda — Understanding Lambda Event Function scaling（同時実行）
url: https://docs.aws.amazon.com/lambda/latest/dg/lambda-concurrency.html#lambda-concurrency
fetched: 2026-11-26
> Concurrency is the number of in-flight requests that your AWS Lambda Event Function is handling at the same time. For each concurrent request, Lambda provisions a separate instance of your execution environment. As your Event Functions receive more requests, Lambda automatically handles scaling the number of execution environments until you reach your account's concurrency limit. By default, Lambda provides your account with a total concurrency limit of 1,000 concurrent executions across all Event Functions in an AWS Region. To support your specific account needs, you can request a quota increase and configure function-level concurrency controls so that your critical Event Functions don't experience throttling.
