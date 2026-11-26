## S1 Collect metrics, logs, and traces using the CloudWatch agent — Install-CloudWatch-Agent
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Install-CloudWatch-Agent.html#Install-CloudWatch-Agent
fetched: 2026-11-26
> The CloudWatch agent is a software component that collects metrics, logs, and traces from your Amazon EC2 instances, on-premises servers, and containerized applications.
> The agent publishes metrics as CloudWatch metrics in a namespace, CWAgent by default, which are billed as custom metrics.
> The Classic configuration also provides StatsD, collectd, procstat, JMX, NVIDIA GPU, EFA, NVMe, and network performance metrics, and CloudWatch Application Signals.

## S2 Metrics collected by the CloudWatch agent — Linux and macOS instances
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/metrics-collected-by-CloudWatch-agent.html#linux-metrics-enabled-by-CloudWatch-agent
fetched: 2026-11-26
> You can collect metrics from servers by installing the CloudWatch agent on the server.
> The default namespace for metrics collected by the CloudWatch agent is CWAgent, although you can specify a different namespace when you configure the agent.
> The following table lists the metrics that you can collect with the CloudWatch agent on Linux servers and macOS computers.
> mem_used_percent The percentage of memory currently in use.
> disk_used_percent The percentage of total disk space that is used.

## S3 Publish custom metrics (PutMetricData / EMF) — publishingMetrics
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/publishingMetrics.html#publishingMetrics
fetched: 2026-11-26
> You can publish your own custom metrics to CloudWatch using the PutMetricData API or the AWS CLI.
> For new implementations, we recommend using OpenTelemetry to publish custom metrics.

## S4 Publish custom metrics (PutMetricData / EMF) — High-resolution metrics
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/publishingMetrics.html#high-resolution-metrics
fetched: 2026-11-26
> When you publish a custom metric, you can define it as either standard resolution or high resolution.
> When you publish a high-resolution metric, CloudWatch stores it with a resolution of 1 second, and you can read and retrieve it with a period of 1 second, 5 seconds, 10 seconds, 30 seconds, or any multiple of 60 seconds.
> Keep in mind that every PutMetricData call for a custom metric is charged, so calling PutMetricData more often on a high-resolution metric can lead to higher charges.

## S5 Publish custom metrics (PutMetricData / EMF) — Use dimensions
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/publishingMetrics.html#usingDimensions
fetched: 2026-11-26
> You can have up to 30 dimensions assigned to one metric, and each dimension is defined by a name and value pair.

## S6 Publish custom metrics (PutMetricData / EMF) — Stop publishing metrics
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/publishingMetrics.html#CloudWatch-Stop-Publishing-Metrics
fetched: 2026-11-26
> CloudWatch doesn't pull metrics from applications, it only receives what is pushed to it, so to stop publishing your metrics you must stop them at the source.

## S7 Embedding metrics within logs — CloudWatch_Embedded_Metric_Format
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Embedded_Metric_Format.html#CloudWatch_Embedded_Metric_Format
fetched: 2026-11-26
> The CloudWatch embedded metric format allows you to generate custom metrics asynchronously in the form of logs written to CloudWatch Logs.
> OpenTelemetry (OTLP) metrics are the recommended path for ingesting metrics into CloudWatch.
> For most new workloads, publish custom metrics to the CloudWatch OTLP endpoint, for example by using the CloudWatch agent.
> To generate metrics from logs with embedded metric format, you need the logs:PutLogEvents permission but you don't need to also have the cloudwatch:PutMetricData permission.
> If you unintentionally create metrics based on high-cardinality dimensions (such as requestId), the embedded metric format will by design create a custom metric corresponding to each unique dimension combination.

## S8 Configure the CloudWatch agent with the Classic configuration — CloudWatch-Agent-Classic-configuration
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Agent-Classic-configuration.html#CloudWatch-Agent-Classic-configuration
fetched: 2026-11-26
> With the Classic configuration, the agent publishes metrics as CloudWatch metrics in a namespace, CWAgent by default, and you query them with CloudWatch metric queries and Metrics Insights.

## S9 Install the CloudWatch agent using AWS Systems Manager — installing-cloudwatch-agent-ssm
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/installing-cloudwatch-agent-ssm.html#installing-cloudwatch-agent-ssm
fetched: 2026-11-26
> Using AWS Systems Manager makes it easier to install the CloudWatch agent on a fleet of Amazon EC2 instances.
> You can download the agent into one server and create your CloudWatch agent configuration file for all servers in the fleet.

## S10 Install the CloudWatch agent using AWS Systems Manager — Create and modify the agent configuration file
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/installing-cloudwatch-agent-ssm.html#CW-Agent-Instance-Create-Configuration-File-first
fetched: 2026-11-26
> If you're going to save your agent configuration file in the Systems Manager Parameter Store, you must use an EC2 instance to save to the Parameter Store.

## S11 Install the CloudWatch agent using AWS Systems Manager — Install on additional EC2 instances
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/installing-cloudwatch-agent-ssm.html#install-CloudWatch-Agent-on-EC2-Instance-fleet-ssm
fetched: 2026-11-26
> After you have a CloudWatch agent configuration saved in Parameter Store, you can use it when you install the agent on other servers.
> In the Optional Configuration Location box, enter the name of the Parameter Store parameter that contains your agent configuration file.
> The name must start with AmazonCloudWatch-, because the CloudWatchAgentServerPolicy managed policy can read only those parameters.
