## S1 What is Step Functions? — Standard and Express workflows types
url: https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html#welcome-workflows
fetched: 2026-11-26
> Standard workflows are ideal for long-running, auditable workflows, as they show execution history and visual debugging.
> Standard workflows have exactly-once workflow execution and can run for up to one year.
> This means that each step in a Standard workflow will execute exactly once.
> Express workflows are ideal for high-event-rate workloads, such as streaming data processing and IoT data ingestion.
> Express workflows have at-least-once workflow execution and can run for up to five minutes.
> This means that one or more steps in an Express Workflow can potentially run more than once, while each step in the workflow executes at least once.

## S2 What is Step Functions? — Integrating with other services
url: https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html#welcome-service-integrations
fetched: 2026-11-26
> To combine Step Functions with other services, there are three service integration patterns:
> Call a service, and let Step Functions progress to the next state after it gets an HTTP response.
> Call a service, and have Step Functions wait for a job to complete.
> Call a service with a task token, and have Step Functions wait until the task token returns with a callback.
> Standard Workflows and Express Workflows support the same integrations but not the same integration patterns.
> Express Workflows only support Request Response integrations.

## S3 Discover service integration patterns in Step Functions — Wait for a Callback with Task Token
url: https://docs.aws.amazon.com/step-functions/latest/dg/connect-to-resource.html#connect-wait-token
fetched: 2026-11-26
> Callback tasks provide a way to pause a workflow until a task token is returned.
> To use .waitForTaskToken with an AWS SDK integration, the API you use must have a parameter field in which to place the task token.
> The task will pause until it receives that task token back with a SendTaskSuccess or SendTaskFailure call.
> If a Task state using the callback task token times out, a new random token is generated.
> You must pass task tokens from principals within the same AWS account.

## S4 Handling errors in Step Functions workflows — Retrying after an error
url: https://docs.aws.amazon.com/step-functions/latest/dg/concepts-error-handling.html#error-handling-retrying-after-an-error
fetched: 2026-11-26
> Task, Parallel, and Map states can have a field named Retry, whose value must be an array of objects known as retriers.
> When one of these states reports an error and there's a Retry field, Step Functions scans through the retriers in the order listed in the array.
> When the error name appears in the value of a retrier's ErrorEquals field, the state machine makes retry attempts as defined in the Retry field.
> A positive integer that represents the number of seconds before the first retry attempt (1 by default).
> A positive integer that represents the maximum number of retry attempts (3 by default).
> If the error recurs more times than specified, retries cease and normal error handling resumes.
> A value of 0 specifies that the error is never retried.
> The multiplier by which the retry interval denoted by IntervalSeconds increases after each retry attempt.
> By default, the BackoffRate value increases by 2.0.
> For example, say your IntervalSeconds is 3, MaxAttempts is 3, and BackoffRate is 2.
> The first retry attempt takes place three seconds after the error occurs.
> While the third retry takes place 12 seconds after the second retry attempt.
> This string accepts FULL or NONE as its values.
> The default value is NONE.
> Retries are treated as state transitions.

## S5 Handling errors in Step Functions workflows — Fallback states
url: https://docs.aws.amazon.com/step-functions/latest/dg/concepts-error-handling.html#error-handling-fallback-states
fetched: 2026-11-26
> Task, Map and Parallel states can each have a field named Catch.
> When a state reports an error and either there is no Retry field, or if retries fail to resolve the error, Step Functions scans through the catchers in the order listed in the array.
> When the error name appears in the value of a catcher's ErrorEquals field, the state machine transitions to the state named in the Next field.
> The reserved name States.ALL that appears in a catcher's ErrorEquals field is a wildcard that matches any error name.
> It must appear alone in the ErrorEquals array and must appear in the last catcher in the Catch array.
> The name States.TaskFailed also acts a wildcard and matches any error except for States.Timeout.

## S6 How Lambda handles errors and retries with asynchronous invocation
url: https://docs.aws.amazon.com/lambda/latest/dg/invocation-async-error-handling.html#invocation-async-error-handling
fetched: 2026-11-26
> If the function returns an error, by default Lambda attempts to run it two more times, with a one-minute wait between the first two attempts, and two minutes between the second and third attempts.
> Event Function errors include errors returned by the function's code and errors returned by the function's runtime, such as timeouts.
> For throttling errors (429) and system errors (500-series), Lambda returns the event to the queue and attempts to run the function again for up to 6 hours by default.
> The retry interval increases exponentially from 1 second after the first attempt to a maximum of 5 minutes.
> Ensure that your function code gracefully handles duplicate events, and that you have enough concurrency available to handle all invocations.
> When an event expires or fails all processing attempts, Lambda discards it.
> To capture records of failed invocations (such as timeouts or runtime errors), create an on-failure destination.

## S7 Capturing records of Lambda asynchronous invocations — Adding a destination
url: https://docs.aws.amazon.com/lambda/latest/dg/invocation-async-retain-records.html#invocation-async-destinations
fetched: 2026-11-26
> You can choose to send either successful or failed invocations to a destination.
> Each function can have multiple destinations, so you can configure separate destinations for successful and failed events.
> Each record sent to the destination is a JSON document with details about the invocation.
> For Lambda to successfully send records to your chosen destination, ensure that your Event Function's execution role also contains the relevant permissions.
