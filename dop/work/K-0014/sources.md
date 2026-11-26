## S1 What Is Amazon EventBridge? — What Is Amazon EventBridge?
url: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html#eb-what-is
fetched: 2026-11-27
> Amazon EventBridge is a serverless service that uses events to connect application components together, making it easier for you to build scalable event-driven applications.
> Event-driven architecture is a style of building loosely-coupled software systems that work together by emitting and responding to events.
> Event buses are routers that receive events and delivers them to zero or more targets.
> Pipes EventBridge Pipes is intended for point-to-point integrations; each pipe receives events from a single source for processing and delivery to a single target.

## S2 Monitoring events in AWS Health with Amazon EventBridge — Monitoring events in AWS Health with Amazon EventBridge
url: https://docs.aws.amazon.com/health/latest/ug/cloudwatch-events-health.html#cloudwatch-events-health
fetched: 2026-11-27
> You can use Amazon EventBridge to detect and react to AWS Health events.
> Depending on the type of event, you can capture event information, initiate additional events, send notifications, take corrective action, or perform other actions.
> AWS Health delivers events on a durable basis and attempts to successfully deliver events to EventBridge at least once.
> Public health events might take up to one hour to start sending after you create an EventBridge rule.

## S3 Receiving read-only management events from AWS services — Receiving read-only management events from AWS services
url: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-service-event-cloudtrail-management.html#eb-service-event-cloudtrail-management
fetched: 2026-11-27
> You can set up rules on your default event bus to receive read-only management events from AWS services via CloudTrail.
> Management events provide visibility into management operations that are performed on resources in your AWS account.
> Enable the rule so that EventBridge matches events against the rule, except for read-only AWS management events delivered through CloudTrail.

## S4 Creating event-driven architectures with Lambda — Creating event-driven architectures with Lambda
url: https://docs.aws.amazon.com/lambda/latest/dg/concepts-event-driven-architectures.html#concepts-event-driven-architectures
fetched: 2026-11-27
> Events can trigger a Lambda function in two ways: through direct invocation (push) and event source mappings (pull).
> With event source mapping, Lambda actively fetches (or pulls) events from a queue or stream.
> Event-driven architectures can also make it easier to design near-real-time systems, helping organizations move away from batch-based processing.

## S5 Fanout Amazon SNS notifications to Amazon SQS queues for asynchronous processing — Fanout Amazon SNS notifications to Amazon SQS queues for asynchronous processing
url: https://docs.aws.amazon.com/sns/latest/dg/sns-sqs-as-subscriber.html#sns-sqs-as-subscriber
fetched: 2026-11-27
> Amazon SNS lets applications send time-critical messages to multiple subscribers through a push mechanism.
> Amazon SQS is a message queue service that distributed applications use to exchange messages through a polling model.
> When you subscribe an Amazon SQS queue to an Amazon SNS topic, you can publish a message to the topic and Amazon SNS sends an Amazon SQS message to the subscribed queue.
> The messages also persist in an Amazon SQS queue for other applications to process later.

## S6 What is Amazon Kinesis Data Streams? — What is Amazon Kinesis Data Streams?
url: https://docs.aws.amazon.com/streams/latest/dev/introduction.html#introduction
fetched: 2026-11-27
> A stream consumer reads the records of a shard in order, which suits stateful processing, where processing one record depends on the records before it, for use cases such as live analytics, personalization, and anomaly and pattern detection.
> A queue consumer receives each record independently, which suits stateless processing, for use cases such as microservice integration, order processing, and per-record inference.
> A queue delivers each record at least once and does not necessarily deliver records in the order that producers wrote them to the stream, so design your queue consumer to be idempotent, so that processing the same record more than once is safe.

## S7 Creating EventBridge rules for AWS Region coverage — Creating EventBridge rules for AWS Region coverage
url: https://docs.aws.amazon.com/health/latest/ug/choosing-a-region.html#choosing-a-region
fetched: 2026-11-27
> You can create an EventBridge rule for each Region that you want to receive AWS Health events for.
> If you want to capture account-specific events from multiple AWS Regions, but prefer to configure only a single rule, then simplified integration is the appropriate option.
> Simplified integration doesn't allow you to receive public events that are shown in the AWS Health Dashboard.
> Simplified integration is only recommended for ingesting action-required AWS Health events.
> Some AWS Health events are not Region-specific.
> To receive global events, you must create a rule for the US East (N. Virginia) Region.

