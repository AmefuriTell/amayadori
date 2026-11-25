# 出典 C-0064（タスク 5.1: Building event processing workflows）

## S1 Creating and configuring an Amazon SQS event source mapping — Configuring a queue to use with Lambda
url: https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-configure.html#events-sqs-queueconfig
fetched: 2026-11-26
> To allow your function time to process each batch of records, set the source queue's visibility timeout to at least six times the configuration timeout on your function.
> Your function's timeout must be less than or equal to the queue's visibility timeout.
> Lambda validates this requirement when you create or update an event source mapping and returns an error if the function timeout exceeds the queue's visibility timeout.
> If you increase the function timeout above the queue's visibility timeout, messages can become visible again while your function is still processing them, and your function might process them more than once.
> We recommend setting the maxReceiveCount on your source queue's redrive policy to at least 5.
> This gives Lambda a few chances to retry before sending failed messages directly to the dead-letter queue.

## S2 Using Lambda with Amazon SQS — Understanding polling and batching behavior for Amazon SQS event source mappings
url: https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html#sqs-polling-behavior
fetched: 2026-11-26
> When Lambda receives a batch, the messages stay in the queue but are hidden for the length of the queue's visibility timeout.
> By default, if your function encounters an error while processing a batch, all messages in that batch become visible in the queue again after the visibility timeout expires.
> To prevent Lambda from processing a message multiple times, you can either configure your event source mapping to include batch item failures in your function response, or you can use the DeleteMessage API to remove messages from the queue as your Lambda Event Function successfully processes them.

## S3 Handling errors for an SQS event source in Lambda — Implementing partial batch responses
url: https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-errorhandling.html#services-sqs-batchfailurereporting
fetched: 2026-11-26
> When your Lambda Event Function encounters an error while processing a batch, all messages in that batch become visible in the queue again by default, including messages that Lambda processed successfully.
> To turn on partial batch responses, specify ReportBatchItemFailures for the FunctionResponseTypes action when configuring your event source mapping.
> If your function throws an exception, the entire batch is considered a complete failure.
> If you're using this feature with a FIFO queue, your function should stop processing messages after the first failure and return all failed and unprocessed messages in batchItemFailures.
> The batchItemFailures response must include a list of message IDs, as itemIdentifier JSON values.
> For example, suppose you have a batch of five messages, with message IDs id1, id2, id3, id4, and id5.
> Your function successfully processes id1, id3, and id5.

## S4 Using Lambda to process records from Amazon Kinesis Data Streams — Polling and batching streams
url: https://docs.aws.amazon.com/lambda/latest/dg/with-kinesis.html#kinesis-polling-and-batching
fetched: 2026-11-26
> Each batch contains records from a single shard/data stream.
> To increase the speed at which your function processes records, add shards to your data stream.
> Lambda processes records in each shard in order.
> It stops processing additional records in a shard if your function returns an error.
> Configure the ParallelizationFactor setting to process one shard of a Kinesis data stream with more than one Lambda invocation simultaneously.
> You can specify the number of concurrent batches that Lambda polls from a shard by using a parallelization factor from 1 (default) to 10.
> When you increase the number of concurrent batches per shard, Lambda still ensures in-order processing at the partition-key level.

## S5 Amazon SNS message filtering — Amazon SNS message filtering
url: https://docs.aws.amazon.com/sns/latest/dg/sns-message-filtering.html#sns-message-filtering
fetched: 2026-11-26
> By default, an Amazon SNS topic subscriber receives every message that's published to the topic.
> To receive only a subset of the messages, a subscriber must assign a filter policy to the topic subscription.
> If all of the message attributes or message body properties satisfy the conditions specified in the filter policy, Amazon SNS sends the message to the subscriber.
> Otherwise, Amazon SNS doesn't send the message to that subscriber.

## S6 Amazon SNS subscription filter policies — Amazon SNS subscription filter policies
url: https://docs.aws.amazon.com/sns/latest/dg/sns-subscription-filter-policies.html#sns-subscription-filter-policies
fetched: 2026-11-26
> When the filter policy scope is set to MessageAttributes, each property name in the filter policy matches a message attribute name.
> When the filter policy scope is set to MessageBody, each property name in the filter policy matches a message body property name.

## S7 Fanout Amazon SNS notifications to Amazon SQS queues for asynchronous processing — Fanout Amazon SNS notifications to Amazon SQS queues for asynchronous processing
url: https://docs.aws.amazon.com/sns/latest/dg/sns-sqs-as-subscriber.html#sns-sqs-as-subscriber
fetched: 2026-11-26
> When you subscribe an Amazon SQS queue to an Amazon SNS topic, you can publish a message to the topic and Amazon SNS sends an Amazon SQS message to the subscribed queue.
> The messages also persist in an Amazon SQS queue for other applications to process later.
