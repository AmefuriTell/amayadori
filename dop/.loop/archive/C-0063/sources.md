## S1 Amazon EventBridge — What Is Amazon EventBridge?
url: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html#eb-what-is
fetched: 2026-11-25
> EventBridge offers two event buses.
> The Custom Event Bus routes events to subscribers that you create, retains events for a period that you set, and supports ordered delivery, replay, and non-JSON payloads.
> Event buses are routers that receive events and delivers them to zero or more targets.
> EventBridge Pipes is intended for point-to-point integrations; each pipe receives events from a single source for processing and delivery to a single target.
> For new applications, start with the Custom Event Bus.

## S2 Amazon EventBridge — Receiving read-only management events from AWS services
url: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-service-event-cloudtrail-management.html#eb-service-event-cloudtrail-management
fetched: 2026-11-25
> You can set up rules on your default event bus to receive read-only management events from AWS services via CloudTrail.
> Management events provide visibility into management operations that are performed on resources in your AWS account.
> Partner event buses do not receive AWS events.
> Disable the rule so that EventBridge does not match events against the rule.
> Enable the rule so that EventBridge matches events against the rule, except for read-only AWS management events delivered through CloudTrail.
> Enable the rule so that EventBridge matches all events against the rule, including read-only management events delivered through CloudTrail.
> Set rule state as ENABLED_WITH_ALL_CLOUDTRAIL_MANAGEMENT_EVENTS

## S3 Monitoring events in AWS Health with Amazon EventBridge — Notes
url: https://docs.aws.amazon.com/health/latest/ug/cloudwatch-events-health.html#cloudwatch-events-health
fetched: 2026-11-25
> You can use Amazon EventBridge to detect and react to AWS Health events.
> Then, based on rules that you create, EventBridge invokes one or more target actions when an event matches the values that you specify in a rule.
> AWS Health delivers events on a durable basis and attempts to successfully deliver events to EventBridge at least once.
> Any EventBridge rules that you create can only receive notifications for your AWS account.
> To receive organizational events for other accounts within your AWS Organizations, see Aggregating AWS Health events using organizational view and delegated administrator access.
> Public health events might take up to one hour to start sending after you create an EventBridge rule.

## S4 Creating EventBridge rules for AWS Region coverage — AWS Health
url: https://docs.aws.amazon.com/health/latest/ug/choosing-a-region.html#choosing-a-region
fetched: 2026-11-25
> You can create an EventBridge rule for each Region that you want to receive AWS Health events for.
> To receive global events, you must create a rule for the US East (N. Virginia) Region.
> Some AWS Health events are not Region-specific.
> These include events sent for AWS Identity and Access Management (IAM).
> To receive account-specific AWS Health events from all Regions in the standard AWS partition, you can set up a central rule in the US West (Oregon) Region.
> This single rule automatically aggregates account-specific events from all standard partition Regions.
> Simplified integration doesn't allow you to receive public events that are shown in the AWS Health Dashboard.

## S5 Retry policies and dead-letter queues — Amazon EventBridge
url: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-custom-bus-retry.html#eb-custom-bus-retry
fetched: 2026-11-25
> When a target call fails, EventBridge retries it until one of the two limits in RetryPolicy is reached, by default 5 attempts or 300 seconds, then writes a record to the Amazon SQS queue in OnFailureConfiguration.Arn.
> Set both when you create the subscriber: without a dead-letter queue, an event that exhausts its retries is dropped, and the only trace is the EventsDropped metric.
> Delivery stops at whichever limit is reached first.
> The record is a JSON document, not the event.
> The delivery role needs sqs:SendMessage on the queue.
> Without it, the OnFailureDestinationFailed metric counts each record that could not be written, and those events are lost.
> The queue holds records, not events, so you redrive by replaying the events from the bus.

## S6 Example policy: Send events to a custom bus in a different account — Amazon EventBridge
url: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-event-bus-example-policy-cross-account-custom-bus-source.html#eb-event-bus-example-policy-cross-account-custom-bus-source
fetched: 2026-11-25
> The following example policy grants the account 111122223333 permission to publish events to the central-event-bus in account 123456789012, but only for events with a source value set to com.exampleCorp.webStore and a detail-type set to newOrderCreated.
> You attach this resource-based policy to the central-event-bus in the bus-owner account (123456789012), which is the account that receives the events.
> The publishing account (111122223333) is the IAM principal that the policy grants access to, so replace the example account IDs with your own bus-owner and publishing account IDs.

## S7 Transforming events with JSONata — Amazon EventBridge
url: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-custom-bus-transform.html#eb-custom-bus-transform
fetched: 2026-11-25
> To change what a target receives, set Transformer on CreateSubscriber or UpdateSubscriber.
> Transformer.Type RAW, the default, delivers the published data alone; WITH_METADATA delivers the data with its metadata; and JSONATA delivers the result of an expression, for example
> A subscriber whose target is a Custom Event Bus - Classic supports only RAW.
> A universal target does not use Transformer; it shapes its request in UniversalTargetParameters.Input, which takes the same expressions.
> Metadata is the string-to-string map the producer set with PutRawEvents.
> PutEvents takes no metadata, so for its events the map is empty.
> SystemMetadata holds the fields EventBridge assigns.
> Every value is a string.
