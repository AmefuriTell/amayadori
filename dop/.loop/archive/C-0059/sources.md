## S1 Amazon EventBridge event patterns — Amazon EventBridge event patterns
url: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-event-patterns.html#eb-event-patterns
fetched: 2026-11-26
> Chances are you won't want to process every single event that gets delivered to a given event bus or pipe. Rather, you'll likely want to select a subset of all the events delivered, based on the source of the event, the event type, and/or attributes of those events.
> To specify which events to send to a target, you create an event pattern. An event pattern defines the data EventBridge uses to determine whether to send the event to the target. If the event pattern matches the event, EventBridge sends the event to the target. Event patterns have the same structure as the events they match. An event pattern either matches an event or it doesn't.

## S2 Amazon EventBridge event patterns — Amazon EventBridge event patterns (example)
url: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-event-patterns.html#eb-event-patterns
fetched: 2026-11-26
> The following event pattern selects all Amazon EC2 instance-termination events. The event pattern does this by specifying three requirements to match an event:
> - The event source must be Amazon EC2.
> - The event must be an Amazon EC2 state-change notification.
> - The state of the Amazon EC2 instance must be terminated.
> Note that in this example, the event pattern includes fields about the event--source and detail-type--as well as a field from the event body--state.

## S3 Amazon EventBridge event patterns — Event patterns for event buses
url: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-event-patterns.html#eb-event-patterns-buses
fetched: 2026-11-26
> For event buses, you can specify an event pattern for each rule you create for the bus. In this way, you can select which events to send to specific targets. Event patterns for event buses can match against the event source, event metadata, and/or event detail values.

## S4 Comparison operators for use in event patterns in Amazon EventBridge — Comparison operators for use in event patterns in Amazon EventBridge
url: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-pattern-operators.html#eb-create-pattern-operators
fetched: 2026-11-26
> Below a summary of all the comparison operators available in EventBridge.
> Comparison operators only work on leaf nodes, with the exception of $or and anything-but.

## S5 Comparison operators for use in event patterns in Amazon EventBridge — Prefix matching
url: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-pattern-operators.html#eb-filtering-prefix-matching
fetched: 2026-11-26
> You can match an event depending on the prefix of a value in the event source. You can use prefix matching for string values.

## S6 Comparison operators for use in event patterns in Amazon EventBridge — Anything-but matching
url: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-pattern-operators.html#eb-filtering-anything-but
fetched: 2026-11-26
> Anything-but matching matches anything except what's specified in the rule.
> You can use anything-but matching with strings and numeric values, including lists that contain only strings, or only numbers.

## S7 Comparison operators for use in event patterns in Amazon EventBridge — Exists matching
url: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-pattern-operators.html#eb-filtering-exists-matching
fetched: 2026-11-26
> Exists matching works on the presence or absence of a field in the JSON of the event.
> Exists matching only works on leaf nodes. It does not work on intermediate nodes.

## S8 Amazon EventBridge input transformation — Amazon EventBridge input transformation
url: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-transform-target-input.html#eb-transform-target-input
fetched: 2026-11-26
> You can customize the text from an event before EventBridge passes the information to the target of a rule. Using the input transformer in the console or the API, you define variables that use JSON path to reference values in the original event source. The transformed event is sent to a target instead of the original event. However, dynamic path parameters must reference the original event, not the transformed event.
> You can define up to 100 variables, assigning each a value from the input. Then you can use those variables in the Input Template as <variable-name>.

## S9 Amazon EventBridge input transformation — Input path
url: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-transform-target-input.html#eb-transform-target-input-path
fetched: 2026-11-26
> Input Path is used to define variables. Use JSON path to reference items in your event and store those values in variables.
> EventBridge replaces input transformers at runtime to ensure a valid JSON output. Because of this, put quotes around variables that refer to JSON path parameters, but do not put quotes around variables that refer to JSON objects or arrays.

## S10 Using resource-based policies for Amazon EventBridge — Amazon SNS permissions
url: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-use-resource-based.html#eb-sns-permissions
fetched: 2026-11-26
> To allow EventBridge to publish to an Amazon SNS topic, use the aws sns get-topic-attributes and the aws sns set-topic-attributes commands.
