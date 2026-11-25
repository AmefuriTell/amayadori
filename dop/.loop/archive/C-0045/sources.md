## S1 Use metric streams - Amazon CloudWatch — Use metric streams
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Metric-Streams.html#CloudWatch-Metric-Streams
fetched: 2026-11-25

> You can use metric streams to continually stream CloudWatch metrics to a
> destination of your choice, with near-real-time delivery and low latency. Supported
> destinations include AWS destinations such as Amazon Simple Storage Service and several third-party service
> provider destinations.
> There are three main usage scenarios for CloudWatch metric streams:
> - Custom setup with Firehose— Create a metric stream and direct it to an
> Amazon Data Firehose delivery stream that delivers your CloudWatch metrics to where you want them to go.
> JSON, OpenTelemetry 1.0.0, and OpenTelemetry 0.7.0 formats are supported natively,
> or you can configure transformations in your Firehose delivery stream to convert the data to a different format such as Parquet.
> - Quick S3 setup— Stream to Amazon Simple Storage Service with a quick
> setup process. By default, CloudWatch creates the resources needed for the stream. JSON, OpenTelemetry 1.0.0, and OpenTelemetry 0.7.0 formats
> are supported.
> You can stream all of your CloudWatch metrics, or use filters to stream only specified metrics. Each metric
> stream can include up to 1000 filters that
> either include or exclude metric namespaces or specific metrics. A single metric stream can have only include or
> exclude filters, but not both.
> After a metric stream is created, if new metrics are created that match the filters in place,
> the new metrics are automatically included in the stream.
> Each stream can use either JSON format, OpenTelemetry 1.0.0, or OpenTelemetry 0.7.0 format.

## S2 Set up a metric stream - Amazon CloudWatch — Set up a metric stream
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-metric-streams-setup.html#CloudWatch-metric-streams-setup
fetched: 2026-11-25

> After a metric stream is created, the time it takes for metric data to appear at the
> destination depends on the configured buffering settings on
> the Firehose delivery stream. The buffering is expressed in maximum payload size or maximum wait time, whichever
> is reached first. If these are set to the minimum values (60 seconds, 1MB) the expected
> latency is within 3 minutes if
> the selected CloudWatch namespaces have active metric updates.
> In a CloudWatch metric stream, data is sent every minute. Data might arrive at the final
> destination out of order. All specified metrics in the specified namespaces are sent in the metric
> stream, except metrics with a timestamp that is more than two days old.
> For each combination of metric name and namespace that you stream, all dimension combinations
> of that metric name and namespace are streamed.
> A user with the cloudwatch:PutMetricStream has access to the CloudWatch metric data that is being streamed, even if they don't have
> the cloudwatch:GetMetricData permission.

## S3 Real-time processing of log data with subscriptions - Amazon CloudWatch Logs — Real-time processing of log data with subscriptions
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Subscriptions.html#Subscriptions
fetched: 2026-11-25

> You can use subscriptions to get access to a real-time feed of log events from CloudWatch Logs and
> have it delivered to other services such as an Amazon Kinesis stream, an Amazon Data Firehose stream, or
> AWS Lambda for custom processing, analysis, or loading to other systems. When log events are
> sent to the receiving service, they are compressed with the gzip format.
> To begin subscribing to log events, create the receiving resource, such as a Amazon Kinesis Data Streams stream,
> where the events will be delivered. A subscription filter defines the filter pattern to use
> for filtering which log events get delivered to your AWS resource, as well as information
> about where to send matching log events to. Log events are sent to the receiving resource
> soon after being ingested, usually less than three minutes.
> You can create subscriptions at the account level and at the log group level. Each account
> can have one account-level subscription filter per Region. Each log group can have up to five
> subscription filters associated with it.
> Subscription filters ensure at least one time delivery of events, while duplicate events may occasionally occur.

## S4 Log group-level subscription filters - Amazon CloudWatch Logs — Log group-level subscription filters
url: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html#SubscriptionFilters
fetched: 2026-11-25

> You can use a subscription filter with Amazon Kinesis Data Streams, AWS Lambda, Amazon Data Firehose, or Amazon OpenSearch Service.
> Logs sent to a service through a subscription filter are compressed with the gzip
> format. AWS Lambda receives the data base64 encoded in the awslogs.data field.
