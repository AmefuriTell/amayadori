# 出典: C-0058 (4.3) Configuring S3 events to process log files and deliver to another destination

## S1 Amazon S3 Event Notifications — Amazon S3 Event Notifications
url: https://docs.aws.amazon.com/AmazonS3/latest/userguide/EventNotifications.html#EventNotifications
fetched: 2026-11-26
> Amazon S3 event notifications are designed to be delivered at least once. Typically, event notifications are delivered in seconds but can sometimes take a minute or longer.

## S2 Amazon S3 Event Notifications — Overview of Amazon S3 Event Notifications
url: https://docs.aws.amazon.com/AmazonS3/latest/userguide/EventNotifications.html#notification-how-to-overview
fetched: 2026-11-26
> Amazon S3 can send event notification messages to the following destinations. You specify the Amazon Resource Name (ARN) value of these destinations in the notification configuration.
> Amazon Simple Queue Service FIFO (First-In-First-Out) queues aren't supported as an Amazon S3 event notification destination. To send a notification for an Amazon S3 event to an Amazon SQS FIFO queue, you can use Amazon EventBridge.

## S3 Event notification types and destinations — Amazon EventBridge
url: https://docs.aws.amazon.com/AmazonS3/latest/userguide/notification-how-to-event-types-and-destinations.html#eventbridge-dest
fetched: 2026-11-26
> Unlike other destinations, you can either enable or disable events to be delivered to EventBridge for a bucket. If you enable delivery, all events are sent to EventBridge. Moreover, you can use EventBridge rules to route events to additional targets.

## S4 Configuring event notifications using object key name filtering — Configuring event notifications using object key name filtering
url: https://docs.aws.amazon.com/AmazonS3/latest/userguide/notification-how-to-filtering.html#notification-how-to-filtering
fetched: 2026-11-26
> You can configure notifications to be filtered by the prefix and suffix of the key name of objects.
> For example, you can set up a configuration where you're sent a notification only when image files with a ".jpg" file name extension are added to a bucket.
> Notification configurations that use Filter cannot define filtering rules with overlapping prefixes, overlapping suffixes, or prefix and suffix overlapping.

## S5 Process Amazon S3 event notifications with Lambda — Process Amazon S3 event notifications with Lambda
url: https://docs.aws.amazon.com/lambda/latest/dg/with-s3.html#with-s3
fetched: 2026-11-26
> Amazon S3 can send an event to a Lambda Event Function when an object is created or deleted.
> Amazon S3 invokes your function asynchronously with an event that contains details about the object.
> To invoke your function, Amazon S3 needs permission from the function's resource-based policy.
> If your function uses the AWS SDK to manage Amazon S3 resources, it also needs Amazon S3 permissions in its execution role.
> If your Lambda Event Function uses the same bucket that triggers it, it could cause the function to run in a loop.
> To avoid this, use two buckets, or configure the trigger to only apply to a prefix used for incoming objects.