## S8 Example policy: Send events to a custom bus in a different account in Amazon EventBridge — Example policy: Send events to a custom bus in a different account in Amazon EventBridge
url: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-event-bus-example-policy-cross-account-custom-bus-source.html#eb-event-bus-example-policy-cross-account-custom-bus-source
fetched: 2026-11-27
> The following example policy grants the account 111122223333 permission to publish events to the central-event-bus in account 123456789012, but only for events with a source value set to com.exampleCorp.webStore and a detail-type set to newOrderCreated.
> You attach this resource-based policy to the central-event-bus in the bus-owner account (123456789012), which is the account that receives the events.

## S9 Using Lambda with Amazon SQS — Understanding polling and batching behavior for Amazon SQS event source mappings
url: https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html#sqs-polling-behavior
fetched: 2026-11-27
> With Amazon SQS event source mappings, Lambda polls the queue and invokes your function synchronously with an event.
> When Lambda receives a batch, the messages stay in the queue but are hidden for the length of the queue's visibility timeout.
> By default, if your function encounters an error while processing a batch, all messages in that batch become visible in the queue again after the visibility timeout expires.
> For this reason, your function code must be able to process the same message multiple times without unintended side effects.

## S10 Handling errors for an SQS event source in Lambda — Handling errors for an SQS event source in Lambda
url: https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-errorhandling.html#services-sqs-errorhandling
fetched: 2026-11-27
> To handle errors related to an SQS event source, Lambda automatically uses a retry strategy with a backoff strategy.
> You can also customize error handling behavior by configuring your SQS event source mapping to return partial batch responses.

## S11 Using Lambda to process records from Amazon Kinesis Data Streams — Polling and batching streams
url: https://docs.aws.amazon.com/lambda/latest/dg/with-kinesis.html#kinesis-polling-and-batching
fetched: 2026-11-27
> You can use a Lambda Event Function to process records in an Amazon Kinesis data stream.
> For standard iterators, Lambda polls each shard in your Kinesis stream for records using HTTP protocol.
> Lambda reads records in batches and invokes your function to process records from the batch.
> Each batch contains records from a single shard/data stream.

## S12 Amazon SNS message filtering — Amazon SNS message filtering
url: https://docs.aws.amazon.com/sns/latest/dg/sns-message-filtering.html#sns-message-filtering
fetched: 2026-11-27
> By default, an Amazon SNS topic subscriber receives every message that's published to the topic.
> To receive only a subset of the messages, a subscriber must assign a filter policy to the topic subscription.
> If all of the message attributes or message body properties satisfy the conditions specified in the filter policy, Amazon SNS sends the message to the subscriber.

## S13 Amazon SNS subscription filter policies — Amazon SNS subscription filter policies
url: https://docs.aws.amazon.com/sns/latest/dg/sns-subscription-filter-policies.html#sns-subscription-filter-policies
fetched: 2026-11-27
> A subscription filter policy allows you to specify property names and assign a list of values to each property name.
> Additions or changes to a subscription filter policy require up to 15 minutes to fully take effect.

## S14 Orchestrating Lambda Event Functions with Step Functions — Orchestrating Lambda Event Functions with Step Functions
url: https://docs.aws.amazon.com/lambda/latest/dg/with-step-functions.html#with-step-functions
fetched: 2026-11-27
> AWS Step Functions provides visual workflow orchestration for coordinating Lambda Event Functions with other AWS services.
> Step Functions coordinates the flow of data between your functions and handles errors at each step.
> While Lambda provides retry capabilities for asynchronous invocations and event source mappings, Step Functions offers more sophisticated error handling for complex workflows.

## S15 Retry policies and dead-letter queues — Retry policies and dead-letter queues
url: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-custom-bus-retry.html#eb-custom-bus-retry
fetched: 2026-11-27
> When a target call fails, EventBridge retries it until one of the two limits in RetryPolicy is reached, by default 5 attempts or 300 seconds, then writes a record to the Amazon SQS queue in OnFailureConfiguration.Arn.
> Set both when you create the subscriber: without a dead-letter queue, an event that exhausts its retries is dropped, and the only trace is the EventsDropped metric.

## S16 Creating event-driven architectures with Lambda — Trade-offs: Eventual consistency
url: https://docs.aws.amazon.com/lambda/latest/dg/concepts-event-driven-architectures.html#eventual-consistency
fetched: 2026-11-27
> An event represents a change in state, and with many events flowing through different services in an architecture at any given point of time, such workloads are often eventually consistent.
> This makes it more complex to process transactions, handle duplicates, or determine the exact overall state of a system.

## S17 Creating event-driven architectures with Lambda — Replacing polling and webhooks with events
url: https://docs.aws.amazon.com/lambda/latest/dg/concepts-event-driven-architectures.html#polling-webhooks-events
fetched: 2026-11-27
> Both of these mechanisms can be replaced by events, which can be filtered, routed, and pushed downstream to consuming microservices.
> Microservices enable developers and architects to simplify complex workflows.
